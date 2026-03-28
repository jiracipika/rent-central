'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockBookmarks = [
  { id: '1', title: 'Modern Downtown Loft', address: '123 King St W, Toronto, ON', price: 2400, bedrooms: 2, bathrooms: 1, type: 'condo', sqft: 850, utilities: true, furnished: false, petFriendly: true },
  { id: '4', title: 'Luxury Yaletown Condo', address: '101 Homer St, Vancouver, BC', price: 2800, bedrooms: 2, bathrooms: 2, type: 'condo', sqft: 950, utilities: true, furnished: true, petFriendly: false },
];

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(mockBookmarks);

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  if (bookmarks.length === 0) {
    return (
      <div className="ios-page">
        <div style={{ paddingTop: 60 }}>
          <div className="ios-large-title-area">
            <h1 className="ios-large-title">Saved</h1>
          </div>
          <div className="text-center py-24 px-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--ios-fill3)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10" style={{ color: 'var(--ios-label3)' }}>
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>
            <p className="ios-headline mb-1">No Saved Listings</p>
            <p className="ios-subhead mb-6">Tap the heart icon on any listing to save it here</p>
            <Link
              href="/listings"
              className="ios-btn ios-btn-blue"
              style={{ height: 44, borderRadius: 12, padding: '0 24px', fontSize: 16, display: 'inline-flex' }}
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        <div className="ios-large-title-area flex items-start justify-between pr-4">
          <div>
            <h1 className="ios-large-title">Saved</h1>
            <p className="ios-subhead mt-0.5">{bookmarks.length} saved {bookmarks.length === 1 ? 'property' : 'properties'}</p>
          </div>
        </div>

        <div className="px-4 space-y-3 pb-6">
          {bookmarks.map((listing) => (
            <div key={listing.id} className="relative">
              <Link href={`/listings/${listing.id}`} className="ios-listing-card block">
                <div className="ios-listing-image" style={{ height: 200, aspectRatio: 'unset' }}>
                  <span className="text-5xl" style={{ opacity: 0.15 }}>🏠</span>
                  <button
                    onClick={(e) => { e.preventDefault(); removeBookmark(listing.id); }}
                    className="ios-heart-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="#FF3B30" stroke="#FF3B30" strokeWidth={1.75} className="w-4 h-4">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="ios-listing-price">${listing.price.toLocaleString()}<span>/mo</span></p>
                      <p className="ios-headline mt-0.5" style={{ fontSize: 16 }}>{listing.title}</p>
                      <p className="ios-subhead mt-0.5 truncate" style={{ fontSize: 13 }}>{listing.address}</p>
                    </div>
                    <div
                      className="flex-shrink-0 rounded-[10px] px-2 py-1 text-[11px] font-semibold capitalize"
                      style={{ background: 'var(--ios-fill3)', color: 'var(--ios-label2)', marginTop: 2 }}
                    >
                      {listing.type}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>🛏 {listing.bedrooms}</span>
                    <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>🚿 {listing.bathrooms}</span>
                    <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>{listing.sqft.toLocaleString()} ft²</span>
                    {listing.utilities && <span className="ios-pill ios-pill-blue" style={{ fontSize: 11 }}>Utilities incl.</span>}
                    {listing.furnished && <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>Furnished</span>}
                  </div>
                  <div className="mt-3 pt-3" style={{ borderTop: '0.5px solid var(--ios-sep)' }}>
                    <Link
                      href={`/listings/${listing.id}/apply`}
                      onClick={(e) => e.stopPropagation()}
                      className="ios-btn ios-btn-blue w-full"
                      style={{ height: 40, borderRadius: 10, fontSize: 15 }}
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
