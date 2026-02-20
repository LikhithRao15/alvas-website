"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileMenu from "../../components/MobileMenu";

export default function PrincipalsMessage() {
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
              Principal&apos;s <span className="text-yellow-400">Message</span>
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
                  src="/peter sir.webp"
                  alt="Dr. Peter Fernandes – Principal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-[#1e293b] mb-1">
                  Dr. Peter Fernandes
                </h2>
                <p className="text-[#b77a00] font-bold uppercase tracking-widest text-sm mb-2">
                  Principal, Alva&apos;s Institute of Engineering &amp;
                  Technology
                </p>
                <div className="w-16 h-1 bg-[#b77a00] rounded-full" />
              </div>
            </div>

            {/* Opening quote */}
            <blockquote className="border-l-4 border-[#b77a00] pl-6 mb-8 italic text-slate-500 text-lg leading-relaxed">
              &ldquo;We foster an environment of academic excellence and
              personal growth, ensuring our students are fully prepared for the
              challenges of tomorrow&apos;s industries.&rdquo;
            </blockquote>

            {/* Message body */}
            <div className="space-y-5 text-slate-700 text-[1.05rem] leading-relaxed font-medium">
              <p>
                It is with immense pride and enthusiasm that I welcome you to
                Alva&apos;s Institute of Engineering and Technology. Over the
                years, AIET has grown into a vibrant community of learners,
                innovators, and future leaders — and this achievement belongs to
                every student, faculty member, and staff who has made this
                institution their home.
              </p>
              <p>
                Our academic programmes are carefully designed to balance
                rigorous theoretical foundations with practical,
                industry-relevant skills. We regularly update our curriculum in
                consultation with industry partners to ensure our graduates are
                job-ready from day one. Our state-of-the-art laboratories, smart
                classrooms, and innovation hubs provide students with the very
                best environment to explore new ideas and develop creative
                solutions to real-world problems.
              </p>
              <p>
                Beyond academics, AIET places equal importance on character
                development, leadership, and community service. We believe that
                a well-rounded engineer is one who not only solves technical
                problems, but also communicates effectively, works
                collaboratively, and acts with integrity. Our co-curricular
                activities, cultural events, and sports programmes are
                thoughtfully curated to develop these qualities.
              </p>
              <p>
                I encourage every student to take full advantage of the
                opportunities available here — engage with your professors,
                participate in research projects, join clubs, and build
                friendships that will last a lifetime. Your time at AIET will
                define not just your career, but your character.
              </p>
              <p className="font-bold text-[#1e293b] italic">
                — Dr. Peter Fernandes, Principal
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
