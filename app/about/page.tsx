export default function About() {
  return (
    <div className="w-full bg-white flex flex-col items-center flex-grow">
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto relative h-[30vh] md:h-[40vh] bg-black flex items-center justify-between px-8 md:px-24 mb-20 overflow-hidden">
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-medium tracking-wide">
          About Us
        </h1>
        <div className="hidden md:block w-48 h-48 lg:w-64 lg:h-64 opacity-80">
          <img src="/images/philosophy-hero.jpg" alt="Mascot" className="w-full h-full object-contain" />
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto px-4 text-center text-gray-800 text-lg md:text-xl space-y-8 py-10">
        <p>This site is owned and operated by Roshe Studios Limited. Registered in England and Wales.</p>
        <p>Company Registration Number: 16696126</p>
        <p>Founded: 2024</p>
      </section>
    </div>
  );
}
