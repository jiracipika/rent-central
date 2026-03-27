'use client';

import Link from 'next/link';

const summaryCards = [
  { label: 'Active Listings', value: 5, icon: '🏠', color: 'text-blue-600' },
  { label: 'Total Applications', value: 12, icon: '📝', color: 'text-purple-600' },
  { label: 'Pending', value: 3, icon: '⏳', color: 'text-yellow-600' },
  { label: 'Approved', value: 4, icon: '✅', color: 'text-green-600' },
];

const recentApplicants = [
  { name: 'Alex Thompson', property: 'Modern Downtown Loft', date: 'Mar 25, 2026', status: 'pending' },
  { name: 'Priya Patel', property: 'Modern Downtown Loft', date: 'Mar 24, 2026', status: 'under_review' },
  { name: 'Jordan Lee', property: 'Luxury Yaletown Condo', date: 'Mar 22, 2026', status: 'approved' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
};

export default function LandlordDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Landlord Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">Manage your properties and applications</p>
        </div>
        <Link href="/landlord/create-listing" className="bg-blue-600 text-white font-medium px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all">
          + Create Listing
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {summaryCards.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xl">{s.icon}</span>
              <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applicants</h2>
        <div className="space-y-4">
          {recentApplicants.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-500">
                  {a.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{a.name}</p>
                  <p className="text-xs text-gray-400">{a.property}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColors[a.status]}`}>
                  {a.status.replace('_', ' ')}
                </span>
                <p className="text-xs text-gray-400 mt-1">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
