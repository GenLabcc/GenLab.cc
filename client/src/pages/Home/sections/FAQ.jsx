import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FAQ.module.css";
import ArrowIcon from "@/components/ui/ArrowIcon.jsx";

import photo1 from "@/assets/images/people/henrich2.png";

const faqs = [
  {
    question: "What services does GenLab offer?",
    answer:
      "GenLab offers three core verticals: Brand Studio for branding, content, and design, AI Forge for AI solutions and automation, and Launchpad for Gen Z upskilling, hackathons, and startup incubation.",
  },
  {
    question: "Do you work with clients outside Tamil Nadu or India?",
    answer:
      "Yes. GenLab works with clients across India and globally through remote collaboration, online reviews, and virtual workshops.",
  },
  {
    question: "Will you also help with development?",
    answer:
      "Yes. Beyond strategy and design, GenLab supports end-to-end execution, including AI implementation, software development, and campaign rollout where required.",
  },
  {
    question: "What kind of support does GenLab Launchpad give to startups?",
    answer:
      "Launchpad supports startups with mentorship, idea validation, branding help, MVP building support, pitch preparation, and connections to potential partners, early talent, and networks.",
  },
  {
    question: "Can students and working professionals both join GenLab programs?",
    answer:
      "Yes. GenLab programs are designed for students, recent graduates, and working professionals who want to upskill, switch careers, or start their own ventures.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

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
            <h2>Visionary</h2>
          </div>

          <p>
            From India's southern tip in Nagercoil, where big dreams start
            small. Building the world's largest Gen Z hub for creativity and AI.
            Scaling to global stages, turning young creators' raw ideas into
            real-world solutions that truly matter. Because every Gen Z deserves
            to be a design thinker.
          </p>

          {/* onClick={() => navigate("/people")} */}
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
