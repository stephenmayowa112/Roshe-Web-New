import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Roshe Studios logo" width={160} height={40} className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-yellow-500 uppercase pb-8 -mb-8 pt-8 -mt-8">
              FILMS
            </button>
            <div className="absolute left-0 top-full mt-0 w-48 bg-black text-white py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/films/remember-me" className="block px-4 py-2 hover:text-yellow-500 text-sm">Remember Me</Link>
              <Link href="/films/new-age" className="block px-4 py-2 hover:text-yellow-500 text-sm">New Age</Link>
              <Link href="/films/seasonlings" className="block px-4 py-2 hover:text-yellow-500 text-sm">Seasonlings</Link>
            </div>
          </div>
          
          <Link href="/shop" className="hover:text-yellow-500 uppercase">SHOP</Link>
          <Link href="/create-with-us" className="hover:text-yellow-500 uppercase">CREATE WITH US</Link>
          <Link href="/licensing" className="hover:text-yellow-500 uppercase">LICENSING</Link>
          
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-yellow-500 uppercase pb-8 -mb-8 pt-8 -mt-8">
              MORE
            </button>
            <div className="absolute right-0 top-full mt-0 w-48 bg-black text-white py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/philosophy" className="block px-4 py-2 hover:text-yellow-500 text-sm">Our Philosophy</Link>
              <Link href="/about" className="block px-4 py-2 hover:text-yellow-500 text-sm">Leadership</Link>
              <Link href="/contact" className="block px-4 py-2 hover:text-yellow-500 text-sm">Get in Touch</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
