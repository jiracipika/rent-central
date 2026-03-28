'use client';

import Link from 'next/link';

const threads = [
  { id: '1', name: 'Sarah Chen', initials: 'SC', color: '#007AFF', property: 'Modern Downtown Loft', lastMessage: 'Thanks for your application! I will review it shortly.', time: '2h ago', unread: true, unreadCount: 2 },
  { id: '2', name: 'Marc Tremblay', initials: 'MT', color: '#34C759', property: 'Cozy Plateau Apartment', lastMessage: 'Is the apartment still available?', time: '1d ago', unread: false, unreadCount: 0 },
  { id: '3', name: 'Emily Park', initials: 'EP', color: '#FF9500', property: 'Luxury Yaletown Condo', lastMessage: 'When can I schedule a viewing?', time: '3d ago', unread: false, unreadCount: 0 },
];

export default function MessagesPage() {
  return (
    <div className="ios-page">
      <div style={{ paddingTop: 52 }}>

        <div className="ios-large-title-area">
          <h1 className="ios-large-title">Messages</h1>
        </div>

        {/* iOS search bar */}
        <div className="ios-search-bar">
          <div className="ios-search-field">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="ios-search-icon w-4 h-4">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search Messages" />
          </div>
        </div>

        {threads.length === 0 ? (
          <div className="text-center py-24 px-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--ios-fill3)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10" style={{ color: 'var(--ios-label3)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="ios-headline mb-1">No Messages</p>
            <p className="ios-subhead">Your conversations with landlords will appear here</p>
          </div>
        ) : (
          <div className="mt-2">
            {/* Section header */}
            <p className="ios-section-header">Recent</p>
            {/* Thread list */}
            <div
              style={{
                background: 'var(--ios-grouped-bg2)',
                borderRadius: 16,
                margin: '0 16px',
                overflow: 'hidden',
              }}
            >
              {threads.map((t, i) => (
                <Link
                  key={t.id}
                  href={`/messages/${t.id}`}
                  className="flex items-center gap-3 px-4 py-3 tap-scale"
                  style={{
                    borderTop: i > 0 ? '0.5px solid var(--ios-sep)' : 'none',
                    minHeight: 72,
                    background: 'var(--ios-grouped-bg2)',
                  }}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white text-lg"
                      style={{ background: t.color }}
                    >
                      {t.initials}
                    </div>
                    {t.unread && (
                      <span
                        className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                        style={{ background: 'var(--ios-blue)', fontSize: 10, fontWeight: 700 }}
                      >
                        {t.unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                      <p
                        className="ios-headline truncate"
                        style={{ fontSize: 16, fontWeight: t.unread ? 600 : 400 }}
                      >
                        {t.name}
                      </p>
                      <span className="ios-caption1 flex-shrink-0" style={{ color: t.unread ? 'var(--ios-label3)' : 'var(--ios-label3)' }}>
                        {t.time}
                      </span>
                    </div>
                    <p className="ios-footnote truncate" style={{ color: 'var(--ios-label2)', fontSize: 12 }}>
                      {t.property}
                    </p>
                    <p
                      className="ios-subhead truncate mt-0.5"
                      style={{
                        fontSize: 14,
                        color: t.unread ? 'var(--ios-label)' : 'var(--ios-label3)',
                        fontWeight: t.unread ? 500 : 400,
                      }}
                    >
                      {t.lastMessage}
                    </p>
                  </div>

                  <span className="ios-chevron flex-shrink-0">›</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
