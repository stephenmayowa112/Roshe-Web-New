import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Age',
  description: 'New Age is an African animated short film produced by a worldwide collaboration of over 200 creatives from 30+ countries.',
  alternates: { canonical: 'https://roshestudios.co.uk/films/new-age' },
  openGraph: {
    title: 'New Age | Roshe Studios',
    description: 'An African animated short film produced by a worldwide collaboration of over 200 creatives from 30+ countries.',
    url: 'https://roshestudios.co.uk/films/new-age',
    type: 'video.movie',
    images: [{ url: '/images/new-age-hero.png', width: 1200, height: 630, alt: 'New Age animated film' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Age | Roshe Studios',
    images: ['/images/new-age-hero.png'],
  },
};