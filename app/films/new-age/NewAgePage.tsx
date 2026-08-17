"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const filmSchema = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'New Age',
  description: 'An African animated short film produced by a worldwide collaboration of over 200 creatives from 30+ countries.',
  image: 'https://roshestudios.co.uk/images/new-age-hero.png',
  director: { '@type': 'Person', name: 'Omobolaji Peter Moses' },
  productionCompany: { '@type': 'Organization', name: 'Roshe Studios' },
  genre: ['Animation', 'Short Film', 'Sci-fi'],
  duration: 'PT15M',
};

// Gallery images from newAge folder
const galleryImages = [
  '/images/newAge/dwedfge.jpg.jpeg',
  '/images/newAge/dwedfgg.jpg.jpeg',
  '/images/newAge/WhatsApp%20Image%202025-01-22%20at%2019.04.12_3502f035.jpg.jpeg',
  '/images/newAge/WhatsApp%20Image%202025-01-24%20at%2012.44.40_35ea518d.jpg.jpeg',
  '/images/newAge/WhatsApp%20Image%202025-02-17%20at%2019.06.46_c425e72d.jpg.jpeg',
  '/images/newAge/WhatsApp%20Image%202025-02-17%20at%2022.56.06_7630ab65.jpg.jpeg',
];

export default function NewAgePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <section className="w-full max-w-7xl mx-auto relative h-[40vh] md:h-[50vh] bg-gray-200 overflow-hidden" aria-label="Hero Banner">
        <Image
          src="/images/new-age-hero.png"
          alt="New Age — futuristic 3D animated scene"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          priority
        />
      </section>

      {/* Details Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="w-full md:w-[400px] aspect-[3/4] relative flex-shrink-0">
          <Image
            src="/images/card-new-age.png"
            alt="New Age movie poster"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover shadow-lg rounded"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center text-gray-900">
          <h1 className="text-4xl font-bold mb-4">New Age</h1>
          <div className="mb-8 space-y-1 text-sm">
            <p><span className="font-semibold">Runtime:</span> 15 minutes</p>
            <p><span className="font-semibold">Status:</span> In Production</p>
            <p><span className="font-semibold">Genre:</span> Sci-fi, Animated Short Film</p>
          </div>
          <h2 className="text-2xl font-bold mb-4">A Worldwide Collaboration</h2>
          <div className="space-y-4 text-sm leading-relaxed mb-8">
            <p>New Age is produced by the brave effort and voluntary collaboration of a team of creatives. New Age shows the power of what is possible when a team of creatives come together to champion a selfless course. Through a unique worldwide collaboration that includes scores of volunteers we are able to produce a world class African animation story.</p>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold">Directed By</p>
              <p>Omobolaji Peter Moses</p>
            </div>
            <div>
              <p className="font-bold">Produced By</p>
              <p>200+ Artists from over 30+ Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full max-w-7xl mx-auto px-3 pb-20" aria-label="Media Gallery">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Gallery</h2>
          <p className="text-gray-600">Explore behind-the-scenes images from New Age</p>
        </div>
        
        {/* Single Large Image with Navigation */}
        <div className="mx-auto" style={{ maxWidth: '1032px' }}>
          <div className="relative group">
            {/* Main Gallery Image */}
            <button
              onClick={openModal}
              className="relative cursor-pointer group bg-gray-200 focus:outline-none focus:ring-4 focus:ring-yellow-500 rounded-lg overflow-hidden w-full hover:scale-[1.02] transition-transform duration-300"
              style={{ aspectRatio: '16 / 10' }}
              aria-label={`Open gallery image ${currentIndex + 1} in fullscreen`}
            >
              <Image
                src={galleryImages[currentIndex]}
                alt={`New Age gallery image ${currentIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover group-hover:opacity-90 transition-opacity"
              />
              
              {/* Fullscreen Icon Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Image Counter */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              {currentIndex + 1} of {galleryImages.length}
            </span>
          </div>
        </div>

        {/* Fullscreen Modal */}
        {isModalOpen && (
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
                alt={`New Age gallery image ${currentIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
                priority
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}