import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BenefitsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

import head0 from "@/assets/images/head-0.png";
import head1 from "@/assets/images/head-1.png";
import head2 from "@/assets/images/head-2.png";
import head3 from "@/assets/images/head-3.png";
import head4 from "@/assets/images/head-4.png";

const benefits = [
  {
    type: "heading",
    title: "Our Core Benefits",
    image: head0,
  },
  {
    number: "01",
    title: "10 x Execution speed",
    desc: "AI-driven automation replaces manual workflows and accelerates output.",
    image: head1,
  },
  {
    number: "02",
    title: "Viral Branding",
    desc: "Gen Z storytelling frameworks designed to convert attention into measurable growth.",
    image: head2,
  },
  {
    number: "03",
    title: "Future-Ready AI Skills",
    desc: "Hands-on upskilling in AI, automation, and intelligent systems ahead of the curve.",
    image: head3,
  },
  {
    number: "04",
    title: "Impact Incubation",
    desc: "Transform concepts into intelligent MVPs, validated products, and scalable platforms.",
    image: head4,
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: "+=400%", // Scroll distance
        scrub: true,
        onUpdate: (self) => {
          const steps = benefits.length;
          const index = Math.min(steps - 1, Math.floor(self.progress * steps));
          setActiveIndex((prev) => (prev !== index ? index : prev));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="benefits-scroll-section"
      ref={sectionRef}
      className={styles.scrollSection}
    >
      <div className={styles.contentWrapper}>
          {/* LEFT IMAGES */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrap}>
              {/* Render glass background as a static sibling to avoid repainting blur on scroll/animation */}
              <div className={styles.glassBackground}></div>
              
              <div className={styles.innerGlass}>
                {benefits.map((item, index) => (
                  <img
                    key={index}
                    src={item.image}
                    alt={item.title}
                    className={`${styles.image} ${
                      activeIndex === index ? styles.active : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className={styles.textColumn}>
            <div className={styles.textWrap}>
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.textContent} ${
                    activeIndex === index ? styles.active : ""
                  }`}
                >
                  {item.type === "heading" ? (
                    <h1 className={styles.mainTitle}>
                      <span className={styles.line}>Our </span>
                      <span className={styles.line}>Core Benefits</span>
                    </h1>
                  ) : (
                    // Normal Benefit Layout
                    <>
                      <div className={styles.number}>{item.number}</div>
                      <h2 className={styles.title}>{item.title}</h2>
                      <p className={styles.desc}>{item.desc}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
