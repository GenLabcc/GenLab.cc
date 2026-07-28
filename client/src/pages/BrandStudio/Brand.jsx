import React from "react";
import "./Brand.css";

const BrandHero = () => {
  return (
    <section className="brand-hero">
      {/* Background */}
      <div className="brand-hero-bg">
        <div className="brand-hero-grid"></div>
        <div className="brand-hero-glow"></div>
      </div>

      {/* Content */}
      <div className="brand-hero-content">
        <div className="brand-hero-label">
          <span className="brand-dot"></span>
          Digital Agency — Nagercoil, Kanyakumari
        </div>
        <h1 className="brand-hero-title">
          <span>We craft brands</span>
          <span className="brand-lime">that</span>
          <span>move culture</span>
        </h1>
        <p className="brand-hero-subtitle">
          GenLab Brand Studio — where Gen Z creativity meets cinematic design.
          <br />
          Based at the southern tip of India, building for the world.
        </p>
        <div className="brand-hero-buttons">
          <button className="brand-primary-btn">
            View Our Work
            <span>→</span>
          </button>
          <button className="brand-secondary-btn">
            Start a Project
          </button>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="brand-marquee">
        <div className="brand-marquee-track">
          BRAND IDENTITY • VISUAL DESIGN • MOTION GRAPHICS • SOCIAL CONTENT • BRAND IDENTITY • VISUAL DESIGN • MOTION GRAPHICS • SOCIAL CONTENT • BRAND IDENTITY • VISUAL DESIGN • MOTION GRAPHICS •
        </div>
      </div>
    </section>
  );
};

export default BrandHero;