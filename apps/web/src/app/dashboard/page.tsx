'use client';

import Link from 'next/link';

const stats = [
  { label: 'Applications', value: 3, icon: '📝', href: '/applications' },
  { label: 'Bookmarks', value: 2, icon: '♥', href: '/bookmarks' },
  { label: 'Messages', value: 1, icon: '💬', href: '/messages' },
];

const recentActivity = [
  { text: 'Application submitted for Modern Downtown Loft', time: '2 hours ago', icon: '📝' },
  { text: 'New message from Sarah Chen', time: '5 hours ago', icon: '💬' },
  { text: 'Application status changed to Under Review', time: '1 day ago', icon: '📋' },
  { text: 'Saved Liberty Village Studio to bookmarks', time: '2 days ago', icon: '♥' },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Welcome back, Alex 👋</h1>
        <p className="mt-1 text-sm text-gray-400">Here&apos;s what&apos;s happening with your rentals</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-3xl font-semibold text-gray-900">{s.value}</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-lg mt-0.5">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{a.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
