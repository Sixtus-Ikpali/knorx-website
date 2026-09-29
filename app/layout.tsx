import type { Metadata } from 'next';
import { configuredSiteUrl } from './site-url';
import { pageMetadata } from './metadata';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import './globals.css';

// Refresh static routes so the server-derived footer year does not become stale.
export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: configuredSiteUrl(),
  ...pageMetadata(
    'KNORX Technologies | From Complexity to Working Systems',
    'KNORX Technologies helps startups, businesses, and institutions turn ideas and operational challenges into scalable technology systems.',
    '/',
  ),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const year = new Date().getUTCFullYear();
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to main content</a><SiteHeader />{children}<SiteFooter year={year} /></body></html>;
}
