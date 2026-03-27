'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newListing: true,
    applicationUpdates: true,
    messages: true,
    marketing: false,
  });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 pt-28">
      <h1 className="rc-section-title">Settings</h1>
      <p className="text-sm mt-1" style={{ color: 'var(--rc-muted)' }}>Manage your preferences</p>

      {/* Notifications */}
      <div className="rc-card-static p-6 mt-8">
        <h2 className="text-base font-semibold mb-5" style={{ color: 'var(--rc-text)' }}>🔔 Notifications</h2>
        <div className="space-y-4">
          {[
            { key: 'email' as const, label: 'Email notifications', desc: 'Receive updates via email' },
            { key: 'push' as const, label: 'Push notifications', desc: 'Browser & mobile push alerts' },
            { key: 'newListing' as const, label: 'New listing alerts', desc: 'Get notified about new listings' },
            { key: 'applicationUpdates' as const, label: 'Application updates', desc: 'Status changes on your applications' },
            { key: 'messages' as const, label: 'Message notifications', desc: 'New messages from landlords' },
            { key: 'marketing' as const, label: 'Marketing emails', desc: 'Tips and promotional content' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>{item.label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--rc-muted)' }}>{item.desc}</p>
              </div>
              <button
                onClick={() => toggle(item.key)}
                className={`w-11 h-6 rounded-full transition-all duration-200 relative ${notifications[item.key] ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${notifications[item.key] ? 'left-[22px]' : 'left-0.5'}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div className="rc-card-static p-6 mt-4">
        <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>💳 Payment Method</h2>
        <div className="flex items-center justify-between p-4 rounded-[var(--radius-md)] bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>•••• •••• •••• 4242</p>
              <p className="text-xs" style={{ color: 'var(--rc-muted)' }}>Expires 12/28</p>
            </div>
          </div>
          <button className="text-xs font-medium" style={{ color: 'var(--rc-primary)' }}>Update</button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rc-card-static p-6 mt-4">
        <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--rc-red)' }}>Danger Zone</h2>
        <p className="text-xs mb-4" style={{ color: 'var(--rc-muted)' }}>These actions are permanent and cannot be undone.</p>
        <div className="flex gap-3">
          <button className="rc-btn-ghost text-xs border border-gray-200 rounded-[var(--radius-md)]">Delete Account</button>
          <button className="rc-btn-ghost text-xs border border-gray-200 rounded-[var(--radius-md)]" style={{ color: 'var(--rc-red)' }}>Export Data</button>
        </div>
      </div>
    </div>
  );
}
