import Image from 'next/image';

export default function Seasonlings() {
  return (
    <div className="w-full bg-white flex flex-col items-center">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[40vh] md:h-[50vh] flex items-end justify-center pb-12 bg-gray-200 overflow-hidden">
        <Image src="/images/seasonlings-hero.png" alt="seasonlings-hero.png" fill className="object-cover object-top" referrerPolicy="no-referrer" />
        <div className="relative z-10">
          <button className="bg-white text-black hover:bg-gray-100 px-10 py-3 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg transition-colors">
            Invest Now
          </button>
        </div>
      </section>

      {/* Details Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="w-full md:w-[400px] flex-shrink-0 bg-gray-800 p-8 rounded shadow-lg flex items-center justify-center relative min-h-[350px]">
          <Image src="/images/seasonlings-poster.png" alt="seasonlings-poster.png" fill className="object-contain p-4" referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1 flex flex-col justify-center text-gray-900">
          <h1 className="text-4xl font-bold mb-4">Seasonlings Season 1</h1>
          
          <div className="mb-6 space-y-1 text-sm">
            <p><span className="font-semibold">Episodes:</span> 7 Episodes</p>
            <p><span className="font-semibold">Status:</span> In development</p>
            <p><span className="font-semibold">Genre:</span> Fantasy, Action, Adventure, Drama, Cli-fi</p>
          </div>
          
          <div className="space-y-4 text-sm leading-relaxed mb-8">
            <p>Seasonlings is a mythic animated drama that reimagines Spring, Summer, Autumn, and Winter as immortal siblings tasked with maintaining the balance between the divine realm, Ecos and the human world. Created by Mother Nature herself, the Seasonlings govern the natural cycles that sustain life on Earth. Beneath their divine purpose lies centuries of resentment, jealousy, and emotional neglect. When Aurelia, the embodiment of Autumn, receives a vision of impending doom for both worlds, the cracks beneath the surface of her relationships begin to reemerge. Sibling rivalries turn into open war, and power-hungry alliances threaten life. The world as they know it is falling apart, and their war is not the only enemy. The series examines love, identity, and the complexity of relationships through the eyes of painfully human immortals.</p>
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
            <div className="aspect-video relative cursor-pointer group bg-gray-200 shadow-md">
              <Image src="/images/seasonlings-teaser.png" alt="seasonlings-teaser.png" fill className="object-cover group-hover:opacity-90 transition-opacity" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </div>
            <p className="text-center font-medium">Watch the Official Teaser</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="aspect-video relative cursor-pointer group bg-gray-200 shadow-md overflow-hidden">
              <Image src="/images/seasonlings-gallery.png" alt="seasonlings-gallery.png" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-y-0 left-4 flex items-center text-white text-2xl font-light cursor-pointer">{'<'}</div>
              <div className="absolute inset-y-0 right-4 flex items-center text-white text-2xl font-light cursor-pointer">{'>'}</div>
            </div>
            <p className="text-center font-medium">Gallery</p>
          </div>
        </div>
      </section>
    </div>
  );
}
