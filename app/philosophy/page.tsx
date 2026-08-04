export default function Philosophy() {
  return (
    <div className="w-full bg-white flex flex-col items-center pb-24">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[30vh] md:h-[40vh] bg-black flex items-center justify-between px-8 md:px-24 mb-20 overflow-hidden">
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-medium tracking-wide">
          Roshe Studios Philosophy
        </h1>
        <div className="hidden md:block w-48 h-48 lg:w-64 lg:h-64 opacity-80">
          <img src="/images/philosophy-hero.jpg" alt="Mascot" className="w-full h-full object-contain" />
        </div>
      </section>

      {/* Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
        
        <div className="flex flex-col text-gray-900">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🌍</span> Story First, Always
          </h3>
          <p className="mb-4">We believe that the heart of every great film is a truthful story.<br/>Not just visually impressive, but emotionally honest.</p>
          <p className="mb-2">We focus on:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Human experiences</li>
            <li>Cultural memory</li>
            <li>Real-world themes told through accessible storytelling</li>
          </ul>
          <p>Because when a story is felt, it is remembered.</p>
        </div>

        <div className="flex flex-col text-gray-900">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🧠</span> Animation as Education
          </h3>
          <p className="mb-4">We believe animation has a unique role in education.</p>
          <p className="mb-2">It can:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Make history feel personal</li>
            <li>Make difficult topics accessible</li>
            <li>Engage students emotionally, not just intellectually</li>
          </ul>
          <p>That&apos;s why our films are built not only for viewing, but for learning, discussion, and reflection.</p>
        </div>

        <div className="flex flex-col text-gray-900">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🎨</span> Simplicity with Depth
          </h3>
          <p className="mb-4">Like the best animated films, we aim to communicate complex ideas through simple, beautiful storytelling.</p>
          <p className="mb-4">We don&apos;t create noise.<br/>We create clarity.</p>
          <p>Every frame, character, and moment is designed to serve the story — not distract from it.</p>
        </div>

        <div className="flex flex-col text-gray-900">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🔥</span> Purpose-Driven Creativity
          </h3>
          <p className="mb-4">We are not driven by volume.<br/>We are driven by meaning.</p>
          <p className="mb-4">Every project we create must answer one question:</p>
          <p className="mb-4">Why does this story need to be told?</p>
          <p>If it doesn&apos;t matter, we don&apos;t make it.</p>
        </div>

      </section>
    </div>
  );
}
