'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Program {
  id: number
  title: string
  level: 'ug' | 'pg'
  image: string
  description: string
  link?: string
}

export default function ProgramsSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ug' | 'pg'>('all')
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Data
  const programs: Program[] = [
    { id: 1, title: 'Computer Science', level: 'ug', image: 'https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg', description: 'B.E Program', link: '/department/cse' },
    { id: 2, title: 'Mechanical Engg.', level: 'ug', image: 'https://surya.ac.in/img/ac6.jpg', description: 'B.E Program', link: '/department/mech' },
    { id: 3, title: 'Artificial Intelligence', level: 'ug', image: 'https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg', description: 'B.E Program', link: '/department/ai' },
    { id: 4, title: 'Information Science', level: 'ug', image: 'https://oed.com.ph/wp-content/uploads/2023/10/computer-science-min.jpg', description: 'B.E Program', link: '/department/ise' },
    { id: 5, title: 'ICB', level: 'ug', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9tdmLDAsZyWBOJIc-2WAIyUUvaCOIbqwb7Q&s', description: 'B.E Program', link: '/department/icb' },
    { id: 6, title: 'Electronics & Comm.', level: 'ug', image: 'https://media.licdn.com/dms/image/v2/D5612AQGhX6wfxBVL6A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1689843321154?e=2147483487&v=beta&t=UyhQvQtBiBgu5BppYzDZ094SwGJXDggwUCOuGTrv_7A', description: 'B.E Program', link: '/department/ece' },
    { id: 7, title: 'MBA', level: 'pg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0XjrmlXgqaAlt5ALO_batYI-KynCEPchuJw&s', description: 'Postgraduate', link: '#' },
    { id: 8, title: 'Civil Engineering', level: 'ug', image: 'https://www.sunconengineers.com/wp-content/uploads/2022/10/Construction-Project-Management-Companies-900x400.jpg', description: 'B.E Program', link: '/department/civil' },
    { id: 9, title: 'Data Science', level: 'ug', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZFcWStmrIlrPId7iL8aO7gDpl_DT5oLhpWg&s', description: 'B.E Program', link: '/department/ai' },
    { id: 10, title: 'Agricultural Engg.', level: 'ug', image: 'https://www.kopykitab.com/blog/wp-content/uploads/2022/05/image-1359.png', description: 'B.E Program', link: '#' },
    { id: 11, title: 'Computer Design', level: 'ug', image: 'https://img.freepik.com/free-photo/design-software-resize-icon-concept_53876-132194.jpg?semt=ais_hybrid&w=740&q=80', description: 'B.E Program', link: '#' },
    { id: 12, title: 'Basic Science & H.', level: 'ug', image: 'https://www.unco.edu/app/uploads/2025/02/book-lightbulb-graphic.jpg', description: 'Department', link: '#' }
  ]

  // Filter Logic
  const filteredPrograms = programs
    .filter(p => activeFilter === 'all' || p.level === activeFilter)
    .sort((a, b) => a.title.localeCompare(b.title))

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // 1. Header Entrance
    gsap.fromTo('.reveal-header', 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: { trigger: '#programs-section', start: 'top 80%' },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out'
      }
    )

    // 2. Background Floating Animation (Light Theme Bubbles)
    gsap.to('.bg-bubble', {
      y: "random(-50, 50)",
      x: "random(-50, 50)",
      duration: "random(5, 10)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

  }, [])

  // Animate List Changes
  useEffect(() => {
    // When filter changes, animate the new list items in
    const cards = document.querySelectorAll('.program-card-container')
    gsap.fromTo(cards,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.2)' }
    )
  }, [activeFilter])

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden" id="programs-section" ref={containerRef}>
      
      {/* --- LIGHT THEME BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Subtle Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
         
         {/* Floating Blobs */}
         <div className="bg-bubble absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply filter blur-[80px]"></div>
         <div className="bg-bubble absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl mix-blend-multiply filter blur-[80px]"></div>
      </div>

      {/* Top Wave (SVG) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="reveal-header font-serif text-3xl md:text-5xl font-black text-slate-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Academic Programs</span>
          </h3>

          <div className="reveal-header inline-flex flex-wrap justify-center gap-1 bg-white p-1.5 rounded-full shadow-lg border border-slate-100">
            {['all', 'ug', 'pg'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f as any)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === f 
                    ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {f === 'all' ? 'All Programs' : f === 'ug' ? 'Undergraduate' : 'Postgraduate'}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DISPLAY 
            - Use proper grid layout.
            - "key" prop on the wrapper ensures React knows which items changed.
        */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
        >
          {filteredPrograms.map((program) => (
            <div 
              key={program.id} 
              className="program-card-container w-full"
            >
              <Link
                href={program.link || '#'}
                className="group relative h-64 w-full rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 block border border-slate-100 bg-white"
              >
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-10 h-1 bg-blue-500 mb-3 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  
                  <h4 className="text-white text-xl font-bold font-sans leading-tight mb-1">
                    {program.title}
                  </h4>
                  
                  <p className="text-blue-200 text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100">
                    {program.description}
                  </p>
                </div>

                {/* Hover Flash Effect */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State Check */}
        {filteredPrograms.length === 0 && (
            <div className="text-center py-20 text-slate-400">
                <p>No programs found in this category.</p>
            </div>
        )}

      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  )
}