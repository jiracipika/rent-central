import type { Metadata } from 'next';
import { Space_Grotesk, Source_Sans_3 } from 'next/font/google';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Rent Central | Live Rental Discovery Across Canada',
  description:
    'Discover Canadian rentals with live open-data signals, modern application workflows, and transparent market insights.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} app-root`}>
        <div className="app-bg" aria-hidden="true" />
        <NavBar />
        <main className="app-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
