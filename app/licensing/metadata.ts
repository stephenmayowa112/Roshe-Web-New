import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Licensing',
  description: 'License Remember Me — a Remembrance Day animated short film — for your school or multi-school trust. Includes teaching resources, assembly scripts, and student worksheets.',
  alternates: { canonical: 'https://roshestudios.co.uk/licensing' },
  openGraph: {
    title: 'Licensing | Roshe Studios',
    description: 'License Remember Me for your school. Includes 6-min animation, assembly script, teachers guide, and student worksheets.',
    url: 'https://roshestudios.co.uk/licensing',
    images: [{ url: '/images/licensing-poster.png', width: 1200, height: 630, alt: 'Remember Me licensing poster' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Licensing | Roshe Studios',
    images: ['/images/licensing-poster.png'],
  },
};