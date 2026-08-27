import { useEffect, useRef, useState, useCallback } from "react";
import "./FeaturedPress.css";

// Replace with your own press assets.
import cover1 from "../../assets/press/cover-1.jpg";
import cover2 from "../../assets/press/cover-2.jpg";
import cover3 from "../../assets/press/cover-3.jpg";
import cover4 from "../../assets/press/cover-4.jpg";

const CARDS = [
  { key: "cover-1", src: cover1, alt: "Press feature 1" },
  { key: "cover-2", src: cover2, alt: "Press feature 2" },
  { key: "cover-3", src: cover3, alt: "Press feature 3" },
  { key: "cover-4", src: cover4, alt: "Press feature 4" },
];

// How much scroll (in vh) is spent on each card, and how much extra
// scroll is held at the end for the closing line to sit on screen.
const SCROLL_PER_CARD_VH = 90;
const CLOSING_HOLD_VH = 60;

function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

// easeOutCubic — used for both the settle-in and the push-out motion.
function ease(t) {
  return 1 - Math.pow(1 - t, 3);
}

function FeaturedPress({
  eyebrow = "Where bold ideas find their audience",
  headingTop = "Featured in the world's",
  headingAccent = "leading voices",
  closing,
}) {
  const stageRef = useRef(null);
  const rafId = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1 across the whole pinned section

  const update = useCallback(() => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;
    setProgress(clamp(-rect.top / scrollable, 0, 1));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        update();
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  const n = CARDS.length;
  // Total "units" of progress: one per card, plus a fraction reserved
  // for holding the closing line on screen at the end.
  const totalUnits = n + CLOSING_HOLD_VH / SCROLL_PER_CARD_VH;
  const stageHeight = n * SCROLL_PER_CARD_VH + CLOSING_HOLD_VH;
  const timeline = progress * totalUnits;

  return (
    <div className="featured-press">
      <div
        className="featured-press__stage"
        ref={stageRef}
        style={{ height: `${stageHeight}vh` }}
      >
        <section className="featured-press__hero">
          <div
            className="featured-press__intro"
            style={{ opacity: 1 - clamp((timeline - (n - 0.4)) / 0.6, 0, 1) }}
          >
            <p className="featured-press__eyebrow">{eyebrow}</p>
            <h2 className="featured-press__heading">
              <span className="featured-press__heading-bar" />
              {headingTop}
              <br />
              <span className="featured-press__heading-accent">
                {headingAccent}
              </span>
            </h2>
          </div>

          <div className="featured-press__stack">
            {CARDS.map((card, i) => {
              // t <= 0        not entered yet
              // 0 < t < 1     entering / settling
              // 1 <= t < 2    resting, then pushed out as the next card arrives
              // t >= 2        fully gone
              const t = timeline - i;

              let opacity = 0;
              let x = 55; // vw offscreen right
              let y = 55; // vh offscreen bottom
              let rotate = 16; // deg
              let scale = 0.88;

              if (t <= 0) {
                opacity = 0;
              } else if (t < 1) {
                const e = ease(clamp(t, 0, 1));
                opacity = clamp(t / 0.2, 0, 1);
                x = 55 - 55 * e - 8 * e; // settle slightly left-of-center
                y = 55 - 55 * e;
                rotate = 16 - 16 * e;
                scale = 0.88 + 0.14 * e;
              } else {
                const e = ease(clamp(t - 1, 0, 1));
                opacity = 1 - clamp((t - 1.3) / 0.7, 0, 1);
                x = -8 - 22 * e;
                y = -6 * e + 30 * clamp((t - 1.6) / 0.4, 0, 1);
                rotate = -12 * e;
                scale = 1.02 - 0.1 * e;
              }

              return (
                <figure
                  key={card.key}
                  className="featured-press__card"
                  style={{
                    opacity,
                    transform: `translate(${x}vw, ${y}vh) rotate(${rotate}deg) scale(${scale})`,
                    zIndex: 10 + i,
                  }}
                >
                  <img src={card.src} alt={card.alt} />
                </figure>
              );
            })}
          </div>

          {closing && (
            <p
              className="featured-press__closing"
              style={{ opacity: clamp((timeline - (n - 0.5)) / 0.6, 0, 1) }}
            >
              {closing}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default FeaturedPress;