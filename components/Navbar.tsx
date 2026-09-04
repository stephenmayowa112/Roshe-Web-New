"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Ensure component is mounted before checking pathname to avoid hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isLicensingPage = mounted && pathname === '/licensing';

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded-sm">
          {isLicensingPage ? (
            <div className="flex items-center">
              <Image 
                src="/images/newRosheLogo.png" 
                alt="Roshe Studios" 
                width={32} 
                height={32} 
                className="mr-3" 
              />
              <span className="font-bold text-lg text-black">ROSHESTUDIOS</span>
            </div>
          ) : (
            <Image src="/images/logo.png" alt="Roshe Studios logo" width={160} height={40} className="h-8 w-auto object-contain" />
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-yellow-500 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        {isLicensingPage ? (
          <div className="hidden md:flex items-center gap-4">
            <Link href="/studio" className="text-gray-600 hover:text-black">
              Studio
            </Link>
            <Link 
              href="/studio/signin"
              className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button aria-haspopup="true" className="flex items-center gap-1 font-normal text-base leading-6 uppercase text-black hover:text-yellow-500 pb-8 -mb-8 pt-8 -mt-8 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded-sm tracking-normal">
                FILMS
              </button>
              <div className="absolute left-0 top-full mt-0 w-56 bg-black text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-200 shadow-xl overflow-hidden">
                <div className="h-3 bg-yellow-400" />
                <Link href="/films/remember-me" className="block px-5 py-4 text-white text-lg font-normal hover:bg-yellow-400 hover:text-black outline-none focus-visible:bg-yellow-400 focus-visible:text-black transition-colors">Remember Me</Link>
                <Link href="/films/new-age" className="block px-5 py-4 text-white text-lg font-normal hover:bg-yellow-400 hover:text-black outline-none focus-visible:bg-yellow-400 focus-visible:text-black transition-colors">New Age</Link>
                <Link href="/films/seasonlings" className="block px-5 py-4 text-white text-lg font-normal hover:bg-yellow-400 hover:text-black outline-none focus-visible:bg-yellow-400 focus-visible:text-black transition-colors">Seasonlings</Link>
              </div>
            </div>

            <Link href="/create-with-us" className="font-normal text-base leading-6 uppercase text-black hover:text-yellow-500 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded-sm tracking-normal">CREATE WITH US</Link>
            <Link href="/licensing" className="font-normal text-base leading-6 uppercase text-black hover:text-yellow-500 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded-sm tracking-normal">LICENSING</Link>

            <div className="relative group">
              <button aria-haspopup="true" className="flex items-center gap-1 font-normal text-base leading-6 uppercase text-black hover:text-yellow-500 pb-8 -mb-8 pt-8 -mt-8 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded-sm tracking-normal">
                MORE
              </button>
              <div className="absolute right-0 top-full mt-0 w-56 bg-black text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-200 shadow-xl overflow-hidden">
                <div className="h-3 bg-yellow-400" />
                <Link href="/philosophy" className="block px-5 py-4 text-white text-lg font-normal hover:bg-yellow-400 hover:text-black outline-none focus-visible:bg-yellow-400 focus-visible:text-black transition-colors">Our Philosophy</Link>
                <Link href="/about" className="block px-5 py-4 text-white text-lg font-normal hover:bg-yellow-400 hover:text-black outline-none focus-visible:bg-yellow-400 focus-visible:text-black transition-colors">About Us</Link>
                <Link href="/contact" className="block px-5 py-4 text-white text-lg font-normal hover:bg-yellow-400 hover:text-black outline-none focus-visible:bg-yellow-400 focus-visible:text-black transition-colors">Get in Touch</Link>
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-black text-white flex flex-col px-5 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {isLicensingPage ? (
            <div className="space-y-4">
              <Link href="/studio" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-2 uppercase font-medium outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">Studio</Link>
              <Link href="/studio/signin" onClick={() => setIsMobileMenuOpen(false)} className="bg-white text-black px-4 py-2 rounded font-medium">Sign In</Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col space-y-2 border-b border-gray-800 pb-4">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Films</span>
                <Link href="/films/remember-me" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">Remember Me</Link>
                <Link href="/films/new-age" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">New Age</Link>
                <Link href="/films/seasonlings" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">Seasonlings</Link>
              </div>

              <Link href="/create-with-us" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-2 uppercase font-medium outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">Create With Us</Link>
              <Link href="/licensing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-2 border-b border-gray-800 pb-4 uppercase font-medium outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">Licensing</Link>

              <div className="flex flex-col space-y-2 pt-2 pb-4">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">More</span>
                <Link href="/philosophy" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">Our Philosophy</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">About Us</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">Get in Touch</Link>
              </div>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
