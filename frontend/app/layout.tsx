import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Band Baaja Baarat 2026 — Royal Freshers Celebration',
  description: 'Register for the grandest Freshers celebration of 2026! Band Baaja Baarat is the premier royal Indian wedding themed college event experience.',
  keywords: 'Band Baaja Baarat, Freshers 2026, college event, registration, royal celebration',
  openGraph: {
    title: 'Band Baaja Baarat 2026 — Royal Freshers Celebration',
    description: 'Book your royal pass for the grandest Freshers night celebration!',
    type: 'website',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-maroon-900 text-royal-ivory overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
