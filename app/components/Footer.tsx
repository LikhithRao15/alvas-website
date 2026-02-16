'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import Script from 'next/script'

export default function Footer() {
  useEffect(() => {
    // Set current year
    const yearElement = document.getElementById('year')
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString()
    }

  }, [])

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" />
      
      <footer className="bg-[#071a34] text-white pt-16 pb-6 mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* TOP GRID - Mobile First: 2 cols | Tablet: 2 cols | Desktop: 5 cols */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
            
            {/* 1. LOGO + CONTACT - Full width on mobile/tablet */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://alvascentralschool001.42web.io/wp-content/uploads/2026/01/alvas-org-logo-white.png"
                  alt="Alvas Logo"
                  className="w-16 h-19 object-contain drop-shadow-xl"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-black leading-tight">
                    ALVAS
                    <span className="block text-xs md:text-sm font-bold tracking-widest text-white/80">
                      INSTITUTE OF ENGINEERING AND TECHNOLOGY
                    </span>
                  </h3>
                  <p className="text-[10px] md:text-xs text-white/60 font-semibold mt-1">
                    (An Autonomous Institution)
                  </p>
                </div>
              </div>

              {/* CONTACT INFO */}
              <div className="space-y-5 text-sm text-white/70 font-medium">
                <div className="flex gap-3">
                  <p className="font-extrabold text-white w-20 shrink-0">Phone</p>
                  <p>+91 98765 43210 <br /> +91 98765 43211</p>
                </div>
                <div className="flex gap-3">
                  <p className="font-extrabold text-white w-20 shrink-0">Email</p>
                  <p>info@alvas.edu.in <br /> principal@alvas.edu.in</p>
                </div>
                <div className="flex gap-3">
                  <p className="font-extrabold text-white w-20 shrink-0">Address</p>
                  <p>Alva's Campus, Moodbidri <br /> Karnataka, India - 574227</p>
                </div>
              </div>
            </div>

            {/* 2. FACILITIES - Takes 1 column on mobile (sits next to Academics) */}
            <div className="col-span-1">
              <h4 className="text-sm font-black tracking-widest uppercase mb-5 text-white">
                Facilities
              </h4>
              <ul className="space-y-3 text-sm text-white/70 font-semibold">
                <li><a href="#" className="hover:text-yellow-300 transition">Placements</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Campus</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Library</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Hostel</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Transportation</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">CSR</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Core Facilities</a></li>
              </ul>
            </div>

            {/* 3. ACADEMICS - Takes 1 column on mobile (sits next to Facilities) */}
            <div className="col-span-1">
              <h4 className="text-sm font-black tracking-widest uppercase mb-5 text-white">
                Academics
              </h4>
              <ul className="space-y-3 text-sm text-white/70 font-semibold">
                <li><a href="#" className="hover:text-yellow-300 transition">Academics</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Courses Offered</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Academic Calendar</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Research</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Value Added Courses</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Results</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition">Useful Links</a></li>
              </ul>
            </div>

            {/* 4. MAP - Full width on mobile/tablet, 1 column on desktop */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="text-sm font-black tracking-widest uppercase mb-5 text-white">
                Location
              </h4>
              <a
                href="https://www.google.com/maps/place/Alva's+Institute+of+Engineering+and+Technology/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <iframe
                  src="https://www.google.com/maps?q=Alva's+Institute+of+Engineering+and+Technology&output=embed"
                  className="w-full h-44 rounded-lg border border-white/10 hover:opacity-90 transition"
                  loading="lazy"
                  title="Alvas Institute Location"
                ></iframe>
              </a>
            </div>
          </div>

          {/* BOTTOM LINE */}
          <div className="mt-12 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/50 font-semibold tracking-wide">
              © <span id="year"></span> Alvas Institute of Engineering and
              Technology. All Rights Reserved.
            </p>
            <p className="text-xs text-white/40 font-semibold mt-2">
              Managed by <span className="text-yellow-300">Alva's Web Team</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}