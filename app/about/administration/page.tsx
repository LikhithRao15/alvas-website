"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileMenu from "../../components/MobileMenu";
import Link from "next/link";

export default function Administration() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const meshRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Liquid Mesh Animation
    const mesh = meshRef.current;
    if (mesh) {
      const colors = ["#fde68a", "#fef3c7", "#fffbeb", "#fef9c3", "#ffedd5"];
      const blobs = mesh.querySelectorAll(".mesh-blob");

      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: "random(-100, 100)%",
          y: "random(-100, 100)%",
          scale: "random(1, 2)",
          duration: "random(15, 25)",
          repeat: -1,
          yoyo: true,
          ease: "none",
          delay: i * 2,
        });
      });
    }

    // Scroll Animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      ".admin-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.5 },
    );

    return () => {
      gsap.killTweensOf(".mesh-blob");
    };
  }, []);

  const adminData = {
    chairman: {
      name: "Dr. M. Mohan Alva",
      role: "Chairman, Alva's Education Foundation",
      image:
        "/Dr.Mohan-Alva-1.jpg", // Using placeholder logic or actual if available
      message:
        "Our vision is to mold students into innovative leaders with strong cultural and ethical values. Alva's Institute of Engineering & Technology remains committed to academic excellence and social responsibility, ensuring every graduate is prepared to serve the global community.",
    },
    trustees: [
      {
        name: "Mr. Vivek Alva",
        role: "Trustee, AEF",
        image:
          "/vivek.jpg",
        message:
          "Empowering young minds with modern technology while staying rooted in our traditions is the hallmark of Alva's education.",
      },
      {
        name: "Mr. Vinay Alva",
        role: "Trustee, AEF",
        image:
          "/vinay sir.webp",
        message:
          "Consistency in quality and dedication to student success drives our administrative decisions at every level.",
      },
    ],
    management: [
      {
        name: "Administrative Officer",
        role: "AO, AIET",
        image:
          "https://images.unsplash.com/photo-1556155092-490a1ba16d1d?auto=format&fit=crop&q=80&w=400&h=500",
        message:
          "Streamlining operations to create a seamless academic environment for both faculty and students.",
      },
      {
        name: "Dr. Peter Fernandes",
        role: "Principal, AIET",
        image:
          "/peter sir.webp",
        message:
          "Fostering academic rigor and research excellence to place AIET among the top technical institutions globally.",
      },
    ],
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-white font-sans">
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />

      {/* Premium Liquid Mesh Background */}
      <div
        ref={meshRef}
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#fffdf5]"
      >
        <div className="mesh-blob absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-200/40 rounded-full blur-[120px]" />
        <div className="mesh-blob absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-orange-100/40 rounded-full blur-[120px]" />
        <div className="mesh-blob absolute top-[30%] left-[20%] w-[50%] h-[50%] bg-yellow-50/50 rounded-full blur-[100px]" />
        <div className="mesh-blob absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-amber-100/30 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 pt-48 pb-24 px-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-20 space-y-4">
          <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-sm">
            Leadership Team
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 tracking-tight">
            Administration
          </h1>
          <div className="w-24 h-1.5 bg-amber-500 rounded-full mx-auto" />
        </div>

        {/* Chairman Section */}
        <section className="mb-24 px-4 overflow-visible">
          <div className="admin-card max-w-5xl mx-auto bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-amber-900/5 border border-white/80 flex flex-col lg:flex-row items-center gap-12 group transition-all duration-500 hover:shadow-amber-900/10 hover:translate-y-[-5px]">
            <div className="w-full lg:w-1/3 aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
              <img
                src={adminData.chairman.image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={adminData.chairman.name}
              />
            </div>
            <div className="lg:w-2/3 space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-serif font-bold text-slate-900">
                  {adminData.chairman.name}
                </h2>
                <p className="text-amber-700 font-bold tracking-widest text-sm uppercase">
                  {adminData.chairman.role}
                </p>
              </div>
              <div className="relative">
                <i className="fas fa-quote-left text-5xl text-amber-500/10 absolute -top-4 -left-6" />
                <p className="text-xl text-slate-700 leading-relaxed font-medium italic relative z-10">
                  "{adminData.chairman.message}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trustees Section */}
        <section className="mb-24 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-slate-800">
              Our Trustees
            </h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto mt-2" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {adminData.trustees.map((trustee, i) => (
              <div
                key={i}
                className="admin-card bg-white/50 backdrop-blur-lg rounded-[2rem] p-8 shadow-xl shadow-amber-900/5 border border-white/80 group transition-all duration-500 hover:shadow-amber-900/10 hover:translate-y-[-5px]"
              >
                <div className="flex flex-col sm:flex-row gap-8 items-center">
                  <div className="w-40 h-40 shrink-0 overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={trustee.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={trustee.name}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {trustee.name}
                      </h3>
                      <p className="text-amber-600 font-bold text-xs uppercase tracking-wider">
                        {trustee.role}
                      </p>
                    </div>
                    <p className="text-[#475569] text-sm leading-relaxed italic">
                      "{trustee.message}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Management Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-slate-800">
              Key Management
            </h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto mt-2" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {adminData.management.map((manager, i) => (
              <div
                key={i}
                className="admin-card bg-white/50 backdrop-blur-lg rounded-[2rem] p-8 shadow-xl shadow-amber-900/5 border border-white/80 group transition-all duration-500 hover:shadow-amber-900/10 hover:translate-y-[-5px]"
              >
                <div className="flex flex-col sm:flex-row gap-8 items-center">
                  <div className="w-40 h-40 shrink-0 overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={manager.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={manager.name}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {manager.name}
                      </h3>
                      <p className="text-amber-600 font-bold text-xs uppercase tracking-wider">
                        {manager.role}
                      </p>
                    </div>
                    <p className="text-[#475569] text-sm leading-relaxed italic">
                      "{manager.message}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
          background-color: #fffdf5;
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

        #main-header img {
          filter: none !important;
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
