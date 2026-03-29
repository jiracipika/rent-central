'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';

const applicant = {
  name: 'Jordan Lee',
  initials: 'JL',
  color: '#007AFF',
  email: 'jordan@example.com',
  phone: '(647) 555-0123',
  applied: 'March 20, 2026',
  term: '12 months',
  moveIn: 'April 1, 2026',
  income: '$85,000/year',
  employer: 'Shopify',
  jobTitle: 'Software Engineer',
  note: "I'm a quiet professional who works from home. I've been renting for 5 years with no issues. Looking for a long-term home.",
  score: 92,
  references: [
    { name: 'Previous Landlord', contact: 'Priya Patel', phone: '(416) 555-0199' },
    { name: 'Employer', contact: 'HR Team', phone: '(613) 555-0100' },
  ],
};

const statusDisplay: Record<string, { cls: string; label: string }> = {
  pending:      { cls: 'ios-status-pending',      label: 'Pending' },
  under_review: { cls: 'ios-status-under-review', label: 'Under Review' },
  approved:     { cls: 'ios-status-approved',     label: 'Approved' },
  rejected:     { cls: 'ios-status-rejected',     label: 'Rejected' },
};

export default function ApplicationDetailPage() {
  const [status, setStatus] = useState<'pending' | 'under_review' | 'approved' | 'rejected'>('pending');
  const [note, setNote] = useState('');

  const s = statusDisplay[status];

  return (
    <div className="ios-page" style={{ paddingBottom: 100 }}>
      <div style={{ paddingTop: 60 }}>

        {/* Back nav */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          <Link
            href="/landlord/applications"
            className="ios-btn-text flex items-center gap-1"
            style={{ minHeight: 44 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Applicants
          </Link>
        </div>

        {/* Header */}
        <div className="px-4 pb-4 flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-semibold text-white text-lg flex-shrink-0"
            style={{ background: applicant.color }}
          >
            {applicant.initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="ios-large-title" style={{ fontSize: 24 }}>{applicant.name}</h1>
              <span className={`ios-status ${s.cls}`}>
                <span className="ios-status-dot" />
                {s.label}
              </span>
            </div>
            <p className="ios-subhead mt-0.5" style={{ color: 'var(--ios-label2)' }}>
              Applied {applicant.applied}
            </p>
          </div>
        </div>

        {/* Score + Rent stats */}
        <div className="px-4 mb-4 grid grid-cols-2 gap-3">
          <div
            className="rounded-[16px] p-4 text-center ios-shadow-xs"
            style={{ background: applicant.score >= 80 ? 'rgba(52,199,89,0.08)' : 'rgba(255,149,0,0.08)', border: '0.5px solid rgba(52,199,89,0.18)' }}
          >
            <p className="text-3xl font-bold" style={{ color: applicant.score >= 80 ? 'var(--ios-green)' : 'var(--ios-orange)' }}>
              {applicant.score}
            </p>
            <p className="ios-caption1 mt-1" style={{ color: 'var(--ios-label2)' }}>Match Score</p>
          </div>
          <div
            className="rounded-[16px] p-4 text-center ios-shadow-xs"
            style={{ background: 'rgba(0,122,255,0.06)', border: '0.5px solid rgba(0,122,255,0.14)' }}
          >
            <p className="text-3xl font-bold" style={{ color: 'var(--ios-blue)' }}>
              {formatCurrency(2400)}
            </p>
            <p className="ios-caption1 mt-1" style={{ color: 'var(--ios-label2)' }}>Monthly Rent</p>
          </div>
        </div>

        {/* Applicant info */}
        <p className="ios-section-header">Applicant</p>
        <div className="ios-group">
          {[
            { label: 'Email',       value: applicant.email,   color: 'var(--ios-blue)' },
            { label: 'Phone',       value: applicant.phone },
            { label: 'Desired Term',value: applicant.term },
            { label: 'Move-in Date',value: applicant.moveIn },
          ].map((row) => (
            <div key={row.label} className="ios-row" style={{ cursor: 'default' }}>
              <span className="ios-row-label" style={{ fontSize: 15, color: 'var(--ios-label2)' }}>{row.label}</span>
              <span className="ios-row-value" style={{ fontWeight: 500, color: row.color || 'var(--ios-label)', fontSize: 15 }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Note from applicant */}
        {applicant.note && (
          <>
            <p className="ios-section-header mt-2">Note from Applicant</p>
            <div className="mx-4 mb-2 rounded-[14px] p-4 ios-shadow-xs" style={{ background: 'var(--ios-bg2)', border: '0.5px solid var(--ios-separator)' }}>
              <p className="ios-subhead" style={{ lineHeight: 1.5, color: 'var(--ios-label)' }}>{applicant.note}</p>
            </div>
          </>
        )}

        {/* Employment */}
        <p className="ios-section-header mt-2">Employment</p>
        <div className="ios-group">
          {[
            { label: 'Employer',  value: applicant.employer },
            { label: 'Job Title', value: applicant.jobTitle },
            { label: 'Income',    value: applicant.income, color: 'var(--ios-green)' },
          ].map((row) => (
            <div key={row.label} className="ios-row" style={{ cursor: 'default' }}>
              <span className="ios-row-label" style={{ fontSize: 15, color: 'var(--ios-label2)' }}>{row.label}</span>
              <span className="ios-row-value" style={{ fontWeight: 500, color: row.color || 'var(--ios-label)', fontSize: 15 }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* References */}
        <p className="ios-section-header mt-2">References</p>
        <div className="ios-group">
          {applicant.references.map((r) => (
            <div key={r.name} className="ios-row" style={{ minHeight: 56, cursor: 'default' }}>
              <div className="ios-row-icon" style={{ background: 'rgba(0,122,255,0.10)' }}>
                <span style={{ fontSize: 14 }}>📞</span>
              </div>
              <div className="flex-1">
                <p className="ios-row-label" style={{ fontSize: 15 }}>{r.contact}</p>
                <p className="ios-caption1 mt-0.5" style={{ color: 'var(--ios-label2)' }}>{r.name} · {r.phone}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Internal note */}
        <p className="ios-section-header mt-2">Internal Note</p>
        <div className="mx-4 mb-2">
          <textarea
            className="ios-input-standalone"
            style={{ minHeight: 80, resize: 'none', lineHeight: 1.5, borderRadius: 14 }}
            placeholder="Add a private note visible only to you…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <p className="ios-section-footer">This note is only visible to you and won't be shared with the applicant.</p>

        {/* Actions */}
        <div className="px-4 mt-4 flex gap-3 mb-8">
          <button
            onClick={() => setStatus('rejected')}
            className="ios-btn flex-1"
            style={{
              height: 50, borderRadius: 14,
              background: status === 'rejected' ? 'rgba(255,59,48,0.12)' : 'var(--ios-fill3)',
              color: 'var(--ios-red)',
              fontSize: 15, fontWeight: 600,
              border: status === 'rejected' ? '1px solid rgba(255,59,48,0.25)' : 'none',
            }}
          >
            Decline
          </button>
          <button
            onClick={() => setStatus('approved')}
            className="ios-btn ios-gradient-green ios-shadow-blue flex-1"
            style={{ height: 50, borderRadius: 14, fontSize: 15, fontWeight: 600, color: '#fff',
              opacity: status === 'approved' ? 0.7 : 1,
            }}
          >
            {status === 'approved' ? 'Approved ✓' : 'Approve'}
          </button>
        </div>

      </div>
    </div>
  );
}
