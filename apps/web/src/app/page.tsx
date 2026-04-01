'use client';

import Link from 'next/link';
import { listings, popularCities } from '@/data/listings';
import { formatCurrency } from '@rent-central/core';

const galleryGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
];

const featuredListings = listings.filter((l) => l.isNew).slice(0, 6);

const steps = [
  { icon: '🔍', color: '#007AFF', label: 'Search', desc: 'Browse thousands of verified listings across Canada' },
  { icon: '🏠', color: '#34C759', label: 'Tour', desc: 'Schedule viewings and explore your future home' },
  { icon: '✍️', color: '#AF52DE', label: 'Apply', desc: 'One-tap applications with digital contracts' },
];

const trustStats = [
  { value: '80K+', label: 'Happy renters' },
  { value: '12K+', label: 'Verified listings' },
  { value: '4.9', label: 'App Store rating' },
];

export default function Home() {
  return (
    <div className="ios-page ios-hero-bg">

      {/* ── Hero ── */}
      <section className="animate-rc-fade-up" style={{ paddingTop: 60 }}>
        <div className="px-4 pt-12 pb-8 max-w-[640px] mx-auto text-center">
          <div
            className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(0,122,255,0.10)',
              border: '0.5px solid rgba(0,122,255,0.20)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--ios-blue)' }}
            />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ios-blue)', letterSpacing: '0.02em' }}>
              Canada&rsquo;s #1 Rental Platform
            </span>
          </div>

          <h1
            className="ios-large-title mb-3"
            style={{ fontSize: 'clamp(34px, 6vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
          >
            Find Your Perfect
            <br />
            <span style={{ color: 'var(--ios-blue)' }}>Home in Canada</span>
          </h1>
          <p className="ios-subhead mb-8 mx-auto max-w-sm" style={{ fontSize: 17, color: 'var(--ios-label2)', lineHeight: 1.5 }}>
            Browse, apply, and sign — all in one beautiful place.
          </p>

          {/* Search bar */}
          <div
            className="flex items-center gap-3 mx-auto ios-shadow-md"
            style={{
              background: 'var(--ios-grouped-bg2)',
              borderRadius: 18,
              padding: '6px 6px 6px 16px',
              maxWidth: 520,
              border: '0.5px solid var(--ios-sep)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--ios-label3)' }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Postal code, city, or neighbourhood"
              className="flex-1 bg-transparent border-none outline-none"
              style={{ fontSize: 15, color: 'var(--ios-label)', letterSpacing: '-0.016em', padding: '10px 0' }}
            />
            <Link
              href="/listings"
              className="ios-btn ios-btn-blue ios-gradient-blue"
              style={{ height: 42, borderRadius: 13, padding: '0 22px', fontSize: 15, fontWeight: 600 }}
            >
              Search
            </Link>
          </div>

          {/* Popular cities */}
          <p className="ios-caption1 mt-4" style={{ color: 'var(--ios-label3)' }}>
            Popular:&nbsp;
            {['Toronto', 'Vancouver', 'Montréal', 'Calgary'].map((city, i) => (
              <span key={city}>
                <Link href="/listings" className="ios-btn-text ios-link-hover" style={{ fontSize: 12 }}>{city}</Link>
                {i < 3 && <span style={{ color: 'var(--ios-sep)', margin: '0 4px' }}>·</span>}
              </span>
            ))}
          </p>
        </div>

        {/* Trust stats */}
        <div className="flex items-center justify-center gap-8 pb-8 px-4">
          {trustStats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="ios-title2" style={{ fontSize: 22, color: 'var(--ios-label)' }}>{s.value}</p>
              <p className="ios-caption1 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Listings Carousel ── */}
      <section className="mb-6 animate-rc-fade-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between px-4 pb-3">
          <h2 className="ios-title3">Featured Listings</h2>
          <Link href="/listings" className="ios-btn-text" style={{ fontSize: 15 }}>See All</Link>
        </div>
        <div className="ios-scroll-x" style={{ paddingBottom: 8 }}>
          {featuredListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className="ios-listing-card ios-card-lift"
              style={{ width: 268 }}
            >
              <div className="ios-listing-image" style={{ height: 178, aspectRatio: 'unset' }}>
                <div
                  className="absolute inset-0"
                  style={{
                    background: galleryGradients[parseInt(listing.id) % galleryGradients.length],
                    opacity: 0.6,
                  }}
                />
                <span className="text-4xl" style={{ opacity: 0.25, position: 'relative' }}>🏠</span>
                {listing.isNew && (
                  <span
                    className="ios-listing-tag"
                    style={{ background: 'var(--ios-blue)', backdropFilter: 'blur(8px)' }}
                  >
                    New
                  </span>
                )}
                <button className="ios-heart-btn" onClick={(e) => e.preventDefault()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4 h-4" style={{ color: '#8E8E93' }}>
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
              <div className="px-3 pb-3 pt-2.5">
                <p className="ios-listing-price">{formatCurrency(listing.pricePerTerm[12])}<span>/mo</span></p>
                <p className="ios-headline mt-0.5 truncate" style={{ fontSize: 15 }}>{listing.title}</p>
                <p className="ios-caption1 mt-0.5 truncate" style={{ color: 'var(--ios-label2)' }}>
                  {listing.city}, {listing.province}
                </p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>
                    {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`}
                  </span>
                  <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>
                    {listing.bathrooms} bath
                  </span>
                  {listing.petFriendly && (
                    <span className="ios-pill ios-pill-green" style={{ fontSize: 11 }}>🐾 Pets</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Browse by City ── */}
      <section className="mb-6 animate-rc-fade-up" style={{ animationDelay: '0.18s' }}>
        <p className="ios-section-header">Browse by City</p>
        <div className="ios-group ios-shadow-xs">
          {popularCities.map((city) => (
            <Link key={city.name} href="/listings" className="ios-row" style={{ minHeight: 52 }}>
              <span className="text-xl" style={{ width: 28, textAlign: 'center' }}>{city.icon}</span>
              <span className="ios-row-label">{city.name}</span>
              <span className="ios-row-value ios-footnote">{city.count} rentals</span>
              <span className="ios-chevron" style={{ fontSize: 20 }}>›</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="mb-6 animate-rc-fade-up" style={{ animationDelay: '0.24s' }}>
        <p className="ios-section-header">How Rent Central Works</p>
        <div className="ios-scroll-x" style={{ gap: 10, paddingBottom: 8 }}>
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="ios-card ios-shadow-xs"
              style={{ width: 180, padding: '20px 16px', flexShrink: 0 }}
            >
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl mb-3"
                style={{ background: `${step.color}15` }}
              >
                {step.icon}
              </div>
              <p className="ios-headline" style={{ fontSize: 15 }}>
                <span style={{ color: 'var(--ios-blue)' }}>{i + 1}.</span> {step.label}
              </p>
              <p className="ios-caption1 mt-1 leading-snug" style={{ color: 'var(--ios-label2)' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Landlord CTA ── */}
      <section className="mb-6 px-4 animate-rc-fade-up" style={{ animationDelay: '0.3s' }}>
        <div className="ios-cta-banner ios-cta-banner-blue ios-shadow-blue">
          <div
            style={{
              position: 'absolute', top: -40, right: -40, width: 180, height: 180,
              borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute', bottom: -30, left: 60, width: 120, height: 120,
              borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
            }}
          />
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.60)' }}>
            For Landlords
          </p>
          <h2 className="ios-title3 mb-1" style={{ color: '#fff', fontSize: 22 }}>List Your Property</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, letterSpacing: '-0.016em', marginBottom: 20 }}>
            Reach thousands of pre-verified renters across Canada.
          </p>
          <Link
            href="/landlord/listings/new"
            className="ios-btn"
            style={{
              background: 'rgba(255,255,255,0.20)',
              color: '#fff',
              height: 44,
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              display: 'inline-flex',
              backdropFilter: 'blur(12px)',
              border: '0.5px solid rgba(255,255,255,0.30)',
            }}
          >
            Post a Listing &rarr;
          </Link>
        </div>
      </section>

      {/* ── Sign Up CTA ── */}
      <section className="mb-10 px-4 animate-rc-fade-up" style={{ animationDelay: '0.36s' }}>
        <div
          className="ios-shadow-sm"
          style={{
            background: 'var(--ios-grouped-bg2)',
            borderRadius: 22,
            padding: '28px 24px',
            textAlign: 'center',
            border: '0.5px solid var(--ios-sep)',
          }}
        >
          <div
            className="w-12 h-12 rounded-[14px] flex items-center justify-center text-xl mx-auto mb-4"
            style={{ background: 'rgba(0,122,255,0.10)' }}
          >
            🏠
          </div>
          <p className="ios-title3 mb-2" style={{ fontSize: 20 }}>Ready to Find Your Home?</p>
          <p className="ios-subhead mb-6" style={{ color: 'var(--ios-label2)', fontSize: 15 }}>
            Join 80,000+ Canadians who found their perfect rental.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/sign-up" className="ios-btn ios-btn-blue ios-gradient-blue ios-shadow-blue" style={{ height: 46, borderRadius: 13, padding: '0 28px', fontSize: 16, fontWeight: 600 }}>
              Get Started
            </Link>
            <Link
              href="/listings"
              className="ios-btn"
              style={{ height: 46, borderRadius: 13, padding: '0 28px', fontSize: 16, background: 'var(--ios-fill3)', color: 'var(--ios-blue)', fontWeight: 600 }}
            >
              Browse
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
