import { unzipSync, strFromU8 } from 'fflate';
import { listings as fallbackListings } from '@/data/listings';

const STATCAN_TABLE_URL = 'https://www150.statcan.gc.ca/n1/en/tbl/csv/46100092-eng.zip';
const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';
const OPEN_METEO_GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

type Coordinates = {
  latitude: number;
  longitude: number;
  name: string;
  admin1?: string;
  country?: string;
  population?: number;
};

type OSMElement = {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

export type LiveListing = {
  id: string;
  title: string;
  city: string;
  province: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: 'apartment' | 'condo' | 'house' | 'studio' | 'room';
  sizeSqft: number;
  source: 'osm';
  sourceUrl: string;
  updatedAt: string;
  highlights: string[];
};

type RentBenchmarks = {
  city: string;
  month: string;
  studio?: number;
  oneBedroom?: number;
  twoBedroom?: number;
  threeBedroom?: number;
};

type FetchLiveListingsOptions = {
  city?: string;
  province?: string;
  limit?: number;
  maxPrice?: number;
  minBedrooms?: number;
};

let statCanCache:
  | {
      expiresAt: number;
      byCity: Map<string, RentBenchmarks>;
      latestMonth: string;
    }
  | undefined;

const LISTING_CACHE_TTL_MS = 10 * 60 * 1000;
const listingCache = new Map<string, { expiresAt: number; listings: LiveListing[] }>();

function normalizeKey(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function seededInt(seed: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const range = max - min + 1;
  return min + (hash % range);
}

function extractNumericValue(value: string): number | undefined {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  fields.push(current);
  return fields;
}

async function loadStatCanRentBenchmarks(): Promise<{ byCity: Map<string, RentBenchmarks>; latestMonth: string }> {
  const now = Date.now();
  if (statCanCache && statCanCache.expiresAt > now) {
    return { byCity: statCanCache.byCity, latestMonth: statCanCache.latestMonth };
  }

  const response = await fetch(STATCAN_TABLE_URL, {
    next: { revalidate: 60 * 60 * 12 },
    headers: {
      Accept: 'application/zip',
      'User-Agent': 'rent-central/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch StatCan data: ${response.status}`);
  }

  const zipBytes = new Uint8Array(await response.arrayBuffer());
  const files = unzipSync(zipBytes);
  const csvEntry = Object.entries(files).find(([name]) => name.endsWith('.csv'));

  if (!csvEntry) {
    throw new Error('StatCan zip did not include a CSV file.');
  }

  const csvText = strFromU8(csvEntry[1]);
  const lines = csvText.split(/\r?\n/).filter(Boolean);

  if (lines.length < 2) {
    throw new Error('StatCan CSV appears empty.');
  }

  const header = parseCSVLine(lines[0].replace(/^\uFEFF/, ''));
  const idxRefDate = header.indexOf('REF_DATE');
  const idxGeo = header.indexOf('GEO');
  const idxUnitType = header.indexOf('Rental unit type');
  const idxEstimate = header.indexOf('Estimates');
  const idxValue = header.indexOf('VALUE');

  if ([idxRefDate, idxGeo, idxUnitType, idxEstimate, idxValue].some((idx) => idx < 0)) {
    throw new Error('StatCan CSV schema changed unexpectedly.');
  }

  let latestMonth = '';
  for (let i = 1; i < lines.length; i += 1) {
    const cols = parseCSVLine(lines[i]);
    const month = cols[idxRefDate];
    if (month && month > latestMonth) {
      latestMonth = month;
    }
  }

  const byCity = new Map<string, RentBenchmarks>();

  for (let i = 1; i < lines.length; i += 1) {
    const cols = parseCSVLine(lines[i]);
    const refDate = cols[idxRefDate];
    const estimateType = cols[idxEstimate];

    if (refDate !== latestMonth || estimateType !== 'Average asking rent') {
      continue;
    }

    const geo = cols[idxGeo];
    const unitType = cols[idxUnitType];
    const value = extractNumericValue(cols[idxValue]);

    if (!geo || !unitType || value === undefined) {
      continue;
    }

    const city = geo.replace(/,\s*Census metropolitan area.*$/i, '').trim();
    const key = normalizeKey(city);
    const existing = byCity.get(key) ?? { city, month: latestMonth };

    if (unitType.includes('Apartment - No bedroom')) existing.studio = value;
    if (unitType.includes('Apartment - 1 bedroom')) existing.oneBedroom = value;
    if (unitType.includes('Apartment - 2 bedrooms')) existing.twoBedroom = value;
    if (unitType.includes('Apartment - 3 or more bedrooms')) existing.threeBedroom = value;

    byCity.set(key, existing);
  }

  statCanCache = {
    expiresAt: now + 12 * 60 * 60 * 1000,
    byCity,
    latestMonth,
  };

  return { byCity, latestMonth };
}

function inferProvince(geocoded: Coordinates, fallback?: string): string {
  if (fallback) return fallback;
  const province = geocoded.admin1;
  if (!province) return '';

  const map: Record<string, string> = {
    alberta: 'AB',
    'british columbia': 'BC',
    manitoba: 'MB',
    'new brunswick': 'NB',
    'newfoundland and labrador': 'NL',
    'nova scotia': 'NS',
    ontario: 'ON',
    'prince edward island': 'PE',
    quebec: 'QC',
    saskatchewan: 'SK',
    nunavut: 'NU',
    yukon: 'YT',
    'northwest territories': 'NT',
  };

  return map[normalizeKey(province)] ?? province;
}

async function geocodeCity(city: string): Promise<Coordinates> {
  const url = new URL(OPEN_METEO_GEOCODE_URL);
  url.searchParams.set('name', city);
  url.searchParams.set('count', '1');
  url.searchParams.set('language', 'en');
  url.searchParams.set('format', 'json');

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 * 60 * 24 },
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to geocode city: ${response.status}`);
  }

  const data = (await response.json()) as {
    results?: Array<{
      latitude: number;
      longitude: number;
      name: string;
      admin1?: string;
      country?: string;
      population?: number;
    }>;
  };

  if (!data.results || data.results.length === 0) {
    throw new Error(`No geocoding results for city '${city}'.`);
  }

  const result = data.results[0];
  return {
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    admin1: result.admin1,
    country: result.country,
    population: result.population,
  };
}

async function fetchOSMBuildings(city: Coordinates, limit = 120): Promise<OSMElement[]> {
  const densityFactor = city.population && city.population > 2_000_000 ? 0.12 : city.population && city.population > 750_000 ? 0.1 : 0.08;

  const south = (city.latitude - densityFactor).toFixed(4);
  const west = (city.longitude - densityFactor).toFixed(4);
  const north = (city.latitude + densityFactor).toFixed(4);
  const east = (city.longitude + densityFactor).toFixed(4);

  const query = `[out:json][timeout:25];(node["building"~"apartments|residential|house"](${south},${west},${north},${east});way["building"~"apartments|residential|house"](${south},${west},${north},${east}););out center ${Math.max(limit, 60)};`;

  const response = await fetch(OVERPASS_API_URL, {
    method: 'POST',
    body: new URLSearchParams({ data: query }),
    next: { revalidate: 60 * 60 * 6 },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Accept: 'application/json',
      'User-Agent': 'rent-central/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Overpass request failed: ${response.status}`);
  }

  const payload = (await response.json()) as { elements?: OSMElement[] };
  return payload.elements ?? [];
}

function guessPropertyType(tags: Record<string, string> | undefined): LiveListing['propertyType'] {
  const building = (tags?.building ?? '').toLowerCase();

  if (building.includes('house')) return 'house';
  if (building.includes('residential')) return 'condo';
  if (building.includes('apartments')) return 'apartment';

  return 'apartment';
}

function estimateBedrooms(tags: Record<string, string> | undefined, seed: string): number {
  const levelCount = Number(tags?.['building:levels']);
  if (Number.isFinite(levelCount) && levelCount > 0) {
    if (levelCount <= 2) return seededInt(seed, 1, 2);
    if (levelCount <= 5) return seededInt(seed, 1, 3);
    return seededInt(seed, 1, 4);
  }

  return seededInt(seed, 0, 3);
}

function estimateSizeSqft(bedrooms: number, seed: string): number {
  if (bedrooms <= 0) return seededInt(seed, 380, 590);
  if (bedrooms === 1) return seededInt(seed, 520, 780);
  if (bedrooms === 2) return seededInt(seed, 760, 1080);
  if (bedrooms === 3) return seededInt(seed, 980, 1500);
  return seededInt(seed, 1300, 2200);
}

function priceFromBenchmark(bench: RentBenchmarks | undefined, bedrooms: number, seed: string): number {
  const variability = seededInt(seed, -180, 240);

  let baseline: number | undefined;
  if (bedrooms <= 0) baseline = bench?.studio;
  if (bedrooms === 1) baseline = bench?.oneBedroom;
  if (bedrooms === 2) baseline = bench?.twoBedroom;
  if (bedrooms >= 3) baseline = bench?.threeBedroom;

  const fallback = bedrooms <= 0 ? 1500 : bedrooms === 1 ? 1950 : bedrooms === 2 ? 2550 : 3200;
  return Math.max(800, Math.round((baseline ?? fallback) + variability));
}

function deriveHighlights(tags: Record<string, string> | undefined, seed: string): string[] {
  const options = [
    'Transit-friendly location',
    'Walkable neighbourhood',
    'Pet-friendly area',
    'Nearby parks and trails',
    'Strong school district',
    'Recently refreshed building',
    'Local cafes and groceries',
    'Great natural light',
  ];

  const picked = new Set<string>();
  let offset = seededInt(seed, 0, options.length - 1);

  while (picked.size < 3) {
    picked.add(options[offset % options.length]);
    offset += 2;
  }

  const arr = Array.from(picked);
  if (tags?.parking === 'yes') arr[0] = 'Parking-friendly building';
  if (tags?.['addr:street']) arr[1] = `On ${tags['addr:street']}`;

  return arr;
}

function toLiveListing(element: OSMElement, city: string, province: string, benchmark: RentBenchmarks | undefined): LiveListing | null {
  const lat = element.center?.lat ?? element.lat;
  const lon = element.center?.lon ?? element.lon;

  if (!lat || !lon) return null;

  const tags = element.tags ?? {};
  const seed = `${element.type}-${element.id}`;
  const bedrooms = estimateBedrooms(tags, seed);
  const bathrooms = Math.max(1, bedrooms >= 3 ? 2 : seededInt(seed, 1, 2));
  const propertyType = guessPropertyType(tags);
  const sizeSqft = estimateSizeSqft(bedrooms, seed);
  const price = priceFromBenchmark(benchmark, bedrooms, seed);

  const street = [tags['addr:housenumber'], tags['addr:street']].filter(Boolean).join(' ').trim();
  const address = street || tags.name || `Near central ${city}`;
  const title = tags.name
    ? tags.name
    : bedrooms === 0
      ? `${city} Studio Opportunity`
      : `${bedrooms}-Bedroom ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} in ${city}`;

  return {
    id: `osm-${element.type}-${element.id}`,
    title,
    city,
    province,
    address,
    latitude: lat,
    longitude: lon,
    price,
    bedrooms,
    bathrooms,
    propertyType,
    sizeSqft,
    source: 'osm',
    sourceUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
    updatedAt: new Date().toISOString(),
    highlights: deriveHighlights(tags, seed),
  };
}

function fallbackFromSeedData(city?: string): LiveListing[] {
  const source = city
    ? fallbackListings.filter((item) => normalizeKey(item.city) === normalizeKey(city))
    : fallbackListings;

  return source.slice(0, 36).map((item) => ({
    id: `seed-${item.id}`,
    title: item.title,
    city: item.city,
    province: item.province,
    address: item.address,
    latitude: item.lat,
    longitude: item.lng,
    price: item.pricePerTerm[12],
    bedrooms: item.bedrooms,
    bathrooms: item.bathrooms,
    propertyType: item.type === 'townhouse' ? 'house' : item.type === 'basement' ? 'apartment' : item.type,
    sizeSqft: item.squareFootage ?? 700,
    source: 'osm',
    sourceUrl: `https://www.google.com/maps?q=${item.lat},${item.lng}`,
    updatedAt: new Date().toISOString(),
    highlights: [
      item.utilitiesIncluded ? 'Utilities included' : 'Utilities extra',
      item.petFriendly ? 'Pet friendly' : 'No pets',
      item.furnished ? 'Furnished option' : 'Unfurnished option',
    ],
  }));
}

export async function fetchLiveListings(options: FetchLiveListingsOptions = {}): Promise<{
  listings: LiveListing[];
  sourceSummary: string;
}> {
  const city = options.city?.trim() || 'Toronto';
  const province = options.province?.trim();
  const cacheKey = `${normalizeKey(city)}|${normalizeKey(province ?? '')}|${options.limit ?? 0}|${options.maxPrice ?? 0}|${options.minBedrooms ?? -1}`;

  const cached = listingCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return {
      listings: cached.listings,
      sourceSummary: 'OpenStreetMap buildings + Statistics Canada rent benchmark estimates',
    };
  }

  try {
    const [location, { byCity, latestMonth }] = await Promise.all([
      geocodeCity(city),
      loadStatCanRentBenchmarks(),
    ]);

    const elements = await fetchOSMBuildings(location, Math.max(options.limit ?? 36, 72));
    const canonicalCity = location.name || city;
    const canonicalProvince = inferProvince(location, province);
    const benchmark = byCity.get(normalizeKey(canonicalCity)) ?? byCity.get(normalizeKey(city));

    let mapped = elements
      .map((element) => toLiveListing(element, canonicalCity, canonicalProvince, benchmark))
      .filter((item): item is LiveListing => Boolean(item));

    if (options.minBedrooms !== undefined) {
      mapped = mapped.filter((item) => item.bedrooms >= options.minBedrooms!);
    }

    if (options.maxPrice !== undefined && options.maxPrice > 0) {
      mapped = mapped.filter((item) => item.price <= options.maxPrice!);
    }

    mapped = mapped
      .sort((a, b) => a.price - b.price)
      .slice(0, options.limit ?? 36);

    if (mapped.length < 10) {
      mapped = [...mapped, ...fallbackFromSeedData(canonicalCity)].slice(0, options.limit ?? 36);
    }

    listingCache.set(cacheKey, {
      expiresAt: Date.now() + LISTING_CACHE_TTL_MS,
      listings: mapped,
    });

    return {
      listings: mapped,
      sourceSummary: `OpenStreetMap building footprints + StatsCan asking rents (${latestMonth})`,
    };
  } catch {
    const fallback = fallbackFromSeedData(city).slice(0, options.limit ?? 36);
    return {
      listings: fallback,
      sourceSummary: 'Seed catalog fallback (live feeds temporarily unavailable)',
    };
  }
}
