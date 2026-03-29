'use client';

import { useState } from 'react';

const users = [
  { id: '1', name: 'Alex Rivera', email: 'alex@email.com', role: 'renter' as const, joined: '2025-08-15', activity: '3 apps', verified: true },
  { id: '2', name: 'Sarah Chen', email: 'sarah@email.com', role: 'landlord' as const, joined: '2024-03-22', activity: '4 listings', verified: true },
  { id: '3', name: 'Marc Tremblay', email: 'marc@email.com', role: 'renter' as const, joined: '2025-11-01', activity: '1 app', verified: false },
  { id: '4', name: 'Emily Park', email: 'emily@email.com', role: 'landlord' as const, joined: '2025-06-10', activity: '2 listings', verified: true },
  { id: '5', name: 'James Park', email: 'james@email.com', role: 'renter' as const, joined: '2026-01-18', activity: '7 apps', verified: true },
  { id: '6', name: 'Lena Kowalski', email: 'lena@email.com', role: 'landlord' as const, joined: '2024-01-05', activity: '6 listings', verified: true },
];

const roleColor: Record<string, string> = { renter: '#007AFF', landlord: '#AF52DE' };
const avatarColors = ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#32ADE6'];

export default function AdminUsersPage() {
  const [filter, setFilter] = useState<'all' | 'renter' | 'landlord'>('all');
  const filtered = filter === 'all' ? users : users.filter(u => u.role === filter);

  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="flex items-start justify-between px-4 pt-5 pb-2">
          <div>
            <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-red)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Admin
            </p>
            <h1 className="ios-large-title">Users</h1>
            <p className="ios-subhead mt-1">{users.length} registered users</p>
          </div>
        </div>

        {/* Filter segmented control */}
        <div className="px-4 mb-2">
          <div className="ios-segmented" style={{ display: 'flex' }}>
            {(['all', 'renter', 'landlord'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`ios-seg-item flex-1 capitalize ${filter === f ? 'ios-seg-item-active' : ''}`}
                style={{ fontSize: 14, height: 32 }}
              >
                {f === 'all' ? 'All' : `${f.charAt(0).toUpperCase() + f.slice(1)}s`}
              </button>
            ))}
          </div>
        </div>

        <p className="ios-section-header">{filtered.length} {filtered.length === 1 ? 'User' : 'Users'}</p>
        <div className="ios-group">
          {filtered.map((u, i) => (
            <div
              key={u.id}
              className="ios-row"
              style={{ minHeight: 64, alignItems: 'flex-start', paddingTop: 12, paddingBottom: 12, cursor: 'default' }}
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white text-sm flex-shrink-0"
                style={{ background: avatarColors[i % avatarColors.length] }}
              >
                {u.name.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="ios-headline" style={{ fontSize: 15 }}>{u.name}</p>
                <p className="ios-caption1 mt-0.5" style={{ color: 'var(--ios-label2)' }}>{u.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="ios-pill" style={{ fontSize: 10, height: 20, background: `${roleColor[u.role]}15`, color: roleColor[u.role] }}>
                    {u.role}
                  </span>
                  {u.verified ? (
                    <span className="ios-status ios-status-approved" style={{ height: 18, fontSize: 10 }}>
                      <span className="ios-status-dot" />Verified
                    </span>
                  ) : (
                    <span className="ios-status ios-status-pending" style={{ height: 18, fontSize: 10 }}>
                      <span className="ios-status-dot" />Unverified
                    </span>
                  )}
                  <span className="ios-caption2" style={{ color: 'var(--ios-label3)' }}>{u.activity}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                <button className="ios-btn-text" style={{ fontSize: 13 }}>View</button>
                {!u.verified && (
                  <button className="ios-btn-text" style={{ fontSize: 13, color: 'var(--ios-green)' }}>Verify</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="h-6" />

      </div>
    </div>
  );
}
