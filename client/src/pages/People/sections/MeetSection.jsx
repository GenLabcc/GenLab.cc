import { useState } from "react";
import styles from "./MeetSection.module.css";
import ArrowIcon from "@/components/ui/ArrowIcon.jsx";

import s1_1 from "@/assets/images/Meet.webp";

export default function Meet() {

  return (
      <section className={`${styles.white} ${styles.meet}`}>
        <div className={styles.left}>
          <img src={s1_1} alt={"altText"} />
        </div>

        <div className={styles.right}>
          <h3>MEET THE GEN Z MINDS BEHIND THE WORK</h3>
          <p>
            We are a small group of creative thinkers, sharp creators, and doers
            who care deeply about quality. This is a team that blends creativity
            with clarity, ideas with execution, and ambition with
            responsibility.
          </p>
        </div>
      </section>
  );
}
