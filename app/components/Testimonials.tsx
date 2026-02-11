'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FaArrowRight } from 'react-icons/fa'

interface Testimonials {
  id: number
  title: string
  description: string
  modalIndex: number
}

interface ModalData {
  title: string
  description: string
}

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<NodeListOf<HTMLDivElement> | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  
  const campusData: ModalData[] = [
    {
      title: "Skill Labs",
      description: "State-of-the-art laboratories enabling hands-on technical excellence."
    },
    {
      title: "MOUs",
      description: "Industry partnerships that enhance training, internships, and research exposure."
    },
    {
      title: "Autonomous and Accreditation",
      description: "Ensures academic flexibility, quality standards, and recognized excellence."
    },
    {
      title: "Training and Career",
      description: "Dedicated career training, placement preparation, and professional mentoring."
    },
    {
      title: "Student Clubs",
      description: "Clubs that promote leadership, creativity, teamwork, and personal growth."
    },
    {
      title: "Innovation and Research",
      description: "A creative ecosystem for innovation, startups, and advanced research."
    },
    {
      title: "ATC",
      description: "Alva's Technological Center focused on industry-driven technical skill development."
    },
    {
      title: "Sports and Culture",
      description: "Encouraging sportsmanship, fitness, cultural expression, and teamwork."
    }
  ]

  const highlights: Testimonials[] = [
    {
      id: 1,
      title: "Skill labs",
      description: "Equipped labs strengthen practical skills and industry-ready expertise.",
      modalIndex: 0
    },
    {
      id: 2,
      title: "MOUs",
      description: "Industry partnerships support internships, research, training, and professional exposure.",
      modalIndex: 1
    },
    {
      id: 3,
      title: "Autonomous and accreditation",
      description: "Ensures academic flexibility, quality standards, and recognized excellence.",
      modalIndex: 2
    },
    {
      id: 4,
      title: "Training and career",
      description: "Provides training, internships, and career guidance for employability.",
      modalIndex: 3
    },
    {
      id: 5,
      title: "Clubs",
      description: "Student clubs develop leadership, teamwork, creativity, and technical interests.",
      modalIndex: 4
    },
    {
      id: 6,
      title: "Innovation and research",
      description: "Fosters creativity and research-driven solutions for real-world problems.",
      modalIndex: 5
    },
    {
      id: 7,
      title: "Atc",
      description: "Alva's Technological Center promotes hands-on learning, innovation, and industry-focused technical skills.",
      modalIndex: 6
    },
    {
      id: 8,
      title: "Sports and Culture",
      description: "Encourages fitness, cultural engagement, teamwork, and holistic development.",
      modalIndex: 7
    }
  ]

  const [modalOpen, setModalOpen] = useState(false)
  const [currentModalData, setCurrentModalData] = useState<ModalData>(campusData[0])

  useEffect(() => {
    // Get all cards after DOM is loaded
    cardsRef.current = document.querySelectorAll('.step-card')
    
    // Set up the animation
    let animationFrameId: number
    let position = 0
    const speed = 0.6 // lower = slower, smoother
    const gap = 24

    const animate = () => {
      if (!isPaused && sliderRef.current) {
        position -= speed

        // Get the total width of all cards
        if (cardsRef.current && cardsRef.current.length > 0) {
          const cardWidth = cardsRef.current[0].offsetWidth + gap
          const totalWidth = cardWidth * cardsRef.current.length

          // Reset position seamlessly
          if (Math.abs(position) >= totalWidth) {
            position = 0
          }

          sliderRef.current.style.transform = `translateX(${position}px)`
        }
      }

      // Update center card highlighting
      updateCenterCard()
      animationFrameId = requestAnimationFrame(animate)
    }

    const updateCenterCard = () => {
      if (!cardsRef.current || !sliderRef.current?.parentElement) return

      const sliderRect = sliderRef.current.parentElement.getBoundingClientRect()
      const centerX = sliderRect.left + sliderRect.width / 2

      cardsRef.current.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.left + rect.width / 2
        const distance = Math.abs(centerX - cardCenter)

        if (distance < rect.width / 2) {
          // ⭐ DOMINANT CENTER CARD
          gsap.to(card, {
            scale: 1.1,
            y: -12,
            opacity: 1,
            duration: 0.3,
            ease: "power3.out",
          })
        } else {
          gsap.to(card, {
            scale: 1,
            y: 0,
            opacity: 0.85,
            duration: 0.3,
            ease: "power3.out",
          })
        }
      })
    }

    // Initialize the animation
    animate()

    // Set up hover/touch events
    const sliderWrapper = sliderRef.current?.parentElement
    if (sliderWrapper) {
      const handleMouseEnter = () => setIsPaused(true)
      const handleMouseLeave = () => setIsPaused(false)
      
      sliderWrapper.addEventListener('mouseenter', handleMouseEnter)
      sliderWrapper.addEventListener('mouseleave', handleMouseLeave)
      sliderWrapper.addEventListener('touchstart', handleMouseEnter, { passive: true })
      sliderWrapper.addEventListener('touchend', handleMouseLeave, { passive: true })

      return () => {
        cancelAnimationFrame(animationFrameId)
        sliderWrapper.removeEventListener('mouseenter', handleMouseEnter)
        sliderWrapper.removeEventListener('mouseleave', handleMouseLeave)
        sliderWrapper.removeEventListener('touchstart', handleMouseEnter)
        sliderWrapper.removeEventListener('touchend', handleMouseLeave)
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused])

  const openCampusModal = (index: number) => {
    setCurrentModalData(campusData[index])
    setModalOpen(true)
  }

  const closeCampusModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <section className="relative py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Title */}
          <div className="mb-10">
            <h3 className="font-serif text-3xl md:text-4xl font-black text-slate-900">
              CAMPUS HIGHLIGHTS
            </h3>
            <div className="w-20 h-1 bg-orange-500 mt-3"></div>
          </div>

          {/* Slider Wrapper */}
          <div className="overflow-hidden relative">
            <div 
              ref={sliderRef}
              id="step-slider" 
              className="flex gap-6 w-max"
            >
              {highlights.map((highlight) => (
                <div 
                  key={highlight.id}
                  className="step-card bg-white rounded-2xl p-6 shadow-lg w-80 flex-shrink-0 cursor-pointer transition-all duration-300"
                  onClick={() => openCampusModal(highlight.modalIndex)}
                >
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {highlight.title}
                  </h4>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {highlight.description}
                  </p>
                  <button 
                    type="button"
                    className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors"
                  >
                    READ MORE <FaArrowRight />
                  </button>
                </div>
              ))}
              
              {/* Clone cards for seamless loop */}
              {highlights.map((highlight) => (
                <div 
                  key={`clone-${highlight.id}`}
                  className="step-card bg-white rounded-2xl p-6 shadow-lg w-80 flex-shrink-0 cursor-pointer transition-all duration-300"
                  onClick={() => openCampusModal(highlight.modalIndex)}
                >
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {highlight.title}
                  </h4>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {highlight.description}
                  </p>
                  <button 
                    type="button"
                    className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors"
                  >
                    READ MORE <FaArrowRight />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div 
        id="campusModal" 
        className={`fixed inset-0 bg-black/70 items-center justify-center z-[9999] transition-opacity duration-300 ${
          modalOpen ? 'flex opacity-100' : 'hidden opacity-0'
        }`}
        onClick={closeCampusModal}
      >
        <div 
          className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-scale"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeCampusModal}
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>

          <h4
            id="campusModalTitle"
            className="text-2xl font-black text-slate-900 mb-4"
          >
            {currentModalData.title}
          </h4>
          <p
            id="campusModalDesc"
            className="text-slate-600 text-sm mb-6 leading-relaxed"
          >
            {currentModalData.description}
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            KNOW MORE
            <FaArrowRight />
          </a>
        </div>
      </div>

      <style jsx>{`
        .animate-scale {
          animation: scaleIn 0.3s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}