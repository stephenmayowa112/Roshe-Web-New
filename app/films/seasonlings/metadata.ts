import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seasonlings',
  description: 'Seasonlings is a mythic animated drama series about immortal siblings governing the natural cycles of Earth — created by Roshe Studios.',
  alternates: { canonical: 'https://roshestudios.co.uk/films/seasonlings' },
  openGraph: {
    title: 'Seasonlings | Roshe Studios',
    description: 'A mythic animated drama series about immortal siblings governing the natural cycles of Earth.',
    url: 'https://roshestudios.co.uk/films/seasonlings',
    type: 'video.tv_show',
    images: [{ url: '/images/seasonlings-hero.png', width: 1200, height: 630, alt: 'Seasonlings animated series' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seasonlings | Roshe Studios',
    images: ['/images/seasonlings-hero.png'],
  },
};