'use client';

import { useState } from 'react';

const users = [
  { id: '1', name: 'Alex Rivera', email: 'alex@email.com', role: 'renter' as const, joined: '2025-08-15', applications: 3, verified: true },
  { id: '2', name: 'Sarah Chen', email: 'sarah@email.com', role: 'landlord' as const, joined: '2024-03-22', listings: 4, verified: true },
  { id: '3', name: 'Marc Tremblay', email: 'marc@email.com', role: 'renter' as const, joined: '2025-11-01', applications: 1, verified: false },
  { id: '4', name: 'Emily Park', email: 'emily@email.com', role: 'landlord' as const, joined: '2025-06-10', listings: 2, verified: true },
  { id: '5', name: 'James Park', email: 'james@email.com', role: 'renter' as const, joined: '2026-01-18', applications: 7, verified: true },
  { id: '6', name: 'Lena Kowalski', email: 'lena@email.com', role: 'landlord' as const, joined: '2024-01-05', listings: 6, verified: true },
];

export default function AdminUsersPage() {
  const [filter, setFilter] = useState<'all' | 'renter' | 'landlord'>('all');
  const filtered = filter === 'all' ? users : users.filter(u => u.role === filter);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="rc-section-title mb-1">Admin — Users</h1>
          <p className="text-sm text-gray-400">{users.length} registered users</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100">
          {(['all', 'renter', 'landlord'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all capitalize ${filter === f ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {f === 'all' ? 'All' : `${f}s`}
            </button>
          ))}
        </div>
      </div>

      <div className="rc-card-static overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${u.role === 'landlord' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {u.verified ? (
                      <span className="inline-flex items-center gap-1 text-xs text-green-700"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Verified</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-yellow-700"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" /> Unverified</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-500">{u.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-blue-600 hover:underline">View</button>
                      {!u.verified && <button className="text-xs text-green-600 hover:underline">Verify</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
