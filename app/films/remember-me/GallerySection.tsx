"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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

export default function GallerySection() {
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
  );
}