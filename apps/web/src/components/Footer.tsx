import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto" style={{ borderColor: 'var(--rc-separator)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-sm tracking-tight" style={{ color: 'var(--rc-text)' }}>🏠 Rent Central</h3>
            <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'var(--rc-muted)' }}>Canada&apos;s trusted rental marketplace. Find your perfect home.</p>
          </div>
          <div>
            <h4 className="font-medium text-xs mb-3" style={{ color: 'var(--rc-text)' }}>Renters</h4>
            <ul className="space-y-2">
              <li><Link href="/listings" className="text-xs transition-colors duration-200 hover:text-gray-700" style={{ color: 'var(--rc-muted)' }}>Browse Listings</Link></li>
              <li><Link href="/applications" className="text-xs transition-colors duration-200 hover:text-gray-700" style={{ color: 'var(--rc-muted)' }}>My Applications</Link></li>
              <li><Link href="/bookmarks" className="text-xs transition-colors duration-200 hover:text-gray-700" style={{ color: 'var(--rc-muted)' }}>Saved Listings</Link></li>
              <li><Link href="/contracts" className="text-xs transition-colors duration-200 hover:text-gray-700" style={{ color: 'var(--rc-muted)' }}>Contracts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-xs mb-3" style={{ color: 'var(--rc-text)' }}>Landlords</h4>
            <ul className="space-y-2">
              <li><Link href="/landlord/listings/new" className="text-xs transition-colors duration-200 hover:text-gray-700" style={{ color: 'var(--rc-muted)' }}>Post a Listing</Link></li>
              <li><Link href="/landlord" className="text-xs transition-colors duration-200 hover:text-gray-700" style={{ color: 'var(--rc-muted)' }}>Dashboard</Link></li>
              <li><Link href="/landlord/applications" className="text-xs transition-colors duration-200 hover:text-gray-700" style={{ color: 'var(--rc-muted)' }}>Applicants</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-xs mb-3" style={{ color: 'var(--rc-text)' }}>Company</h4>
            <ul className="space-y-2">
              <li><span className="text-xs cursor-pointer transition-colors duration-200 hover:text-gray-700" style={{ color: 'var(--rc-muted)' }}>About</span></li>
              <li><span className="text-xs cursor-pointer transition-colors duration-200 hover:text-gray-700" style={{ color: 'var(--rc-muted)' }}>Privacy</span></li>
              <li><span className="text-xs cursor-pointer transition-colors duration-200 hover:text-gray-700" style={{ color: 'var(--rc-muted)' }}>Terms</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 text-center" style={{ borderTop: '1px solid var(--rc-border)' }}>
          <p className="text-[11px]" style={{ color: 'var(--rc-muted)' }}>© {new Date().getFullYear()} Rent Central. All rights reserved. 🍁 Made in Canada</p>
        </div>
      </div>
    </footer>
  );
}
