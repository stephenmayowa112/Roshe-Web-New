import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
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

const includes = [
  '6 minutes 2D original animation',
  'Remembrance Day Assembly Script',
  'Remembrance Day Teachers guide',
  'Remembrance Day Student Worksheet',
  '24/7 support and consulting',
];

function PricingCard({ title, price }: { title: string; price: string }) {
  return (
    <div className="bg-[#fffdf0] rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row overflow-hidden">
      {/* Left: price block */}
      <div className="flex flex-col items-center justify-center text-center px-8 py-8 sm:w-[240px] shrink-0">
        <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-6xl font-black text-gray-900 leading-none mb-2">{price}</p>
        <p className="text-sm text-gray-500 mb-6">billed annually</p>
        <button className="w-full bg-[#f5bf05] hover:bg-[#e6b100] text-black py-3 rounded-xl font-bold text-base transition-colors focus:outline-none">
          Buy License
        </button>
      </div>

      {/* Right: includes list */}
      <div className="flex flex-col justify-center px-6 py-8 flex-1">
        <p className="text-sm text-gray-500 mb-4">Includes:</p>
        <ul className="space-y-3">
          {includes.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-gray-800">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#f5bf05] fill-[#f5bf05] stroke-white" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Licensing() {
  return (
    <main className="w-full bg-white flex flex-col items-center pb-24">

      {/* Hero Banner */}
      <section
        className="w-full relative h-[220px] sm:h-[260px] md:h-[300px] flex items-center justify-center overflow-hidden mb-14"
        aria-label="Hero Banner"
      >
        <Image
          src="/images/licensing-hero.png"
          alt="Licensing banner — classroom educational setting"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <h1 className="relative z-10 text-white text-xl sm:text-2xl md:text-4xl font-bold text-center max-w-3xl px-4 leading-snug drop-shadow">
          A Remembrance Day teaching resource +<br />emotional learning experience
        </h1>
      </section>

      {/* Pricing + Poster */}
      <section
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 items-start"
        aria-label="Licensing Options"
      >
        {/* Left: stacked pricing cards */}
        <div className="flex flex-col gap-6 flex-1">
          <PricingCard title="Single School License" price="£200" />
          <PricingCard title="Multi-School / Trust Licence" price="£700" />
        </div>

        {/* Right: Poster */}
        <div className="flex-shrink-0 w-full lg:w-[320px] flex justify-center lg:justify-end">
          <div className="w-full max-w-[320px] aspect-[3/4] relative rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/images/licensing-poster.png"
              alt="Remember Me — A Roshe Studios animated short film poster"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
