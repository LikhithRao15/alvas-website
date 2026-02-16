'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaTimes, FaArrowRight } from 'react-icons/fa'

interface CampusItem {
  id: number
  title: string
  subtitle: string
  description: string
  link: string
  image: string
}

interface ModalData {
  title: string
  description: string
  image: string
  link: string
}

export default function CampusHighlights() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<ModalData>({ title: '', description: '', image: '', link: '' })
  const [isGridActive, setIsGridActive] = useState(false)
  
  const gridRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const modalBackdropRef = useRef<HTMLDivElement>(null)
  const modalPanelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const campusItems: CampusItem[] = [
    { id: 1, title: "Student Clubs", subtitle: "Life at Alva's", description: "Experience a vibrant campus life filled with cultural diversity.", link: "/about", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Skill labs", subtitle: "Laboratories", description: "State-of-the-art innovation labs.", link: "/labs", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800" },
    { id: 3, title: "Research", subtitle: "Research", description: "Groundbreaking scientific research.", link: "/research", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800" },
    { id: 4, title: "Library", subtitle: "Library", description: "Digital and physical resources 24/7.", link: "/library", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800" },
    { id: 5, title: "Sports", subtitle: "Sports", description: "World-class athletic facilities.", link: "/sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800" },
    { id: 6, title: "Culture", subtitle: "Culture", description: "Celebrating diversity and art.", link: "/culture", image: "https://t3.ftcdn.net/jpg/01/54/24/96/360_F_154249693_9G4LPN3ywf3F4ZNuveNRCCPykS8GzjNz.jpg" },
    { id: 7, title: "MOU's", subtitle: "Community", description: "Real-world social impact.", link: "/outreach", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800" },
    { id: 8, title: "Training", subtitle: "Admissions", description: "Start your journey today.", link: "/admissions", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" }
  ]

  // --- 1. Background Animation (Fluid Sine Waves) ---
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let width = canvas.width
    let height = canvas.height
    let increment = 0
    
    const waves = [
        { y: height * 0.5, length: 0.01, amplitude: 50, speed: 0.01, color: 'rgba(59, 130, 246, 0.1)' },
        { y: height * 0.5, length: 0.02, amplitude: 30, speed: 0.02, color: 'rgba(99, 102, 241, 0.1)' },
        { y: height * 0.55, length: 0.005, amplitude: 80, speed: 0.005, color: 'rgba(139, 92, 246, 0.05)' }
    ]

    const animate = () => {
        ctx.clearRect(0, 0, width, height)
        increment += 0.01

        waves.forEach(wave => {
            ctx.beginPath()
            ctx.moveTo(0, wave.y)

            for (let i = 0; i < width; i++) {
                const y = wave.y + Math.sin(i * wave.length + increment * (wave.speed * 100)) * wave.amplitude
                const complexY = y + Math.sin(i * 0.003 + increment) * 20
                ctx.lineTo(i, complexY)
            }

            ctx.lineTo(width, height)
            ctx.lineTo(0, height)
            ctx.fillStyle = wave.color
            ctx.fill()
        })

        requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
        if (!canvas) return
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
        canvas.width = width
        canvas.height = height
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // --- 2. Scroll Trigger Logic ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (gridRef.current && containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%", 
        end: "bottom 40%",
        onEnter: () => setIsGridActive(true),
        onLeaveBack: () => setIsGridActive(false)
      })
    }
  }, [])

  const openModal = (item: CampusItem) => {
    if (!isGridActive && item.id !== 1) return 

    setModalData({
      title: item.subtitle || item.title,
      description: item.description,
      image: item.image,
      link: item.link
    })
    setIsModalOpen(true)
    
    setTimeout(() => {
      if (modalBackdropRef.current && modalPanelRef.current) {
        modalBackdropRef.current.classList.remove('opacity-0')
        modalPanelRef.current.classList.remove('scale-95', 'opacity-0')
        modalPanelRef.current.classList.add('scale-100', 'opacity-100')
      }
    }, 10)
    
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    if (modalBackdropRef.current && modalPanelRef.current) {
      modalBackdropRef.current.classList.add('opacity-0')
      modalPanelRef.current.classList.remove('scale-100', 'opacity-100')
      modalPanelRef.current.classList.add('scale-95', 'opacity-0')
    }

    setTimeout(() => {
      setIsModalOpen(false)
      document.body.style.overflow = 'auto'
    }, 300)
  }

  return (
    <>
      <section 
        ref={containerRef}
        id="interactive-grid-container" 
        className="relative min-h-screen bg-slate-50 flex flex-col items-center justify-center overflow-hidden py-24 px-4 font-sans"
      >
        {/* Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        <div className="container mx-auto px-4 mb-10 relative z-50">
          <h3 className="text-center font-serif text-3xl md:text-5xl font-black text-slate-900 mb-2">
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Highlights</span>
          </h3>
          <p className="text-center text-slate-500 text-sm md:text-base">Explore the vibrant ecosystem of Alva's</p>
        </div>

        {/* THE GRID CONTAINER - Higher Z-Index */}
        <div 
          ref={gridRef}
          id="grid-trigger" 
          className={`relative w-40 h-28 sm:w-56 sm:h-36 md:w-80 md:h-52 transition-all duration-1000 z-10 ${isGridActive ? 'is-active' : ''}`}
        >
          {/* Center Card (Always visible) */}
          <div 
            onClick={() => openModal(campusItems[0])}
            className="absolute inset-0 z-30 overflow-hidden rounded-2xl border-4 border-white shadow-2xl cursor-pointer bg-slate-900 transition-transform duration-500 hover:scale-105"
          >
            <img 
              src={campusItems[0].image} 
              alt={campusItems[0].title}
              className="w-full h-full object-cover opacity-90"
            />
            {/* Center Card Overlay - Always Visible */}
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/40">
              <h2 className="font-serif text-xl md:text-3xl text-white font-bold drop-shadow-md text-center">
                Student <span className="text-yellow-400 italic">Clubs</span>
              </h2>
            </div>
          </div>

          {/* Surrounding Cards */}
          {campusItems.slice(1).map((item, index) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className={`card-node group absolute inset-0 z-10 overflow-hidden rounded-xl border-2 border-white shadow-lg cursor-pointer bg-white transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) ${
                isGridActive ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              style={getCardStyle(index + 1)}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay - Always Visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>

              {/* Text Content - CENTERED & SERIF FONT (Matching Center Card) */}
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <span className="text-white font-serif text-lg md:text-2xl font-bold italic text-center drop-shadow-md transform transition-transform duration-300 group-hover:-translate-y-1">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM BLEND FADE (Z-Index Lowered) --- */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent pointer-events-none z-0"></div>

        {/* --- MODAL --- */}
        <div className={`fixed inset-0 z-[100] ${isModalOpen ? 'flex' : 'hidden'}`}>
          <div 
            ref={modalBackdropRef}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 opacity-0"
            onClick={closeModal}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div 
              ref={modalPanelRef}
              className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2 transition-all duration-300 transform scale-95 opacity-0 pointer-events-auto"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-slate-900 shadow-md transition-colors"
              >
                <FaTimes />
              </button>

              <div className="relative h-64 md:h-full bg-slate-200">
                <img src={modalData.image} alt={modalData.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-10 flex flex-col justify-center bg-white">
                <h3 className="font-serif italic text-4xl text-slate-900 font-bold mb-4">{modalData.title}</h3>
                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">{modalData.description}</p>
                <a href={modalData.link} className="inline-flex items-center gap-2 self-start rounded-lg bg-slate-900 px-6 py-3 text-white font-bold hover:bg-blue-600 transition shadow-lg">
                  Explore <FaArrowRight className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* Initial Stacked Positions (Card Deck) */
          .card-node:nth-child(2) { transform: translate(-10px, -10px) rotate(-5deg); z-index: 5; }
          .card-node:nth-child(3) { transform: translate(10px, -5px) rotate(3deg); z-index: 4; }
          .card-node:nth-child(4) { transform: translate(-5px, 10px) rotate(-2deg); z-index: 3; }
          .card-node:nth-child(5) { transform: translate(5px, 5px) rotate(4deg); z-index: 2; }
          .card-node:nth-child(6) { transform: translate(0px, 0px) rotate(0deg); z-index: 1; }
          .card-node:nth-child(7) { transform: translate(-8px, -8px) rotate(-3deg); z-index: 1; }
          .card-node:nth-child(8) { transform: translate(8px, 8px) rotate(2deg); z-index: 1; }

          /* Expanded Grid Positions (Explosion) */
          #grid-trigger.is-active .card-node:nth-child(2) { transform: translate(-140%, -110%) rotate(0deg) !important; } /* Top Left */
          #grid-trigger.is-active .card-node:nth-child(3) { transform: translate(0%, -160%) rotate(0deg) !important; }   /* Top Center */
          #grid-trigger.is-active .card-node:nth-child(4) { transform: translate(140%, -110%) rotate(0deg) !important; }  /* Top Right */
          #grid-trigger.is-active .card-node:nth-child(5) { transform: translate(-180%, 20%) rotate(0deg) !important; }   /* Middle Left */
          #grid-trigger.is-active .card-node:nth-child(6) { transform: translate(180%, 20%) rotate(0deg) !important; }    /* Middle Right */
          #grid-trigger.is-active .card-node:nth-child(7) { transform: translate(-90%, 140%) rotate(0deg) !important; }   /* Bottom Left */
          #grid-trigger.is-active .card-node:nth-child(8) { transform: translate(90%, 140%) rotate(0deg) !important; }    /* Bottom Right */

          /* Hover Scale Fix */
          .is-active .card-node:hover { z-index: 50; transform: scale(1.05) !important; transition: transform 0.3s ease !important; }
        `}</style>
      </section>
     
    </>
  )
}

function getCardStyle(position: number) {
  return {} 
}