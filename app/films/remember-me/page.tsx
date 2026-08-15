"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Remember Me',
  description: 'Remember Me is a 4K animated short film created to honour the sacrifices behind every name remembered on Remembrance Day.',
  alternates: { canonical: 'https://roshestudios.co.uk/films/remember-me' },
  openGraph: {
    title: 'Remember Me | Roshe Studios',
    description: 'A 4K animated short film honouring the sacrifices behind every name remembered on Remembrance Day.',
    url: 'https://roshestudios.co.uk/films/remember-me',
    type: 'video.movie',
    images: [{ url: '/images/remember-me-poster.png', width: 1200, height: 900, alt: 'Remember Me movie poster' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remember Me | Roshe Studios',
    images: ['/images/remember-me-poster.png'],
  },
};

const filmSchema = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'Remember Me',
  description: 'A 4K animated short film created to honour the sacrifices behind every name remembered on Remembrance Day.',
  image: 'https://roshestudios.co.uk/images/remember-me-poster.png',
  dateCreated: '2026-11-10',
  director: { '@type': 'Person', name: 'Omobolaji Peter Moses' },
  productionCompany: { '@type': 'Organization', name: 'Roshe Studios' },
  genre: ['Animation', 'Short Film', 'Historical'],
  duration: 'PT6M',
};

// Gallery images from rememberMe folder
const galleryImages = [
  '/images/rememberMe/bg cityview.png',
  '/images/rememberMe/bg close up 2.0.png',
  '/images/rememberMe/bg flashback.3.png',
  '/images/rememberMe/bg flashback.png',
  '/images/rememberMe/bg flashback2.png',
  '/images/rememberMe/bg flashback4.png',
  '/images/rememberMe/bg flashback5.png',
  '/images/rememberMe/bg flashback6.png',
  '/images/rememberMe/bg gorton pub.png',
  '/images/rememberMe/bg passage 1.png',
  '/images/rememberMe/bg passage 2.png',
  '/images/rememberMe/bg passage 3.png',
  '/images/rememberMe/bg scene 1.png',
  '/images/rememberMe/bg scene bus stop 2.0.png',
  '/images/rememberMe/bg top shot.png',
  '/images/rememberMe/bg.png',
  '/images/rememberMe/bg1.png',
  '/images/rememberMe/WhatsApp Image 2026-03-08 at 16.25.13.jpeg'
];

export default function RememberMe() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImage(index);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };
  return (
    <main className="w-full bg-white flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filmSchema) }}
      />

      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-gray-200 overflow-hidden" aria-label="Hero Banner">
        <Image
          src="/images/remember-me-hero.png"
          alt="Remember Me — poppy field hero image"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center pt-20">
          <Image
            src="/images/nowThatYouRemember.png"
            alt="Remember Me title logo"
            width={300}
            height={120}
            className="h-16 md:h-20 mb-8 w-auto object-contain"
            priority
          />
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.eventbrite.co.uk/e/remember-me-private-remembrance-day-short-film-screening-tickets-1997141906203?aff=oddtdtcreator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-500"
            >
              BOOK TICKETS
            </a>
            <a href="/licensing" className="bg-white/80 backdrop-blur-sm border border-white text-black hover:bg-white px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-500">
              BUY LICENSE
            </a>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="w-full md:w-[400px] flex-shrink-0">
          <Image
            src="/images/remember-me-poster.png"
            alt="Remember Me movie poster featuring soldiers"
            width={400}
            height={600}
            className="w-full h-auto object-contain shadow-lg rounded"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center text-gray-900">
          <h1 className="text-4xl font-bold mb-4">Remember Me</h1>
          <div className="mb-6 space-y-1 text-sm">
            <p><span className="font-semibold">Runtime:</span> 6 minutes</p>
            <p><span className="font-semibold">Release Date:</span> 10th November 2026</p>
            <p><span className="font-semibold">Genre:</span> Emotional, Animated Short Film</p>
          </div>
          <div className="space-y-4 text-sm leading-relaxed mb-8">
            <p>Remember Me is a 4K animated short film created to honour the sacrifices behind every name remembered on Remembrance Day.</p>
            <p>Through a powerful, accessible story, the film connects younger audiences with history in a way that is emotional, educational, and lasting.</p>
            <p>We are partnering with sponsors to bring this project to wider audiences through private screenings, school engagement, and community events — ensuring the message of remembrance continues for future generations.</p>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold">Directed By</p>
              <p>Omobolaji Peter Moses</p>
            </div>
            <div>
              <p className="font-bold">Produced By</p>
              <p>Roshe Studios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full max-w-7xl mx-auto px-3 pb-20" aria-label="Media Gallery">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Gallery</h2>
          <p className="text-gray-600">Explore behind-the-scenes images from Remember Me</p>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openModal(index)}
              className="aspect-video relative cursor-pointer group bg-gray-200 focus:outline-none focus:ring-4 focus:ring-yellow-500 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              aria-label={`Open gallery image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Remember Me gallery image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Fullscreen Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close gallery"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Main Image */}
            <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={galleryImages[currentIndex]}
                alt={`Remember Me gallery image ${currentIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
                priority={selectedImage === currentIndex}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
