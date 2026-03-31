import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '0.5px solid var(--ios-sep)', background: 'var(--ios-grouped-bg2)' }}>
      <div className="max-w-[980px] mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ background: 'var(--ios-blue)' }}>
                <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 011-1 1 1 0 011 1v2a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-[13px] font-semibold" style={{ color: 'var(--ios-label)', letterSpacing: '-0.006em' }}>
                Rent Central
              </span>
            </div>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ios-label3)' }}>
              Canada's trusted rental marketplace.
            </p>
          </div>

          <div>
            <p className="text-[12px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--ios-label3)' }}>Renters</p>
            <ul className="space-y-2">
              {[['Browse Listings', '/listings'], ['My Applications', '/applications'], ['Saved', '/bookmarks'], ['Contracts', '/contracts']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] transition-opacity hover:opacity-70" style={{ color: 'var(--ios-blue)', letterSpacing: '-0.006em' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--ios-label3)' }}>Landlords</p>
            <ul className="space-y-2">
              {[['Post a Listing', '/landlord/listings/new'], ['Dashboard', '/landlord'], ['Applicants', '/landlord/applications']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] transition-opacity hover:opacity-70" style={{ color: 'var(--ios-blue)', letterSpacing: '-0.006em' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--ios-label3)' }}>Company</p>
            <ul className="space-y-2">
              {['About', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <span className="text-[13px] cursor-pointer transition-opacity hover:opacity-70" style={{ color: 'var(--ios-blue)', letterSpacing: '-0.006em' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '0.5px solid var(--ios-sep)', paddingTop: '16px' }}>
          <p className="text-center text-[11px]" style={{ color: 'var(--ios-label3)' }}>
            © {new Date().getFullYear()} Rent Central Inc. · Made in Canada 🍁
          </p>
        </div>
      </div>
    </footer>
  );
}
