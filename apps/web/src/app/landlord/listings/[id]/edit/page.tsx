'use client';

import Link from 'next/link';

export default function EditListingPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 pt-28">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/landlord/listings" className="rc-btn-ghost px-3 py-1.5 text-sm">← Back</Link>
        <h1 className="rc-section-title">Edit Listing</h1>
      </div>

      <div className="rc-card-static p-6 mb-6" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)' }}>
        <p className="text-sm font-semibold" style={{ color: 'var(--rc-text)' }}>Modern Downtown Loft</p>
        <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>123 King St W, Toronto, ON · Active</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Title</label>
          <input className="rc-input" defaultValue="Modern Downtown Loft" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Description</label>
          <textarea className="rc-input min-h-[120px] resize-none" defaultValue="Stunning 2-bedroom apartment with floor-to-ceiling windows showcasing the Toronto skyline." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Monthly Rent</label>
            <input className="rc-input" type="number" defaultValue="2400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Deposit</label>
            <input className="rc-input" type="number" defaultValue="2400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--rc-text2)' }}>Status</label>
          <select className="rc-input">
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button className="rc-btn-ghost px-6 py-3 border border-gray-200 rounded-full">Cancel</button>
        <div className="flex-1" />
        <button className="rc-btn-primary px-8 py-3">Save Changes</button>
      </div>
    </div>
  );
}
