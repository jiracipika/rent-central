'use client';

import Link from 'next/link';

const applications = [
  { id: '1', property: 'Modern Downtown Loft', address: '123 King St W, Toronto, ON', term: '12 months', date: 'Mar 25, 2026', status: 'pending' as const },
  { id: '2', property: 'Cozy Plateau Apartment', address: '789 Rachel E, Montreal, QC', term: '6 months', date: 'Mar 20, 2026', status: 'under_review' as const },
  { id: '3', property: 'Luxury Yaletown Condo', address: '101 Homer St, Vancouver, BC', term: '12 months', date: 'Mar 15, 2026', status: 'approved' as const },
  { id: '4', property: 'Basement Suite in Bridgeland', address: '222 1 Ave NE, Calgary, AB', term: '3 months', date: 'Mar 10, 2026', status: 'rejected' as const },
];

const statusDisplay: Record<string, { cls: string; label: string; icon: string }> = {
  pending:      { cls: 'ios-status-pending',      label: 'Pending',      icon: '🕐' },
  under_review: { cls: 'ios-status-under-review', label: 'Under Review', icon: '🔍' },
  approved:     { cls: 'ios-status-approved',     label: 'Approved',     icon: '✅' },
  rejected:     { cls: 'ios-status-rejected',     label: 'Rejected',     icon: '✕' },
  cancelled:    { cls: 'ios-status-draft',        label: 'Cancelled',    icon: '—' },
};

const iconBg: Record<string, string> = {
  pending:      'rgba(255,149,0,0.10)',
  under_review: 'rgba(0,122,255,0.10)',
  approved:     'rgba(52,199,89,0.10)',
  rejected:     'rgba(255,59,48,0.10)',
  cancelled:    'var(--ios-fill3)',
};

export default function ApplicationsPage() {
  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="ios-large-title-area">
          <h1 className="ios-large-title">Applications</h1>
          <p className="ios-subhead mt-1">{applications.length} total applications</p>
        </div>

        {/* List */}
        <p className="ios-section-header">Recent</p>
        <div className="ios-group">
          {applications.map((app) => {
            const s = statusDisplay[app.status] || statusDisplay.cancelled;
            return (
              <Link
                key={app.id}
                href={`/applications/${app.id}`}
                className="ios-row ios-card-lift"
                style={{ minHeight: 68, alignItems: 'flex-start', paddingTop: 12, paddingBottom: 12 }}
              >
                <div
                  className="ios-row-icon flex-shrink-0"
                  style={{ background: iconBg[app.status] || 'var(--ios-fill3)' }}
                >
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="ios-headline" style={{ fontSize: 15 }}>{app.property}</p>
                  <p className="ios-caption1 mt-0.5 truncate" style={{ color: 'var(--ios-label2)' }}>{app.address}</p>
                  <p className="ios-caption2 mt-0.5" style={{ color: 'var(--ios-label3)' }}>
                    {app.term} · Applied {app.date}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className={`ios-status ${s.cls}`}>
                    <span className="ios-status-dot" />
                    {s.label}
                  </span>
                  <span className="ios-chevron" style={{ fontSize: 18 }}>›</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="h-6" />

      </div>
    </div>
  );
}
