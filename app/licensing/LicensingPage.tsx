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
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-[2.25rem] xl:text-[2.5rem] font-bold text-black mb-6 leading-tight">
              <span className="block lg:whitespace-nowrap">A Remembrance Day teaching</span>
              <span className="block lg:whitespace-nowrap">resource + emotional learning</span>
              <span className="block lg:whitespace-nowrap">experience</span>
            </h1>
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
                <Image
                  src="/images/icon1.png"
                  alt="Animated short film icon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-black leading-tight">Animated<br />short film</h3>
            </div>

            {/* Assembly script */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <Image
                  src="/images/icon2.png"
                  alt="Assembly script icon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-black leading-tight">Assembly<br />script</h3>
            </div>

            {/* Teachers guide */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <Image
                  src="/images/icon3.png"
                  alt="Teachers guide icon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-black leading-tight">Teachers<br />guide</h3>
            </div>

            {/* Student worksheet */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <Image
                  src="/images/icon4.png"
                  alt="Student worksheet icon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm text-black leading-tight">Student<br />worksheet</h3>
            </div>

            {/* Student worksheet (second one) */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <Image
                  src="/images/icon5.png"
                  alt="Student worksheet icon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
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
                src="/images/Rectanglelicen.png"
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
                src="/images/Rectanglelicenses.png"
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Single School License Row */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Single School License Card */}
              <div className="bg-[#FFF9E4] rounded-2xl p-8 md:w-64 flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-black mb-2">Single School</h3>
                  <h3 className="text-lg font-bold text-black mb-4">License</h3>
                  <div className="text-5xl font-black text-black mb-2">£200</div>
                  <p className="text-sm text-gray-600 mb-6">billed annually</p>
                  <CheckoutButton 
                    licenseType="single"
                    className="w-full bg-[#F6BF02] hover:bg-[#e6b100] text-black py-3 rounded-lg font-bold text-sm transition-colors"
                  >
                    Buy License
                  </CheckoutButton>
                </div>
              </div>
              
              {/* Single School Includes */}
              <div className="flex-1 py-4">
                <p className="text-sm text-gray-600 mb-4 font-medium">Includes:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-black">
                    <div className="w-5 h-5 bg-[#F6BF02] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>6 minutes 2D original animation</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-black">
                    <div className="w-5 h-5 bg-[#F6BF02] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Remembrance Day Assembly Script</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-black">
                    <div className="w-5 h-5 bg-[#F6BF02] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Remembrance Day Teachers guide</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-black">
                    <div className="w-5 h-5 bg-[#F6BF02] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Remembrance Day Student Worksheet</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-black">
                    <div className="w-5 h-5 bg-[#F6BF02] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>24/7 support and consulting</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Multi-School License Row */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Multi-School License Card */}
              <div className="bg-[#FFF9E4] rounded-2xl p-8 md:w-64 flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-black mb-2">Multi-School /</h3>
                  <h3 className="text-lg font-bold text-black mb-4">Trust Licence</h3>
                  <div className="text-5xl font-black text-black mb-2">£700</div>
                  <p className="text-sm text-gray-600 mb-6">billed annually</p>
                  <CheckoutButton 
                    licenseType="multi"
                    className="w-full bg-[#F6BF02] hover:bg-[#e6b100] text-black py-3 rounded-lg font-bold text-sm transition-colors"
                  >
                    Buy License
                  </CheckoutButton>
                </div>
              </div>
              
              {/* Multi-School Includes */}
              <div className="flex-1 py-4">
                <p className="text-sm text-gray-600 mb-4 font-medium">Includes:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-black">
                    <div className="w-5 h-5 bg-[#F6BF02] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>6 minutes 2D original animation</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-black">
                    <div className="w-5 h-5 bg-[#F6BF02] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Remembrance Day Assembly Script</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-black">
                    <div className="w-5 h-5 bg-[#F6BF02] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Remembrance Day Teachers guide</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-black">
                    <div className="w-5 h-5 bg-[#F6BF02] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Remembrance Day Student Worksheet</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-black">
                    <div className="w-5 h-5 bg-[#F6BF02] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>24/7 support and consulting</span>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}