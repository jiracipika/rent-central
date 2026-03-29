'use client';

import { useState } from 'react';
import Link from 'next/link';

const applications = [
  { id: '1', name: 'Jordan Lee', initials: 'JL', color: '#007AFF', property: 'Modern Downtown Loft', status: 'pending' as const, date: 'Mar 20', income: '$85k/yr' },
  { id: '2', name: 'Aisha Khan', initials: 'AK', color: '#AF52DE', property: 'Modern Downtown Loft', status: 'under_review' as const, date: 'Mar 18', income: '$72k/yr' },
  { id: '3', name: 'Marc Tremblay', initials: 'MT', color: '#34C759', property: 'Cozy Plateau Studio', status: 'approved' as const, date: 'Mar 15', income: '$65k/yr' },
  { id: '4', name: 'Emily Park', initials: 'EP', color: '#FF9500', property: 'Yaletown Condo', status: 'rejected' as const, date: 'Mar 12', income: '$90k/yr' },
  { id: '5', name: 'Lena Kowalski', initials: 'LK', color: '#FF2D55', property: 'Spacious Family Home', status: 'pending' as const, date: 'Mar 10', income: '$110k/yr' },
];

type Filter = 'All' | 'Pending' | 'Under Review' | 'Approved' | 'Rejected';

const statusLabel: Record<string, string> = {
  pending: 'Pending',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
};

const statusClass: Record<string, string> = {
  pending: 'ios-status-pending',
  under_review: 'ios-status-under-review',
  approved: 'ios-status-approved',
  rejected: 'ios-status-rejected',
};

export default function LandlordApplicationsPage() {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = filter === 'All'
    ? applications
    : applications.filter((a) => statusLabel[a.status] === filter);

  const pendingCount = applications.filter(a => a.status === 'pending' || a.status === 'under_review').length;

  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="ios-large-title-area">
          <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-blue)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Landlord
          </p>
          <h1 className="ios-large-title">Applicants</h1>
          <p className="ios-subhead mt-1">
            {applications.length} applications · {pendingCount} need review
          </p>
        </div>

        {/* Filter pills */}
        <div className="ios-scroll-x py-1" style={{ gap: 6, paddingBottom: 6 }}>
          {(['All', 'Pending', 'Under Review', 'Approved', 'Rejected'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`ios-pill ${filter === f ? 'ios-pill-active' : 'ios-pill-gray'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Applications list */}
        <p className="ios-section-header">{filtered.length} {filtered.length === 1 ? 'Applicant' : 'Applicants'}</p>
        <div className="ios-group">
          {filtered.map((app) => (
            <Link
              key={app.id}
              href={`/landlord/applications/${app.id}`}
              className="ios-row ios-card-lift"
              style={{ minHeight: 68, alignItems: 'flex-start', paddingTop: 12, paddingBottom: 12 }}
            >
              {/* Avatar */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-semibold text-white text-sm flex-shrink-0"
                style={{ background: app.color }}
              >
                {app.initials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="ios-headline" style={{ fontSize: 15 }}>{app.name}</p>
                <p className="ios-caption1 mt-0.5 truncate" style={{ color: 'var(--ios-label2)' }}>
                  {app.property}
                </p>
                <p className="ios-caption2 mt-0.5" style={{ color: 'var(--ios-label3)' }}>
                  Applied {app.date} · {app.income}
                </p>
              </div>

              {/* Status + chevron */}
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <span className={`ios-status ${statusClass[app.status]}`}>
                  <span className="ios-status-dot" />
                  {statusLabel[app.status]}
                </span>
                <span className="ios-chevron" style={{ fontSize: 18 }}>›</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="h-6" />

      </div>
    </div>
  );
}
