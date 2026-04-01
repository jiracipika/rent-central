'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { listings, propertyTypes } from '@/data/listings';
import type { PropertyType } from '@rent-central/core';

const galleryGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
];

const priceMarks = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];

type SortOption = 'featured' | 'newest' | 'price_asc' | 'price_desc';

export default function ListingsPage() {
  const [search, setSearch] = useState('');
  const [term, setTerm] = useState<3 | 6 | 12>(12);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [petFilter, setPetFilter] = useState(false);
  const [utilitiesFilter, setUtilitiesFilter] = useState(false);
  const [furnishedFilter, setFurnishedFilter] = useState(false);
  const [bedroomFilter, setBedroomFilter] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [hearts, setHearts] = useState<Set<string>>(new Set());
  const [comparing, setComparing] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filtered = useMemo(() => {
    return listings
      .filter((l) => {
        // Price filter
        const price = l.pricePerTerm[term];
        if (price < minPrice || price > maxPrice) return false;

        // Type filter
        if (typeFilter !== 'All' && l.type !== typeFilter.toLowerCase()) return false;

        // Pet filter
        if (petFilter && !l.petFriendly) return false;

        // Utilities filter
        if (utilitiesFilter && !l.utilitiesIncluded) return false;

        // Furnished filter
        if (furnishedFilter && !l.furnished) return false;

        // Bedroom filter
        if (bedroomFilter !== null) {
          if (bedroomFilter === 4 && l.bedrooms < 4) return false;
          else if (bedroomFilter !== 4 && l.bedrooms !== bedroomFilter) return false;
        }

        // Search
        if (search) {
          const q = search.toLowerCase();
          const matchSearch =
            l.title.toLowerCase().includes(q) ||
            l.address.toLowerCase().includes(q) ||
            l.city.toLowerCase().includes(q) ||
            l.province.toLowerCase().includes(q);
          if (!matchSearch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price_asc': return a.pricePerTerm[term] - b.pricePerTerm[term];
          case 'price_desc': return b.pricePerTerm[term] - a.pricePerTerm[term];
          case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'featured':
          default:
            // New listings first, then by date
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [listings, term, sortBy, typeFilter, petFilter, utilitiesFilter, furnishedFilter, bedroomFilter, minPrice, maxPrice, search]);

  const toggleHeart = (id: string) => {
    setHearts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleCompare = (id: string) => {
    setComparing((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  };

  const activeFilterCount = [
    typeFilter !== 'All',
    petFilter,
    utilitiesFilter,
    furnishedFilter,
    bedroomFilter !== null,
    minPrice > 0 || maxPrice < 5000,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setTypeFilter('All');
    setPetFilter(false);
    setUtilitiesFilter(false);
    setFurnishedFilter(false);
    setBedroomFilter(null);
    setMinPrice(0);
    setMaxPrice(5000);
    setSearch('');
  };

  return (
    <div className="ios-page">
      <div style={{ paddingTop: 52, paddingBottom: comparing.size >= 2 ? 80 : 0 }}>

        {/* Search bar */}
        <div className="ios-search-bar">
          <div className="ios-search-field">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="ios-search-icon w-4 h-4">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="City, address, or neighbourhood..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ color: 'var(--ios-label3)', fontSize: 16, lineHeight: 1 }}>✕</button>
            )}
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="ios-segmented">
            {([3, 6, 12] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`ios-seg-item ${term === t ? 'ios-seg-item-active' : ''}`}
              >
                {t} mo
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {/* Filter button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
              style={{
                background: showFilters ? 'var(--ios-blue)' : 'var(--ios-fill3)',
                color: showFilters ? '#fff' : 'var(--ios-label)',
                fontSize: 13,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span style={{
                  background: 'var(--ios-red)',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              style={{
                background: 'var(--ios-fill3)',
                border: 'none',
                borderRadius: 8,
                padding: '6px 10px',
                color: 'var(--ios-label)',
                outline: 'none',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
            </select>
          </div>
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div
            className="mx-4 mb-3"
            style={{
              background: 'var(--ios-grouped-bg2)',
              borderRadius: 16,
              padding: '16px 16px 12px',
              boxShadow: 'var(--ios-shadow-sm)',
              border: '0.5px solid var(--ios-sep)',
            }}
          >
            {/* Price range */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="ios-footnote" style={{ fontWeight: 600, color: 'var(--ios-label)' }}>Price Range</span>
                <span className="ios-footnote" style={{ color: 'var(--ios-blue)' }}>
                  ${minPrice.toLocaleString()} – ${maxPrice >= 5000 ? '5,000+' : maxPrice.toLocaleString()}/mo
                </span>
              </div>
              <div style={{ position: 'relative', height: 40 }}>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 100))}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: 4,
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    background: 'transparent',
                    pointerEvents: 'none',
                    top: 8,
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 100))}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: 4,
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    background: 'transparent',
                    pointerEvents: 'none',
                    top: 8,
                  }}
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="mb-3">
              <span className="ios-footnote" style={{ fontWeight: 600, color: 'var(--ios-label)', display: 'block', marginBottom: 8 }}>Bedrooms</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Any', value: null },
                  { label: 'Studio', value: 0 },
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                  { label: '3', value: 3 },
                  { label: '4+', value: 4 },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setBedroomFilter(opt.value)}
                    className="ios-pill"
                    style={{
                      background: bedroomFilter === opt.value ? 'var(--ios-blue)' : 'var(--ios-fill3)',
                      color: bedroomFilter === opt.value ? '#fff' : 'var(--ios-label)',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property type */}
            <div className="mb-3">
              <span className="ios-footnote" style={{ fontWeight: 600, color: 'var(--ios-label)', display: 'block', marginBottom: 8 }}>Property Type</span>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className="ios-pill"
                    style={{
                      background: typeFilter === t ? 'var(--ios-blue)' : 'var(--ios-fill3)',
                      color: typeFilter === t ? '#fff' : 'var(--ios-label)',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle filters */}
            <div className="flex flex-wrap gap-3 mb-3">
              <button
                onClick={() => setPetFilter(!petFilter)}
                className="ios-pill"
                style={{
                  background: petFilter ? 'rgba(52,199,89,0.12)' : 'var(--ios-fill3)',
                  color: petFilter ? 'var(--ios-green)' : 'var(--ios-label)',
                }}
              >
                🐾 Pet Friendly
              </button>
              <button
                onClick={() => setUtilitiesFilter(!utilitiesFilter)}
                className="ios-pill"
                style={{
                  background: utilitiesFilter ? 'rgba(0,122,255,0.12)' : 'var(--ios-fill3)',
                  color: utilitiesFilter ? 'var(--ios-blue)' : 'var(--ios-label)',
                }}
              >
                💡 Utilities Incl.
              </button>
              <button
                onClick={() => setFurnishedFilter(!furnishedFilter)}
                className="ios-pill"
                style={{
                  background: furnishedFilter ? 'rgba(175,82,222,0.12)' : 'var(--ios-fill3)',
                  color: furnishedFilter ? 'var(--ios-purple)' : 'var(--ios-label)',
                }}
              >
                🛋️ Furnished
              </button>
            </div>

            {/* Clear filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="ios-btn-text"
                style={{ fontSize: 14 }}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Quick type pills (always visible) */}
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
          {search && <> for &ldquo;{search}&rdquo;</>}
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
            <p className="ios-subhead mb-4">Try adjusting your search or filters</p>
            {activeFilterCount > 0 && (
              <button onClick={clearAllFilters} className="ios-btn-text" style={{ fontSize: 15 }}>
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="px-4 space-y-3 pb-6 animate-stagger">
            {filtered.map((listing) => (
              <div key={listing.id} style={{ position: 'relative' }}>
                {/* Compare checkbox */}
                <button
                  onClick={() => toggleCompare(listing.id)}
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 5,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    border: comparing.has(listing.id) ? 'none' : '1.5px solid rgba(255,255,255,0.4)',
                    background: comparing.has(listing.id) ? 'var(--ios-blue)' : 'rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {comparing.has(listing.id) && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                <Link href={`/listings/${listing.id}`} className="ios-listing-card ios-card-lift block">
                  <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: galleryGradients[parseInt(listing.id) % galleryGradients.length],
                    }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.06) 100%)',
                    }} />
                    <span className="text-5xl" style={{ opacity: 0.18, position: 'relative' }}>🏠</span>
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
                        <p className="ios-listing-price">
                          ${listing.pricePerTerm[term].toLocaleString()}<span>/mo</span>
                        </p>
                        <p className="ios-headline mt-0.5" style={{ fontSize: 16 }}>{listing.title}</p>
                        <p className="ios-subhead mt-0.5 truncate" style={{ fontSize: 13 }}>
                          {listing.address}, {listing.city}, {listing.province}
                        </p>
                      </div>
                      <div
                        className="flex-shrink-0 rounded-[10px] px-2 py-1 text-[11px] font-semibold capitalize"
                        style={{ background: 'var(--ios-fill3)', color: 'var(--ios-label2)', marginTop: 2 }}
                      >
                        {listing.type}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>
                        {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`}
                      </span>
                      <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>
                        {listing.bathrooms} bath
                      </span>
                      {listing.squareFootage && (
                        <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>
                          {listing.squareFootage.toLocaleString()} sqft
                        </span>
                      )}
                      {listing.utilitiesIncluded && (
                        <span className="ios-pill ios-pill-blue" style={{ fontSize: 11 }}>Utilities</span>
                      )}
                      {listing.petFriendly && (
                        <span className="ios-pill ios-pill-green" style={{ fontSize: 11 }}>🐾 Pets</span>
                      )}
                      {listing.furnished && (
                        <span className="ios-pill ios-pill-orange" style={{ fontSize: 11 }}>🛋️ Furnished</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Floating compare bar */}
        {comparing.size >= 2 && (
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '0.5px solid var(--ios-sep)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ios-label)' }}>
              {comparing.size} selected
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setComparing(new Set())}
                style={{
                  height: 40,
                  borderRadius: 12,
                  padding: '0 16px',
                  background: 'var(--ios-fill3)',
                  color: 'var(--ios-label)',
                  fontSize: 15,
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
              <Link
                href={`/listings/compare?ids=${[...comparing].join(',')}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  borderRadius: 12,
                  padding: '0 20px',
                  background: 'var(--ios-blue)',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Compare
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
