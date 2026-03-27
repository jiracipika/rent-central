import Link from 'next/link';
import { Card, YouTubeEmbed } from '@rent-central/ui';
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

const features = [
  { icon: '🔍', title: 'Browse Listings', desc: 'Search thousands of verified rentals across Canada.' },
  { icon: '📝', title: 'Apply Online', desc: 'Submit applications with a few clicks. No paperwork hassle.' },
  { icon: '💳', title: 'Secure Payments', desc: 'Pay deposits and rent securely with Stripe integration.' },
  { icon: '✍️', title: 'Digital Contracts', desc: 'Sign leases electronically. Fast, legal, paperless.' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Rent Central
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-500 max-w-xl mx-auto">
            Find your perfect rental across Canada
          </p>
          <div className="mt-10 max-w-lg mx-auto">
            <div className="flex bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
              <input
                type="text"
                placeholder="Enter postal code (e.g. M5H 1A1)"
                className="flex-1 px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 ease-out">
                Search
              </button>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Popular: <span className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">Toronto</span> ·{' '}
            <span className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">Vancouver</span> ·{' '}
            <span className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">Montréal</span> ·{' '}
            <span className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">Calgary</span>
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24" style={{ background: '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 tracking-tight mb-4">
            Everything You Need to Rent
          </h2>
          <p className="text-center text-gray-400 mb-16">One platform for your entire rental journey</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 ease-out">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 text-base font-semibold text-gray-900 tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 tracking-tight mb-4">How It Works</h2>
          <p className="text-center text-gray-400 mb-12">Renting in Canada has never been easier</p>
          <div className="rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <YouTubeEmbed videoId="dQw4w9WgXcQ" title="How Rent Central Works" />
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24" style={{ background: '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">Featured Listings</h2>
              <p className="mt-1 text-gray-400 text-sm">Handpicked properties across Canada</p>
            </div>
            <Link href="/listings" className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-all duration-300 ease-out">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing) => (
              <Link key={listing.id} href={`/listings/${listing.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-out overflow-hidden">
                  {/* Image placeholder */}
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-4xl opacity-40">🏠</span>
                    {listing.isNew && (
                      <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        New
                      </span>
                    )}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                      ♡
                    </button>
                  </div>
                  {/* Details */}
                  <div className="p-6">
                    <p className="text-xl font-semibold text-blue-600">{formatCurrency(listing.pricePerTerm[12])}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                    <h3 className="mt-1 text-base font-semibold text-gray-900 tracking-tight">{listing.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{listing.address}, {listing.city}</p>
                    <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
                      <span>{listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Bed`}</span>
                      <span className="text-gray-200">·</span>
                      <span>{listing.bathrooms} Bath</span>
                      {listing.petFriendly && (
                        <>
                          <span className="text-gray-200">·</span>
                          <span>🐾</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">Ready to Find Your Next Home?</h2>
          <p className="mt-4 text-gray-400 text-lg">
            Join thousands of Canadians who found their perfect rental on Rent Central.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/sign-up"
              className="bg-blue-600 text-white font-medium px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 ease-out"
            >
              Get Started
            </Link>
            <Link
              href="/listings"
              className="bg-white text-gray-900 font-medium px-8 py-3 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300 ease-out"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
