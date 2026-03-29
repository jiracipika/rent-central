'use client';

import Link from 'next/link';

const listings = [
  { id: '1', title: 'Modern Downtown Loft', address: '123 King St W, Toronto', status: 'active' as const, applications: 5, price: 2400 },
  { id: '2', title: 'Cozy Plateau Studio', address: '456 St-Denis, Montréal', status: 'active' as const, applications: 2, price: 1700 },
  { id: '3', title: 'Luxury Yaletown Condo', address: '101 Homer St, Vancouver', status: 'paused' as const, applications: 8, price: 3000 },
  { id: '4', title: 'Spacious Family Home', address: '789 Oak Ave, Calgary', status: 'rented' as const, applications: 12, price: 3200 },
];

export default function AdminListingsPage() {
  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="ios-large-title-area">
          <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-red)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Admin
          </p>
          <h1 className="ios-large-title">Listings</h1>
          <p className="ios-subhead mt-1">{listings.length} total listings</p>
        </div>

        {/* Table card */}
        <div className="mx-4">
          <div className="ios-table-wrap ios-shadow-xs">
            <table className="ios-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 16 }}>Property</th>
                  <th>Status</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Apps</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.id}>
                    <td style={{ paddingLeft: 16 }}>
                      <Link
                        href={`/listings/${l.id}`}
                        className="ios-btn-text ios-link-hover"
                        style={{ fontSize: 14, fontWeight: 600 }}
                      >
                        {l.title}
                      </Link>
                      <p className="ios-caption2 mt-0.5" style={{ color: 'var(--ios-label3)', fontWeight: 400 }}>{l.address}</p>
                    </td>
                    <td>
                      <span className={`ios-status ios-status-${l.status}`}>
                        <span className="ios-status-dot" />
                        {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                      </span>
                    </td>
                    <td className="text-right" style={{ fontWeight: 600 }}>${l.price.toLocaleString()}<span style={{ color: 'var(--ios-label3)', fontWeight: 400, fontSize: 11 }}>/mo</span></td>
                    <td className="text-right" style={{ color: 'var(--ios-label2)' }}>{l.applications}</td>
                    <td>
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/listings/${l.id}`} className="ios-btn-text" style={{ fontSize: 13 }}>View</Link>
                        {l.status === 'active' && (
                          <button className="ios-btn-text" style={{ fontSize: 13, color: 'var(--ios-red)' }}>Pause</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="h-6" />

      </div>
    </div>
  );
}
