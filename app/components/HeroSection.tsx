export default function HeroSection() {
  return (
    <section className="h-screen bg-cover bg-center bg-fixed relative overflow-hidden flex items-center justify-center text-white text-center px-4" 
             style={{ backgroundImage: `url('https://alvascentralschool001.42web.io/wp-content/uploads/2026/02/DJI_0113-scaled.jpg')` }}>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a]/60 to-[#0f172a]/30"></div>
      <div className="relative z-10 max-w-6xl mt-20 md:mt-12">
        <h2 id="hero-title" className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-2xl opacity-0 translate-y-20 transition-all">
          Excellence <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 italic font-black">Redefined.</span>
        </h2>
        <p id="hero-subtitle" className="text-sm md:text-xl mb-10 font-light max-w-2.5xl mt-5 mx-auto opacity-0 translate-y-10 tracking-wider text-gray-200">
          Shaping the future through innovation, discipline, and holistic education.
        </p>
        <div id="hero-buttons" className="flex flex-col md:flex-row gap-5 justify-center opacity-0 translate-y-10">
          <button className="bg-yellow-500 text-blue-900 font-extrabold py-4 px-10 rounded shadow-2xl hover:bg-white transition-all text-xs md:text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:-translate-y-1">
            Apply Now 2026
          </button>
          <button className="border-2 border-white backdrop-blur-sm hover:bg-white hover:text-blue-900 font-bold py-4 px-10 rounded transition-all text-xs md:text-sm uppercase tracking-widest hover:shadow-lg">
            Take Virtual Tour
          </button>
        </div>
      </div>
    </section>
  )
}