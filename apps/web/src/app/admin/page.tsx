'use client';

const stats = {
  totalUsers: 1247,
  totalListings: 432,
  activeListings: 298,
  applications: 1056,
  revenue: '$18,400',
};

const recentReports = [
  { id: '1', type: 'listing', target: 'Suspicious Pricing', status: 'open', date: 'Mar 26' },
  { id: '2', type: 'user', target: 'Spam Account', status: 'resolved', date: 'Mar 25' },
  { id: '3', type: 'listing', target: 'Misleading Photos', status: 'reviewed', date: 'Mar 24' },
];

const statusStyles: Record<string, string> = {
  open: 'bg-amber-50 text-amber-700',
  reviewed: 'bg-blue-50 text-blue-700',
  resolved: 'bg-emerald-50 text-emerald-700',
};

export default function AdminPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 pt-28">
      <h1 className="rc-section-title">Admin Dashboard</h1>
      <p className="text-sm mt-1" style={{ color: 'var(--rc-muted)' }}>Platform overview and moderation</p>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-8">
        {[
          { label: 'Users', value: stats.totalUsers.toLocaleString() },
          { label: 'Listings', value: stats.totalListings },
          { label: 'Active', value: stats.activeListings },
          { label: 'Applications', value: stats.applications.toLocaleString() },
          { label: 'Revenue', value: stats.revenue },
          { label: 'Open Reports', value: '1' },
        ].map((s) => (
          <div key={s.label} className="rc-card-static p-4 text-center">
            <p className="text-xl font-bold" style={{ color: 'var(--rc-text)' }}>{s.value}</p>
            <p className="text-[10px] mt-1" style={{ color: 'var(--rc-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <a href="/admin/listings" className="rc-card p-5 text-center transition-all duration-200">
          <span className="text-2xl">🏠</span>
          <p className="text-sm font-semibold mt-2" style={{ color: 'var(--rc-text)' }}>Manage Listings</p>
          <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>Review & moderate</p>
        </a>
        <a href="/admin/users" className="rc-card p-5 text-center transition-all duration-200">
          <span className="text-2xl">👥</span>
          <p className="text-sm font-semibold mt-2" style={{ color: 'var(--rc-text)' }}>Manage Users</p>
          <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>Verify & ban</p>
        </a>
        <a href="/admin/reports" className="rc-card p-5 text-center transition-all duration-200">
          <span className="text-2xl">🚨</span>
          <p className="text-sm font-semibold mt-2" style={{ color: 'var(--rc-text)' }}>Reports</p>
          <p className="text-xs mt-1" style={{ color: 'var(--rc-muted)' }}>Flagged content</p>
        </a>
      </div>

      {/* Recent reports */}
      <div className="mt-8">
        <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--rc-text)' }}>Recent Reports</h2>
        <div className="space-y-2">
          {recentReports.map((r) => (
            <div key={r.id} className="rc-card-static p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm">{r.type === 'listing' ? '🏠' : '👤'}</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--rc-text)' }}>{r.target}</p>
                  <p className="text-xs" style={{ color: 'var(--rc-muted)' }}>{r.date}</p>
                </div>
              </div>
              <span className={`rc-badge text-[10px] ${statusStyles[r.status]}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
