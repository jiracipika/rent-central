'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockListings = [
  { id: '1', title: 'Modern Downtown Loft', address: '123 King St W, Toronto, ON', price: 2400, bedrooms: 2, bathrooms: 1, type: 'condo', sqft: 850, available: '2026-04-15', isNew: true, petFriendly: true, furnished: false, utilities: true, photos: [] },
  { id: '2', title: 'Spacious Family Home', address: '456 Main St, Vancouver, BC', price: 3200, bedrooms: 4, bathrooms: 3, type: 'house', sqft: 2200, available: '2026-05-01', isNew: false, petFriendly: true, furnished: false, utilities: false, photos: [] },
  { id: '3', title: 'Cozy Plateau Apartment', address: '789 Rachel E, Montreal, QC', price: 1650, bedrooms: 1, bathrooms: 1, type: 'apartment', sqft: 620, available: '2026-04-01', isNew: true, petFriendly: false, furnished: true, utilities: true, photos: [] },
  { id: '4', title: 'Luxury Yaletown Condo', address: '101 Homer St, Vancouver, BC', price: 2800, bedrooms: 2, bathrooms: 2, type: 'condo', sqft: 950, available: '2026-04-20', isNew: false, petFriendly: true, furnished: true, utilities: true, photos: [] },
  { id: '5', title: 'Basement Suite in Bridgeland', address: '222 1 Ave NE, Calgary, AB', price: 1100, bedrooms: 1, bathrooms: 1, type: 'basement', sqft: 550, available: '2026-04-10', isNew: true, petFriendly: false, furnished: false, utilities: true, photos: [] },
  { id: '6', title: 'Liberty Village Studio', address: '55 East Liberty St, Toronto, ON', price: 1900, bedrooms: 0, bathrooms: 1, type: 'studio', sqft: 480, available: '2026-03-28', isNew: true, petFriendly: false, furnished: true, utilities: true, photos: [] },
  { id: '7', title: 'Beach-side Townhouse', address: '333 Beach Ave, Vancouver, BC', price: 3500, bedrooms: 3, bathrooms: 2, type: 'townhouse', sqft: 1800, available: '2026-06-01', isNew: false, petFriendly: true, furnished: false, utilities: false, photos: [] },
  { id: '8', title: 'Plateau Duplex Upper', address: '444 Mont-Royal E, Montreal, QC', price: 2200, bedrooms: 3, bathrooms: 2, type: 'apartment', sqft: 1400, available: '2026-05-15', isNew: false, petFriendly: true, furnished: false, utilities: true, photos: [] },
];

const termMultipliers: Record<string, number> = { '3': 1.15, '6': 1.05, '12': 1 };
const propertyTypes = ['All Types', 'Apartment', 'Condo', 'House', 'Townhouse', 'Basement', 'Studio'];
const bedroomOptions = ['Any', '0', '1', '2', '3', '4+'];

export default function ListingsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [term, setTerm] = useState('12');
  const [sortBy, setSortBy] = useState('newest');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [bedFilter, setBedFilter] = useState('Any');
  const [petFilter, setPetFilter] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [hearts, setHearts] = useState<Set<string>>(new Set());

  const multiplier = termMultipliers[term];
  const adjustedPrice = (p: number) => Math.round(p * multiplier);

  const filtered = mockListings
    .filter((l) => {
      if (typeFilter !== 'All Types' && l.type !== typeFilter.toLowerCase()) return false;
      if (bedFilter !== 'Any') {
        const beds = bedFilter === '4+' ? 4 : parseInt(bedFilter);
        if (bedFilter === '0' ? l.bedrooms > 0 : l.bedrooms < beds) return false;
      }
      if (petFilter && !l.petFriendly) return false;
      if (l.price < priceRange[0] || l.price > priceRange[1]) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0;
    });

  const toggleHeart = (id: string) => {
    setHearts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Browse Listings</h1>
          <p className="mt-1 text-sm text-gray-400">{filtered.length} properties available</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['3', '6', '12'] as const).map((t) => (
              <button key={t} onClick={() => setTerm(t)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${term === t ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {t}mo
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button onClick={() => setView('grid')} className={`p-1.5 rounded-md transition-all ${view === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
            </button>
            <button onClick={() => setView('list')} className={`p-1.5 rounded-md transition-all ${view === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="1" y="1" width="14" height="4" rx="1"/><rect x="1" y="7" width="14" height="4" rx="1"/><rect x="1" y="13" width="14" height="2" rx="1"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Price:</span>
          <input type="number" placeholder="Min" value={priceRange[0] || ''} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-20 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <span className="text-gray-300">–</span>
          <input type="number" placeholder="Max" value={priceRange[1] || ''} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-20 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={bedFilter} onChange={(e) => setBedFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          {bedroomOptions.map((b) => <option key={b} value={b}>{b === 'Any' ? 'Bedrooms' : b === '0' ? 'Studio' : `${b}+ Beds`}</option>)}
        </select>
        <button onClick={() => setPetFilter(!petFilter)}
          className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-all ${petFilter ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
          🐾 Pet Friendly
        </button>
      </div>

      {/* Listings */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">🔍</span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No listings match your filters</h3>
          <p className="mt-1 text-sm text-gray-400">Try adjusting your search criteria</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((listing) => (
            <Link key={listing.id} href={`/listings/${listing.id}`} className="group">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-out overflow-hidden">
                <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-4xl opacity-40">🏠</span>
                  {listing.isNew && <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">New</span>}
                  <button onClick={(e) => { e.preventDefault(); toggleHeart(listing.id); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                    style={{ color: hearts.has(listing.id) ? '#ef4444' : '#9ca3af' }}>
                    {hearts.has(listing.id) ? '♥' : '♡'}
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-xl font-semibold text-blue-600">${adjustedPrice(listing.price).toLocaleString()}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                  <h3 className="mt-1 text-base font-semibold text-gray-900 tracking-tight">{listing.title}</h3>
                  <p className="mt-0.5 text-sm text-gray-400">{listing.address}</p>
                  <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">🛏️ {listing.bedrooms === 0 ? 'Studio' : listing.bedrooms}</span>
                    <span className="text-gray-200">·</span>
                    <span className="flex items-center gap-1">🚿 {listing.bathrooms}</span>
                    <span className="text-gray-200">·</span>
                    <span>{listing.sqft} sqft</span>
                    {listing.petFriendly && <><span className="text-gray-200">·</span><span>🐾</span></>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((listing) => (
            <Link key={listing.id} href={`/listings/${listing.id}`} className="group block">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-out overflow-hidden flex">
                <div className="relative w-48 h-36 bg-gray-100 flex-shrink-0 flex items-center justify-center">
                  <span className="text-3xl opacity-40">🏠</span>
                  {listing.isNew && <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">New</span>}
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{listing.title}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">{listing.address}</p>
                      </div>
                      <button onClick={(e) => { e.preventDefault(); toggleHeart(listing.id); }}
                        className="text-lg transition-colors" style={{ color: hearts.has(listing.id) ? '#ef4444' : '#9ca3af' }}>
                        {hearts.has(listing.id) ? '♥' : '♡'}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-semibold text-blue-600">${adjustedPrice(listing.price).toLocaleString()}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>🛏️ {listing.bedrooms === 0 ? 'Studio' : listing.bedrooms}</span>
                      <span>🚿 {listing.bathrooms}</span>
                      <span>{listing.sqft} sqft</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
