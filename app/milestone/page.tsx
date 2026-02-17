"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2022', title: 'The Genesis', desc: 'Orientation, cold brews, and the first "Hello World" that actually mattered.', color: '#3b82f6' },
  { year: '2023', title: 'Data Structures', desc: 'Where dreams went to die and binary trees came to life.', color: '#10b981' },
  { year: '2024', title: 'The Pivot', desc: 'Landing that first internship and realizing stack overflow is a lifestyle.', color: '#f59e0b' },
  { year: '2025', title: 'Deep Tech', desc: 'Exploring AI, LLMs, and high-performance computing.', color: '#8b5cf6' },
  { year: '2026', title: 'The Horizon', desc: 'Graduation. The end of the tutorial, the start of the game.', color: '#ef4444' },
];

export default function AdvancedMilestone() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.milestone-card');
      
      // The "Master Timeline" pinned to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${milestones.length * 150}%`, // Length of the scroll
          pin: true,   // Keeps the viewport stuck while animating
          scrub: 1,    // Smooth follow
          anticipatePin: 1,
        }
      });

      cards.forEach((card, i) => {
        tl.fromTo(card, 
          { 
            z: -3000, 
            opacity: 0, 
            filter: 'blur(20px)',
            scale: 0.2
          }, 
          {
            z: 800, 
            opacity: 1, 
            filter: 'blur(0px)',
            scale: 1.5,
            duration: 1,
            ease: "power2.inOut"
          }, 
          i * 0.8 // Stagger start times
        )
        // Fade out as it "hits" the camera
        .to(card, {
          opacity: 0,
          z: 1500,
          duration: 0.5,
          ease: "power2.in"
        }, (i * 0.8) + 0.5); 
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#050505] selection:bg-white selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute w-full h-full opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <section ref={sectionRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* HUD Elements */}
        <div className="absolute inset-x-10 top-10 flex justify-between items-end border-b border-white/10 pb-4 uppercase font-mono text-xs tracking-[0.3em] text-white/40">
          <div>Archive.v3</div>
          <div>User: Graduate_2026</div>
        </div>

        {/* 3D Stage */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
        >
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="milestone-card absolute w-[90%] max-w-xl p-10 rounded-sm border border-white/10 bg-white/[0.02] backdrop-blur-md will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-6">
                <div className="text-6xl font-black italic tracking-tighter opacity-20" style={{ color: m.color }}>
                  {m.year}
                </div>
                <div className="flex-1">
                  <div className="h-px w-12 mb-6" style={{ backgroundColor: m.color }} />
                  <h2 className="text-4xl font-light tracking-tight mb-4 uppercase">{m.title}</h2>
                  <p className="text-white/50 leading-relaxed font-light text-lg">
                    {m.desc}
                  </p>
                </div>
              </div>

              {/* Advanced UI Accents */}
              <div className="absolute -bottom-2 -right-2 w-24 h-24 border-r border-b border-white/20" />
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Engage Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Footer / Contact */}
      <section className="h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center">
        <h2 className="text-7xl font-bold mb-8 tracking-tighter">Ready for the next chapter?</h2>
        <button className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-500">
          Work with me
        </button>
      </section>
    </div>
  );
}