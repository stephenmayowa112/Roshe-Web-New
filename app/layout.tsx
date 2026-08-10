import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
});

const BASE_URL = 'https://roshestudios.co.uk';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Roshe Studios',
    default: 'Roshe Studios | Animated Short Films',
  },
  description: 'Roshe Studios is an award-aspiring UK animation studio creating meaningful, educational, and emotionally honest animated short films and series — including Remember Me, New Age, and Seasonlings.',
  keywords: ['animation', 'short films', 'Roshe Studios', 'Remember Me', 'New Age', 'Seasonlings', 'animated films', 'UK animation studio', 'educational animation', 'animated short film UK'],
  authors: [{ name: 'Roshe Studios', url: BASE_URL }],
  creator: 'Roshe Studios',
  publisher: 'Roshe Studios',
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Roshe Studios | Animated Short Films',
    description: 'Roshe Studios is an animation studio creating meaningful, educational, and emotionally honest short films and series.',
    url: BASE_URL,
    type: 'website',
    siteName: 'Roshe Studios',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Roshe Studios — Animated Short Films',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roshe Studios | Animated Short Films',
    description: 'Roshe Studios is an animation studio creating meaningful, educational, and emotionally honest short films and series.',
    images: ['/images/logo.png'],
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Roshe Studios',
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  contactPoint: [
    { '@type': 'ContactPoint', email: 'info@roshestudios.co.uk', contactType: 'customer support' },
    { '@type': 'ContactPoint', email: 'omobolaji.moses@roshestudios.co.uk', contactType: 'sales' },
    { '@type': 'ContactPoint', email: 'helen.moses@roshestudios.co.uk', contactType: 'administration' },
  ],
  sameAs: [
    'https://www.instagram.com/roshestudios',
    'https://www.youtube.com/@roshestudios',
    'https://www.linkedin.com/company/roshestudios',
    'https://www.facebook.com/roshestudios',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Roshe Studios',
  url: BASE_URL,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }} suppressHydrationWarning>
        <Navbar />
        <div className="flex-grow flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
