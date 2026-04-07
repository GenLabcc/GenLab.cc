import styles from "./HeroSection.module.css";
import ArrowIcon from "@/components/ui/ArrowIcon.jsx";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bgShapes}>
          <div className={`${styles.shape} ${styles.square}`} />
          <div className={`${styles.shape} ${styles.triangle}`} />
          <div className={`${styles.shape} ${styles.circle}`} />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            World’s First Gen Z AI Creative Powerhouse
          </h1>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              type="button"
              className={styles.submitBtn}
              onClick={() =>
                window.open(
                  "https://chat.whatsapp.com/L0n2kNQfSbR3lwhmN5mNVJ",
                  "_blank",
                )
              }
            >
              <span>JOIN US</span>
              <div className={styles.arrow}>
                <ArrowIcon />
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
