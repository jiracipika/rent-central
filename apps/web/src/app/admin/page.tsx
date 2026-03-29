'use client';

import Link from 'next/link';

const stats = [
  { label: 'Total Users', value: '1,247', icon: '👥', color: '#007AFF', gradient: 'ios-gradient-card-blue' },
  { label: 'Listings', value: '432', icon: '🏠', color: '#34C759', gradient: 'ios-gradient-card-green' },
  { label: 'Active', value: '298', icon: '✅', color: '#34C759', gradient: 'ios-gradient-card-green' },
  { label: 'Applications', value: '1,056', icon: '📝', color: '#AF52DE', gradient: 'ios-gradient-card-purple' },
  { label: 'Revenue', value: '$18.4K', icon: '💰', color: '#FF9500', gradient: 'ios-gradient-card-orange' },
  { label: 'Open Reports', value: '2', icon: '🚨', color: '#FF3B30', gradient: 'ios-gradient-card-red' },
];

const recentReports = [
  { id: '1', type: 'listing', target: 'Suspicious Pricing', status: 'open' as const, date: 'Mar 26' },
  { id: '2', type: 'user', target: 'Spam Account', status: 'resolved' as const, date: 'Mar 25' },
  { id: '3', type: 'listing', target: 'Misleading Photos', status: 'reviewed' as const, date: 'Mar 24' },
];

const quickActions = [
  { label: 'Manage Listings', href: '/admin/listings', icon: '🏠', color: '#007AFF', desc: 'Review & moderate' },
  { label: 'Manage Users', href: '/admin/users', icon: '👥', color: '#34C759', desc: 'Verify & ban' },
  { label: 'Reports', href: '/admin/reports', icon: '🚨', color: '#FF3B30', desc: 'Flagged content', badge: 2 },
];

export default function AdminPage() {
  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="ios-large-title-area">
          <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-red)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Admin
          </p>
          <h1 className="ios-large-title">Dashboard</h1>
          <p className="ios-subhead mt-1">Platform overview and moderation</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2.5 px-4 mb-2">
          {stats.map((s) => (
            <div key={s.label} className={`ios-stat-card ${s.gradient}`}>
              <p className="ios-stat-value" style={{ fontSize: 20, color: s.color }}>{s.value}</p>
              <p className="ios-stat-label" style={{ marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <p className="ios-section-header mt-2">Admin Tools</p>
        <div className="ios-group">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="ios-row"
              style={{ minHeight: 56 }}
            >
              <div
                className="ios-row-icon"
                style={{ background: `${a.color}15`, width: 36, height: 36, borderRadius: 10 }}
              >
                <span style={{ fontSize: 16 }}>{a.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="ios-row-label" style={{ fontSize: 15 }}>{a.label}</p>
                <p className="ios-caption1 mt-0.5" style={{ color: 'var(--ios-label2)' }}>{a.desc}</p>
              </div>
              {a.badge && (
                <span className="ios-badge" style={{ fontSize: 11 }}>{a.badge}</span>
              )}
              <span className="ios-chevron">›</span>
            </Link>
          ))}
        </div>

        {/* Recent reports */}
        <p className="ios-section-header mt-2">Recent Reports</p>
        <div className="ios-group">
          {recentReports.map((r) => (
            <div
              key={r.id}
              className="ios-row"
              style={{ minHeight: 52, cursor: 'default' }}
            >
              <div
                className="ios-row-icon"
                style={{
                  background: r.type === 'listing' ? 'rgba(0,122,255,0.10)' : 'rgba(255,59,48,0.10)',
                  width: 32, height: 32, borderRadius: 8,
                }}
              >
                <span style={{ fontSize: 14 }}>{r.type === 'listing' ? '🏠' : '👤'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="ios-headline" style={{ fontSize: 14 }}>{r.target}</p>
                <p className="ios-caption2 mt-0.5">{r.date}</p>
              </div>
              <span className={`ios-status ios-status-${r.status}`}>
                <span className="ios-status-dot" />
                {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
              </span>
            </div>
          ))}
        </div>

        <div className="h-6" />

      </div>
    </div>
  );
}
