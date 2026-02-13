"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./ClubsAndActivities.css";
import {
  TECHNICAL_CLUBS,
  NON_TECHNICAL_CLUBS,
  ALL_CLUBS,
  Club,
} from "../campus-life/clubs/data";

// Types
interface ClubCardProps {
  club: Club;
  onClick: (club: Club) => void;
}

interface NavItemProps {
  club: Club;
  isActive: boolean;
  onClick: (clubId: string) => void;
}

// Particle Component
const Particles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particlesContainer = containerRef.current;
    if (!particlesContainer) return;

    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animation = `float ${Math.random() * 15 + 10}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 5 + "s";
      particlesContainer.appendChild(particle);
    }

    return () => {
      if (particlesContainer) {
        particlesContainer.innerHTML = "";
      }
    };
  }, []);

  return <div className="particles" ref={containerRef} />;
};

// Club Card Component
const ClubCard: React.FC<ClubCardProps> = ({ club, onClick }) => {
  return (
    <div className="club-card" id={club.id}>
      <div className="club-image-wrapper">
        <img
          src={club.image}
          alt={club.name}
          className="club-image"
          loading="lazy"
        />
        <div className="club-image-overlay">
          <span className="club-category-badge">{club.category}</span>
        </div>
      </div>
      <div className="club-body">
        <div className="club-header-text">
          <h3>{club.name}</h3>
        </div>
        <p className="club-description">{club.description}</p>
        <button className="know-more-btn" onClick={() => onClick(club)}>
          <span>Know More</span>
        </button>
      </div>
    </div>
  );
};

// Nav Item Component
const NavItem: React.FC<NavItemProps> = ({ club, isActive, onClick }) => {
  return (
    <li>
      <a
        href={`#${club.id}`}
        className={isActive ? "active" : ""}
        onClick={(e) => {
          e.preventDefault();
          onClick(club.id);
        }}
      >
        {club.name}
      </a>
    </li>
  );
};

// Main Component
const ClubsAndActivities: React.FC = () => {
  const router = useRouter();
  const [activeClubId, setActiveClubId] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const allClubs = ALL_CLUBS;

  const scrollToClub = (clubId: string) => {
    const element = document.getElementById(clubId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (clubId: string) => {
    setActiveClubId(clubId);
    scrollToClub(clubId);
  };

  const handleClubClick = (club: Club) => {
    router.push(`/campus-life/clubs/${club.id}`);
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const scrollPosition = window.scrollY + 150;

      for (let i = allClubs.length - 1; i >= 0; i--) {
        const club = allClubs[i];
        const element = document.getElementById(club.id);

        if (element && element.offsetTop <= scrollPosition) {
          setActiveClubId(club.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allClubs]);

  return (
    <div className="clubs-container-root">
      <Particles />

      <div className="top-nav-bar">
        <button className="back-home-btn" onClick={handleBackToHome}>
          ← Back to Home
        </button>
      </div>

      <header className="clubs-header">
        <h1>Clubs and Activities</h1>
        <p>Discover Your Passion, Join Our Community</p>
      </header>

      <div className="clubs-content-container">
        <aside className="sidebar">
          <h2>All Clubs</h2>

          <div className="sidebar-section">
            <h3>Technical ({TECHNICAL_CLUBS.length})</h3>
            <ul>
              {TECHNICAL_CLUBS.map((club) => (
                <NavItem
                  key={club.id}
                  club={club}
                  isActive={activeClubId === club.id}
                  onClick={handleNavClick}
                />
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Non-Technical ({NON_TECHNICAL_CLUBS.length})</h3>
            <ul>
              {NON_TECHNICAL_CLUBS.map((club) => (
                <NavItem
                  key={club.id}
                  club={club}
                  isActive={activeClubId === club.id}
                  onClick={handleNavClick}
                />
              ))}
            </ul>
          </div>
        </aside>

        <main className="content-wrapper">
          <section className="section-header">
            <h2>Technical Clubs</h2>
            <p>Innovate, Build, and Shape Tomorrow</p>
          </section>

          <div className="clubs-grid">
            {TECHNICAL_CLUBS.map((club) => (
              <ClubCard key={club.id} club={club} onClick={handleClubClick} />
            ))}
          </div>

          <div className="section-divider" />

          <section className="section-header">
            <h2>Non-Technical Clubs</h2>
            <p>Create, Express, and Inspire</p>
          </section>

          <div className="clubs-grid">
            {NON_TECHNICAL_CLUBS.map((club) => (
              <ClubCard key={club.id} club={club} onClick={handleClubClick} />
            ))}
          </div>
        </main>
      </div>

      <button
        className={`scroll-top ${showScrollTop ? "visible" : ""}`}
        onClick={handleScrollTop}
      >
        ↑
      </button>
    </div>
  );
};

export default ClubsAndActivities;
