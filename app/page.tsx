import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full h-screen relative bg-gray-100 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/home-hero.png"
          alt="Remember Me - Animated short film featuring a poppy field"
          fill
          className="object-contain"
          referrerPolicy="no-referrer"
          priority
        />


      </section>

      {/* Cards Section */}
      <section className="w-full max-w-6xl mx-auto px-4 mb-20" aria-label="Featured Films">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Link href="/films/remember-me" className="flex flex-col group cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-500 rounded-lg overflow-hidden">
            <div className="w-full aspect-[4/5] bg-gray-200 relative overflow-hidden">
              <Image src="/images/card-remember-me.png" alt="Remember Me movie poster featuring soldiers" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="bg-black text-white p-6 min-h-[140px] flex flex-col justify-between">
              <h2 className="text-lg font-medium leading-tight mb-4">Remember Me: A tribute to<br />the fallen soldiers</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-500">LICENSING</p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/films/new-age" className="flex flex-col group cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-500 rounded-lg overflow-hidden">
            <div className="w-full aspect-[4/5] bg-gray-200 relative overflow-hidden">
              <Image src="/images/card-new-age.png" alt="New Age movie poster featuring a futuristic scene" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="bg-black text-white p-6 min-h-[140px] flex flex-col justify-between">
              <h2 className="text-lg font-medium leading-tight mb-4">New Age: A 3D animated<br />short film</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-white">Development</p>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/films/seasonlings" className="flex flex-col group cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-500 rounded-lg overflow-hidden">
            <div className="w-full aspect-[4/5] bg-gray-200 relative overflow-hidden">
              <Image src="/images/card-seasonlings.png" alt="Seasonlings movie poster featuring animated characters" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
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
        <Image src="/images/home-banner-remember-me.png" alt="Remember Me screening banner" fill className="object-cover" referrerPolicy="no-referrer" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full bg-black/20">
          <Image src="/images/remember-me-logo.png" alt="Remember Me title logo" width={300} height={100} className="h-20 md:h-28 mb-4 w-auto object-contain" referrerPolicy="no-referrer" />
          <h2 className="text-white text-xl md:text-3xl font-medium mb-8 drop-shadow-md">Screening in Cinemas this November</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-500">
              BOOK TICKETS
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-yellow-500">
              WATCH TRAILER
            </button>
          </div>
        </div>
      </section>

      {/* Shop Banner */}
      <section className="w-full max-w-7xl mx-auto mb-20 relative h-[400px] overflow-hidden flex items-center bg-yellow-400" aria-label="Shop">
        <Image src="/images/home-banner-shop.png" alt="Background pattern for shop section" fill className="object-cover mix-blend-multiply opacity-50" referrerPolicy="no-referrer" />
        <div className="relative z-10 w-full max-w-xl px-12 md:px-20 text-left">
          <h2 className="text-black text-3xl md:text-5xl font-bold leading-tight mb-8">
            Shop the stories you love<br />for you and your family
          </h2>
          <Link href="/shop" className="inline-block bg-white text-black hover:bg-gray-100 px-10 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-black">
            Shop now
          </Link>
        </div>
      </section>
    </main>
  );
}
