'use client';

import { use, useState } from 'react';
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

export default function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const listing = mockListings.find((l) => l.id === id) || mockListings[0];
  const [term, setTerm] = useState('12');
  const [saved, setSaved] = useState(false);

  const multiplier = term === '3' ? 1.15 : term === '6' ? 1.05 : 1;
  const adjustedPrice = Math.round(listing.price * multiplier);

  const amenities = [
    'Parking', 'In-Suite Laundry',
    ...(listing.petFriendly ? ['Pet Friendly'] : []),
    ...(listing.furnished ? ['Fully Furnished'] : []),
    ...(listing.utilities ? ['Utilities Included'] : []),
    'High-speed Internet',
  ];

  const similar = mockListings.filter((l) => l.id !== listing.id).slice(0, 3);

  const specs = [
    { icon: '🛏', label: listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Bed`, sub: 'Bedrooms' },
    { icon: '🚿', label: `${listing.bathrooms}`, sub: 'Bathrooms' },
    { icon: '📐', label: `${listing.sqft.toLocaleString()}`, sub: 'Square Ft.' },
    { icon: '🏠', label: listing.type.charAt(0).toUpperCase() + listing.type.slice(1), sub: 'Type' },
  ];

  return (
    <div className="ios-page" style={{ paddingBottom: 100 }}>
      <div style={{ paddingTop: 44 }}>

        {/* Back button + action bar */}
        <div
          className="flex items-center justify-between px-2 py-1"
          style={{ minHeight: 44 }}
        >
          <Link href="/listings" className="ios-btn-text flex items-center gap-1" style={{ minWidth: 44, minHeight: 44 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Listings
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className="w-9 h-9 flex items-center justify-center rounded-lg tap-scale"
              style={{ color: saved ? 'var(--ios-red)' : 'var(--ios-blue)' }}
            >
              <svg viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg tap-scale" style={{ color: 'var(--ios-blue)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero image */}
        <div
          style={{
            width: '100%',
            height: 260,
            background: 'var(--ios-fill4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: 64, opacity: 0.12 }}>🏠</span>
          {listing.isNew && (
            <span className="ios-listing-tag" style={{ top: 16, left: 16 }}>New</span>
          )}
        </div>

        {/* Price + title */}
        <div className="px-4 pt-4 pb-2">
          {/* Lease term picker */}
          <div className="ios-segmented mb-3" style={{ display: 'inline-flex' }}>
            {(['3', '6', '12'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`ios-seg-item ${term === t ? 'ios-seg-item-active' : ''}`}
                style={{ padding: '0 16px' }}
              >
                {t} months
              </button>
            ))}
          </div>

          <p className="ios-listing-price" style={{ fontSize: 28 }}>
            ${adjustedPrice.toLocaleString()}
            <span style={{ fontSize: 17 }}>/mo</span>
          </p>
          <h1 className="ios-title3 mt-1">{listing.title}</h1>
          <div className="flex items-center gap-1 mt-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5" style={{ color: 'var(--ios-label3)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="ios-subhead" style={{ fontSize: 14 }}>{listing.address}</p>
          </div>
        </div>

        {/* Quick specs */}
        <div className="ios-scroll-x py-2" style={{ gap: 8 }}>
          {specs.map((s) => (
            <div
              key={s.sub}
              style={{
                background: 'var(--ios-grouped-bg2)',
                borderRadius: 12,
                padding: '12px 16px',
                minWidth: 80,
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              <p style={{ fontSize: 20, marginBottom: 2 }}>{s.icon}</p>
              <p className="ios-headline" style={{ fontSize: 16 }}>{s.label}</p>
              <p className="ios-caption1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="ios-section-header mt-2">About This Property</p>
        <div className="ios-group px-4 py-4" style={{ borderRadius: 16, marginBottom: 8, background: 'var(--ios-grouped-bg2)' }}>
          <p className="ios-body" style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ios-label2)' }}>
            Welcome to this beautiful {listing.type} located at {listing.address}. This property features{' '}
            {listing.bedrooms === 0 ? 'a studio layout' : `${listing.bedrooms} bedroom${listing.bedrooms > 1 ? 's' : ''}`} and{' '}
            {listing.bathrooms} bathroom{listing.bathrooms > 1 ? 's' : ''}, spanning {listing.sqft.toLocaleString()} square feet.
            {listing.petFriendly && ' Pet-friendly with a responsible pet policy.'}
            {listing.furnished && ' Comes fully furnished with modern décor.'}
            {listing.utilities && ' All utilities included in the monthly rent.'}
            {' '}Available from {listing.available}.
          </p>
        </div>

        {/* Amenities */}
        <p className="ios-section-header">Amenities</p>
        <div className="ios-group">
          {amenities.map((a, i) => (
            <div key={a} className="ios-row" style={{ minHeight: 44 }}>
              <span style={{ color: 'var(--ios-green)', fontSize: 14, fontWeight: 600 }}>✓</span>
              <span className="ios-row-label" style={{ fontSize: 15 }}>{a}</span>
            </div>
          ))}
        </div>

        {/* Availability */}
        <p className="ios-section-header mt-2">Availability</p>
        <div className="ios-group">
          <div className="ios-row">
            <span className="ios-row-label">Available From</span>
            <span className="ios-row-value">{listing.available}</span>
          </div>
          <div className="ios-row">
            <span className="ios-row-label">Minimum Term</span>
            <span className="ios-row-value">12 months</span>
          </div>
          <div className="ios-row">
            <span className="ios-row-label">Deposit</span>
            <span className="ios-row-value">${(listing.price).toLocaleString()}</span>
          </div>
        </div>

        {/* Landlord */}
        <p className="ios-section-header mt-2">Landlord</p>
        <div className="ios-group">
          <div className="ios-row" style={{ cursor: 'default' }}>
            <div className="ios-avatar ios-avatar-blue w-10 h-10 text-base font-bold">S</div>
            <div className="flex-1">
              <p className="ios-row-label" style={{ fontSize: 15 }}>Sarah Chen</p>
              <p className="ios-footnote">Member since 2024 · 95% response rate</p>
            </div>
            <span
              className="ios-pill ios-pill-green"
              style={{ fontSize: 11 }}
            >
              Active
            </span>
          </div>
          <Link href={`/messages/1`} className="ios-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--ios-blue)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="ios-row-label" style={{ fontSize: 15 }}>Message Landlord</span>
            <span className="ios-chevron">›</span>
          </Link>
        </div>

        {/* Similar Listings */}
        <p className="ios-section-header mt-2">Similar Listings</p>
        <div className="ios-scroll-x" style={{ paddingBottom: 8 }}>
          {similar.map((s) => (
            <Link
              key={s.id}
              href={`/listings/${s.id}`}
              className="ios-listing-card"
              style={{ width: 220 }}
            >
              <div
                style={{
                  height: 130,
                  background: 'var(--ios-fill4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: 36, opacity: 0.15 }}>🏠</span>
                {s.isNew && <span className="ios-listing-tag" style={{ fontSize: 10 }}>New</span>}
              </div>
              <div className="px-3 py-3">
                <p className="ios-listing-price" style={{ fontSize: 17 }}>${s.price.toLocaleString()}<span>/mo</span></p>
                <p className="ios-headline mt-0.5 truncate" style={{ fontSize: 14 }}>{s.title}</p>
                <p className="ios-caption1 mt-0.5 truncate" style={{ fontSize: 11 }}>{s.address}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Sticky bottom action bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'var(--ios-glass-bg)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: '0.5px solid var(--ios-sep)',
          padding: '12px 16px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        }}
      >
        <div className="flex items-center gap-3 max-w-[640px] mx-auto">
          <div className="flex-1">
            <p className="ios-caption2">Monthly rent</p>
            <p className="ios-listing-price" style={{ fontSize: 22 }}>
              ${adjustedPrice.toLocaleString()}<span style={{ fontSize: 14 }}>/mo</span>
            </p>
          </div>
          <Link
            href={`/listings/${listing.id}/apply`}
            className="ios-btn ios-btn-blue"
            style={{ height: 50, borderRadius: 14, padding: '0 32px', fontSize: 17 }}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
