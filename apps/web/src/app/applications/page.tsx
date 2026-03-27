'use client';

import Link from 'next/link';

const applications = [
  { id: '1', property: 'Modern Downtown Loft', address: '123 King St W, Toronto, ON', term: '12 months', date: 'Mar 25, 2026', status: 'pending' },
  { id: '2', property: 'Cozy Plateau Apartment', address: '789 Rachel E, Montreal, QC', term: '6 months', date: 'Mar 20, 2026', status: 'under_review' },
  { id: '3', property: 'Luxury Yaletown Condo', address: '101 Homer St, Vancouver, BC', term: '12 months', date: 'Mar 15, 2026', status: 'approved' },
  { id: '4', property: 'Basement Suite in Bridgeland', address: '222 1 Ave NE, Calgary, AB', term: '3 months', date: 'Mar 10, 2026', status: 'rejected' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

export default function ApplicationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">My Applications</h1>
        <p className="mt-1 text-sm text-gray-400">{applications.length} total applications</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
        {applications.map((app) => (
          <Link key={app.id} href={`/applications/${app.id}`} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🏠</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{app.property}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{app.address}</p>
                </div>
                <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ml-2 ${statusColors[app.status]}`}>
                  {statusLabels[app.status]}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span>{app.term}</span>
                <span className="text-gray-200">·</span>
                <span>{app.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
