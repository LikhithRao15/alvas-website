"use client";
import React, { useEffect, useRef } from "react";
import "./Gallery.css";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1521791136064-7986c29596ad?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507537362145-59049198642e?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=800&h=600&fit=crop",
];

const Gallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const items = document.querySelectorAll(".gallery-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="gallery-section">
      {/* Animated Background Elements */}
      <div className="gallery-bg-waves">
        <div className="wave-blob blob1"></div>
        <div className="wave-blob blob2"></div>
        <div className="wave-blob blob3"></div>
      </div>

      <div className="gallery-container">
        <div className="gallery-header">
          <span className="gallery-subtitle">CAMPUS DIARIES</span>
          <h2 className="gallery-title">GALLERY</h2>
          <div className="title-underline"></div>
        </div>

        <div className="gallery-masonry" ref={scrollRef}>
          {GALLERY_IMAGES.map((src, index) => (
            <div
              key={index}
              className={`gallery-item item-${(index % 5) + 1}`}
              style={{ transitionDelay: `${(index % 8) * 0.1}s` }}
            >
              <div className="gallery-image-wrapper">
                <img
                  src={src}
                  alt={`Campus Life ${index + 1}`}
                  loading="lazy"
                />
                <div className="image-overlay">
                  <span className="view-text">ALVA'S / MOMENTS</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
