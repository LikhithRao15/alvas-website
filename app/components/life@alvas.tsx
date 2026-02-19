"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

const CAMPUS_DATA = [
  {
    title: "STARTUPS",
    subtitle: "Innovation Hub",
    desc: "",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80",
    color: "#00f2ff",
  },
  {
    title: "CLUBS & ACTIVITIES",
    subtitle: "Future Tech",
    desc: "",
    img: "https://images.unsplash.com/photo-1581093458791-9f302e6d8659?w=1600&q=80",
    color: "#ff0055",
  },
  {
    title: "LIBRARY",
    subtitle: "Sports & Vitality",
    desc: "",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80",
    color: "#ffee00",
  },
  {
    title: "EXPLORE",
    subtitle: "Placements",
    desc: "",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80",
    color: "#00ff88",
  },
  {
    title: "ACHIEVEMENTS",
    subtitle: "Placements",
    desc: "",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80",
    color: "#00ff88",
  },
  {
    title: "ACTIVITIES",
    subtitle: "Placements",
    desc: "",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80",
    color: "#00ff88",
  },
  {
    title: "CAMPUS",
    subtitle: "Placements",
    desc: "",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80",
    color: "#00ff88",
  },
  {
    title: "SKILL LABS",
    subtitle: "Placements",
    desc: "",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80",
    color: "#00ff88",
  },
];

import { useRouter } from "next/navigation";
import Header from "./Header";
import MobileMenu from "./MobileMenu";

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
  const prev = () =>
    setActive((prev) => (prev - 1 + CAMPUS_DATA.length) % CAMPUS_DATA.length);

  const handleExplore = (item: (typeof CAMPUS_DATA)[0]) => {
    if (item.title === "CLUBS & ACTIVITIES") {
      router.push("/campus-life/clubs");
    } else if (item.title === "EXPLORE") {
      router.push("/campus-life/Explore");
    } else {
      console.log("No specific page for:", item.title);
    }
  };

  return (
    <div className="experience-root" onMouseMove={onMouseMove}>
      <Head>
        <title>Life @ AIET | Glass Immersive</title>
      </Head>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Header onMenuToggle={toggleMobileMenu} />

      {/* --- DYNAMIC BACKGROUND: Mirrors the Card Image --- */}
      <div className="immersive-bg">
        {CAMPUS_DATA.map((item, i) => (
          <div
            key={i}
            className={`bg-frame ${i === active ? "active" : ""}`}
            style={{
              backgroundImage: `url(${item.img})`,
              transform: `scale(1.15) translate(${coords.x}px, ${coords.y}px)`,
            }}
          />
        ))}
        {/* Dark vignette to keep text readable */}
        <div className="vignette" />
      </div>

      <div className="content-layer">
        {/* Header Removed - replaced by global component */}

        <div className="slider-viewport">
          {CAMPUS_DATA.map((item, i) => {
            const isCenter = i === active;
            const isLeft =
              i === (active - 1 + CAMPUS_DATA.length) % CAMPUS_DATA.length;
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
                  {/* Internal Image */}
                  <div className="card-image-box">
                    <img src={item.img} alt={item.title} />
                    <div className="image-overlay" />
                  </div>

                  <div className="card-body">
                    <div className="badge-row">
                      <span className="glass-tag">CAMPUS</span>
                      <span
                        className="status-dot"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="subtitle">{item.subtitle}</span>
                    </div>
                    <h2 className="card-title">{item.title}</h2>
                    <p className="card-desc">{item.desc}</p>
                    <button
                      className="action-btn"
                      onClick={() => handleExplore(item)}
                    >
                      <FaPlay size={10} /> EXPLORE EXPERIENCE
                    </button>
                  </div>

                  {/* High-end Reflection layer */}
                  <div className="reflection" />
                </div>
              </div>
            );
          })}
        </div>

        <nav className="nav-container">
          <button className="nav-btn" onClick={prev}>
            <FaChevronLeft />
          </button>
          <div className="dot-track">
            {CAMPUS_DATA.map((_, i) => (
              <div
                key={i}
                className={`dot ${i === active ? "active" : ""}`}
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

        /* --- Immersive Background --- */
        .immersive-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
        }

        .bg-frame {
          position: absolute;
          inset: -50px;
          background-size: cover;
          background-position: center;
          filter: blur(10px) brightness(0.5) saturate(1.2);
          opacity: 0;
          transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bg-frame.active {
          opacity: 2;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            transparent 20%,
            rgba(0, 0, 0, 0.7) 100%
          );
          z-index: 2;
        }

        /* --- Layout --- */
        .content-layer {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 40px 80px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .logo {
          color: white;
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: 2px;
        }

        .logo span {
          opacity: 0.4;
          font-weight: 300;
        }

        .discover-more {
          color: white;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(10px);
        }

        /* --- Card Styles --- */
        .slider-viewport {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1500px;
        }

        .card-anchor {
          position: absolute;
          width: 420px;
          height: 560px;
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }

        .glass-card {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(15px);
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4);
        }

        .card-image-box {
          height: 55%;
          position: relative;
          overflow: hidden;
        }

        .card-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.5s ease;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 0, 0, 0.8)
          );
        }

        .card-body {
          padding: 35px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .badge-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
        }

        .glass-tag {
          font-size: 0.6rem;
          font-weight: 800;
          color: white;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 10px;
          border-radius: 5px;
          letter-spacing: 1px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .subtitle {
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
        }

        .card-title {
          font-size: 2.8rem;
          font-weight: 800;
          color: white;
          margin: 0 0 12px 0;
          line-height: 1;
        }

        .card-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.5;
          margin-bottom: 25px;
        }

        .action-btn {
          background: white;
          color: black;
          border: none;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          width: max-content;
        }

        .reflection {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 40%
          );
          pointer-events: none;
        }

        /* --- States --- */
        .card-anchor.center {
          transform: translate3d(0, 0, 100px) rotateX(var(--tilt-x))
            rotateY(var(--tilt-y));
          z-index: 10;
        }

        .card-anchor.center .card-image-box img {
          transform: scale(1.1);
        }

        .card-anchor.left {
          transform: translate3d(-450px, 0, -250px) rotateY(30deg);
          opacity: 0.3;
        }

        .card-anchor.right {
          transform: translate3d(450px, 0, -250px) rotateY(-30deg);
          opacity: 0.3;
        }

        .card-anchor.hidden {
          transform: translate3d(0, 100px, -600px);
          opacity: 0;
        }

        /* --- Nav --- */
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          padding-bottom: 20px;
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-btn:hover {
          background: white;
          color: black;
        }

        .dot-track {
          display: flex;
          gap: 12px;
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
          background: var(--accent);
          transform: scale(1.4);
          box-shadow: 0 0 15px var(--accent);
        }

        @media (max-width: 900px) {
          .card-anchor {
            width: 320px;
            height: 480px;
          }
          .card-anchor.left {
            transform: translate3d(-180px, 0, -300px) rotateY(35deg) scale(0.8);
          }
          .card-anchor.right {
            transform: translate3d(180px, 0, -300px) rotateY(-35deg) scale(0.8);
          }
          .card-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
