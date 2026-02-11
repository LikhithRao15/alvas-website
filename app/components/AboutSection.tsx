'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function AboutSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Counter Logic Fires ONCE
    ScrollTrigger.create({
      trigger: "#counter-grid",
      start: "top 85%",
      once: true, 
      onEnter: () => {
        document.querySelectorAll(".counter").forEach(c => {
          const target = +(c.getAttribute('data-target') || 0)
          const obj = { val: 0 }
          gsap.to(obj, { 
            val: target, 
            duration: 2.5, 
            ease: "power2.out", 
            onUpdate: () => {
              if (c instanceof HTMLElement) {
                c.innerText = Math.ceil(obj.val).toString()
              }
            }
          })
        })
      }
    })

    // 3D Tilt Interaction Logic
    const card = document.getElementById("tilt-card")
    const container = document.querySelector(".about-image-wrapper")
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!card || !container || window.innerWidth <= 1024) return
      
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -7
      const rotateY = ((x - centerX) / centerX) * 7
      
      if (card instanceof HTMLElement) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      }
    }

    const handleMouseLeave = () => {
      if (card && card instanceof HTMLElement) {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
      }
    }

    if (container && window.innerWidth > 1024) {
      container.addEventListener('mousemove', handleMouseMove as EventListener)
      container.addEventListener('mouseleave', handleMouseLeave as EventListener)
    }

    // Reveal animation
    gsap.to(".reveal-item", {
      y: 0, 
      opacity: 1, 
      duration: 1, 
      stagger: 0.15, 
      ease: "power4.out",
      scrollTrigger: { 
        trigger: "#about-section", 
        start: "top 75%", 
        toggleActions: "play none none reverse" 
      }
    })

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove as EventListener)
        container.removeEventListener('mouseleave', handleMouseLeave as EventListener)
      }
    }
  }, [])

  return (
    <section id="about-section" className="relative py-20 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-20">
        <div>
          <div className="reveal-item opacity-0 translate-y-8 inline-flex items-center gap-2 px-3 py-1 mb-6 bg-white border border-blue-100 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">Est. 2008</span>
          </div>
          <h3 className="reveal-item opacity-0 translate-y-8 font-serif text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight uppercase">
            Crafting Engineers, <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 italic">Defining Future.</span>
          </h3>
          <p className="reveal-item opacity-0 translate-y-8 text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-medium text-justify border-l-4 border-yellow-400 pl-5">
            Welcome to <strong>Alva&apos;s Institute of Engineering & Technology</strong>. 
            Nestled in the greens of Moodbidri, we ignite innovation with a 24/7 research ecosystem.
          </p>
          
          <div id="counter-grid" className="reveal-item opacity-0 translate-y-8 grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white shadow-lg">
              <h4 className="text-2xl md:text-3xl font-black"><span className="counter" data-target="100">0</span>%</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Placement</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white shadow-lg">
              <h4 className="text-2xl md:text-3xl font-black"><span className="counter" data-target="50">0</span>+</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Patents</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white shadow-lg">
              <h4 className="text-2xl md:text-3xl font-black"><span className="counter" data-target="24">0</span>/7</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Lab Access</p>
            </div>
          </div>
        </div>

        <div className="about-image-wrapper perspective-container relative z-20">
          <div 
            id="tilt-card" 
            className="relative h-[400px] w-full bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden transform-style-3d transition-transform duration-100 ease-out cursor-pointer group border-4 border-white/60"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110" 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-90"></div>

            <div className="absolute inset-0 flex items-center justify-center transform translate-z-20">
              <div className="relative w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full border border-white/60 flex items-center justify-center shadow-2xl">
                  <i className="fas fa-play text-2xl text-white ml-1 drop-shadow-md"></i>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 transform translate-z-10">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="bg-yellow-500 text-blue-900 text-[9px] font-extrabold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">
                  Virtual Tour
                </span>
                <h4 className="text-white text-2xl font-bold font-serif leading-tight mb-1">Experience Campus</h4>
                <p className="text-slate-300 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  150 acres of innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}