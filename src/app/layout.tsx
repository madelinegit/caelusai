import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Caelus AI by Ecodev LLC',
  description: 'Secure AI consulting and client portal by Ecodev LLC.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0d0f12" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
