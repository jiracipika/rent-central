import { afterEach, describe, expect, it, vi } from 'vitest';
import { strToU8, zipSync } from 'fflate';
import {
  fetchLiveListings,
  normalizeKey,
  toLiveListing,
  type LiveListing,
} from '@/lib/live-rental-data';
import { listings as seedListings } from '@/data/listings';

/**
 * Contract tests for the fetchLiveListings orchestration in
 * src/lib/live-rental-data.ts. Pinned contracts:
 *
 *  1. Happy path: geocode (open-meteo) + StatsCan ZIP benchmarks + Overpass all
 *     succeed -> OSM-sourced listings, sorted by price ascending, sliced to
 *     `limit`, elements without coordinates dropped, and a sourceSummary naming
 *     OpenStreetMap + StatsCan plus the latest benchmark month.
 *  2. maxPrice / minBedrooms options actually filter the mapped listings.
 *  3. Cache: an identical call within the TTL performs no new fetches and
 *     returns the same listings; a different option set is a new cache key;
 *     after the TTL the entry expires and fetches resume.
 *  4. Any feed failure (StatsCan OR geocode OR Overpass) -> seed-catalog
 *     fallback listings and the seed fallback sourceSummary.
 *  5. Fewer than 10 mapped listings -> the seed catalog tops the result up.
 *  6. Missing city option defaults to 'Toronto'.
 *
 * Module-level caches persist across tests in this file:
 *  - `listingCache` only stores SUCCESSFUL results, keyed by every option, so
 *    each success-path test uses a distinct city (never reuses a cache key).
 *  - `statCanCache` is warmed by the first successful StatsCan fetch, so the
 *    benchmarks-failure test is ordered first; later tests rely on it.
 * Vitest runs tests in a file sequentially, in declaration order.
 */

const GEOCODE_HOST = 'geocoding-api.open-meteo.com';
const OVERPASS_HOST = 'overpass-api.de';
const STATCAN_HOST = 'www150.statcan.gc.ca';

const FALLBACK_SUMMARY = 'Seed catalog fallback (live feeds temporarily unavailable)';
const LIVE_SUMMARY = 'OpenStreetMap building footprints + StatsCan asking rents (2025-01)';
const CACHED_SUMMARY = 'OpenStreetMap buildings + Statistics Canada rent benchmark estimates';

// The Toronto benchmarks the module must bind from STATCAN_CSV's latest month.
const TORONTO_BENCHMARK = {
  city: 'Toronto',
  month: '2025-01',
  studio: 1800,
  oneBedroom: 2150,
  twoBedroom: 2820,
  threeBedroom: 3550,
};

// Minimal StatCan table 46100092-shaped CSV. Includes an older month, a
// non-"Average asking rent" row, and a second city, all of which the parser
// must ignore when binding benchmarks. Rows are quoted where GEO has commas.
const STATCAN_CSV = [
  '\uFEFFREF_DATE,GEO,"Rental unit type",Estimates,VALUE',
  '2024-10,"Toronto, Census metropolitan area, Ontario",Apartment - No bedroom,Average asking rent,1700',
  '2024-10,"Toronto, Census metropolitan area, Ontario",Apartment - 1 bedroom,Average asking rent,2050',
  '2025-01,"Toronto, Census metropolitan area, Ontario",Apartment - No bedroom,Average asking rent,1800',
  '2025-01,"Toronto, Census metropolitan area, Ontario",Apartment - 1 bedroom,Average asking rent,2150',
  '2025-01,"Toronto, Census metropolitan area, Ontario",Apartment - 2 bedrooms,Average asking rent,2820',
  '2025-01,"Toronto, Census metropolitan area, Ontario",Apartment - 3 or more bedrooms,Average asking rent,3550',
  '2025-01,"Toronto, Census metropolitan area, Ontario",Apartment - 1 bedroom,Median asking rent,1999',
  '2025-01,"Vancouver, Census metropolitan area, British Columbia",Apartment - 1 bedroom,Average asking rent,2500',
  '',
].join('\n');

type OsmElementFixture = {
  type: 'node' | 'way';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

function nodeElement(id: number, tags?: Record<string, string>): OsmElementFixture {
  return { type: 'node', id, lat: 43.65 + id / 1000, lon: -79.38 - id / 1000, tags };
}

function wayElement(id: number, tags?: Record<string, string>): OsmElementFixture {
  return { type: 'way', id, center: { lat: 43.65 + id / 1000, lon: -79.38 - id / 1000 }, tags };
}

function jsonResponse(body: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
    arrayBuffer: async () => {
      throw new Error('unexpected arrayBuffer() on a JSON route');
    },
  };
}

type FetchMockConfig = {
  geocode?: 'fail' | 'reject';
  statcan?: 'fail' | 'reject';
  overpass?: 'fail' | 'reject' | OsmElementFixture[];
};

/**
 * Installs a route-based global fetch stub and returns the call log.
 * Default routes: geocode echoes the requested city name (admin1 Ontario),
 * statcan serves a real ZIP built with fflate (exercising the unzip path),
 * overpass serves the given elements.
 */
function installFetchMock(config: FetchMockConfig = {}) {
  const calls: string[] = [];
  const zipBytes = zipSync({ '46100092-eng.csv': strToU8(STATCAN_CSV) });
  const zipBuffer = zipBytes.buffer.slice(
    zipBytes.byteOffset,
    zipBytes.byteOffset + zipBytes.byteLength,
  );

  const fetchMock = vi.fn(async (input: string | { url: string }) => {
    const url = typeof input === 'string' ? input : input.url;
    calls.push(url);

    if (url.includes(GEOCODE_HOST)) {
      if (config.geocode === 'reject') throw new Error('geocoding network unreachable');
      if (config.geocode === 'fail') return jsonResponse({ error: true }, false, 503);
      const cityName = new URL(url).searchParams.get('name') ?? '';
      return jsonResponse({
        results: [
          {
            latitude: 43.65,
            longitude: -79.38,
            name: cityName,
            admin1: 'Ontario',
            country: 'Canada',
            population: 2_930_000,
          },
        ],
      });
    }

    if (url.includes(STATCAN_HOST)) {
      if (config.statcan === 'reject') throw new Error('statcan network unreachable');
      if (config.statcan === 'fail') return { ok: false, status: 503 };
      return {
        ok: true,
        status: 200,
        json: async () => ({}),
        arrayBuffer: async () => zipBuffer,
      };
    }

    if (url.includes(OVERPASS_HOST)) {
      if (config.overpass === 'reject') throw new Error('overpass network unreachable');
      if (config.overpass === 'fail') return jsonResponse({ error: true }, false, 503);
      return jsonResponse({ elements: Array.isArray(config.overpass) ? config.overpass : [] });
    }

    throw new Error(`Unexpected fetch in test: ${url}`);
  });

  vi.stubGlobal('fetch', fetchMock);
  return { calls, fetchMock };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

const stripUpdatedAt = (listing: LiveListing): Omit<LiveListing, 'updatedAt'> => {
  const { updatedAt: _ignored, ...rest } = listing;
  return rest;
};

const torontoSeedIds = seedListings
  .filter((item) => normalizeKey(item.city) === 'toronto')
  .map((item) => `seed-${item.id}`)
  .sort();

describe('fetchLiveListings: feed failures fall back to the seed catalog', () => {
  // Ordered first: this is the file's only StatsCan failure window — once any
  // test completes a successful benchmark fetch, `statCanCache` (12h TTL)
  // hides the StatsCan feed for the rest of the run.
  it('uses the seed catalog when the StatsCan benchmark feed fails', async () => {
    const { calls } = installFetchMock({ statcan: 'fail' });

    const result = await fetchLiveListings({ city: 'Toronto' });

    expect(result.sourceSummary).toBe(FALLBACK_SUMMARY);
    expect(result.listings.map((l) => l.id).sort()).toEqual(torontoSeedIds);
    expect(result.listings.every((l) => l.source === 'osm')).toBe(true);
    expect(result.listings[0].sourceUrl).toMatch(/^https:\/\/www\.google\.com\/maps\?q=-?\d/);
    // The pipeline rejects before the Overpass stage is ever reached.
    expect(calls.some((url) => url.includes(OVERPASS_HOST))).toBe(false);
  });

  it('uses the seed catalog when geocoding fails (network throw)', async () => {
    // StatsCan succeeds here (fresh module cache) while geocode rejects.
    const { calls } = installFetchMock({ geocode: 'reject' });

    const result = await fetchLiveListings({ city: 'Toronto' });

    expect(result.sourceSummary).toBe(FALLBACK_SUMMARY);
    expect(result.listings.map((l) => l.id).sort()).toEqual(torontoSeedIds);
    expect(calls.some((url) => url.includes(OVERPASS_HOST))).toBe(false);
  });

  it('uses the seed catalog when the Overpass query fails (non-2xx)', async () => {
    installFetchMock({ overpass: 'fail' });

    const result = await fetchLiveListings({ city: 'Toronto' });

    expect(result.sourceSummary).toBe(FALLBACK_SUMMARY);
    expect(result.listings.map((l) => l.id).sort()).toEqual(torontoSeedIds);
  });

  it('uses the seed catalog when the Overpass query rejects (network throw)', async () => {
    installFetchMock({ overpass: 'reject' });

    const result = await fetchLiveListings({ city: 'Toronto', limit: 24 });

    expect(result.sourceSummary).toBe(FALLBACK_SUMMARY);
    expect(result.listings.map((l) => l.id).sort()).toEqual(torontoSeedIds);
  });
});

describe('fetchLiveListings: happy path orchestration', () => {
  // 12 elements; the last has no lat/lon/center so mapping must drop it.
  const happyElements: OsmElementFixture[] = [
    nodeElement(101, { building: 'apartments', name: 'Harbour Flats' }),
    nodeElement(102, { building: 'house', 'building:levels': '2' }),
    wayElement(103, { building: 'residential', 'addr:housenumber': '12', 'addr:street': 'Main Street' }),
    nodeElement(104),
    nodeElement(105, { building: 'apartments' }),
    nodeElement(106, { building: 'residential', name: 'Cedar Court' }),
    nodeElement(107, { building: 'apartments', 'building:levels': '7' }),
    nodeElement(108, { building: 'yes' }),
    wayElement(109, { building: 'apartments' }),
    nodeElement(110, { building: 'house' }),
    nodeElement(111, { building: 'residential' }),
    { type: 'node', id: 999 },
  ];

  it('maps OSM elements, sorts by price ascending, and reports the live source summary', async () => {
    const { calls } = installFetchMock({ overpass: happyElements });

    const result = await fetchLiveListings({ city: 'Springfield' });

    // 11 mappable elements (999 has no coordinates) with no limit truncation.
    expect(result.listings).toHaveLength(11);
    expect(result.sourceSummary).toBe(LIVE_SUMMARY);

    // The full mapping matches the exported pure mapper, sorted by price.
    const expected = happyElements
      .map((element) => toLiveListing(element, 'Springfield', 'ON', undefined))
      .filter((listing): listing is LiveListing => listing !== null)
      .sort((a, b) => a.price - b.price);
    expect(result.listings.map(stripUpdatedAt)).toEqual(expected.map(stripUpdatedAt));

    // Sanity on the orchestration itself: source, provenance, ordering.
    expect(result.listings.every((l) => l.source === 'osm')).toBe(true);
    expect(result.listings.every((l) => l.city === 'Springfield' && l.province === 'ON')).toBe(true);
    for (let i = 1; i < result.listings.length; i += 1) {
      expect(result.listings[i].price).toBeGreaterThanOrEqual(result.listings[i - 1].price);
    }
    // The cheapest expected listing leads the result.
    expect(result.listings[0].sourceUrl).toBe(expected[0].sourceUrl);

    // All feeds consulted for a cold cache: geocode for the requested city,
    // Overpass for the elements. (The StatsCan network route is genuinely
    // exercised by the geocode-failure test above, which warms the module's
    // 12h benchmark cache; successful StatsCan parsing is pinned right here by
    // LIVE_SUMMARY — the '(2025-01)' month can only come from unzipping and
    // parsing the CSV — and by benchmark-bound prices in the top-up test.)
    const geocodeUrl = calls.find((url) => url.includes(GEOCODE_HOST));
    expect(geocodeUrl).toBeDefined();
    expect(new URL(geocodeUrl!).searchParams.get('name')).toBe('Springfield');
    expect(calls.some((url) => url.includes(OVERPASS_HOST))).toBe(true);
  });

  it('slices the sorted listings to the requested limit', async () => {
    installFetchMock({ overpass: happyElements });

    const result = await fetchLiveListings({ city: 'Limitville', limit: 5 });

    expect(result.listings).toHaveLength(5);
    const expected = happyElements
      .map((element) => toLiveListing(element, 'Limitville', 'ON', undefined))
      .filter((listing): listing is LiveListing => listing !== null)
      .sort((a, b) => a.price - b.price)
      .slice(0, 5);
    expect(result.listings.map(stripUpdatedAt)).toEqual(expected.map(stripUpdatedAt));
  });

  it('applies minBedrooms and maxPrice filters to the mapped listings', async () => {
    // 16 untagged nodes: bedroom estimates come from the module's own seeded
    // helper, so expectations are derived from the exported pure helpers.
    const filterElements = Array.from({ length: 16 }, (_, i) => nodeElement(300 + i));
    const scored = filterElements.map((element) => {
      const listing = toLiveListing(element, 'Filterton', 'ON', undefined)!;
      return { id: listing.id, price: listing.price, bedrooms: listing.bedrooms };
    });

    // Calibration sanity: the fixed seeds must give the filters work to do.
    expect(scored.some((s) => s.bedrooms === 0)).toBe(true);
    expect(new Set(scored.map((s) => s.bedrooms)).size).toBeGreaterThan(1);

    const eligiblePrices = scored
      .filter((s) => s.bedrooms >= 1)
      .map((s) => s.price)
      .sort((a, b) => a - b);
    const maxPrice = eligiblePrices[Math.floor(eligiblePrices.length / 2)];

    installFetchMock({ overpass: filterElements });

    const result = await fetchLiveListings({ city: 'Filterton', minBedrooms: 1, maxPrice });

    const expectedIds = scored
      .filter((s) => s.bedrooms >= 1 && s.price <= maxPrice)
      .map((s) => s.id)
      .sort();
    expect(result.listings.map((l) => l.id).sort()).toEqual(expectedIds);
    expect(result.listings.every((l) => l.bedrooms >= 1)).toBe(true);
    expect(result.listings.every((l) => l.price <= maxPrice)).toBe(true);
    for (let i = 1; i < result.listings.length; i += 1) {
      expect(result.listings[i].price).toBeGreaterThanOrEqual(result.listings[i - 1].price);
    }
    expect(result.sourceSummary).toBe(LIVE_SUMMARY);
  });
});

describe('fetchLiveListings: response cache', () => {
  it('serves an identical call within the TTL without any new fetches', async () => {
    const { fetchMock } = installFetchMock({
      overpass: [nodeElement(401, { building: 'apartments' }), nodeElement(402)],
    });

    const first = await fetchLiveListings({ city: 'Cacheford', limit: 40 });
    const callsAfterFirst = fetchMock.mock.calls.length;
    expect(callsAfterFirst).toBeGreaterThan(0);

    const second = await fetchLiveListings({ city: 'Cacheford', limit: 40 });

    expect(fetchMock.mock.calls.length).toBe(callsAfterFirst);
    expect(second.listings).toEqual(first.listings);
    // Documented quirk: the cache-hit branch reports the month-less variant.
    expect(second.sourceSummary).toBe(CACHED_SUMMARY);

    // A different option set is a different cache key -> fetches resume and a
    // fresh array is built (the cached hit above returns the stored one).
    const third = await fetchLiveListings({ city: 'Cacheford', limit: 41 });
    expect(fetchMock.mock.calls.length).toBeGreaterThan(callsAfterFirst);
    expect(third.listings).not.toBe(first.listings);
  });

  it('expires the cache entry after the 10 minute TTL and refetches', async () => {
    vi.useFakeTimers();
    try {
      const { fetchMock } = installFetchMock({ overpass: [nodeElement(501)] });

      await fetchLiveListings({ city: 'Ttlburg', limit: 42 });
      const callsAfterFirst = fetchMock.mock.calls.length;

      // Still fresh: no new fetches.
      await fetchLiveListings({ city: 'Ttlburg', limit: 42 });
      expect(fetchMock.mock.calls.length).toBe(callsAfterFirst);

      // One millisecond past the TTL: geocode + overpass run again
      // (benchmarks stay served from the module-level statCanCache).
      vi.advanceTimersByTime(10 * 60 * 1000 + 1);
      await fetchLiveListings({ city: 'Ttlburg', limit: 42 });
      expect(fetchMock.mock.calls.length).toBe(callsAfterFirst + 2);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('fetchLiveListings: seed top-up and defaults', () => {
  it('tops up with seed catalog listings when fewer than 10 are mapped', async () => {
    installFetchMock({
      overpass: [
        nodeElement(601, { building: 'apartments', name: 'Sparse Tower' }),
        nodeElement(602),
        wayElement(603, { building: 'house' }),
      ],
    });

    const result = await fetchLiveListings({ city: 'Toronto', limit: 30 });

    const osmPart = result.listings.slice(0, 3);
    const seedPart = result.listings.slice(3);
    expect(result.listings).toHaveLength(3 + torontoSeedIds.length);

    // The OSM portion must be priced from the parsed Toronto benchmark: the
    // oracle passes the exact benchmark the CSV should have yielded.
    const osmElements: OsmElementFixture[] = [
      nodeElement(601, { building: 'apartments', name: 'Sparse Tower' }),
      nodeElement(602),
      wayElement(603, { building: 'house' }),
    ];
    const expectedOsm = osmElements
      .map((element) => toLiveListing(element, 'Toronto', 'ON', TORONTO_BENCHMARK))
      .filter((listing): listing is LiveListing => listing !== null)
      .sort((a, b) => a.price - b.price);
    expect(osmPart.map(stripUpdatedAt)).toEqual(expectedOsm.map(stripUpdatedAt));

    expect(osmPart.every((l) => l.id.startsWith('osm-'))).toBe(true);
    expect(seedPart.map((l) => l.id).sort()).toEqual(torontoSeedIds);
    // The OSM portion stays price-sorted ahead of the appended seed listings,
    // and the success summary (not the fallback one) is reported.
    expect([...osmPart].sort((a, b) => a.price - b.price)).toEqual(osmPart);
    expect(result.sourceSummary).toBe(LIVE_SUMMARY);
  });

  it('defaults the city to Toronto when no options are given', async () => {
    const { calls } = installFetchMock({ geocode: 'fail' });

    const result = await fetchLiveListings();

    const geocodeUrl = calls.find((url) => url.includes(GEOCODE_HOST));
    expect(geocodeUrl).toBeDefined();
    expect(new URL(geocodeUrl!).searchParams.get('name')).toBe('Toronto');
    // The default also flows into the seed fallback for a failed pipeline.
    expect(result.sourceSummary).toBe(FALLBACK_SUMMARY);
    expect(result.listings.map((l) => l.id).sort()).toEqual(torontoSeedIds);
  });
});
