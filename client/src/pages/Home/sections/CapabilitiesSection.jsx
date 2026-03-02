import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CapabilitiesSection.module.css";
import ArrowIcon from "@/components/ui/ArrowIcon.jsx";

import s1_1 from "@/assets/images/s1_1.png";
import s1_2 from "@/assets/images/s1_4.png";
import s1_3 from "@/assets/images/s1_3.png";
import s1_4 from "@/assets/images/s1_2.png";

gsap.registerPlugin(ScrollTrigger);

export default function CapabilitiesSection() {
  const galleryRef = useRef(null);

  const sections = [
    {
      image: s1_1,
      id: "",
      label: "OUR CAPABILITIES",
      heading:
        "We’re a Gen Z team of strategists, designers and AI builders. We blend bold branding, smart automation and future-ready upskilling to help you launch what’s next.",
      list: ["GenLab.Brand Studio", "GenLab.AI Forge", "GenLab.Launchpad"],
      showButton: false,
      clickableList: true,
    },
    {
      image: s1_2,
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
      image: s1_3,
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
      image: s1_4,
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================
      // DESKTOP
      // =========================
      mm.add("(min-width: 1024px)", () => {
        const textSections = gsap.utils.toArray(`.${styles.textSection}`);
        const images = gsap.utils.toArray(`.${styles.image}`);

        gsap.set(images, { opacity: 0 });
        gsap.set(images[0], { opacity: 1 });

        ScrollTrigger.create({
          trigger: galleryRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: `.${styles.left}`,
        });

        textSections.forEach((section, index) => {
          const heading = section.querySelector("h2");

          ScrollTrigger.create({
            trigger: heading,
            start: "top 60%",
            end: "top 40%",
            scrub: true,
            onEnter: () => {
              gsap.to(images, { opacity: 0, duration: 0.4 });
              gsap.to(images[index], { opacity: 1, duration: 0.4 });
            },
            onEnterBack: () => {
              gsap.to(images, { opacity: 0, duration: 0.4 });
              gsap.to(images[index], { opacity: 1, duration: 0.4 });
            },
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
      {/* LEFT — STICKY IMAGES */}
      {/* ========================= */}

      <div className={styles.left}>
        <div className={styles.imageStack}>
          {sections.map((section, index) => (
            <img
              key={index}
              src={section.image}
              alt={section.heading}
              // ✅ CHANGED: use activeIndex instead of index === 0
              className={styles.image}
            />
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* RIGHT — SCROLLABLE TEXT */}
      {/* ========================= */}

      <div className={styles.right}>
        {sections.map((section, index) => (
          <div key={index} id={section.id} className={styles.textSection}>
            {/* MOBILE IMAGE */}
            <div className={styles.mobileImage}>
              <img src={section.image} alt={section.heading} />
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