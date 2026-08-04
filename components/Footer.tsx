import Link from 'next/link';
import { Instagram, Linkedin, Youtube, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        <p className="mb-4 text-yellow-500 font-medium">Follow Roshe Studios on:</p>
        <div className="flex items-center gap-4 mb-12 text-yellow-500">
          <Link href="#" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
          <Link href="#" className="hover:text-white transition-colors">
            {/* Custom TikTok icon approximation since lucide doesn't have it natively */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
          </Link>
          <Link href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></Link>
          <Link href="#" className="hover:text-white transition-colors"><Youtube size={20} /></Link>
          <Link href="#" className="hover:text-white transition-colors"><Facebook size={20} /></Link>
          <Link href="#" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
        </div>

        <p className="mb-2 text-yellow-500 font-medium">Contact Us</p>
        <div className="flex items-center justify-center gap-4 mb-12">
          <p><span className="text-yellow-500 font-bold">T</span> +447584834000</p>
          <p><span className="text-yellow-500 font-bold">E</span> roshestudios.com@gmail.com</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 text-yellow-500 font-medium uppercase text-xs tracking-wider">
          <Link href="/films/remember-me" className="hover:text-white transition-colors">FILMS</Link>
          <Link href="/shop" className="hover:text-white transition-colors">SHOP</Link>
          <Link href="/create-with-us" className="hover:text-white transition-colors">CREATE WITH US</Link>
          <Link href="/licensing" className="hover:text-white transition-colors">LICENSING</Link>
          <Link href="/philosophy" className="hover:text-white transition-colors">OUR PHILOSOPHY</Link>
          <Link href="/about" className="hover:text-white transition-colors">LEADERSHIP</Link>
          <Link href="/contact" className="hover:text-white transition-colors">GET IN TOUCH</Link>
        </nav>
      </div>

      <div className="w-full bg-white text-black py-4 text-center text-xs mt-8">
        <p>Reg No. 16696126 England</p>
        <p className="mt-1">© Roshe Studios LTD and its related entities. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
