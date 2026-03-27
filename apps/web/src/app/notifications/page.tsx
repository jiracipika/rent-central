'use client';

const notifications = [
  { id: '1', type: 'application_received', icon: '📝', title: 'New Application Received', message: 'Jordan Lee applied for your Modern Downtown Loft listing.', time: '2 hours ago', unread: true },
  { id: '2', type: 'new_message', icon: '💬', title: 'New Message', message: 'Sarah Chen sent you a message about Luxury Yaletown Condo.', time: '5 hours ago', unread: true },
  { id: '3', type: 'status_change', icon: '📋', title: 'Application Updated', message: 'Your application for Cozy Plateau Apartment is now under review.', time: '1 day ago', unread: false },
  { id: '4', type: 'payment_success', icon: '✅', title: 'Payment Successful', message: 'Your deposit of $1,650 for Modern Downtown Loft has been processed.', time: '2 days ago', unread: false },
  { id: '5', type: 'contract_ready', icon: '📄', title: 'Contract Ready', message: 'Your lease agreement for Cozy Plateau Apartment is ready to sign.', time: '3 days ago', unread: false },
  { id: '6', type: 'payment_due', icon: '💳', title: 'Payment Due Soon', message: 'Your rent payment of $1,650 is due in 3 days.', time: '4 days ago', unread: false },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-gray-400">{notifications.filter(n => n.unread).length} unread</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Mark all as read</button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
        {notifications.map((n) => (
          <div key={n.id} className={`flex items-start gap-4 p-5 transition-colors ${n.unread ? 'bg-blue-50/50' : ''}`}>
            <span className="text-xl mt-0.5 flex-shrink-0">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-sm ${n.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>{n.title}</p>
                {n.unread && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />}
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
