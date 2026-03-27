'use client';

import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';

export default function ContractDetailPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 pt-28">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/contracts" className="rc-btn-ghost px-3 py-1.5 text-sm">← Back</Link>
        <h1 className="rc-section-title">Contract Details</h1>
        <span className="rc-badge text-[10px] bg-emerald-50 text-emerald-700">Executed</span>
      </div>

      {/* Contract info */}
      <div className="rc-card-static p-6 mb-4" style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #EFF6FF 100%)' }}>
        <h2 className="font-semibold" style={{ color: 'var(--rc-text)' }}>Modern Downtown Loft</h2>
        <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>123 King St W, Toronto, ON M5H 1A1</p>
      </div>

      {/* Parties */}
      <div className="rc-card-static p-6 mb-4">
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>Parties</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium" style={{ color: 'var(--rc-muted)' }}>Landlord</p>
            <p className="text-sm font-semibold mt-1" style={{ color: 'var(--rc-text)' }}>Sarah Chen</p>
            <p className="text-xs" style={{ color: 'var(--rc-muted)' }}>sarah@example.com</p>
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: 'var(--rc-muted)' }}>Tenant</p>
            <p className="text-sm font-semibold mt-1" style={{ color: 'var(--rc-text)' }}>Jordan Lee</p>
            <p className="text-xs" style={{ color: 'var(--rc-muted)' }}>jordan@example.com</p>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="rc-card-static p-6 mb-4">
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>Terms</h2>
        <div className="space-y-3">
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Lease Period</span><span className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>Apr 1, 2026 – Mar 31, 2027</span></div>
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Monthly Rent</span><span className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>{formatCurrency(2400)}</span></div>
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Security Deposit</span><span className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>{formatCurrency(2400)}</span></div>
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Utilities Included</span><span className="text-sm font-medium" style={{ color: 'var(--rc-green)' }}>Yes</span></div>
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Pet Policy</span><span className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>Pet Friendly</span></div>
        </div>
      </div>

      {/* Signatures */}
      <div className="rc-card-static p-6 mb-6">
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>Signatures</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-emerald-50">
            <span className="text-lg">✅</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>Tenant signed</p>
              <p className="text-xs" style={{ color: 'var(--rc-muted)' }}>Jordan Lee · Mar 25, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-emerald-50">
            <span className="text-lg">✅</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>Landlord signed</p>
              <p className="text-xs" style={{ color: 'var(--rc-muted)' }}>Sarah Chen · Mar 26, 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="rc-btn-secondary px-6 py-3 text-sm">📄 Download PDF</button>
        <button className="rc-btn-ghost px-6 py-3 text-sm border border-gray-200 rounded-full">Send Copy</button>
      </div>
    </div>
  );
}
