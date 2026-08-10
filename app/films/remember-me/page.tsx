import Image from 'next/image';
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

const filmSchema = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'Remember Me',
  description: 'A 4K animated short film created to honour the sacrifices behind every name remembered on Remembrance Day.',
  image: 'https://roshestudios.co.uk/images/remember-me-poster.png',
  dateCreated: '2026-11-10',
  director: { '@type': 'Person', name: 'Omobolaji Peter Moses' },
  productionCompany: { '@type': 'Organization', name: 'Roshe Studios' },
  genre: ['Animation', 'Short Film', 'Historical'],
  duration: 'PT6M',
};

export default function RememberMe() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filmSchema) }}
      />

      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-gray-200 overflow-hidden" aria-label="Hero Banner">
        <Image
          src="/images/remember-me-hero.png"
          alt="Remember Me — poppy field hero image"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center pt-20">
          <Image
            src="/images/nowThatYouRemember.png"
            alt="Remember Me title logo"
            width={300}
            height={120}
            className="h-16 md:h-20 mb-8 w-auto object-contain"
            priority
          />
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.eventbrite.co.uk/e/remember-me-private-remembrance-day-short-film-screening-tickets-1997141906203?aff=oddtdtcreator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-500"
            >
              BOOK TICKETS
            </a>
            <a href="/licensing" className="bg-white/80 backdrop-blur-sm border border-white text-black hover:bg-white px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-500">
              BUY LICENSE
            </a>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="w-full md:w-[400px] flex-shrink-0">
          <Image
            src="/images/remember-me-poster.png"
            alt="Remember Me movie poster featuring soldiers"
            width={400}
            height={600}
            className="w-full h-auto object-contain shadow-lg rounded"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center text-gray-900">
          <h1 className="text-4xl font-bold mb-4">Remember Me</h1>
          <div className="mb-6 space-y-1 text-sm">
            <p><span className="font-semibold">Runtime:</span> 6 minutes</p>
            <p><span className="font-semibold">Release Date:</span> 10th November 2026</p>
            <p><span className="font-semibold">Genre:</span> Emotional, Animated Short Film</p>
          </div>
          <div className="space-y-4 text-sm leading-relaxed mb-8">
            <p>Remember Me is a 4K animated short film created to honour the sacrifices behind every name remembered on Remembrance Day.</p>
            <p>Through a powerful, accessible story, the film connects younger audiences with history in a way that is emotional, educational, and lasting.</p>
            <p>We are partnering with sponsors to bring this project to wider audiences through private screenings, school engagement, and community events — ensuring the message of remembrance continues for future generations.</p>
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
              className="aspect-video relative cursor-pointer group bg-gray-200 focus:outline-none focus:ring-4 focus:ring-yellow-500 rounded overflow-hidden w-full text-left"
              aria-label="Play Remember Me official trailer"
            >
              <Image
                src="/images/remember-me-trailer.png"
                alt="Trailer thumbnail for Remember Me"
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
            <p className="text-center font-medium">Watch the Official Trailer</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="aspect-video relative group bg-gray-200 rounded overflow-hidden w-full" aria-label="Image Gallery">
              <Image
                src="/images/remember-me-gallery.png"
                alt="Gallery image from Remember Me"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:opacity-90 transition-opacity"
              />
              <button className="absolute inset-y-0 left-4 flex items-center text-white text-2xl font-light focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 h-12 self-center bg-black/20" aria-label="Previous image">{'<'}</button>
              <button className="absolute inset-y-0 right-4 flex items-center text-white text-2xl font-light focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 h-12 self-center bg-black/20" aria-label="Next image">{'>'}</button>
            </div>
            <p className="text-center font-medium">Gallery</p>
          </div>
        </div>
      </section>
    </main>
  );
}
