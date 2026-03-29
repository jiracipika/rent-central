'use client';

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

const statusDisplay: Record<string, { label: string; cls: string; icon: string }> = {
  executed:          { label: 'Signed',            cls: 'ios-status-completed',    icon: '✍️' },
  awaiting_renter:   { label: 'Awaiting Signature', cls: 'ios-status-pending',      icon: '📋' },
  awaiting_landlord: { label: 'Your Signature Needed', cls: 'ios-status-under-review', icon: '📝' },
  expired:           { label: 'Expired',            cls: 'ios-status-draft',        icon: '📄' },
};

export default function ContractsPage() {
  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="ios-large-title-area">
          <h1 className="ios-large-title">Contracts</h1>
          <p className="ios-subhead mt-1">Rental agreements and leases</p>
        </div>

        {/* Contract cards */}
        <p className="ios-section-header">{contracts.length} Agreements</p>
        <div className="space-y-0 px-4">
          {contracts.map((c) => {
            const s = statusDisplay[c.status] || statusDisplay.expired;
            const needsSign = c.status === 'awaiting_renter' || c.status === 'awaiting_landlord';
            return (
              <Link
                key={c.id}
                href={`/contracts/${c.id}`}
                className="ios-card ios-card-lift ios-shadow-xs mb-3 block"
                style={{ padding: '16px' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className="w-10 h-10 rounded-[12px] flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: needsSign ? 'rgba(255,149,0,0.10)' : 'rgba(52,199,89,0.10)' }}
                    >
                      {s.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="ios-headline truncate" style={{ fontSize: 15 }}>{c.property}</p>
                      <p className="ios-caption1 mt-0.5" style={{ color: 'var(--ios-label2)' }}>
                        {c.tenant} · {formatCurrency(c.rent)}/mo
                      </p>
                      <p className="ios-caption2 mt-0.5">
                        {new Date(c.startDate).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                        {' – '}
                        {new Date(c.endDate).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className={`ios-status ${s.cls}`}>
                      <span className="ios-status-dot" />
                      {s.label}
                    </span>
                    {needsSign && (
                      <span
                        className="ios-pill ios-pill-active"
                        style={{ fontSize: 11, height: 24 }}
                      >
                        Sign Now
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="h-6" />

      </div>
    </div>
  );
}
