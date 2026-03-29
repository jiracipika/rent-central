'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';

const mockListings = [
  { id: '1', title: 'Modern Downtown Loft', address: '123 King St W, Toronto', status: 'active' as const, price: 2400, applications: 5, views: 142 },
  { id: '2', title: 'Cozy Plateau Studio', address: '456 St-Denis, Montréal', status: 'active' as const, price: 1700, applications: 3, views: 89 },
  { id: '3', title: 'Yaletown Condo', address: '101 Homer St, Vancouver', status: 'rented' as const, price: 3000, applications: 8, views: 210 },
  { id: '4', title: 'Spacious Family Home', address: '789 Oak Ave, Calgary', status: 'paused' as const, price: 3200, applications: 2, views: 56 },
];

type Filter = 'All' | 'Active' | 'Rented' | 'Paused';

export default function LandlordListingsPage() {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = filter === 'All'
    ? mockListings
    : mockListings.filter((l) => l.status === filter.toLowerCase());

  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="flex items-start justify-between px-4 pt-5 pb-2">
          <div>
            <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-blue)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Landlord
            </p>
            <h1 className="ios-large-title">My Listings</h1>
            <p className="ios-subhead mt-1">
              {mockListings.length} listings · {mockListings.filter(l => l.status === 'active').length} active
            </p>
          </div>
          <Link
            href="/landlord/listings/new"
            className="ios-btn ios-btn-blue ios-gradient-blue"
            style={{ height: 36, borderRadius: 10, padding: '0 16px', fontSize: 14, fontWeight: 600, flexShrink: 0, marginTop: 4 }}
          >
            + New
          </Link>
        </div>

        {/* Filter pills */}
        <div className="ios-scroll-x py-1" style={{ gap: 6, paddingBottom: 6 }}>
          {(['All', 'Active', 'Rented', 'Paused'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`ios-pill ${filter === f ? 'ios-pill-active' : 'ios-pill-gray'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Listing cards */}
        <p className="ios-section-header">{filtered.length} {filtered.length === 1 ? 'Property' : 'Properties'}</p>
        <div className="space-y-0">
          {filtered.length === 0 ? (
            <div className="ios-empty-state">
              <div className="ios-empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-9 h-9" style={{ color: 'var(--ios-label3)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <p className="ios-headline mb-1">No Listings</p>
              <p className="ios-subhead">No properties match this filter</p>
            </div>
          ) : (
            <div className="ios-group mx-4">
              {filtered.map((listing, i) => (
                <div
                  key={listing.id}
                  className="ios-row"
                  style={{
                    minHeight: 72,
                    alignItems: 'flex-start',
                    paddingTop: 14,
                    paddingBottom: 14,
                    cursor: 'default',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-[12px] flex items-center justify-center text-xl"
                    style={{
                      background: listing.status === 'active'
                        ? 'rgba(52,199,89,0.12)'
                        : listing.status === 'rented'
                        ? 'rgba(0,122,255,0.10)'
                        : 'rgba(255,149,0,0.10)',
                    }}
                  >
                    🏠
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="ios-headline truncate" style={{ fontSize: 15 }}>{listing.title}</p>
                        <p className="ios-caption1 mt-0.5 truncate" style={{ color: 'var(--ios-label2)' }}>{listing.address}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="ios-headline" style={{ fontSize: 15, color: 'var(--ios-blue)', fontWeight: 700 }}>
                          {formatCurrency(listing.price)}<span style={{ fontWeight: 400, color: 'var(--ios-label2)', fontSize: 12 }}>/mo</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <span className={`ios-status ios-status-${listing.status}`}>
                        <span className="ios-status-dot" />
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      </span>
                      <span className="ios-caption1" style={{ color: 'var(--ios-label2)' }}>
                        👥 {listing.applications}
                      </span>
                      <span className="ios-caption1" style={{ color: 'var(--ios-label2)' }}>
                        👁 {listing.views}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-2.5">
                      <Link
                        href={`/landlord/listings/${listing.id}/edit`}
                        className="ios-btn-text"
                        style={{ fontSize: 14, fontWeight: 500 }}
                      >
                        Edit
                      </Link>
                      <span style={{ color: 'var(--ios-sep)', fontSize: 14 }}>·</span>
                      <Link
                        href={`/listings/${listing.id}`}
                        className="ios-btn-text"
                        style={{ fontSize: 14, fontWeight: 500 }}
                      >
                        View
                      </Link>
                      <span style={{ color: 'var(--ios-sep)', fontSize: 14 }}>·</span>
                      <Link
                        href="/landlord/applications"
                        className="ios-btn-text"
                        style={{ fontSize: 14, fontWeight: 500 }}
                      >
                        Applicants
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-6" />

      </div>
    </div>
  );
}
