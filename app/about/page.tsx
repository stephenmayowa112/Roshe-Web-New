import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Roshe Studios Limited is a registered animation company based in England and Wales, creating purposeful animated short films and series.',
  alternates: { canonical: 'https://roshestudios.co.uk/about' },
  openGraph: {
    title: 'About Us | Roshe Studios',
    description: 'Roshe Studios Limited is a registered animation company based in England and Wales.',
    url: 'https://roshestudios.co.uk/about',
  },
};

export default function About() {
  return (
    <main className="w-full bg-white flex flex-col items-center flex-grow">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[30vh] md:h-[40vh] bg-black flex items-center justify-between px-6 md:px-19 mb-20 overflow-hidden" aria-label="About Us Header">
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-medium tracking-wide">
          About Us
        </h1>
        <div className="hidden md:block relative w-48 h-48 lg:w-64 lg:h-64 opacity-80" aria-hidden="true">
          <Image src="/images/contactusLogo.png" alt="Roshe Studios mascot logo" fill sizes="(max-width: 1024px) 192px, 256px" className="object-contain" priority />
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto px-3 text-center text-gray-800 text-lg md:text-xl space-y-8 py-10">
        <p>This site is owned and operated by Roshe Studios Limited. Registered in England and Wales.</p>
        <p>Company Registration Number: <span className="font-semibold">16696126</span></p>
        <p>Founded: <span className="font-semibold">2024</span></p>
      </section>
    </main>
  );
}
