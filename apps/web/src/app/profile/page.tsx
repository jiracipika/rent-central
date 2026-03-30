'use client';

import Link from 'next/link';

const menuSections = [
  {
    header: 'My Rentals',
    items: [
      { label: 'My Applications', href: '/applications', icon: '📄', iconBg: '#007AFF', value: '3 active' },
      { label: 'Saved Listings', href: '/bookmarks', icon: '❤️', iconBg: '#FF2D55', value: '5 saved' },
      { label: 'Contracts', href: '/contracts', icon: '✍️', iconBg: '#34C759', value: '1 active' },
      { label: 'Payments', href: '/payments', icon: '💳', iconBg: '#FF9500' },
    ],
  },
  {
    header: 'Communication',
    items: [
      { label: 'Messages', href: '/messages', icon: '💬', iconBg: '#34C759', badge: 2 },
      { label: 'Notifications', href: '/notifications', icon: '🔔', iconBg: '#FF3B30', badge: 3 },
    ],
  },
  {
    header: 'Account',
    items: [
      { label: 'Settings', href: '/profile/settings', icon: '⚙️', iconBg: '#8E8E93' },
      { label: 'Landlord Dashboard', href: '/landlord', icon: '🏠', iconBg: '#007AFF' },
    ],
  },
];

const verifications = [
  { label: 'Email', verified: true, icon: '✉️', color: '#34C759' },
  { label: 'Phone number', verified: false, icon: '📱', color: '#8E8E93' },
  { label: 'Government ID', verified: false, icon: '🪪', color: '#8E8E93' },
];

export default function ProfilePage() {
  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Profile header */}
        <div
          className="flex flex-col items-center text-center px-4 py-8"
          style={{ background: 'var(--ios-grouped-bg2)', margin: '0 16px 8px', borderRadius: 20 }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-3"
            style={{ background: 'rgba(0,122,255,0.12)', color: 'var(--ios-blue)' }}
          >
            R
          </div>
          <h1 className="ios-title3" style={{ fontSize: 22 }}>RS</h1>
          <p className="ios-subhead mt-0.5">Renter · Toronto, ON</p>
          <p className="ios-caption1 mt-0.5">Member since March 2026</p>

          {/* Stats row */}
          <div
            className="flex items-center w-full mt-5 pt-5"
            style={{ borderTop: '0.5px solid var(--ios-sep)' }}
          >
            {[
              { value: '3', label: 'Applications' },
              { value: '5', label: 'Saved' },
              { value: '1', label: 'Active Lease' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex-1 text-center" style={{ borderLeft: i > 0 ? '0.5px solid var(--ios-sep)' : 'none' }}>
                <p className="ios-title3" style={{ fontSize: 22, color: 'var(--ios-blue)' }}>{stat.value}</p>
                <p className="ios-caption1 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Verification */}
        <p className="ios-section-header">Verification</p>
        <div className="ios-group">
          {verifications.map((v) => (
            <div key={v.label} className="ios-row" style={{ minHeight: 50 }}>
              <div className="ios-row-icon" style={{ background: `${v.color}18` }}>
                <span style={{ fontSize: 15 }}>{v.icon}</span>
              </div>
              <span className="ios-row-label" style={{ fontSize: 15 }}>{v.label}</span>
              {v.verified ? (
                <span className="ios-pill ios-pill-green" style={{ fontSize: 11 }}>✓ Verified</span>
              ) : (
                <span className="ios-btn-text" style={{ fontSize: 14 }}>Verify →</span>
              )}
            </div>
          ))}
        </div>

        {/* Menu sections */}
        {menuSections.map((section) => (
          <div key={section.header}>
            <p className="ios-section-header">{section.header}</p>
            <div className="ios-group">
              {section.items.map((item) => (
                <Link key={item.label} href={item.href} className="ios-row" style={{ minHeight: 50 }}>
                  <div
                    className="ios-row-icon"
                    style={{ background: item.iconBg }}
                  >
                    <span style={{ fontSize: 15 }}>{item.icon}</span>
                  </div>
                  <span className="ios-row-label" style={{ fontSize: 15 }}>{item.label}</span>
                  {'value' in item && item.value && (
                    <span className="ios-row-value" style={{ fontSize: 14 }}>{item.value}</span>
                  )}
                  {'badge' in item && item.badge && (
                    <span className="ios-badge" style={{ fontSize: 11, minWidth: 18, height: 18 }}>{item.badge}</span>
                  )}
                  <span className="ios-chevron">›</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <div className="ios-group mt-2">
          <button
            className="ios-row w-full"
            style={{ minHeight: 50, justifyContent: 'center' }}
          >
            <span style={{ fontSize: 17, color: 'var(--ios-red)', fontWeight: 400, letterSpacing: '-0.022em' }}>
              Sign Out
            </span>
          </button>
        </div>

        <p className="ios-caption2 text-center mt-4 mb-8" style={{ color: 'var(--ios-label3)' }}>
          Rent Central v1.0 · Made in Canada 🍁
        </p>

      </div>
    </div>
  );
}
