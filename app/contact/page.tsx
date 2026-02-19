"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";

export default function ContactUs() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const symbolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Background parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animated symbols background
    const symbols = ["\uf095", "\uf098", "\uf1fa", "\uf0e0"]; // Phone, Phone-volume, Envelope-open, Envelope
    const container = symbolsRef.current;
    if (container) {
      for (let i = 0; i < 15; i++) {
        const span = document.createElement("span");
        span.className =
          "absolute text-amber-500/10 font-serif pointer-events-none select-none";
        span.style.fontFamily = '"Font Awesome 6 Free"';
        span.style.fontWeight = "900";
        span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.fontSize = `${Math.random() * 40 + 20}px`;
        span.style.left = `${Math.random() * 100}%`;
        span.style.top = `${Math.random() * 100}%`;
        container.appendChild(span);

        gsap.to(span, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          rotation: "random(-180, 180)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      }
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-white font-manrope">
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />

      {/* Animated Background Layers */}
      <div
        ref={bgRef}
        className="fixed inset-[-5%] z-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #fffbeb 0%, #fff 70%)",
        }}
      >
        <div ref={symbolsRef} className="absolute inset-0 overflow-hidden" />
      </div>

      <div className="relative z-10 pt-44 pb-20 px-6 max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600/60 transition-all duration-300">
          <span className="hover:text-amber-600 cursor-pointer">
            Alva's Institute of Engineering & Technology (AIET)
          </span>
          <i className="fas fa-chevron-right text-[8px] opacity-50" />
          <span className="text-amber-600">Contact Us</span>
        </div>

        {/* Hero Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-6 tracking-tight">
            Contact Us
          </h1>
          <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full" />
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-12">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8">
              Contact Alva’s Institute of Engineering and Technology
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-medium">
              
            </div>
          </div>
        </div>

        {/* Why Reach Out Section */}
       

        {/* Contact Information Cards */}
        <div className="mt-24">
          <h3 className="text-3xl font-serif font-bold text-slate-900 mb-12 text-center">
            Contact Information
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-amber-400 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-phone-alt text-amber-600 text-xl" />
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-4 uppercase tracking-tighter">
                Phone
              </h4>
              <p className="text-slate-600 text-sm font-bold leading-relaxed">
                08258- 262724 / 25
                <br />
                +91 8050585606
                <br />
                +91 9845050268
                <br />
                +91 9448458334
                <br />
                +91 7892552533
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-amber-400 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-fax text-amber-600 text-xl" />
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-4 uppercase tracking-tighter">
                Address
              </h4>
              <p className="text-slate-600 text-sm font-bold">Solapur - Mangalore Highway, Shobhavana Campus MIJAR, Moodbidri, Mangaluru, Karnataka 574225</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-amber-400 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-envelope text-amber-600 text-xl" />
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-4 uppercase tracking-tighter">
                E-mail
              </h4>
              <p className="text-slate-600 text-sm font-bold">
                principalaiet08@gmail.com
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-amber-400 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-globe text-amber-600 text-xl" />
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-4 uppercase tracking-tighter">
                Website
              </h4>
              <p className="text-slate-600 text-sm font-bold">
                www.aiet.org.in
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {/* <div className="mt-24 mx-[-1.5rem] md:mx-0">
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-300 border-[10px] border-white ring-1 ring-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.828833076136!2d74.93821037583626!3d13.011867114131505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3574d5d3e0921%3A0xe546949f5064e62a!2sAlva&#39;s%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1707744000000!5m2!1sen!2sin"
              className="w-full h-[600px]"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div> */}
        <div className="col-span-2 lg:col-span-1">
          <br></br>
          <br></br>
              <h4 className="text-lg font-black tracking-widest uppercase mb-5 text-dark blue">
                Location
              </h4>
              <a
                href="https://www.google.com/maps/place/Alva's+Institute+of+Engineering+and+Technology/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <iframe
                  src="https://www.google.com/maps?q=Alva's+Institute+of+Engineering+and+Technology&output=embed"
                  className="w-full h-[500px] rounded-lg border border-white/10 hover:opacity-90 transition"
                  loading="lazy"
                  title="Alvas Institute Location"
                ></iframe>
              </a>
            </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>

      <style jsx global>{`
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
        #top-bar a {
          color: #b77a00 !important;
        }
        #main-header img {
          filter: none !important;
          opacity: 1 !important;
        }
        .header-scrolled {
          background-color: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(12px) !important;
          border-bottom: 2px solid rgba(183, 122, 0, 0.2) !important;
        }
        footer {
          background-color: #071a34 !important;
        }
      `}</style>
    </main>
  );
}
