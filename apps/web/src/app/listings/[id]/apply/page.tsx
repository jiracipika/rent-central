'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';
import type { RentalTerm } from '@rent-central/core';

const rentalTerms: RentalTerm[] = [3, 6, 12];

export default function ApplyPage() {
  const [selectedTerm, setSelectedTerm] = useState<RentalTerm>(12);

  return (
    <div className="ios-page" style={{ paddingBottom: 100 }}>
      <div style={{ paddingTop: 60 }}>

        {/* Back nav */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          <Link
            href="/listings/1"
            className="ios-btn-text flex items-center gap-1"
            style={{ minHeight: 44 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Listing
          </Link>
        </div>

        {/* Header */}
        <div className="px-4 pb-4">
          <h1 className="ios-large-title" style={{ fontSize: 28 }}>Apply for Rental</h1>
          <p className="ios-subhead mt-1" style={{ color: 'var(--ios-label2)' }}>
            Modern Downtown Loft · {formatCurrency(2400)}/mo
          </p>
        </div>

        {/* Step progress */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 mb-2">
            {['Personal', 'Employment', 'References', 'Review'].map((s, i) => (
              <div key={s} className="flex-1">
                <div
                  className="w-full h-1 rounded-full"
                  style={{ background: i === 0 ? 'var(--ios-blue)' : 'var(--ios-fill3)' }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {['Personal', 'Employment', 'References', 'Review'].map((s, i) => (
              <p key={s} className="flex-1 text-center ios-caption2" style={{ color: i === 0 ? 'var(--ios-blue)' : 'var(--ios-label3)', fontSize: 10 }}>{s}</p>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <p className="ios-section-header">Personal Information</p>
        <div className="ios-input-group ios-shadow-xs">
          <div className="ios-input-row">
            <span className="ios-input-label" style={{ minWidth: 90 }}>First name</span>
            <input className="ios-input-field" placeholder="Jordan" autoComplete="given-name" />
          </div>
          <div className="ios-input-row">
            <span className="ios-input-label" style={{ minWidth: 90 }}>Last name</span>
            <input className="ios-input-field" placeholder="Lee" autoComplete="family-name" />
          </div>
          <div className="ios-input-row">
            <span className="ios-input-label">Email</span>
            <input className="ios-input-field" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="ios-input-row">
            <span className="ios-input-label">Phone</span>
            <input className="ios-input-field" type="tel" placeholder="(647) 555-0123" autoComplete="tel" />
          </div>
        </div>

        {/* Preferred lease term */}
        <p className="ios-section-header mt-2">Preferred Lease Term</p>
        <div className="ios-group">
          {rentalTerms.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTerm(t)}
              className="ios-row"
              style={{ minHeight: 50 }}
            >
              <div
                className="ios-row-icon"
                style={{ background: selectedTerm === t ? 'rgba(0,122,255,0.12)' : 'var(--ios-fill3)' }}
              >
                <span style={{ fontSize: 14 }}>📅</span>
              </div>
              <span className="ios-row-label" style={{ fontSize: 15 }}>{t} months</span>
              <span className="ios-row-value" style={{ fontSize: 14 }}>
                {formatCurrency(Math.round(2400 * (t === 3 ? 1.15 : t === 6 ? 1.05 : 1)))}/mo
              </span>
              {selectedTerm === t && (
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--ios-blue)" strokeWidth={2.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Employment */}
        <p className="ios-section-header mt-2">Employment Details</p>
        <div className="ios-input-group ios-shadow-xs">
          <div className="ios-input-row">
            <span className="ios-input-label">Employer</span>
            <input className="ios-input-field" placeholder="Company name" />
          </div>
          <div className="ios-input-row">
            <span className="ios-input-label">Job Title</span>
            <input className="ios-input-field" placeholder="Software Engineer" />
          </div>
          <div className="ios-input-row">
            <span className="ios-input-label">Income/yr</span>
            <input className="ios-input-field" type="number" placeholder="85,000" />
          </div>
        </div>
        <p className="ios-section-footer">
          💡 Income is shared only with the landlord. Aim for 3× monthly rent in annual income.
        </p>

        {/* References */}
        <p className="ios-section-header">References</p>
        <div className="ios-input-group ios-shadow-xs">
          <div className="ios-input-row">
            <span className="ios-input-label">Name</span>
            <input className="ios-input-field" placeholder="Previous landlord or employer" />
          </div>
          <div className="ios-input-row">
            <span className="ios-input-label">Phone</span>
            <input className="ios-input-field" type="tel" placeholder="(416) 555-0199" />
          </div>
        </div>

        <p className="ios-section-header mt-2">Note to Landlord</p>
        <div className="mx-4 mb-2">
          <textarea
            className="ios-input-standalone"
            style={{ minHeight: 88, resize: 'none', lineHeight: 1.5, borderRadius: 14 }}
            placeholder="I'm excited about this property…"
          />
        </div>

        {/* Submit */}
        <div className="px-4 mt-4 mb-8">
          <button
            className="ios-btn ios-btn-blue ios-gradient-blue ios-shadow-blue w-full"
            style={{ height: 50, borderRadius: 14, fontSize: 17, fontWeight: 600 }}
          >
            Submit Application
          </button>
          <p className="ios-caption2 text-center mt-3" style={{ color: 'var(--ios-label3)' }}>
            By submitting, you confirm all info is accurate and consent to a soft credit check.
          </p>
        </div>

      </div>
    </div>
  );
}
