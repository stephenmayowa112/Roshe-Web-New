import Image from 'next/image';
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

const filmSchema = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'New Age',
  description: 'An African animated short film produced by a worldwide collaboration of over 200 creatives from 30+ countries.',
  image: 'https://roshestudios.co.uk/images/new-age-hero.png',
  director: { '@type': 'Person', name: 'Omobolaji Peter Moses' },
  productionCompany: { '@type': 'Organization', name: 'Roshe Studios' },
  genre: ['Animation', 'Short Film', 'Sci-fi'],
  duration: 'PT15M',
};

export default function NewAge() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filmSchema) }}
      />

      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[40vh] md:h-[50vh] bg-gray-200 overflow-hidden" aria-label="Hero Banner">
        <Image
          src="/images/new-age-hero.png"
          alt="New Age — futuristic 3D animated scene"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          priority
        />
      </section>

      {/* Details Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="w-full md:w-[400px] aspect-[3/4] relative flex-shrink-0">
          <Image
            src="/images/card-new-age.png"
            alt="New Age movie poster"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover shadow-lg rounded"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center text-gray-900">
          <h1 className="text-4xl font-bold mb-4">New Age</h1>
          <div className="mb-8 space-y-1 text-sm">
            <p><span className="font-semibold">Runtime:</span> 15 minutes</p>
            <p><span className="font-semibold">Status:</span> In Production</p>
            <p><span className="font-semibold">Genre:</span> Sci-fi, Animated Short Film</p>
          </div>
          <h2 className="text-2xl font-bold mb-4">A Worldwide Collaboration</h2>
          <div className="space-y-4 text-sm leading-relaxed mb-8">
            <p>New Age is produced by the brave effort and voluntary collaboration of a team of creatives. New Age shows the power of what is possible when a team of creatives come together to champion a selfless course. Through a unique worldwide collaboration that includes scores of volunteers we are able to produce a world class African animation story.</p>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold">Directed By</p>
              <p>Omobolaji Peter Moses</p>
            </div>
            <div>
              <p className="font-bold">Produced By</p>
              <p>200+ Artists from over 30+ Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-20" aria-label="Media Gallery">
        <div className="flex flex-col gap-4">
          <div className="aspect-[21/9] relative group bg-gray-200 overflow-hidden shadow-md rounded" aria-label="Image Gallery">
            <Image
              src="/images/new-age-gallery.png"
              alt="Gallery image from New Age"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <button className="absolute inset-y-0 left-4 flex items-center text-white text-3xl font-light drop-shadow-md focus:outline-none focus:ring-4 focus:ring-white rounded-full h-12 w-12 justify-center self-center bg-black/20" aria-label="Previous image">{'<'}</button>
            <button className="absolute inset-y-0 right-4 flex items-center text-white text-3xl font-light drop-shadow-md focus:outline-none focus:ring-4 focus:ring-white rounded-full h-12 w-12 justify-center self-center bg-black/20" aria-label="Next image">{'>'}</button>
          </div>
          <p className="text-center font-medium">Gallery</p>
        </div>
      </section>
    </main>
  );
}
