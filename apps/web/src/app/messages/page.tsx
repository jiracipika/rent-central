'use client';

import Link from 'next/link';

const threads = [
  { id: '1', name: 'Sarah Chen', property: 'Modern Downtown Loft', lastMessage: 'Thanks for your application! I will review it shortly.', time: '2h ago', unread: true },
  { id: '2', name: 'Marc Tremblay', property: 'Cozy Plateau Apartment', lastMessage: 'Is the apartment still available?', time: '1d ago', unread: false },
  { id: '3', name: 'Emily Park', property: 'Luxury Yaletown Condo', lastMessage: 'When can I schedule a viewing?', time: '3d ago', unread: false },
];

export default function MessagesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-8">Messages</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
        {threads.map((t) => (
          <Link key={t.id} href={`/messages/${t.id}`} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg">👤</div>
              {t.unread && <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm ${t.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>{t.name}</p>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{t.time}</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{t.property}</p>
              <p className={`text-sm mt-1 truncate ${t.unread ? 'text-gray-700' : 'text-gray-400'}`}>{t.lastMessage}</p>
            </div>
          </Link>
        ))}
        {threads.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl">💬</span>
            <p className="mt-3 text-gray-500">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
