import React from 'react';
import styles from './HeroSection.module.css';

const EthosSection = () => {
  return (
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
  );
};

export default EthosSection;
