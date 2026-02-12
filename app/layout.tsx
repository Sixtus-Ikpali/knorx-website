import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'KNORX Technologies | Knowledge-Driven Execution',
  description: 'Remote-first technology solutions provider specializing in digital platforms, application engineering, and enterprise automation.',
  openGraph: {
    title: 'KNORX Technologies',
    description: 'We help organizations design, automate, and optimize business operations.',
    url: 'https://your-site.vercel.app', // Update with your actual URL
    siteName: 'KNORX',
    images: [
      {
        url: '/logo.png', // This uses your logo when the link is shared
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
