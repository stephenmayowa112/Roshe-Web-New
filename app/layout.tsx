import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: '%s | Roshe Studios',
    default: 'Roshe Studios | Animated Short Films',
  },
  description: 'Roshe Studios is an animation studio creating meaningful, educational, and emotionally honest short films and series like Remember Me, New Age, and Seasonlings.',
  keywords: ['animation', 'short films', 'Roshe Studios', 'Remember Me', 'New Age', 'Seasonlings'],
  openGraph: {
    title: 'Roshe Studios | Animated Short Films',
    description: 'Roshe Studios is an animation studio creating meaningful, educational, and emotionally honest short films and series.',
    type: 'website',
    siteName: 'Roshe Studios',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
