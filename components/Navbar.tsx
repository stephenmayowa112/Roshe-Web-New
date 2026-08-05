"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm">
          <Image src="/images/logo.png" alt="Roshe Studios logo" width={160} height={40} className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-700 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <div className="relative group">
            <button aria-haspopup="true" className="flex items-center gap-1 hover:text-yellow-500 uppercase pb-8 -mb-8 pt-8 -mt-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm">
              FILMS
            </button>
            <div className="absolute left-0 top-full mt-0 w-48 bg-black text-white py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-200 shadow-lg">
              <Link href="/films/remember-me" className="block px-4 py-2 hover:text-yellow-500 text-sm focus:outline-none focus:bg-gray-800">Remember Me</Link>
              <Link href="/films/new-age" className="block px-4 py-2 hover:text-yellow-500 text-sm focus:outline-none focus:bg-gray-800">New Age</Link>
              <Link href="/films/seasonlings" className="block px-4 py-2 hover:text-yellow-500 text-sm focus:outline-none focus:bg-gray-800">Seasonlings</Link>
            </div>
          </div>
          
          <Link href="/shop" className="hover:text-yellow-500 uppercase focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm">SHOP</Link>
          <Link href="/create-with-us" className="hover:text-yellow-500 uppercase focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm">CREATE WITH US</Link>
          <Link href="/licensing" className="hover:text-yellow-500 uppercase focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm">LICENSING</Link>
          
          <div className="relative group">
            <button aria-haspopup="true" className="flex items-center gap-1 hover:text-yellow-500 uppercase pb-8 -mb-8 pt-8 -mt-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm">
              MORE
            </button>
            <div className="absolute right-0 top-full mt-0 w-48 bg-black text-white py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-200 shadow-lg">
              <Link href="/philosophy" className="block px-4 py-2 hover:text-yellow-500 text-sm focus:outline-none focus:bg-gray-800">Our Philosophy</Link>
              <Link href="/about" className="block px-4 py-2 hover:text-yellow-500 text-sm focus:outline-none focus:bg-gray-800">Leadership</Link>
              <Link href="/contact" className="block px-4 py-2 hover:text-yellow-500 text-sm focus:outline-none focus:bg-gray-800">Get in Touch</Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-black text-white flex flex-col px-6 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-2 border-b border-gray-800 pb-4">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Films</span>
            <Link href="/films/remember-me" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500">Remember Me</Link>
            <Link href="/films/new-age" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500">New Age</Link>
            <Link href="/films/seasonlings" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500">Seasonlings</Link>
          </div>
          
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-2 uppercase font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500">Shop</Link>
          <Link href="/create-with-us" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-2 uppercase font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500">Create With Us</Link>
          <Link href="/licensing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-2 border-b border-gray-800 pb-4 uppercase font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500">Licensing</Link>
          
          <div className="flex flex-col space-y-2 pt-2 pb-4">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">More</span>
            <Link href="/philosophy" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500">Our Philosophy</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500">Leadership</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500">Get in Touch</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
