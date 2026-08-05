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
      <section className="w-full max-w-7xl mx-auto relative h-[35vh] md:h-[45vh] flex items-center justify-center bg-gray-200 overflow-hidden mb-16" aria-label="Hero Banner">
        <Image src="/images/licensing-hero.png" alt="Licensing banner featuring a classroom or educational setting" fill className="object-cover" referrerPolicy="no-referrer" priority />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center px-4 max-w-4xl leading-tight drop-shadow-md">
          A Remembrance Day teaching resource +<br />emotional learning experience
        </h1>
      </section>

      {/* Pricing and Poster */}
      <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24" aria-label="Licensing Options">
        {/* Left Col: Pricing Cards */}
        <div className="flex flex-col gap-8">
          {/* Card 1 */}
          <div className="bg-orange-50/50 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm border border-orange-100/50">
            <div className="flex flex-col items-center text-center md:w-1/2">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Single School License</h2>
              <p className="text-5xl font-black mb-2">£200</p>
              <p className="text-sm text-gray-600 mb-6">billed annually</p>
              <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-md font-bold shadow-sm transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-600">
                Buy License
              </button>
            </div>
            <div className="flex flex-col md:w-1/2">
              <p className="text-sm text-gray-500 mb-4 font-medium" id="single-school-includes">Includes:</p>
              <ul className="space-y-4 text-sm text-gray-800" aria-labelledby="single-school-includes">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" aria-hidden="true" /> 6 minutes 2D original animation</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" aria-hidden="true" /> Remembrance Day Assembly Script</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" aria-hidden="true" /> Remembrance Day Teachers guide</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" aria-hidden="true" /> Remembrance Day Student Worksheet</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" aria-hidden="true" /> 24/7 support and consulting</li>
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-orange-50/50 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm border border-orange-100/50">
            <div className="flex flex-col items-center text-center md:w-1/2">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Multi-School / Trust Licence</h2>
              <p className="text-5xl font-black mb-2">£700</p>
              <p className="text-sm text-gray-600 mb-6">billed annually</p>
              <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-md font-bold shadow-sm transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-600">
                Buy License
              </button>
            </div>
            <div className="flex flex-col md:w-1/2">
              <p className="text-sm text-gray-500 mb-4 font-medium" id="multi-school-includes">Includes:</p>
              <ul className="space-y-4 text-sm text-gray-800" aria-labelledby="multi-school-includes">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" aria-hidden="true" /> 6 minutes 2D original animation</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" aria-hidden="true" /> Remembrance Day Assembly Script</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" aria-hidden="true" /> Remembrance Day Teachers guide</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" aria-hidden="true" /> Remembrance Day Student Worksheet</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" aria-hidden="true" /> 24/7 support and consulting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Col: Poster */}
        <div className="flex items-start justify-center md:justify-end">
          <div className="w-full max-w-[400px] aspect-[3/4] relative rounded-3xl shadow-xl overflow-hidden">
            <Image src="/images/licensing-poster.png" alt="Licensing promotional poster" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>
    </main>
  );
}
