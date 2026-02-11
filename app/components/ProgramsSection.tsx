'use client'

import { useEffect, useState } from 'react'
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
  const [programs] = useState<Program[]>([
    { id: 1, title: 'Computer Science', level: 'ug', image: 'https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg', description: 'B.E Program', link: '/departments/cse' },
    { id: 2, title: 'Mechanical Engg.', level: 'ug', image: 'https://surya.ac.in/img/ac6.jpg', description: 'B.E Program' },
    { id: 3, title: 'Artificial Intelligence', level: 'ug', image: 'https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg', description: 'B.E Program' },
    { id: 4, title: 'Information Science', level: 'ug', image: 'https://oed.com.ph/wp-content/uploads/2023/10/computer-science-min.jpg', description: 'B.E Program' },
    { id: 5, title: 'ICB', level: 'ug', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9tdmLDAsZyWBOJIc-2WAIyUUvaCOIbqwb7Q&s', description: 'B.E Program' },
    { id: 6, title: 'Electronics & Comm.', level: 'ug', image: 'https://media.licdn.com/dms/image/v2/D5612AQGhX6wfxBVL6A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1689843321154?e=2147483487&v=beta&t=UyhQvQtBiBgu5BppYzDZ094SwGJXDggwUCOuGTrv_7A', description: 'B.E Program' },
    { id: 7, title: 'MBA', level: 'pg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0XjrmlXgqaAlt5ALO_batYI-KynCEPchuJw&s', description: 'Postgraduate' },
    { id: 8, title: 'Civil Engineering', level: 'ug', image: 'https://www.sunconengineers.com/wp-content/uploads/2022/10/Construction-Project-Management-Companies-900x400.jpg', description: 'B.E Program' },
    { id: 9, title: 'Data Science', level: 'ug', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZFcWStmrIlrPId7iL8aO7gDpl_DT5oLhpWg&s', description: 'B.E Program' },
    { id: 10, title: 'Agricultural Engg.', level: 'ug', image: 'https://www.kopykitab.com/blog/wp-content/uploads/2022/05/image-1359.png', description: 'B.E Program' },
    { id: 11, title: 'Computer Design', level: 'ug', image: 'https://img.freepik.com/free-photo/design-software-resize-icon-concept_53876-132194.jpg?semt=ais_hybrid&w=740&q=80', description: 'B.E Program' },
    { id: 12, title: 'Basic Science & H.', level: 'ug', image: 'https://www.unco.edu/app/uploads/2025/02/book-lightbulb-graphic.jpg', description: 'Department' }
  ])

  const [sortedPrograms, setSortedPrograms] = useState<Program[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const sorted = [...programs].sort((a, b) => a.title.localeCompare(b.title))
    setSortedPrograms(sorted)

    gsap.from('.reveal-header', {
      scrollTrigger: { trigger: '#programs-section', start: 'top 75%' },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    })
  }, [programs])

  const filterPrograms = (type: 'all' | 'ug' | 'pg') => {
    setActiveFilter(type)
    // Small timeout to allow DOM to update before animation
    setTimeout(() => {
        const cards = document.querySelectorAll('.program-card:not(.hidden)')
        gsap.fromTo(cards, 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.2)' }
        )
        ScrollTrigger.refresh()
    }, 10)
  }

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden" id="programs-section">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <div className="text-center mb-10">
          <h3 className="font-serif text-3xl md:text-5xl font-black text-slate-900 mb-6 reveal-header">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Academic Programs</span>
          </h3>

          <div className="reveal-header inline-flex flex-wrap justify-center gap-1 bg-white p-1 rounded-full shadow-sm border border-slate-200">
            {['all', 'ug', 'pg'].map((f) => (
              <button
                key={f}
                onClick={() => filterPrograms(f as any)}
                className={`px-5 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === f ? 'bg-blue-900 text-white shadow-md' : 'text-slate-500 hover:text-blue-900'
                }`}
              >
                {f === 'all' ? 'All Programs' : f === 'ug' ? 'Undergraduate' : 'Postgraduate'}
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE SLIDER LOGIC:
            - flex overflow-x-auto: Creates the horizontal scroll on mobile
            - snap-x snap-mandatory: Makes it feel like a slider (snaps to cards)
            - sm:grid sm:overflow-visible: Reverts to grid on larger screens
        */}
        <div 
          id="program-grid" 
          className="flex overflow-x-auto pb-8 sm:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible"
        >
          {sortedPrograms.map((program) => (
            <div 
              key={program.id} 
              className={`min-w-[85vw] sm:min-w-0 snap-center transition-all duration-300 ${
                activeFilter !== 'all' && program.level !== activeFilter ? 'hidden' : 'block'
              }`}
            >
              <a
                href={program.link || '#'}
                className="program-card group relative h-48 w-full rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all hover:-translate-y-2 hover:shadow-2xl block"
              >
                <img
                  src={program.image}
                  alt={program.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/40 to-transparent opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="w-8 h-1 bg-yellow-400 mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <h4 className="text-white text-xl font-bold font-manrope translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {program.title}
                  </h4>
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {program.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  )
}