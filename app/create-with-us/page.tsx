import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create With Us',
  description: 'Partner with Roshe Studios to bring your vision to life through feature films, short films, TV series, and animated ads.',
};

export default function CreateWithUs() {
  return (
    <main className="w-full bg-white flex flex-col items-center pb-20">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[30vh] md:h-[40vh] flex items-center justify-center bg-gray-200 overflow-hidden mb-16" aria-label="Create With Us Header">
        <Image src="/images/create-hero.png" alt="Creative abstract banner background" fill className="object-cover mix-blend-multiply opacity-80 bg-green-900" referrerPolicy="no-referrer" priority />
        <h1 className="relative z-10 text-white text-4xl md:text-5xl font-medium drop-shadow-md">
          Create With Us
        </h1>
      </section>

      {/* Intro text */}
      <section className="w-full max-w-4xl mx-auto px-4 text-center mb-16" aria-label="Introduction">
        <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-medium">
          Let’s bring your vision to life with our animation expertise.<br className="hidden md:block"/>
          From feature films, to series, explainers, animated ads, and brand storytelling.
        </p>
      </section>

      {/* Banners */}
      <section className="w-full max-w-7xl mx-auto flex flex-col mb-24" aria-label="Our Services">
        {/* Feature Film */}
        <div className="relative h-48 md:h-64 w-full flex items-center bg-gray-300 overflow-hidden">
          <Image src="/images/create-feature.png" alt="Feature film production showcase" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
          <div className="relative z-10 px-8 md:px-20 text-white drop-shadow-md">
            <h2 className="text-3xl font-bold mb-2">Feature Film</h2>
            <p className="text-lg">Showcase your story with high-quality animation.</p>
          </div>
        </div>
        {/* Short Film */}
        <div className="relative h-48 md:h-64 w-full flex items-center bg-gray-300 overflow-hidden">
          <Image src="/images/create-short.png" alt="Short film production showcase" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
          <div className="relative z-10 px-8 md:px-20 text-white drop-shadow-md">
            <h2 className="text-3xl font-bold mb-2">Short Film</h2>
            <p className="text-lg">Perfect for quick narratives that captivate.</p>
          </div>
        </div>
        {/* TV Series */}
        <div className="relative h-48 md:h-64 w-full flex items-center bg-gray-300 overflow-hidden">
          <Image src="/images/create-series.png" alt="TV series production showcase" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
          <div className="relative z-10 px-8 md:px-20 text-white drop-shadow-md">
            <h2 className="text-3xl font-bold mb-2">TV Series</h2>
            <p className="text-lg">Develop an ongoing series that entertains and engages.</p>
          </div>
        </div>
      </section>

      {/* Form and Why Partner */}
      <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16" aria-label="Contact and Partnership Details">
        {/* Form */}
        <div>
          <h2 className="text-xl font-bold mb-8 pr-12 text-gray-900 leading-tight">
            Interested in creating Authentic stories with us? Send us a message to get started
          </h2>
          <form className="space-y-4" aria-label="Project inquiry form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input id="firstName" name="firstName" type="text" placeholder="First Name" required aria-required="true" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500" />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input id="lastName" name="lastName" type="text" placeholder="Last Name" required aria-required="true" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" name="email" type="email" placeholder="Email" required aria-required="true" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500" />
            </div>
            <div>
              <label htmlFor="projectDetails" className="sr-only">Tell us about your project</label>
              <textarea id="projectDetails" name="projectDetails" placeholder="Tell us about your project" rows={6} required aria-required="true" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-y"></textarea>
            </div>
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-3 rounded-sm font-semibold transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-yellow-600">
              Send
            </button>
          </form>
        </div>

        {/* Why Partner */}
        <div className="pt-2">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Why partner with Roshe Studios?
          </h2>
          <ul className="space-y-4 text-lg font-medium text-gray-800 list-disc pl-6">
            <li>End-to-end production pipeline</li>
            <li>Co-production friendly</li>
            <li>Proven partners</li>
            <li>Smooth feedback loop</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
