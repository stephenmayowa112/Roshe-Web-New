import Image from 'next/image';

export default function CreateWithUs() {
  return (
    <div className="w-full bg-white flex flex-col items-center pb-20">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[30vh] md:h-[40vh] flex items-center justify-center bg-gray-200 overflow-hidden mb-16">
        <Image src="/images/home-hero.png" alt="create-hero.png" fill className="object-cover mix-blend-multiply opacity-80 bg-green-900" referrerPolicy="no-referrer" />
        <h1 className="relative z-10 text-white text-4xl md:text-5xl font-medium drop-shadow-md">
          Create With Us
        </h1>
      </section>

      {/* Intro text */}
      <section className="w-full max-w-4xl mx-auto px-4 text-center mb-16">
        <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-medium">
          Let’s bring your vision to life with our animation expertise.<br className="hidden md:block"/>
          From feature films, to series, explainers, animated ads, and brand storytelling.
        </p>
      </section>

      {/* Banners */}
      <section className="w-full max-w-7xl mx-auto flex flex-col mb-24">
        {/* Feature Film */}
        <div className="relative h-48 md:h-64 w-full flex items-center bg-gray-300 overflow-hidden">
          <Image src="/images/remember-me-hero.png" alt="create-feature.png" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
          <div className="relative z-10 px-8 md:px-20 text-white drop-shadow-md">
            <h2 className="text-3xl font-bold mb-2">Feature Film</h2>
            <p className="text-lg">Showcase your story with high-quality animation.</p>
          </div>
        </div>
        {/* Short Film */}
        <div className="relative h-48 md:h-64 w-full flex items-center bg-gray-300 overflow-hidden">
          <Image src="/images/new-age-hero.png" alt="create-short.png" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
          <div className="relative z-10 px-8 md:px-20 text-white drop-shadow-md">
            <h2 className="text-3xl font-bold mb-2">Short Film</h2>
            <p className="text-lg">Perfect for quick narratives that captivate.</p>
          </div>
        </div>
        {/* TV Series */}
        <div className="relative h-48 md:h-64 w-full flex items-center bg-gray-300 overflow-hidden">
          <Image src="/images/seasonlings-hero.png" alt="create-series.png" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
          <div className="relative z-10 px-8 md:px-20 text-white drop-shadow-md">
            <h2 className="text-3xl font-bold mb-2">TV Series</h2>
            <p className="text-lg">Develop an ongoing series that entertains and engages.</p>
          </div>
        </div>
      </section>

      {/* Form and Why Partner */}
      <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <h3 className="text-xl font-bold mb-8 pr-12 text-gray-900 leading-tight">
            Interested in creating Authentic stories with us? Send us a message to get started
          </h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-gray-500" />
              <input type="text" placeholder="Last Name" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-gray-500" />
            </div>
            <input type="email" placeholder="Email" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-gray-500" />
            <textarea placeholder="Tell us about your project" rows={6} className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-gray-500 resize-none"></textarea>
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-3 rounded-sm font-semibold transition-colors shadow-sm">
              Send
            </button>
          </form>
        </div>

        {/* Why Partner */}
        <div className="pt-2">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Why partner with Magic Carpet Studios?
          </h3>
          <ul className="space-y-4 text-lg font-medium text-gray-800 list-disc pl-6">
            <li>End-to-end production pipeline</li>
            <li>Co-production friendly</li>
            <li>Proven partners</li>
            <li>Smooth feedback loop</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
