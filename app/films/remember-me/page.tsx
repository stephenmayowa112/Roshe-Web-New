import Image from 'next/image';

export default function RememberMe() {
  return (
    <div className="w-full bg-white flex flex-col items-center">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-gray-200 overflow-hidden">
        <Image src="/images/remember-me-hero.png" alt="remember-me-hero.png" fill className="object-cover" referrerPolicy="no-referrer" />
        <div className="relative z-10 flex flex-col items-center justify-center pt-20">
          <Image src="/images/remember-me-logo.png" alt="remember-me-logo.png" width={300} height={120} className="h-24 md:h-32 mb-8 w-auto object-contain" referrerPolicy="no-referrer" />
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide shadow-md transition-colors">
              BOOK TICKETS
            </button>
            <button className="bg-white/80 backdrop-blur-sm border border-white text-black hover:bg-white px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide shadow-md transition-colors">
              BUY LICENSE
            </button>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="w-full md:w-[400px] aspect-[3/4] relative flex-shrink-0">
          <Image src="/images/remember-me-poster.png" alt="remember-me-poster.png" fill className="object-cover shadow-lg rounded" referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1 flex flex-col justify-center text-gray-900">
          <h1 className="text-4xl font-bold mb-4">Remember Me</h1>
          
          <div className="mb-6 space-y-1 text-sm">
            <p><span className="font-semibold">Runtime:</span> 6 minutes</p>
            <p><span className="font-semibold">Release Date:</span> 10th November 2026</p>
            <p><span className="font-semibold">Genre:</span> Emotional, Animated Short Film</p>
          </div>
          
          <div className="space-y-4 text-sm leading-relaxed mb-8">
            <p>Remember Me is a 4K animated short film created to honour the sacrifices behind every name remembered on Remembrance Day.</p>
            <p>Through a powerful, accessible story, the film connects younger audiences with history in a way that is emotional, educational, and lasting.</p>
            <p>We are partnering with sponsors to bring this project to wider audiences through private screenings, school engagement, and community events—ensuring the message of remembrance continues for future generations.</p>
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

      {/* Video & Gallery */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="aspect-video relative cursor-pointer group bg-gray-200">
              <Image src="/images/remember-me-trailer.png" alt="remember-me-trailer.png" fill className="object-cover group-hover:opacity-90 transition-opacity" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </div>
            <p className="text-center font-medium">Watch the Official Trailer</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="aspect-video relative cursor-pointer group bg-gray-200">
              <Image src="/images/remember-me-gallery.png" alt="remember-me-gallery.png" fill className="object-cover group-hover:opacity-90 transition-opacity" referrerPolicy="no-referrer" />
              <div className="absolute inset-y-0 left-4 flex items-center text-white text-2xl font-light">{'<'}</div>
              <div className="absolute inset-y-0 right-4 flex items-center text-white text-2xl font-light">{'>'}</div>
            </div>
            <p className="text-center font-medium">Gallery</p>
          </div>
        </div>
      </section>
    </div>
  );
}
