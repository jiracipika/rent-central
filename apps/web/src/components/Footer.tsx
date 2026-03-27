import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm tracking-tight">🏠 Rent Central</h3>
            <p className="text-sm text-gray-400">Canada&apos;s trusted rental marketplace.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Renters</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/listings" className="hover:text-gray-600 transition-colors">Browse Listings</Link></li>
              <li><Link href="/applications" className="hover:text-gray-600 transition-colors">My Applications</Link></li>
              <li><Link href="/bookmarks" className="hover:text-gray-600 transition-colors">Saved Listings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Landlords</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/landlord/listings/new" className="hover:text-gray-600 transition-colors">Post a Listing</Link></li>
              <li><Link href="/landlord" className="hover:text-gray-600 transition-colors">Dashboard</Link></li>
              <li><Link href="/landlord/applications" className="hover:text-gray-600 transition-colors">Applicants</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-gray-600 cursor-pointer transition-colors">About</span></li>
              <li><span className="hover:text-gray-600 cursor-pointer transition-colors">Privacy</span></li>
              <li><span className="hover:text-gray-600 cursor-pointer transition-colors">Terms</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-100 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Rent Central. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
