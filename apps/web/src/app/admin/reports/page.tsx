'use client';

import { useState } from 'react';

const reports = [
  { id: '1', type: 'listing' as const, target: 'Suspiciously cheap listing in Toronto', reason: 'scam', reporter: 'Alex Rivera', date: 'Mar 26, 2026', status: 'open' as const },
  { id: '2', type: 'listing' as const, target: 'Misleading photos — property looks different in person', reason: 'misleading', reporter: 'Emily Park', date: 'Mar 24, 2026', status: 'reviewed' as const },
  { id: '3', type: 'user' as const, target: 'Spam messages from new account', reason: 'spam', reporter: 'Marc Tremblay', date: 'Mar 22, 2026', status: 'resolved' as const },
  { id: '4', type: 'listing' as const, target: 'Fake listing — address doesn\'t exist', reason: 'scam', reporter: 'Sarah Chen', date: 'Mar 20, 2026', status: 'resolved' as const },
  { id: '5', type: 'user' as const, target: 'Inappropriate profile content', reason: 'inappropriate', reporter: 'James Park', date: 'Mar 18, 2026', status: 'open' as const },
];

const reasonLabels: Record<string, string> = {
  spam: 'Spam',
  misleading: 'Misleading',
  inappropriate: 'Inappropriate',
  scam: 'Scam / Fraud',
};

const typeIcon: Record<string, string> = { listing: '🏠', user: '👤' };

export default function AdminReportsPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'reviewed' | 'resolved'>('all');
  const filtered = filter === 'all' ? reports : reports.filter(r => r.status === filter);
  const openCount = reports.filter(r => r.status === 'open').length;

  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="ios-large-title-area flex items-start justify-between pr-4">
          <div>
            <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-red)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Admin
            </p>
            <h1 className="ios-large-title">Reports</h1>
            {openCount > 0 && (
              <p className="ios-subhead mt-1" style={{ color: 'var(--ios-red)' }}>{openCount} open</p>
            )}
          </div>
        </div>

        {/* Filter segmented control */}
        <div className="px-4 mb-2">
          <div className="ios-segmented" style={{ display: 'flex' }}>
            {(['all', 'open', 'reviewed', 'resolved'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`ios-seg-item flex-1 capitalize ${filter === f ? 'ios-seg-item-active' : ''}`}
                style={{ fontSize: 13, height: 30 }}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="ios-empty-state">
            <div className="ios-empty-icon">
              <span style={{ fontSize: 32 }}>🎉</span>
            </div>
            <p className="ios-headline mb-1">All Clear</p>
            <p className="ios-subhead">No reports matching this filter</p>
          </div>
        ) : (
          <>
            <p className="ios-section-header">{filtered.length} {filtered.length === 1 ? 'Report' : 'Reports'}</p>
            <div className="space-y-0 mx-4">
              {filtered.map((r, i) => (
                <div
                  key={r.id}
                  className="ios-card ios-shadow-xs mb-3"
                  style={{ padding: '14px 16px' }}
                >
                  <div className="flex items-start gap-3">
                    {/* Type icon */}
                    <div
                      className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0"
                      style={{
                        background: r.status === 'open'
                          ? 'rgba(255,59,48,0.10)'
                          : r.status === 'reviewed'
                          ? 'rgba(0,122,255,0.10)'
                          : 'rgba(52,199,89,0.10)',
                      }}
                    >
                      {typeIcon[r.type]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`ios-status ios-status-${r.status}`}>
                            <span className="ios-status-dot" />
                            {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                          </span>
                          <span className="ios-pill ios-pill-gray" style={{ fontSize: 10, height: 20 }}>
                            {r.type}
                          </span>
                          <span className="ios-caption2" style={{ color: 'var(--ios-label3)' }}>
                            {reasonLabels[r.reason]}
                          </span>
                        </div>
                        <span className="ios-caption2 flex-shrink-0" style={{ color: 'var(--ios-label3)' }}>{r.date}</span>
                      </div>

                      <p className="ios-headline" style={{ fontSize: 14 }}>{r.target}</p>
                      <p className="ios-caption1 mt-1" style={{ color: 'var(--ios-label2)' }}>
                        Reported by {r.reporter}
                      </p>

                      {r.status !== 'resolved' && (
                        <div className="flex items-center gap-2 mt-3">
                          {r.status === 'open' && (
                            <>
                              <button
                                className="ios-btn"
                                style={{ height: 32, borderRadius: 8, padding: '0 14px', fontSize: 13, background: 'var(--ios-fill3)', color: 'var(--ios-label2)' }}
                              >
                                Dismiss
                              </button>
                              <button
                                className="ios-btn"
                                style={{ height: 32, borderRadius: 8, padding: '0 14px', fontSize: 13, background: 'rgba(255,59,48,0.10)', color: 'var(--ios-red)', fontWeight: 600 }}
                              >
                                Take Action
                              </button>
                            </>
                          )}
                          {r.status === 'reviewed' && (
                            <button
                              className="ios-btn ios-btn-green"
                              style={{ height: 32, borderRadius: 8, padding: '0 14px', fontSize: 13 }}
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="h-6" />

      </div>
    </div>
  );
}
