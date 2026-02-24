import styles from "./HeroSection.module.css";
import ArrowIcon from "@/components/ui/ArrowIcon.jsx";

export default function Hero() {
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
            World’s First Gen Z AI <br />
            Creative Powerhouse
          </h1>

          <button type="submit" className={styles.submitBtn}>
            <span>JOIN US</span>
            <div className={styles.arrow}>
              <ArrowIcon />
            </div>
          </button>
        </div>
      </section>

      <section id="about" className={`${styles.white} ${styles.ethos}`}>
        <h3> OUR ETHOS </h3>
        <h2>
          {" "}
          We transform and create <span>(IMPACTFUL)</span> brands & Al
          solutions. With over <span>(10+COMPANIES)</span> having already
          partnered with us to turn up their brand & achieve{" "}
          <span>(GROWTH)</span>{" "}
        </h2>
        <h1>From India To The World.</h1>
      </section>

      <section className={styles.black}>
        <h3> OUR CREATIVITY ENGINE </h3>
        <h1>
          The world's sharpest view of GenZ creativity powered by our 3C engine
        </h1>
      </section>
    </div>
  );
}
