"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileMenu from "../../components/MobileMenu";

/* ─── DATA ───────────────────────────────────────────────────────── */
const startups = [
    {
        name: "AgroSense",
        tagline: "Smart farming powered by IoT & AI",
        category: "AgriTech",
        founded: "2022",
        founders: "Rakesh M. & Priya S.",
        stage: "Seed",
        desc: "AgroSense deploys wireless soil sensors and a mobile dashboard to help farmers optimise irrigation, detect crop disease early, and cut water usage by up to 40%. The system supports over 12 crop types and integrates with government farm subsidy APIs.",
        img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
        color: "#00c853",
        icon: "fas fa-seedling",
        tags: ["IoT", "Machine Learning", "Mobile App"],
        funding: "₹12 Lakh",
        users: "350+ Farmers",
        website: "#",
    },
    {
        name: "CampusCart",
        tagline: "Hyper-local marketplace for students",
        category: "EdTech",
        founded: "2023",
        founders: "Ananya K. & Rohan D.",
        stage: "Pre-Seed",
        desc: "CampusCart connects students to buy and sell second-hand books, electronics, and supplies within the campus. The platform uses a trust-score system and supports UPI payments, reducing waste and saving students an average of ₹3,000 per semester.",
        img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        color: "#ff6d00",
        icon: "fas fa-shopping-cart",
        tags: ["Marketplace", "PWA", "React Native"],
        funding: "₹5 Lakh",
        users: "2,000+ Students",
        website: "#",
    },
    {
        name: "MediTrack",
        tagline: "Digitising rural health records",
        category: "HealthTech",
        founded: "2022",
        founders: "Dr. Sana F. & Kiran B.",
        stage: "Series A",
        desc: "MediTrack provides an offline-first EHR system for Primary Health Centres in rural Karnataka. It auto-syncs when internet is available, supports voice-to-text in Kannada, and generates automated monthly health analytics for district health officers.",
        img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
        color: "#e53935",
        icon: "fas fa-heartbeat",
        tags: ["Healthcare", "Offline-First", "Node.js"],
        funding: "₹45 Lakh",
        users: "18 PHCs",
        website: "#",
    },
    {
        name: "SkillBridge",
        tagline: "Micro-internships connecting students to MSMEs",
        category: "EdTech",
        founded: "2023",
        founders: "Arjun P. & Divya R.",
        stage: "Pre-Seed",
        desc: "SkillBridge matches engineering students to 2–4 week micro-internships at local MSMEs, bridging the industry-academia skill gap. The AI-powered matching engine considers skills, location, and past project experience.",
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        color: "#1565c0",
        icon: "fas fa-handshake",
        tags: ["EdTech", "Internships", "Python"],
        funding: "₹8 Lakh",
        users: "500+ Students",
        website: "#",
    },
    {
        name: "EcoKraft",
        tagline: "Upcycled packaging from agricultural waste",
        category: "GreenTech",
        founded: "2021",
        founders: "Meena G. & Suraj N.",
        stage: "Growth",
        desc: "EcoKraft manufactures biodegradable packaging from paddy straw and areca leaf waste, replacing single-use plastic for local food vendors and e-commerce businesses. The product is compostable within 45 days and 60% cheaper than bio-plastic alternatives.",
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
        color: "#558b2f",
        icon: "fas fa-leaf",
        tags: ["Sustainability", "Manufacturing", "B2B"],
        funding: "₹28 Lakh",
        users: "80+ Vendors",
        website: "#",
    },
    {
        name: "RouteIQ",
        tagline: "AI-powered last-mile logistics",
        category: "LogiTech",
        founded: "2023",
        founders: "Vikram S. & Nisha T.",
        stage: "Seed",
        desc: "RouteIQ optimises delivery routes for courier partners using real-time traffic data and reinforcement learning, cutting delivery time by 30% and fuel costs by 22%. The dashboard provides live tracking and automated delay alerts.",
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
        color: "#6a1b9a",
        icon: "fas fa-route",
        tags: ["AI", "Logistics", "Maps API"],
        funding: "₹20 Lakh",
        users: "12 Partners",
        website: "#",
    },
];

const stats = [
    { value: "6+", label: "Active Startups", icon: "fas fa-rocket" },
    { value: "₹1.2 Cr", label: "Total Funding Raised", icon: "fas fa-rupee-sign" },
    { value: "3,000+", label: "Lives Impacted", icon: "fas fa-users" },
    { value: "2", label: "National Awards", icon: "fas fa-trophy" },
    { value: "8+", label: "Mentor Network", icon: "fas fa-chalkboard-teacher" },
    { value: "4", label: "Sectors Covered", icon: "fas fa-th-large" },
];

const processSteps = [
    { step: "01", title: "Pitch Your Idea", desc: "Submit a 1-page concept note describing your problem statement, proposed solution, and target users. Applications open every semester.", icon: "fas fa-lightbulb", color: "#f59e0b" },
    { step: "02", title: "Evaluation Round", desc: "A panel of faculty mentors, industry experts, and alumni investors evaluate your concept on feasibility, impact, and scalability.", icon: "fas fa-search", color: "#3b82f6" },
    { step: "03", title: "Incubation", desc: "Selected teams get co-working space, seed support (up to ₹10 L), legal & IP guidance, and 6-month structured mentorship.", icon: "fas fa-seedling", color: "#10b981" },
    { step: "04", title: "Build & Iterate", desc: "Develop your MVP with access to AIET's maker space, cloud credits, and weekly design sprints guided by industry professionals.", icon: "fas fa-code", color: "#8b5cf6" },
    { step: "05", title: "Demo Day", desc: "Present your product to a live audience of investors, corporates, and the press. Winners receive additional funding and national exposure.", icon: "fas fa-presentation", color: "#ef4444" },
    { step: "06", title: "Scale & Launch", desc: "Graduate startups receive warm introductions to VCs, accelerators, and corporate partners for further growth and market launch.", icon: "fas fa-rocket", color: "#f97316" },
];

const mentors = [
    { name: "Dr. Arun Shetty", title: "Professor & Startup Coach", expertise: "Product Strategy, EdTech", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Ms. Kavita Rao", title: "Serial Entrepreneur", expertise: "FinTech, Marketing", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Mr. Deepak Nair", title: "Angel Investor, CTO @ Infosys", expertise: "AI, Deep Tech, SaaS", img: "https://randomuser.me/api/portraits/men/55.jpg" },
    { name: "Dr. Preethi Kumar", title: "Innovation Lead @ ISRO", expertise: "SpaceTech, Hardware", img: "https://randomuser.me/api/portraits/women/28.jpg" },
];

const testimonials = [
    { quote: "AIET's incubation cell gave us everything — the legal structure, the first customers, and most importantly, the confidence to keep going when things broke.", name: "Rakesh M.", startup: "AgroSense", img: "https://randomuser.me/api/portraits/men/41.jpg" },
    { quote: "The Demo Day at AIET put us in front of real investors. We raised our seed round just three months after graduating from the programme.", name: "Meena G.", startup: "EcoKraft", img: "https://randomuser.me/api/portraits/women/61.jpg" },
    { quote: "What makes AIET different is the human element — mentors who actually care about your progress and not just the pitch deck.", name: "Arjun P.", startup: "SkillBridge", img: "https://randomuser.me/api/portraits/men/76.jpg" },
];

const awards = [
    { title: "National Startup India Award", year: "2024", winner: "EcoKraft", body: "Govt. of India", icon: "fas fa-medal" },
    { title: "Karnataka Innovation Challenge", year: "2023", winner: "MediTrack", body: "Karnataka Govt.", icon: "fas fa-trophy" },
    { title: "Best Student Startup – IIT Bombay", year: "2023", winner: "AgroSense", body: "E-Cell, IIT Bombay", icon: "fas fa-award" },
    { title: "Smart India Hackathon – Finalist", year: "2024", winner: "RouteIQ", body: "Ministry of Education", icon: "fas fa-flag" },
];

const events = [
    { title: "Startup Bootcamp 2025", date: "Mar 15 – 16, 2025", type: "Workshop", desc: "48-hour intensive with investor Q&A, product sprints, and networking dinners." },
    { title: "Demo Day – Spring 2025", date: "Apr 28, 2025", type: "Showcase", desc: "Live pitches to angel panel. Open to public. Register to attend or apply to pitch." },
    { title: "Ideathon 4.0", date: "May 10, 2025", type: "Competition", desc: "Cross-department idea pitching competition with ₹1 Lakh prize pool." },
    { title: "Mentor Connect Night", date: "Jun 5, 2025", type: "Networking", desc: "Evening mixer with 15+ industry mentors. Exclusive for incubated teams." },
];

const faqs = [
    { q: "Who can apply?", a: "Any current AIET student (UG or PG) individually or in teams of 2–5 members from any department." },
    { q: "Do I need a prototype to apply?", a: "No. A well-defined problem statement and solution hypothesis are sufficient for the initial round." },
    { q: "What funding is available?", a: "Selected teams receive up to ₹10 Lakh seed support in tranches based on milestone achievements." },
    { q: "How long is the incubation period?", a: "The core programme is 6 months, extendable up to 18 months for high-growth startups." },
    { q: "What happens if my startup doesn't succeed?", a: "Failure is part of learning. Alumni mentors, career support, and lessons from the programme remain valuable assets regardless of outcome." },
];

const stageColor: Record<string, string> = {
    "Pre-Seed": "bg-slate-100 text-slate-700",
    "Seed": "bg-green-100 text-green-800",
    "Series A": "bg-blue-100 text-blue-800",
    "Growth": "bg-amber-100 text-amber-800",
};

/* ─── PAGE ────────────────────────────────────────────────────────── */
export default function StartupsPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const heroImgRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);

    const categories = ["All", ...Array.from(new Set(startups.map((s) => s.category)))];
    const filtered = activeFilter === "All" ? startups : startups.filter((s) => s.category === activeFilter);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (heroImgRef.current) {
            gsap.to(heroImgRef.current, {
                yPercent: 22, ease: "none",
                scrollTrigger: { trigger: heroImgRef.current, start: "top top", end: "bottom top", scrub: true }
            });
        }
        if (statsRef.current) {
            gsap.fromTo(statsRef.current.querySelectorAll(".stat-item"),
                { opacity: 0, y: 28 },
                {
                    opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
                    scrollTrigger: { trigger: statsRef.current, start: "top 85%" }
                });
        }
        if (processRef.current) {
            gsap.fromTo(processRef.current.querySelectorAll(".process-step"),
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, stagger: 0.1, duration: 0.55, ease: "power2.out",
                    scrollTrigger: { trigger: processRef.current, start: "top 80%" }
                });
        }
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    useEffect(() => {
        if (cardsRef.current) {
            gsap.fromTo(cardsRef.current.querySelectorAll(".startup-card"),
                { opacity: 0, y: 24, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.5, ease: "power2.out" });
        }
    }, [activeFilter]);

    return (
        <div className="relative min-h-screen font-sans overflow-x-hidden"
            style={{ background: "linear-gradient(135deg,#fefefe 0%,#f8f4ff 45%,#f0f7ff 100%)" }}>

            {/* ── ANIMATED BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle,#b39ddb30 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
                {[
                    { icon: "fas fa-rocket", top: "7%", left: "4%", size: 26, dur: 15, delay: 0 },
                    { icon: "fas fa-lightbulb", top: "12%", left: "88%", size: 30, dur: 20, delay: -4 },
                    { icon: "fas fa-microchip", top: "35%", left: "3%", size: 22, dur: 18, delay: -8 },
                    { icon: "fas fa-chart-line", top: "55%", left: "93%", size: 28, dur: 17, delay: -5 },
                    { icon: "fas fa-code-branch", top: "70%", left: "6%", size: 24, dur: 22, delay: -11 },
                    { icon: "fas fa-atom", top: "80%", left: "80%", size: 26, dur: 19, delay: -3 },
                    { icon: "fas fa-seedling", top: "25%", left: "48%", size: 18, dur: 24, delay: -14 },
                    { icon: "fas fa-brain", top: "60%", left: "60%", size: 20, dur: 16, delay: -7 },
                    { icon: "fas fa-satellite", top: "90%", left: "22%", size: 22, dur: 21, delay: -9 },
                    { icon: "fas fa-flask", top: "45%", left: "20%", size: 20, dur: 14, delay: -2 },
                    { icon: "fas fa-wifi", top: "15%", left: "33%", size: 18, dur: 23, delay: -12 },
                    { icon: "fas fa-cogs", top: "75%", left: "42%", size: 22, dur: 19, delay: -6 },
                ].map((ic, i) => (
                    <i key={i} className={`${ic.icon} startup-float-icon`}
                        style={{
                            position: "absolute", top: ic.top, left: ic.left, fontSize: ic.size,
                            animationDuration: `${ic.dur}s`, animationDelay: `${ic.delay}s`
                        } as React.CSSProperties} />
                ))}
                <div className="su-orb su-orb-1" /><div className="su-orb su-orb-2" /><div className="su-orb su-orb-3" />
            </div>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

            {/* ── HERO ── */}
            <section className="relative h-[65vh] w-full mt-[80px] overflow-hidden z-10">
                <div ref={heroImgRef} className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=80"
                        alt="Students collaborating" className="w-full h-full object-cover scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/55 to-slate-900/85 flex flex-col items-center justify-center p-6">
                    <nav className="flex items-center gap-2 text-white/55 text-sm mb-6 font-medium">
                        <Link href="/" className="hover:text-amber-400 transition">Home</Link>
                        <i className="fas fa-chevron-right text-[9px]" />
                        <Link href="/campus-life" className="hover:text-amber-400 transition">Campus Life</Link>
                        <i className="fas fa-chevron-right text-[9px]" />
                        <span className="text-amber-400">Startups</span>
                    </nav>
                    <div className="text-center max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
                            <i className="fas fa-rocket" /> Innovation Hub · AIET
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif drop-shadow-2xl">
                            Student <span className="text-amber-400">Startups</span>
                        </h1>
                        <p className="text-white/75 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                            Where bold ideas become real ventures. Meet the entrepreneurial minds of Alva's Institute of Engineering & Technology.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            <a href="#startups" className="bg-amber-500 hover:bg-amber-600 text-white font-black px-6 py-3 rounded-2xl transition shadow-lg shadow-amber-400/30 text-sm">
                                <i className="fas fa-th-large mr-2" />Explore Startups
                            </a>
                            <a href="#apply" className="bg-white/15 hover:bg-white/25 text-white font-black px-6 py-3 rounded-2xl transition backdrop-blur border border-white/20 text-sm">
                                <i className="fas fa-paper-plane mr-2" />Apply to Incubator
                            </a>
                        </div>
                    </div>
                </div>
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
                    <path d="M0,60 C360,0 1080,60 1440,0 L1440,60 Z" fill="#fefefe" />
                </svg>
            </section>

            {/* ── STATS ── */}
            <section className="relative z-10 py-14 px-6 max-w-6xl mx-auto" ref={statsRef}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {stats.map((s) => (
                        <div key={s.label} className="stat-item bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-slate-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <i className={`${s.icon} text-violet-600 text-lg`} />
                            </div>
                            <div className="text-2xl font-black text-slate-900 mb-0.5">{s.value}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-tight">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── ABOUT INCUBATION ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-14">
                <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full -mr-32 -mt-32 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-52 h-52 bg-violet-500/10 rounded-full -ml-20 -mb-20 pointer-events-none" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                                <i className="fas fa-info-circle" /> About The Programme
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-white font-serif italic mb-4">
                                AIET Innovation &<br /><span className="text-amber-400">Incubation Centre</span>
                            </h2>
                            <p className="text-white/75 leading-relaxed font-medium mb-4">
                                Established in 2019 under AIET's Research & Development wing, the Innovation & Incubation Centre (IIC) supports student entrepreneurs through structured mentorship, seed funding, co-working space, and industry connections.
                            </p>
                            <p className="text-white/65 leading-relaxed text-sm font-medium">
                                Recognised by the Ministry of Education's Innovation Cell, AIET-IIC is rated <strong className="text-amber-400">3.5★ (Institution's Innovation Council)</strong> and has catalysed six startups generating real revenue.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: "fas fa-chalkboard-teacher", label: "Expert Mentorship", desc: "8+ industry mentors" },
                                { icon: "fas fa-rupee-sign", label: "Seed Funding", desc: "Up to ₹10 L per team" },
                                { icon: "fas fa-desktop", label: "Co-working Space", desc: "24/7 access to lab" },
                                { icon: "fas fa-network-wired", label: "Industry Connect", desc: "30+ corporate partners" },
                                { icon: "fas fa-file-contract", label: "Legal & IP Support", desc: "Patent filing help" },
                                { icon: "fas fa-cloud", label: "Cloud Credits", desc: "AWS & GCP credits" },
                            ].map((f) => (
                                <div key={f.label} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/20 transition">
                                    <i className={`${f.icon} text-amber-400 text-lg mb-2 block`} />
                                    <p className="text-white font-bold text-sm leading-tight">{f.label}</p>
                                    <p className="text-white/50 text-xs mt-1">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── INCUBATION PROCESS ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-16">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">
                        The Incubation Journey
                    </h2>
                    <p className="text-slate-500 mt-2 pl-5 font-medium">From idea to funded startup — six clear stages.</p>
                </div>
                <div ref={processRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {processSteps.map((s) => (
                        <div key={s.step} className="process-step group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 text-7xl font-black text-slate-100 leading-none pointer-events-none select-none">
                                {s.step}
                            </div>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: s.color + "22" }}>
                                <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                            </div>
                            <h3 className="font-black text-slate-900 text-lg mb-2">{s.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">{s.desc}</p>
                            <div className="w-full h-0.5 mt-5 rounded-full" style={{ background: `linear-gradient(to right,${s.color},transparent)` }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── STARTUPS GRID ── */}
            <section id="startups" className="relative z-10 px-6 max-w-6xl mx-auto pb-20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">Our Startups</h2>
                        <p className="text-slate-500 mt-1 font-medium pl-5">{filtered.length} venture{filtered.length !== 1 ? "s" : ""} listed</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <button key={c} onClick={() => setActiveFilter(c)}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${activeFilter === c ? "bg-violet-700 text-white border-violet-700 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300"
                                    }`}>{c}</button>
                        ))}
                    </div>
                </div>
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((startup, i) => (
                        <div key={i} className="startup-card group bg-white/85 backdrop-blur-sm rounded-3xl overflow-hidden shadow-md border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 flex flex-col">
                            <div className="relative h-48 overflow-hidden shrink-0">
                                <img src={startup.img} alt={startup.name}
                                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <span className="absolute top-3 left-3 bg-black/50 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">{startup.category}</span>
                                <span className={`absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${stageColor[startup.stage]}`}>{startup.stage}</span>
                                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: startup.color + "33", border: `1.5px solid ${startup.color}66` }}>
                                        <i className={`${startup.icon} text-sm`} style={{ color: startup.color }} />
                                    </div>
                                    <p className="text-white font-black text-lg drop-shadow">{startup.name}</p>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <p className="text-slate-500 text-xs font-bold italic mb-2">{startup.tagline}</p>
                                <p className="text-slate-700 text-sm font-medium leading-relaxed mb-4 flex-1">{startup.desc}</p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {startup.tags.map((t) => (
                                        <span key={t} className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-100 px-2.5 py-0.5 rounded-full">{t}</span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 text-xs font-bold text-slate-600">
                                    <div><span className="text-slate-400 font-medium block text-[10px] uppercase tracking-wider">Founded</span>{startup.founded}</div>
                                    <div><span className="text-slate-400 font-medium block text-[10px] uppercase tracking-wider">Funding</span><span className="text-green-700">{startup.funding}</span></div>
                                    <div><span className="text-slate-400 font-medium block text-[10px] uppercase tracking-wider">Founders</span>{startup.founders}</div>
                                    <div><span className="text-slate-400 font-medium block text-[10px] uppercase tracking-wider">Reach</span>{startup.users}</div>
                                </div>
                            </div>
                            <div className="h-1 w-full" style={{ background: `linear-gradient(to right,${startup.color},transparent)` }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MENTORS ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-20">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">Our Mentors</h2>
                    <p className="text-slate-500 mt-2 pl-5 font-medium">Industry veterans guiding the next generation of founders.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {mentors.map((m) => (
                        <div key={m.name} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <img src={m.img} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-violet-100" />
                            <h3 className="font-black text-slate-800 text-base mb-0.5">{m.name}</h3>
                            <p className="text-violet-700 text-xs font-bold mb-2">{m.title}</p>
                            <p className="text-slate-500 text-xs font-medium">{m.expertise}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-20">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">Founder Stories</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div key={t.name} className="bg-white/80 backdrop-blur-sm rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-4 right-5 text-6xl text-violet-100 font-serif leading-none pointer-events-none select-none">"</div>
                            <p className="text-slate-700 text-sm leading-relaxed font-medium italic mb-6 relative z-10">"{t.quote}"</p>
                            <div className="flex items-center gap-3">
                                <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-violet-100" />
                                <div>
                                    <p className="font-black text-slate-800 text-sm">{t.name}</p>
                                    <p className="text-violet-700 text-xs font-bold">{t.startup}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── AWARDS ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-20">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">Awards & Recognition</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {awards.map((a) => (
                        <div key={a.title} className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                <i className={`${a.icon} text-amber-600 text-xl`} />
                            </div>
                            <p className="text-amber-700 text-xs font-black uppercase tracking-wider mb-1">{a.year} · {a.body}</p>
                            <h3 className="font-black text-slate-900 text-sm mb-2 leading-tight">{a.title}</h3>
                            <p className="text-slate-600 text-xs font-bold">🏅 {a.winner}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── UPCOMING EVENTS ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-20">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">Upcoming Events</h2>
                </div>
                <div className="space-y-4">
                    {events.map((e) => (
                        <div key={e.title} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-x-1 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-5">
                            <div className="shrink-0 text-center bg-violet-50 border border-violet-100 rounded-2xl p-4 min-w-[110px]">
                                <p className="text-[10px] font-black text-violet-600 uppercase tracking-wider mb-1">{e.type}</p>
                                <p className="text-sm font-black text-slate-900 leading-tight">{e.date}</p>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-slate-800 text-base mb-1">{e.title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{e.desc}</p>
                            </div>
                            <a href="#apply" className="shrink-0 text-xs font-black text-violet-700 bg-violet-50 border border-violet-100 px-4 py-2 rounded-xl hover:bg-violet-100 transition">
                                Register →
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="relative z-10 px-6 max-w-4xl mx-auto pb-20">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic mb-2">Frequently Asked Questions</h2>
                    <p className="text-slate-500 font-medium">Everything you need to know about the incubation programme.</p>
                </div>
                <div className="space-y-3">
                    {faqs.map((f, i) => (
                        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span className="font-black text-slate-800 text-sm">{f.q}</span>
                                <i className={`fas fa-chevron-down text-violet-500 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-5 text-slate-600 text-sm font-medium leading-relaxed border-t border-slate-100 pt-4">
                                    {f.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── APPLY CTA ── */}
            <section id="apply" className="relative z-10 px-6 max-w-6xl mx-auto pb-24">
                <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full -ml-24 -mt-24 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-56 h-56 bg-violet-500/10 rounded-full -mr-20 -mb-20 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="text-5xl mb-4">🚀</div>
                        <h2 className="text-3xl md:text-4xl font-black text-white font-serif italic mb-4">
                            Ready to Build Something <span className="text-amber-400">Big?</span>
                        </h2>
                        <p className="text-white/70 font-medium max-w-xl mx-auto leading-relaxed mb-8">
                            Applications for the next cohort are open. Submit your idea by <strong className="text-amber-400">March 10, 2025</strong> and take the first step toward building a real startup with AIET's full support system behind you.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="mailto:principalaiet08@gmail.com"
                                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-black px-8 py-3.5 rounded-2xl transition shadow-lg shadow-amber-400/20 active:scale-95 text-sm">
                                <i className="fas fa-paper-plane" /> Apply Now
                            </a>
                            <a href="mailto:principalaiet08@gmail.com"
                                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-black px-8 py-3.5 rounded-2xl transition border border-white/20 backdrop-blur text-sm">
                                <i className="fas fa-envelope" /> Contact IIC Cell
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx global>{`
        #main-header{background-color:rgba(255,255,255,0.4)!important;backdrop-filter:blur(20px)!important;border-bottom:2px solid rgba(124,58,237,0.1)!important;}
        #main-header .nav-btn,#main-header span,#main-header i,#main-header h1,#main-header h3,#top-bar span,#top-bar a{color:#b77a00!important;}
        #main-header img{filter:none!important;opacity:1!important;}
        .header-scrolled{background-color:rgba(255,255,255,0.85)!important;backdrop-filter:blur(12px)!important;}
        footer{background-color:#071a34!important;}
        .su-orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:0.3;animation:suFloat 20s ease-in-out infinite alternate;}
        .su-orb-1{width:480px;height:480px;top:5%;left:-10%;background:radial-gradient(circle,#7c3aed44,#a78bfa22);animation-duration:22s;}
        .su-orb-2{width:380px;height:380px;top:40%;right:-8%;background:radial-gradient(circle,#f59e0b44,#fbbf2422);animation-duration:26s;animation-delay:-8s;}
        .su-orb-3{width:320px;height:320px;bottom:10%;left:25%;background:radial-gradient(circle,#3b82f633,#6366f122);animation-duration:20s;animation-delay:-14s;}
        @keyframes suFloat{0%{transform:translate(0,0) scale(1);}33%{transform:translate(28px,-22px) scale(1.05);}66%{transform:translate(-18px,18px) scale(0.97);}100%{transform:translate(14px,-10px) scale(1.03);}}
        .startup-float-icon{color:#7c3aed;opacity:0.10;animation:suIconDrift 18s ease-in-out infinite alternate;will-change:transform;}
        @keyframes suIconDrift{0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:0.07;}30%{transform:translate(16px,-20px) rotate(15deg) scale(1.08);opacity:0.14;}60%{transform:translate(-12px,14px) rotate(-10deg) scale(0.95);opacity:0.09;}100%{transform:translate(8px,-8px) rotate(20deg) scale(1.04);opacity:0.12;}}
      `}</style>
        </div>
    );
}
