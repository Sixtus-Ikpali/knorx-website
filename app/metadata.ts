import type { Metadata } from 'next';
import { configuredSiteUrl } from './site-url';

const siteName = 'KNORX Technologies';
const socialImage = { url: '/api/social-image', width: 1200, height: 630, alt: 'KNORX Technologies — From Complexity to Working Systems' };

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const siteUrl = configuredSiteUrl();
  const absoluteUrl = siteUrl ? new URL(path, siteUrl).toString() : undefined;
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: path } : undefined,
    openGraph: {
      title,
      description,
      siteName,
      type: 'website',
      url: absoluteUrl,
      images: siteUrl ? [socialImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: siteUrl ? [socialImage.url] : undefined,
    },
  };
}
