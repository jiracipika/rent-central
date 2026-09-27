import { describe, expect, it } from 'vitest';
import {
  deriveHighlights,
  estimateBedrooms,
  estimateSizeSqft,
  guessPropertyType,
  inferProvince,
  normalizeKey,
  parseCSVLine,
  priceFromBenchmark,
  seededInt,
  toLiveListing,
  type RentBenchmarks,
} from '../src/lib/live-rental-data';

describe('normalizeKey', () => {
  it('strips diacritics, lowercases, collapses separators', () => {
    expect(normalizeKey('Québec')).toBe('quebec');
    expect(normalizeKey('  Toronto, ON ')).toBe('toronto on');
    expect(normalizeKey('St. John’s')).toBe('st john s');
  });
});

describe('seededInt', () => {
  it('is deterministic per seed and stays within [min, max]', () => {
    expect(seededInt('way-42', 1, 3)).toBe(seededInt('way-42', 1, 3));
    for (let i = 0; i < 50; i++) {
      const v = seededInt(`seed-${i}`, 2, 7);
      expect(v).toBeGreaterThanOrEqual(2);
      expect(v).toBeLessThanOrEqual(7);
    }
  });

  it('varies across distinct seeds', () => {
    const values = new Set(Array.from({ length: 30 }, (_, i) => seededInt(`s${i}`, 0, 9)));
    expect(values.size).toBeGreaterThan(3);
  });
});

describe('parseCSVLine (StatsCan CSV correctness)', () => {
  it('splits plain fields', () => {
    expect(parseCSVLine('a,b,c')).toEqual(['a', 'b', 'c']);
  });
  it('keeps commas inside quotes', () => {
    expect(parseCSVLine('x,"Toronto, ON",y')).toEqual(['x', 'Toronto, ON', 'y']);
  });
  it('un-escapes doubled quotes', () => {
    expect(parseCSVLine('"say ""hi""",end')).toEqual(['say "hi"', 'end']);
  });
});

describe('inferProvince', () => {
  it('explicit fallback wins', () => {
    expect(inferProvince({ latitude: 1, longitude: 2, name: 'x', admin1: 'Ontario' }, 'BC')).toBe('BC');
  });
  it('maps admin1 names to postal abbreviations', () => {
    expect(inferProvince({ latitude: 1, longitude: 2, name: 'x', admin1: 'Ontario' })).toBe('ON');
    expect(inferProvince({ latitude: 1, longitude: 2, name: 'x', admin1: 'British Columbia' })).toBe('BC');
  });
  it('passes through unmapped admin1 and empty geocode results', () => {
    expect(inferProvince({ latitude: 1, longitude: 2, name: 'x', admin1: 'Kebec' })).toBe('Kebec');
    expect(inferProvince({ latitude: 1, longitude: 2, name: 'x' })).toBe('');
  });
});

describe('guessPropertyType', () => {
  it('maps OSM building tags', () => {
    expect(guessPropertyType({ building: 'detached_house' })).toBe('house');
    expect(guessPropertyType({ building: 'residential' })).toBe('condo');
    expect(guessPropertyType({ building: 'apartments' })).toBe('apartment');
    expect(guessPropertyType(undefined)).toBe('apartment');
  });
});

describe('estimateBedrooms / estimateSizeSqft', () => {
  it('bedroom count scales with building levels, deterministically', () => {
    const low = estimateBedrooms({ 'building:levels': '1' }, 'seed-a');
    expect(low).toBeGreaterThanOrEqual(1);
    expect(low).toBeLessThanOrEqual(2);
    expect(estimateBedrooms({ 'building:levels': '1' }, 'seed-a')).toBe(low);
    const none = estimateBedrooms(undefined, 'seed-a');
    expect(none).toBeGreaterThanOrEqual(0);
    expect(none).toBeLessThanOrEqual(3);
  });
  it('size bands grow with bedrooms', () => {
    expect(estimateSizeSqft(0, 's')).toBeLessThan(estimateSizeSqft(2, 's'));
    expect(estimateSizeSqft(2, 's')).toBeLessThan(estimateSizeSqft(4, 's'));
  });
});

describe('priceFromBenchmark', () => {
  const bench: RentBenchmarks = {
    city: 'toronto', month: '2026-09',
    studio: 1800, oneBedroom: 2300, twoBedroom: 3000, threeBedroom: 3800,
  };
  it('anchors near the benchmark band for the bedroom count', () => {
    const p = priceFromBenchmark(bench, 2, 'seed-x');
    expect(p).toBeGreaterThanOrEqual(3000 - 180);
    expect(p).toBeLessThanOrEqual(3000 + 240);
  });
  it('floors at 800 and falls back without a benchmark', () => {
    expect(priceFromBenchmark(undefined, 2, 'seed-x')).toBeGreaterThanOrEqual(800);
    expect(priceFromBenchmark(undefined, -1, 'seed-x')).toBeGreaterThanOrEqual(800);
  });
});

describe('deriveHighlights', () => {
  it('returns exactly three deterministic highlights', () => {
    const a = deriveHighlights({}, 'seed-1');
    const b = deriveHighlights({}, 'seed-1');
    expect(a).toHaveLength(3);
    expect(a).toEqual(b);
  });
  it('tags override: parking leads, street names appear', () => {
    const h = deriveHighlights({ parking: 'yes', 'addr:street': 'Queen West' }, 'seed-2');
    expect(h[0]).toBe('Parking-friendly building');
    expect(h[1]).toBe('On Queen West');
  });
});

describe('toLiveListing', () => {
  const base = { type: 'way' as const, id: 7 };
  it('returns null without coordinates', () => {
    expect(toLiveListing({ ...base, tags: { building: 'yes' } }, 'Toronto', 'ON', undefined)).toBeNull();
  });
  it('maps an OSM element into a fully-typed listing', () => {
    const listing = toLiveListing(
      { ...base, center: { lat: 43.65, lon: -79.38 }, tags: { building: 'apartments', name: 'The Lofts' } },
      'Toronto', 'ON',
      { city: 'toronto', month: '2026-09', oneBedroom: 2300 },
    );
    expect(listing).not.toBeNull();
    expect(listing!.id).toBe('osm-way-7');
    expect(listing!.title).toBe('The Lofts');
    expect(listing!.source).toBe('osm');
    expect(listing!.sourceUrl).toBe('https://www.openstreetmap.org/way/7');
    expect(listing!.highlights).toHaveLength(3);
    expect(listing!.price).toBeGreaterThanOrEqual(800);
  });
  it('title falls back to bedroom/type phrasing when unnamed', () => {
    const listing = toLiveListing(
      { ...base, lat: 43.6, lon: -79.3, tags: { building: 'apartments' } },
      'Toronto', 'ON', undefined,
    );
    expect(listing!.title).toMatch(/Bedroom Apartment in Toronto|Studio Opportunity/);
  });
});
