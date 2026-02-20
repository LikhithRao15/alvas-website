"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileMenu from "../../components/MobileMenu";

export default function ChairmansMessage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {/* Hero */}
      <section className="relative h-[55vh] w-full mt-[80px] overflow-hidden">
        <img
          src="/DJI_0135.jpg"
          alt="AIET Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl font-serif italic uppercase tracking-wider">
              Chairman&apos;s <span className="text-yellow-400">Message</span>
            </h1>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-2 bg-gradient-to-r from-[#b77a00] to-yellow-400" />

          <div className="p-8 md:p-14">
            {/* Profile */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
              <div className="shrink-0 w-40 h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-[#b77a00]/20">
                <img
                  src="/Dr.Mohan-Alva-1.jpg"
                  alt="Dr. Mohan Alva – Chairman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-[#1e293b] mb-1">
                  Dr. Mohan Alva
                </h2>
                <p className="text-[#b77a00] font-bold uppercase tracking-widest text-sm mb-2">
                  Chairman, Alva&apos;s Education Foundation
                </p>
                <div className="w-16 h-1 bg-[#b77a00] rounded-full" />
              </div>
            </div>

            {/* Opening quote */}
            <blockquote className="border-l-4 border-[#b77a00] pl-6 mb-8 italic text-slate-500 text-lg leading-relaxed">
              &ldquo;Education is the most powerful tool to bring dignity,
              opportunity, and transformation to every individual and
              society.&rdquo;
            </blockquote>

            {/* Message body */}
            <div className="space-y-5 text-slate-700 text-[1.05rem] leading-relaxed font-medium">
              <p>
                Welcome to Alva&apos;s Institute of Engineering and Technology —
                an institution built not merely on bricks and mortar, but on the
                timeless values of knowledge, character, and service. Since our
                founding, it has been my deepest conviction that true education
                must go beyond textbooks and examinations. It must mould
                students into compassionate, responsible, and innovative human
                beings who contribute meaningfully to society.
              </p>
              <p>
                At AIET, we have always believed that excellence is not an
                accident — it is the result of sustained effort, inspired
                teaching, and a campus culture that nurtures curiosity. Our
                faculty are not just educators; they are mentors who invest
                their time and passion into every student&apos;s journey. Our
                infrastructure, laboratories, and research centres are designed
                to give students every resource they need to explore,
                experiment, and excel.
              </p>
              <p>
                The world today demands engineers who can think critically,
                collaborate across disciplines, and adapt to rapidly evolving
                technologies. I am proud to say that our graduates consistently
                demonstrate these qualities in industries across India and
                around the globe. Their success is our greatest achievement and
                our strongest motivation to keep improving.
              </p>
              <p>
                I warmly invite students, parents, and educators to join the
                Alva&apos;s family. Together, let us build a future where every
                young mind finds the guidance, opportunity, and confidence to
                reach their fullest potential.
              </p>
              <p className="font-bold text-[#1e293b] italic">
                — Dr. M. Mohan Alva, Chairman
              </p>
            </div>

            {/* Back link */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[0.85rem] font-bold text-white bg-[#b77a00] px-6 py-3 rounded-full hover:bg-[#966500] transition-colors shadow-sm"
              >
                <i className="fas fa-arrow-left text-[10px]" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        #main-header {
          background-color: rgba(255, 255, 255, 0.4) !important;
          backdrop-filter: blur(20px) !important;
          border-bottom: 2px solid rgba(183, 122, 0, 0.1) !important;
        }
        #main-header .nav-btn,
        #main-header h1,
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
        }
        footer {
          background-color: #071a34 !important;
        }
      `}</style>
    </div>
  );
}
