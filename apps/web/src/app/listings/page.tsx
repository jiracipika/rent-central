'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';
import type { LiveListing } from '@/lib/live-rental-data';

const quickCities = ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa'];

type ApiResult = {
  listings: LiveListing[];
  sourceSummary: string;
  generatedAt: string;
};

export default function ListingsPage() {
  const [city, setCity] = useState('Toronto');
  const [maxPrice, setMaxPrice] = useState(4200);
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceSummary, setSourceSummary] = useState('');
  const [generatedAt, setGeneratedAt] = useState('');
  const [listings, setListings] = useState<LiveListing[]>([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const requestedCity = url.searchParams.get('city');
    if (requestedCity && requestedCity.trim()) {
      setCity(requestedCity);
    }
  }, []);

  useEffect(() => {
    let alive = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({
          city,
          limit: '48',
          maxPrice: String(maxPrice),
          minBedrooms: String(minBedrooms),
        });

        const response = await fetch(`/api/live-listings?${query.toString()}`);
        if (!response.ok) {
          throw new Error(`Failed loading live listings (${response.status})`);
        }

        const data = (await response.json()) as ApiResult;
        if (!alive) return;

        setListings(data.listings);
        setSourceSummary(data.sourceSummary);
        setGeneratedAt(data.generatedAt);
      } catch (fetchError) {
        if (!alive) return;
        setError(fetchError instanceof Error ? fetchError.message : 'Unexpected listing fetch error');
        setListings([]);
      } finally {
        if (alive) setIsLoading(false);
      }
    }

    void load();

    return () => {
      alive = false;
    };
  }, [city, maxPrice, minBedrooms]);

  const stats = useMemo(() => {
    if (!listings.length) {
      return {
        median: 0,
        low: 0,
        high: 0,
      };
    }

    const prices = listings.map((item) => item.price).sort((a, b) => a - b);
    const median = prices[Math.floor(prices.length / 2)];

    return {
      median,
      low: prices[0],
      high: prices[prices.length - 1],
    };
  }, [listings]);

  return (
    <div className="listings-shell">
      <section className="listings-header">
        <p className="hero-kicker">Live explorer</p>
        <h1>High-confidence rental discovery</h1>
        <p>
          Filter by city, budget, and bedroom count. Listings are generated from live open-data feeds and normalized for consistent comparisons.
        </p>
      </section>

      <section className="listings-controls">
        <div className="form-field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Toronto"
            autoComplete="off"
          />
        </div>

        <div className="form-field">
          <label htmlFor="price">Max monthly rent: {formatCurrency(maxPrice)}</label>
          <input
            id="price"
            type="range"
            min={1200}
            max={6000}
            step={100}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
          />
        </div>

        <div className="form-field">
          <label htmlFor="bedrooms">Minimum bedrooms</label>
          <select id="bedrooms" value={minBedrooms} onChange={(event) => setMinBedrooms(Number(event.target.value))}>
            <option value={0}>Studio+</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
          </select>
        </div>
      </section>

      <div className="city-strip compact">
        {quickCities.map((quickCity) => (
          <button
            key={quickCity}
            type="button"
            className={`city-chip ${quickCity.toLowerCase() === city.toLowerCase() ? 'active' : ''}`}
            onClick={() => setCity(quickCity)}
          >
            {quickCity}
          </button>
        ))}
      </div>

      <section className="market-stats">
        <div>
          <p className="stat-label">Visible listings</p>
          <p className="stat-value">{listings.length}</p>
        </div>
        <div>
          <p className="stat-label">Median asking</p>
          <p className="stat-value">{stats.median ? formatCurrency(stats.median) : '--'}</p>
        </div>
        <div>
          <p className="stat-label">Range</p>
          <p className="stat-value">
            {stats.low && stats.high ? `${formatCurrency(stats.low)} - ${formatCurrency(stats.high)}` : '--'}
          </p>
        </div>
      </section>

      <p className="hero-source">
        {isLoading ? 'Refreshing live feed...' : sourceSummary}
        {generatedAt ? ` · Updated ${new Date(generatedAt).toLocaleString('en-CA')}` : ''}
      </p>

      {error && <p className="error-banner">{error}</p>}

      <section className="listing-live-grid">
        {isLoading && Array.from({ length: 8 }).map((_, index) => <div key={index} className="loading-card" />)}

        {!isLoading && listings.map((listing) => (
          <article key={listing.id} className="listing-live-card">
            <p className="listing-preview-price">{formatCurrency(listing.price)}<span>/mo</span></p>
            <h3>{listing.title}</h3>
            <p className="listing-preview-address">
              {listing.address}, {listing.city}
              {listing.province ? `, ${listing.province}` : ''}
            </p>

            <div className="listing-preview-meta">
              <span>{listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`}</span>
              <span>{listing.bathrooms} bath</span>
              <span>{listing.sizeSqft} sqft</span>
            </div>

            <div className="listing-preview-highlights">
              {listing.highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="listing-live-actions">
              <a href={listing.sourceUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                Source
              </a>
              <a
                href={`https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Map
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="listings-next-step">
        <h2>Need deeper workflows?</h2>
        <p>Use applications, messaging, contracts, and landlord dashboards to complete the full leasing lifecycle.</p>
        <div className="hero-actions">
          <Link href="/applications" className="btn btn-primary">Open applications</Link>
          <Link href="/landlord" className="btn btn-ghost">Landlord dashboard</Link>
        </div>
      </section>
    </div>
  );
}
