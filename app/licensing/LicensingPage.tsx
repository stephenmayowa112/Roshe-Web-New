"use client";

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import CheckoutButton from '@/components/CheckoutButton';
import Link from 'next/link';

const includes = [
  '6 minutes 2D original animation',
  'Remembrance Day Assembly Script',
  'Remembrance Day Teachers guide',
  'Remembrance Day Student Worksheet',
  '24/7 support and consulting',
];

export default function LicensingPage() {
  return (
    <main className="w-full bg-white flex flex-col">
      
      {/* Top Notification Bar */}
      <div className="w-full bg-[#FFF9E4] py-3 px-6 text-center">
        <span className="text-black font-medium">
          <strong>Animation</strong> makes Remembrance Day learning engaging and memorable.
        </span>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-[#f5d461]">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-6">
              <span className="inline-block w-full">A Remembrance Day teaching</span>
              <span className="inline-block w-full">resource + emotional learning</span>
              <span className="inline-block w-full">experience</span>
            </div>
            <div className="text-lg text-black mb-8 leading-relaxed max-w-lg">
              <div>Curriculum-aligned animation with ready-to-use</div>
              <div>resources to inspire and engage primary pupils.</div>
            </div>
            <div className="flex gap-4">
              <Link 
                href="#pricing"
                className="bg-[#F6BF02] text-black px-6 py-3 rounded font-semibold hover:bg-[#e6b100] transition-colors inline-flex items-center gap-2"
              >
                Select a license
                <span className="text-lg">→</span>
              </Link>
              <Link 
                href="/studio/signup"
                className="bg-[#F6BF02] text-black px-6 py-3 rounded font-semibold hover:bg-[#e6b100] transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-black p-2 rounded-lg">
                <Image
                  src="/images/licensing1.png"
                  alt="Three students smiling in classroom"
                  width={600}
                  height={400}
                  className="rounded object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Icons Section */}
      <section className="w-full bg-[#f5d461]">
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-5 gap-8 justify-items-center">
            {/* Animated short film */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-black leading-tight">Animated<br />short film</h3>
            </div>

            {/* Assembly script */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-black leading-tight">Assembly<br />script</h3>
            </div>

            {/* Teachers guide */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12S12 10.2 12 8S13.8 4 16 4ZM16 14C20.42 14 24 15.79 24 18V20H8V18C8 15.79 11.58 14 16 14Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-black leading-tight">Teachers<br />guide</h3>
            </div>

            {/* Student worksheet */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1S9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4S12.55 5 12 5S11 4.55 11 4S11.45 3 12 3ZM19 19H5V5H7V7H17V5H19V19Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-black leading-tight">Student<br />worksheet</h3>
            </div>

            {/* Student worksheet (duplicate) */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                  <path d="M19.4 15C18.8 16.9 17.1 18.5 15 19.1L16.4 21.5C16.8 22.2 16.5 23.1 15.8 23.5C15.1 23.9 14.2 23.6 13.8 22.9L12.4 20.5C12.3 20.5 12.2 20.5 12.1 20.5C11.9 20.5 11.8 20.5 11.6 20.5L10.2 22.9C9.8 23.6 8.9 23.9 8.2 23.5C7.5 23.1 7.2 22.2 7.6 21.5L9 19.1C6.9 18.5 5.2 16.9 4.6 15H2C1.4 15 1 14.6 1 14S1.4 13 2 13H4.6C5.2 11.1 6.9 9.5 9 8.9L7.6 6.5C7.2 5.8 7.5 4.9 8.2 4.5C8.9 4.1 9.8 4.4 10.2 5.1L11.6 7.5C11.8 7.5 11.9 7.5 12.1 7.5C12.2 7.5 12.3 7.5 12.4 7.5L13.8 5.1C14.2 4.4 15.1 4.1 15.8 4.5C16.5 4.9 16.8 5.8 16.4 6.5L15 8.9C17.1 9.5 18.8 11.1 19.4 13H22C22.6 13 23 13.4 23 14S22.6 15 22 15H19.4Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-black leading-tight">Student<br />worksheet</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting the National Curriculum */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Supporting the National Curriculum
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our animated short film supports primary learning through History, English, Art & Design, Music, 
              Computing and PSHE. It helps pupils explore Remembrance Day, develop empathy, strengthen 
              communication and creative skills, and understand history through engaging visual storytelling.
            </p>
          </div>
          
          {/* Right Image */}
          <div className="lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/licensing-poster.png"
                alt="Students in classroom learning environment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our School Subscription */}
      <section className="w-full py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/licensing-poster.png"
                alt="Remember Me animated character in educational setting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Right Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Our School Subscription
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Enjoy access to the animated film, classroom resources, lesson activities, SEND support 
              materials and curriculum-aligned learning tools — all designed to make Remembrance Day engaging, 
              meaningful and accessible for every pupil.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With our School Subscription, your school can access everything you need to bring the story to 
              life — and more.
            </p>
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
            Pick up the best plan
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="flex flex-col gap-6 lg:flex-1">

              {/* Card 1 */}
              <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-1">
                <div className="flex flex-col sm:flex-row w-full flex-1">
                  {/* Cream left panel */}
                  <div className="flex flex-col items-center justify-center bg-[#fffdf0] px-6 py-8 text-center sm:w-[280px] shrink-0">
                    <h3 className="text-base font-bold text-gray-900 mb-3">Single School License</h3>
                    <p className="text-6xl font-black text-gray-900 leading-none mb-2">£200</p>
                    <p className="text-sm text-gray-500 mb-6">billed annually</p>
                    <CheckoutButton 
                      licenseType="single"
                      className="w-full bg-[#f5bf05] hover:bg-[#e6b100] text-black py-3 rounded-xl font-bold text-base transition-colors focus:outline-none"
                    >
                      Buy License
                    </CheckoutButton>
                  </div>
                  {/* White right panel */}
                  <div className="bg-white px-6 py-8 flex flex-col justify-center flex-1">
                    <p className="text-sm text-gray-500 mb-4">Includes:</p>
                    <ul className="space-y-3" aria-label="Single School License includes">
                      {includes.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-gray-800">
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#f5bf05] fill-[#f5bf05] stroke-white" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-1">
                <div className="flex flex-col sm:flex-row w-full flex-1">
                  {/* Cream left panel */}
                  <div className="flex flex-col items-center justify-center bg-[#fffdf0] px-6 py-8 text-center sm:w-[280px] shrink-0">
                    <h3 className="text-base font-bold text-gray-900 mb-3">Multi-School / Trust Licence</h3>
                    <p className="text-6xl font-black text-gray-900 leading-none mb-2">£700</p>
                    <p className="text-sm text-gray-500 mb-6">billed annually</p>
                    <CheckoutButton 
                      licenseType="multi"
                      className="w-full bg-[#f5bf05] hover:bg-[#e6b100] text-black py-3 rounded-xl font-bold text-base transition-colors focus:outline-none"
                    >
                      Buy License
                    </CheckoutButton>
                  </div>
                  {/* White right panel */}
                  <div className="bg-white px-6 py-8 flex flex-col justify-center flex-1">
                    <p className="text-sm text-gray-500 mb-4">Includes:</p>
                    <ul className="space-y-3" aria-label="Multi-School License includes">
                      {includes.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-gray-800">
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#f5bf05] fill-[#f5bf05] stroke-white" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Poster — stretches to match height of both cards */}
            <div className="flex-shrink-0 w-full lg:w-[380px] flex self-stretch">
              <div className="w-full relative rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/images/licensing-poster.png"
                  alt="Remember Me educational poster featuring soldiers in a classroom setting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}