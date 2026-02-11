'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface CampusItem {
  id: number
  title: string
  subtitle: string
  description: string
  link: string
  image: string
  position: number
  modalTitle?: string
  modalDesc?: string
}

interface ModalData {
  title: string
  description: string
  image: string
  link: string
}

export default function CampusHighlights() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    description: '',
    image: '',
    link: ''
  })
  const [isGridActive, setIsGridActive] = useState(false)
  
  const gridRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const modalBackdropRef = useRef<HTMLDivElement>(null)
  const modalPanelRef = useRef<HTMLDivElement>(null)

  const campusItems: CampusItem[] = [
    {
      id: 1,
      title: "Student Clubs",
      subtitle: "Life at Alva's",
      description: "Experience a vibrant campus life filled with cultural diversity, academic excellence, and endless opportunities.",
      link: "/about",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
      position: 0
    },
    {
      id: 2,
      title: "Skill labs",
      subtitle: "Laboratories",
      description: "State-of-the-art innovation labs.",
      link: "/labs",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800",
      position: 1
    },
    {
      id: 3,
      title: "Research",
      subtitle: "Research",
      description: "Groundbreaking scientific research.",
      link: "/research",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
      position: 2
    },
    {
      id: 4,
      title: "Library",
      subtitle: "Library",
      description: "Digital and physical resources 24/7.",
      link: "/library",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
      position: 3
    },
    {
      id: 5,
      title: "Sports",
      subtitle: "Sports",
      description: "World-class athletic facilities.",
      link: "/sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
      position: 4
    },
    {
      id: 6,
      title: "Culture",
      subtitle: "Culture",
      description: "Celebrating diversity and art.",
      link: "/culture",
      image: "https://t3.ftcdn.net/jpg/01/54/24/96/360_F_154249693_9G4LPN3ywf3F4ZNuveNRCCPykS8GzjNz.jpg",
      position: 5
    },
    {
      id: 7,
      title: "MOU's",
      subtitle: "Community",
      description: "Real-world social impact.",
      link: "/outreach",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
      position: 6
    },
    {
      id: 8,
      title: "Training",
      subtitle: "Admissions",
      description: "Start your journey today.",
      link: "/admissions",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      position: 7
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initialize animations
    if (gridRef.current && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsGridActive(true)
              if (gridRef.current) {
                gridRef.current.classList.add('is-active')
              }
            } else {
              setIsGridActive(false)
              if (gridRef.current) {
                gridRef.current.classList.remove('is-active')
              }
            }
          })
        },
        { threshold: 0.3 }
      )

      observer.observe(containerRef.current)

      return () => observer.disconnect()
    }
  }, [])

  const openModal = (item: CampusItem) => {
    setModalData({
      title: item.subtitle || item.title,
      description: item.description,
      image: item.image,
      link: item.link
    })
    setIsModalOpen(true)
    
    // Animate modal in
    setTimeout(() => {
      if (modalBackdropRef.current && modalPanelRef.current) {
        modalBackdropRef.current.classList.remove('opacity-0')
        modalPanelRef.current.classList.remove('scale-95', 'opacity-0')
        modalPanelRef.current.classList.add('scale-100', 'opacity-100')
      }
    }, 10)
    
    // Prevent body scroll
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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [isModalOpen])

  return (
    <>
      <section 
        ref={containerRef}
        id="interactive-grid-container" 
        className="relative min-h-[130vh] bg-gray-50 flex flex-col items-center justify-center overflow-hidden pt-24 pb-48 px-4 font-sans"
      >
        <div className="container mx-auto px-4 mb-6 relative z-50">
          <h3 className="text-center font-serif text-3xl md:text-5xl font-black text-slate-900 mb-6">
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Highlights</span>
          </h3>
        </div>

        <div 
          ref={gridRef}
          id="grid-trigger" 
          className="relative w-40 h-28 sm:w-56 sm:h-36 md:w-80 md:h-52 transition-all duration-1000"
        >
          {/* Main Center Card */}
          <div 
            onClick={() => openModal(campusItems[0])}
            className="absolute inset-0 z-30 overflow-hidden rounded-2xl border-2 border-white shadow-2xl cursor-pointer bg-black transition-transform duration-700"
          >
            <img 
              src={campusItems[0].image} 
              alt={campusItems[0].title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <h2 className="font-serif text-xl md:text-4xl text-white font-bold drop-shadow-lg text-center">
                Student <span className="text-yellow-400 italic">Clubs</span>
              </h2>
            </div>
          </div>

          {/* Surrounding Cards */}
          {campusItems.slice(1).map((item, index) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className={`card-node absolute inset-0 z-10 overflow-hidden rounded-2xl border border-white shadow-lg cursor-pointer transition-all duration-1000 ease-in-out bg-gray-200 ${
                isGridActive ? 'expanded' : ''
              }`}
              style={getCardStyle(index + 1)}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-2">
                <span className="text-white font-serif italic font-bold text-xs md:text-lg">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <div 
          id="infoModal" 
          className={`fixed inset-0 z-[100] ${isModalOpen ? 'flex' : 'hidden'}`}
        >
          <div 
            ref={modalBackdropRef}
            id="modalBackdrop" 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 opacity-0"
            onClick={closeModal}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div 
              ref={modalPanelRef}
              id="modalPanel" 
              className="relative bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl grid md:grid-cols-2 transition-all duration-300 transform scale-95 opacity-0"
            >
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 z-50 bg-black/10 hover:bg-black/20 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <div className="relative h-64 md:h-full bg-gray-100">
                <img 
                  id="modalImage" 
                  src={modalData.image} 
                  alt={modalData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center text-left">
                <h3 className="font-serif italic text-4xl text-gray-900 font-bold mb-4">
                  {modalData.title}
                </h3>
                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                <p className="text-gray-600 mb-8 text-lg">
                  {modalData.description}
                </p>
                <a 
                  href={modalData.link}
                  className="inline-flex justify-center items-center rounded-xl bg-gray-900 px-6 py-4 text-white font-bold hover:bg-blue-600 transition"
                >
                  View Full Details →
                </a>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* Positions for collapsed state */
          .card-node:nth-child(2) { transform: translate(-20px, -15px); }
          .card-node:nth-child(3) { transform: translate(0, -30px); }
          .card-node:nth-child(4) { transform: translate(20px, -15px); }
          .card-node:nth-child(5) { transform: translate(-35px, 10px); }
          .card-node:nth-child(6) { transform: translate(35px, 10px); }
          .card-node:nth-child(7) { transform: translate(-15px, 30px); }
          .card-node:nth-child(8) { transform: translate(15px, 30px); }

          /* Expanded State Transforms */
          #grid-trigger.is-active .card-node:nth-child(2) { transform: translate(-125%, -85%) !important; }
          #grid-trigger.is-active .card-node:nth-child(3) { transform: translate(0, -145%) !important; }
          #grid-trigger.is-active .card-node:nth-child(4) { transform: translate(125%, -85%) !important; }
          #grid-trigger.is-active .card-node:nth-child(5) { transform: translate(-145%, 15%) !important; }
          #grid-trigger.is-active .card-node:nth-child(6) { transform: translate(145%, 15%) !important; }
          #grid-trigger.is-active .card-node:nth-child(7) { transform: translate(-75%, 130%) !important; }
          #grid-trigger.is-active .card-node:nth-child(8) { transform: translate(75%, 130%) !important; }

          /* Fix: Lockdown hover movement entirely */
          .is-active .card-node:hover { transform: inherit !important; transition: none !important; z-index: 40; }
        `}</style>
      </section>
    </>
  )
}

// Helper function to get card style based on position
function getCardStyle(position: number) {
  const styles = [
    {}, // Position 1 (center card - handled separately)
    { transform: 'translate(-20px, -15px)' },
    { transform: 'translate(0, -30px)' },
    { transform: 'translate(20px, -15px)' },
    { transform: 'translate(-35px, 10px)' },
    { transform: 'translate(35px, 10px)' },
    { transform: 'translate(-15px, 30px)' },
    { transform: 'translate(15px, 30px)' }
  ]
  return styles[position] || {}
}