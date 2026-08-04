import Image from 'next/image';

export default function NewAge() {
  return (
    <div className="w-full bg-white flex flex-col items-center">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[40vh] md:h-[50vh] bg-gray-200 overflow-hidden">
        <Image src="/images/new-age-hero.png" alt="new-age-hero.png" fill className="object-cover" referrerPolicy="no-referrer" />
      </section>

      {/* Details Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="w-full md:w-[400px] aspect-[3/4] relative flex-shrink-0">
          <Image src="/images/new-age-poster.png" alt="new-age-poster.png" fill className="object-cover shadow-lg rounded" referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1 flex flex-col justify-center text-gray-900">
          <h1 className="text-4xl font-bold mb-4">New Age</h1>
          
          <div className="mb-8 space-y-1 text-sm">
            <p><span className="font-semibold">Runtime:</span> 15 minutes</p>
            <p><span className="font-semibold">Status:</span> In Production</p>
            <p><span className="font-semibold">Genre:</span> Sci-fi, Animated Short Film</p>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">A Worldwide Collaboration</h2>
          <div className="space-y-4 text-sm leading-relaxed mb-8">
            <p>New age is produced by the brave effort and voluntary collaboration of a team of creatives. New age shows the power of what is possible when a team of creative come together to champion a selfless course. Through a unique world wide collaboration that includes scores of volunteers we are able to produce a world class African animation story.</p>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold">Directed By</p>
              <p>Omobolaji Peter Moses</p>
            </div>
            <div>
              <p className="font-bold">Produced By</p>
              <p>200+ Artists from over 30+ Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-20">
        <div className="flex flex-col gap-4">
          <div className="aspect-[21/9] relative cursor-pointer group bg-gray-200 overflow-hidden shadow-md">
            <Image src="/images/new-age-gallery.png" alt="new-age-gallery.png" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-500" referrerPolicy="no-referrer" />
            <div className="absolute inset-y-0 left-4 flex items-center text-white text-3xl font-light drop-shadow-md cursor-pointer hover:scale-110 transition-transform">{'<'}</div>
            <div className="absolute inset-y-0 right-4 flex items-center text-white text-3xl font-light drop-shadow-md cursor-pointer hover:scale-110 transition-transform">{'>'}</div>
          </div>
          <p className="text-center font-medium">Gallery</p>
        </div>
      </section>
    </div>
  );
}
