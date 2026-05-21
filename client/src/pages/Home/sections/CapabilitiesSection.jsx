import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CapabilitiesSection.module.css";
import ArrowIcon from "@/components/ui/ArrowIcon.jsx";
import logoWhite from "../../../assets/logo-white.svg";
import genLabLogo from "../../../assets/Genlab.png";


gsap.registerPlugin(ScrollTrigger);

export default function CapabilitiesSection() {
  const galleryRef = useRef(null);

  const sections = [
    {
      id: "",
      label: "OUR CAPABILITIES",
      heading:
        "We’re a Gen Z team of strategists, designers and AI builders. We blend bold branding, smart automation and future-ready upskilling to help you launch what’s next.",
      list: ["GenLab.Launchpad", "GenLab.AI Forge", "GenLab.Brand Studio" ],
      showButton: false,
      clickableList: true,
    },
    {
      id: "launchpad",
      heading: "GenLab.Launchpad",
      list: [
        "Upskilling Programs",
        "Campus & Corporate Training",
        "Innovation & Incubation Support",
        "Hackathons & Build Sprints",
        "Career & Portfolio Labs",
        "Community & Events",
      ],
      showButton: true,
    },
    {
      id: "ai",
      heading: "GenLab.AI Forge",
      list: [
        "AI Product Discovery & Strategy",
        "Custom AI Product Development",
        "AI Business Automation",
        "Conversational AI & Chatbots",
        "Agentic AI Workflows",
        "Data & Integration Layer",
        "AI Maintenance & Optimization",
      ],
      showButton: true,
    },
    {
      id: "brand",
      heading: "GenLab.Brand Studio",
      list: [
        "Brand Strategy",
        "Creative Direction",
        "Identity Design",
        "Packaging Design",
        "UX / UI",
        "Video & Animation",
        "Content Production & 3D",
        "Social Media Management",
      ],
      showButton: true,
    },
  ];

  const leftCards = [
    {
      id: "intro",
      topLeft: "A GEN Z-DRIVEN AI\nECOSYSTEM",
      topRight: "SMARTER\nAI SOLUTIONS",
      centerIcon: true,
      bottomLeft: "BRANDS THAT\nSTAND OUT",
      bottomRight: "LEARN.\nBUILD.\nLAUNCH.",
    },
    {
      id: "launchpad",
      topLeft: "GENLAB.",
      topRight: "PROGRAMS THAT TURN\nLEARNING INTO REAL-\nWORLD ACTION",
      centerText: "LAUNCHPAD",
      bottomText: "WE POWER INNOVATION WITH UPSKILLING, HACKATHONS AND INCUBATION SO STUDENTS, TEAMS AND FOUNDERS CAN BUILD REAL-WORLD SOLUTIONS FASTER.",
    },
    {
      id: "ai",
      topLeft: "GENLAB.",
      topRight: "INTELLIGENT SOLUTIONS\nBUILT FOR MODERN\nBUSINESSES",
      centerText: "AI FORGE",
      bottomText: "WE DESIGN AND DEPLOY CUSTOM AI PRODUCTS, CHATBOTS AND AUTOMATIONS THAT TURN YOUR WORKFLOWS INTO ALWAYS-ON GROWTH ENGINES.",
    },
    {
      id: "brand",
      topLeft: "GENLAB.",
      topRight: "CONTENT THAT HELPS\nIDEAS STAND OUT AND\nGROW.",
      centerText: "BRAND STUDIO",
      bottomText: "WE CRAFT BRANDS THAT LOOK SHARP AND SELL HARD FROM IDENTITY AND UX/UI TO CONTENT, CAMPAIGNS AND GROWTH MARKETING.",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================
      // DESKTOP
      // =========================
      mm.add("(min-width: 1024px)", () => {
        const textSections = gsap.utils.toArray(`.${styles.textSection}`);
        const leftCardsEl = gsap.utils.toArray(`.${styles.cardContentWrapper}`);

        ScrollTrigger.create({
          trigger: galleryRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: `.${styles.left}`,
        });

        // Initialize cards visibility
        gsap.set(leftCardsEl.slice(1), { opacity: 0 });

        textSections.forEach((section, index) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => {
              gsap.to(leftCardsEl, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
              gsap.to(leftCardsEl[index], { opacity: 1, duration: 0.4, ease: "power2.inOut" });
            },
            onEnterBack: () => {
              gsap.to(leftCardsEl, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
              gsap.to(leftCardsEl[index], { opacity: 1, duration: 0.4, ease: "power2.inOut" });
            }
          });
        });
      });

      // =========================
      // MOBILE
      // =========================
      mm.add("(max-width: 1023px)", () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="verticals" ref={galleryRef} className={styles.gallery}>
      {/* ========================= */}
      {/* LEFT — STICKY BACKGROUND */}
      {/* ========================= */}

      <div className={styles.left}>
        <div className={styles.cardsWrapper}>
          {/* Static Glass layers to avoid recalculating blur on opacity animation */}
          <div className={styles.staticGlassCard}>
            <div className={styles.staticInnerGlass}></div>
          </div>

          {leftCards.map((card, index) => (
            <div key={index} className={styles.cardContentWrapper}>
              <div className={styles.cardTop}>
                <div className={styles.cardCornerText}>{card.topLeft}</div>
                <div className={`${styles.cardCornerText} ${styles.textRight}`}>{card.topRight}</div>
              </div>
              
              <div className={styles.innerGlassContent}>
                {card.centerIcon ? (
                  <img src={logoWhite} alt="GenLab Logo" className={styles.centerIcon} />
                ) : (
                  <div className={styles.centerText}>{card.centerText}</div>
                )}
              </div>

              <div className={styles.cardBottom}>
                {card.bottomText ? (
                  <div className={styles.bottomFullText}>{card.bottomText}</div>
                ) : (
                  <>
                    <div className={styles.cardCornerText}>{card.bottomLeft}</div>
                    <div className={`${styles.cardCornerText} ${styles.textRight}`}>{card.bottomRight}</div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* RIGHT — SCROLLABLE TEXT */}
      {/* ========================= */}

      <div className={styles.right}>
        {sections.map((section, index) => (
          <div key={index} id={section.id} className={styles.textSection}>
            {/* MOBILE IMAGE PLACEHOLDER */}
            <div className={styles.mobileImage}>
              <img src = {genLabLogo} alt= "GenLab logo" className={styles.mobileLogo}></img>
            </div>

            {section.label && <h3>{section.label}</h3>}

            <h2>{section.heading}</h2>

            <ul className={styles.list}>
              {section.list.map((item, i) => (
                <li key={i} className={styles.listItems}>
                  <div
                    className={`${styles.listItem} ${
                      section.clickableList ? styles.clickable : ""
                    }`}
                  >
                    <span className={styles.number}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className={styles.itemText}>{item}</span>

                    {section.clickableList && (
                      <span className={styles.arrow}>{">"}</span>
                    )}
                  </div>

                  <span className={styles.line}></span>
                </li>
              ))}
            </ul>

            {section.showButton && (
              <button type="button" className={styles.submitBtn}
              onClick={() => {
                const section = document.getElementById("connect");
                section?.scrollIntoView({ behavior: "smooth" });
              }}>
                <span>START WITH US</span>
                <div className={styles.arrow}>
                  <ArrowIcon />
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}