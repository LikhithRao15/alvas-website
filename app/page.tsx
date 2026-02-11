'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import IntroOverlay from './components/IntroOverlay'
import MobileMenu from './components/MobileMenu'
import HeroSection from './components/HeroSection'
import MarqueeBar from './components/MarqueeBar'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import ProgramsSection from './components/ProgramsSection'
import CampusHighlights from './components/CampusHighlights'
import CampusDiaries from './components/CampusDiaries'
import Testimonials from './components/Testimonials'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
      
      // Animation logic will be handled in components
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <IntroOverlay />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <Header onMenuToggle={toggleMobileMenu} />
      <main>
        <HeroSection />
        <MarqueeBar />
        <AboutSection />
        <ProgramsSection />
        <CampusDiaries />
        <CampusHighlights />
        <Testimonials />
        <Footer />
      </main>
    </>
  )
}