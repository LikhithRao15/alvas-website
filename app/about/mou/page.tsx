"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileMenu from "../../components/MobileMenu";

const mouPartners = [
    { name: "NARL, ISRO, Tirupati, AP", category: "research", icon: "🛰️" },
    { name: "Mangalore University, Mangalore", category: "academic", icon: "🎓" },
    { name: "Mettl (Training & Placements), Gurgaon", category: "industry", icon: "📊" },
    { name: "AWS, ISRO HQ, Bangalore", category: "industry", icon: "☁️" },
    { name: "Bhuvan NRSC, ISRO, Hyderabad", category: "research", icon: "🛰️" },
    { name: "KVK Dakshina Kannada", category: "academic", icon: "🌾" },
    { name: "Ernst & Young, Bengaluru", category: "industry", icon: "💼" },
    { name: "F & F Division, HAL, Bangalore", category: "industry", icon: "✈️" },
    { name: "Semi Conductor Lab, Chandigarh", category: "research", icon: "🔬" },
    { name: "OSCKI Labs, Bengaluru", category: "industry", icon: "🧪" },
    { name: "Emurgo, Bengaluru", category: "industry", icon: "⛓️" },
    { name: "RRSC, ISRO South, Bangalore", category: "research", icon: "🛰️" },
    { name: "DIAT, Pune", category: "academic", icon: "🎓" },
    { name: "SKF Boilers & Driers Pvt. Ltd., Moodbidri", category: "industry", icon: "⚙️" },
    { name: "UI Path, Bengaluru", category: "industry", icon: "🤖" },
    { name: "ISAC, ISRO Bangalore", category: "research", icon: "🛰️" },
    { name: "IISc, Bangalore", category: "academic", icon: "🎓" },
    { name: "Calibre Code Pvt. Ltd., Bangalore", category: "industry", icon: "💻" },
    { name: "Q Spider, Bengaluru", category: "industry", icon: "🕷️" },
    { name: "BEL, Bengaluru", category: "industry", icon: "📡" },
    { name: "Kumamoto University, Japan", category: "academic", icon: "🌏" },
    { name: "Agrima Roof & Façade Systems, Bangalore", category: "industry", icon: "🏗️" },
    { name: "Amcat, Bengaluru", category: "industry", icon: "📋" },
    { name: "BHEL, Bengaluru", category: "industry", icon: "⚡" },
    { name: "IIIT, Allahabad", category: "academic", icon: "🎓" },
    { name: "CII – Online Business Resource Centre", category: "industry", icon: "🏭" },
    { name: "J V Global, Bengaluru", category: "industry", icon: "🌐" },
    { name: "ICT Academy, Bangalore", category: "academic", icon: "🎓" },
    { name: "EDII, Ahmedabad", category: "academic", icon: "🏛️" },
    { name: "Aegaeon Technologies, Mysore", category: "industry", icon: "🔧" },
    { name: "Million Minds, Mumbai", category: "industry", icon: "💡" },
    { name: "BEML, Mysore", category: "industry", icon: "🚂" },
    { name: "Vihan-Sudhan Technologies, Mysore", category: "industry", icon: "🔩" },
    { name: "Dlithe, Bengaluru", category: "industry", icon: "💻" },
];

const stats = [
    { value: "27+", label: "Total MOUs", icon: "fas fa-handshake" },
    { value: "08", label: "Academic Collaborations", icon: "fas fa-graduation-cap" },
    { value: "15+", label: "Industry Partners", icon: "fas fa-industry" },
    { value: "1", label: "International University", icon: "fas fa-globe" },
];

const categoryColors: Record<string, string> = {
    research: "bg-purple-100 text-purple-800 border-purple-200",
    academic: "bg-blue-100 text-blue-800 border-blue-200",
    industry: "bg-amber-100 text-amber-800 border-amber-200",
};

const categoryLabel: Record<string, string> = {
    research: "Research",
    academic: "Academic",
    industry: "Industry",
};

export default function MOUPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const heroRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const filtered =
        activeFilter === "all"
            ? mouPartners
            : mouPartners.filter((p) => p.category === activeFilter);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Hero parallax
        if (heroRef.current) {
            gsap.to(heroRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }

        // Stats counter animation
        if (statsRef.current) {
            gsap.fromTo(
                statsRef.current.querySelectorAll(".stat-card"),
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%",
                    },
                }
            );
        }

        // Cards stagger
        if (cardsRef.current) {
            gsap.fromTo(
                cardsRef.current.querySelectorAll(".mou-card"),
                { opacity: 0, scale: 0.94, y: 20 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 90%",
                    },
                }
            );
        }

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [activeFilter]);

    return (
        <div className="relative min-h-screen font-sans cursor-default overflow-x-hidden" style={{ background: "linear-gradient(135deg, #fefefe 0%, #faf8f4 40%, #f0f4ff 100%)" }}>

            {/* ── BACKGROUND LAYER ── */}
            <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
                {/* Dot grid */}
                <div className="absolute inset-0" style={{
                    backgroundImage: "radial-gradient(circle, #c8b89040 1px, transparent 1px)",
                    backgroundSize: "28px 28px"
                }} />
                {/* Colour orbs */}
                <div className="mou-orb mou-orb-1" />
                <div className="mou-orb mou-orb-2" />
                <div className="mou-orb mou-orb-3" />
                <div className="mou-orb mou-orb-4" />
            </div>
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
            <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

            {/* ── HERO ─────────────────────────────────────── */}
            <section className="relative h-[60vh] w-full mt-[80px] overflow-hidden">
                <div ref={heroRef} className="absolute inset-0">
                    <img
                        src="/DJI_0135.jpg"
                        alt="AIET Campus"
                        className="w-full h-full object-cover scale-110"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80 flex flex-col items-center justify-center p-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-white/60 text-sm mb-6 font-medium">
                        <Link href="/" className="hover:text-amber-400 transition">Home</Link>
                        <i className="fas fa-chevron-right text-[10px]"></i>
                        <Link href="/about/college" className="hover:text-amber-400 transition">About</Link>
                        <i className="fas fa-chevron-right text-[10px]"></i>
                        <span className="text-amber-400">MOU</span>
                    </nav>

                    <div className="text-center max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
                            <i className="fas fa-handshake"></i>
                            Strategic Partnerships
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif drop-shadow-2xl">
                            MOU
                        </h1>
                        <p className="text-white/75 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                            Memoranda of Understanding — bridging academia with industry, research & the world.
                        </p>
                    </div>
                </div>

                {/* wave */}
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
                    <path d="M0,60 C360,0 1080,60 1440,0 L1440,60 Z" fill="rgb(248 250 252)" />
                </svg>
            </section>

            {/* ── STATS ───────────────────────────────────── */}
            <section className="py-12 px-6 max-w-6xl mx-auto" ref={statsRef}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="stat-card bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <i className={`${s.icon} text-amber-600 text-xl`}></i>
                            </div>
                            <div className="text-3xl font-black text-slate-900 mb-1">{s.value}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── INTRO ───────────────────────────────────── */}
            <section className="py-8 px-6 max-w-6xl mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-900 to-slate-800 p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-black text-white font-serif italic mb-4">
                            Collaboration at the Heart of{" "}
                            <span className="text-amber-400">Innovation</span>
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                            At Alva&apos;s Institute of Engineering and Technology, education goes beyond textbooks.
                            Our MOUs with prestigious universities, research organizations, government bodies,
                            and leading corporations create a learning ecosystem that integrates theory with
                            real-world application.
                        </p>
                    </div>
                    <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8 text-slate-700 font-medium leading-relaxed">
                        <p>
                            Through these partnerships, students gain access to internships, research projects,
                            training sessions, certifications, and mentorship programs conducted by experts from
                            reputed organizations such as <strong className="text-blue-900">ISRO, IISc Bangalore,
                                Mangalore University, Ernst &amp; Young, HAL, BEL, AWS, UI Path,</strong> and{" "}
                            <strong className="text-blue-900">Kumamoto University, Japan.</strong>
                        </p>
                        <p>
                            With over <strong className="text-amber-600">27 MOUs</strong> covering academic,
                            research, and industrial sectors, AIET demonstrates its strong commitment to academic
                            excellence and professional growth — bridging classroom learning with industrial
                            exposure, and shaping students into globally competent professionals.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── PARTNER GRID ────────────────────────────── */}
            <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">
                            Our MOU Partners
                        </h2>
                        <p className="text-slate-500 mt-2 font-medium pl-5">
                            {filtered.length} partner{filtered.length !== 1 ? "s" : ""} listed
                        </p>
                    </div>

                    {/* Filter pills */}
                    <div className="flex flex-wrap gap-2">
                        {["all", "academic", "research", "industry"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-all duration-200 border ${activeFilter === f
                                    ? "bg-blue-900 text-white border-blue-900 shadow-md"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                                    }`}
                            >
                                {f === "all" ? "All Partners" : `${categoryLabel[f]}`}
                            </button>
                        ))}
                    </div>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((partner, i) => (
                        <div
                            key={i}
                            className="mou-card group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-lg hover:border-amber-200 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
                        >
                            <div className="text-3xl shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                {partner.icon}
                            </div>
                            <div className="min-w-0">
                                <p className="font-bold text-slate-800 text-sm leading-snug mb-2 group-hover:text-blue-900 transition-colors">
                                    {partner.name}
                                </p>
                                <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${categoryColors[partner.category]}`}>
                                    {categoryLabel[partner.category]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── ISRO HIGHLIGHT BANNER ───────────────────── */}
            <section className="py-10 px-6 max-w-6xl mx-auto">
                <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-[2.5rem] p-10 md:p-16 overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-16 -mb-16 pointer-events-none"></div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                                <i className="fas fa-star"></i> Featured Partnership
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-white font-serif italic mb-4">
                                Space-Level Collaboration with <span className="text-amber-400">ISRO</span>
                            </h3>
                            <p className="text-white/70 leading-relaxed font-medium">
                                AIET holds multiple MOUs with ISRO bodies — NARL, ISRO HQ, Bhuvan NRSC (Hyderabad),
                                RRSC South, and ISAC — enabling students to collaborate on space research,
                                satellite data, and cutting-edge technology projects.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {["NARL, Tirupati", "ISRO HQ, Bangalore", "Bhuvan NRSC, Hyderabad", "RRSC South & ISAC"].map((org) => (
                                <div key={org} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center hover:bg-white/20 transition">
                                    <div className="text-3xl mb-2">🛰️</div>
                                    <p className="text-white font-bold text-sm leading-tight">{org}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FINAL WORDS ─────────────────────────────── */}
            <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden">
                    <div className="absolute top-6 right-8 text-amber-200 text-[8rem] font-serif leading-none pointer-events-none select-none">"</div>
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5 mb-8">
                        Final Words
                    </h2>
                    <div className="space-y-5 text-slate-700 font-medium leading-relaxed text-lg max-w-4xl">
                        <p>
                            The MOUs at Alva&apos;s Institute of Engineering and Technology are a testimony to the institute&apos;s
                            commitment to excellence in education, research, and career development. By fostering these
                            partnerships, the institution ensures that its students are{" "}
                            <strong className="text-blue-900">globally competent, industry-ready, and future-focused professionals.</strong>
                        </p>
                        <p>
                            These partnerships are not merely formal agreements — they represent a shared commitment to
                            academic excellence, research advancement, and professional development. The institute is
                            dedicated to expanding collaborations across emerging fields like{" "}
                            <strong className="text-amber-700">Artificial Intelligence, Data Science, Renewable Energy, and Robotics.</strong>
                        </p>
                        <p className="italic text-slate-600 border-l-4 border-amber-400 pl-5">
                            In essence, the MOUs of AIET symbolize a shared journey toward excellence — empowering
                            students and faculty to explore, innovate, and achieve beyond boundaries. Powerful bridges
                            connecting education with opportunity, shaping visionary professionals ready to contribute
                            meaningfully to society and the world.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── FUTURE OUTLOOK ──────────────────────────── */}
            <section className="py-8 px-6 max-w-6xl mx-auto pb-20">
                <div className="grid sm:grid-cols-3 gap-6">
                    {[
                        { icon: "fas fa-brain", label: "Artificial Intelligence", color: "blue" },
                        { icon: "fas fa-database", label: "Data Science", color: "violet" },
                        { icon: "fas fa-solar-panel", label: "Renewable Energy", color: "green" },
                    ].map((f) => (
                        <div
                            key={f.label}
                            className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${f.color}-50`}>
                                <i className={`${f.icon} text-${f.color}-600 text-xl`}></i>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Expanding into</p>
                                <p className="font-black text-slate-800">{f.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />

            <style jsx global>{`
        /* ── Header ── */
        #main-header {
          background-color: rgba(255, 255, 255, 0.4) !important;
          backdrop-filter: blur(20px) !important;
          border-bottom: 2px solid rgba(183, 122, 0, 0.1) !important;
        }
        #main-header .nav-btn,
        #main-header span,
        #main-header i,
        #main-header h1,
        #main-header h3,
        #top-bar span,
        #top-bar a { color: #b77a00 !important; }
        #main-header img { filter: none !important; opacity: 1 !important; }
        .header-scrolled {
          background-color: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(12px) !important;
        }
        footer { background-color: #071a34 !important; }

        /* ── Background orbs ── */
        .mou-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.35;
          animation: mouFloatOrb 18s ease-in-out infinite alternate;
        }
        .mou-orb-1 {
          width: 520px; height: 520px;
          top: 5%; left: -10%;
          background: radial-gradient(circle, #f59e0b55, #fbbf2422);
          animation-duration: 20s;
        }
        .mou-orb-2 {
          width: 420px; height: 420px;
          top: 30%; right: -8%;
          background: radial-gradient(circle, #3b82f644, #6366f122);
          animation-duration: 25s;
          animation-delay: -6s;
        }
        .mou-orb-3 {
          width: 360px; height: 360px;
          bottom: 20%; left: 20%;
          background: radial-gradient(circle, #8b5cf633, #a78bfa22);
          animation-duration: 22s;
          animation-delay: -12s;
        }
        .mou-orb-4 {
          width: 300px; height: 300px;
          bottom: 5%; right: 15%;
          background: radial-gradient(circle, #f59e0b33, #fb923c22);
          animation-duration: 28s;
          animation-delay: -4s;
        }
        @keyframes mouFloatOrb {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(30px, -25px) scale(1.05); }
          66%  { transform: translate(-20px, 20px) scale(0.97); }
          100% { transform: translate(15px, -10px) scale(1.03); }
        }
      `}</style>
        </div>
    );
}
