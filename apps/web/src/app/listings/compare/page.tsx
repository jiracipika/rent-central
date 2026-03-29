'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ALL_LISTINGS = [
  { id: '1', title: 'Modern Downtown Loft', address: '123 King St W, Toronto, ON', price: 2400, bedrooms: 2, bathrooms: 1, type: 'condo', sqft: 850, available: 'Apr 15', petFriendly: true, furnished: false, utilities: true, amenities: ['Gym', 'Rooftop', 'Concierge'] },
  { id: '2', title: 'Spacious Family Home', address: '456 Main St, Vancouver, BC', price: 3200, bedrooms: 4, bathrooms: 3, type: 'house', sqft: 2200, available: 'May 1', petFriendly: true, furnished: false, utilities: false, amenities: ['Yard', 'Garage', 'Laundry'] },
  { id: '3', title: 'Cozy Plateau Apartment', address: '789 Rachel E, Montreal, QC', price: 1650, bedrooms: 1, bathrooms: 1, type: 'apartment', sqft: 620, available: 'Apr 1', petFriendly: false, furnished: true, utilities: true, amenities: ['Laundry', 'Balcony'] },
  { id: '4', title: 'Luxury Yaletown Condo', address: '101 Homer St, Vancouver, BC', price: 2800, bedrooms: 2, bathrooms: 2, type: 'condo', sqft: 950, available: 'Apr 20', petFriendly: true, furnished: true, utilities: true, amenities: ['Pool', 'Gym', 'Concierge', 'Parking'] },
  { id: '5', title: 'Basement Suite in Bridgeland', address: '222 1 Ave NE, Calgary, AB', price: 1100, bedrooms: 1, bathrooms: 1, type: 'basement', sqft: 550, available: 'Apr 10', petFriendly: false, furnished: false, utilities: true, amenities: ['Laundry'] },
  { id: '6', title: 'Liberty Village Studio', address: '55 East Liberty St, Toronto, ON', price: 1900, bedrooms: 0, bathrooms: 1, type: 'studio', sqft: 480, available: 'Mar 28', petFriendly: false, furnished: true, utilities: true, amenities: ['Gym', 'Rooftop'] },
];

function ComparisonRow({ label, values, highlight }: { label: string; values: React.ReactNode[]; highlight?: 'min' | 'max' }) {
  const numericValues = values.map((v) => {
    if (typeof v === 'number') return v;
    if (typeof v === 'string') {
      const num = parseFloat(v.replace(/[^0-9.]/g, ''));
      return isNaN(num) ? null : num;
    }
    return null;
  });

  const bestIdx = highlight === 'min'
    ? numericValues.indexOf(Math.min(...numericValues.filter((v): v is number => v !== null)))
    : highlight === 'max'
    ? numericValues.indexOf(Math.max(...numericValues.filter((v): v is number => v !== null)))
    : -1;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `100px repeat(${values.length}, 1fr)`,
        borderTop: '0.5px solid var(--ios-sep)',
      }}
    >
      <div style={{ padding: '10px 12px', fontSize: 13, fontWeight: 500, color: 'var(--ios-label2)' }}>
        {label}
      </div>
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            padding: '10px 12px',
            fontSize: 14,
            fontWeight: i === bestIdx ? 700 : 400,
            color: i === bestIdx ? 'var(--ios-green)' : 'var(--ios-label)',
            textAlign: 'center',
            background: i === bestIdx ? 'rgba(52,199,89,0.06)' : 'transparent',
          }}
        >
          {v}
        </div>
      ))}
    </div>
  );
}

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids')?.split(',').filter(Boolean) || [];

  const listings = ids
    .map((id) => ALL_LISTINGS.find((l) => l.id === id))
    .filter(Boolean) as typeof ALL_LISTINGS;

  if (listings.length < 2) {
    return (
      <div className="ios-page">
        <div style={{ paddingTop: 60 }} className="text-center px-6 py-20">
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚖️</div>
          <h1 className="ios-large-title mb-2">Compare Listings</h1>
          <p style={{ fontSize: 15, color: 'var(--ios-label2)', lineHeight: 1.5, marginBottom: 24 }}>
            Select listings to compare side by side. Go to Browse and tap the compare icon.
          </p>
          <Link href="/listings" className="ios-btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
            Browse Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="ios-large-title-area">
          <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-blue)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Comparison
          </p>
          <h1 className="ios-large-title">Side by Side</h1>
          <p className="ios-subhead mt-1">Comparing {listings.length} listings</p>
        </div>

        {/* Listing headers with gradient cards */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${listings.length}, 1fr)`, gap: 8, padding: '0 16px', marginBottom: 16 }}>
          {listings.map((l) => (
            <Link
              key={l.id}
              href={`/listings/${l.id}`}
              className="ios-card"
              style={{
                padding: 12,
                textAlign: 'center',
                textDecoration: 'none',
                background: `linear-gradient(135deg, hsl(${(parseInt(l.id) * 47) % 360}, 35%, 92%) 0%, hsl(${((parseInt(l.id) * 47) + 40) % 360}, 40%, 88%) 100%)`,
                border: '0.5px solid var(--ios-sep)',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>🏠</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ios-label)', letterSpacing: '-0.2px', lineHeight: 1.3 }}>
                {l.title}
              </div>
              <div style={{ fontSize: 11, color: 'var(--ios-label3)', marginTop: 4 }}>
                {l.address.split(',')[0]}
              </div>
            </Link>
          ))}
        </div>

        {/* Comparison table */}
        <div className="ios-group" style={{ margin: '0 16px', overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `100px repeat(${listings.length}, 1fr)`, borderBottom: 'none' }}>
            {/* Section: Cost */}
            <div style={{ gridColumn: `1 / -1`, padding: '10px 12px 4px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--ios-blue)', background: 'var(--ios-bg2)' }}>
              Cost
            </div>
            <ComparisonRow label="Rent/mo" values={listings.map((l) => `$${l.price.toLocaleString()}`)} highlight="min" />
            <ComparisonRow label="Deposit" values={listings.map((l) => `$${Math.round(l.price * 0.65).toLocaleString()}`)} highlight="min" />
            <ComparisonRow label="Utilities" values={listings.map((l) => l.utilities ? '✅ Included' : '❌ Extra')} />

            {/* Section: Space */}
            <div style={{ gridColumn: `1 / -1`, padding: '10px 12px 4px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--ios-purple)', background: 'var(--ios-bg2)' }}>
              Space
            </div>
            <ComparisonRow label="Beds" values={listings.map((l) => l.bedrooms === 0 ? 'Studio' : l.bedrooms)} />
            <ComparisonRow label="Baths" values={listings.map((l) => l.bathrooms)} />
            <ComparisonRow label="Sq Ft" values={listings.map((l) => l.sqft.toLocaleString())} highlight="max" />
            <ComparisonRow label="$ / ft²" values={listings.map((l) => `$${(l.price / l.sqft).toFixed(1)}`)} highlight="min" />

            {/* Section: Details */}
            <div style={{ gridColumn: `1 / -1`, padding: '10px 12px 4px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--ios-green)', background: 'var(--ios-bg2)' }}>
              Details
            </div>
            <ComparisonRow label="Type" values={listings.map((l) => l.type.charAt(0).toUpperCase() + l.type.slice(1))} />
            <ComparisonRow label="Available" values={listings.map((l) => l.available)} />
            <ComparisonRow label="Furnished" values={listings.map((l) => l.furnished ? '✅ Yes' : '❌ No')} />
            <ComparisonRow label="Pets" values={listings.map((l) => l.petFriendly ? '✅ Yes' : '❌ No')} />
            <ComparisonRow label="Amenities" values={listings.map((l) => l.amenities.length)} highlight="max" />
          </div>
        </div>

        {/* Winner card */}
        {listings.length >= 2 && (
          <div style={{ padding: '0 16px', marginTop: 16, marginBottom: 24 }}>
            {(() => {
              // Simple scoring: lower price + more sqft + more amenities = better
              const scores = listings.map((l) => ({
                listing: l,
                score: (1000 / l.price) + (l.sqft / 100) + l.amenities.length * 0.5 + (l.utilities ? 2 : 0) + (l.petFriendly ? 1 : 0),
              }));
              const winner = scores.sort((a, b) => b.score - a.score)[0];
              return (
                <div
                  className="ios-card"
                  style={{
                    padding: 16,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(52,199,89,0.08) 0%, rgba(0,122,255,0.06) 100%)',
                    border: '0.5px solid rgba(52,199,89,0.2)',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🏆</div>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--ios-green)', marginBottom: 6 }}>
                    Best Value Pick
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ios-label)', letterSpacing: '-0.4px' }}>
                    {winner.listing.title}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--ios-label2)', marginTop: 4 }}>
                    Best balance of price, space, and amenities
                  </div>
                  <Link
                    href={`/listings/${winner.listing.id}`}
                    style={{
                      display: 'inline-flex', marginTop: 12,
                      height: 36, borderRadius: 10, padding: '0 20px',
                      background: 'var(--ios-blue)', color: '#fff',
                      fontSize: 14, fontWeight: 600, textDecoration: 'none',
                      alignItems: 'center',
                    }}
                  >
                    View Listing
                  </Link>
                </div>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
}
