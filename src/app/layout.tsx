import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Caelus AI by Ecodev LLC',
  description: 'Secure AI consulting and client portal by Ecodev LLC.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
