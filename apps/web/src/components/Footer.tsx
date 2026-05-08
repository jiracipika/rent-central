import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <p className="footer-kicker">Built for Canadian renters and landlords</p>
          <h3 className="footer-title">Fast, transparent rental operations.</h3>
          <p className="footer-copy">
            Rent Central combines verified inventory signals, market benchmarks, and streamlined workflows into one platform.
          </p>
        </div>

        <div className="footer-grid">
          <div>
            <p className="footer-group-title">Product</p>
            <Link href="/listings" className="footer-link">Explore listings</Link>
            <Link href="/applications" className="footer-link">Applications</Link>
            <Link href="/contracts" className="footer-link">Contracts</Link>
          </div>
          <div>
            <p className="footer-group-title">Landlords</p>
            <Link href="/landlord" className="footer-link">Portfolio overview</Link>
            <Link href="/landlord/listings/new" className="footer-link">Create listing</Link>
            <Link href="/landlord/applications" className="footer-link">Review applicants</Link>
          </div>
          <div>
            <p className="footer-group-title">Company</p>
            <Link href="/profile/settings" className="footer-link">Settings</Link>
            <Link href="/notifications" className="footer-link">Notifications</Link>
            <Link href="/messages" className="footer-link">Support inbox</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rent Central. Designed in Canada.</p>
      </div>
    </footer>
  );
}
