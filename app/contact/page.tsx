import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Roshe Studios, based in Stockport, Manchester, UK.',
};

export default function Contact() {
  return (
    <main className="w-full bg-white flex flex-col items-center pb-24">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[30vh] md:h-[40vh] bg-black flex items-center justify-between px-8 md:px-24 mb-20 overflow-hidden" aria-label="Contact Us Header">
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-medium tracking-wide">
          Get in Touch
        </h1>
        <div className="hidden md:block relative w-48 h-48 lg:w-64 lg:h-64 opacity-80" aria-hidden="true">
          <Image src="/images/philosophy-hero.png" alt="Roshe Studios mascot logo" fill className="object-contain" referrerPolicy="no-referrer" priority />
        </div>
      </section>

      {/* Content */}
      <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16" aria-label="Contact Form and Location">
        {/* Left Image */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-[450px] aspect-[4/5] relative overflow-hidden rounded-[2rem] shadow-xl">
            <Image src="/images/contact-image.png" alt="A warmly lit room representing Roshe Studios workspace" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Right Form */}
        <div className="flex flex-col pt-8">
          <h2 className="text-4xl md:text-6xl font-medium mb-12 text-gray-900">Contact Us</h2>
          
          <div className="flex flex-col md:flex-row gap-12">
            <form className="flex-1 space-y-8" aria-label="Contact form">
              <div className="space-y-2 flex flex-col">
                <label htmlFor="fullName" className="text-gray-500 text-lg">Full Name</label>
                <input id="fullName" name="fullName" type="text" required className="w-full border-b-2 border-gray-900 bg-transparent pb-2 focus:outline-none focus:border-yellow-500 focus:ring-0 transition-colors text-lg" aria-required="true" />
              </div>
              <div className="space-y-2 flex flex-col">
                <label htmlFor="email" className="text-gray-500 text-lg">E-mail</label>
                <input id="email" name="email" type="email" required className="w-full border-b-2 border-gray-900 bg-transparent pb-2 focus:outline-none focus:border-yellow-500 focus:ring-0 transition-colors text-lg" aria-required="true" />
              </div>
              <div className="space-y-2 flex flex-col">
                <label htmlFor="message" className="text-gray-500 text-lg">Message</label>
                <input id="message" name="message" type="text" required className="w-full border-b-2 border-gray-900 bg-transparent pb-2 focus:outline-none focus:border-yellow-500 focus:ring-0 transition-colors text-lg" aria-required="true" />
              </div>
              <button type="submit" className="bg-black text-white px-10 py-3 rounded-full font-medium shadow-md hover:bg-gray-800 transition-colors mt-8 focus:outline-none focus:ring-4 focus:ring-yellow-500">
                Send Message
              </button>
            </form>

            <address className="md:w-48 text-gray-900 text-lg pt-2 not-italic">
              <p className="font-bold mb-1">Based in</p>
              <p>Stockport,</p>
              <p>Manchester, UK.</p>
            </address>
          </div>
        </div>
      </section>
    </main>
  );
}
