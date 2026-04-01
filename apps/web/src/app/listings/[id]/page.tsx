'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { getListingById, getSimilarListings } from '@/data/listings';
import { formatCurrency } from '@rent-central/core';

const galleryGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
];

export default function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const listing = getListingById(id);
  const [term, setTerm] = useState<3 | 6 | 12>(12);
  const [saved, setSaved] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!listing) {
    return (
      <div className="ios-page" style={{ paddingTop: 100 }}>
        <div className="text-center px-6">
          <div className="ios-empty-icon mx-auto mb-4" style={{ fontSize: 32 }}>🏠</div>
          <h1 className="ios-title3 mb-2">Listing Not Found</h1>
          <p className="ios-subhead mb-6">This listing may have been removed or is no longer available.</p>
          <Link href="/listings" className="ios-btn ios-btn-blue" style={{ height: 44, borderRadius: 12, padding: '0 24px', fontSize: 15 }}>
            Browse Listings
          </Link>
        </div>
      </div>
    );
  }

  const multiplier = term === 3 ? 1.15 : term === 6 ? 1.05 : 1;
  const monthlyPrice = Math.round(listing.pricePerTerm[term]);

  const similar = getSimilarListings(listing, 4);

  const specs = [
    { icon: '🛏', label: listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Bed`, sub: 'Bedrooms' },
    { icon: '🚿', label: `${listing.bathrooms}`, sub: 'Bathrooms' },
    ...(listing.squareFootage ? [{ icon: '📐', label: `${listing.squareFootage.toLocaleString()}`, sub: 'Square Ft.' }] : []),
    { icon: '🏠', label: listing.type.charAt(0).toUpperCase() + listing.type.slice(1), sub: 'Type' },
    ...(listing.floor ? [{ icon: '🏢', label: `${listing.floor}${getOrdinalSuffix(listing.floor)}`, sub: 'Floor' }] : []),
  ];

  const contactLandlord = () => {
    alert('This feature will be available soon! You\'ll be able to message landlords directly.');
  };

  return (
    <div className="ios-page" style={{ paddingBottom: 100 }}>
      <div style={{ paddingTop: 44 }}>

        {/* Back button + action bar */}
        <div className="flex items-center justify-between px-2 py-1" style={{ minHeight: 44 }}>
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
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: listing.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="w-9 h-9 flex items-center justify-center rounded-lg tap-scale"
              style={{ color: 'var(--ios-blue)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image gallery */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '100%',
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              background: galleryGradients[activeImage % galleryGradients.length],
            }}
          >
            <span style={{ fontSize: 80, opacity: 0.18, position: 'relative' }}>🏠</span>
            {listing.isNew && (
              <span className="ios-listing-tag" style={{ top: 16, left: 16, background: 'var(--ios-blue)' }}>New</span>
            )}
            {/* Gallery dots */}
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 6,
              }}
            >
              {galleryGradients.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: i === activeImage ? 20 : 7,
                    height: 7,
                    borderRadius: 4,
                    background: i === activeImage ? '#fff' : 'rgba(255,255,255,0.5)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Price + title */}
        <div className="px-4 pt-4 pb-2">
          {/* Lease term picker */}
          <div className="ios-segmented mb-3" style={{ display: 'inline-flex' }}>
            {([3, 6, 12] as const).map((t) => (
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
            ${monthlyPrice.toLocaleString()}
            <span style={{ fontSize: 17 }}>/mo</span>
          </p>
          <h1 className="ios-title3 mt-1">{listing.title}</h1>
          <div className="flex items-center gap-1 mt-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5" style={{ color: 'var(--ios-label3)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="ios-subhead" style={{ fontSize: 14 }}>
              {listing.address}, {listing.city}, {listing.province}
            </p>
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
                boxShadow: 'var(--ios-shadow-xs)',
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
          <p className="ios-body" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ios-label2)' }}>
            {listing.description}
          </p>
        </div>

        {/* Amenities */}
        <p className="ios-section-header">Amenities</p>
        <div className="ios-group">
          {listing.amenities.map((a, i) => (
            <div key={a} className="ios-row" style={{ minHeight: 44 }}>
              <span style={{ color: 'var(--ios-green)', fontSize: 14, fontWeight: 600 }}>✓</span>
              <span className="ios-row-label" style={{ fontSize: 15 }}>{a}</span>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <p className="ios-section-header mt-2">Property Features</p>
        <div className="ios-group">
          <div className="ios-row">
            <span className="ios-row-label">Utilities Included</span>
            <span className="ios-row-value" style={{ color: listing.utilitiesIncluded ? 'var(--ios-green)' : 'var(--ios-label3)' }}>
              {listing.utilitiesIncluded ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="ios-row">
            <span className="ios-row-label">Parking Included</span>
            <span className="ios-row-value" style={{ color: listing.parkingIncluded ? 'var(--ios-green)' : 'var(--ios-label3)' }}>
              {listing.parkingIncluded ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="ios-row">
            <span className="ios-row-label">Pet Friendly</span>
            <span className="ios-row-value" style={{ color: listing.petFriendly ? 'var(--ios-green)' : 'var(--ios-label3)' }}>
              {listing.petFriendly ? 'Yes 🐾' : 'No'}
            </span>
          </div>
          <div className="ios-row">
            <span className="ios-row-label">Furnished</span>
            <span className="ios-row-value" style={{ color: listing.furnished ? 'var(--ios-green)' : 'var(--ios-label3)' }}>
              {listing.furnished ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {/* Availability & Pricing */}
        <p className="ios-section-header mt-2">Availability & Pricing</p>
        <div className="ios-group">
          <div className="ios-row">
            <span className="ios-row-label">Available From</span>
            <span className="ios-row-value">{formatDate(listing.availableFrom)}</span>
          </div>
          <div className="ios-row">
            <span className="ios-row-label">Minimum Term</span>
            <span className="ios-row-value">{listing.minimumLeaseTerm} months</span>
          </div>
          <div className="ios-row">
            <span className="ios-row-label">Deposit</span>
            <span className="ios-row-value">{formatCurrency(listing.deposit)}</span>
          </div>
          {listing.squareFootage && (
            <div className="ios-row">
              <span className="ios-row-label">Price per sq ft</span>
              <span className="ios-row-value">
                ${((monthlyPrice / listing.squareFootage) * 12).toFixed(0)}/yr
              </span>
            </div>
          )}
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
            <span className="ios-pill ios-pill-green" style={{ fontSize: 11 }}>Active</span>
          </div>
          <button
            onClick={contactLandlord}
            className="ios-row"
            style={{ width: '100%', border: 'none', background: 'var(--ios-grouped-bg2)', cursor: 'pointer' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--ios-blue)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="ios-row-label" style={{ fontSize: 15, color: 'var(--ios-blue)' }}>Contact Landlord</span>
            <span className="ios-chevron">›</span>
          </button>
        </div>

        {/* Similar Listings */}
        {similar.length > 0 && (
          <>
            <p className="ios-section-header mt-2">Similar Listings</p>
            <div className="ios-scroll-x" style={{ paddingBottom: 8 }}>
              {similar.map((s) => (
                <Link
                  key={s.id}
                  href={`/listings/${s.id}`}
                  className="ios-listing-card ios-card-lift"
                  style={{ width: 220 }}
                >
                  <div
                    style={{
                      height: 130,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      background: galleryGradients[parseInt(s.id) % galleryGradients.length],
                    }}
                  >
                    <span style={{ fontSize: 36, opacity: 0.18, position: 'relative' }}>🏠</span>
                    {s.isNew && <span className="ios-listing-tag" style={{ fontSize: 10 }}>New</span>}
                  </div>
                  <div className="px-3 py-3">
                    <p className="ios-listing-price" style={{ fontSize: 17 }}>
                      ${s.pricePerTerm[12].toLocaleString()}<span>/mo</span>
                    </p>
                    <p className="ios-headline mt-0.5 truncate" style={{ fontSize: 14 }}>{s.title}</p>
                    <p className="ios-caption1 mt-0.5 truncate" style={{ fontSize: 11 }}>
                      {s.city}, {s.province}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="ios-pill ios-pill-gray" style={{ fontSize: 10, height: 22, padding: '0 6px' }}>
                        {s.bedrooms === 0 ? 'Studio' : `${s.bedrooms}bd`}
                      </span>
                      <span className="ios-pill ios-pill-gray" style={{ fontSize: 10, height: 22, padding: '0 6px' }}>
                        {s.bathrooms}ba
                      </span>
                      {s.petFriendly && (
                        <span className="ios-pill ios-pill-green" style={{ fontSize: 10, height: 22, padding: '0 6px' }}>🐾</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

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
            <p className="ios-caption2">Monthly rent ({term}mo term)</p>
            <p className="ios-listing-price" style={{ fontSize: 22 }}>
              ${monthlyPrice.toLocaleString()}<span style={{ fontSize: 14 }}>/mo</span>
            </p>
          </div>
          <Link
            href={`/listings/${listing.id}/apply`}
            className="ios-btn ios-btn-blue ios-gradient-blue"
            style={{ height: 50, borderRadius: 14, padding: '0 32px', fontSize: 17, fontWeight: 600 }}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return (s[(v - 20) % 10] || s[v] || s[0]);
}
