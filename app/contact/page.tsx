"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";

const contactCards = [
  {
    icon: "fas fa-phone-alt",
    label: "Call Us",
    color: "amber",
    lines: [
      "08258-262724 / 25",
      "+91 8050585606",
      "+91 9845050268",
      "+91 9448458334",
      "+91 7892552533",
    ],
    action: { href: "tel:+918050585606", text: "Call Now" },
  },
  {
    icon: "fas fa-envelope",
    label: "Email Us",
    color: "blue",
    lines: ["principalaiet08@gmail.com"],
    action: { href: "mailto:principalaiet08@gmail.com", text: "Send Email" },
  },
  {
    icon: "fas fa-map-marker-alt",
    label: "Visit Us",
    color: "indigo",
    lines: [
      "Solapur – Mangalore Highway,",
      "Shobhavana Campus, MIJAR,",
      "Moodbidri, Mangaluru,",
      "Karnataka – 574225",
    ],
    action: {
      href: "https://www.google.com/maps/place/Alva's+Institute+of+Engineering+and+Technology/",
      text: "Get Directions",
    },
  },
  {
    icon: "fas fa-globe",
    label: "Website",
    color: "violet",
    lines: ["www.aiet.org.in"],
    action: { href: "https://www.aiet.org.in", text: "Visit Website" },
  },
];

const colorMap: Record<string, { bg: string; icon: string; btn: string; border: string; orb: string }> = {
  amber: { bg: "bg-amber-50", icon: "text-amber-600", btn: "bg-amber-600 hover:bg-amber-700", border: "hover:border-amber-400", orb: "bg-amber-400/20" },
  blue: { bg: "bg-blue-50", icon: "text-blue-600", btn: "bg-blue-700 hover:bg-blue-800", border: "hover:border-blue-400", orb: "bg-blue-400/20" },
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", btn: "bg-indigo-700 hover:bg-indigo-800", border: "hover:border-indigo-400", orb: "bg-indigo-400/20" },
  violet: { bg: "bg-violet-50", icon: "text-violet-600", btn: "bg-violet-700 hover:bg-violet-800", border: "hover:border-violet-400", orb: "bg-violet-400/20" },
};

export default function ContactPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero image parallax
    if (heroImgRef.current) {
      gsap.to(heroImgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroImgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (heroTitleRef.current) {
      gsap.fromTo(heroTitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.querySelectorAll(".contact-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 85%" }
        }
      );
    }

    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" }
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      className="relative min-h-screen font-sans cursor-default overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #fefefe 0%, #faf8f4 40%, #f0f4ff 100%)" }}
    >
      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, #c8b89040 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        {/* Colour orbs */}
        <div className="contact-orb contact-orb-1" />
        <div className="contact-orb contact-orb-2" />
        <div className="contact-orb contact-orb-3" />
        <div className="contact-orb contact-orb-4" />
        {/* Floating contact icons */}
        {[
          { icon: "fas fa-phone-alt", top: "8%", left: "5%", size: 28, dur: 14, delay: 0, rot: 20 },
          { icon: "fas fa-envelope", top: "15%", left: "88%", size: 36, dur: 18, delay: -3, rot: -15 },
          { icon: "fas fa-map-marker-alt", top: "35%", left: "3%", size: 24, dur: 20, delay: -7, rot: 10 },
          { icon: "fas fa-globe", top: "55%", left: "92%", size: 32, dur: 16, delay: -5, rot: -25 },
          { icon: "fas fa-paper-plane", top: "70%", left: "8%", size: 28, dur: 22, delay: -10, rot: 30 },
          { icon: "fas fa-comment-dots", top: "80%", left: "78%", size: 30, dur: 17, delay: -2, rot: -10 },
          { icon: "fas fa-handshake", top: "25%", left: "50%", size: 22, dur: 25, delay: -14, rot: 15 },
          { icon: "fas fa-phone-alt", top: "60%", left: "60%", size: 20, dur: 19, delay: -6, rot: -20 },
          { icon: "fas fa-envelope", top: "90%", left: "20%", size: 26, dur: 21, delay: -9, rot: 12 },
          { icon: "fas fa-wifi", top: "45%", left: "20%", size: 22, dur: 15, delay: -4, rot: -8 },
          { icon: "fas fa-satellite-dish", top: "12%", left: "35%", size: 24, dur: 23, delay: -11, rot: 18 },
          { icon: "fas fa-map-marker-alt", top: "75%", left: "45%", size: 20, dur: 18, delay: -8, rot: -22 },
          { icon: "fas fa-phone-volume", top: "48%", left: "75%", size: 26, dur: 20, delay: -15, rot: 8 },
          { icon: "fas fa-comment", top: "30%", left: "70%", size: 20, dur: 16, delay: -1, rot: -14 },
          { icon: "fas fa-paper-plane", top: "88%", left: "55%", size: 18, dur: 24, delay: -13, rot: 25 },
          { icon: "fas fa-at", top: "20%", left: "15%", size: 30, dur: 13, delay: -3, rot: -30 },
          { icon: "fas fa-globe", top: "65%", left: "30%", size: 18, dur: 26, delay: -17, rot: 5 },
          { icon: "fas fa-envelope-open", top: "5%", left: "62%", size: 22, dur: 19, delay: -6, rot: -18 },
        ].map((ic, i) => (
          <i
            key={i}
            className={`${ic.icon} contact-float-icon`}
            style={{
              position: "absolute",
              top: ic.top,
              left: ic.left,
              fontSize: ic.size,
              animationDuration: `${ic.dur}s`,
              animationDelay: `${ic.delay}s`,
              "--rot": `${ic.rot}deg`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {/* ── HERO BANNER (same as MOU page) ── */}
      <section className="relative h-[60vh] w-full mt-[80px] overflow-hidden z-10">
        <div ref={heroImgRef} className="absolute inset-0">
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
            <i className="fas fa-chevron-right text-[10px]" />
            <span className="text-amber-400">Contact Us</span>
          </nav>
          <div className="text-center max-w-3xl" ref={heroTitleRef} style={{ opacity: 0 }}>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
              <i className="fas fa-handshake" />
              We&apos;d Love to Hear From You
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif drop-shadow-2xl">
              Contact Us
            </h1>
            <p className="text-white/75 text-lg font-medium max-w-xl mx-auto leading-relaxed">
              Reach out for admissions, research collaborations, or any general enquiries.
            </p>
          </div>
        </div>
        {/* Wave */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,60 C360,0 1080,60 1440,0 L1440,60 Z" fill="#fefefe" />
        </svg>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="relative z-10 px-6 max-w-6xl mx-auto pb-16" ref={cardsRef}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card) => {
            const c = colorMap[card.color];
            return (
              <div
                key={card.label}
                className={`contact-card group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-md border border-slate-100 ${c.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden`}
              >
                {/* BG orb */}
                <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${c.orb} blur-2xl pointer-events-none`} />

                <div className={`w-12 h-12 ${c.bg} rounded-2xl flex items-center justify-center mb-5`}>
                  <i className={`${card.icon} ${c.icon} text-xl`} />
                </div>
                <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-3">
                  {card.label}
                </h3>
                <div className="space-y-0.5 mb-5">
                  {card.lines.map((l, i) => (
                    <p key={i} className="text-slate-600 text-sm font-medium leading-relaxed">{l}</p>
                  ))}
                </div>
                <a
                  href={card.action.href}
                  target={card.action.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-xs font-bold text-white ${c.btn} px-4 py-2 rounded-full transition-all shadow-sm`}
                >
                  {card.action.text}
                  <i className="fas fa-arrow-right text-[9px]" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FORM + MAP ── */}
      <section className="relative z-10 px-6 max-w-6xl mx-auto pb-20">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ENQUIRY FORM */}
          <div ref={formRef} className="bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-xl border border-slate-100 p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 font-serif mb-2">
                Send an Enquiry
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Fill in the form and our team will get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-check-circle text-green-500 text-3xl" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-slate-500 font-medium">We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text" name="name" required value={formData.name} onChange={handleChange}
                      placeholder="Dr. / Mr. / Ms. Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder:text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder:text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="subject" required value={formData.subject} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  >
                    <option value="">Select a topic…</option>
                    <option>Admissions Enquiry</option>
                    <option>Academic / Faculty</option>
                    <option>Research Collaboration</option>
                    <option>Placements & Recruitments</option>
                    <option>Infrastructure / Facilities</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message" required rows={5} value={formData.message} onChange={handleChange}
                    placeholder="Write your message here…"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none placeholder:text-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-amber-200 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-paper-plane" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* MAP */}
          <div className="flex flex-col gap-6">
            {/* Quick facts */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-[2rem] p-7 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full -mr-16 -mt-16 pointer-events-none" />
              <h3 className="font-black text-lg mb-5 font-serif italic text-amber-400">
                Quick Facts
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "fas fa-clock", label: "Office Hours", val: "Mon – Sat\n9:00 AM – 5:00 PM" },
                  { icon: "fas fa-map-pin", label: "CET Code", val: "E-169" },
                  { icon: "fas fa-university", label: "Affiliated To", val: "VTU, Belagavi" },
                  { icon: "fas fa-award", label: "Established", val: "2008" },
                ].map((f) => (
                  <div key={f.label} className="bg-white/10 rounded-2xl p-4">
                    <i className={`${f.icon} text-amber-400 mb-2 text-sm`} />
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">{f.label}</p>
                    <p className="text-sm font-bold text-white whitespace-pre-line">{f.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
              <a
                href="https://www.google.com/maps/place/Alva's+Institute+of+Engineering+and+Technology/"
                target="_blank" rel="noopener noreferrer"
                className="block"
              >
                <iframe
                  src="https://www.google.com/maps?q=Alva's+Institute+of+Engineering+and+Technology&output=embed"
                  className="w-full h-[320px] hover:opacity-90 transition"
                  loading="lazy"
                  title="AIET Location Map"
                />
              </a>
              <div className="bg-white px-5 py-4 flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-amber-500" />
                <p className="text-xs font-bold text-slate-600">Shobhavana Campus, Moodbidri, Karnataka</p>
                <a
                  href="https://www.google.com/maps/place/Alva's+Institute+of+Engineering+and+Technology/"
                  target="_blank" rel="noopener noreferrer"
                  className="ml-auto text-xs font-black text-amber-600 hover:text-amber-700 flex items-center gap-1 shrink-0"
                >
                  Open Maps <i className="fas fa-external-link-alt text-[9px]" />
                </a>
              </div>
            </div>
          </div>
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
          border-bottom: 2px solid rgba(183, 122, 0, 0.2) !important;
        }
        footer { background-color: #071a34 !important; }

        /* ── Background orbs ── */
        .contact-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.35;
          animation: contactFloat 18s ease-in-out infinite alternate;
        }
        .contact-orb-1 {
          width: 500px; height: 500px;
          top: 0%; left: -12%;
          background: radial-gradient(circle, #f59e0b55, #fbbf2422);
          animation-duration: 22s;
        }
        .contact-orb-2 {
          width: 400px; height: 400px;
          top: 25%; right: -10%;
          background: radial-gradient(circle, #3b82f644, #6366f122);
          animation-duration: 26s;
          animation-delay: -7s;
        }
        .contact-orb-3 {
          width: 350px; height: 350px;
          bottom: 25%; left: 15%;
          background: radial-gradient(circle, #8b5cf633, #a78bfa22);
          animation-duration: 20s;
          animation-delay: -14s;
        }
        .contact-orb-4 {
          width: 280px; height: 280px;
          bottom: 5%; right: 10%;
          background: radial-gradient(circle, #f59e0b33, #fb923c22);
          animation-duration: 30s;
          animation-delay: -5s;
        }
        @keyframes contactFloat {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(25px, -20px) scale(1.05); }
          66%  { transform: translate(-18px, 18px) scale(0.97); }
          100% { transform: translate(12px, -8px) scale(1.03); }
        }

        /* ── Floating contact icons ── */
        .contact-float-icon {
          color: #b77a00;
          opacity: 0.12;
          animation: iconDrift var(--dur, 18s) ease-in-out infinite alternate;
          animation-duration: inherit;
          animation-delay: inherit;
          will-change: transform;
        }
        @keyframes iconDrift {
          0%   { transform: translate(0px,   0px)   rotate(0deg)          scale(1);    opacity: 0.08; }
          25%  { transform: translate(18px, -22px)  rotate(var(--rot, 15deg)) scale(1.1); opacity: 0.15; }
          50%  { transform: translate(-14px, 16px)  rotate(calc(var(--rot, 15deg) * -0.7)) scale(0.95); opacity: 0.10; }
          75%  { transform: translate(10px,  24px)  rotate(calc(var(--rot, 15deg) * 0.5))  scale(1.05); opacity: 0.14; }
          100% { transform: translate(-8px, -10px)  rotate(calc(var(--rot, 15deg) * -1))   scale(1);    opacity: 0.09; }
        }
      `}</style>
    </div>
  );
}
