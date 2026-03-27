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

  const amenities: string[] = [
    'Parking', 'Laundry', ...(listing.petFriendly ? ['Pet Friendly'] : []),
    ...(listing.furnished ? ['Furnished'] : []),
    ...(listing.utilities ? ['Utilities Included'] : []),
  ];

  const similar = mockListings.filter((l) => l.id !== listing.id).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <Link href="/listings" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">← Back to listings</Link>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-80 bg-gray-100 rounded-2xl flex items-center justify-center">
            <span className="text-6xl opacity-30">🏠</span>
          </div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{listing.title}</h1>
                <p className="text-gray-400 mt-1">{listing.address}</p>
              </div>
              {listing.isNew && <span className="bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full flex-shrink-0">New</span>}
            </div>
            <div className="flex items-center gap-2 mt-4">
              {(['3', '6', '12'] as const).map((t) => (
                <button key={t} onClick={() => setTerm(t)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${term === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {t} Months
                </button>
              ))}
            </div>
            <p className="mt-3 text-2xl font-semibold text-blue-600">${adjustedPrice.toLocaleString()}<span className="text-base font-normal text-gray-400">/mo</span></p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '🛏️', label: 'Bedrooms', value: listing.bedrooms === 0 ? 'Studio' : listing.bedrooms },
              { icon: '🚿', label: 'Bathrooms', value: listing.bathrooms },
              { icon: '📐', label: 'Square Feet', value: `${listing.sqft}` },
              { icon: '🏠', label: 'Type', value: listing.type.charAt(0).toUpperCase() + listing.type.slice(1) },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-4 text-center">
                <span className="text-lg">{s.icon}</span>
                <p className="text-lg font-semibold text-gray-900 mt-1">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-500 leading-relaxed">
              Welcome to this beautiful {listing.type} located at {listing.address}. This property features {listing.bedrooms === 0 ? 'a studio layout' : `${listing.bedrooms} bedroom${listing.bedrooms > 1 ? 's' : ''}`} and {listing.bathrooms} bathroom{listing.bathrooms > 1 ? 's' : ''}, spanning {listing.sqft} square feet of living space.
              {listing.petFriendly && ' Pet-friendly with responsible pet policy.'}
              {listing.furnished && ' Comes fully furnished with modern decor.'}
              {listing.utilities && ' All utilities are included in the monthly rent.'}
              Available starting {listing.available}. Don&apos;t miss this opportunity!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {amenities.map((a) => (
                <span key={a} className="bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-full">{a}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">👤</div>
              <div>
                <p className="font-semibold text-gray-900">Sarah Chen</p>
                <p className="text-sm text-gray-400">Joined 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
              <span className="text-emerald-500">●</span> 95% response rate
            </div>
            <div className="flex gap-3">
              <Link href={`/listings/${listing.id}/apply`} className="flex-1 bg-blue-600 text-white text-center font-medium px-4 py-2.5 rounded-full hover:bg-blue-700 transition-all">Apply Now</Link>
              <button onClick={() => setSaved(!saved)}
                className={`px-4 py-2.5 rounded-full border font-medium text-sm transition-all ${saved ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                {saved ? '♥ Saved' : '♡ Save'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar listings */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-6">Similar Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similar.map((s) => (
            <Link key={s.id} href={`/listings/${s.id}`} className="group">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="relative h-40 bg-gray-100 flex items-center justify-center">
                  <span className="text-3xl opacity-40">🏠</span>
                  {s.isNew && <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">New</span>}
                </div>
                <div className="p-4">
                  <p className="font-semibold text-blue-600">${s.price.toLocaleString()}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                  <h3 className="mt-1 text-sm font-semibold text-gray-900">{s.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{s.address}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
