export default function MarqueeBar() {
  return (
    <div className="bg-blue-900 text-white py-4 overflow-hidden whitespace-nowrap relative z-20 border-b-4 border-yellow-500 shadow-xl">
      <div className="inline-block animate-marquee text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase">
        <span className="mx-16">
          <i className="fas fa-star text-[#b77a00] mr-3"></i> Admissions Open
          2026-27
        </span>
        <span className="mx-16">
          <i className="fas fa-trophy text-[#b77a00] mr-3"></i> Ranked Among Top
          10 Engineering Colleges
        </span>
        <span className="mx-16">
          <i className="fas fa-globe text-[#b77a00] mr-3"></i> Global
          Collaborations
        </span>
        <span className="mx-16">
          <i className="fas fa-star text-[#b77a00] mr-3"></i> Admissions Open
          2026-27
        </span>
      </div>
    </div>
  );
}
