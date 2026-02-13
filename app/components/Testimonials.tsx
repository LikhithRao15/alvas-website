'use client'

import { useEffect, useRef, useState } from 'react'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  quote: string
  rating: number
}

export default function Testimonials() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Aarav Sharma",
      role: "Alumni, Batch 2023",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "Alva's provided me with the technical foundation and soft skills I needed to crack the interview at Google. The campus vibe is unmatched!",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Hegde",
      role: "Final Year, CSE",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "The placement training here is rigorous and effective. I learned more in the 6-month specialized coding bootcamps than I ever expected.",
      rating: 5
    },
    {
      id: 3,
      name: "Rahul Nair",
      role: "Student, Mechanical",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
      quote: "The labs are incredible. Being able to work on real engines and 3D printers gave me the practical confidence to start my own workshop.",
      rating: 4
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Alumni, MBA",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      quote: "It's not just about books. The cultural fest 'Varnothsava' and the sports facilities helped me grow into a well-rounded leader.",
      rating: 5
    },
    {
      id: 5,
      name: "David John",
      role: "Parent",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      quote: "Sending my son to Alva's was the best decision. The discipline and academic focus are exactly what we were looking for.",
      rating: 5
    }
  ]

  // --- INTERACTIVE CANVAS ANIMATION ---
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight
    const particles: Particle[] = []
    
    // Configuration
    const particleCount = width < 768 ? 40 : 80
    const connectionDistance = 150
    const mouse = { x: -1000, y: -1000, radius: 200 }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 1.5 // Velocity X
        this.vy = (Math.random() - 0.5) * 1.5 // Velocity Y
        this.size = Math.random() * 2 + 1
        this.color = Math.random() > 0.5 ? '#3b82f6' : '#a855f7' // Blue or Purple
      }

      update() {
        // Move
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1

        // Interactive Mouse Repulsion
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouse.radius - distance) / mouse.radius
            const directionX = forceDirectionX * force * 3
            const directionY = forceDirectionY * force * 3

            this.x -= directionX
            this.y -= directionY
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Draw Connections
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectionDistance) {
                ctx.beginPath()
                // Dynamic opacity based on distance
                const opacity = 1 - (distance / connectionDistance)
                ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.4})` // Slate-400
                ctx.lineWidth = 1
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.stroke()
            }
        }
      }
      requestAnimationFrame(animate)
    }

    init()
    animate()

    // Event Listeners
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      init()
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Adjust mouse coordinates relative to canvas
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="relative py-28 bg-slate-50 overflow-hidden" id="testimonials">
      
      {/* --- INTERACTIVE BACKGROUND CANVAS --- */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      
      {/* Subtle Background Gradient Overlay for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-50/80"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm backdrop-blur-sm">
                Student Voices
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Say About Us</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full shadow-lg shadow-blue-500/30"></div>
        </div>

        {/* Infinite Slider Wrapper */}
        <div 
            className="slider-mask relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={`flex gap-8 w-max animate-infinite-scroll ${isPaused ? 'paused' : ''}`}>
                
                {/* Render Cards Twice for seamless loop */}
                {[...testimonials, ...testimonials].map((item, idx) => (
                    <div 
                        key={`${item.id}-${idx}`}
                        className="w-[350px] md:w-[400px] flex-shrink-0 bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-2 group"
                    >
                        {/* Quote Icon */}
                        <div className="mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 origin-left">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                <FaQuoteLeft className="text-xl" />
                            </div>
                        </div>

                        {/* Text */}
                        <p className="text-slate-600 text-lg leading-relaxed italic mb-8 relative z-10">
                            "{item.quote}"
                        </p>

                        {/* Footer */}
                        <div className="flex items-center gap-4 border-t border-slate-200/60 pt-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="relative w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                                />
                            </div>
                            
                            <div>
                                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">{item.name}</h4>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{item.role}</p>
                            </div>
                            <div className="ml-auto flex gap-0.5 text-yellow-400 text-sm">
                                {[...Array(item.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
        }
        .paused {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}