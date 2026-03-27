'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';

const mockPayments = [
  { id: '1', property: 'Modern Downtown Loft', amount: 2400, type: 'rent', status: 'completed', date: '2026-03-01', method: 'Auto-pay' },
  { id: '2', property: 'Modern Downtown Loft', amount: 2400, type: 'rent', status: 'completed', date: '2026-02-01', method: 'Auto-pay' },
  { id: '3', property: 'Modern Downtown Loft', amount: 2400, type: 'rent', status: 'completed', date: '2026-01-01', method: 'Auto-pay' },
  { id: '4', property: 'Modern Downtown Loft', amount: 2400, type: 'deposit', status: 'completed', date: '2025-12-15', method: 'Bank Transfer' },
  { id: '5', property: 'Modern Downtown Loft', amount: 2400, type: 'rent', status: 'pending', date: '2026-04-01', method: 'Auto-pay' },
];

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  failed: 'bg-red-50 text-red-700',
};

export default function PaymentsPage() {
  const [filter, setFilter] = useState<'all' | 'rent' | 'deposit'>('all');
  const filtered = filter === 'all' ? mockPayments : mockPayments.filter((p) => p.type === filter);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 pt-28">
      <h1 className="rc-section-title">Payments</h1>
      <p className="text-sm mt-1" style={{ color: 'var(--rc-muted)' }}>Track rent payments and deposits</p>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="rc-card-static p-5">
          <p className="text-xs font-medium" style={{ color: 'var(--rc-muted)' }}>Total Paid</p>
          <p className="text-2xl font-bold mt-1" style={{ color: 'var(--rc-text)' }}>{formatCurrency(7200)}</p>
        </div>
        <div className="rc-card-static p-5">
          <p className="text-xs font-medium" style={{ color: 'var(--rc-muted)' }}>Upcoming</p>
          <p className="text-2xl font-bold mt-1" style={{ color: 'var(--rc-primary)' }}>{formatCurrency(2400)}</p>
        </div>
        <div className="rc-card-static p-5">
          <p className="text-xs font-medium" style={{ color: 'var(--rc-muted)' }}>Deposit Held</p>
          <p className="text-2xl font-bold mt-1" style={{ color: 'var(--rc-text)' }}>{formatCurrency(2400)}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mt-8">
        {(['all', 'rent', 'deposit'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rc-badge transition-all duration-200 ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Payment list */}
      <div className="mt-6 space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className="rc-card-static p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-lg">{p.type === 'rent' ? '🏠' : '🏦'}</span>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--rc-text)' }}>{p.property}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--rc-muted)' }}>{new Date(p.date).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })} · {p.method}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold" style={{ color: 'var(--rc-text)' }}>{formatCurrency(p.amount)}</p>
              <span className={`rc-badge text-[10px] mt-1 ${statusStyles[p.status]}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-pay CTA */}
      <div className="rc-card-static p-6 mt-8 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)' }}>
        <div>
          <p className="font-semibold text-sm" style={{ color: 'var(--rc-text)' }}>💳 Auto-pay is active</p>
          <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>Rent is automatically paid on the 1st of each month</p>
        </div>
        <Link href="/profile/settings" className="rc-btn-secondary text-xs px-4 py-2">Manage</Link>
      </div>
    </div>
  );
}
