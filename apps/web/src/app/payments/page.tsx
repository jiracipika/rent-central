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

const typeIcon: Record<string, string> = { rent: '🏠', deposit: '🏦' };

export default function PaymentsPage() {
  const [filter, setFilter] = useState<'all' | 'rent' | 'deposit'>('all');
  const filtered = filter === 'all' ? mockPayments : mockPayments.filter((p) => p.type === filter);

  const totalPaid = mockPayments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const upcoming = mockPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const deposit = mockPayments.filter(p => p.type === 'deposit').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="ios-large-title-area">
          <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-blue)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Payments
          </p>
          <h1 className="ios-large-title">Rent Payments</h1>
          <p className="ios-subhead mt-1">Track your rent and deposits</p>
        </div>

        {/* Summary cards */}
        <div className="ios-scroll-x py-2" style={{ gap: 10, paddingBottom: 8 }}>
          <div className="ios-stat-card ios-gradient-card-green" style={{ minWidth: 130 }}>
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg mb-2" style={{ background: 'rgba(52,199,89,0.15)' }}>
              ✅
            </div>
            <p className="ios-stat-value" style={{ color: 'var(--ios-green)' }}>{formatCurrency(totalPaid)}</p>
            <p className="ios-stat-label">Total Paid</p>
          </div>
          <div className="ios-stat-card ios-gradient-card-blue" style={{ minWidth: 130 }}>
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg mb-2" style={{ background: 'rgba(0,122,255,0.12)' }}>
              📅
            </div>
            <p className="ios-stat-value" style={{ color: 'var(--ios-blue)' }}>{formatCurrency(upcoming)}</p>
            <p className="ios-stat-label">Upcoming</p>
          </div>
          <div className="ios-stat-card" style={{ minWidth: 130 }}>
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg mb-2" style={{ background: 'var(--ios-fill3)' }}>
              🏦
            </div>
            <p className="ios-stat-value">{formatCurrency(deposit)}</p>
            <p className="ios-stat-label">Deposit Held</p>
          </div>
        </div>

        {/* Auto-pay banner */}
        <div className="mx-4 mb-4">
          <div
            className="flex items-center justify-between p-4 rounded-[14px]"
            style={{
              background: 'linear-gradient(135deg, rgba(52,199,89,0.08) 0%, rgba(0,122,255,0.06) 100%)',
              border: '0.5px solid rgba(52,199,89,0.20)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg" style={{ background: 'rgba(52,199,89,0.15)' }}>
                💳
              </div>
              <div>
                <p className="ios-headline" style={{ fontSize: 14, color: 'var(--ios-green)' }}>Auto-pay is active</p>
                <p className="ios-caption1 mt-0.5">Rent paid automatically on the 1st</p>
              </div>
            </div>
            <Link
              href="/profile/settings"
              className="ios-btn-text"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              Manage
            </Link>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="px-4 mb-2">
          <div className="ios-segmented w-full" style={{ display: 'flex' }}>
            {(['all', 'rent', 'deposit'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`ios-seg-item flex-1 capitalize ${filter === f ? 'ios-seg-item-active' : ''}`}
                style={{ fontSize: 14, height: 32 }}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Payment list */}
        <p className="ios-section-header">Transaction History</p>
        <div className="ios-group">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="ios-row"
              style={{ minHeight: 64, alignItems: 'flex-start', paddingTop: 12, paddingBottom: 12, cursor: 'default' }}
            >
              <div
                className="ios-row-icon flex-shrink-0"
                style={{
                  background: p.status === 'pending'
                    ? 'rgba(255,149,0,0.12)'
                    : 'rgba(52,199,89,0.12)',
                  marginTop: 1,
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                }}
              >
                <span style={{ fontSize: 16 }}>{typeIcon[p.type]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="ios-headline" style={{ fontSize: 14 }}>{p.property}</p>
                <p className="ios-caption1 mt-0.5" style={{ color: 'var(--ios-label2)' }}>
                  {new Date(p.date).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
                  {' · '}{p.method}
                </p>
                <span
                  className={`ios-status mt-1.5 ${p.status === 'completed' ? 'ios-status-completed' : 'ios-status-pending'}`}
                  style={{ display: 'inline-flex' }}
                >
                  <span className="ios-status-dot" />
                  {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                </span>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p
                  className="ios-headline"
                  style={{ fontSize: 16, fontWeight: 700, color: p.status === 'pending' ? 'var(--ios-orange)' : 'var(--ios-label)' }}
                >
                  {formatCurrency(p.amount)}
                </p>
                <p className="ios-caption2 mt-0.5 capitalize" style={{ color: 'var(--ios-label3)' }}>{p.type}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pay now button (if upcoming) */}
        {upcoming > 0 && (
          <div className="px-4 mt-2 mb-6">
            <button
              className="ios-btn ios-btn-blue ios-gradient-blue ios-shadow-blue w-full"
              style={{ height: 50, borderRadius: 14, fontSize: 17, fontWeight: 600 }}
            >
              Pay {formatCurrency(upcoming)} Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
