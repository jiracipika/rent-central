'use client';

import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 pt-28">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
          <span className="text-3xl font-bold" style={{ color: 'var(--rc-primary)' }}>R</span>
        </div>
        <div>
          <h1 className="rc-section-title">RS</h1>
          <p className="text-sm" style={{ color: 'var(--rc-muted)' }}>Renter · Toronto, ON</p>
          <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>Member since March 2026</p>
        </div>
      </div>

      {/* Verification status */}
      <div className="rc-card-static p-5 mb-6">
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--rc-text)' }}>Verification</h2>
        <div className="space-y-3">
          {[
            { label: 'Email', status: 'verified', icon: '✉️' },
            { label: 'Phone', status: 'unverified', icon: '📱' },
            { label: 'ID', status: 'unverified', icon: '🪪' },
          ].map((v) => (
            <div key={v.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-base">{v.icon}</span>
                <span className="text-sm" style={{ color: 'var(--rc-text2)' }}>{v.label}</span>
              </div>
              <span className={`rc-badge text-[10px] ${v.status === 'verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                {v.status === 'verified' ? '✓ Verified' : 'Not verified'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rc-card-static p-4 text-center">
          <p className="text-xl font-bold" style={{ color: 'var(--rc-text)' }}>3</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--rc-muted)' }}>Applications</p>
        </div>
        <div className="rc-card-static p-4 text-center">
          <p className="text-xl font-bold" style={{ color: 'var(--rc-text)' }}>5</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--rc-muted)' }}>Saved</p>
        </div>
        <div className="rc-card-static p-4 text-center">
          <p className="text-xl font-bold" style={{ color: 'var(--rc-text)' }}>1</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--rc-muted)' }}>Active Lease</p>
        </div>
      </div>

      {/* Menu */}
      <div className="rc-card-static overflow-hidden divide-y" style={{ borderColor: 'var(--rc-border)' }}>
        {[
          { label: 'My Applications', href: '/applications', icon: '📄' },
          { label: 'Saved Listings', href: '/bookmarks', icon: '❤️' },
          { label: 'Payments', href: '/payments', icon: '💳' },
          { label: 'Messages', href: '/messages', icon: '💬' },
          { label: 'Settings', href: '/profile/settings', icon: '⚙️' },
          { label: 'Landlord Dashboard', href: '/landlord', icon: '🏠' },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-4 px-5 py-4 transition-colors duration-150 hover:bg-gray-50"
            style={{ borderColor: 'var(--rc-separator)' }}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="flex-1 text-sm font-medium" style={{ color: 'var(--rc-text)' }}>{item.label}</span>
            <span style={{ color: 'var(--rc-muted)' }}>›</span>
          </Link>
        ))}
      </div>

      {/* Sign out */}
      <button className="w-full mt-4 py-3 rounded-[var(--radius-lg)] text-sm font-semibold text-center transition-colors duration-150 hover:bg-red-50" style={{ color: 'var(--rc-red)' }}>
        Sign Out
      </button>
    </div>
  );
}
