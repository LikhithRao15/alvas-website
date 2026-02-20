"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileMenu from "../../components/MobileMenu";

/* ─────────────── DATA ─────────────── */
const stats = [
    { value: "25+", label: "Sports Facilities", icon: "fas fa-dumbbell", color: "#f59e0b" },
    { value: "12", label: "Cultural Clubs", icon: "fas fa-music", color: "#8b5cf6" },
    { value: "48+", label: "Titles & Trophies", icon: "fas fa-trophy", color: "#f97316" },
    { value: "3K+", label: "Student Participants", icon: "fas fa-users", color: "#10b981" },
    { value: "18", label: "Annual Cultural Events", icon: "fas fa-theater-masks", color: "#ef4444" },
    { value: "5★", label: "Sports Infrastructure", icon: "fas fa-star", color: "#eab308" },
];

const sports = [
    { name: "Cricket", icon: "fas fa-circle", img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80", achievements: "District Champions 2024", players: "40", color: "#f97316" },
    { name: "Football", icon: "fas fa-futbol", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80", achievements: "State Semi-Finalists 2023", players: "35", color: "#10b981" },
    { name: "Basketball", icon: "fas fa-basketball-ball", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80", achievements: "University Gold 2024", players: "24", color: "#f59e0b" },
    { name: "Kabaddi", icon: "fas fa-running", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80", achievements: "National Finalists 2023", players: "18", color: "#8b5cf6" },
    { name: "Badminton", icon: "fas fa-feather", img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80", achievements: "University Best 2024", players: "30", color: "#3b82f6" },
    { name: "Table Tennis", icon: "fas fa-table-tennis", img: "https://images.unsplash.com/photo-1611251126112-b9d4495b0143?w=600&q=80", achievements: "Zonal Champions 2024", players: "20", color: "#ef4444" },
    { name: "Athletics", icon: "fas fa-medal", img: "https://images.unsplash.com/photo-1509105494475-358d372e6ade?w=600&q=80", achievements: "Track & Field – 5 Gold 2024", players: "50", color: "#eab308" },
    { name: "Chess", icon: "fas fa-chess-knight", img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&q=80", achievements: "State Rank-1 2023", players: "15", color: "#6366f1" },
];

const culturalClubs = [
    { name: "Varnothsava Drama Troupe", category: "Theatre", icon: "fas fa-theater-masks", desc: "Award-winning theatre group performing Kannada, Hindi, and English plays at state competitions.", color: "#e53935" },
    { name: "Rhythm Dance Academy", category: "Dance", icon: "fas fa-music", desc: "Classical Bharatanatyam, folk, and contemporary dance troupe with 80+ members and 6 national medals.", color: "#8b5cf6" },
    { name: "Swarachitra Music Band", category: "Music", icon: "fas fa-guitar", desc: "College rock/fusion band that has headlined Udupi Music Fest and performed at IIT Bombay Mood Indigo.", color: "#f59e0b" },
    { name: "Pixel Photography Club", category: "Photography", icon: "fas fa-camera", desc: "Canon-partnered club running workshops, yearly exhibitions, and a travel photography grant.", color: "#10b981" },
    { name: "Canvas Fine Arts Club", category: "Art", icon: "fas fa-paint-brush", desc: "Visual arts collective with murals across campus and participation in national art competitions.", color: "#f97316" },
    { name: "Quill Literary Society", category: "Literature", icon: "fas fa-pen-nib", desc: "Creative writing, poetry slams, debates, and the annual literary magazine 'The Alva Chronicles'.", color: "#3b82f6" },
];

const megaEvents = [
    {
        name: "Varnothsava", type: "Annual Cultural Fest", edition: "28th Edition", date: "March 2025",
        desc: "AIET's flagship three-day cultural extravaganza featuring 60+ events — dance battles, band wars, comedy nights, fashion shows, and more. Draws 5,000+ attendees each year.",
        img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", color: "#8b5cf6",
        highlights: ["60+ Events", "₹2 L Prize Pool", "5,000+ Attendees", "30+ Colleges"],
    },
    {
        name: "Sportica", type: "Annual Sports Meet", edition: "15th Edition", date: "January 2025",
        desc: "A week-long inter-departmental and inter-collegiate sports tournament spanning 12 sports, with opening & closing ceremonies, march-past and a sports gala night.",
        img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80", color: "#f59e0b",
        highlights: ["12 Sports", "500+ Athletes", "₹1.5 L Prize Pool", "20+ Colleges"],
    },
    {
        name: "TechnoRevels", type: "Tech-Culture Hybrid Fest", edition: "10th Edition", date: "September 2025",
        desc: "Where innovation meets art — three days fusing robotics, hackathons, open-mic, standup comedy, and a digital art expo under one roof.",
        img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", color: "#10b981",
        highlights: ["Hackathon", "Open-Mic Night", "Digital Art Expo", "400+ Participants"],
    },
];

const achievements = [
    { title: "Kabaddi – National Finalist", year: "2023", body: "All India Inter-University Games", icon: "fas fa-medal", color: "#f59e0b" },
    { title: "Athletics – 5 Gold Medals", year: "2024", body: "VTU Sports Meet, Dharwad", icon: "fas fa-trophy", color: "#f97316" },
    { title: "State Best Drama Troupe", year: "2023", body: "Karnataka State Youth Festival", icon: "fas fa-award", color: "#8b5cf6" },
    { title: "Basketball – University Champions", year: "2024", body: "VTU Zonal Tournament", icon: "fas fa-trophy", color: "#10b981" },
    { title: "Chess State Rank-1", year: "2023", body: "Karnataka State Chess Championship", icon: "fas fa-chess", color: "#6366f1" },
    { title: "Best Cultural College Award", year: "2024", body: "DK District Youth Festival", icon: "fas fa-star", color: "#ef4444" },
];

const facilities = [
    { name: "Synthetic Cricket Ground", icon: "fas fa-circle", desc: "Full-length 22-yard pitch, floodlit for evening matches." },
    { name: "Football Stadium", icon: "fas fa-futbol", desc: "FIFA-standard grass pitch with spectator stands for 500." },
    { name: "Indoor Sports Complex", icon: "fas fa-building", desc: "Badminton, TT, chess, carrom, boxing ring — all under one roof." },
    { name: "Olympic Swimming Pool", icon: "fas fa-swimming-pool", desc: "25m pool with changing rooms and a dedicated coach." },
    { name: "Gymnasium", icon: "fas fa-dumbbell", desc: "Modern weight training and cardio equipment, open daily 6am–8pm." },
    { name: "Open Amphitheatre", icon: "fas fa-theater-masks", desc: "600-seat outdoor stage for performances and college events." },
];

const upcomingEvents = [
    { name: "Inter-Department Cricket League", date: "Mar 5, 2025", type: "Sports" },
    { name: "Classical Dance Championship", date: "Mar 12, 2025", type: "Cultural" },
    { name: "Varnothsava 2025 – Registration", date: "Mar 15, 2025", type: "Festival" },
    { name: "Basketball Finals", date: "Mar 22, 2025", type: "Sports" },
    { name: "Open-Mic & Poetry Night", date: "Apr 2, 2025", type: "Cultural" },
    { name: "Sportica 2025 – Kick-off", date: "Apr 10, 2025", type: "Sports" },
];

const typeColor: Record<string, string> = {
    Sports: "bg-green-100 text-green-800",
    Cultural: "bg-violet-100 text-violet-800",
    Festival: "bg-amber-100 text-amber-800",
};

/* ─────────────── GALLERY DATA ─────────────── */
const galleryItems = [
    { src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=900&q=85", caption: "Cricket District Finals", cat: "Sports", span: "g-wide g-tall" },
    { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&q=85", caption: "Varnothsava 2024", cat: "Cultural", span: "" },
    { src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=700&q=85", caption: "Football Championship", cat: "Sports", span: "" },
    { src: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=700&q=85", caption: "Badminton Smash Cup", cat: "Sports", span: "g-tall" },
    { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=85", caption: "TechnoRevels Night", cat: "Events", span: "g-wide" },
    { src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=700&q=85", caption: "Basketball Finals", cat: "Sports", span: "" },
    { src: "https://images.unsplash.com/photo-1509105494475-358d372e6ade?w=700&q=85", caption: "Athletics Track Meet", cat: "Sports", span: "" },
    { src: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=700&q=85", caption: "Chess State Championship", cat: "Sports", span: "" },
    { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&q=85", caption: "Cultural Fest Opening", cat: "Cultural", span: "g-wide" },
    { src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=700&q=85", caption: "Kabaddi Nationals", cat: "Sports", span: "" },
    { src: "https://images.unsplash.com/photo-1611251126112-b9d4495b0143?w=700&q=85", caption: "Table Tennis Zonal", cat: "Sports", span: "" },
    { src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700&q=85", caption: "Sportica 2024 Ceremony", cat: "Events", span: "g-wide" },
];

const galCatColor: Record<string, string> = {
    Sports: "#f59e0b", Cultural: "#a855f7", Events: "#10b981",
};

/* ─────────────── GALLERY COMPONENT ─────────────── */
function GallerySection() {
    const [filter, setFilter] = useState("All");
    const [lightbox, setLightbox] = useState<number | null>(null);
    const cats = ["All", "Sports", "Cultural", "Events"];
    const shown = filter === "All" ? galleryItems : galleryItems.filter((g) => g.cat === filter);

    const go = (dir: 1 | -1) =>
        setLightbox((prev) => (prev === null ? null : (prev + dir + shown.length) % shown.length));

    // Close lightbox on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null);
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    });

    return (
        <section className="relative z-10 px-6 max-w-6xl mx-auto pb-24">
            {/* Section header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-5">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">
                        📸 Moments Gallery
                    </h2>
                    <p className="text-slate-500 mt-2 pl-5 font-medium">
                        Click any photo to view fullscreen. Use arrow keys or buttons to navigate.
                    </p>
                </div>
                {/* Filter pills */}
                <div className="flex gap-2 flex-wrap pl-5 md:pl-0">
                    {cats.map((c) => (
                        <button
                            key={c}
                            onClick={() => setFilter(c)}
                            className="gallery-filter-btn"
                            data-active={filter === c ? "true" : "false"}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bento grid */}
            <div className="gallery-bento">
                {shown.map((item, i) => (
                    <div
                        key={`${filter}-${i}`}
                        className={`gallery-tile ${item.span}`}
                        onClick={() => setLightbox(i)}
                    >
                        <img src={item.src} alt={item.caption} />
                        <div className="gallery-overlay">
                            <span className="gallery-cat" style={{ background: galCatColor[item.cat] + "dd" }}>
                                {item.cat}
                            </span>
                            <p className="gallery-caption">{item.caption}</p>
                            <i className="fas fa-expand" style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* ── LIGHTBOX ── */}
            {lightbox !== null && (
                <div className="gallery-lb-backdrop" onClick={() => setLightbox(null)}>
                    <div className="gallery-lb-box" onClick={(e) => e.stopPropagation()}>
                        {/* Close */}
                        <button className="gallery-lb-close" onClick={() => setLightbox(null)}>
                            <i className="fas fa-times" />
                        </button>
                        {/* Image */}
                        <img
                            key={lightbox}
                            src={shown[lightbox].src}
                            alt={shown[lightbox].caption}
                            className="gallery-lb-img"
                        />
                        {/* Info bar */}
                        <div className="gallery-lb-info">
                            <span className="gallery-lb-badge" style={{ background: galCatColor[shown[lightbox].cat] }}>
                                {shown[lightbox].cat}
                            </span>
                            <p className="gallery-lb-title">{shown[lightbox].caption}</p>
                            <span className="gallery-lb-counter">{lightbox + 1} / {shown.length}</span>
                        </div>
                        {/* Nav */}
                        <button className="gallery-lb-nav gallery-lb-prev" onClick={() => go(-1)}>
                            <i className="fas fa-chevron-left" />
                        </button>
                        <button className="gallery-lb-nav gallery-lb-next" onClick={() => go(1)}>
                            <i className="fas fa-chevron-right" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

/* ─────────────── PAGE ─────────────── */
export default function SportsAndCulturePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"sports" | "cultural">("sports");
    const heroImgRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const achieveRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (heroImgRef.current) {
            gsap.to(heroImgRef.current, {
                yPercent: 22, ease: "none",
                scrollTrigger: { trigger: heroImgRef.current, start: "top top", end: "bottom top", scrub: true },
            });
        }
        if (statsRef.current) {
            gsap.fromTo(statsRef.current.querySelectorAll(".sc-stat"),
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
                    scrollTrigger: { trigger: statsRef.current, start: "top 85%" }
                });
        }
        if (achieveRef.current) {
            gsap.fromTo(achieveRef.current.querySelectorAll(".achieve-card"),
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1, scale: 1, stagger: 0.08, duration: 0.5, ease: "back.out(1.5)",
                    scrollTrigger: { trigger: achieveRef.current, start: "top 82%" }
                });
        }
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <div className="relative min-h-screen font-sans overflow-x-hidden"
            style={{ background: "linear-gradient(135deg,#fefefe 0%,#fff7ed 40%,#faf0ff 100%)" }}>

            {/* ── ANIMATED BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle,#d4a57430 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
                {[
                    { icon: "fas fa-futbol", top: "6%", left: "5%", size: 28, dur: 15, delay: 0 },
                    { icon: "fas fa-music", top: "14%", left: "88%", size: 32, dur: 20, delay: -4 },
                    { icon: "fas fa-running", top: "32%", left: "4%", size: 24, dur: 18, delay: -7 },
                    { icon: "fas fa-theater-masks", top: "55%", left: "91%", size: 28, dur: 17, delay: -5 },
                    { icon: "fas fa-basketball-ball", top: "72%", left: "7%", size: 24, dur: 22, delay: -11 },
                    { icon: "fas fa-guitar", top: "82%", left: "78%", size: 28, dur: 19, delay: -3 },
                    { icon: "fas fa-trophy", top: "22%", left: "48%", size: 20, dur: 26, delay: -14 },
                    { icon: "fas fa-dumbbell", top: "60%", left: "58%", size: 22, dur: 16, delay: -6 },
                    { icon: "fas fa-medal", top: "90%", left: "23%", size: 22, dur: 21, delay: -9 },
                    { icon: "fas fa-paint-brush", top: "45%", left: "19%", size: 20, dur: 14, delay: -2 },
                    { icon: "fas fa-camera", top: "18%", left: "30%", size: 18, dur: 23, delay: -12 },
                    { icon: "fas fa-star", top: "76%", left: "42%", size: 20, dur: 18, delay: -8 },
                    { icon: "fas fa-swimming-pool", top: "40%", left: "70%", size: 18, dur: 24, delay: -16 },
                    { icon: "fas fa-chess-knight", top: "10%", left: "66%", size: 22, dur: 20, delay: -10 },
                ].map((ic, i) => (
                    <i key={i} className={`${ic.icon} sc-float-icon`}
                        style={{
                            position: "absolute", top: ic.top, left: ic.left, fontSize: ic.size,
                            animationDuration: `${ic.dur}s`, animationDelay: `${ic.delay}s`
                        } as React.CSSProperties} />
                ))}
                <div className="sc-orb sc-orb-1" /><div className="sc-orb sc-orb-2" /><div className="sc-orb sc-orb-3" />
            </div>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

            {/* ── HERO ── */}
            <section className="relative h-[65vh] w-full mt-[80px] overflow-hidden z-10">
                <div ref={heroImgRef} className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1800&q=80"
                        alt="Sports and Culture at AIET" className="w-full h-full object-cover scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/55 to-slate-900/85 flex flex-col items-center justify-center p-6">
                    <nav className="flex items-center gap-2 text-white/55 text-sm mb-6 font-medium">
                        <Link href="/" className="hover:text-amber-400 transition">Home</Link>
                        <i className="fas fa-chevron-right text-[9px]" />
                        <Link href="/campus-life" className="hover:text-amber-400 transition">Campus Life</Link>
                        <i className="fas fa-chevron-right text-[9px]" />
                        <span className="text-amber-400">Sports &amp; Culture</span>
                    </nav>
                    <div className="text-center max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-purple-400/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
                            <i className="fas fa-futbol" /> Sports · Arts · Culture
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif drop-shadow-2xl">
                            Sports &amp;{" "}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#f59e0b,#a855f7)" }}>
                                Culture
                            </span>
                        </h1>
                        <p className="text-white/75 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                            Where champions are forged and artists find their voice. Life at AIET extends far beyond the classroom.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            <a href="#sports-section" className="bg-amber-500 hover:bg-amber-600 text-white font-black px-6 py-3 rounded-2xl transition text-sm shadow-lg shadow-amber-400/30">
                                <i className="fas fa-running mr-2" />Explore Sports
                            </a>
                            <a href="#culture-section" className="bg-purple-600 hover:bg-purple-700 text-white font-black px-6 py-3 rounded-2xl transition text-sm shadow-lg shadow-purple-400/30">
                                <i className="fas fa-music mr-2" />Explore Culture
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
                        <div key={s.label} className="sc-stat bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-slate-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: s.color + "20" }}>
                                <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                            </div>
                            <div className="text-2xl font-black text-slate-900 mb-0.5">{s.value}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-tight">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MEGA EVENTS ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-16">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">Signature Events</h2>
                    <p className="text-slate-500 mt-2 pl-5 font-medium">The events that define the AIET experience.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {megaEvents.map((ev) => (
                        <div key={ev.name} className="group rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white/85 backdrop-blur-sm flex flex-col">
                            <div className="relative h-52 overflow-hidden shrink-0">
                                <img src={ev.img} alt={ev.name}
                                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest text-white bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/20">{ev.type}</span>
                                <span className="absolute top-3 right-3 text-[10px] font-black text-white px-3 py-1 rounded-full" style={{ background: ev.color + "cc" }}>{ev.edition}</span>
                                <div className="absolute bottom-3 left-4">
                                    <h3 className="text-white font-black text-2xl drop-shadow-lg">{ev.name}</h3>
                                    <p className="text-white/60 text-xs font-bold">{ev.date}</p>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4 flex-1">{ev.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {ev.highlights.map((h) => (
                                        <span key={h} className="text-[10px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: ev.color + "18", color: ev.color }}>{h}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="h-1" style={{ background: `linear-gradient(to right,${ev.color},transparent)` }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SPORTS & CULTURAL TABS ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-20">
                <div className="flex gap-2 mb-10 p-1 bg-slate-100 rounded-2xl w-fit">
                    <button onClick={() => setActiveTab("sports")}
                        className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all ${activeTab === "sports" ? "bg-amber-500 text-white shadow-md" : "text-slate-600 hover:text-slate-900"}`}>
                        <i className="fas fa-running mr-2" />Sports
                    </button>
                    <button onClick={() => setActiveTab("cultural")}
                        className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all ${activeTab === "cultural" ? "bg-purple-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"}`}>
                        <i className="fas fa-music mr-2" />Cultural Clubs
                    </button>
                </div>

                {activeTab === "sports" && (
                    <div id="sports-section">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">Sports at AIET</h2>
                            <p className="text-slate-500 mt-2 pl-5 font-medium">8 sports, two inter-collegiate tournaments, and a legacy of champions.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {sports.map((s) => (
                                <div key={s.name} className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="relative h-36 overflow-hidden">
                                        <img src={s.img} alt={s.name}
                                            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <div className="absolute bottom-2 left-3 flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: s.color + "33" }}>
                                                <i className={`${s.icon} text-xs`} style={{ color: s.color }} />
                                            </div>
                                            <span className="text-white font-black text-sm drop-shadow">{s.name}</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs font-bold text-amber-600 mb-1"><i className="fas fa-trophy mr-1" />{s.achievements}</p>
                                        <p className="text-xs text-slate-500 font-medium"><i className="fas fa-users mr-1" />{s.players} active players</p>
                                    </div>
                                    <div className="h-0.5" style={{ background: `linear-gradient(to right,${s.color},transparent)` }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "cultural" && (
                    <div id="culture-section">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-purple-500 pl-5">Cultural Clubs</h2>
                            <p className="text-slate-500 mt-2 pl-5 font-medium">6 clubs. One goal — nurturing talent beyond textbooks.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {culturalClubs.map((c) => (
                                <div key={c.name} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-[0.06]" style={{ background: c.color, borderRadius: "0 0 0 100%" }} />
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: c.color + "1a" }}>
                                        <i className={`${c.icon} text-xl`} style={{ color: c.color }} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3 inline-block" style={{ background: c.color + "18", color: c.color }}>
                                        {c.category}
                                    </span>
                                    <h3 className="font-black text-slate-800 text-base mb-2">{c.name}</h3>
                                    <p className="text-slate-600 text-sm font-medium leading-relaxed">{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* ── ACHIEVEMENTS ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-20" ref={achieveRef}>
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">Awards &amp; Achievements</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {achievements.map((a) => (
                        <div key={a.title} className="achieve-card group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-4">
                            <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center" style={{ background: a.color + "20" }}>
                                <i className={`${a.icon} text-xl`} style={{ color: a.color }} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">{a.year} · {a.body}</p>
                                <h3 className="font-black text-slate-800 text-sm leading-tight">{a.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FACILITIES ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-20">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">World-Class Facilities</h2>
                    <p className="text-slate-500 mt-2 pl-5 font-medium">Infrastructure built to help students train, perform, and create at their best.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {facilities.map((f) => (
                        <div key={f.name} className="bg-gradient-to-br from-white/80 to-slate-50/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-4 items-start">
                            <div className="w-11 h-11 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center shrink-0">
                                <i className={`${f.icon} text-amber-600 text-lg`} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 text-sm mb-1">{f.name}</h3>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── UPCOMING EVENTS ── */}
            <section className="relative z-10 px-6 max-w-6xl mx-auto pb-20">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 font-serif italic border-l-8 border-amber-400 pl-5">Upcoming Events</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingEvents.map((e) => (
                        <div key={e.name} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-100 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
                            <div className="shrink-0 bg-slate-50 border border-slate-100 rounded-xl p-3 text-center min-w-[72px]">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{e.type}</p>
                                <p className="text-xs font-black text-slate-800 leading-tight mt-0.5">{e.date.split(",")[0]}</p>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-slate-800 text-sm leading-tight">{e.name}</h3>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[e.type]} mt-1 inline-block`}>{e.type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── GALLERY ── */}
            <GallerySection />

            <Footer />

            <style jsx global>{`
        #main-header{background-color:rgba(255,255,255,0.4)!important;backdrop-filter:blur(20px)!important;border-bottom:2px solid rgba(168,85,247,0.12)!important;}
        #main-header .nav-btn,#main-header span,#main-header i,#main-header h1,#main-header h3,#top-bar span,#top-bar a{color:#b77a00!important;}
        #main-header img{filter:none!important;opacity:1!important;}
        .header-scrolled{background-color:rgba(255,255,255,0.85)!important;backdrop-filter:blur(12px)!important;}
        footer{background-color:#071a34!important;}

        /* Orbs */
        .sc-orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:0.30;animation:scFloat 20s ease-in-out infinite alternate;}
        .sc-orb-1{width:500px;height:500px;top:4%;left:-12%;background:radial-gradient(circle,#f59e0b44,#fde68a22);animation-duration:22s;}
        .sc-orb-2{width:400px;height:400px;top:38%;right:-8%;background:radial-gradient(circle,#a855f744,#ddd6fe22);animation-duration:28s;animation-delay:-9s;}
        .sc-orb-3{width:340px;height:340px;bottom:8%;left:20%;background:radial-gradient(circle,#10b98133,#6ee7b722);animation-duration:20s;animation-delay:-15s;}
        @keyframes scFloat{0%{transform:translate(0,0) scale(1);}33%{transform:translate(26px,-22px) scale(1.06);}66%{transform:translate(-16px,18px) scale(0.96);}100%{transform:translate(12px,-10px) scale(1.03);}}

        /* Floating icons */
        .sc-float-icon{color:#a855f7;opacity:0.09;animation:scIconDrift 18s ease-in-out infinite alternate;will-change:transform;}
        @keyframes scIconDrift{
          0%  {transform:translate(0,0) rotate(0deg) scale(1);opacity:0.07;}
          30% {transform:translate(18px,-20px) rotate(12deg) scale(1.08);opacity:0.14;}
          60% {transform:translate(-14px,15px) rotate(-8deg) scale(0.95);opacity:0.08;}
          100%{transform:translate(9px,-9px) rotate(18deg) scale(1.04);opacity:0.11;}
        }

        /* ── GALLERY ── */
        .gallery-bento{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          grid-auto-rows:200px;
          gap:10px;
          border-radius:1.5rem;
          overflow:hidden;
        }
        @media(max-width:768px){
          .gallery-bento{grid-template-columns:repeat(2,1fr);grid-auto-rows:150px;}
          .g-wide,.g-tall,.g-wide.g-tall{grid-column:span 1!important;grid-row:span 1!important;}
        }
        .gallery-tile{
          position:relative;overflow:hidden;cursor:zoom-in;
          border-radius:12px;background:#e2e8f0;
        }
        .g-wide{grid-column:span 2;}
        .g-tall{grid-row:span 2;}
        .gallery-tile img{
          width:100%;height:100%;object-fit:cover;display:block;
          transition:transform 0.6s ease;
        }
        .gallery-tile:hover img{transform:scale(1.08);}
        .gallery-overlay{
          position:absolute;inset:0;
          background:linear-gradient(to top,rgba(0,0,0,0.80) 0%,rgba(0,0,0,0.12) 55%,transparent 100%);
          opacity:0;transition:opacity 0.3s ease;
          display:flex;flex-direction:column;
          align-items:flex-start;justify-content:flex-end;
          padding:14px;
        }
        .gallery-tile:hover .gallery-overlay{opacity:1;}
        .gallery-cat{
          font-size:9px;font-weight:800;letter-spacing:0.1em;
          text-transform:uppercase;color:#fff;
          padding:2px 9px;border-radius:999px;margin-bottom:5px;
        }
        .gallery-caption{color:#fff;font-size:13px;font-weight:700;line-height:1.3;}
        .gallery-filter-btn{
          padding:6px 18px;border-radius:999px;font-size:13px;font-weight:700;
          border:1.5px solid #e2e8f0;background:#fff;color:#475569;
          cursor:pointer;transition:all 0.2s;
        }
        .gallery-filter-btn[data-active="true"]{background:#0f172a;color:#fff;border-color:#0f172a;box-shadow:0 4px 12px rgba(0,0,0,0.2);}
        .gallery-filter-btn:hover{border-color:#94a3b8;}

        /* Lightbox */
        .gallery-lb-backdrop{
          position:fixed;inset:0;z-index:9999;
          background:rgba(0,0,0,0.93);backdrop-filter:blur(10px);
          display:flex;align-items:center;justify-content:center;
          animation:lbIn 0.22s ease;
        }
        @keyframes lbIn{from{opacity:0}to{opacity:1}}
        .gallery-lb-box{
          position:relative;
          display:flex;flex-direction:column;align-items:center;
          max-width:min(94vw,1100px);
        }
        .gallery-lb-img{
          max-height:74vh;max-width:100%;
          object-fit:contain;border-radius:1rem;
          box-shadow:0 40px 100px rgba(0,0,0,0.7);
          animation:lbImgIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes lbImgIn{from{transform:scale(0.85) translateY(16px);opacity:0}to{transform:none;opacity:1}}
        .gallery-lb-info{
          display:flex;align-items:center;gap:10px;
          margin-top:14px;width:100%;padding:0 4px;
        }
        .gallery-lb-badge{font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#fff;padding:3px 10px;border-radius:999px;white-space:nowrap;}
        .gallery-lb-title{flex:1;color:#fff;font-size:14px;font-weight:700;}
        .gallery-lb-counter{color:rgba(255,255,255,0.45);font-size:12px;font-weight:600;white-space:nowrap;}
        .gallery-lb-close{
          position:absolute;top:-48px;right:0;
          width:34px;height:34px;border-radius:50%;
          background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);
          color:#fff;font-size:13px;cursor:pointer;
          display:grid;place-items:center;transition:background 0.2s;
        }
        .gallery-lb-close:hover{background:rgba(255,255,255,0.28);}
        .gallery-lb-nav{
          position:absolute;top:calc(50% - 20px);transform:translateY(-50%);
          width:44px;height:44px;border-radius:50%;
          background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);
          color:#fff;font-size:15px;cursor:pointer;
          display:grid;place-items:center;transition:background 0.2s;
        }
        .gallery-lb-nav:hover{background:rgba(255,255,255,0.26);}
        .gallery-lb-prev{left:-58px;}.gallery-lb-next{right:-58px;}
        @media(max-width:700px){
          .gallery-lb-prev{left:-40px;}.gallery-lb-next{right:-40px;}
          .gallery-lb-nav{width:36px;height:36px;font-size:13px;}
        }
      `}</style>
        </div>
    );
}
