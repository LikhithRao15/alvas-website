'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = document.querySelector("#main-header")
    const logoImg = document.querySelector("#logo-img") as HTMLImageElement
    const logoText1 = document.querySelector("#logo-text-1")
    const logoText2 = document.querySelector("#logo-text-2")
    const topBar = document.querySelector("#top-bar")

    ScrollTrigger.create({
      trigger: "body",
      start: "top -50",
      toggleClass: { targets: header, className: "header-scrolled" },
      onEnter: () => {
        gsap.to([logoText1, logoText2], { color: "#1e3a8a", duration: 0.2 })
        gsap.to(".nav-btn", { color: "#1e3a8a", duration: 0.4 })
        if (logoImg) {
          logoImg.src = "https://alvascentralschool001.42web.io/wp-content/uploads/2026/01/logo.png"
        }
        gsap.to(logoImg, { width: "3.5rem", height: "4.5rem", duration: 0.4 })
        gsap.to(logoText1, { fontSize: "3rem", duration: 0.4 })
        gsap.to(topBar, { height: 0, opacity: 0, padding: 0, marginBottom: 0, duration: 0.4, overflow: "hidden" })
      },
      onLeaveBack: () => {
        gsap.to([logoText1, logoText2], { color: "#ffffff", duration: 0.4 })
        gsap.to(".nav-btn", { color: "#ffffff", duration: 0.4 })
        if (logoImg) {
          logoImg.src = "https://alvascentralschool001.42web.io/wp-content/uploads/2026/01/alvas-org-logo-white.png"
        }
        gsap.to(logoImg, { width: "3rem", height: "4rem", duration: 0.4 })
        gsap.to(logoText1, { fontSize: window.innerWidth < 768 ? "2.5rem" : "2.5rem", duration: 0.4 })
        gsap.to(topBar, { height: "auto", opacity: 0.9, paddingBottom: "0.5rem", marginBottom: "0.75rem", duration: 0.4 })
      }
    })
  }, [])

  return (
    <header id="main-header" className="fixed top-0 w-full z-50 text-white pt-2 pb-2 bg-black/10 backdrop-blur-sm border-b border-white/10 transition-all duration-500">
      <div id="top-bar" className="hidden md:flex container mx-auto px-6 lg:px-12 justify-between items-center text-[11px] font-semibold opacity-80 mb-3 border-b border-white/20 pb-2 transition-all duration-300">
        <div className="flex gap-6">
          <span className="hover:text-yellow-400 cursor-pointer transition">
            <i className="fas fa-envelope mr-2 text-yellow-400"></i>info@alvas.edu.in
          </span>
          <span className="hover:text-yellow-400 cursor-pointer transition">
            <i className="fas fa-phone mr-2 text-yellow-400"></i> +91 98765 43210
          </span>
        </div>
        <div className="flex gap-6 tracking-wide items-center font-bold">
          <a href="#" className="flex items-center gap-2 bg-slate-800 text-yellow-400 px-4 py-1.5 rounded-full hover:bg-yellow-400 hover:text-slate-900 transition">
            <i className="fas fa-cube text-lg"></i> 360° View
          </a>
          <a href="#" className="text-yellow-400">Admissions Enquiry</a>
        </div>
      </div>

      <nav className="container mx-auto px-6 lg:px-12 flex justify-between items-center relative">
        <div className="flex items-center gap-3 lg:gap-4 group cursor-pointer z-50">
          <img 
            id="logo-img" 
            src="https://alvascentralschool001.42web.io/wp-content/uploads/2026/01/alvas-org-logo-white.png" 
            className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-md transition-all duration-500" 
            alt="Alvas Institute Logo"
          />
          <div className="flex flex-col justify-center">
            <h1 id="logo-text-1" className="font-serif text-2xl md:text-5xl font-black leading-none tracking-tight transition-all duration-500">ALVA&apos;S</h1>
            <span id="logo-text-2" className="text-[5px] md:text-[7px] font-bold tracking-[0.15em] md:tracking-[0.25em] uppercase opacity-90 mt-1 transition-all duration-500">
              INSTITUTE OF ENGINEERING & TECHNOLOGY
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8" id="nav-links">
          <div className="relative group py-4">
            <button className="nav-btn font-bold tracking-[0.5px] uppercase text-[0.75rem] py-[5px] flex items-center gap-1 group-hover:text-yellow-400 transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#fbbf24] after:transition-all after:duration-400 hover:after:w-full">
              About <i className="fas fa-chevron-down text-[8px] ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300"></i>
            </button>
            <div className="absolute top-full left-0 bg-white rounded-b-lg w-60 border-t-[3px] border-[#fbbf24] opacity-0 invisible translate-y-[15px] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-400 shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-50">
              <a href="#" className="block px-5 py-3 text-[0.75rem] font-bold text-[#334155] border-b border-[#f1f5f9] hover:bg-[#f8fafc] hover:text-[#1e3a8a] hover:pl-6 transition-all">Institution</a>
              <a href="#" className="block px-5 py-3 text-[0.75rem] font-bold text-[#334155] hover:bg-[#f8fafc] hover:text-[#1e3a8a] hover:pl-6 transition-all">Administration</a>
              <a href="#" className="block px-5 py-3 text-[0.75rem] font-bold text-[#334155] border-t border-[#f1f5f9] hover:bg-[#f8fafc] hover:text-[#1e3a8a] hover:pl-6 transition-all">Contact Us</a>
            </div>
          </div>
          <a href="#" className="nav-btn font-bold tracking-[0.5px] uppercase text-[0.75rem] py-[5px] hover:text-yellow-400 transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#fbbf24] after:transition-all after:duration-400 hover:after:w-full">Admissions</a>
          <a href="#" className="nav-btn font-bold tracking-[0.5px] uppercase text-[0.75rem] py-[5px] hover:text-yellow-400 transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#fbbf24] after:transition-all after:duration-400 hover:after:w-full">Academics</a>
          <a href="#" className="nav-btn font-bold tracking-[0.5px] uppercase text-[0.75rem] py-[5px] hover:text-yellow-400 transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#fbbf24] after:transition-all after:duration-400 hover:after:w-full">Research</a>
          <a href="#" className="nav-btn font-bold tracking-[0.5px] uppercase text-[0.75rem] py-[5px] hover:text-yellow-400 transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#fbbf24] after:transition-all after:duration-400 hover:after:w-full">Placements</a>
          <a href="#" className="nav-btn font-bold tracking-[0.5px] uppercase text-[0.75rem] py-[5px] hover:text-yellow-400 transition relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#fbbf24] after:transition-all after:duration-400 hover:after:w-full">Contact Us</a>
        </div>

        <div className="lg:hidden text-2xl cursor-pointer z-50 p-2" id="hamburger-btn" onClick={onMenuToggle}>
          <i className="fas fa-bars transition-colors duration-300" id="mobile-menu-icon"></i>
        </div>
      </nav>
    </header>
  )
}