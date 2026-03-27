'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';

const applicant = {
  name: 'Jordan Lee',
  email: 'jordan@example.com',
  phone: '(647) 555-0123',
  applied: 'March 20, 2026',
  term: '12 months',
  moveIn: 'April 1, 2026',
  income: '$85,000/year',
  employer: 'Shopify',
  score: 92,
  references: [
    { name: 'Previous Landlord', contact: 'Priya Patel', phone: '(416) 555-0199' },
    { name: 'Employer', contact: 'HR Team', phone: '(613) 555-0100' },
  ],
};

export default function ApplicationDetailPage() {
  const [status, setStatus] = useState<'pending' | 'under_review' | 'approved' | 'rejected'>('pending');
  const [note, setNote] = useState('');

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700',
    under_review: 'bg-blue-50 text-blue-700',
    approved: 'bg-emerald-50 text-emerald-700',
    rejected: 'bg-red-50 text-red-700',
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 pt-28">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/landlord/applications" className="rc-btn-ghost px-3 py-1.5 text-sm">← Back</Link>
        <h1 className="rc-section-title">Application</h1>
        <span className={`rc-badge text-[10px] ml-2 ${statusColors[status]}`}>{status.replace('_', ' ')}</span>
      </div>

      {/* Score + Status */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rc-card-static p-5 text-center">
          <p className="text-3xl font-bold" style={{ color: applicant.score >= 80 ? 'var(--rc-green)' : 'var(--rc-orange)' }}>{applicant.score}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>Match Score</p>
        </div>
        <div className="rc-card-static p-5 text-center">
          <p className="text-3xl font-bold" style={{ color: 'var(--rc-text)' }}>{formatCurrency(2400)}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>Monthly Rent</p>
        </div>
      </div>

      {/* Applicant info */}
      <div className="rc-card-static p-6 mb-4">
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>👤 Applicant</h2>
        <div className="space-y-3">
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Name</span><span className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>{applicant.name}</span></div>
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Email</span><span className="text-sm" style={{ color: 'var(--rc-primary)' }}>{applicant.email}</span></div>
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Phone</span><span className="text-sm" style={{ color: 'var(--rc-text)' }}>{applicant.phone}</span></div>
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Applied</span><span className="text-sm" style={{ color: 'var(--rc-text)' }}>{applicant.applied}</span></div>
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Desired Term</span><span className="text-sm" style={{ color: 'var(--rc-text)' }}>{applicant.term}</span></div>
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Move-in Date</span><span className="text-sm" style={{ color: 'var(--rc-text)' }}>{applicant.moveIn}</span></div>
        </div>
      </div>

      {/* Employment */}
      <div className="rc-card-static p-6 mb-4">
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>💼 Employment</h2>
        <div className="space-y-3">
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Employer</span><span className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>{applicant.employer}</span></div>
          <div className="flex justify-between"><span className="text-sm" style={{ color: 'var(--rc-muted)' }}>Income</span><span className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>{applicant.income}</span></div>
        </div>
      </div>

      {/* References */}
      <div className="rc-card-static p-6 mb-4">
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>📞 References</h2>
        <div className="space-y-3">
          {applicant.references.map((r) => (
            <div key={r.name}>
              <p className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>{r.contact}</p>
              <p className="text-xs" style={{ color: 'var(--rc-muted)' }}>{r.name} · {r.phone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Internal Note</label>
        <textarea className="rc-input min-h-[80px] resize-none" placeholder="Add a private note..." value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={() => setStatus('rejected')} className="flex-1 py-3 rounded-full text-sm font-semibold border-2 border-red-200 text-red-600 hover:bg-red-50 transition-colors duration-200">Decline</button>
        <button onClick={() => setStatus('approved')} className="flex-1 rc-btn-primary">Approve</button>
      </div>
    </div>
  );
}
