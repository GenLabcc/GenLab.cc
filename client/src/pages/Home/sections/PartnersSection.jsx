import React from "react";
import styles from "./PartnersSection.module.css";

// ----------------- IMPORT LOGOS USING @ ----------------- //
// Academia Logos
import vitLogo from "@/assets/logos/academia/vit.webp";
import arunachalaLogo from "@/assets/logos/academia/a_arunachala.png";
import a3Logo from "@/assets/logos/academia/a_3.webp";
import a4Logo from "@/assets/logos/academia/a_4.png";
import a5Logo from "@/assets/logos/academia/a_5.png";
import a6Logo from "@/assets/logos/academia/a_6.png";
import a7Logo from "@/assets/logos/academia/a_7.webp";

// Industry Logos
import i1Logo from "@/assets/logos/industry/i_1.webp";
import i2Logo from "@/assets/logos/industry/i_2.webp";
import i3Logo from "@/assets/logos/industry/i_3.webp";
import i4Logo from "@/assets/logos/industry/i_4.webp";
import i5Logo from "@/assets/logos/industry/i_5.webp";
import i6Logo from "@/assets/logos/industry/i_6.webp";
import i7Logo from "@/assets/logos/industry/i_7.webp";

// ----------------- LOGO ARRAYS ----------------- //
const academiaLogos = [
  vitLogo,
  arunachalaLogo,
  a3Logo,
  a4Logo,
  a5Logo,
  a6Logo,
  a7Logo,
];

const industryLogos = [
  i1Logo,
  i2Logo,
  i3Logo,
  i4Logo,
  i5Logo,
  i6Logo,
  i7Logo,
];

const PartnersSection = () => {
  return (

      <section className={styles.partnersSection}>
        <p className={styles.eyebrow}>OUR PARTNERS</p>

        {/* ACADEMIA */}
        <div className={styles.block}>
          <h2 className={styles.title}>Academia</h2>

          <div className={styles.marqueeOuter}>
            <div className={styles.marqueeWrapper}>
              <div className={`${styles.marquee} ${styles.left}`}>
                {[...academiaLogos, ...academiaLogos].map((logo, index) => (
                  <div key={index} className={styles.logoBox}>
                    <img src={logo} alt="partner logo" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INDUSTRY */}
        <div className={styles.block}>
          <h2 className={styles.title}>Industry</h2>

          <div className={styles.marqueeOuter}>
            <div className={styles.marqueeWrapper}>
              <div className={`${styles.marquee} ${styles.right}`}>
                {[...industryLogos, ...industryLogos].map((logo, index) => (
                  <div key={index} className={styles.logoBox}>
                    <img src={logo} alt="partner logo" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default PartnersSection;
