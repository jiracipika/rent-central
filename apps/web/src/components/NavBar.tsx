'use client';

import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '/listings', label: 'Explore' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/applications', label: 'Applications' },
  { href: '/messages', label: 'Messages' },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-nav-wrap">
      <div className="site-nav">
        <Link href="/" className="brand-lockup" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">Rent Central</span>
        </Link>

        <nav className="site-links desktop-only">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="site-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-actions desktop-only">
          <Link href="/sign-in" className="btn btn-ghost btn-sm">
            Sign in
          </Link>
          <Link href="/sign-up" className="btn btn-primary btn-sm">
            Get early access
          </Link>
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-links">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-actions">
            <Link href="/sign-in" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
              Sign in
            </Link>
            <Link href="/sign-up" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
              Get early access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
