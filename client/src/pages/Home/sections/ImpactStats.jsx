import React from "react";
import styles from "./ImpactStats.module.css";
import circle from "@/assets/images/green_sphere.webp";

const ImpactStats = () => {
  return (
    <section className={styles.impactSection}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>OUR IMPACT STATS</p>

        <div className={styles.headingWrapper}>
          <div className={styles.topRow}>
            <div className={styles.logo}>
              <img src="/logo-black.svg" alt="GenLab Logo" />
            </div>
            <h2 className={styles.lineOne}>Gen Z Powered</h2>
          </div>

          <h2 className={styles.lineTwo}>AI Growth Platform</h2>
        </div>

        <p className={styles.description}>
          A future-driven ecosystem built for the Gen Z era, powering AI
          upskilling, research incubation, AI-driven automation, and high-impact
          branding. It helps businesses and creators adopt AI, build intelligent
          solutions, and scale next-gen digital platforms for the future.
        </p>

        <div className={styles.statsWrapper}>
          <div className={styles.stat}>
            <h3>6+</h3>
            <p>YEARS OF EXPERIENCE</p>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.stat}>
            <h3>100+</h3>
            <p>PROJECTS DELIVERED</p>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.stat}>
            <h3>10+</h3>
            <p>PARTNERS SCALING</p>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.stat}>
            <h3>15K+</h3>
            <p>CREATORS SKILLED</p>
          </div>
        </div>
      </div>

      <div className={styles.sphereContainer}>
      <img src={circle} className={styles.rotateAnticlockwise} alt="Rotating Sphere" />
    </div>

    </section>
  );
};

export default ImpactStats;
