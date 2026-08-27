'use client';

import type { PropertyType } from '@rent-central/core';

export interface BookmarkedListing {
  id: string;
  title: string;
  address: string;
  city: string;
  province: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  type: PropertyType;
  sqft: number;
  utilities: boolean;
  furnished: boolean;
  petFriendly: boolean;
  savedAt: number;
}

const KEY = 'rentcentral_bookmarks';

export function getBookmarks(): BookmarkedListing[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is BookmarkedListing =>
        !!item &&
        typeof item === 'object' &&
        typeof (item as BookmarkedListing).id === 'string' &&
        typeof (item as BookmarkedListing).title === 'string' &&
        typeof (item as BookmarkedListing).price === 'number',
    );
  } catch {
    return [];
  }
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().some((b) => b.id === id);
}

export function addBookmark(listing: Omit<BookmarkedListing, 'savedAt'>): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const bookmarks = getBookmarks();
    if (bookmarks.some((b) => b.id === listing.id)) return true;
    bookmarks.unshift({ ...listing, savedAt: Date.now() });
    localStorage.setItem(KEY, JSON.stringify(bookmarks));
    window.dispatchEvent(new CustomEvent('rentcentral:bookmarks-changed'));
    return true;
  } catch {
    return false;
  }
}

export function removeBookmark(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const next = getBookmarks().filter((b) => b.id !== id);
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('rentcentral:bookmarks-changed'));
    return true;
  } catch {
    return false;
  }
}

export function toggleBookmark(
  listing: Omit<BookmarkedListing, 'savedAt'>,
): boolean {
  if (isBookmarked(listing.id)) {
    removeBookmark(listing.id);
    return false;
  }
  addBookmark(listing);
  return true;
}
