import styles from "./HeroSection.module.css";
import TwoColumnSection from "./TwoColumnSection.jsx";
import sectionsData from "./sectionsData";

import s1_1 from "@/assets/images/s1_1.png";

export default function Hero() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bgShapes}>
          <div className={`${styles.shape} ${styles.triangle}`} />
          <div className={`${styles.shape} ${styles.circle}`} />
          <div className={`${styles.shape} ${styles.square}`} />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            World’s First Gen Z AI <br />
            Creative Powerhouse
          </h1>

          <button className={styles.heroBtn}>
            JOIN WITH US <span>→</span>
          </button>
        </div>
      </section>

      <section className={styles.white}>
        <h3> OUR ETHOS </h3>
        <h2>
          {" "}
          We transform and create <span>(IMPACTFUL)</span> brands & Al
          solutions. <br />
          With over <span>(10+COMPANIES)</span> having already partnered with us{" "}
          <br />
          to turn up their brand & achieve <span>(GROWTH)</span>{" "}
        </h2>
        <h1>From India To The World.</h1>
      </section>

      <section className={styles.black}>
        <h3> OUR CREATIVITY ENGINE </h3>
        <h1>
          The world's sharpest view of <br />
          The GenZ creativity powered by our 3C <br />
          engine
        </h1>
      </section>

      <section className={styles.twoColumn}>
        <div className={styles.image}>
          <img src={s1_1} alt={"altText"} />
        </div>
        <div className={styles.text}>
          <h3>OUR CAPABILITIES</h3>
          <h2>
            We're a Gen Z team of strategists, designers and Al builders. We
            blend bold branding, smart automation and future-ready upskilling to
            help you launch what's next
          </h2>
          <ul className={styles.list}>
            <li className={styles.listItems}>
              <div className={styles.listItem}>
                <span className={styles.itemNumber}>
                  {String(1).padStart(2, "0")}
                </span>

                <span className={styles.itemText}>GenLab.Brand Studio</span>
              </div>
              <span className={styles.line}></span>
            </li>

            <li className={styles.listItems}>
              <div className={styles.listItem}>
                <span className={styles.itemNumber}>
                  {String(2).padStart(2, "0")}
                </span>

                <span className={styles.itemText}>GenLab.AI Forge</span>
              </div>
              <span className={styles.line}></span>
            </li>

            <li className={styles.listItems}>
              <div className={styles.listItem}>
                <span className={styles.itemNumber}>
                  {String(3).padStart(2, "0")}
                </span>

                <span className={styles.itemText}>GenLab.Launchpad</span>
              </div>
              <span className={styles.line}></span>
            </li>

          </ul>
        </div>
      </section>

      {sectionsData.map((section, index) => (
        <TwoColumnSection key={index} {...section} />
      ))}
    </div>
  );
}
