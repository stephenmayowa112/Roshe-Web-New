import Link from 'next/link';
import { Instagram, Linkedin, Youtube, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="mb-4 text-yellow-500 font-medium">Follow Roshe Studios on:</h2>
        <div className="flex items-center gap-4 mb-12 text-yellow-500">
          <Link href="#" aria-label="Instagram" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"><Instagram size={20} /></Link>
          <Link href="#" aria-label="TikTok" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1">
            {/* Custom TikTok icon approximation since lucide doesn't have it natively */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
          </Link>
          <Link href="#" aria-label="LinkedIn" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"><Linkedin size={20} /></Link>
          <Link href="#" aria-label="YouTube" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"><Youtube size={20} /></Link>
          <Link href="#" aria-label="Facebook" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"><Facebook size={20} /></Link>
          <Link href="#" aria-label="Twitter" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"><Twitter size={20} /></Link>
        </div>

        <address className="not-italic flex flex-col items-center justify-center">
          <p className="mb-2 text-yellow-500 font-medium">Contact Us</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-12">
            <p><span className="text-yellow-500 font-bold">T</span> +447584834000</p>
            <p><span className="text-yellow-500 font-bold">E</span> roshestudios.com@gmail.com</p>
          </div>
        </address>

        <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 text-yellow-500 font-medium uppercase text-xs tracking-wider">
          <Link href="/films/remember-me" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded px-1">FILMS</Link>
          <Link href="/shop" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded px-1">SHOP</Link>
          <Link href="/create-with-us" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded px-1">CREATE WITH US</Link>
          <Link href="/licensing" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded px-1">LICENSING</Link>
          <Link href="/philosophy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded px-1">OUR PHILOSOPHY</Link>
          <Link href="/about" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded px-1">LEADERSHIP</Link>
          <Link href="/contact" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded px-1">GET IN TOUCH</Link>
        </nav>
        <div className="text-center text-xs text-gray-400 mt-4 pb-4">
          <p>Reg No. 16696126 England</p>
          <p className="mt-1">© Roshe Studios LTD and its related entities. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
