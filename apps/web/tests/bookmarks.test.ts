import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addBookmark,
  getBookmarks,
  isBookmarked,
  removeBookmark,
  toggleBookmark,
} from '../src/lib/bookmarks';

// localStorage stub (bookmarks.ts guards on `typeof window`, so window must
// exist with a working storage backend before each test).
const store = new Map<string, string>();
// The module references BOTH bare `localStorage` and `window.localStorage`
// (equivalent in the browser, not in a node test env) — stub both to one
// in-memory store.
const storage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => void store.set(k, v),
  removeItem: (k: string) => void store.delete(k),
};
vi.stubGlobal('localStorage', storage);
vi.stubGlobal('window', {
  localStorage: storage,
  localStorage: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  },
  // addBookmark/removeBookmark announce changes on the window.
  dispatchEvent: () => true,
});
vi.stubGlobal('CustomEvent', class CustomEvent {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
});

const listing = {
  id: 'l1',
  title: 'Sunny 2BR',
  address: '123 Main St',
  city: 'Toronto',
  province: 'ON',
  price: 2400,
  bedrooms: 2,
  bathrooms: 1,
  type: 'apartment' as const,
  sqft: 750,
  utilities: true,
  furnished: false,
  petFriendly: true,
};

beforeEach(() => {
  store.clear();
});

describe('bookmarks', () => {
  it('empty state: no bookmarks before any action', () => {
    expect(getBookmarks()).toEqual([]);
    expect(isBookmarked('l1')).toBe(false);
  });

  it('addBookmark persists and reports saved', () => {
    expect(addBookmark(listing)).toBe(true);
    expect(isBookmarked('l1')).toBe(true);
    const all = getBookmarks();
    expect(all).toHaveLength(1);
    expect(all[0].title).toBe('Sunny 2BR');
    expect(typeof all[0].savedAt).toBe('number');
  });

  it('addBookmark is idempotent on duplicates (no double entry)', () => {
    expect(addBookmark(listing)).toBe(true);
    // Already-saved resolves to success without duplicating the entry.
    expect(addBookmark(listing)).toBe(true);
    expect(getBookmarks()).toHaveLength(1);
  });

  it('removeBookmark drops the entry and is idempotent', () => {
    addBookmark(listing);
    expect(removeBookmark('l1')).toBe(true);
    expect(removeBookmark('l1')).toBe(true); // no-op still succeeds
    expect(getBookmarks()).toHaveLength(0);
  });

  it('toggleBookmark flips state both ways (takes the listing object)', () => {
    expect(toggleBookmark(listing)).toBe(true);
    expect(isBookmarked('l1')).toBe(true);
    expect(toggleBookmark(listing)).toBe(false);
    expect(isBookmarked('l1')).toBe(false);
  });

  it('corrupted storage falls back to empty instead of throwing', () => {
    store.set('rentcentral_bookmarks', '{not json');
    expect(getBookmarks()).toEqual([]);
    expect(() => addBookmark(listing)).not.toThrow();
  });
});
