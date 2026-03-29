'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        {/* Header */}
        <div className="ios-large-title-area">
          <h1 className="ios-large-title">Settings</h1>
          <p className="ios-subhead mt-1">Manage your preferences</p>
        </div>

        {/* Notifications section */}
        <p className="ios-section-header">Notifications</p>
        <div className="ios-group">
          {[
            { key: 'email' as const, icon: '✉️', iconBg: '#007AFF', label: 'Email Notifications', desc: 'Receive updates via email' },
            { key: 'push' as const, icon: '🔔', iconBg: '#FF3B30', label: 'Push Notifications', desc: 'Browser & mobile push alerts' },
            { key: 'newListing' as const, icon: '🏠', iconBg: '#34C759', label: 'New Listing Alerts', desc: 'Get notified about new listings' },
            { key: 'applicationUpdates' as const, icon: '📋', iconBg: '#FF9500', label: 'Application Updates', desc: 'Status changes on your applications' },
            { key: 'messages' as const, icon: '💬', iconBg: '#34C759', label: 'Messages', desc: 'New messages from landlords' },
            { key: 'marketing' as const, icon: '📢', iconBg: '#8E8E93', label: 'Marketing Emails', desc: 'Tips and promotional content' },
          ].map((item) => (
            <div key={item.key} className="ios-row" style={{ minHeight: 52, cursor: 'default' }}>
              <div className="ios-row-icon" style={{ background: `${item.iconBg}18` }}>
                <span style={{ fontSize: 14 }}>{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="ios-row-label" style={{ fontSize: 15 }}>{item.label}</p>
                <p className="ios-caption1 mt-0.5" style={{ color: 'var(--ios-label2)' }}>{item.desc}</p>
              </div>
              <label className="ios-toggle flex-shrink-0">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => toggle(item.key)}
                />
                <div
                  className="ios-toggle-track"
                  style={{ background: notifications[item.key] ? 'var(--ios-green)' : 'var(--ios-fill2)' }}
                />
                <div
                  className="ios-toggle-thumb"
                  style={{ transform: notifications[item.key] ? 'translateX(20px)' : 'translateX(0)' }}
                />
              </label>
            </div>
          ))}
        </div>

        {/* Payment method */}
        <p className="ios-section-header mt-2">Payment Method</p>
        <div className="ios-group">
          <div className="ios-row" style={{ minHeight: 56, cursor: 'default' }}>
            <div
              className="flex-shrink-0 w-10 h-7 rounded-[6px] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #007AFF 0%, #0055D4 100%)' }}
            >
              <span style={{ fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>VISA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="ios-row-label" style={{ fontSize: 15 }}>•••• •••• •••• 4242</p>
              <p className="ios-caption1 mt-0.5" style={{ color: 'var(--ios-label2)' }}>Expires 12/28</p>
            </div>
            <button className="ios-btn-text" style={{ fontSize: 15, fontWeight: 500 }}>Update</button>
          </div>
          <Link href="#" className="ios-row" style={{ minHeight: 50 }}>
            <div className="ios-row-icon" style={{ background: 'rgba(0,122,255,0.10)' }}>
              <span style={{ fontSize: 14 }}>➕</span>
            </div>
            <span className="ios-row-label" style={{ fontSize: 15, color: 'var(--ios-blue)' }}>Add Payment Method</span>
            <span className="ios-chevron">›</span>
          </Link>
        </div>

        {/* Danger zone */}
        <p className="ios-section-header mt-2">Account</p>
        <div className="ios-group">
          <button
            className="ios-row w-full"
            style={{ minHeight: 50, cursor: 'pointer' }}
          >
            <div className="ios-row-icon" style={{ background: 'rgba(255,59,48,0.10)' }}>
              <span style={{ fontSize: 14 }}>🗑️</span>
            </div>
            <span className="ios-row-label" style={{ fontSize: 15, color: 'var(--ios-red)' }}>Delete Account</span>
            <span className="ios-chevron">›</span>
          </button>
          <button
            className="ios-row w-full"
            style={{ minHeight: 50, cursor: 'pointer' }}
          >
            <div className="ios-row-icon" style={{ background: 'var(--ios-fill3)' }}>
              <span style={{ fontSize: 14 }}>📤</span>
            </div>
            <span className="ios-row-label" style={{ fontSize: 15 }}>Export My Data</span>
            <span className="ios-chevron">›</span>
          </button>
        </div>

        <p className="ios-section-footer">
          Deleting your account is permanent and cannot be undone. Export your data first if needed.
        </p>

        <div className="h-6" />

      </div>
    </div>
  );
}
