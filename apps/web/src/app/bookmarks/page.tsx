'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockBookmarks = [
  { id: '1', title: 'Modern Downtown Loft', address: '123 King St W, Toronto, ON', price: 2400, bedrooms: 2, bathrooms: 1, type: 'condo', sqft: 850 },
  { id: '4', title: 'Luxury Yaletown Condo', address: '101 Homer St, Vancouver, BC', price: 2800, bedrooms: 2, bathrooms: 2, type: 'condo', sqft: 950 },
];

export default function BookmarksPage() {
  const [saved, setSaved] = useState(true);

  if (!saved) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 pt-28 text-center">
        <span className="text-5xl">🏠</span>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">No saved listings yet</h2>
        <p className="mt-1 text-sm text-gray-400">Browse listings and tap the heart icon to save your favorites</p>
        <Link href="/listings" className="mt-6 inline-block bg-blue-600 text-white font-medium px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all">Browse Listings</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Saved Listings</h1>
          <p className="mt-1 text-sm text-gray-400">{mockBookmarks.length} saved properties</p>
        </div>
        <button onClick={() => setSaved(false)} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear all</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBookmarks.map((listing) => (
          <Link key={listing.id} href={`/listings/${listing.id}`} className="group">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                <span className="text-4xl opacity-40">🏠</span>
                <span className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500">♥</span>
              </div>
              <div className="p-5">
                <p className="text-xl font-semibold text-blue-600">${listing.price.toLocaleString()}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                <h3 className="mt-1 text-base font-semibold text-gray-900">{listing.title}</h3>
                <p className="mt-0.5 text-sm text-gray-400">{listing.address}</p>
                <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
                  <span>🛏️ {listing.bedrooms}</span>
                  <span className="text-gray-200">·</span>
                  <span>🚿 {listing.bathrooms}</span>
                  <span className="text-gray-200">·</span>
                  <span>{listing.sqft} sqft</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
