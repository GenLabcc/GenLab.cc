import { useEffect, useRef } from "react";
import styles from "./CapabilitiesSection.module.css";

import s1_1 from "@/assets/images/s1_1.png";

import s1_2 from "@/assets/images/s1_2.png";
import s1_3 from "@/assets/images/s1_3.png";
import s1_4 from "@/assets/images/s1_4.png";

export default function CapabilitiesSection() {
  const containerRef = useRef(null);

  const sections = [
    {
      image: s1_1,
      label: "OUR CAPABILITIES",
      heading:
        "We’re a Gen Z team of strategists, designers and AI builders. We blend bold branding, smart automation and future-ready upskilling to help you launch what’s next.",
      list: ["GenLab.Brand Studio", "GenLab.AI Forge", "GenLab.Launchpad"],
      showButton: false,
      clickableList: true,
    },
    {
      image: s1_2,
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
    {
      image: s1_3,
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
  ];

  useEffect(() => {
    const blocks = containerRef.current.querySelectorAll(`.${styles.block}`);
    const images = containerRef.current.querySelectorAll(`.${styles.image}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(blocks).indexOf(entry.target);

            images.forEach((img) => img.classList.remove(styles.active));

            if (images[index]) {
              images[index].classList.add(styles.active);
            }
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    blocks.forEach((block) => observer.observe(block));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className={styles.container}>
      {/* <div className={styles.sticky}> */}
      {/* Sticky Image Column */}
      <div className={styles.imageColumn}>
        {sections.map((section, index) => (
          <img
            key={index}
            src={section.image}
            alt={section.heading}
            className={`${styles.image} ${index === 0 ? styles.active : ""}`}
          />
        ))}
      </div>

      {/* Scrollable Text Column */}
      <div className={styles.textColumn}>
        {sections.map((section, index) => (
          <div key={index} className={styles.block}>
            <div className={styles.textContent}>
              {/* Mobile Image */}
              <img
                src={section.image}
                alt={section.heading}
                className={styles.mobileImage}
              />

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
                // <button className={styles.cta}>
                //   START WITH US <span>→</span>
                // </button>
                <button type="submit" className={styles.submitBtn}>
                  <span>START WITH US</span>
                  <div className={styles.arrow}>→</div>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </section>
  );
}
