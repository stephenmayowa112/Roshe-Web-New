import Image from 'next/image';

export default function Shop() {
  return (
    <div className="w-full bg-white flex flex-col items-center flex-grow justify-center py-20">
      <h1 className="text-4xl font-bold mb-4">Shop</h1>
      <p className="text-lg text-gray-600 mb-8">Coming Soon...</p>
      
      {/* Shop Banner from Home Page */}
      <section className="w-full max-w-7xl mx-auto relative h-[400px] overflow-hidden flex items-center bg-yellow-400">
        <Image src="/images/home-banner-shop.png" alt="home-banner-shop.png" fill className="object-cover mix-blend-multiply opacity-50" referrerPolicy="no-referrer" />
        <div className="relative z-10 w-full max-w-xl px-12 md:px-20 text-left">
          <h2 className="text-black text-3xl md:text-5xl font-bold leading-tight mb-8">
            Shop the stories you love<br />for you and your family
          </h2>
          <button className="bg-white text-black hover:bg-gray-100 px-10 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-colors shadow-sm">
            Shop now
          </button>
        </div>
      </section>
    </div>
  );
}
