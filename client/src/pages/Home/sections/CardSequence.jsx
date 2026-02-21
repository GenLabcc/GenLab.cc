import { useEffect, useRef, useState } from "react";
import styles from "./CardSequence.module.css";

export default function CardSequence() {
  const scrollRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const section = scrollRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const scrollTop = window.scrollY;

      const progress = (scrollTop - sectionTop) / sectionHeight;

      if (progress < 0.25) {
        setActiveStep(1);
      } else if (progress < 0.55) {
        setActiveStep(2);
      } else if (progress < 0.85) {
        setActiveStep(3);
      } else {
        setActiveStep(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCardState = () => {
    switch (activeStep) {
      case 1:
        return styles.state1;
      case 2:
        return styles.state2;
      case 3:
        return styles.state3;
      default:
        return styles.stateEmpty;
    }
  };

  return (
    <section className={styles.wrapper}>
      <div ref={scrollRef} className={styles.scrollArea}>
        <div className={styles.sticky}>
          <div className={`${styles.card} ${getCardState()}`}>
            <div
              className={`${styles.step} ${
                activeStep === 1 ? styles.active : ""
              }`}
            >
              <h2>Connect</h2>
              <p>We decode your brand, audience and goals to find where design and AI can hit hardest.</p>
            </div>

            <div
              className={`${styles.step} ${
                activeStep === 2 ? styles.active : ""
              }`}
            >
              <h2>Chat</h2>
              <p>We jam with your team in real time to shape sharp, Gen Z-ready ideas and flows.</p>
            </div>

            <div
              className={`${styles.step} ${
                activeStep === 3 ? styles.active : ""
              }`}
            >
              <h2>Create</h2>
              <p>We turn strategy into visuals, content and automations built to launch and scale.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
