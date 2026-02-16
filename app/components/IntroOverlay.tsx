"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function IntroOverlay() {
  useEffect(() => {
    const introTL = gsap.timeline();
    introTL
      .to("#intro-logo", { opacity: 1, scale: 1.1, duration: 0.4 })
      .to(
        ".anim-line",
        { y: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" },
        "-=0.5",
      )
      .to("#intro-line", { width: "100px", duration: 0.2 }, "-=0.8")
      .to("#intro-subtitle", { opacity: 1, duration: 0.4 }, "-=0.6")
      .to("#intro-overlay", {
        opacity: 0,
        duration: 1,
        pointerEvents: "none",
        delay: 1,
      })
      .to("#hero-title, #hero-subtitle, #hero-buttons", {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.7,
      });
  }, []);

  return (
    <div
      id="intro-overlay"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.85)), url('https://alvascentralschool001.42web.io/wp-content/uploads/2026/02/DJI_0050-scaled.jpg')`,
      }}
    >
      <img
        src="https://alvascentralschool001.42web.io/wp-content/uploads/2026/01/logo.png"
        className="w-28 h-28 md:w-36 md:h-36 object-contain mb-8 drop-shadow-2xl opacity-0"
        id="intro-logo"
        alt="Alvas Logo"
      />
      <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black text-center tracking-tight mb-2">
        <span className="text-mask">
          <span className="anim-line translate-y-full block bg-gradient-to-r from-[#0f172a] via-[#1e40af] to-[#0f172a] bg-clip-text text-transparent bg-[length:200%_auto] animate-shine uppercase">
            Alvas Institute of
          </span>
        </span>
        <span className="text-mask">
          <span className="anim-line translate-y-full block bg-gradient-to-r from-[#0f172a] via-[#1e40af] to-[#0f172a] bg-clip-text text-transparent bg-[length:200%_auto] animate-shine uppercase">
            Engineering & Technology
          </span>
        </span>
      </h1>
      <div
        className="h-[3px] w-0 bg-yellow-600 my-5 rounded-full"
        id="intro-line"
      ></div>
      <h2
        className="text-xs md:text-sm font-bold text-[#b45309] tracking-[0.4em] uppercase opacity-0 text-center"
        id="intro-subtitle"
      >
        A Unit of Alva&apos;s Education Foundation
      </h2>
    </div>
  );
}
