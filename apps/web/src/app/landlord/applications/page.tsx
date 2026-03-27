'use client';

import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';

const applications = [
  { id: '1', name: 'Jordan Lee', property: 'Modern Downtown Loft', status: 'pending', date: 'Mar 20', income: '$85k' },
  { id: '2', name: 'Aisha Khan', property: 'Modern Downtown Loft', status: 'under_review', date: 'Mar 18', income: '$72k' },
  { id: '3', name: 'Marc Tremblay', property: 'Cozy Plateau Studio', status: 'approved', date: 'Mar 15', income: '$65k' },
  { id: '4', name: 'Emily Park', property: 'Yaletown Condo', status: 'rejected', date: 'Mar 12', income: '$90k' },
  { id: '5', name: 'Lena Kowalski', property: 'Spacious Family Home', status: 'pending', date: 'Mar 10', income: '$110k' },
];

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700',
  under_review: 'bg-blue-50 text-blue-700',
  approved: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-red-50 text-red-700',
};

export default function LandlordApplicationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 pt-28">
      <h1 className="rc-section-title">Applicants</h1>
      <p className="text-sm mt-1" style={{ color: 'var(--rc-muted)' }}>5 applications · 2 pending review</p>

      {/* Filter */}
      <div className="flex gap-2 mt-6 mb-6">
        {['All', 'Pending', 'Under Review', 'Approved', 'Rejected'].map((f) => (
          <button key={f} className="rc-badge text-[11px] bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {applications.map((app) => (
          <Link key={app.id} href={`/landlord/applications/${app.id}`} className="block rc-card p-5 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <span className="text-sm font-bold" style={{ color: 'var(--rc-primary)' }}>
                    {app.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--rc-text)' }}>{app.name}</p>
                  <p className="text-xs" style={{ color: 'var(--rc-muted)' }}>{app.property} · Applied {app.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium" style={{ color: 'var(--rc-muted)' }}>{app.income}</span>
                <span className={`rc-badge text-[10px] ${statusStyles[app.status]}`}>{app.status.replace('_', ' ')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
