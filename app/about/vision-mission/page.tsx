"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileMenu from "../../components/MobileMenu";

export default function VisionMission() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Background animation
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: "power2.out",
      });

      // Subtle parallax for floating elements
      gsap.to(".floating-circle", {
        x: xPos * 1.5,
        y: yPos * 1.5,
        duration: 2,
        ease: "power2.out",
        stagger: 0.1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initial animations for content
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      visionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 },
    )
      .fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.2, transformOrigin: "left" },
        "-=0.5",
      )
      .fromTo(
        missionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5",
      );

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 font-sans">
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full mt-[80px] overflow-hidden">
        <img
          src="/DJI_0135.jpg"
          alt="AIET Vision and Mission"
          className="w-full h-full object-cover"
        />
        {/* Shadow Overlay (Top to Bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent z-10" />

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-4 drop-shadow-2xl italic">
              Vision & <span className="text-yellow-400">Mission</span>
            </h1>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Animated Background Blob */}
      <div
        ref={bgRef}
        className="fixed inset-[-10%] z-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #fef3c7 0%, #fff 70%)",
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[100px] floating-circle" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] floating-circle" />
        <div className="absolute top-1/2 left-2/3 w-[400px] h-[400px] bg-amber-100/50 rounded-full blur-[100px] floating-circle" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 pt-20 pb-20 px-6 max-w-5xl mx-auto"
      >
        {/* Vision Section */}
        <section ref={visionRef} className="mb-20">
          <div className="flex flex-col items-center text-center">
            <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-sm mb-4">
              Our Purpose
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-8 tracking-tight">
              Vision
            </h2>
            <div className="w-24 h-1.5 bg-amber-500 rounded-full mb-10" />
            <p className="text-xl md:text-3xl text-slate-800 leading-relaxed font-medium max-w-4xl italic px-4">
              "To provide an environment for quality education and to nurture
              technical professionals with ethics, social values and skills to
              serve the society."
            </p>
          </div>
        </section>

        {/* Seamless Separation Section */}
        <div
          ref={dividerRef}
          className="flex items-center justify-center gap-6 mb-20 opacity-0"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          <div className="relative">
            <div className="w-4 h-4 rotate-45 border-2 border-amber-400 bg-white" />
            <div className="absolute top-0 left-0 w-4 h-4 rotate-45 border-2 border-amber-400 bg-amber-400/20 blur-[4px]" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </div>

        {/* Mission Section */}
        <section ref={missionRef} className="mb-20">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-8 tracking-tight">
              Mission
            </h2>
            <div className="w-24 h-1.5 bg-amber-500 rounded-full mb-10" />

            <p className="text-xl md:text-3xl text-slate-800 leading-relaxed font-medium max-w-4xl italic px-4">
              "To provide quality education through well-equipped laboratories
              and experienced faculty members, fostering an environment of
              academic excellence. We strive for the holistic development of our
              students, nurturing their overall personality through various
              co-curricular and extra-curricular activities. By establishing
              strong industry-institute interaction, we bridge the gap between
              academia and the corporate world, ensuring our graduates are
              industry-ready. Crucially, we instil social values and ethics
              among our students, empowering them to become responsible citizens
              who contribute meaningfully to society."
            </p>
          </div>
        </section>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Outfit:wght@300;400;500;700&display=swap");

        body {
          font-family: "Outfit", sans-serif;
        }

        h1,
        h2 {
          font-family: "Playfair Display", serif;
        }

        #main-header {
          background-color: rgba(255, 255, 255, 0.4) !important;
          backdrop-filter: blur(20px) !important;
          border-bottom: 2px solid rgba(183, 122, 0, 0.1) !important;
        }

        /* HEADER TEXT COLOR GOLDEN */
        #main-header .nav-btn,
        #main-header span,
        #main-header i,
        #main-header h1,
        #main-header h3,
        #top-bar span,
        #top-bar a {
          color: #b77a00 !important;
        }

        /* LOGO VISIBILITY */
        #main-header img {
          filter: none !important;
          opacity: 1 !important;
        }

        .header-scrolled {
          background-color: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(12px) !important;
          border-bottom: 2px solid rgba(183, 122, 0, 0.2) !important;
        }

        /* FORCE FOOTER COLOR */
        footer {
          background-color: #071a34 !important;
        }
      `}</style>
    </main>
  );
}
