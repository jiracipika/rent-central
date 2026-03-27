'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';

const contracts = [
  {
    id: '1', property: 'Modern Downtown Loft', tenant: 'Jordan Lee',
    status: 'executed' as const, startDate: '2026-04-01', endDate: '2027-03-31',
    rent: 2400, signedDate: 'Mar 25, 2026',
  },
  {
    id: '2', property: 'Cozy Plateau Studio', tenant: 'Marc Tremblay',
    status: 'awaiting_renter' as const, startDate: '2026-05-01', endDate: '2026-10-31',
    rent: 1700, signedDate: '—',
  },
  {
    id: '3', property: 'Yaletown Condo', tenant: 'Aisha Khan',
    status: 'awaiting_landlord' as const, startDate: '2026-04-15', endDate: '2027-04-14',
    rent: 3000, signedDate: '—',
  },
];

const statusStyles: Record<string, string> = {
  executed: 'bg-emerald-50 text-emerald-700',
  awaiting_renter: 'bg-amber-50 text-amber-700',
  awaiting_landlord: 'bg-blue-50 text-blue-700',
  expired: 'bg-gray-100 text-gray-600',
};

export default function ContractsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 pt-28">
      <h1 className="rc-section-title">Contracts</h1>
      <p className="text-sm mt-1" style={{ color: 'var(--rc-muted)' }}>Manage rental agreements</p>

      <div className="space-y-4 mt-8">
        {contracts.map((c) => (
          <Link key={c.id} href={`/contracts/${c.id}`} className="block rc-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--rc-text)' }}>{c.property}</h3>
                  <span className={`rc-badge text-[10px] ${statusStyles[c.status]}`}>
                    {c.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>
                  Tenant: {c.tenant} · {formatCurrency(c.rent)}/mo
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--rc-muted)' }}>
                  {new Date(c.startDate).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} – {new Date(c.endDate).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {c.status !== 'executed' && (
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-blue-600 text-white">Sign Now</span>
                )}
                <span style={{ color: 'var(--rc-muted)' }}>›</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
