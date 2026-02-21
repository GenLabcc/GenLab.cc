import { useEffect, useRef, useState } from "react";
import styles from "./BenefitsSection.module.css";

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
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const progress = (scrollTop - sectionTop) / sectionHeight;

      if (progress < 0 || progress > 1) return;

      const steps = benefits.length;
      const index = Math.min(steps - 1, Math.floor(progress * steps));

      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="benefits-scroll-section"
      ref={sectionRef}
      className={styles.scrollSection}
    >
      <div className={styles.stickyContainer}>
        <div className={styles.contentWrapper}>
          {/* LEFT IMAGES */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrap}>
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
      </div>
    </section>
  );
}
