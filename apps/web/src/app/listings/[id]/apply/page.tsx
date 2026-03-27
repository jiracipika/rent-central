'use client';

import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';
import type { RentalTerm } from '@rent-central/core';

const terms: RentalTerm[] = [3, 6, 12];

export default function ApplyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 pt-28">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/listings/1" className="rc-btn-ghost px-3 py-1.5 text-sm">← Back</Link>
      </div>
      <h1 className="rc-section-title">Apply for Rental</h1>
      <p className="text-sm mt-1 mb-8" style={{ color: 'var(--rc-muted)' }}>Modern Downtown Loft · {formatCurrency(2400)}/mo</p>

      {/* Step indicator */}
      <div className="flex gap-2 mb-8">
        {['Personal', 'Employment', 'References', 'Review'].map((s, i) => (
          <div key={s} className="flex-1">
            <div className="w-full h-1 rounded-full bg-blue-600" />
            <span className="block text-[10px] font-medium mt-1.5 text-center text-blue-600">{s}</span>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {/* Personal */}
        <div className="rc-card-static p-6">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--rc-muted)' }}>First Name</label>
              <input className="rc-input" placeholder="Jordan" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--rc-muted)' }}>Last Name</label>
              <input className="rc-input" placeholder="Lee" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--rc-muted)' }}>Email</label>
            <input className="rc-input" type="email" placeholder="you@example.com" />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--rc-muted)' }}>Phone</label>
            <input className="rc-input" type="tel" placeholder="(647) 555-0123" />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--rc-muted)' }}>Preferred Lease Term</label>
            <div className="flex gap-2">
              {terms.map((t) => (
                <button key={t} className={`flex-1 py-2.5 rounded-[var(--radius-md)] text-xs font-semibold transition-all duration-200 ${t === 12 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {t} months
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Employment */}
        <div className="rc-card-static p-6">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>Employment Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--rc-muted)' }}>Employer</label>
              <input className="rc-input" placeholder="Company name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--rc-muted)' }}>Job Title</label>
                <input className="rc-input" placeholder="Software Engineer" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--rc-muted)' }}>Annual Income</label>
                <input className="rc-input" type="number" placeholder="85,000" />
              </div>
            </div>
            <div className="p-3 rounded-[var(--radius-md)] bg-blue-50">
              <p className="text-xs" style={{ color: 'var(--rc-primary)' }}>💡 Income is shared only with the landlord. Aim for 3× monthly rent in annual income.</p>
            </div>
          </div>
        </div>

        {/* References */}
        <div className="rc-card-static p-6">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>References</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--rc-muted)' }}>Reference Name</label>
              <input className="rc-input" placeholder="Previous landlord or employer" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--rc-muted)' }}>Reference Phone</label>
              <input className="rc-input" type="tel" placeholder="(416) 555-0199" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--rc-muted)' }}>Message to Landlord (optional)</label>
              <textarea className="rc-input min-h-[80px] resize-none" placeholder="I'm excited about this property..." />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button className="w-full rc-btn-primary py-3.5 text-base">
          Submit Application
        </button>
        <p className="text-[11px] text-center mt-3" style={{ color: 'var(--rc-muted)' }}>
          By submitting you confirm all info is accurate and consent to a soft credit check.
        </p>
      </div>
    </div>
  );
}
