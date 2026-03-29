'use client';

import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';

export default function ContractDetailPage() {
  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Back nav */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          <Link
            href="/contracts"
            className="ios-btn-text flex items-center gap-1"
            style={{ minHeight: 44 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Contracts
          </Link>
        </div>

        {/* Header card */}
        <div className="mx-4 mb-3">
          <div
            className="rounded-[18px] p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(52,199,89,0.08) 0%, rgba(0,122,255,0.06) 100%)',
              border: '0.5px solid rgba(52,199,89,0.20)',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="ios-title3" style={{ fontSize: 18 }}>Modern Downtown Loft</p>
                <p className="ios-subhead mt-0.5" style={{ color: 'var(--ios-label2)' }}>123 King St W, Toronto, ON M5H 1A1</p>
              </div>
              <span className="ios-status ios-status-completed flex-shrink-0">
                <span className="ios-status-dot" />
                Executed
              </span>
            </div>
          </div>
        </div>

        {/* Parties */}
        <p className="ios-section-header">Parties</p>
        <div className="ios-group">
          <div className="ios-row" style={{ minHeight: 60, alignItems: 'flex-start', paddingTop: 12, paddingBottom: 12, cursor: 'default' }}>
            <div className="ios-row-icon" style={{ background: 'rgba(0,122,255,0.10)', width: 32, height: 32, borderRadius: 8 }}>
              <span style={{ fontSize: 14 }}>🏠</span>
            </div>
            <div className="flex-1">
              <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-label3)' }}>Landlord</p>
              <p className="ios-headline" style={{ fontSize: 15 }}>Sarah Chen</p>
              <p className="ios-caption1 mt-0.5" style={{ color: 'var(--ios-label2)' }}>sarah@example.com</p>
            </div>
          </div>
          <div className="ios-row" style={{ minHeight: 60, alignItems: 'flex-start', paddingTop: 12, paddingBottom: 12, cursor: 'default' }}>
            <div className="ios-row-icon" style={{ background: 'rgba(52,199,89,0.10)', width: 32, height: 32, borderRadius: 8 }}>
              <span style={{ fontSize: 14 }}>👤</span>
            </div>
            <div className="flex-1">
              <p className="ios-caption1 mb-0.5" style={{ color: 'var(--ios-label3)' }}>Tenant</p>
              <p className="ios-headline" style={{ fontSize: 15 }}>Jordan Lee</p>
              <p className="ios-caption1 mt-0.5" style={{ color: 'var(--ios-label2)' }}>jordan@example.com</p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <p className="ios-section-header mt-2">Lease Terms</p>
        <div className="ios-group">
          {[
            { label: 'Lease Period', value: 'Apr 1, 2026 – Mar 31, 2027' },
            { label: 'Monthly Rent', value: formatCurrency(2400) },
            { label: 'Security Deposit', value: formatCurrency(2400) },
            { label: 'Utilities Included', value: 'Yes', color: 'var(--ios-green)' },
            { label: 'Pet Policy', value: 'Pet Friendly' },
          ].map((row) => (
            <div key={row.label} className="ios-row" style={{ cursor: 'default' }}>
              <span className="ios-row-label" style={{ fontSize: 15, color: 'var(--ios-label2)' }}>{row.label}</span>
              <span className="ios-row-value" style={{ fontWeight: 600, color: row.color || 'var(--ios-label)', fontSize: 15 }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Signatures */}
        <p className="ios-section-header mt-2">Signatures</p>
        <div className="ios-group">
          {[
            { label: 'Tenant signed', name: 'Jordan Lee', date: 'Mar 25, 2026', signed: true },
            { label: 'Landlord signed', name: 'Sarah Chen', date: 'Mar 26, 2026', signed: true },
          ].map((sig) => (
            <div key={sig.label} className="ios-row" style={{ minHeight: 56, cursor: 'default' }}>
              <div
                className="ios-row-icon"
                style={{ background: sig.signed ? 'rgba(52,199,89,0.12)' : 'rgba(255,149,0,0.10)' }}
              >
                <span style={{ fontSize: 15 }}>{sig.signed ? '✅' : '⏳'}</span>
              </div>
              <div className="flex-1">
                <p className="ios-row-label" style={{ fontSize: 15 }}>{sig.label}</p>
                <p className="ios-caption1 mt-0.5" style={{ color: 'var(--ios-label2)' }}>
                  {sig.name} · {sig.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-4 mt-4 flex gap-3 mb-8">
          <button
            className="ios-btn flex-1"
            style={{ height: 46, borderRadius: 13, background: 'rgba(0,122,255,0.10)', color: 'var(--ios-blue)', fontSize: 15, fontWeight: 600 }}
          >
            📄 Download PDF
          </button>
          <button
            className="ios-btn flex-1"
            style={{ height: 46, borderRadius: 13, background: 'var(--ios-fill3)', color: 'var(--ios-label)', fontSize: 15 }}
          >
            Send Copy
          </button>
        </div>

      </div>
    </div>
  );
}
