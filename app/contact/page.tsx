import Image from 'next/image';

export default function Contact() {
  return (
    <div className="w-full bg-white flex flex-col items-center pb-24">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[30vh] md:h-[40vh] bg-black flex items-center justify-between px-8 md:px-24 mb-20 overflow-hidden">
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-medium tracking-wide">
          Get in Touch
        </h1>
        <div className="hidden md:block relative w-48 h-48 lg:w-64 lg:h-64 opacity-80">
          <Image src="/images/philosophy-hero.png" alt="Mascot logo" fill className="object-contain" referrerPolicy="no-referrer" />
        </div>
      </section>

      {/* Content */}
      <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Image */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-[450px] aspect-[4/5] relative overflow-hidden rounded-[2rem] shadow-xl">
            <Image src="/images/contact-image.png" alt="contact-image.png" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Right Form */}
        <div className="flex flex-col pt-8">
          <h2 className="text-4xl md:text-6xl font-medium mb-12 text-gray-900">Contact Us</h2>
          
          <div className="flex flex-col md:flex-row gap-12">
            <form className="flex-1 space-y-8">
              <div className="space-y-2">
                <label className="text-gray-500 text-lg">Full Name</label>
                <input type="text" className="w-full border-b-2 border-gray-900 bg-transparent pb-2 focus:outline-none focus:border-yellow-500 transition-colors text-lg" />
              </div>
              <div className="space-y-2">
                <label className="text-gray-500 text-lg">E-mail</label>
                <input type="email" className="w-full border-b-2 border-gray-900 bg-transparent pb-2 focus:outline-none focus:border-yellow-500 transition-colors text-lg" />
              </div>
              <div className="space-y-2">
                <label className="text-gray-500 text-lg">Message</label>
                <input type="text" className="w-full border-b-2 border-gray-900 bg-transparent pb-2 focus:outline-none focus:border-yellow-500 transition-colors text-lg" />
              </div>
              <button type="submit" className="bg-black text-white px-10 py-3 rounded-full font-medium shadow-md hover:bg-gray-800 transition-colors mt-8">
                Contact Us
              </button>
            </form>

            <div className="md:w-48 text-gray-900 text-lg pt-2">
              <p className="font-bold mb-1">Based in</p>
              <p>Stockport,</p>
              <p>Manchester, UK.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
