'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { UserRole } from '@rent-central/core';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // In a real app, this comes from auth context
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
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            🏠 Rent Central
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {role && (
              <Link href="/notifications" className="relative">
                <span className="text-gray-600 hover:text-gray-900 text-lg">🔔</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Link>
            )}
            {role ? (
              <Link href="/profile" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Profile
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link href="/sign-in" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-gray-600 hover:text-gray-900 py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {role ? (
              <>
                <Link href="/notifications" className="block text-sm font-medium text-gray-600 py-1" onClick={() => setMenuOpen(false)}>
                  🔔 Notifications
                </Link>
                <Link href="/profile" className="block text-sm font-medium text-gray-600 py-1" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="block text-sm font-medium text-gray-600 py-1" onClick={() => setMenuOpen(false)}>
                  Sign In
                </Link>
                <Link href="/sign-up" className="block text-sm font-medium text-blue-600 py-1" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
