import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jackie Jeans - Find Your Perfect Fit',
  description: 'AI-powered onboarding experience for Jackie Jeans',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
