'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@rent-central/core';
import type { PropertyType } from '@rent-central/core';

const PROPERTY_TYPES: PropertyType[] = ['apartment', 'house', 'condo', 'basement', 'townhouse', 'studio'];
const STEPS = ['Details', 'Location', 'Pricing', 'Features'];

export default function NewListingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '', description: '', type: 'apartment' as PropertyType,
    address: '', city: '', postalCode: '',
    price12: '', deposit: '', bedrooms: '', bathrooms: '',
    utilities: false, parking: false, pets: false, furnished: false,
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const toggle = (key: 'utilities' | 'parking' | 'pets' | 'furnished') =>
    setForm((f) => ({ ...f, [key]: !f[key] }));

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 pt-28">
      <h1 className="rc-section-title">Create Listing</h1>

      {/* Step indicator */}
      <div className="flex gap-2 mt-6 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col items-center gap-1.5">
            <div className={`w-full h-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <span className={`text-[10px] font-medium ${i === step ? 'text-blue-600' : 'text-gray-400'}`}>{s}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 0 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Title</label>
            <input className="rc-input" placeholder="e.g. Bright 2BR Downtown" value={form.title} onChange={(e) => update('title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Description</label>
            <textarea className="rc-input min-h-[120px] resize-none" placeholder="Describe your property..." value={form.description} onChange={(e) => update('description', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--rc-text2)' }}>Property Type</label>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => update('type', t)}
                  className={`rc-badge px-3.5 py-1.5 text-xs capitalize transition-all duration-200 ${form.type === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Address</label>
            <input className="rc-input" placeholder="123 Main St" value={form.address} onChange={(e) => update('address', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>City</label>
              <input className="rc-input" placeholder="Toronto" value={form.city} onChange={(e) => update('city', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Postal Code</label>
              <input className="rc-input" placeholder="M5V 1A1" value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} />
            </div>
          </div>
          {/* Map placeholder */}
          <div className="rounded-[var(--radius-lg)] bg-blue-50 h-48 flex items-center justify-center">
            <span className="text-sm" style={{ color: 'var(--rc-muted)' }}>🗺️ Map preview</span>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Monthly Rent (12-month lease)</label>
            <input className="rc-input" type="number" placeholder="2,200" value={form.price12} onChange={(e) => update('price12', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Security Deposit</label>
            <input className="rc-input" type="number" placeholder="2,200" value={form.deposit} onChange={(e) => update('deposit', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Bedrooms</label>
              <input className="rc-input" type="number" placeholder="2" value={form.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Bathrooms</label>
              <input className="rc-input" type="number" placeholder="1" value={form.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          {([
            { key: 'utilities' as const, label: 'Utilities Included', icon: '💡' },
            { key: 'parking' as const, label: 'Parking Included', icon: '🅿️' },
            { key: 'pets' as const, label: 'Pet Friendly', icon: '🐾' },
            { key: 'furnished' as const, label: 'Furnished', icon: '🛋️' },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => toggle(f.key)}
              className="w-full flex items-center justify-between p-4 rc-card-static transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{f.icon}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>{f.label}</span>
              </div>
              <div className={`w-11 h-6 rounded-full transition-all duration-200 relative ${form[f.key] ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${form[f.key] ? 'left-[22px]' : 'left-0.5'}`} />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="rc-btn-ghost px-6 py-3 border border-gray-200 rounded-full">Back</button>
        )}
        <div className="flex-1" />
        {step < STEPS.length - 1 ? (
          <button onClick={() => setStep(step + 1)} className="rc-btn-primary px-8 py-3">Continue</button>
        ) : (
          <Link href="/landlord/listings" className="rc-btn-primary px-8 py-3">Publish Listing</Link>
        )}
      </div>
    </div>
  );
}
