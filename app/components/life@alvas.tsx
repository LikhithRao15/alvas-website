"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Header from "./Header";
import MobileMenu from "./MobileMenu";

// Added 'href' to every single object in the data array
const CAMPUS_DATA = [
  {
    title: "STARTUPS",
    subtitle: "Innovation Hub",
    desc: "Empowering student entrepreneurs to build the future.",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80",
    color: "#00f2ff",
    href: "/campus-life/startups",
  },
  {
    title: "CLUBS & ACTIVITIES",
    subtitle: "Future Tech",
    desc: "Discover your passion in our technical and cultural clubs.",
    img: "https://images.unsplash.com/photo-1581093458791-9f302e6d8659?w=1600&q=80",
    color: "#ff0055",
    href: "/campus-life/clubs",
  },
  {
    title: "LIBRARY",
    subtitle: "Knowledge Oasis",
    desc: "Access thousands of journals and digital resources.",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80",
    color: "#ffee00",
    href: "/campus-life/library",
  },
  {
    title: "EXPLORE",
    subtitle: "Campus Tour",
    desc: "Virtually experience our world-class infrastructure.",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80",
    color: "#00ff88",
    href: "/campus-life/explore",
  },
  {
    title: "ACHIEVEMENTS",
    subtitle: "Excellence",
    desc: "Showcasing the milestones of our bright students.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80",
    color: "#ff9d00",
    href: "/campus-life/achievements",
  },
  {
    title: "ACTIVITIES",
    subtitle: "Student Culture",
    desc: "Life beyond academics with fests and events.",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80",
    color: "#bf00ff",
    href: "/campus-life/activities",
  },
  {
    title: "CAMPUS",
    subtitle: "Living Spaces",
    desc: "Comfortable hostels and green spaces.",
    img: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=1600&q=80",
    color: "#ffffff",
    href: "/campus-life/campus",
  },
  {
    title: "SKILL LABS",
    subtitle: "Placements",
    desc: "Advanced laboratories for industrial skill development.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80",
    color: "#0077ff",
    href: "/campus-life/skill-labs",
  },
];

export default function LifeAtAIET() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const onMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * -15;
    setCoords({ x, y });
  };

  const next = () => setActive((prev) => (prev + 1) % CAMPUS_DATA.length);
  const prev = () => setActive((prev) => (prev - 1 + CAMPUS_DATA.length) % CAMPUS_DATA.length);

  // Redirection Logic
  const handleExplore = (item: (typeof CAMPUS_DATA)[0]) => {
    if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className="experience-root" onMouseMove={onMouseMove}>
      <Head>
        <title>Life @ AIET | Immersive Experience</title>
      </Head>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <Header onMenuToggle={toggleMobileMenu} />

      {/* --- BACKGROUND LAYER --- */}
      <div className="immersive-bg">
        {CAMPUS_DATA.map((item, i) => (
          <div
            key={i}
            className={`bg-frame ${i === active ? "active" : ""}`}
            style={{
              backgroundImage: `url(${item.img})`,
              transform: `scale(1.1) translate(${coords.x}px, ${coords.y}px)`,
            }}
          />
        ))}
        <div className="vignette" />
      </div>

      <div className="content-layer">
        <div className="slider-viewport">
          {CAMPUS_DATA.map((item, i) => {
            const isCenter = i === active;
            const isLeft = i === (active - 1 + CAMPUS_DATA.length) % CAMPUS_DATA.length;
            const isRight = i === (active + 1) % CAMPUS_DATA.length;

            let pos = "hidden";
            if (isCenter) pos = "center";
            else if (isLeft) pos = "left";
            else if (isRight) pos = "right";

            return (
              <div
                key={i}
                className={`card-anchor ${pos}`}
                style={
                  {
                    "--accent": item.color,
                    "--tilt-x": `${coords.y}deg`,
                    "--tilt-y": `${coords.x}deg`,
                  } as any
                }
              >
                <div className="glass-card">
                  <div className="card-image-box">
                    <img src={item.img} alt={item.title} />
                    <div className="image-overlay" />
                  </div>

                  <div className="card-body">
                    <div className="badge-row">
                      <span className="glass-tag">CAMPUS</span>
                      <span className="status-dot" style={{ backgroundColor: item.color }} />
                      <span className="subtitle">{item.subtitle}</span>
                    </div>
                    <h2 className="card-title">{item.title}</h2>
                    <p className="card-desc">{item.desc}</p>
                    <button className="action-btn" onClick={() => handleExplore(item)}>
                      <FaPlay size={10} /> EXPLORE EXPERIENCE
                    </button>
                  </div>
                  <div className="reflection" />
                </div>
              </div>
            );
          })}
        </div>

        {/* --- NAVIGATION CONTROLS --- */}
        <nav className="nav-container">
          <button className="nav-btn" onClick={prev}>
            <FaChevronLeft />
          </button>
          <div className="dot-track">
            {CAMPUS_DATA.map((item, i) => (
              <div
                key={i}
                className={`dot ${i === active ? "active" : ""}`}
                style={{ "--dot-color": item.color } as any}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <button className="nav-btn" onClick={next}>
            <FaChevronRight />
          </button>
        </nav>
      </div>

      <style jsx>{`
        .experience-root {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #000;
          overflow: hidden;
          font-family: "Inter", sans-serif;
        }

        .immersive-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .bg-frame {
          position: absolute;
          inset: -50px;
          background-size: cover;
          background-position: center;
          filter: blur(20px) brightness(0.4) saturate(1.2);
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }

        .bg-frame.active {
          opacity: 1;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
          z-index: 2;
        }

        .content-layer {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 40px;
        }

        .slider-viewport {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 2000px;
        }

        .card-anchor {
          position: absolute;
          width: 400px;
          height: 540px;
          transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          transform-style: preserve-3d;
        }

        .glass-card {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5);
        }

        .card-image-box {
          height: 50%;
          position: relative;
          overflow: hidden;
        }

        .card-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.9));
        }

        .card-body {
          padding: 30px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .glass-tag {
          font-size: 0.6rem;
          font-weight: 800;
          color: white;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 10px;
          border-radius: 4px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .subtitle {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }

        .card-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: white;
          margin: 0 0 10px 0;
        }

        .card-desc {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 20px;
        }

        .action-btn {
          background: white;
          color: black;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 800;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          width: max-content;
          transition: transform 0.2s;
        }

        .action-btn:hover {
          transform: scale(1.05);
        }

        /* Perspective Positioning */
        .card-anchor.center {
          transform: translate3d(0, 0, 150px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
          z-index: 10;
          opacity: 1;
        }

        .card-anchor.left {
          transform: translate3d(-400px, 0, -200px) rotateY(35deg);
          opacity: 0.3;
          pointer-events: none;
        }

        .card-anchor.right {
          transform: translate3d(400px, 0, -200px) rotateY(-35deg);
          opacity: 0.3;
          pointer-events: none;
        }

        .card-anchor.hidden {
          transform: translate3d(0, 50px, -500px);
          opacity: 0;
          pointer-events: none;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-top: 20px;
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: 0.3s;
        }

        .nav-btn:hover {
          background: white;
          color: black;
        }

        .dot-track {
          display: flex;
          gap: 10px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: 0.4s;
        }

        .dot.active {
          background: var(--dot-color);
          transform: scale(1.5);
          box-shadow: 0 0 10px var(--dot-color);
        }

        @media (max-width: 768px) {
          .card-anchor {
            width: 280px;
            height: 420px;
          }
          .card-anchor.left { transform: translate3d(-150px, 0, -300px) rotateY(40deg); }
          .card-anchor.right { transform: translate3d(150px, 0, -300px) rotateY(-40deg); }
          .card-title { font-size: 1.6rem; }
        }
      `}</style>
    </div>
  );
}