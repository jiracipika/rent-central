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
    { href: '/landlord/create-listing', label: 'Post Listing' },
    { href: '/messages', label: 'Messages' },
  ];

  const links = role === 'landlord' ? landlordLinks : renterLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-card border-b" style={{ borderColor: 'var(--rc-separator)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 tracking-tight">
            <span className="text-lg">🏠</span>
            <span className="text-[15px] font-semibold" style={{ color: 'var(--rc-text)' }}>Rent Central</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 hover:bg-black/[0.04]"
                style={{ color: 'var(--rc-muted)' }}
              >
                {link.label}
              </Link>
            ))}
            {role && (
              <Link href="/notifications" className="relative ml-1">
                <span className="text-base" style={{ color: 'var(--rc-muted)' }}>🔔</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
              </Link>
            )}
            {role ? (
              <Link href="/profile" className="ml-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <span className="text-xs font-bold" style={{ color: 'var(--rc-primary)' }}>R</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2 ml-3">
                <Link href="/sign-in" className="text-[13px] font-medium rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-black/[0.04]" style={{ color: 'var(--rc-muted)' }}>
                  Sign In
                </Link>
                <Link href="/sign-up" className="rc-btn-primary text-[13px] px-5 py-2">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{ color: 'var(--rc-text)' }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-6 pt-2 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm rounded-[var(--radius-md)] transition-colors duration-150 hover:bg-black/[0.04]"
                style={{ color: 'var(--rc-text2)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {role ? (
              <Link href="/profile" className="block px-3 py-2.5 text-sm rounded-[var(--radius-md)] hover:bg-black/[0.04]" style={{ color: 'var(--rc-text2)' }} onClick={() => setMenuOpen(false)}>Profile</Link>
            ) : (
              <>
                <Link href="/sign-in" className="block px-3 py-2.5 text-sm rounded-[var(--radius-md)] hover:bg-black/[0.04]" style={{ color: 'var(--rc-text2)' }} onClick={() => setMenuOpen(false)}>Sign In</Link>
                <div className="pt-2">
                  <Link href="/sign-up" className="block text-center rc-btn-primary py-2.5 text-sm" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                </div>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
