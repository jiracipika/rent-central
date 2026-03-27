'use client';

import Link from 'next/link';

const listings = [
  { id: '1', title: 'Modern Downtown Loft', address: '123 King St W, Toronto', status: 'active', applications: 5, price: 2400 },
  { id: '2', title: 'Cozy Plateau Studio', address: '456 St-Denis, Montréal', status: 'active', applications: 2, price: 1700 },
  { id: '3', title: 'Luxury Yaletown Condo', address: '101 Homer St, Vancouver', status: 'paused', applications: 8, price: 3000 },
  { id: '4', title: 'Spacious Family Home', address: '789 Oak Ave, Calgary', status: 'rented', applications: 12, price: 3200 },
];

const users = [
  { id: '1', name: 'Alex Rivera', email: 'alex@email.com', role: 'renter', joined: '2025-08-15', applications: 3, verified: true },
  { id: '2', name: 'Sarah Chen', email: 'sarah@email.com', role: 'landlord', joined: '2024-03-22', listings: 4, verified: true },
  { id: '3', name: 'Marc Tremblay', email: 'marc@email.com', role: 'renter', joined: '2025-11-01', applications: 1, verified: false },
  { id: '4', name: 'Emily Park', email: 'emily@email.com', role: 'landlord', joined: '2025-06-10', listings: 2, verified: true },
  { id: '5', name: 'James Park', email: 'james@email.com', role: 'renter', joined: '2026-01-18', applications: 7, verified: true },
];

const reports = [
  { id: '1', type: 'listing', target: 'Suspiciously cheap listing', reason: 'scam', reporter: 'Alex Rivera', date: '2026-03-26', status: 'open' },
  { id: '2', type: 'listing', target: 'Misleading photos', reason: 'misleading', reporter: 'Emily Park', date: '2026-03-24', status: 'reviewed' },
  { id: '3', type: 'user', target: 'Spam messages from user', reason: 'spam', reporter: 'Marc Tremblay', date: '2026-03-22', status: 'resolved' },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  rented: 'bg-blue-100 text-blue-800',
  draft: 'bg-gray-100 text-gray-800',
  open: 'bg-red-100 text-red-800',
  reviewed: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
};

export default function AdminListingsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <h1 className="rc-section-title mb-2">Admin — Listings</h1>
      <p className="text-sm text-gray-400 mb-8">{listings.length} total listings</p>

      <div className="rc-card-static overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Property</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Apps</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {listings.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/listings/${l.id}`} className="font-medium text-gray-900 hover:text-blue-600 transition-colors">{l.title}</Link>
                    <p className="text-xs text-gray-400 mt-0.5">{l.address}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusColors[l.status]}`}>{l.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">${l.price.toLocaleString()}/mo</td>
                  <td className="px-6 py-4 text-right text-gray-500">{l.applications}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/listings/${l.id}`} className="text-xs text-blue-600 hover:underline">View</Link>
                      {l.status === 'active' && <button className="text-xs text-red-500 hover:underline">Pause</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
