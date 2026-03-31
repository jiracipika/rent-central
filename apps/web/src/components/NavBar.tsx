'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { UserRole } from '@rent-central/core';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const role: UserRole | null = null;

  const renterLinks = [
    { href: '/listings',    label: 'Browse',       icon: 'M10 3a7 7 0 100 14A7 7 0 0010 3zM1 10a9 9 0 1118 0A9 9 0 011 10zm14.32 3.906l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387A9 9 0 0115.32 13.906z' },
    { href: '/applications', label: 'Applications', icon: 'M9 12h6m-6-4h6m2 9H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { href: '/bookmarks',   label: 'Saved',        icon: 'M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z' },
    { href: '/messages',    label: 'Messages',     icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  ];

  const landlordLinks = [
    { href: '/landlord',              label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/landlord/listings',     label: 'Listings',  icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { href: '/landlord/listings/new', label: 'Post',      icon: 'M12 4v16m8-8H4' },
    { href: '/messages',              label: 'Messages',  icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  ];

  const links = role === 'landlord' ? landlordLinks : renterLinks;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 glass-card"
        style={{
          borderBottom: '0.5px solid var(--ios-sep)',
          height: 'var(--ios-nav)',
        }}
      >
        <div className="flex items-center justify-between h-full px-4 max-w-[980px] mx-auto">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 select-none tap-scale"
            style={{ minHeight: 44, display: 'flex', alignItems: 'center' }}
          >
            <div
              className="w-7 h-7 rounded-[8px] flex items-center justify-center ios-shadow-xs"
              style={{ background: 'var(--ios-blue)' }}
            >
              <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 011-1 1 1 0 011 1v2a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span
              className="text-[15px] font-semibold tracking-[-0.022em]"
              style={{ color: 'var(--ios-label)' }}
            >
              Rent Central
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[15px] font-medium rounded-[9px] ios-ease"
                style={{
                  color: 'var(--ios-blue)',
                  letterSpacing: '-0.016em',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--ios-fill4)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-1.5">
            {role ? (
              <>
                <Link
                  href="/notifications"
                  className="relative w-9 h-9 flex items-center justify-center rounded-[9px] tap-scale ios-ease"
                  style={{ color: 'var(--ios-blue)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--ios-fill4)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--ios-red)' }} />
                </Link>
                <Link
                  href="/profile"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ios-avatar-blue tap-scale"
                >
                  R
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-[15px] font-medium px-3 py-1.5 rounded-[9px] ios-ease"
                  style={{ color: 'var(--ios-blue)', letterSpacing: '-0.016em' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--ios-fill4)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="ios-btn ios-btn-blue ios-shadow-xs"
                  style={{ height: 34, padding: '0 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 600 }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-[9px] tap-scale"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: 'var(--ios-blue)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
              }
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-[var(--ios-nav)] left-0 right-0 glass-card ios-shadow-md animate-rc-menu"
            style={{ borderBottom: '0.5px solid var(--ios-sep)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="py-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-5 py-3 tap-scale"
                  style={{ color: 'var(--ios-label)', fontSize: '17px', letterSpacing: '-0.022em' }}
                  onClick={() => setMenuOpen(false)}
                >
                  <div
                    className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,122,255,0.10)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}
                      className="w-4 h-4" style={{ color: 'var(--ios-blue)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                    </svg>
                  </div>
                  {link.label}
                </Link>
              ))}
              <div style={{ height: '0.5px', background: 'var(--ios-sep)', margin: '6px 20px' }} />
              {role ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-5 py-3 tap-scale"
                  style={{ color: 'var(--ios-label)', fontSize: '17px', letterSpacing: '-0.022em' }}
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full ios-avatar-blue flex items-center justify-center text-sm font-bold">R</div>
                  Profile
                </Link>
              ) : (
                <div className="px-5 py-3 flex gap-3">
                  <Link
                    href="/sign-in"
                    className="flex-1 ios-btn ios-btn-gray text-[15px]"
                    style={{ height: 44, borderRadius: 12 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex-1 ios-btn ios-btn-blue text-[15px] ios-gradient-blue"
                    style={{ height: 44, borderRadius: 12, fontWeight: 600 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
