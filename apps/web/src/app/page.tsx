'use client';

import Link from 'next/link';
import type { Property } from '@rent-central/core';
import { formatCurrency } from '@rent-central/core';

const mockListings: Property[] = [
  {
    id: '1', landlordId: 'l1', title: 'Modern Downtown Apartment', description: 'Beautiful 2-bed near transit.',
    type: 'apartment', status: 'active', address: '123 King St W', city: 'Toronto', province: 'ON',
    postalCode: 'M5H 1A1', lat: 43.6487, lng: -79.3854, bedrooms: 2, bathrooms: 1,
    pricePerTerm: { 3: 3600, 6: 3450, 12: 3300 }, deposit: 1650, utilitiesIncluded: false,
    parkingIncluded: true, petFriendly: true, furnished: false, amenities: ['Gym', 'Rooftop'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'), minimumLeaseTerm: 12,
    createdAt: new Date(), isNew: true,
  },
  {
    id: '2', landlordId: 'l2', title: 'Cozy Plateau Studio', description: 'Charming studio in the Plateau.',
    type: 'studio', status: 'active', address: '456 St-Denis', city: 'Montréal', province: 'QC',
    postalCode: 'H2J 2W5', lat: 45.5225, lng: -73.5848, bedrooms: 0, bathrooms: 1,
    pricePerTerm: { 3: 2700, 6: 2550, 12: 2400 }, deposit: 1200, utilitiesIncluded: true,
    parkingIncluded: false, petFriendly: false, furnished: true, amenities: ['Laundry'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-05-01'), minimumLeaseTerm: 6,
    createdAt: new Date(), isNew: true,
  },
  {
    id: '3', landlordId: 'l3', title: 'Spacious Family Home', description: '3-bed house with yard.',
    type: 'house', status: 'active', address: '789 Oak Ave', city: 'Vancouver', province: 'BC',
    postalCode: 'V6B 1A1', lat: 49.2827, lng: -123.1207, bedrooms: 3, bathrooms: 2,
    pricePerTerm: { 3: 5400, 6: 5100, 12: 4800 }, deposit: 2400, utilitiesIncluded: false,
    parkingIncluded: true, petFriendly: true, furnished: false, amenities: ['Garden', 'Garage'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-04-15'), minimumLeaseTerm: 12,
    createdAt: new Date(), isNew: false,
  },
  {
    id: '4', landlordId: 'l4', title: 'Bright Yaletown Condo', description: 'Modern condo with views.',
    type: 'condo', status: 'active', address: '101 Homer St', city: 'Vancouver', province: 'BC',
    postalCode: 'V6B 2W9', lat: 49.2799, lng: -123.1244, bedrooms: 1, bathrooms: 1,
    pricePerTerm: { 3: 3300, 6: 3150, 12: 3000 }, deposit: 1500, utilitiesIncluded: true,
    parkingIncluded: true, petFriendly: false, furnished: true, amenities: ['Pool', 'Gym'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-05-01'), minimumLeaseTerm: 6,
    createdAt: new Date(), isNew: true,
  },
  {
    id: '5', landlordId: 'l5', title: 'Basement Suite in Bridgeland', description: 'Affordable suite near downtown.',
    type: 'basement', status: 'active', address: '222 1 St NE', city: 'Calgary', province: 'AB',
    postalCode: 'T2E 1A1', lat: 51.0534, lng: -114.0626, bedrooms: 1, bathrooms: 1,
    pricePerTerm: { 3: 2100, 6: 1950, 12: 1800 }, deposit: 900, utilitiesIncluded: true,
    parkingIncluded: false, petFriendly: true, furnished: false, amenities: ['Laundry'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'), minimumLeaseTerm: 3,
    createdAt: new Date(), isNew: true,
  },
  {
    id: '6', landlordId: 'l6', title: 'South End Townhouse', description: 'Great townhouse for families.',
    type: 'townhouse', status: 'active', address: '55 Quinpool Rd', city: 'Halifax', province: 'NS',
    postalCode: 'B3J 1A1', lat: 44.6488, lng: -63.5752, bedrooms: 3, bathrooms: 2,
    pricePerTerm: { 3: 3300, 6: 3150, 12: 3000 }, deposit: 1500, utilitiesIncluded: false,
    parkingIncluded: true, petFriendly: true, furnished: false, amenities: ['Driveway', 'Storage'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-06-01'), minimumLeaseTerm: 12,
    createdAt: new Date(), isNew: false,
  },
];

const cities = [
  { name: 'Toronto',   icon: '🏙️', count: '2,400+' },
  { name: 'Vancouver', icon: '🌉', count: '1,800+' },
  { name: 'Montréal',  icon: '⛪', count: '1,500+' },
  { name: 'Calgary',   icon: '🌾', count: '900+' },
  { name: 'Ottawa',    icon: '🏛️', count: '750+' },
  { name: 'Halifax',   icon: '⚓', count: '420+' },
];

const features = [
  { icon: '🔍', color: '#007AFF', label: 'Search',   desc: 'Thousands of verified listings' },
  { icon: '📝', color: '#34C759', label: 'Apply',    desc: 'One-tap rental applications' },
  { icon: '💳', color: '#FF9500', label: 'Pay',      desc: 'Secure Stripe payments' },
  { icon: '✍️', color: '#AF52DE', label: 'Sign',     desc: 'Digital lease contracts' },
];

export default function Home() {
  return (
    <div className="ios-page">

      {/* ── Hero ── */}
      <section style={{ paddingTop: 56 }}>
        <div className="px-4 pt-10 pb-6 max-w-[640px] mx-auto text-center">
          <p className="ios-footnote mb-2 font-semibold tracking-widest uppercase" style={{ color: 'var(--ios-blue)', letterSpacing: '0.08em' }}>
            Canada's #1 Rental App
          </p>
          <h1
            className="ios-large-title mb-3"
            style={{ fontSize: 'clamp(32px, 6vw, 48px)', lineHeight: 1.1 }}
          >
            Find Your Perfect Home
          </h1>
          <p className="ios-subhead mb-8" style={{ fontSize: '17px', color: 'var(--ios-label2)' }}>
            Browse, apply, and sign — all in one place.
          </p>

          {/* iOS-style search bar */}
          <div
            className="flex items-center gap-3 mx-auto"
            style={{
              background: 'var(--ios-grouped-bg2)',
              borderRadius: 16,
              padding: '6px 6px 6px 14px',
              boxShadow: '0 1px 0 var(--ios-sep)',
              maxWidth: 520,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--ios-label3)' }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Postal code, city, or neighbourhood"
              className="flex-1 bg-transparent border-none outline-none"
              style={{ fontSize: 15, color: 'var(--ios-label)', letterSpacing: '-0.016em', padding: '8px 0' }}
            />
            <Link
              href="/listings"
              className="ios-btn ios-btn-blue flex-shrink-0"
              style={{ height: 40, borderRadius: 12, padding: '0 20px', fontSize: 15 }}
            >
              Search
            </Link>
          </div>

          {/* Popular cities */}
          <p className="ios-caption1 mt-4" style={{ color: 'var(--ios-label3)' }}>
            Popular: &nbsp;
            {['Toronto', 'Vancouver', 'Montréal', 'Calgary'].map((city, i) => (
              <span key={city}>
                <Link href="/listings" className="ios-btn-text" style={{ fontSize: 12 }}>{city}</Link>
                {i < 3 && <span style={{ color: 'var(--ios-sep)' }}> · </span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── Featured Listings Carousel ── */}
      <section className="mb-6">
        <div className="flex items-center justify-between px-4 pb-2">
          <h2 className="ios-title3">Featured Listings</h2>
          <Link href="/listings" className="ios-btn-text" style={{ fontSize: 15 }}>See All</Link>
        </div>
        <div className="ios-scroll-x" style={{ paddingBottom: 8 }}>
          {mockListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className="ios-listing-card"
              style={{ width: 260 }}
            >
              <div className="ios-listing-image" style={{ height: 172, aspectRatio: 'unset' }}>
                <span className="text-4xl" style={{ opacity: 0.18 }}>🏠</span>
                {listing.isNew && <span className="ios-listing-tag">New</span>}
                <button className="ios-heart-btn" onClick={(e) => e.preventDefault()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4 h-4" style={{ color: '#8E8E93' }}>
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
              <div className="px-3 py-3">
                <p className="ios-listing-price">{formatCurrency(listing.pricePerTerm[12])}<span>/mo</span></p>
                <p className="ios-headline mt-0.5 truncate" style={{ fontSize: 15 }}>{listing.title}</p>
                <p className="ios-caption1 mt-0.5 truncate">{listing.address}, {listing.city}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>
                    {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`}
                  </span>
                  <span className="ios-pill ios-pill-gray" style={{ fontSize: 11 }}>
                    {listing.bathrooms} bath
                  </span>
                  {listing.petFriendly && (
                    <span className="ios-pill ios-pill-green" style={{ fontSize: 11 }}>🐾 Pets OK</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Browse by City ── */}
      <section className="mb-6">
        <p className="ios-section-header">Browse by City</p>
        <div className="ios-group">
          {cities.map((city, i) => (
            <Link key={city.name} href="/listings" className="ios-row" style={{ minHeight: 52 }}>
              <span className="text-xl">{city.icon}</span>
              <span className="ios-row-label">{city.name}</span>
              <span className="ios-row-value ios-footnote">{city.count} rentals</span>
              <span className="ios-chevron">›</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="mb-6">
        <p className="ios-section-header">How Rent Central Works</p>
        <div className="ios-scroll-x gap-3">
          {features.map((f, i) => (
            <div
              key={f.label}
              style={{
                width: 160,
                background: 'var(--ios-grouped-bg2)',
                borderRadius: 16,
                padding: '20px 16px',
                flexShrink: 0,
              }}
            >
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl mb-3"
                style={{ background: `${f.color}18` }}
              >
                {f.icon}
              </div>
              <p className="ios-headline" style={{ fontSize: 15 }}>{i + 1}. {f.label}</p>
              <p className="ios-caption1 mt-1 leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Landlord CTA ── */}
      <section className="mb-6 px-4">
        <div
          className="rounded-[20px] overflow-hidden p-6"
          style={{ background: 'var(--ios-blue)' }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
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
              display: 'inline-flex',
              backdropFilter: 'blur(8px)',
            }}
          >
            Post a Listing
          </Link>
        </div>
      </section>

      {/* ── Sign Up CTA ── */}
      <section className="mb-8 px-4">
        <div
          style={{
            background: 'var(--ios-grouped-bg2)',
            borderRadius: 20,
            padding: '24px 20px',
            textAlign: 'center',
          }}
        >
          <p className="ios-title3 mb-2" style={{ fontSize: 20 }}>Ready to Find Your Home?</p>
          <p className="ios-subhead mb-6" style={{ color: 'var(--ios-label2)', fontSize: 15 }}>
            Join 80,000+ Canadians who found their perfect rental.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/sign-up" className="ios-btn ios-btn-blue" style={{ height: 44, borderRadius: 12, padding: '0 24px', fontSize: 15 }}>
              Get Started
            </Link>
            <Link
              href="/listings"
              className="ios-btn"
              style={{ height: 44, borderRadius: 12, padding: '0 24px', fontSize: 15, background: 'var(--ios-fill3)', color: 'var(--ios-blue)' }}
            >
              Browse
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
