import React from 'react';
import styles from './HeroSection.module.css'; // Re-use Hero styles for consistency

const CreativityEngine = () => {
  return (
    <section className={styles.black}>
        <h3 style={{
            fontSize: 'clamp(12px, 1.2vw, 16px)',
            letterSpacing: '0.15em',
            fontWeight: '400',
            marginBottom: '24px',
            color: '#999',
            textAlign: 'center'
        }}> OUR CREATIVITY ENGINE </h3>
        <h1 style={{
            fontSize: 'clamp(24px, 4vw, 56px)',
            fontWeight: '500',
            lineHeight: '1.2',
            textAlign: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            color: '#fff'
        }}>
          The world's sharpest view of GenZ creativity powered by our 3C engine
        </h1>
    </section>
  );
};

export default CreativityEngine;
