import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">🏠 Rent Central</h3>
            <p className="text-sm text-gray-500">Canada&apos;s trusted rental marketplace.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Renters</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/listings" className="hover:text-gray-700">Browse Listings</Link></li>
              <li><Link href="/applications" className="hover:text-gray-700">My Applications</Link></li>
              <li><Link href="/bookmarks" className="hover:text-gray-700">Saved Listings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Landlords</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/landlord/listings/new" className="hover:text-gray-700">Post a Listing</Link></li>
              <li><Link href="/landlord" className="hover:text-gray-700">Dashboard</Link></li>
              <li><Link href="/landlord/applications" className="hover:text-gray-700">Applicants</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><span className="hover:text-gray-700 cursor-pointer">About</span></li>
              <li><span className="hover:text-gray-700 cursor-pointer">Privacy</span></li>
              <li><span className="hover:text-gray-700 cursor-pointer">Terms</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Rent Central. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
