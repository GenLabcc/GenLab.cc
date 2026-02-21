import React from "react";
import styles from "./ConnectSection.module.css";

const ConnectSection = () => {
  return (
    <section className={styles.connectSection}>
      <div className={styles.left}>
        <h2 className={styles.heading}>
          LET’S <br /> CONNECT
        </h2>
      </div>

      <div className={styles.right}>
        <form className={styles.form}>
          <div className={styles.row}>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email Address" />
          </div>

          <div className={styles.row}>
            <input type="text" placeholder="Phone (Optional)" />
            <input type="text" placeholder="How did you hear about GenLab?" />
          </div>

          <textarea
            placeholder="Tell us about your project"
            rows={5}
          ></textarea>

          <label className={styles.customCheckbox}>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            <span className={styles.checkboxText}>
              I consent to GenLab collecting and processing my information to
              respond to my request and for future communication.
            </span>
          </label>

          <button type="submit" className={styles.submitBtn}>
            <span>SUBMIT</span>
            <div className={styles.arrow}>→</div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ConnectSection;
