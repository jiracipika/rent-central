'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { PropertyType } from '@rent-central/core';

const STEPS = [
  { id: 0, label: 'Details', icon: '📝', description: 'Basic property information' },
  { id: 1, label: 'Photos', icon: '📸', description: 'Upload property photos' },
  { id: 2, label: 'Location', icon: '📍', description: 'Address and map' },
  { id: 3, label: 'Pricing', icon: '💰', description: 'Rent and lease terms' },
  { id: 4, label: 'Amenities', icon: '✨', description: 'Features and extras' },
];

const PROPERTY_TYPES: { value: PropertyType; label: string; icon: string }[] = [
  { value: 'apartment', label: 'Apartment', icon: '🏢' },
  { value: 'house', label: 'House', icon: '🏡' },
  { value: 'condo', label: 'Condo', icon: '🏙️' },
  { value: 'townhouse', label: 'Townhouse', icon: '🏘️' },
  { value: 'basement', label: 'Basement', icon: '🏗️' },
  { value: 'studio', label: 'Studio', icon: '🏠' },
];

const AMENITIES = [
  { key: 'gym', label: 'Gym', icon: '💪' },
  { key: 'pool', label: 'Pool', icon: '🏊' },
  { key: 'rooftop', label: 'Rooftop', icon: '🌆' },
  { key: 'concierge', label: 'Concierge', icon: '🛎️' },
  { key: 'laundry', label: 'Laundry', icon: '👔' },
  { key: 'storage', label: 'Storage', icon: '📦' },
  { key: 'bike', label: 'Bike Storage', icon: '🚲' },
  { key: 'ev', label: 'EV Charger', icon: '⚡' },
  { key: 'patio', label: 'Patio/Balcony', icon: '🌿' },
  { key: 'yard', label: 'Yard', icon: '🌳' },
  { key: 'garage', label: 'Garage', icon: '🚗' },
  { key: 'elevator', label: 'Elevator', icon: '🛗' },
];

const CANADIAN_PROVINCES = [
  'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT',
];

interface FormState {
  title: string; description: string; type: PropertyType;
  bedrooms: string; bathrooms: string; sqft: string;
  address: string; city: string; province: string; postalCode: string;
  price12: string; price6: string; price3: string; deposit: string;
  availableFrom: string; minTerm: '3' | '6' | '12';
  utilities: boolean; parking: boolean; petFriendly: boolean; furnished: boolean;
  amenities: Set<string>;
}

export default function CreateListingPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: '', description: '', type: 'apartment',
    bedrooms: '', bathrooms: '', sqft: '',
    address: '', city: '', province: 'ON', postalCode: '',
    price12: '', price6: '', price3: '', deposit: '',
    availableFrom: '', minTerm: '12',
    utilities: false, parking: false, petFriendly: false, furnished: false,
    amenities: new Set(),
  });

  const set = (key: keyof FormState, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleAmenity = (key: string) =>
    setForm((f) => {
      const next = new Set(f.amenities);
      if (next.has(key)) next.delete(key); else next.add(key);
      return { ...f, amenities: next };
    });

  const canContinue = () => {
    if (step === 0) return form.title.trim() && form.bedrooms && form.bathrooms;
    if (step === 2) return form.address.trim() && form.city.trim() && form.postalCode.trim();
    if (step === 3) return form.price12.trim() && form.deposit.trim() && form.availableFrom;
    return true;
  };

  if (submitted) {
    return (
      <div className="ios-page min-h-screen flex items-center justify-center px-4">
        <div className="text-center" style={{ maxWidth: 360 }}>
          <div
            style={{
              width: 72, height: 72, borderRadius: 20,
              background: 'rgba(52,199,89,0.10)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: 36,
            }}
          >
            ✅
          </div>
          <h1 className="ios-title1" style={{ fontSize: 26 }}>Listing Published!</h1>
          <p className="ios-subhead mt-2" style={{ color: 'var(--ios-label2)' }}>
            Your property is now live and visible to renters across Canada.
          </p>
          <div className="flex gap-3 justify-center mt-8">
            <Link
              href="/landlord/listings"
              style={{
                height: 46, borderRadius: 13, padding: '0 28px',
                background: 'linear-gradient(135deg, #007AFF 0%, #0055D4 100%)',
                color: '#fff', fontSize: 15, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,122,255,0.35)',
              }}
            >
              View My Listings
            </Link>
            <Link
              href="/landlord"
              style={{
                height: 46, borderRadius: 13, padding: '0 28px',
                background: 'var(--ios-fill3)', color: 'var(--ios-blue)',
                fontSize: 15, fontWeight: 600, border: 'none',
                display: 'inline-flex', alignItems: 'center', textDecoration: 'none',
              }}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ios-page" style={{ paddingBottom: 100 }}>
      <div style={{ paddingTop: 60 }}>
        {/* Back nav */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          <Link href="/landlord" className="ios-btn-text flex items-center gap-1" style={{ minHeight: 44 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="px-4 pb-4">
          <h1 className="ios-large-title" style={{ fontSize: 28 }}>Post a Listing</h1>
          <p className="ios-subhead mt-1" style={{ color: 'var(--ios-label2)' }}>
            {STEPS[step].description}
          </p>
        </div>

        {/* Step progress */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <button
                  onClick={() => i < step && setStep(i)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1,
                    cursor: i < step ? 'pointer' : 'default', background: 'none', border: 'none',
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                    background: i === step ? 'var(--ios-blue)' : i < step ? 'var(--ios-green)' : 'var(--ios-fill3)',
                    color: i === step || i < step ? '#fff' : 'var(--ios-label3)',
                    boxShadow: i === step ? '0 4px 12px rgba(0,122,255,0.3)' : 'none',
                    transition: 'all 0.3s ease',
                  }}>
                    {i < step ? '✓' : s.icon}
                  </div>
                  <span
                    style={{
                      fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em',
                      color: i === step ? 'var(--ios-blue)' : i < step ? 'var(--ios-green)' : 'var(--ios-label3)',
                    }}
                  >
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div style={{
                    height: 2, flex: 1, margin: '0 4px', borderRadius: 1,
                    background: i < step ? 'var(--ios-green)' : 'var(--ios-fill3)',
                    transition: 'background 0.3s ease', marginBottom: 18,
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content card */}
        <div
          className="mx-4 mb-6"
          style={{
            background: 'var(--ios-grouped-bg2)',
            borderRadius: 16,
            border: '0.5px solid var(--ios-sep)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: 20 }}>
            <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: '0.5px solid var(--ios-sep)' }}>
              <span style={{ fontSize: 24 }}>{STEPS[step].icon}</span>
              <div>
                <h2 className="ios-title3" style={{ fontSize: 18 }}>{STEPS[step].label}</h2>
                <p className="ios-caption1" style={{ color: 'var(--ios-label2)' }}>{STEPS[step].description}</p>
              </div>
            </div>

            {/* Step 0: Details */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Title *</label>
                  <input className="ios-input" placeholder="e.g. Bright 2BR Downtown Toronto — Modern Finishes" value={form.title} onChange={(e) => set('title', e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Description</label>
                  <textarea className="ios-input" style={{ minHeight: 100, resize: 'none', lineHeight: 1.5 }} placeholder="Describe your property, neighbourhood highlights, nearby transit..." value={form.description} onChange={(e) => set('description', e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 8, display: 'block' }}>Property Type *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {PROPERTY_TYPES.map((t) => (
                      <button key={t.value} type="button" onClick={() => set('type', t.value)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px',
                          borderRadius: 12, fontSize: 13, fontWeight: form.type === t.value ? 600 : 500,
                          background: form.type === t.value ? 'rgba(0,122,255,0.10)' : 'var(--ios-fill3)',
                          color: form.type === t.value ? 'var(--ios-blue)' : 'var(--ios-label2)',
                          border: form.type === t.value ? '1px solid rgba(0,122,255,0.25)' : '1px solid transparent',
                          transition: 'all 0.2s ease', cursor: 'pointer',
                        }}
                      >
                        <span>{t.icon}</span> {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Bedrooms *</label>
                    <select className="ios-input" value={form.bedrooms} onChange={(e) => set('bedrooms', e.target.value)}>
                      <option value="">Select</option>
                      {['0 (Studio)', '1', '2', '3', '4', '5+'].map((b, i) => <option key={b} value={String(i)}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Bathrooms *</label>
                    <select className="ios-input" value={form.bathrooms} onChange={(e) => set('bathrooms', e.target.value)}>
                      <option value="">Select</option>
                      {['1', '1.5', '2', '2.5', '3', '3+'].map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Sq Ft</label>
                    <input className="ios-input" type="number" placeholder="850" value={form.sqft} onChange={(e) => set('sqft', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Photos */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div
                  style={{
                    border: '2px dashed var(--ios-sep)', borderRadius: 16,
                    padding: '40px 20px', textAlign: 'center', cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: 36, display: 'block', marginBottom: 8 }}>📸</span>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ios-label)' }}>Drop photos here, or click to browse</p>
                  <p style={{ fontSize: 13, color: 'var(--ios-label3)', marginTop: 4 }}>Up to 20 photos · JPG, PNG · Max 10MB each</p>
                </div>
                <p style={{ fontSize: 13, color: 'var(--ios-label3)', textAlign: 'center' }}>
                  💡 Listings with 6+ photos get 3× more enquiries.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {['Living Room', 'Kitchen', 'Bedroom', 'Bathroom'].map((room) => (
                    <div key={room}
                      style={{
                        aspectRatio: '1', borderRadius: 12, background: 'var(--ios-fill3)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                        color: 'var(--ios-label3)',
                      }}
                    >
                      <span style={{ fontSize: 20 }}>+</span>
                      <span style={{ fontSize: 9, fontWeight: 500 }}>{room}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Street Address *</label>
                  <input className="ios-input" placeholder="123 Main St" value={form.address} onChange={(e) => set('address', e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>City *</label>
                    <input className="ios-input" placeholder="Toronto" value={form.city} onChange={(e) => set('city', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Province</label>
                    <select className="ios-input" value={form.province} onChange={(e) => set('province', e.target.value)}>
                      {CANADIAN_PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Postal Code *</label>
                  <input className="ios-input" style={{ maxWidth: 160 }} placeholder="M5V 2T6" value={form.postalCode} onChange={(e) => set('postalCode', e.target.value.toUpperCase())} maxLength={7} />
                </div>
                <div style={{ height: 160, borderRadius: 16, background: 'var(--ios-fill3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 28, opacity: 0.4 }}>🗺️</span>
                </div>
              </div>
            )}

            {/* Step 3: Pricing */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ padding: '12px 16px', borderRadius: 14, background: 'rgba(0,122,255,0.06)', border: '0.5px solid rgba(0,122,255,0.15)', fontSize: 14, color: 'var(--ios-blue)' }}>
                  💡 Offering multiple lease terms attracts more applicants. Shorter terms typically command a 5–15% premium.
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Monthly Rent — 12-Month Lease *</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--ios-label3)' }}>$</span>
                    <input className="ios-input" style={{ paddingLeft: 28 }} type="number" placeholder="2,200" value={form.price12} onChange={(e) => set('price12', e.target.value)} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>6-Mo Rent (optional)</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--ios-label3)' }}>$</span>
                      <input className="ios-input" style={{ paddingLeft: 28 }} type="number" placeholder={form.price12 ? String(Math.round(Number(form.price12) * 1.05)) : ''} value={form.price6} onChange={(e) => set('price6', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>3-Mo Rent (optional)</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--ios-label3)' }}>$</span>
                      <input className="ios-input" style={{ paddingLeft: 28 }} type="number" placeholder={form.price12 ? String(Math.round(Number(form.price12) * 1.15)) : ''} value={form.price3} onChange={(e) => set('price3', e.target.value)} />
                    </div>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Security Deposit *</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--ios-label3)' }}>$</span>
                    <input className="ios-input" style={{ paddingLeft: 28 }} type="number" placeholder={form.price12 || '2,200'} value={form.deposit} onChange={(e) => set('deposit', e.target.value)} />
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--ios-label3)', marginTop: 4 }}>Most provinces cap at one month's rent</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Available From *</label>
                    <input className="ios-input" type="date" value={form.availableFrom} onChange={(e) => set('availableFrom', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 6, display: 'block' }}>Minimum Lease</label>
                    <select className="ios-input" value={form.minTerm} onChange={(e) => set('minTerm', e.target.value as '3' | '6' | '12')}>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="12">12 Months</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Amenities */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Included in Rent</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {([
                      { key: 'utilities' as const, label: 'Utilities Included', icon: '💡', desc: 'Heat, water, electricity' },
                      { key: 'parking' as const, label: 'Parking Included', icon: '🅿️', desc: 'Dedicated spot or garage' },
                      { key: 'petFriendly' as const, label: 'Pet Friendly', icon: '🐾', desc: 'Cats or dogs welcome' },
                      { key: 'furnished' as const, label: 'Furnished', icon: '🛋️', desc: 'Move-in ready with furniture' },
                    ]).map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => set(f.key, !form[f.key])}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '12px 14px', borderRadius: 14, width: '100%', textAlign: 'left',
                          background: form[f.key] ? 'rgba(0,122,255,0.06)' : 'var(--ios-fill3)',
                          border: form[f.key] ? '1px solid rgba(0,122,255,0.20)' : '1px solid transparent',
                          transition: 'all 0.2s ease', cursor: 'pointer',
                        }}
                      >
                        <span style={{ fontSize: 20 }}>{f.icon}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 15, fontWeight: 500, color: form[f.key] ? 'var(--ios-blue)' : 'var(--ios-label)' }}>{f.label}</p>
                          <p style={{ fontSize: 12, color: 'var(--ios-label3)', marginTop: 1 }}>{f.desc}</p>
                        </div>
                        {/* iOS toggle */}
                        <div style={{
                          width: 51, height: 31, borderRadius: 16,
                          background: form[f.key] ? 'var(--ios-green)' : 'rgba(120,120,128,0.32)',
                          position: 'relative', transition: 'background 0.2s ease', flexShrink: 0,
                        }}>
                          <div style={{
                            width: 27, height: 27, borderRadius: 14, background: '#fff',
                            boxShadow: '0 3px 8px rgba(0,0,0,0.3)', position: 'absolute', top: 2,
                            left: form[f.key] ? 22 : 2,
                            transition: 'left 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Building Amenities</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {AMENITIES.map((a) => (
                      <button
                        key={a.key}
                        type="button"
                        onClick={() => toggleAmenity(a.key)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px',
                          borderRadius: 12, fontSize: 13, fontWeight: 500,
                          background: form.amenities.has(a.key) ? 'rgba(0,122,255,0.10)' : 'var(--ios-fill3)',
                          color: form.amenities.has(a.key) ? 'var(--ios-blue)' : 'var(--ios-label2)',
                          border: form.amenities.has(a.key) ? '1px solid rgba(0,122,255,0.25)' : '1px solid transparent',
                          transition: 'all 0.2s ease', cursor: 'pointer',
                        }}
                      >
                        <span>{a.icon}</span> {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => step > 0 && setStep(step - 1)}
            disabled={step === 0}
            style={{
              height: 44, borderRadius: 13, padding: '0 20px',
              background: 'var(--ios-fill3)', color: 'var(--ios-blue)',
              fontSize: 15, fontWeight: 600, border: 'none', cursor: step === 0 ? 'not-allowed' : 'pointer',
              opacity: step === 0 ? 0.3 : 1,
            }}
          >
            ← Back
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 16 : 6, height: 6, borderRadius: 3,
                background: i === step ? 'var(--ios-blue)' : i < step ? 'var(--ios-green)' : 'var(--ios-fill3)',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canContinue()}
              style={{
                height: 44, borderRadius: 13, padding: '0 24px',
                background: 'linear-gradient(135deg, #007AFF 0%, #0055D4 100%)',
                color: '#fff', fontSize: 15, fontWeight: 600,
                border: 'none', cursor: canContinue() ? 'pointer' : 'not-allowed',
                opacity: canContinue() ? 1 : 0.4,
                boxShadow: '0 4px 14px rgba(0,122,255,0.35)',
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              style={{
                height: 44, borderRadius: 13, padding: '0 24px',
                background: 'linear-gradient(135deg, #34C759 0%, #248A3D 100%)',
                color: '#fff', fontSize: 15, fontWeight: 600,
                border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(52,199,89,0.35)',
              }}
            >
              Publish 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
