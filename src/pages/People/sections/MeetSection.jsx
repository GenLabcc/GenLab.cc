import styles from "./MeetSection.module.css";
import logoWhite from "@/assets/Genlab.png";

export default function Meet() {
  const leftCards = [
    {
      id: "intro",
      topLeft: "A GEN Z-DRIVEN AI\nECOSYSTEM",
      topRight: "SMARTER\nAI SOLUTIONS",
      centerIcon: true,
      bottomLeft: "BRANDS THAT\nSTAND OUT",
      bottomRight: "LEARN.\nBUILD.\nLAUNCH.",
    },
  ];

  return (
    <section className={`${styles.white} ${styles.meet}`}>
      <div className={styles.left}>
        <div className={styles.cardsWrapper}>
          <div className={styles.staticGlassCard}>
            <div className={styles.staticInnerGlass}></div>
          </div>

          {leftCards.map((card, index) => (
            <div key={index} className={styles.cardContentWrapper}>
              <div className={styles.cardTop}>
                <div className={styles.cardCornerText}>{card.topLeft}</div>
                <div className={`${styles.cardCornerText} ${styles.textRight}`}>{card.topRight}</div>
              </div>

              <div className={styles.innerGlassContent}>
                {card.centerIcon ? (
                  <img src={logoWhite} alt="GenLab Logo" className={styles.centerIcon} />
                ) : (
                  <div className={styles.centerText}>{card.centerText}</div>
                )}
              </div>

              <div className={styles.cardBottom}>
                {card.bottomText ? (
                  <div className={styles.bottomFullText}>{card.bottomText}</div>
                ) : (
                  <>
                    <div className={styles.cardCornerText}>{card.bottomLeft}</div>
                    <div className={`${styles.cardCornerText} ${styles.textRight}`}>{card.bottomRight}</div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <h1>MEET THE GEN Z MINDS BEHIND THE WORK</h1>
        <p>
          We are a small group of creative thinkers, sharp creators, and doers
          who care deeply about quality. This is a team that blends creativity
          with clarity, ideas with execution, and ambition with responsibility.
        </p>
      </div>
    </section>
  );
}