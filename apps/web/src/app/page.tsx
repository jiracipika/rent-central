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
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Find Your Perfect Rental
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Canada&apos;s most trusted rental marketplace. Browse, apply, pay, and sign — all in one place.
          </p>
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex bg-white rounded-xl shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="Enter postal code (e.g. M5H 1A1)"
                className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 transition-colors">
                Search
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm text-blue-200">
            Popular: <span className="underline cursor-pointer">Toronto</span> ·{' '}
            <span className="underline cursor-pointer">Vancouver</span> ·{' '}
            <span className="underline cursor-pointer">Montréal</span> ·{' '}
            <span className="underline cursor-pointer">Calgary</span>
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Rent
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <span className="text-4xl">{f.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How It Works</h2>
          <p className="text-center text-gray-500 mb-12">Renting in Canada has never been easier</p>
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <YouTubeEmbed videoId="dQw4w9WgXcQ" title="How Rent Central Works" />
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
            <Link href="/listings" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing) => (
              <Link key={listing.id} href={`/listings/${listing.id}`}>
                <Card
                  title={listing.title}
                  subtitle={`${listing.city}, ${listing.province} · ${formatCurrency(listing.pricePerTerm[12])}/mo`}
                  className="h-full hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
                    <span>{listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Bed`}</span>
                    <span>·</span>
                    <span>{listing.bathrooms} Bath</span>
                    {listing.petFriendly && (
                      <>
                        <span>·</span>
                        <span>🐾</span>
                      </>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to Find Your Next Home?</h2>
          <p className="mt-4 text-blue-100 text-lg">
            Join thousands of Canadians who found their perfect rental on Rent Central.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/sign-up"
              className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/listings"
              className="border border-white/30 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
