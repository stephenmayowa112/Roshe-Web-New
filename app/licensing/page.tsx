import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Licensing',
  description: 'Licensing options for Roshe Studios films, including Remembrance Day teaching resources and emotional learning experiences.',
};

const includes = [
  '6 minutes 2D original animation',
  'Remembrance Day Assembly Script',
  'Remembrance Day Teachers guide',
  'Remembrance Day Student Worksheet',
  '24/7 support and consulting',
];

export default function Licensing() {
  return (
    <main className="w-full bg-white flex flex-col items-center pb-24">

      {/* Hero Banner — full width, no side padding */}
      <section className="w-full relative h-[220px] sm:h-[260px] md:h-[300px] flex items-center justify-center overflow-hidden mb-14" aria-label="Hero Banner">
        <Image
          src="/images/licensing-hero.png"
          alt="Licensing banner — classroom educational setting"
          fill
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
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start"
        aria-label="Licensing Options"
      >
        {/* Left: Pricing Cards */}
        <div className="flex flex-col gap-6">

          {/* Card 1 */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr]">
              {/* Left panel */}
              <div className="flex flex-col items-center justify-center bg-[#fffbea] px-6 py-10 text-center sm:border-r border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Single School License</h2>
                <p className="text-6xl font-black text-gray-900 leading-none mb-2">£200</p>
                <p className="text-sm text-gray-500 mb-8">billed annually</p>
                <button className="w-full max-w-[220px] bg-[#f5bf05] hover:bg-[#e6b100] text-black px-6 py-3 rounded-xl font-bold text-base transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-400">
                  Buy License
                </button>
              </div>
              {/* Right panel */}
              <div className="bg-white px-6 py-8 sm:px-8 sm:py-10">
                <p className="text-sm text-gray-500 mb-4">Includes:</p>
                <ul className="space-y-3" aria-label="Single School License includes">
                  {includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#f5bf05]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr]">
              {/* Left panel */}
              <div className="flex flex-col items-center justify-center bg-[#fffbea] px-6 py-10 text-center sm:border-r border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Multi-School / Trust Licence</h2>
                <p className="text-6xl font-black text-gray-900 leading-none mb-2">£700</p>
                <p className="text-sm text-gray-500 mb-8">billed annually</p>
                <button className="w-full max-w-[220px] bg-[#f5bf05] hover:bg-[#e6b100] text-black px-6 py-3 rounded-xl font-bold text-base transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-400">
                  Buy License
                </button>
              </div>
              {/* Right panel */}
              <div className="bg-white px-6 py-8 sm:px-8 sm:py-10">
                <p className="text-sm text-gray-500 mb-4">Includes:</p>
                <ul className="space-y-3" aria-label="Multi-School License includes">
                  {includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#f5bf05]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Poster */}
        <div className="flex justify-center lg:justify-end lg:sticky lg:top-24">
          <div className="w-full max-w-[300px] sm:max-w-[320px] aspect-[0.72] relative rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/images/licensing-poster.png"
              alt="Remember Me — A Roshe Studios animated short film poster"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
