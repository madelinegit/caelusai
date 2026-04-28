import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Caelus AI by Ecodev LLC',
  description: 'Secure AI consulting and client portal by Ecodev LLC.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/icon-192.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0d0f12" />
      </head>
      <body>{children}</body>
    </html>
  );
}
