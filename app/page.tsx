import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roshe Studios | Animated Short Films',
  description: 'Roshe Studios creates meaningful, educational animated short films and series — including Remember Me, New Age, and Seasonlings.',
  alternates: { canonical: 'https://roshestudios.co.uk/' },
  openGraph: {
    title: 'Roshe Studios | Animated Short Films',
    description: 'Roshe Studios creates meaningful, educational animated short films and series.',
    url: 'https://roshestudios.co.uk/',
    images: [{ url: '/images/home-hero.png', width: 1200, height: 630, alt: 'Roshe Studios Home' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roshe Studios | Animated Short Films',
    images: ['/images/home-hero.png'],
  },
};

export default function Home() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      {/* Hero Section — Remember Me Trailer */}
      <section className="w-full h-[80vh] bg-white flex items-center justify-center">
        <div className="relative w-full h-full">
          <iframe
            src="https://www.youtube-nocookie.com/embed/OyTX6W5XZDs?rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=OyTX6W5XZDs"
            title="Remember Me — Official Trailer | Roshe Studios"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Cards Section */}
      <section className="w-full max-w-6xl mx-auto px-2 mt-16 mb-20" aria-label="Featured Films">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Link href="/films/remember-me" className="flex flex-col group cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-500 rounded-lg overflow-hidden">
            <div className="w-full aspect-[4/5] bg-gray-200 relative overflow-hidden">
              <Image
                src="/images/card-remember-me.png"
                alt="Remember Me movie poster featuring soldiers"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="bg-black text-white p-6 min-h-[140px] flex flex-col justify-between">
              <h2 className="text-lg font-medium leading-tight mb-4">Remember Me: A tribute to<br />the fallen soldiers</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-500">LICENSING</p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/films/new-age" className="flex flex-col group cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-500 rounded-lg overflow-hidden">
            <div className="w-full aspect-[4/5] bg-gray-200 relative overflow-hidden">
              <Image
                src="/images/card-new-age.png"
                alt="New Age movie poster featuring a futuristic scene"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="bg-black text-white p-6 min-h-[140px] flex flex-col justify-between">
              <h2 className="text-lg font-medium leading-tight mb-4">New Age: A 3D animated<br />short film</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-white">Development</p>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/films/seasonlings" className="flex flex-col group cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-500 rounded-lg overflow-hidden">
            <div className="w-full aspect-[4/5] bg-gray-200 relative overflow-hidden">
              <Image
                src="/images/card-seasonlings.png"
                alt="Seasonlings series poster featuring animated characters"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="bg-black text-white p-6 min-h-[140px] flex flex-col justify-between">
              <h2 className="text-lg font-medium leading-tight mb-4">Seasonlings: A 2D animated<br />Cli-fi animated series</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-white">Development</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Screening Banner */}
      <section className="w-full max-w-7xl mx-auto mb-20 relative h-[400px] overflow-hidden flex items-center justify-center bg-gray-100" aria-label="Screening Announcement">
        <Image
          src="/images/home-banner-remember-me.png"
          alt="Remember Me screening banner"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-2 w-full h-full bg-black/20">
          <Image
            src="/images/nowThatYouRemember.png"
            alt="Remember Me title logo"
            width={100}
            height={75}
            className="h-12 md:h-16 mb-4 w-auto object-contain"
          />
          <h2 className="text-white text-xl md:text-3xl font-medium mb-8 drop-shadow-md">Screening in Cinemas this November</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
                href="https://www.eventbrite.co.uk/e/remember-me-private-remembrance-day-short-film-screening-tickets-1997141906203?aff=oddtdtcreator"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-500"
              >
                BOOK TICKETS
              </a>
            <a
              href="https://youtu.be/OyTX6W5XZDs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-yellow-500"
            >
              WATCH TRAILER
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
