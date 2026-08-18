import React, { useEffect, useRef, useState } from "react";
import "./Brand.css";
import genlabLogo from "../../assets/Genlab.png";
import SplashCursor from "../../components/SplashCursor/SplashCursor";
import whoWeArePhoto from "../../assets/who-we-are.jpg.webp";
// TODO: point these at your real project preview videos (.mp4)
// NOTE: both currently point to the same file (nod-travel.jpg.mp4) —
// if Nod Spa has its own clip, update nodSpaShot to that filename.
import nodTravelShot from "../../assets/nod-travel.jpg.mp4";
import nodSpaShot from "../../assets/nod-travel.jpg.mp4";

// Scroll-grow logo section — now plays a video instead of the static logo.
import logoRevealClip from "../../assets/nod-travel.jpg.mp4";

// What We Do — one clip per row for now. Swap these for dedicated
// per-service clips whenever you have them.
import webDesignClip from "../../assets/nod-travel.jpg.mp4";
import filmPhotoClip from "../../assets/nod-travel.jpg.mp4";
import brandIdentityClip from "../../assets/nod-travel.jpg.mp4";
import marketingGrowthClip from "../../assets/nod-travel.jpg.mp4";

// Growth, our way — the "experiment" clip shown inside the pink note.
// TODO: swap for the real Growth/experiment preview clip when ready.
import growthExperimentClip from "../../assets/nod-travel.jpg.mp4";

// Growth, our way — real colosseum/temple backdrop photo behind the cards.
import growthBgImage from "../../assets/images/download.png";

// What We Do — each row's preview media, shown on the right when active.
const WHAT_WE_DO_ITEMS = [
  {
    title: "Web Design",
    desc: "Websites and interfaces — fast, tactile and built to convert.",
    media: webDesignClip,
  },
  {
    title: "Film & Photo",
    desc: "Motion and stills that give a brand its atmosphere, on set and on screen.",
    media: filmPhotoClip,
  },
  {
    title: "Brand Identity",
    desc: "Names, logos and visual systems — the language a brand is known by.",
    media: brandIdentityClip,
  },
  {
    title: "Marketing & Growth",
    desc: "Strategy, content and campaigns that turn attention into revenue.",
    media: marketingGrowthClip,
  },
];

// Full-screen menu overlay — nav items shown large and centered.
// TODO: swap each `preview` for a real image/gif per section once ready.
const MENU_ITEMS = [
  { label: "Home", href: "#top", preview: whoWeArePhoto },
  { label: "Agency", href: "#who-we-are", preview: whoWeArePhoto },
  { label: "Growth", href: "#growth", preview: whoWeArePhoto },
  { label: "Contact", href: "#contact", preview: whoWeArePhoto },
];

const BrandHero = () => {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const [size, setSize] = useState({ width: 150, height: 150 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  // Full-screen menu overlay. The site-header MENU button that used to
  // toggle this has been removed — trigger setIsMenuOpen(true) from
  // wherever the new nav lives (e.g. the global Navbar) if still needed.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Which menu item (by index) is currently hovered — drives the preview image.
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState(null);
  // Growth section — the pink note is shown by default and dismissed via
  // its × button, revealing the sharp card row underneath.
  const [showGrowthNote, setShowGrowthNote] = useState(true);
  // Growth section is no longer part of the normal page scroll — it only
  // appears as a full-screen overlay when "Growth" is clicked in the menu.
  const [showGrowthOverlay, setShowGrowthOverlay] = useState(false);

  // Custom circular cursor that follows the mouse across the whole page,
  // replacing the default arrow (see .brand-page { cursor: none } in CSS).
  useEffect(() => {
    const handleMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const handleLeave = () => setCursorVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Distance between the section's center and the viewport's center.
      // 0 = perfectly centered (full size). This grows as the section
      // scrolls toward center from either direction, then shrinks again
      // once it moves past center and heads back out — whether that's
      // by scrolling further down or scrolling back up.
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const offset = Math.abs(sectionCenter - viewportCenter);

      const progress = 1 - offset / (windowHeight / 2);
      const clamped = Math.min(Math.max(progress, 0), 1);

      // Grow all the way to the full viewport (not just 90% of the
      // smaller dimension), and track width/height separately so the
      // video ends up covering the whole screen edge-to-edge, not just
      // a centered square.
      const newWidth = 150 + clamped * (window.innerWidth - 150);
      const newHeight = 150 + clamped * (window.innerHeight - 150);
      setSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Tracks cursor position relative to the logo wrap itself, so the
  // blur circle (clip-path) lines up with the cursor regardless of how
  // large the wrap currently is (it grows on scroll).
  const handleMouseMove = (e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    wrapRef.current.style.setProperty("--bx", `${x}px`);
    wrapRef.current.style.setProperty("--by", `${y}px`);
  };

  // Opens the Growth overlay (resetting the pink note to visible each
  // time) instead of scrolling to an in-page anchor.
  const handleMenuItemClick = (e, item) => {
    if (item.label === "Growth") {
      e.preventDefault();
      setIsMenuOpen(false);
      setShowGrowthNote(true);
      setShowGrowthOverlay(true);
      return;
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="brand-page">
      <div
        className={`custom-cursor${cursorVisible ? " is-visible" : ""}`}
        style={{
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`,
        }}
        aria-hidden="true"
      >
        <span className="custom-cursor-dot"></span>
      </div>

      {/* Full-screen menu overlay */}
      {isMenuOpen && (
        <div className="menu-overlay">
          <div className="menu-overlay-header">
            <span className="site-header-logo">
              <span className="brand-hero-accent-a">Gen</span>
              <span className="brand-hero-accent-b">Lab</span>
            </span>

            <button
              type="button"
              className="menu-overlay-close"
              onClick={() => setIsMenuOpen(false)}
            >
              CLOSE <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav className="menu-overlay-nav">
            {MENU_ITEMS.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="menu-overlay-link"
                onClick={(e) => handleMenuItemClick(e, item)}
                onMouseEnter={() => setHoveredMenuIndex(index)}
                onMouseLeave={() => setHoveredMenuIndex(null)}
                onFocus={() => setHoveredMenuIndex(index)}
                onBlur={() => setHoveredMenuIndex(null)}
              >
                <span className="menu-overlay-link-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
                <span
                  className={`menu-overlay-link-preview${
                    hoveredMenuIndex === index ? " is-visible" : ""
                  }`}
                >
                  <img src={item.preview} alt="" />
                </span>
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Hero — light, minimal statement layout: a large left-aligned
          headline with a short supporting paragraph on the right. */}
      <section className="brand-hero">
        <div className="brand-hero-headline">
          <h1>
            You feel the brand
            <br />
            before you read a word<span className="brand-hero-reg">®</span>
          </h1>
        </div>

        <div className="brand-hero-side">
          <p>
            GenLab designs that first feeling — brand, film, web and
            marketing for companies that know perception is what sets them
            apart.
          </p>
        </div>
      </section>

      {/* Scroll-grow video section */}
      <section
        className="brand-logo-reveal"
        ref={sectionRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {isHovering && (
          <SplashCursor
            containerRef={sectionRef}
            RAINBOW_MODE={false}
            COLOR="#ffffff"
          />
        )}

        <div
          className="brand-logo-wrap"
          ref={wrapRef}
          style={{ width: `${size.width}px`, height: `${size.height}px` }}
        >
          <video
            src={logoRevealClip}
            className="brand-logo-big"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <video
            src={logoRevealClip}
            aria-hidden="true"
            className={`brand-logo-blur${isHovering ? " is-active" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </section>

      {/* Who We Are */}
      <section className="who-we-are">
        <div className="who-we-are-image">
          <img src={whoWeArePhoto} alt="A GenLab team member working on location" />
        </div>

        <div className="who-we-are-copy">
          <span className="who-we-are-label">Who we are</span>
          <p className="who-we-are-text">
            We're a small studio working across the whole picture — strategy,
            design, motion and code under one roof. From the first idea to
            the live site, we build the brand, the experience and the growth
            around it as one connected thing.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="what-we-do">
        {/* <span className="what-we-do-location">
          Based in Nagercoil &amp; Kanyakumari
        </span> */}

        <h2 className="what-we-do-title">What We Do</h2>

        <div className="what-we-do-body">
          <ul
            className="what-we-do-list"
            onMouseLeave={() => setActiveService(null)}
          >
            {WHAT_WE_DO_ITEMS.map((item, index) => (
              <li key={item.title}>
                <button
                  type="button"
                  className={`what-we-do-row${
                    index === activeService ? " is-active" : ""
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                >
                  <h3 className="what-we-do-row-title">{item.title}</h3>
                  <p className="what-we-do-row-desc">{item.desc}</p>
                </button>
              </li>
            ))}
          </ul>

          <div
            className={`what-we-do-media${
              activeService === null ? "" : " is-visible"
            }`}
          >
            {activeService !== null && (
              <video
                key={WHAT_WE_DO_ITEMS[activeService].media}
                src={WHAT_WE_DO_ITEMS[activeService].media}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            )}
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="selected-projects">
        <div className="selected-projects-col selected-projects-col-left">
          <h2 className="selected-projects-title">Selected</h2>

          <div className="project-card">
            <div className="project-card-media">
              <video
                src={nodTravelShot}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            <h3 className="project-card-title">GenLab E-Commerce</h3>
            <p className="project-card-desc">
              We designed and built the complete e-commerce experience — from storefront to checkout. 
            </p>
          </div>
        </div>

        <div className="selected-projects-col selected-projects-col-right">
          <h2 className="selected-projects-title">Projects</h2>

          <div className="project-card">
            <div className="project-card-media">
              <video
                src={nodSpaShot}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            <h3 className="project-card-title">GenLab End-to-End Branding</h3>
            <p className="project-card-desc">
              We run the entire branding operation — digital marketing setup, content and blogs, video production, and social media management — for businesses across every sector. 
            </p>
          </div>
        </div>
      </section>

      
      {showGrowthOverlay && (
        <section className="growth-section growth-section-overlay">
          <button
            type="button"
            className="growth-overlay-close"
            onClick={() => setShowGrowthOverlay(false)}
          >
            CLOSE <span aria-hidden="true">×</span>
          </button>

          <div className="growth-bg">
            <div
              className="growth-bg-image"
              style={{ backgroundImage: `url(${growthBgImage})` }}
              aria-hidden="true"
            ></div>
          </div>

          <div
            className={`growth-cards${
              showGrowthNote ? " is-blurred" : " is-active"
            }`}
          >
            {/* Card 1 — SEO/Marketing */}
            <div className="growth-card">
              <div className="growth-card-window">
                <div className="growth-card-topbar">
                  <span className="growth-card-dot"></span>
                  <span className="growth-card-url">yourcompany.com</span>
                  <span className="growth-card-tag growth-card-tag-green">
                    RANKING
                  </span>
                </div>
                <div className="growth-card-preview growth-card-preview-seo">
                  <div className="growth-card-preview-row">
                    <span className="growth-card-check">✓</span>
                    Your Company | Official Site
                  </div>
                </div>
                <div className="growth-card-info">
                  <h4 className="growth-card-title">SEO/Marketing</h4>
                  <p className="growth-card-desc">Your hard work, finally seen.</p>
                </div>
              </div>
              <button type="button" className="growth-card-btn">
                READ MORE <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Card 2 — UI/UX */}
            <div className="growth-card">
              <div className="growth-card-window">
                <div className="growth-card-topbar">
                  <span className="growth-card-dot"></span>
                  <span className="growth-card-url growth-card-url-label">
                    UI / UX DESIGN
                  </span>
                  <span className="growth-card-tag growth-card-tag-green">
                    SCENE APPROVED
                  </span>
                </div>
                <div className="growth-card-preview growth-card-preview-uiux">
                  <span className="growth-card-blob growth-card-blob-1"></span>
                  <span className="growth-card-blob growth-card-blob-2"></span>
                </div>
                <div className="growth-card-info">
                  <h4 className="growth-card-title">UI/UX</h4>
                  <p className="growth-card-desc">
                    Pleasing before they understand why.
                  </p>
                </div>
              </div>
              <button type="button" className="growth-card-btn">
                READ MORE <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Card 3 — Strategy & Psychology */}
            <div className="growth-card">
              <div className="growth-card-window">
                <div className="growth-card-topbar">
                  <span className="growth-card-dot"></span>
                  <span className="growth-card-url growth-card-url-label">
                    STRATEGY
                  </span>
                  <span className="growth-card-badge"></span>
                </div>
                <div className="growth-card-preview growth-card-preview-strategy">
                  <span className="growth-card-chip">1 2 3 4</span>
                  <span className="growth-card-blob growth-card-blob-3"></span>
                </div>
                <div className="growth-card-info">
                  <h4 className="growth-card-title">Strategy &amp; Psychology</h4>
                  <p className="growth-card-desc">We start with the human mind.</p>
                </div>
              </div>
              <button type="button" className="growth-card-btn">
                READ MORE <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Card 4 — AI & Security */}
            <div className="growth-card">
              <div className="growth-card-window">
                <div className="growth-card-topbar">
                  <span className="growth-card-dot"></span>
                  <span className="growth-card-url growth-card-url-label">
                    AI / SECURITY
                  </span>
                </div>
                <div className="growth-card-preview growth-card-preview-ai">
                  <span className="growth-card-bot growth-card-bot-1">🤖</span>
                  <span className="growth-card-bot growth-card-bot-2">⚙️</span>
                  <span className="growth-card-tag growth-card-tag-green growth-card-tag-inline">
                    ASSISTANT
                  </span>
                </div>
                <div className="growth-card-info">
                  <h4 className="growth-card-title">AI &amp; Security</h4>
                  <p className="growth-card-desc">Built bulletproof.</p>
                </div>
              </div>
              <button type="button" className="growth-card-btn">
                READ MORE <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {showGrowthNote && (
            <div className="growth-note">
              <button
                type="button"
                className="growth-note-close"
                aria-label="Close"
                onClick={() => setShowGrowthNote(false)}
              >
                ×
              </button>

              <h2 className="growth-note-title">
                Growth,
                <br />
                our way
              </h2>
              <span className="growth-note-rule"></span>

              <div className="growth-note-media">
                <video
                  src={growthExperimentClip}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <span className="growth-note-media-caption">our experiment ↗</span>
              </div>

              <p className="growth-note-desc">
                A little experiment — each pillar in the temple stands for
                something that makes a brand grow.
              </p>

              <a
                href="#"
                className="growth-note-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowGrowthNote(false);
                }}
              >
                <span aria-hidden="true">→</span> Let your cursor start flying
              </a>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default BrandHero;