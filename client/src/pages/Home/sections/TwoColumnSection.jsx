// TwoColumnSection.jsx
import styles from "./TwoColumnSection.module.css";

export default function TwoColumnSection({
  imgSrc,
  heading,
  list,
}) {
  return (
    <section className={styles.twoColumn}>
      <div className={styles.image}>
        <img src={imgSrc} alt={heading} />
      </div>

      <div className={styles.text}>
        <h2>{heading}</h2>

        <ul className={styles.list}>
          {list.map((item, index) => (
            <li key={index} className={styles.listItems}>
              <div className={styles.listItem}>
                <span className={styles.itemNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={styles.itemText}>{item}</span>
              </div>

              <span className={styles.line}></span>
            </li>
          ))}
        </ul>

        <div>
          <button className={styles.heroBtn}>
            START WITH US <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
