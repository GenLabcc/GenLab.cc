import { useState } from "react";
import styles from "./FAQ.module.css";
import ArrowIcon from "@/components/ui/ArrowIcon.jsx";

import photo1 from "@/assets/images/people/henrich2.png";

const faqs = [
  {
    question: "What services does GenLab offer?",
    answer:
      "GenLab provides brand strategy, creative direction, UI/UX, video and animation, content production and 3D, and social media management. In AI we deliver product discovery and strategy, custom AI product development, AI business automation.",
  },
  {
    question: "Do you work with clients outside Tamil Nadu or India?",
    answer:
      "GenLab serves clients across India from Tamil Nadu (Nagercoil base) to throughout India with scalable, global-ready AI solutions.",
  },
  {
    question: "Will you also help with development?",
    answer:
      "Yes, GenLab builds custom AI products, agentic workflows, and full-stack solutions, handling everything from strategy to UI/UX and web or mobile app development.",
  },
  {
    question: "What kind of support does GenLab Launchpad give to startups?",
    answer:
      "GenLab Launchpad supports startups with incubation, hackathons, and mentorship, accelerating ideas through AI automation and real-world projects.",
  },
  {
    question: "What kind of support does GenLab Launchpad give to startups?",
    answer:
      "GenLab Launchpad supports startups with incubation, hackathons, and mentorship, accelerating ideas through AI automation and real-world projects.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {/* meet */}
      <section id="capabilities" className={`${styles.white} ${styles.meet}`}>
        <div className={styles.left}>
          <img src={photo1} alt={"altText"} />
        </div>

        <div className={styles.right}>
          <h3>MEET THE GEN Z MINDS BEHIND THE WORK</h3>
          <div>
            <h1>Henrich P</h1>
            <h2>Founder</h2>
          </div>

          <p>
            From India's southern tip in Nagercoil, where big dreams start
            small. Building the world's largest Gen Z hub for creativity and AI.
            Scaling to global stages, turning young creators' raw ideas into
            real-world solutions that truly matter. Because every Gen Z deserves
            to be a design thinker.
          </p>
          <button className={styles.heroBtn}>
            MEET THE TEAM{" "}
            <span>
              <ArrowIcon />
            </span>
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <h2 className={styles.heading}>FAQS</h2>

        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={index} className={styles.item}>
                <div
                  className={`${styles.row} ${isOpen ? styles.open : ""}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <div className={styles.question}>{faq.question}</div>

                  {isOpen && <div className={styles.answer}>{faq.answer}</div>}

                  <div className={styles.icon}>{isOpen ? "−" : "+"}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
