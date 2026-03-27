'use client';

import { useState } from 'react';
import Link from 'next/link';

const application = {
  id: '1',
  status: 'under_review' as const,
  property: { title: 'Modern Downtown Loft', address: '123 King St W, Toronto, ON', price: 2400, type: 'Condo' },
  applicant: { name: 'Alex Rivera', email: 'alex@email.com', phone: '(416) 555-0142' },
  term: 12,
  moveIn: '2026-04-15',
  submitted: '2026-03-25',
  employment: { employer: 'Shopify', position: 'Software Developer', income: '$95,000/yr' },
  references: [
    { name: 'Sarah Chen', phone: '(416) 555-0198', relation: 'Previous Landlord' },
    { name: 'Marcus Lee', phone: '(416) 555-0234', relation: 'Personal' },
  ],
  message: "Hi! I'm really interested in this unit. I've been looking for a place in King West for a few months and this checks all my boxes. I have stable employment and excellent references. I'd love to schedule a viewing!",
};

const statusConfig = {
  pending: { label: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
  under_review: { label: 'Under Review', bg: 'bg-blue-100', text: 'text-blue-800', icon: '🔍' },
  approved: { label: 'Approved', bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
  rejected: { label: 'Rejected', bg: 'bg-red-100', text: 'text-red-800', icon: '❌' },
  cancelled: { label: 'Cancelled', bg: 'bg-gray-100', text: 'text-gray-800', icon: '🚫' },
};

export default function ApplicationDetailPage() {
  const cfg = statusConfig[application.status];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 pt-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/applications" className="hover:text-blue-600 transition-colors">Applications</Link>
        <span>›</span>
        <span className="text-gray-700">{application.property.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Application Details</h1>
          <p className="mt-1 text-sm text-gray-400">Submitted {application.submitted}</p>
        </div>
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${cfg.bg} ${cfg.text}`}>
          <span>{cfg.icon}</span> {cfg.label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property */}
          <div className="rc-card-static p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Property</h2>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl opacity-40">🏠</span>
              </div>
              <div>
                <Link href="/listings/1" className="text-base font-semibold text-blue-600 hover:underline">{application.property.title}</Link>
                <p className="text-sm text-gray-400 mt-0.5">{application.property.address}</p>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  <span className="font-semibold text-blue-600">${application.property.price.toLocaleString()}/mo</span>
                  <span className="text-gray-200">·</span>
                  <span>{application.property.type}</span>
                  <span className="text-gray-200">·</span>
                  <span>{application.term}-month lease</span>
                </div>
              </div>
            </div>
          </div>

          {/* Applicant info */}
          <div className="rc-card-static p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Applicant Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Name', value: application.applicant.name },
                { label: 'Email', value: application.applicant.email },
                { label: 'Phone', value: application.applicant.phone },
                { label: 'Move-in Date', value: application.moveIn },
                { label: 'Employer', value: application.employment.employer },
                { label: 'Position', value: application.employment.position },
                { label: 'Annual Income', value: application.employment.income },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{item.label}</p>
                  <p className="text-sm text-gray-900 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          {application.message && (
            <div className="rc-card-static p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Message to Landlord</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{application.message}</p>
            </div>
          )}

          {/* References */}
          <div className="rc-card-static p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">References</h2>
            <div className="space-y-4">
              {application.references.map((ref, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-500">
                    {ref.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{ref.name}</p>
                    <p className="text-xs text-gray-400">{ref.relation} · {ref.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="rc-card-static p-6 space-y-3">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Actions</h2>
            {application.status === 'under_review' && (
              <>
                <button className="w-full rc-btn-primary py-3">Approve Application</button>
                <button className="w-full py-3 text-sm font-semibold text-red-600 rounded-full border border-red-200 hover:bg-red-50 transition-colors">Reject</button>
              </>
            )}
            {application.status === 'pending' && (
              <button className="w-full rc-btn-primary py-3">Start Review</button>
            )}
            <Link href="/messages/1" className="block w-full rc-btn-ghost border border-gray-200 py-3 text-center">Message Applicant</Link>
          </div>

          {/* Timeline */}
          <div className="rc-card-static p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              {[
                { text: 'Application submitted', time: application.submitted, active: true },
                { text: 'Under review by landlord', time: '2026-03-25', active: true },
                { text: 'Awaiting decision', time: '', active: false },
                { text: 'Lease signing', time: '', active: false },
              ].map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${event.active ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    {i < 3 && <div className={`w-0.5 h-8 ${event.active ? 'bg-blue-200' : 'bg-gray-100'}`} />}
                  </div>
                  <div>
                    <p className={`text-sm ${event.active ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{event.text}</p>
                    {event.time && <p className="text-xs text-gray-400 mt-0.5">{event.time}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
