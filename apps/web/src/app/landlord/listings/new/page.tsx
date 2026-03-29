'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { PropertyType } from '@rent-central/core';

const PROPERTY_TYPES: PropertyType[] = ['apartment', 'house', 'condo', 'basement', 'townhouse', 'studio'];
const STEPS = ['Details', 'Location', 'Pricing', 'Features'];
const TYPE_ICONS: Record<string, string> = {
  apartment: '🏢', house: '🏡', condo: '🏙️', basement: '🏗️', townhouse: '🏘️', studio: '🏠',
};

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
    <div className="ios-page" style={{ paddingBottom: 100 }}>
      <div style={{ paddingTop: 60 }}>
        {/* Back nav */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          <Link href="/landlord/listings" className="ios-btn-text flex items-center gap-1" style={{ minHeight: 44 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            My Listings
          </Link>
        </div>

        {/* Header */}
        <div className="px-4 pb-4">
          <h1 className="ios-large-title" style={{ fontSize: 28 }}>Create Listing</h1>
          <p className="ios-subhead mt-1" style={{ color: 'var(--ios-label2)' }}>
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </p>
        </div>

        {/* Step indicator */}
        <div className="px-4 mb-6">
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full h-1 rounded-full transition-all duration-300"
                  style={{
                    background: i < step ? 'var(--ios-green)' : i === step ? 'var(--ios-blue)' : 'var(--ios-fill3)',
                  }}
                />
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: i === step ? 'var(--ios-blue)' : i < step ? 'var(--ios-green)' : 'var(--ios-label3)' }}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 0: Details */}
        {step === 0 && (
          <>
            <div className="px-4 space-y-4">
              <div>
                <label className="ios-section-header" style={{ marginTop: 0, paddingLeft: 0 }}>Title</label>
                <input
                  className="ios-input"
                  placeholder="e.g. Bright 2BR Downtown"
                  value={form.title}
                  onChange={(e) => update('title', e.target.value)}
                />
              </div>
              <div>
                <label className="ios-section-header" style={{ marginTop: 0, paddingLeft: 0 }}>Description</label>
                <textarea
                  className="ios-input"
                  style={{ minHeight: 100, resize: 'none', lineHeight: 1.5 }}
                  placeholder="Describe your property..."
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                />
              </div>
            </div>
            <p className="ios-section-header">Property Type</p>
            <div className="px-4 grid grid-cols-3 gap-2">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => update('type', t)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 12px',
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: form.type === t ? 600 : 500,
                    background: form.type === t ? 'rgba(0,122,255,0.10)' : 'var(--ios-grouped-bg2)',
                    color: form.type === t ? 'var(--ios-blue)' : 'var(--ios-label2)',
                    border: form.type === t ? '1px solid rgba(0,122,255,0.25)' : '0.5px solid var(--ios-sep)',
                    transition: 'all 0.2s ease',
                    textTransform: 'capitalize',
                  }}
                >
                  <span>{TYPE_ICONS[t]}</span> {t}
                </button>
              ))}
            </div>
            <div className="px-4 grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="ios-section-header" style={{ marginTop: 0, paddingLeft: 0 }}>Bedrooms</label>
                <input className="ios-input" type="number" placeholder="2" value={form.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} />
              </div>
              <div>
                <label className="ios-section-header" style={{ marginTop: 0, paddingLeft: 0 }}>Bathrooms</label>
                <input className="ios-input" type="number" placeholder="1" value={form.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} />
              </div>
            </div>
          </>
        )}

        {/* Step 1: Location */}
        {step === 1 && (
          <div className="px-4 space-y-4">
            <div>
              <label className="ios-section-header" style={{ marginTop: 0, paddingLeft: 0 }}>Address</label>
              <input className="ios-input" placeholder="123 Main St" value={form.address} onChange={(e) => update('address', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="ios-section-header" style={{ marginTop: 0, paddingLeft: 0 }}>City</label>
                <input className="ios-input" placeholder="Toronto" value={form.city} onChange={(e) => update('city', e.target.value)} />
              </div>
              <div>
                <label className="ios-section-header" style={{ marginTop: 0, paddingLeft: 0 }}>Postal Code</label>
                <input className="ios-input" placeholder="M5V 1A1" value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} />
              </div>
            </div>
            <div
              style={{
                height: 160,
                borderRadius: 16,
                background: 'var(--ios-fill3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 28, opacity: 0.4 }}>🗺️</span>
            </div>
          </div>
        )}

        {/* Step 2: Pricing */}
        {step === 2 && (
          <div className="px-4 space-y-4">
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 14,
                background: 'rgba(0,122,255,0.06)',
                border: '0.5px solid rgba(0,122,255,0.15)',
                fontSize: 14,
                color: 'var(--ios-blue)',
                letterSpacing: '-0.2px',
              }}
            >
              💡 Shorter lease terms typically command a 5–15% premium.
            </div>
            <div>
              <label className="ios-section-header" style={{ marginTop: 0, paddingLeft: 0 }}>Monthly Rent (12-mo lease)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--ios-label3)' }}>$</span>
                <input className="ios-input" style={{ paddingLeft: 28 }} type="number" placeholder="2,200" value={form.price12} onChange={(e) => update('price12', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="ios-section-header" style={{ marginTop: 0, paddingLeft: 0 }}>Security Deposit</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--ios-label3)' }}>$</span>
                <input className="ios-input" style={{ paddingLeft: 28 }} type="number" placeholder="2,200" value={form.deposit} onChange={(e) => update('deposit', e.target.value)} />
              </div>
              <p className="ios-caption2 mt-1" style={{ color: 'var(--ios-label3)', paddingLeft: 4 }}>Most provinces cap at one month's rent</p>
            </div>
          </div>
        )}

        {/* Step 3: Features */}
        {step === 3 && (
          <div className="px-4 space-y-2">
            {([
              { key: 'utilities' as const, label: 'Utilities Included', icon: '💡' },
              { key: 'parking' as const, label: 'Parking Included', icon: '🅿️' },
              { key: 'pets' as const, label: 'Pet Friendly', icon: '🐾' },
              { key: 'furnished' as const, label: 'Furnished', icon: '🛋️' },
            ]).map((f) => (
              <button
                key={f.key}
                onClick={() => toggle(f.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  borderRadius: 14,
                  background: form[f.key] ? 'rgba(0,122,255,0.06)' : 'var(--ios-grouped-bg2)',
                  border: form[f.key] ? '1px solid rgba(0,122,255,0.20)' : '0.5px solid var(--ios-sep)',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 20 }}>{f.icon}</span>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: form[f.key] ? 'var(--ios-blue)' : 'var(--ios-label)' }}>
                  {f.label}
                </span>
                {/* iOS toggle */}
                <div style={{
                  width: 51, height: 31, borderRadius: 16,
                  background: form[f.key] ? 'var(--ios-green)' : 'rgba(120,120,128,0.32)',
                  position: 'relative', transition: 'background 0.2s ease', flexShrink: 0,
                }}>
                  <div style={{
                    width: 27, height: 27, borderRadius: 14,
                    background: '#fff',
                    boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                    position: 'absolute', top: 2,
                    left: form[f.key] ? 22 : 2,
                    transition: 'left 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="px-4 mt-8 flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                height: 50, borderRadius: 14,
                background: 'var(--ios-fill3)', color: 'var(--ios-blue)',
                fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer',
                padding: '0 24px',
              }}
            >
              Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              style={{
                height: 50, borderRadius: 14,
                background: 'linear-gradient(135deg, #007AFF 0%, #0055D4 100%)',
                color: '#fff', fontSize: 15, fontWeight: 600,
                border: 'none', cursor: 'pointer', padding: '0 28px',
                boxShadow: '0 4px 14px rgba(0,122,255,0.35)',
              }}
            >
              Continue
            </button>
          ) : (
            <Link
              href="/landlord/listings"
              style={{
                height: 50, borderRadius: 14, display: 'inline-flex', alignItems: 'center',
                background: 'linear-gradient(135deg, #34C759 0%, #248A3D 100%)',
                color: '#fff', fontSize: 15, fontWeight: 600,
                border: 'none', cursor: 'pointer', padding: '0 28px', textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(52,199,89,0.35)',
              }}
            >
              Publish Listing
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
