import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Licensing',
  description: 'Licensing options for Roshe Studios films, including Remembrance Day teaching resources and emotional learning experiences.',
};

export default function Licensing() {
  return (
    <main className="w-full bg-white flex flex-col items-center pb-24">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[42svh] min-h-[360px] md:h-[45vh] flex items-center justify-center bg-gray-200 overflow-hidden mb-16 px-4" aria-label="Hero Banner">
        <Image src="/images/licensing-hero.png" alt="Licensing banner featuring a classroom or educational setting" fill className="object-cover object-center" referrerPolicy="no-referrer" priority />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
        <h1 className="relative z-10 text-white text-2xl sm:text-3xl md:text-5xl font-bold text-center max-w-4xl leading-tight drop-shadow-md">
          A Remembrance Day teaching resource +<br />emotional learning experience
        </h1>
      </section>

      {/* Pricing and Poster */}
      <section className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.9fr)] gap-12 md:gap-12 items-start" aria-label="Licensing Options">
        {/* Left Col: Pricing Cards */}
        <div className="flex flex-col gap-8">
          {/* Card 1 */}
          <div className="overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
              <div className="flex flex-col items-center justify-center bg-[#fbf4de] px-6 py-12 text-center md:px-8 md:py-16 md:border-r md:border-black/5">
                <h2 className="text-2xl md:text-[1.65rem] font-semibold tracking-tight text-gray-900 mb-7">Single School License</h2>
                <p className="text-6xl md:text-[4.6rem] font-black leading-none text-gray-900 mb-7">£200</p>
                <p className="text-lg text-gray-700 mb-9">billed annually</p>
                <button className="min-w-[220px] bg-[#f5bf05] hover:bg-[#e6b100] text-black px-8 py-4 rounded-xl font-extrabold text-xl shadow-[0_8px_18px_rgba(245,191,5,0.2)] transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-600">
                  Buy License
                </button>
              </div>
              <div className="bg-white px-6 py-10 md:px-10 md:py-12">
                <p className="text-2xl font-medium text-gray-600 mb-7" id="single-school-includes">Includes:</p>
                <ul className="space-y-5 text-base md:text-lg text-gray-600" aria-labelledby="single-school-includes">
                  <li className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5bf05] text-white shadow-sm" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span>6 minutes 2D original animation</span>
                  </li>
                  <li className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5bf05] text-white shadow-sm" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span>Remembrance Day Assembly Script</span>
                  </li>
                  <li className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5bf05] text-white shadow-sm" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span>Remembrance Day Teachers guide</span>
                  </li>
                  <li className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5bf05] text-white shadow-sm" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span>Remembrance Day Student Worksheet</span>
                  </li>
                  <li className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5bf05] text-white shadow-sm" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span>24/7 support and consulting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
              <div className="flex flex-col items-center justify-center bg-[#fbf4de] px-6 py-12 text-center md:px-8 md:py-16 md:border-r md:border-black/5">
                <h2 className="text-2xl md:text-[1.65rem] font-semibold tracking-tight text-gray-900 mb-7">Multi-School / Trust Licence</h2>
                <p className="text-6xl md:text-[4.6rem] font-black leading-none text-gray-900 mb-7">£700</p>
                <p className="text-lg text-gray-700 mb-9">billed annually</p>
                <button className="min-w-[220px] bg-[#f5bf05] hover:bg-[#e6b100] text-black px-8 py-4 rounded-xl font-extrabold text-xl shadow-[0_8px_18px_rgba(245,191,5,0.2)] transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-600">
                  Buy License
                </button>
              </div>
              <div className="bg-white px-6 py-10 md:px-10 md:py-12">
                <p className="text-2xl font-medium text-gray-600 mb-7" id="multi-school-includes">Includes:</p>
                <ul className="space-y-5 text-base md:text-lg text-gray-600" aria-labelledby="multi-school-includes">
                  <li className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5bf05] text-white shadow-sm" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span>6 minutes 2D original animation</span>
                  </li>
                  <li className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5bf05] text-white shadow-sm" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span>Remembrance Day Assembly Script</span>
                  </li>
                  <li className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5bf05] text-white shadow-sm" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span>Remembrance Day Teachers guide</span>
                  </li>
                  <li className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5bf05] text-white shadow-sm" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span>Remembrance Day Student Worksheet</span>
                  </li>
                  <li className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5bf05] text-white shadow-sm" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span>24/7 support and consulting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Poster */}
        <div className="flex items-start justify-center md:justify-end md:pt-0">
          <div className="w-full max-w-[460px] aspect-[0.87] relative rounded-[28px] shadow-[0_18px_40px_rgba(0,0,0,0.12)] overflow-hidden">
            <Image src="/images/licensing-poster.png" alt="Licensing promotional poster" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>
    </main>
  );
}
