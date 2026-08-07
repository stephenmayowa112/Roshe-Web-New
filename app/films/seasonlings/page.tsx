import Image from 'next/image';
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

const seriesSchema = {
  '@context': 'https://schema.org',
  '@type': 'TVSeries',
  name: 'Seasonlings',
  description: 'A mythic animated drama that reimagines Spring, Summer, Autumn, and Winter as immortal siblings tasked with maintaining the balance between the divine realm and the human world.',
  image: 'https://roshestudios.co.uk/images/seasonlings-poster.png',
  numberOfEpisodes: 7,
  director: { '@type': 'Person', name: 'Omobolaji Peter Moses' },
  productionCompany: { '@type': 'Organization', name: 'Roshe Studios' },
  genre: ['Animation', 'Fantasy', 'Drama', 'Action', 'Adventure'],
};

export default function Seasonlings() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesSchema) }}
      />

      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[40vh] md:h-[50vh] flex items-end justify-center pb-12 bg-gray-200 overflow-hidden" aria-label="Hero Banner">
        <Image
          src="/images/seasonlings-hero.png"
          alt="Seasonlings — fantasy landscape hero image"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-top"
          priority
        />
        <div className="relative z-10">
          <button className="bg-white text-black hover:bg-gray-100 px-10 py-3 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-500">
            Invest Now
          </button>
        </div>
      </section>

      {/* Details Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="w-full md:w-[400px] flex-shrink-0 bg-gray-800 p-8 rounded shadow-lg flex items-center justify-center relative min-h-[350px]">
          <Image
            src="/images/seasonlings-poster.png"
            alt="Seasonlings series poster"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-contain p-4"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center text-gray-900">
          <h1 className="text-4xl font-bold mb-4">Seasonlings Season 1</h1>
          <div className="mb-6 space-y-1 text-sm">
            <p><span className="font-semibold">Episodes:</span> 7 Episodes</p>
            <p><span className="font-semibold">Status:</span> In development</p>
            <p><span className="font-semibold">Genre:</span> Fantasy, Action, Adventure, Drama, Cli-fi</p>
          </div>
          <div className="space-y-4 text-sm leading-relaxed mb-8">
            <p>Seasonlings is a mythic animated drama that reimagines Spring, Summer, Autumn, and Winter as immortal siblings tasked with maintaining the balance between the divine realm, Ecos and the human world. Created by Mother Nature herself, the Seasonlings govern the natural cycles that sustain life on Earth. Beneath their divine purpose lies centuries of resentment, jealousy, and emotional neglect. When Aurelia, the embodiment of Autumn, receives a vision of impending doom for both worlds, the cracks beneath the surface of her relationships begin to reemerge. Sibling rivalries turn into open war, and power-hungry alliances threaten life. The world as they know it is falling apart, and their war is not the only enemy. The series examines love, identity, and the complexity of relationships through the eyes of painfully human immortals.</p>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold">Directed By</p>
              <p>Omobolaji Peter Moses</p>
            </div>
            <div>
              <p className="font-bold">Produced By</p>
              <p>Roshe Studios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video & Gallery */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-20" aria-label="Media Gallery">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <button
              className="aspect-video relative group bg-gray-200 shadow-md rounded overflow-hidden w-full text-left focus:outline-none focus:ring-4 focus:ring-yellow-500"
              aria-label="Play Seasonlings official teaser"
            >
              <Image
                src="/images/seasonlings-teaser.png"
                alt="Teaser thumbnail for Seasonlings"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </button>
            <p className="text-center font-medium">Watch the Official Teaser</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="aspect-video relative group bg-gray-200 shadow-md overflow-hidden rounded" aria-label="Image Gallery">
              <Image
                src="/images/seasonlings-gallery.png"
                alt="Gallery image from Seasonlings"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <button className="absolute inset-y-0 left-4 flex items-center text-white text-2xl font-light focus:outline-none focus:ring-4 focus:ring-white rounded-full p-2 h-12 self-center bg-black/20" aria-label="Previous image">{'<'}</button>
              <button className="absolute inset-y-0 right-4 flex items-center text-white text-2xl font-light focus:outline-none focus:ring-4 focus:ring-white rounded-full p-2 h-12 self-center bg-black/20" aria-label="Next image">{'>'}</button>
            </div>
            <p className="text-center font-medium">Gallery</p>
          </div>
        </div>
      </section>
    </main>
  );
}
