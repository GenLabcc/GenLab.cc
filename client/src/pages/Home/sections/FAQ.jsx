import { useState } from "react";
import styles from "./FAQ.module.css";
import s1_1 from "@/assets/images/s1_1.png";

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
      <section className={`${styles.white} ${styles.meet}`}>
        <div className={styles.left}>
          <img src={s1_1} alt={"altText"} />
        </div>

        <div className={styles.right}>
          <h3>MEET THE GEN Z MINDS BEHIND THE WORK</h3>
          <p>
            We are a small group of creative thinkers, sharp creators, and doers
            who care deeply about quality. This is a team that blends creativity
            with clarity, ideas with execution, and ambition with
            responsibility.
          </p>
          <button className={styles.heroBtn}>
            MEET THE TEAM <span>→</span>
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
