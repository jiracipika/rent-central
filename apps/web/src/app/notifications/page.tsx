'use client';

const notifGroups = [
  {
    header: 'New',
    items: [
      { id: '1', type: 'message', icon: '💬', iconBg: '#34C759', title: 'New Message', body: 'Sarah Chen sent you a message about Luxury Yaletown Condo.', time: '2h ago', unread: true },
      { id: '2', type: 'application', icon: '📝', iconBg: '#007AFF', title: 'New Application Received', body: 'Jordan Lee applied for your Modern Downtown Loft listing.', time: '5h ago', unread: true },
    ],
  },
  {
    header: 'Earlier',
    items: [
      { id: '3', type: 'status', icon: '📋', iconBg: '#FF9500', title: 'Application Updated', body: 'Your application for Cozy Plateau Apartment is now under review.', time: '1d ago', unread: false },
      { id: '4', type: 'payment', icon: '✅', iconBg: '#34C759', title: 'Payment Successful', body: 'Your deposit of $1,650 for Modern Downtown Loft has been processed.', time: '2d ago', unread: false },
      { id: '5', type: 'contract', icon: '📄', iconBg: '#5856D6', title: 'Contract Ready to Sign', body: 'Your lease agreement for Cozy Plateau Apartment is ready.', time: '3d ago', unread: false },
      { id: '6', type: 'payment', icon: '💳', iconBg: '#FF3B30', title: 'Payment Due Soon', body: 'Your rent of $1,650 is due in 3 days.', time: '4d ago', unread: false },
    ],
  },
];

export default function NotificationsPage() {
  const unreadCount = notifGroups.flatMap((g) => g.items).filter((n) => n.unread).length;

  return (
    <div className="ios-page">
      <div style={{ paddingTop: 60 }}>

        <div className="ios-large-title-area flex items-start justify-between pr-4">
          <div>
            <h1 className="ios-large-title">Notifications</h1>
            {unreadCount > 0 && (
              <p className="ios-subhead mt-0.5" style={{ color: 'var(--ios-label2)' }}>
                {unreadCount} unread
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <button className="ios-btn-text mt-2" style={{ fontSize: 15 }}>Mark All Read</button>
          )}
        </div>

        {notifGroups.map((group) => (
          <div key={group.header}>
            <p className="ios-section-header">{group.header}</p>
            <div className="ios-group">
              {group.items.map((n) => (
                <div
                  key={n.id}
                  className="ios-row tap-scale"
                  style={{
                    alignItems: 'flex-start',
                    paddingTop: 12,
                    paddingBottom: 12,
                    minHeight: 64,
                    background: n.unread
                      ? 'rgba(0,122,255,0.04)'
                      : 'var(--ios-grouped-bg2)',
                  }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg"
                      style={{ background: `${n.iconBg}18` }}
                    >
                      {n.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className="ios-headline"
                        style={{ fontSize: 15, fontWeight: n.unread ? 600 : 400 }}
                      >
                        {n.title}
                      </p>
                      <span className="ios-caption2 flex-shrink-0 mt-0.5" style={{ color: 'var(--ios-label3)' }}>
                        {n.time}
                      </span>
                    </div>
                    <p className="ios-subhead mt-0.5" style={{ fontSize: 14, color: 'var(--ios-label2)', lineHeight: 1.4 }}>
                      {n.body}
                    </p>
                  </div>
                  {n.unread && (
                    <div
                      className="ios-unread-dot flex-shrink-0 mt-1.5"
                      style={{ width: 8, height: 8 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
