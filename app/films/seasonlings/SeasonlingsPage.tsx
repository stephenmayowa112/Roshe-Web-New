"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const seriesSchema = {
  '@context': 'https://schema.org',
  '@type': 'TVSeries',
  name: 'Seasonlings',
  description: 'A mythic animated drama that reimagines Spring, Summer, Autumn, and Winter as immortal siblings tasked with maintaining the balance between the divine realm and the human world.',
  image: 'https://roshestudios.co.uk/images/seasonlings-poster.png',
  numberOfEpisodes: 7,
  director: { '@type': 'Person', name: 'Omobolaji Peter Moses' },
  productionCompany: { '@type': 'Organization', name: 'Roshe Studios' },
  genre: ['Animation', 'Fantasy', 'Drama', 'Action', 'Adventure'],
};

// Gallery images from SEASONLINNGS folder - only image files, excluding videos
const galleryImages = [
  '/images/SEASONLINNGS/2%20Market%20street%20BG%20(1).png',
  '/images/SEASONLINNGS/2%20Market%20street%20top.png',
  '/images/SEASONLINNGS/9uygfdsf.jpeg',
  '/images/SEASONLINNGS/cavemen%20xter%20(1).jpg.jpeg',
  '/images/SEASONLINNGS/cdrtghn.jpeg',
  '/images/SEASONLINNGS/IMG_0858.JPG.jpeg',
  '/images/SEASONLINNGS/market%20scene.png',
  '/images/SEASONLINNGS/mjuytfv.jpeg',
  '/images/SEASONLINNGS/mngr.jpeg',
  '/images/SEASONLINNGS/okjhgf.jpeg',
  '/images/SEASONLINNGS/Picture1.png',
  '/images/SEASONLINNGS/WhatsApp%20Image%202022-03-04%20at%203.10.03%20PM.jpeg',
  '/images/SEASONLINNGS/WhatsApp%20Image%202024-08-08%20at%2018.56.59.jpeg',
  '/images/SEASONLINNGS/WhatsApp%20Image%202024-12-12%20at%2017.30.20_3e4803cc.jpg.jpeg',
  '/images/SEASONLINNGS/WhatsApp%20Image%202024-12-12%20at%2017.30.24_935aa4ef.jpg.jpeg',
  '/images/SEASONLINNGS/WhatsApp%20Image%202026-01-16%20at%2016.37.09%20(1).jpeg',
  '/images/SEASONLINNGS/WhatsApp%20Image%202026-01-23%20at%2017.19.26.jpeg',
  '/images/SEASONLINNGS/WhatsApp%20Image%202026-01-29%20at%2017.09.29%20(2).jpeg',
  '/images/SEASONLINNGS/WhatsApp%20Image%202026-02-01%20at%2015.43.29.jpeg',
  '/images/SEASONLINNGS/WhatsApp%20Image%202026-05-09%20at%2017.49.40.jpeg',
  '/images/SEASONLINNGS/WhatsApp%20Image%202026-07-14%20at%2019.31.51.jpeg',
  '/images/SEASONLINNGS/WhatsApp%20Image%202026-08-06%20at%2012.49.25.jpeg',
  '/images/SEASONLINNGS/wise%20men.png',
  '/images/SEASONLINNGS/wisemen.png',
];

export default function SeasonlingsPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesSchema) }}
      />

      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[40vh] md:h-[50vh] flex items-end justify-center pb-12 bg-gray-200 overflow-hidden" aria-label="Hero Banner">
        <Image
          src="/images/seasonlings-hero.png"
          alt="Seasonlings — fantasy landscape hero image"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-top"
          priority
        />
        <div className="relative z-10">
          <button className="bg-white text-black hover:bg-gray-100 px-10 py-3 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-500">
            Invest Now
          </button>
        </div>
      </section>

      {/* Details Section */}
      <section className="w-full max-w-5xl mx-auto px-3 py-20 flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="w-full md:w-[400px] flex-shrink-0 relative min-h-[350px]">
          <Image
            src="/images/seasonlings-poster.png"
            alt="Seasonlings series poster"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-contain p-4"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center text-gray-900">
          <h1 className="text-4xl font-bold mb-4">Seasonlings Season 1</h1>
          <div className="mb-6 space-y-1 text-sm">
            <p><span className="font-semibold">Episodes:</span> 7 Episodes</p>
            <p><span className="font-semibold">Status:</span> In development</p>
            <p><span className="font-semibold">Genre:</span> Fantasy, Action, Adventure, Drama, Cli-fi</p>
          </div>
          <div className="space-y-4 text-sm leading-relaxed mb-8">
            <p>Seasonlings is a mythic animated drama that reimagines Spring, Summer, Autumn, and Winter as immortal siblings tasked with maintaining the balance between the divine realm, Ecos and the human world. Created by Mother Nature herself, the Seasonlings govern the natural cycles that sustain life on Earth. Beneath their divine purpose lies centuries of resentment, jealousy, and emotional neglect. When Aurelia, the embodiment of Autumn, receives a vision of impending doom for both worlds, the cracks beneath the surface of her relationships begin to reemerge. Sibling rivalries turn into open war, and power-hungry alliances threaten life. The world as they know it is falling apart, and their war is not the only enemy. The series examines love, identity, and the complexity of relationships through the eyes of painfully human immortals.</p>
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
      <section className="w-full max-w-7xl mx-auto px-2 pb-20" aria-label="Media Gallery">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Gallery</h2>
          <p className="text-gray-600">Explore behind-the-scenes images from Seasonlings</p>
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
                alt={`Seasonlings gallery image ${currentIndex + 1}`}
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
                alt={`Seasonlings gallery image ${currentIndex + 1}`}
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