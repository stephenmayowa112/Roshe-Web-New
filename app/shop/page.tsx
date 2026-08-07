import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop for merchandise and stories you love from Roshe Studios — coming soon.',
  alternates: { canonical: 'https://roshestudios.co.uk/shop' },
  openGraph: {
    title: 'Shop | Roshe Studios',
    description: 'Shop for merchandise and stories you love from Roshe Studios — coming soon.',
    url: 'https://roshestudios.co.uk/shop',
  },
};

export default function Shop() {
  return (
    <main className="w-full bg-white flex flex-col items-center flex-grow justify-center py-20">
      <h1 className="text-4xl font-bold mb-4">Shop</h1>
      <p className="text-lg text-gray-600 mb-8" aria-live="polite">Coming Soon...</p>
      
      {/* Shop Banner from Home Page */}
      <section className="w-full max-w-7xl mx-auto relative h-[400px] overflow-hidden flex items-center bg-yellow-400" aria-label="Shop Banner">
        <Image src="/images/home-banner-shop.png" alt="Shop Roshe Studios merchandise" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover mix-blend-multiply opacity-50" priority />
        <div className="relative z-10 w-full max-w-xl px-12 md:px-20 text-left">
          <h2 className="text-black text-3xl md:text-5xl font-bold leading-tight mb-8">
            Shop the stories you love<br />for you and your family
          </h2>
          <button className="bg-white text-black hover:bg-gray-100 px-10 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-black" aria-disabled="true">
            Shop now
          </button>
        </div>
      </section>
    </main>
  );
}
