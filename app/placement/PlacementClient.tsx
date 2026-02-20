"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "team", label: "Our Team" },
  { id: "students", label: "Placed Students" },
  { id: "companies", label: "Companies Visited" },
  { id: "gallery", label: "Placement Gallery" }, // ✅ ADD THIS
];

const slides = [
  {
    image: "https://picsum.photos/1600/700?random=1",
    name: "Ananya Rao",
    package: "₹32 LPA",
  },
  {
    image: "https://picsum.photos/1600/700?random=2",
    name: "Rahul Sharma",
    package: "₹28 LPA",
  },
];

function StatCard({
  number,
  label,
  decimal = false,
}: {
  number: number;
  label: string;
  decimal?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = number / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= number) {
        setCount(number);
        clearInterval(counter);
      } else {
        setCount(decimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, 20);

    return () => clearInterval(counter);
  }, [number, decimal]);

  return (
    <div>
      <h3 className="text-4xl font-bold text-[#1E2A78]">
        {count}
        {label.includes("Placed") || label.includes("Visited") ? "+" : ""}
      </h3>
      <p className="text-sm text-gray-600 mt-2 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
function InfiniteSlider({
  children,
  speed = 0.7,
  direction = "left",
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
}) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto loop scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      if (!isPaused && !isDragging) {
        slider.scrollLeft += speed;

        // TRUE LOOP RESET
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
    }, 10);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;

    setIsDragging(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const slider = sliderRef.current;
    if (!slider) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={sliderRef}
      className="flex gap-8 overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {children} {/* duplicate for seamless loop */}
    </div>
  );
}

export default function PlacementClient() {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Hero Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;

      tabs.forEach((tab) => {
        const el = sectionRefs.current[tab.id];
        if (el) {
          if (
            scrollY >= el.offsetTop &&
            scrollY < el.offsetTop + el.offsetHeight
          ) {
            setActiveTab(tab.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#F5F6F8] text-gray-800">
      <Header />

      {/* HERO SECTION - CINEMATIC STAGE */}
      <div className="relative h-[650px] w-full overflow-hidden bg-[#0F172A]">
        {/* Background Image with Ken Burns Effect */}
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
          <img
            src={slides[currentSlide].image}
            alt="Hero Slide"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          {/* Multi-layered Overlay: Deep Navy Vignette + Subtle Texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        </div>

        <div className="relative h-full flex items-center px-6 md:px-20">
          <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT: Headline */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4C430]/20 border border-[#F4C430]/30 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4C430] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F4C430]"></span>
                </span>
                <span className="text-[#F4C430] text-xs font-black uppercase tracking-[0.2em]">
                  Success Story 2026
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                Placement <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                  Highlights.
                </span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-md font-light leading-relaxed">
                Empowering our students to secure positions in the world's most
                prestigious organizations.
              </p>
            </div>

            {/* RIGHT CONTENT: Glassmorphic Achievement Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F4C430] to-orange-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl">
                <p className="text-[#F4C430] font-bold text-sm uppercase tracking-widest mb-2">
                  Highest Package Achiever
                </p>
                <h2 className="text-white text-4xl font-black mb-6 tracking-tight">
                  {slides[currentSlide].name}
                </h2>

                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-white tracking-tighter">
                    {slides[currentSlide].package.split(" ")[0]}
                  </span>
                  <span className="text-[#F4C430] text-xl font-bold mb-1 uppercase tracking-tight">
                    Lakhs Per Annum
                  </span>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-gray-800 overflow-hidden"
                      >
                        <img
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt="alumni"
                        />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-[#F4C430] flex items-center justify-center text-[10px] font-bold text-[#1E2A78]">
                      +500
                    </div>
                  </div>
                  <button className="text-white text-sm font-bold flex items-center gap-2 hover:text-[#F4C430] transition-colors">
                    Read Story
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE PROGRESS BAR - UNIQUE ATTRACTIVE INDICATOR */}
        <div className="absolute bottom-10 left-20 right-20 flex gap-4 z-30">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
              onClick={() => setCurrentSlide(idx)}
            >
              <div
                className={`h-full bg-[#F4C430] transition-all duration-[5000ms] linear ${
                  currentSlide === idx ? "w-full" : "w-0 transition-none"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          0% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1.2);
          }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
      `}</style>
      {/* STATS SECTION - DASHBOARD STYLE */}
      <section className="relative py-24 px-6 md:px-20 bg-[#F8F9FB] overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#1E2A78"
                strokeWidth="1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1: Students Placed (High Emphasis) */}
            <div className="relative group bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#1E2A78]/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <p className="text-[#1E2A78] text-5xl font-black tracking-tighter mb-2 italic">
                  320<span className="text-[#F4C430] font-bold">+</span>
                </p>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  Students Placed
                </p>
                <div className="mt-6 w-12 h-1 bg-[#1E2A78] rounded-full"></div>
              </div>
            </div>

            {/* Stat 2: Companies Visited */}
            <div className="relative group bg-[#1E2A78] p-8 rounded-[2.5rem] shadow-xl transform lg:translate-y-8 transition-all duration-500">
              <div className="relative z-10">
                <p className="text-white text-5xl font-black tracking-tighter mb-2 italic">
                  85<span className="text-[#F4C430] text-2xl ml-1">v</span>
                </p>
                <p className="text-blue-200/60 font-bold uppercase tracking-widest text-xs">
                  Recruiting Partners
                </p>
                <div className="mt-6 w-12 h-1 bg-[#F4C430] rounded-full"></div>
              </div>
              <div className="absolute bottom-0 right-0 p-4 opacity-10">
                <svg
                  className="w-16 h-16 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
            </div>

            {/* Stat 3: Highest Package */}
            <div className="relative group bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white hover:shadow-2xl transition-all duration-500">
              <div className="relative z-10">
                <div className="flex items-baseline gap-1">
                  <p className="text-[#1E2A78] text-5xl font-black tracking-tighter mb-2 italic">
                    32
                  </p>
                  <p className="text-[#1E2A78] font-bold text-lg">LPA</p>
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  Highest Package
                </p>
                <div className="mt-6 flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#F4C430]"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stat 4: Average Package */}
            <div className="relative group bg-gradient-to-br from-[#F4C430] to-[#E2B320] p-8 rounded-[2.5rem] shadow-xl transform lg:translate-y-16 transition-all duration-500">
              <div className="relative z-10">
                <div className="flex items-baseline gap-1">
                  <p className="text-[#1E2A78] text-5xl font-black tracking-tighter mb-2 italic">
                    8.5
                  </p>
                  <p className="text-[#1E2A78] font-bold text-lg">LPA</p>
                </div>
                <p className="text-[#1E2A78]/70 font-bold uppercase tracking-widest text-xs">
                  Average CTC
                </p>
                <div className="mt-6 w-12 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE FLOATING GLASS TABS */}
      <div className="sticky top-[80px] z-40 w-full flex justify-center py-4 pointer-events-none">
        <nav className="pointer-events-auto bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-full px-3 py-2 flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                className={`relative px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase transition-all duration-500 overflow-hidden ${
                  isActive
                    ? "text-[#1E2A78]"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {/* Active Background Indicator (Animated) */}
                {isActive && (
                  <div
                    className="absolute inset-0 bg-[#F4C430] rounded-full -z-10 shadow-[0_4px_12px_rgba(244,196,48,0.3)]"
                    // For Framer Motion users: layoutId="activeTab"
                  />
                )}

                <span className="relative z-10">{tab.label}</span>

                {/* Subtle Dot Indicator for non-active items on hover */}
                {!isActive && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1E2A78] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* OVERVIEW + VISION + MISSION */}
      <section
        ref={(el) => {
          sectionRefs.current["overview"] = el;
        }}
        className="px-6 md:px-20 py-32 bg-[#F8F9FB] relative overflow-hidden"
      >
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E2A78]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        {/* ===== OVERVIEW SECTION - ASYMMETRIC LAYOUT ===== */}
        <div className="relative flex flex-col lg:flex-row items-center gap-16 mb-40">
          {/* LEFT: Stacked Image Effect */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#F4C430] rounded-full opacity-20 animate-pulse"></div>
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                alt="Placement Cell"
                className="h-[500px] w-full object-cover"
              />
            </div>
            {/* Floating Stat Badge */}
            <div className="absolute -bottom-10 -right-6 z-20 bg-white p-8 rounded-3xl shadow-xl hidden md:block border border-gray-100">
              <p className="text-[#1E2A78] text-4xl font-black">15+</p>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-tighter">
                Years of Excellence
              </p>
            </div>
          </div>

          {/* RIGHT: Typography-Focused Text */}
          <div className="w-full lg:w-1/2">
            <span className="text-[#F4C430] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
              Introduction
            </span>
            <h2 className="text-5xl font-black text-[#1E2A78] mb-8 leading-tight">
              Bridging Academics <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E2A78] to-blue-500">
                with Industry.
              </span>
            </h2>
            <div className="space-y-6">
              <p className="text-gray-600 text-xl leading-relaxed font-light">
                The Placement Department has consistently achieved remarkable
                results, attracting reputed companies across multiple sectors
                every year.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-[#F4C430] pl-6 italic">
                Regular aptitude, technical, and communication training sessions
                ensure that our students aren't just graduates, but
                industry-ready professionals.
              </p>
            </div>
          </div>
        </div>

        {/* ===== VISION, MISSION & CONTACT - GRID SYSTEM ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vision Card */}
          <div className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-50">
            <div className="w-14 h-14 bg-[#F4C430]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-[#F4C430]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#1E2A78] mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To ensure every student leaves with a dream offer, fully prepared
              to lead in a competitive global career environment.
            </p>
          </div>

          {/* Mission Card */}
          <div className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-50">
            <div className="w-14 h-14 bg-[#1E2A78]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-[#1E2A78]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#1E2A78] mb-4">
              Our Mission
            </h3>
            <ul className="space-y-3">
              {[
                "Adequate internships",
                "Skilled professionals",
                "Corporate partnerships",
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4C430]"></div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Card - High Contrast */}
          <div className="lg:col-span-1 bg-[#13294B] rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

            <h3 className="text-2xl font-bold mb-8 relative z-10">
              Get in Touch
            </h3>

            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-[#F4C430] font-bold text-lg">
                  Prof. Rashmi Bhandary
                </p>
                <p className="text-gray-400 text-sm">
                  Dean – Training & Placement
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10 text-sm md:text-base">
                <p className="flex items-center gap-4 hover:text-[#F4C430] transition-colors cursor-pointer">
                  <span className="opacity-60">Cell:</span> +91 99864 75517
                </p>
                <p className="flex items-center gap-4 hover:text-[#F4C430] transition-colors cursor-pointer">
                  <span className="opacity-60">Email:</span>{" "}
                  placements@college.edu
                </p>
              </div>

              <button className="w-full py-4 mt-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold transition-all backdrop-blur-md">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section
        ref={(el) => {
          sectionRefs.current["team"] = el;
        }}
        className="px-6 md:px-20 py-24 bg-[#F8F9FB]"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-[#1E2A78] border-l-4 border-[#F4C430] pl-6">
            Our Placement Team
          </h2>

          {/* HEAD OF PLACEMENT - FEATURE CARD */}
          <div className="relative mb-24 overflow-hidden rounded-3xl bg-white shadow-xl flex flex-col md:flex-row items-center">
            {/* LEFT TEXT CONTENT */}
            <div className="p-12 md:p-16 flex-1">
              <span className="inline-block px-4 py-1 rounded-full bg-[#F4C430]/10 text-[#D4AF37] font-bold text-sm uppercase tracking-widest mb-6">
                Head – Training & Placement
              </span>
              <h3 className="text-5xl font-extrabold text-[#1E2A78] mb-6 tracking-tight">
                Dr. Rajesh Kumar
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed font-light italic border-l-2 border-gray-200 pl-6">
                "Dr. Rajesh Kumar leads the Training and Placement Cell with
                over 15 years of academic and corporate experience. Under his
                leadership, the institution has strengthened industry
                collaborations and achieved consistent placement excellence."
              </p>
            </div>

            {/* RIGHT IMAGE WITH STYLED BACKGROUND */}
            <div className="relative w-full md:w-[450px] h-[550px] bg-[#1E2A78]">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Dr. Rajesh Kumar"
                className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition duration-500"
              />
              {/* Decorative accent */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F4C430] translate-x-16 translate-y-16 rotate-45 opacity-20"></div>
            </div>
          </div>

          {/* TEAM MEMBERS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Ms. Anjali Mehta",
                img: "https://randomuser.me/api/portraits/women/65.jpg",
              },
              {
                name: "Mr. Vivek Sharma",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Ms. Kavya Nair",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Mr. Arjun Patel",
                img: "https://randomuser.me/api/portraits/men/51.jpg",
              },
              {
                name: "Ms. Sneha Rao",
                img: "https://randomuser.me/api/portraits/women/12.jpg",
              },
              {
                name: "Mr. Rahul Verma",
                img: "https://randomuser.me/api/portraits/men/19.jpg",
              },
              {
                name: "Ms. Priya Iyer",
                img: "https://randomuser.me/api/portraits/women/33.jpg",
              },
              {
                name: "Mr. Karan Singh",
                img: "https://randomuser.me/api/portraits/men/40.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Circular Image with Border Ring */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F4C430] group-hover:rotate-180 transition-transform duration-1000"></div>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover p-2"
                  />
                </div>

                <h4 className="font-bold text-xl text-[#1E2A78] group-hover:text-[#F4C430] transition-colors">
                  {member.name}
                </h4>

                <p className="text-sm font-medium text-gray-400 uppercase tracking-tighter mt-2">
                  Placement Officer
                </p>

                {/* Subtle Accent Line */}
                <div className="w-8 h-1 bg-[#F4C430] mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLACED STUDENTS - SLEEK HORIZONTAL CARDS */}
      <section
        ref={(el) => {
          sectionRefs.current["students"] = el;
        }}
        className="py-16 bg-white overflow-hidden"
      >
        <div className="px-6 md:px-20 mb-10">
          <h2 className="text-3xl font-bold text-[#1E2A78] tracking-tight">
            Placed <span className="text-[#F4C430]">Students</span>
          </h2>
        </div>

        <div className="relative">
          {/* Clean Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <InfiniteSlider speed={0.8}>
            {[
              {
                name: "Mr. Saurav N Shetty",
                dept: "CSE",
                company: "Amazon",
                ctc: "45.64 Lakhs",
                img: "https://randomuser.me/api/portraits/men/21.jpg",
              },
              {
                name: "Mr. Ujjwal Yadav",
                dept: "CSE",
                company: "Amazon",
                ctc: "45.64 Lakhs",
                img: "https://randomuser.me/api/portraits/men/22.jpg",
              },
              {
                name: "Mr. Akash Shetty",
                dept: "ISE",
                company: "Cohesity",
                ctc: "22.42 Lakhs",
                img: "https://randomuser.me/api/portraits/men/23.jpg",
              },
              {
                name: "Mr. B Ananthakrishna Rao",
                dept: "CSE",
                company: "Cohesity",
                ctc: "22.42 Lakhs",
                img: "https://randomuser.me/api/portraits/men/24.jpg",
              },
              {
                name: "Ms. Chandani Kumari",
                dept: "ISE",
                company: "Cohesity",
                ctc: "22.42 Lakhs",
                img: "https://randomuser.me/api/portraits/women/25.jpg",
              },
              {
                name: "Ms. Kavya Nair",
                dept: "CSE",
                company: "Infosys",
                ctc: "18.20 Lakhs",
                img: "https://randomuser.me/api/portraits/women/26.jpg",
              },
              {
                name: "Mr. Rahul Verma",
                dept: "ECE",
                company: "IBM",
                ctc: "12.50 Lakhs",
                img: "https://randomuser.me/api/portraits/men/27.jpg",
              },
              {
                name: "Ms. Priya Iyer",
                dept: "CSE",
                company: "Capgemini",
                ctc: "10.80 Lakhs",
                img: "https://randomuser.me/api/portraits/women/28.jpg",
              },
            ]
              .concat(/* Tripling data for perfect continuous loop */)
              .map((student, index) => (
                <div
                  key={index}
                  className="min-w-[400px] h-32 mx-4 flex items-center bg-gray-50 rounded-full p-4 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-[#1E2A78]/5 transition-all duration-300 group"
                >
                  {/* Circle Image with Ring */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <div className="absolute inset-0 border-2 border-[#F4C430] rounded-full scale-110 opacity-20 group-hover:scale-100 group-hover:opacity-100 transition-all"></div>
                    <img
                      src={student.img}
                      alt={student.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm"
                    />
                  </div>

                  {/* Details - Compact List */}
                  <div className="ml-6 flex-grow">
                    <h3 className="text-base font-bold text-[#1E2A78] leading-tight mb-1">
                      {student.name}
                    </h3>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        {student.dept}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="text-sm font-black text-gray-700">
                        {student.company}
                      </span>
                    </div>

                    <div className="mt-2 text-[#1E2A78] font-bold text-sm">
                      <span className="text-[10px] text-gray-400 font-medium uppercase mr-2">
                        CTC:
                      </span>
                      {student.ctc}
                    </div>
                  </div>
                </div>
              ))}
          </InfiniteSlider>
        </div>
      </section>

      {/* COMPANIES SLIDER - SINGLE ROW COMPACT */}
      <section
        ref={(el) => {
          sectionRefs.current["companies"] = el;
        }}
        className="py-12 bg-[#0B0F1A] overflow-hidden"
      >
        <div className="px-6 md:px-20 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#F4C430]"></span>
            <h2 className="text-[#F4C430] text-[10px] font-black uppercase tracking-[0.3em]">
              Placement Partners
            </h2>
          </div>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
            500+ Global Enterprises
          </p>
        </div>

        <div className="relative">
          {/* High-Contrast Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0F1A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0F1A] to-transparent z-10 pointer-events-none" />

          <InfiniteSlider speed={0.7} direction="left">
            {[
              {
                name: "Infosys",
                logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
              },
              {
                name: "TCS",
                logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Tata_Consultancy_Services_Logo.svg",
              },
              {
                name: "Wipro",
                logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Wipro_Primary_Logo_Color_RGB.svg",
              },
              {
                name: "Accenture",
                logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
              },
              {
                name: "Amazon",
                logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
              },
              {
                name: "Capgemini",
                logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg",
              },
              {
                name: "Cognizant",
                logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg",
              },
              {
                name: "IBM",
                logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
              },
            ]
              .concat(/* Triple Spread for Seamless Hand-off */)
              .concat(/* Repeat again */)
              .map((company, index) => (
                <div key={`comp-${index}`} className="mx-4 group">
                  <div className="w-36 h-16 flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.07] transition-all duration-500">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-6 w-auto object-contain brightness-0 invert opacity-25 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                </div>
              ))}
          </InfiniteSlider>
        </div>
      </section>

      {/* PLACEMENT GALLERY - DYNAMIC MASONRY */}
      <section
        ref={(el) => {
          sectionRefs.current["gallery"] = el;
        }}
        className="px-6 md:px-20 py-24 bg-white"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-[#1E2A78] tracking-tight">
              Placement <span className="text-[#F4C430]">Memories</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Capturing moments of success and professional growth.
            </p>
          </div>
          <button className="px-8 py-3 bg-[#1E2A78] text-white rounded-full font-bold hover:bg-[#F4C430] hover:text-[#1E2A78] transition-all duration-300 shadow-lg shadow-[#1E2A78]/20">
            View All Events
          </button>
        </div>

        {/* Unique Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          {[
            {
              title: "Cognizant Drive",
              img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
              size: "lg:col-span-2 lg:row-span-2",
            }, // Large Square
            {
              title: "iWave Recruitment",
              img: "https://images.unsplash.com/photo-1552664730-d307ca884978",
              size: "lg:col-span-1 lg:row-span-1",
            }, // Small Square
            {
              title: "IMV Corporation",
              img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
              size: "lg:col-span-1 lg:row-span-2",
            }, // Tall
            {
              title: "Accenture Visit",
              img: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
              size: "lg:col-span-1 lg:row-span-1",
            }, // Small Square
            {
              title: "Amazon Hiring",
              img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
              size: "lg:col-span-2 lg:row-span-1",
            }, // Wide
            {
              title: "Infosys Drive",
              img: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
              size: "lg:col-span-1 lg:row-span-2",
            }, // Tall
            {
              title: "IBM Interview",
              img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
              size: "lg:col-span-1 lg:row-span-1",
            }, // Small
            {
              title: "Capgemini Event",
              img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
              size: "lg:col-span-1 lg:row-span-1",
            }, // Small
          ].map((item, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-[2.5rem] shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${item.size}`}
            >
              {/* Background Image */}
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Floating Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A78]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[#F4C430] text-[10px] font-bold uppercase tracking-widest">
                    Placement 2024
                  </span>
                  <h3 className="text-white text-xl font-bold mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Corner Accent for empty state */}
              <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-white/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
