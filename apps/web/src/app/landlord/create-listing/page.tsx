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
  // Details
  title: string;
  description: string;
  type: PropertyType;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  // Location
  address: string;
  city: string;
  province: string;
  postalCode: string;
  // Pricing
  price12: string;
  price6: string;
  price3: string;
  deposit: string;
  availableFrom: string;
  minTerm: '3' | '6' | '12';
  // Features
  utilities: boolean;
  parking: boolean;
  petFriendly: boolean;
  furnished: boolean;
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
      <div className="max-w-xl mx-auto px-6 py-20 pt-28 text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Listing Published!</h1>
        <p className="mt-3 text-gray-500">Your property is now live and visible to renters across Canada.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/landlord/listings" className="rc-btn-primary">View My Listings</Link>
          <Link href="/landlord" className="rc-btn-ghost border border-gray-200">Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 pt-28">
      {/* Header */}
      <div className="mb-8">
        <Link href="/landlord" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
          ← Back to Dashboard
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 tracking-tight">Post a Listing</h1>
        <p className="mt-1 text-sm text-gray-400">Fill in the details to list your property on Rent Central</p>
      </div>

      {/* Step progress */}
      <div className="rc-card-static p-4 mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex flex-col items-center gap-1.5 flex-1 transition-all ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base transition-all ${
                  i === step ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : i < step ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-400'
                }`}>
                  {i < step ? '✓' : s.icon}
                </div>
                <span className={`text-[11px] font-medium hidden sm:block ${
                  i === step ? 'text-blue-600' : i < step ? 'text-emerald-600' : 'text-gray-400'
                }`}>{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 transition-all ${i < step ? 'bg-emerald-400' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="rc-card-static p-6 mb-6">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b" style={{ borderColor: 'var(--rc-border)' }}>
          <span className="text-2xl">{STEPS[step].icon}</span>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{STEPS[step].label}</h2>
            <p className="text-sm text-gray-400">{STEPS[step].description}</p>
          </div>
        </div>

        {/* Step 0: Details */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
              <input
                className="rc-input"
                placeholder="e.g. Bright 2BR Downtown Toronto — Modern Finishes"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                className="rc-input min-h-[120px] resize-none"
                placeholder="Describe your property, neighbourhood highlights, nearby transit, etc."
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
              <div className="grid grid-cols-3 gap-2">
                {PROPERTY_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => set('type', t.value)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] border text-sm font-medium transition-all ${
                      form.type === t.value
                        ? 'bg-blue-50 border-blue-400 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span>{t.icon}</span> {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bedrooms *</label>
                <select
                  className="rc-input"
                  value={form.bedrooms}
                  onChange={(e) => set('bedrooms', e.target.value)}
                >
                  <option value="">Select</option>
                  {['0 (Studio)', '1', '2', '3', '4', '5+'].map((b, i) => (
                    <option key={b} value={String(i)}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bathrooms *</label>
                <select
                  className="rc-input"
                  value={form.bathrooms}
                  onChange={(e) => set('bathrooms', e.target.value)}
                >
                  <option value="">Select</option>
                  {['1', '1.5', '2', '2.5', '3', '3+'].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Square Feet</label>
                <input
                  className="rc-input"
                  type="number"
                  placeholder="e.g. 850"
                  value={form.sqft}
                  onChange={(e) => set('sqft', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Photos */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="border-2 border-dashed border-gray-200 rounded-[var(--radius-lg)] p-12 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer">
              <span className="text-4xl block mb-3">📸</span>
              <p className="text-sm font-medium text-gray-700">Drop photos here, or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">Up to 20 photos · JPG, PNG · Max 10MB each</p>
              <button className="mt-4 rc-btn-secondary text-xs px-4 py-2">Choose Photos</button>
            </div>
            <p className="text-xs text-gray-400 text-center">
              💡 Listings with 6+ photos get 3× more enquiries. Include the living room, kitchen, bedrooms, bathroom, and exterior.
            </p>
            <div className="grid grid-cols-4 gap-3">
              {['Living Room', 'Kitchen', 'Bedroom', 'Bathroom'].map((room) => (
                <div key={room} className="aspect-square bg-gray-100 rounded-[var(--radius-md)] flex flex-col items-center justify-center gap-1 text-gray-400">
                  <span className="text-xl">+</span>
                  <span className="text-[10px]">{room}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address *</label>
              <input
                className="rc-input"
                placeholder="123 Main St"
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                <input
                  className="rc-input"
                  placeholder="Toronto"
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Province *</label>
                <select
                  className="rc-input"
                  value={form.province}
                  onChange={(e) => set('province', e.target.value)}
                >
                  {CANADIAN_PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Postal Code *</label>
              <input
                className="rc-input max-w-[160px]"
                placeholder="M5V 2T6"
                value={form.postalCode}
                onChange={(e) => set('postalCode', e.target.value.toUpperCase())}
                maxLength={7}
              />
            </div>
            <div className="h-48 bg-gray-100 rounded-[var(--radius-lg)] flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl block mb-2">🗺️</span>
                <p className="text-sm text-gray-400">Map preview after address entry</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="bg-blue-50 rounded-[var(--radius-md)] p-4 text-sm text-blue-700">
              💡 Offering multiple lease terms attracts more applicants. Shorter terms typically command a 5–15% premium.
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly Rent — 12-Month Lease *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  className="rc-input pl-7"
                  type="number"
                  placeholder="2,200"
                  value={form.price12}
                  onChange={(e) => set('price12', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">6-Month Rent <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    className="rc-input pl-7"
                    type="number"
                    placeholder={form.price12 ? String(Math.round(Number(form.price12) * 1.05)) : ''}
                    value={form.price6}
                    onChange={(e) => set('price6', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">3-Month Rent <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    className="rc-input pl-7"
                    type="number"
                    placeholder={form.price12 ? String(Math.round(Number(form.price12) * 1.15)) : ''}
                    value={form.price3}
                    onChange={(e) => set('price3', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Security Deposit *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  className="rc-input pl-7"
                  type="number"
                  placeholder={form.price12 || '2,200'}
                  value={form.deposit}
                  onChange={(e) => set('deposit', e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Most provinces cap deposit at one month's rent</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Available From *</label>
                <input
                  className="rc-input"
                  type="date"
                  value={form.availableFrom}
                  onChange={(e) => set('availableFrom', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Minimum Lease</label>
                <select
                  className="rc-input"
                  value={form.minTerm}
                  onChange={(e) => set('minTerm', e.target.value as '3' | '6' | '12')}
                >
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
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Included in Rent</h3>
              <div className="space-y-2">
                {[
                  { key: 'utilities', label: 'Utilities Included', icon: '💡', desc: 'Heat, water, electricity' },
                  { key: 'parking', label: 'Parking Included', icon: '🅿️', desc: 'Dedicated spot or garage' },
                  { key: 'petFriendly', label: 'Pet Friendly', icon: '🐾', desc: 'Cats or dogs welcome' },
                  { key: 'furnished', label: 'Furnished', icon: '🛋️', desc: 'Move-in ready with furniture' },
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => set(f.key as keyof FormState, !form[f.key as keyof FormState])}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border text-left transition-all ${
                      form[f.key as keyof FormState]
                        ? 'bg-blue-50 border-blue-300'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{f.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${form[f.key as keyof FormState] ? 'text-blue-700' : 'text-gray-700'}`}>{f.label}</p>
                      <p className="text-xs text-gray-400">{f.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      form[f.key as keyof FormState] ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                    }`}>
                      {form[f.key as keyof FormState] && <span className="text-white text-[10px]">✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Building Amenities</h3>
              <div className="grid grid-cols-3 gap-2">
                {AMENITIES.map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => toggleAmenity(a.key)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] border text-sm transition-all ${
                      form.amenities.has(a.key)
                        ? 'bg-blue-50 border-blue-400 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span>{a.icon}</span> {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => step > 0 && setStep(step - 1)}
          disabled={step === 0}
          className="rc-btn-ghost border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Back
        </button>

        <div className="flex items-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === step ? 'bg-blue-600 w-4' : i < step ? 'bg-emerald-400' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!canContinue()}
            className="rc-btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="rc-btn-primary"
          >
            Publish Listing 🚀
          </button>
        )}
      </div>
    </div>
  );
}
