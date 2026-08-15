import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remember Me',
  description: 'Remember Me is a 4K animated short film created to honour the sacrifices behind every name remembered on Remembrance Day.',
  alternates: { canonical: 'https://roshestudios.co.uk/films/remember-me' },
  openGraph: {
    title: 'Remember Me | Roshe Studios',
    description: 'A 4K animated short film honouring the sacrifices behind every name remembered on Remembrance Day.',
    url: 'https://roshestudios.co.uk/films/remember-me',
    type: 'video.movie',
    images: [{ url: '/images/remember-me-poster.png', width: 1200, height: 900, alt: 'Remember Me movie poster' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remember Me | Roshe Studios',
    images: ['/images/remember-me-poster.png'],
  },
};