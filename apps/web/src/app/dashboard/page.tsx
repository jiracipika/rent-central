'use client';

import Link from 'next/link';

const stats = [
  { label: 'Applications', value: '3', icon: '📝', color: '#007AFF', href: '/applications' },
  { label: 'Saved', value: '5', icon: '❤️', color: '#FF2D55', href: '/bookmarks' },
  { label: 'Messages', value: '2', icon: '💬', color: '#34C759', href: '/messages', badge: true },
];

const recentActivity = [
  { text: 'Application submitted for Modern Downtown Loft', time: '2 hours ago', icon: '📝', color: '#007AFF' },
  { text: 'New message from Sarah Chen', time: '5 hours ago', icon: '💬', color: '#34C759' },
  { text: 'Application status changed to Under Review', time: '1 day ago', icon: '📋', color: '#FF9500' },
  { text: 'Saved Liberty Village Studio', time: '2 days ago', icon: '❤️', color: '#FF2D55' },
];

const quickActions = [
  { label: 'Browse Listings', href: '/listings', icon: '🔍', color: '#007AFF' },
  { label: 'My Applications', href: '/applications', icon: '📄', color: '#5856D6' },
  { label: 'Payments', href: '/payments', icon: '💳', color: '#FF9500' },
  { label: 'Profile', href: '/profile', icon: '👤', color: '#8E8E93' },
];

export default function DashboardPage() {
  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Welcome header */}
        <div className="ios-large-title-area">
          <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-blue)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Dashboard
          </p>
          <h1 className="ios-large-title">Welcome back, Alex</h1>
          <p className="ios-subhead mt-1">Here's what's happening with your rentals</p>
        </div>

        {/* Stats row */}
        <div className="ios-scroll-x py-2" style={{ gap: 10, paddingBottom: 8 }}>
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              style={{
                background: 'var(--ios-grouped-bg2)',
                borderRadius: 16,
                padding: '16px',
                minWidth: 120,
                flexShrink: 0,
                position: 'relative',
              }}
              className="tap-scale block"
            >
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center text-xl mb-3"
                style={{ background: `${s.color}18` }}
              >
                {s.icon}
              </div>
              <p className="ios-title1" style={{ fontSize: 28, color: s.color }}>{s.value}</p>
              <p className="ios-caption1 mt-0.5">{s.label}</p>
              {s.badge && (
                <span
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white"
                  style={{ background: 'var(--ios-red)', fontSize: 11, fontWeight: 700 }}
                >
                  2
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <p className="ios-section-header mt-2">Quick Actions</p>
        <div className="grid grid-cols-4 gap-3 px-4 mb-6">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex flex-col items-center gap-2 tap-scale"
            >
              <div
                className="w-14 h-14 rounded-[18px] flex items-center justify-center text-2xl"
                style={{ background: `${a.color}18` }}
              >
                {a.icon}
              </div>
              <p className="ios-caption2 text-center leading-snug" style={{ color: 'var(--ios-label2)', fontSize: 11 }}>
                {a.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Recent activity */}
        <p className="ios-section-header">Recent Activity</p>
        <div className="ios-group">
          {recentActivity.map((a, i) => (
            <div key={i} className="ios-row" style={{ cursor: 'default', minHeight: 56, alignItems: 'flex-start', paddingTop: 12, paddingBottom: 12 }}>
              <div
                className="ios-row-icon flex-shrink-0"
                style={{ background: `${a.color}18`, marginTop: 1 }}
              >
                <span style={{ fontSize: 14 }}>{a.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="ios-subhead" style={{ fontSize: 14, color: 'var(--ios-label)', lineHeight: 1.4 }}>{a.text}</p>
                <p className="ios-caption1 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Active lease card */}
        <p className="ios-section-header mt-2">Active Lease</p>
        <div
          className="mx-4 rounded-[16px] overflow-hidden mb-6"
          style={{ background: 'var(--ios-blue)' }}
        >
          <div className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.60)' }}>
              Currently Renting
            </p>
            <p className="ios-title3 mb-1" style={{ color: '#fff', fontSize: 18 }}>Modern Downtown Loft</p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, letterSpacing: '-0.016em', marginBottom: 16 }}>
              123 King St W, Toronto, ON
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: 11, marginBottom: 2 }}>Monthly Rent</p>
                <p style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>$2,400</p>
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: 11, marginBottom: 2 }}>Next Payment</p>
                <p style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Apr 1, 2026</p>
              </div>
              <Link
                href="/payments"
                className="ios-btn"
                style={{
                  background: 'rgba(255,255,255,0.20)',
                  color: '#fff',
                  height: 36,
                  borderRadius: 10,
                  fontSize: 14,
                  padding: '0 14px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Pay Now
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
