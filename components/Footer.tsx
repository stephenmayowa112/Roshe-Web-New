import Link from 'next/link';
import { Instagram, Linkedin, Youtube, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-sm">
      {/* Black section with blue top border */}
      <div className="bg-black text-white pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-3 flex flex-col items-center text-center">

          {/* Follow */}
          <p className="mb-4 text-yellow-500 font-medium">Follow Roshe Studios on:</p>
          <div className="flex items-center gap-5 mb-10 text-yellow-500">
            <Link href="https://www.instagram.com/roshe_studios?igsh=MWRpM3k2Zmtwd2xmdA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
            <Link href="#" aria-label="TikTok" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </Link>
            <Link href="https://www.linkedin.com/company/roshestudios/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors"><Linkedin size={20} /></Link>
            <Link href="#" aria-label="YouTube" className="hover:text-white transition-colors"><Youtube size={20} /></Link>
            <Link href="#" aria-label="Facebook" className="hover:text-white transition-colors"><Facebook size={20} /></Link>
            <Link href="#" aria-label="Twitter / X" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
          </div>

          {/* Contact */}
          <p className="mb-3 text-yellow-500 font-medium">Contact Us</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 mb-10">
            <p><span className="text-yellow-500 font-bold">T</span> +447584834000</p>
            <p><span className="text-yellow-500 font-bold">E</span> roshestudios.com@gmail.com</p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-yellow-500 font-medium uppercase text-xs tracking-wider">
            <Link href="/films/remember-me" className="hover:text-white transition-colors">FILMS</Link>
            <Link href="/shop" className="hover:text-white transition-colors">SHOP</Link>
            <Link href="/create-with-us" className="hover:text-white transition-colors">CREATE WITH US</Link>
            <Link href="/licensing" className="hover:text-white transition-colors">LICENSING</Link>
            <Link href="/philosophy" className="hover:text-white transition-colors">OUR PHILOSOPHY</Link>
            <Link href="/about" className="hover:text-white transition-colors">ABOUT US</Link>
            <Link href="/contact" className="hover:text-white transition-colors">GET IN TOUCH</Link>
          </nav>

        </div>
      </div>

      {/* White copyright strip */}
      <div className="bg-white text-gray-800 py-4 text-center text-xs">
        <p>Reg No. 16696126 England</p>
        <p className="mt-1">© Roshe Studios LTD and its related entities. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
