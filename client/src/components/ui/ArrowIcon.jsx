import React from "react";
import styles from "./ArrowIcon.module.css";

const ArrowIcon = ({ stroke = "black", strokeWidth = 2 }) => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h18" />
      <path d="M18 8l4 4-4 4" />
    </svg>
  );
};

export default ArrowIcon;
