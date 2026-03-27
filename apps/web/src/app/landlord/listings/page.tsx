'use client';

import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';

const mockListings = [
  { id: '1', title: 'Modern Downtown Loft', address: '123 King St W, Toronto', status: 'active' as const, price: 2400, applications: 5, views: 142 },
  { id: '2', title: 'Cozy Plateau Studio', address: '456 St-Denis, Montréal', status: 'active' as const, price: 1700, applications: 3, views: 89 },
  { id: '3', title: 'Yaletown Condo', address: '101 Homer St, Vancouver', status: 'rented' as const, price: 3000, applications: 8, views: 210 },
  { id: '4', title: 'Spacious Family Home', address: '789 Oak Ave, Calgary', status: 'paused' as const, price: 3200, applications: 2, views: 56 },
];

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  rented: 'bg-blue-50 text-blue-700',
  paused: 'bg-amber-50 text-amber-700',
  draft: 'bg-gray-100 text-gray-600',
};

export default function LandlordListingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 pt-28">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="rc-section-title">My Listings</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--rc-muted)' }}>4 listings · 2 active</p>
        </div>
        <Link href="/landlord/listings/new" className="rc-btn-primary">
          + New Listing
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {['All', 'Active', 'Rented', 'Paused'].map((f) => (
          <button key={f} className="rc-badge text-[11px] bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            {f}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {mockListings.map((listing) => (
          <div key={listing.id} className="rc-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold" style={{ color: 'var(--rc-text)' }}>{listing.title}</h3>
                  <span className={`rc-badge text-[10px] ${statusStyles[listing.status]}`}>{listing.status}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>{listing.address}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm" style={{ color: 'var(--rc-primary)' }}>{formatCurrency(listing.price)}<span className="font-normal text-xs" style={{ color: 'var(--rc-muted)' }}>/mo</span></p>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4" style={{ borderTop: '1px solid var(--rc-border)' }}>
              <span className="text-xs" style={{ color: 'var(--rc-muted)' }}>👥 {listing.applications} applications</span>
              <span className="text-xs" style={{ color: 'var(--rc-muted)' }}>👁 {listing.views} views</span>
              <div className="flex-1" />
              <Link href={`/landlord/listings/${listing.id}/edit`} className="text-xs font-medium transition-colors duration-150 hover:text-blue-700" style={{ color: 'var(--rc-primary)' }}>
                Edit
              </Link>
              <Link href={`/listings/${listing.id}`} className="text-xs font-medium transition-colors duration-150 hover:text-blue-700" style={{ color: 'var(--rc-primary)' }}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
