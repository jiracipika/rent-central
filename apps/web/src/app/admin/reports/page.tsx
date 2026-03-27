'use client';

import { useState } from 'react';

const reports = [
  { id: '1', type: 'listing' as const, target: 'Suspiciously cheap listing in Toronto', reason: 'scam', reporter: 'Alex Rivera', date: '2026-03-26', status: 'open' as const },
  { id: '2', type: 'listing' as const, target: 'Misleading photos — property looks different in person', reason: 'misleading', reporter: 'Emily Park', date: '2026-03-24', status: 'reviewed' as const },
  { id: '3', type: 'user' as const, target: 'Spam messages from new account', reason: 'spam', reporter: 'Marc Tremblay', date: '2026-03-22', status: 'resolved' as const },
  { id: '4', type: 'listing' as const, target: 'Fake listing — address doesn\'t exist', reason: 'scam', reporter: 'Sarah Chen', date: '2026-03-20', status: 'resolved' as const },
  { id: '5', type: 'user' as const, target: 'Inappropriate profile content', reason: 'inappropriate', reporter: 'James Park', date: '2026-03-18', status: 'open' as const },
];

const statusColors: Record<string, string> = {
  open: 'bg-red-100 text-red-800',
  reviewed: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
};

const reasonLabels: Record<string, string> = {
  spam: 'Spam',
  misleading: 'Misleading',
  inappropriate: 'Inappropriate',
  scam: 'Scam / Fraud',
};

export default function AdminReportsPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'reviewed' | 'resolved'>('all');
  const filtered = filter === 'all' ? reports : reports.filter(r => r.status === filter);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="rc-section-title mb-1">Admin — Reports</h1>
          <p className="text-sm text-gray-400">{reports.filter(r => r.status === 'open').length} open reports</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100">
          {(['all', 'open', 'reviewed', 'resolved'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all capitalize ${filter === f ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="rc-card-static p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusColors[r.status]}`}>{r.status}</span>
                  <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 capitalize">{r.type}</span>
                  <span className="text-xs text-gray-400">{reasonLabels[r.reason]}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{r.target}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Reported by {r.reporter} · {r.date}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {r.status === 'open' && (
                  <>
                    <button className="rc-btn-ghost text-xs border border-gray-200 px-4 py-2">Dismiss</button>
                    <button className="text-xs font-medium text-red-600 px-4 py-2 rounded-full border border-red-200 hover:bg-red-50 transition-colors">Take Action</button>
                  </>
                )}
                {r.status === 'reviewed' && (
                  <button className="rc-btn-primary text-xs px-4 py-2">Resolve</button>
                )}
                {r.status === 'resolved' && (
                  <span className="text-xs text-gray-400 px-3">Closed</span>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl">🎉</span>
            <p className="mt-3 text-gray-500 font-medium">No reports matching this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
