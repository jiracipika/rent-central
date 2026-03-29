'use client';

import Link from 'next/link';

const summaryCards = [
  { label: 'Active Listings', value: '5', icon: '🏠', color: '#007AFF', gradient: 'ios-gradient-card-blue' },
  { label: 'Applications', value: '12', icon: '📝', color: '#AF52DE', gradient: 'ios-gradient-card-purple' },
  { label: 'Pending Review', value: '3', icon: '⏳', color: '#FF9500', gradient: 'ios-gradient-card-orange' },
  { label: 'Approved', value: '4', icon: '✅', color: '#34C759', gradient: 'ios-gradient-card-green' },
];

const recentApplicants = [
  { name: 'Alex Thompson', initials: 'AT', color: '#007AFF', property: 'Modern Downtown Loft', date: 'Mar 25, 2026', status: 'pending' },
  { name: 'Priya Patel', initials: 'PP', color: '#AF52DE', property: 'Modern Downtown Loft', date: 'Mar 24, 2026', status: 'under_review' },
  { name: 'Jordan Lee', initials: 'JL', color: '#34C759', property: 'Luxury Yaletown Condo', date: 'Mar 22, 2026', status: 'approved' },
];

const quickActions = [
  { label: 'New Listing', href: '/landlord/listings/new', icon: '➕', color: '#007AFF' },
  { label: 'My Listings', href: '/landlord/listings', icon: '🏠', color: '#34C759' },
  { label: 'Applicants', href: '/landlord/applications', icon: '📄', color: '#AF52DE' },
  { label: 'Messages', href: '/messages', icon: '💬', color: '#FF9500' },
];

const statusLabel: Record<string, string> = {
  pending: 'Pending',
  under_review: 'Under Review',
  approved: 'Approved',
};

export default function LandlordDashboard() {
  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="ios-large-title-area">
          <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-blue)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Landlord
          </p>
          <h1 className="ios-large-title">Dashboard</h1>
          <p className="ios-subhead mt-1">Manage your properties and applications</p>
        </div>

        {/* Summary stat cards */}
        <div className="grid grid-cols-2 gap-3 px-4 mb-2">
          {summaryCards.map((s) => (
            <div key={s.label} className={`ios-stat-card ${s.gradient}`}>
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center text-xl mb-2.5"
                style={{ background: `${s.color}18` }}
              >
                {s.icon}
              </div>
              <p className="ios-stat-value" style={{ color: s.color }}>{s.value}</p>
              <p className="ios-stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <p className="ios-section-header mt-2">Quick Actions</p>
        <div className="grid grid-cols-4 gap-3 px-4 mb-2">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex flex-col items-center gap-2 tap-scale"
            >
              <div
                className="w-14 h-14 rounded-[18px] flex items-center justify-center text-2xl"
                style={{ background: `${a.color}15` }}
              >
                {a.icon}
              </div>
              <p className="ios-caption2 text-center leading-snug" style={{ color: 'var(--ios-label2)', fontSize: 11 }}>
                {a.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Recent applicants */}
        <p className="ios-section-header mt-2">Recent Applicants</p>
        <div className="ios-group">
          {recentApplicants.map((a) => (
            <Link
              key={a.name}
              href="/landlord/applications"
              className="ios-row"
              style={{ minHeight: 64, alignItems: 'flex-start', paddingTop: 12, paddingBottom: 12 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white text-sm flex-shrink-0"
                style={{ background: a.color }}
              >
                {a.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="ios-headline" style={{ fontSize: 15 }}>{a.name}</p>
                <p className="ios-caption1 mt-0.5 truncate" style={{ color: 'var(--ios-label2)' }}>{a.property}</p>
                <p className="ios-caption2 mt-0.5">{a.date}</p>
              </div>
              <span
                className={`ios-status flex-shrink-0 mt-0.5
                  ${a.status === 'approved' ? 'ios-status-approved' : ''}
                  ${a.status === 'pending' ? 'ios-status-pending' : ''}
                  ${a.status === 'under_review' ? 'ios-status-under-review' : ''}
                `}
              >
                <span className="ios-status-dot" />
                {statusLabel[a.status]}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA to view all applications */}
        <div className="px-4 mt-3 mb-6">
          <Link
            href="/landlord/applications"
            className="ios-btn w-full"
            style={{
              height: 46,
              borderRadius: 13,
              fontSize: 15,
              fontWeight: 600,
              background: 'var(--ios-fill3)',
              color: 'var(--ios-blue)',
            }}
          >
            View All Applications
          </Link>
        </div>

      </div>
    </div>
  );
}
