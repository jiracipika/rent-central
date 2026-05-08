import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';
import { fetchLiveListings } from '@/lib/live-rental-data';

const featuredCities = ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Halifax'];

const productPillars = [
  {
    title: 'Live Inventory Signals',
    detail: 'Real buildings are discovered from open geospatial sources instead of static mocks.',
  },
  {
    title: 'Market Benchmarks',
    detail: 'Listing estimates are anchored to official Statistics Canada asking-rent datasets.',
  },
  {
    title: 'Workflow Ready',
    detail: 'Designed for real application, contract, and landlord workflows at production scale.',
  },
];

export default async function HomePage() {
  const { listings, sourceSummary } = await fetchLiveListings({ city: 'Toronto', limit: 6 });

  return (
    <div className="home-shell">
      <section className="hero-panel">
        <p className="hero-kicker">Rental operations platform</p>
        <h1>
          Find your next place
          <span>with live market intelligence.</span>
        </h1>
        <p className="hero-copy">
          A full-stack renter and landlord experience redesigned for speed, trust, and visibility across the Canadian market.
        </p>

        <div className="hero-actions">
          <Link href="/listings" className="btn btn-primary">
            Browse live inventory
          </Link>
          <Link href="/landlord" className="btn btn-ghost">
            Open landlord console
          </Link>
        </div>

        <p className="hero-source">Live source: {sourceSummary}</p>
      </section>

      <section className="city-strip">
        {featuredCities.map((city) => (
          <Link key={city} href={`/listings?city=${encodeURIComponent(city)}`} className="city-chip">
            {city}
          </Link>
        ))}
      </section>

      <section className="listing-preview-grid">
        {listings.map((listing) => (
          <article key={listing.id} className="listing-preview-card">
            <div className="listing-preview-top">
              <p className="listing-preview-price">{formatCurrency(listing.price)}<span>/mo</span></p>
              <p className="listing-preview-type">{listing.propertyType}</p>
            </div>

            <h3>{listing.title}</h3>
            <p className="listing-preview-address">{listing.address}</p>

            <div className="listing-preview-meta">
              <span>{listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`}</span>
              <span>{listing.bathrooms} bath</span>
              <span>{listing.sizeSqft} sqft</span>
            </div>

            <div className="listing-preview-highlights">
              {listing.highlights.slice(0, 2).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <a href={listing.sourceUrl} target="_blank" rel="noreferrer" className="listing-preview-link">
              View source data
            </a>
          </article>
        ))}
      </section>

      <section className="pillar-grid">
        {productPillars.map((pillar) => (
          <article key={pillar.title} className="pillar-card">
            <h3>{pillar.title}</h3>
            <p>{pillar.detail}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
