import React, { useState } from 'react';
import styles from './Products.module.css';
import snsLogo from '@/assets/images/products/SNS logo.png';
import christLogo from '@/assets/images/products/Christ logo.png';
import heroImage from '@/assets/images/hero-products.jpg';
import snsVideo from '@/assets/Sns_product.mp4';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const [activeProduct, setActiveProduct] = useState(1);

  // Data for the sticky left side to swap smoothly
  const productData = {
    1: { id: "01", title: ["Custom", "Website", "Chatbots"], link: "https://sns-chatbot.vercel.app/" },
    2: { id: "02", title: ["Campus", "Hub AI"], link: "#" }
  };

  return (
    <div className={styles.productsPage}>
      <section className={styles.productSection}>
        <div className={styles.pageLayout}>

          {/* STICKY LEFT COLUMN */}
          <aside className={styles.leftColumn}>
            <div className={styles.stickyContent}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className={styles.num}>{productData[activeProduct].id}</span>
                  <h1 className={styles.title}>
                    {productData[activeProduct].title.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}<br />
                      </React.Fragment>
                    ))}
                  </h1>
                  <a
                    href={productData[activeProduct].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.exploreBtn}
                  >
                    Try
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </aside>

          {/* SCROLLING RIGHT COLUMN */}
          <main className={styles.rightColumn}>

            {/* Product Unit 01 */}
            <motion.div
              className={styles.productUnit}
              onViewportEnter={() => setActiveProduct(1)}
              viewport={{ amount: 0.5 }}
            >
              <div className={styles.imageContainer}>
                <video
                  src={snsVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.mainImage}
                />
              </div>

              <div className={styles.contentFooter}>
                <p className={styles.desc}>
                  Create AI-powered chatbots in minutes with GenLab, easy, fast, and code-free. No training. No scripts. Just one line of code and real conversations begin.
                </p>

                <div className={styles.metadataCard}>
                  <div className={styles.partnershipBox}>
                    <img src={snsLogo} alt="GenLab and SNS Institutions Partnership" />
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

            {/* Product Unit 02 */}
            <motion.div
              className={styles.productUnit}
              onViewportEnter={() => setActiveProduct(2)}
              viewport={{ amount: 0.5 }}
            >
              <div className={styles.imageContainer}>
                <img src={heroImage} alt="Product view 2" className={styles.mainImage} />
              </div>

              <div className={styles.contentFooter}>
                <p className={styles.desc}>
                  Transform campuses with GenLab Campus AI Hub plug-and-play AI for colleges. No complex setup. Real student engagement starts instantly.
                </p>

                <div className={styles.metadataCard}>
                  <div className={styles.partnershipBox}>
                    <img src={christLogo} alt="GenLab and Christ University Partnership" />
                  </div>
                  <div className={styles.infoCol}>
                    <div className={styles.names}>
                      <span>Neelanjan Dutta<br />
                        Elluri Sri Lakshmi </span>
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

export default Products;
