'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { UserRole } from '@rent-central/core';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const role: UserRole | null = null;

  const renterLinks = [
    { href: '/listings', label: 'Listings' },
    { href: '/applications', label: 'Applications' },
    { href: '/bookmarks', label: 'Bookmarks' },
    { href: '/messages', label: 'Messages' },
  ];

  const landlordLinks = [
    { href: '/landlord', label: 'Dashboard' },
    { href: '/landlord/listings', label: 'My Listings' },
    { href: '/landlord/applications', label: 'Applicants' },
    { href: '/messages', label: 'Messages' },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Admin' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/listings', label: 'Listings' },
    { href: '/admin/reports', label: 'Reports' },
  ];

  const links = role === 'admin' ? adminLinks : role === 'landlord' ? landlordLinks : renterLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-gray-900 tracking-tight">
            🏠 Rent Central
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-900 transition-all duration-300 ease-out"
              >
                {link.label}
              </Link>
            ))}
            {role && (
              <Link href="/notifications" className="relative">
                <span className="text-gray-400 hover:text-gray-600 text-lg transition-all duration-300 ease-out">🔔</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Link>
            )}
            {role ? (
              <Link href="/profile" className="text-sm text-gray-500 hover:text-gray-900 transition-all duration-300 ease-out">
                Profile
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in" className="text-sm text-gray-500 hover:text-gray-900 transition-all duration-300 ease-out">
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 ease-out"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          <button
            className="md:hidden p-2 text-gray-500"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-6 pt-2 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-500 hover:text-gray-900 py-2 transition-all duration-300 ease-out"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {role ? (
              <>
                <Link href="/notifications" className="block text-sm text-gray-500 py-2" onClick={() => setMenuOpen(false)}>🔔 Notifications</Link>
                <Link href="/profile" className="block text-sm text-gray-500 py-2" onClick={() => setMenuOpen(false)}>Profile</Link>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="block text-sm text-gray-500 py-2" onClick={() => setMenuOpen(false)}>Sign In</Link>
                <Link href="/sign-up" className="block text-sm font-medium text-blue-600 py-2" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
