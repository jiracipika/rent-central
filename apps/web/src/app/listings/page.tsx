'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockListings = [
  { id: '1', title: 'Modern Downtown Loft', address: '123 King St W, Toronto, ON', price: 2400, bedrooms: 2, bathrooms: 1, type: 'condo', sqft: 850, available: '2026-04-15', isNew: true, petFriendly: true, furnished: false, utilities: true },
  { id: '2', title: 'Spacious Family Home', address: '456 Main St, Vancouver, BC', price: 3200, bedrooms: 4, bathrooms: 3, type: 'house', sqft: 2200, available: '2026-05-01', isNew: false, petFriendly: true, furnished: false, utilities: false },
  { id: '3', title: 'Cozy Plateau Apartment', address: '789 Rachel E, Montreal, QC', price: 1650, bedrooms: 1, bathrooms: 1, type: 'apartment', sqft: 620, available: '2026-04-01', isNew: true, petFriendly: false, furnished: true, utilities: true },
  { id: '4', title: 'Luxury Yaletown Condo', address: '101 Homer St, Vancouver, BC', price: 2800, bedrooms: 2, bathrooms: 2, type: 'condo', sqft: 950, available: '2026-04-20', isNew: false, petFriendly: true, furnished: true, utilities: true },
  { id: '5', title: 'Basement Suite in Bridgeland', address: '222 1 Ave NE, Calgary, AB', price: 1100, bedrooms: 1, bathrooms: 1, type: 'basement', sqft: 550, available: '2026-04-10', isNew: true, petFriendly: false, furnished: false, utilities: true },
  { id: '6', title: 'Liberty Village Studio', address: '55 East Liberty St, Toronto, ON', price: 1900, bedrooms: 0, bathrooms: 1, type: 'studio', sqft: 480, available: '2026-03-28', isNew: true, petFriendly: false, furnished: true, utilities: true },
  { id: '7', title: 'Beach-side Townhouse', address: '333 Beach Ave, Vancouver, BC', price: 3500, bedrooms: 3, bathrooms: 2, type: 'townhouse', sqft: 1800, available: '2026-06-01', isNew: false, petFriendly: true, furnished: false, utilities: false },
  { id: '8', title: 'Plateau Duplex Upper', address: '444 Mont-Royal E, Montreal, QC', price: 2200, bedrooms: 3, bathrooms: 2, type: 'apartment', sqft: 1400, available: '2026-05-15', isNew: false, petFriendly: true, furnished: false, utilities: true },
];

const termMultipliers: Record<string, number> = { '3': 1.15, '6': 1.05, '12': 1 };
const propertyTypes = ['All', 'Apartment', 'Condo', 'House', 'Townhouse', 'Basement', 'Studio'];

export default function ListingsPage() {
  const [search, setSearch] = useState('');
  const [term, setTerm] = useState('12');
  const [sortBy, setSortBy] = useState('newest');
  const [typeFilter, setTypeFilter] = useState('All');
  const [petFilter, setPetFilter] = useState(false);
  const [hearts, setHearts] = useState<Set<string>>(new Set());

  const multiplier = termMultipliers[term];
  const adjustedPrice = (p: number) => Math.round(p * multiplier);

  const filtered = mockListings
    .filter((l) => {
      if (typeFilter !== 'All' && l.type !== typeFilter.toLowerCase()) return false;
      if (petFilter && !l.petFriendly) return false;
      if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !l.address.toLowerCase().includes(search.toLowerCase())) return false;
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
    <div className="ios-page">
      <div style={{ paddingTop: 52 }}>

        {/* iOS search bar */}
        <div className="ios-search-bar">
          <div className="ios-search-field">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="ios-search-icon w-4 h-4">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search listings…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ color: 'var(--ios-label3)', fontSize: 16, lineHeight: 1 }}>✕</button>
            )}
          </div>
        </div>

        {/* Lease term segmented control */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="ios-segmented">
            {(['3', '6', '12'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`ios-seg-item ${term === t ? 'ios-seg-item-active' : ''}`}
              >
                {t} mo
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="ios-footnote"
            style={{
              background: 'var(--ios-fill3)',
              border: 'none',
              borderRadius: 8,
              padding: '6px 10px',
              color: 'var(--ios-label)',
              outline: 'none',
              fontSize: 13,
              letterSpacing: '-0.006em',
            }}
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>
        </div>

        {/* Property type filter pills (horizontal scroll) */}
        <div className="ios-scroll-x py-1" style={{ gap: 6, paddingBottom: 4 }}>
          {propertyTypes.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`ios-pill ${typeFilter === t ? 'ios-pill-active' : 'ios-pill-gray'}`}
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => setPetFilter(!petFilter)}
            className={`ios-pill ${petFilter ? 'ios-pill-green' : 'ios-pill-gray'}`}
          >
            🐾 Pets
          </button>
        </div>

        {/* Result count */}
        <p className="px-4 py-2 ios-caption1">
          {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} available
        </p>

        {/* Listings */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 px-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--ios-fill3)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" style={{ color: 'var(--ios-label3)' }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="ios-headline mb-1">No Results</p>
            <p className="ios-subhead">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="px-4 space-y-3 pb-6">
            {filtered.map((listing) => (
              <Link key={listing.id} href={`/listings/${listing.id}`} className="ios-listing-card block">
                <div className="ios-listing-image" style={{ height: 200, aspectRatio: 'unset' }}>
                  <span className="text-5xl" style={{ opacity: 0.15 }}>🏠</span>
                  {listing.isNew && <span className="ios-listing-tag">New</span>}
                  <button
                    onClick={(e) => { e.preventDefault(); toggleHeart(listing.id); }}
                    className="ios-heart-btn"
                  >
                    <svg viewBox="0 0 24 24" fill={hearts.has(listing.id) ? '#FF3B30' : 'none'} stroke={hearts.has(listing.id) ? '#FF3B30' : '#8E8E93'} strokeWidth={1.75} className="w-4 h-4">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="ios-listing-price">${adjustedPrice(listing.price).toLocaleString()}<span>/mo</span></p>
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
                    <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>
                      🛏 {listing.bedrooms === 0 ? 'Studio' : listing.bedrooms}
                    </span>
                    <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>
                      🚿 {listing.bathrooms}
                    </span>
                    <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>
                      {listing.sqft.toLocaleString()} ft²
                    </span>
                    {listing.utilities && (
                      <span className="ios-pill ios-pill-blue" style={{ fontSize: 11 }}>Utilities incl.</span>
                    )}
                    {listing.petFriendly && (
                      <span className="ios-pill ios-pill-green" style={{ fontSize: 11 }}>🐾</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
