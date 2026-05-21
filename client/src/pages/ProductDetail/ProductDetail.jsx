import React from 'react';
import styles from './ProductDetail.module.css';
import partnershipLogo from '@/assets/images/products/SNS logo.png';
import heroImage from '@/assets/images/hero-products.jpg';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  return (
    <div className={styles.productDetailPage}>
      <section className={styles.productSection}>
        <div className={styles.pageLayout}>
          <aside className={styles.leftColumn}>
            <div className={styles.stickyContent}>
              <span className={styles.num}>01</span>
              <h1 className={styles.title}>
                Custom<br />
                Website<br />
                Chatbots
              </h1>
              <button className={styles.exploreBtn}>Try</button>
            </div>
          </aside>

          <main className={styles.rightColumn}>
            <motion.div
              className={styles.productUnit}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className={styles.imageContainer}>
                <img src={heroImage} alt="Product view" className={styles.mainImage} />
              </div>

              <div className={styles.contentFooter}>
                <p className={styles.desc}>
                  Create AI-powered chatbots in minutes with GenLab, easy, fast, and code-free. No training. No scripts. Just one line of code and real conversations begin.
                </p>

                <div className={styles.metadataCard}>
                  <div className={styles.partnershipBox}>
                    <img src={partnershipLogo} alt="GenLab and SNS Institutions Partnership" />
                  </div>
                  <div className={styles.infoCol}>
                    <div className={styles.names}>
                      <span>Kavipriya, Manoi Kumar, Muhkesh, Naganathan, Neuwin Manasseh, Pavithra, Prakanya, Ratchanya, Sai Sabiksha, Shakthi Saravanan, Shanmitha Shree & Surva Sri </span>
                    </div>
                    <span className={styles.date}>MAR 26, 2026</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
