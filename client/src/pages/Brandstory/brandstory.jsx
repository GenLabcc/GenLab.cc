import { useEffect, useState, useRef, useCallback } from "react";
import "./brandstory.css";
import whoWeArePhoto from "../../assets/who-we-are.jpg.webp";
import firstMockupPhoto from "../../assets/First Mockup.png";
import brandLogo from "../../assets/logo-mark.png";

// =========================================================
// Intro reveal (section 1): black -> logo -> photo
// =========================================================
const BRAND_LOGO_SRC = brandLogo;

const REVEAL_SCROLL_VH = 220; // total scroll distance (vh) for the whole intro
const REVEAL_LOGO_IN = 0.35; // 0..this: logo mark wipes in, line by line
const REVEAL_HOLD_END = 0.55; // this..1: logo fades out, photo fades in

// =========================================================
// Featured press stack (section 2)
// =========================================================
const PRESS_CARDS = [
  { key: "cover-1", src: whoWeArePhoto, label: "VOGUE", alt: "Press feature 1" },
  { key: "cover-2", src: whoWeArePhoto, label: "AD", alt: "Press feature 2" },
  { key: "cover-3", src: whoWeArePhoto, label: "identity", alt: "Press feature 3" },
  { key: "cover-4", src: whoWeArePhoto, label: "ELLE DECORATION", alt: "Press feature 4" },
];

const PRESS_SCROLL_PER_CARD_VH = 90;
const PRESS_CLOSING_HOLD_VH = 60;

function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function BrandStory() {
  // =========================================================
  // Intro reveal (scroll-driven)
  // =========================================================
  const revealStageRef = useRef(null);
  const [revealProgress, setRevealProgress] = useState(0); // 0..1 across the pinned intro

  const updateRevealProgress = useCallback(() => {
    if (!revealStageRef.current) return;
    const rect = revealStageRef.current.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;
    setRevealProgress(clamp(-rect.top / scrollable, 0, 1));
  }, []);

  // =========================================================
  // Featured-press card stack (scroll-driven)
  // =========================================================
  const pressStageRef = useRef(null);
  const [pressProgress, setPressProgress] = useState(0); // 0..1 across the pinned section

  const updatePressProgress = useCallback(() => {
    if (!pressStageRef.current) return;
    const rect = pressStageRef.current.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;
    setPressProgress(clamp(-rect.top / scrollable, 0, 1));
  }, []);

  const rafId = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        updateRevealProgress();
        updatePressProgress();
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateRevealProgress();
    updatePressProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateRevealProgress, updatePressProgress]);

  // Whole-mark exit fade: [REVEAL_HOLD_END, 1] as the photo takes over.
  const revealLogoOutT = clamp(
    (revealProgress - REVEAL_HOLD_END) / (1 - REVEAL_HOLD_END),
    0,
    1
  );

  // Line-by-line wipe: the logo reveals top -> bottom, 1:1 with scroll
  // (linear, no easing) across [0, REVEAL_LOGO_IN], then the whole mark
  // fades out over [REVEAL_HOLD_END, 1] via revealLogoOutT.
  const revealLinePercent = clamp(revealProgress / REVEAL_LOGO_IN, 0, 1) * 100;
  const revealLogoOpacity = 1 - revealLogoOutT;

  // Photo: fades/scales in over [REVEAL_HOLD_END, 1].
  const revealImageOpacity = revealLogoOutT;
  const revealImageScale = 1.08 - 0.08 * easeOutCubic(revealLogoOutT);

  const pressCount = PRESS_CARDS.length;
  const pressTotalUnits =
    pressCount + PRESS_CLOSING_HOLD_VH / PRESS_SCROLL_PER_CARD_VH;
  const pressStageHeight =
    pressCount * PRESS_SCROLL_PER_CARD_VH + PRESS_CLOSING_HOLD_VH;
  const pressTimeline = pressProgress * pressTotalUnits;

  return (
    <div className="brand-story">
      {/* =========================================================
          Intro reveal: black -> logo -> photo
      ========================================================= */}
      <div
        className="brand-reveal__stage"
        ref={revealStageRef}
        style={{ height: `${REVEAL_SCROLL_VH}vh` }}
      >
        <section className="brand-reveal__hero">
          <div
            className="brand-reveal__logo"
            style={{ opacity: revealLogoOpacity }}
          >
            <div className="brand-reveal__logo-mark" aria-hidden="true">
              <img
                src={BRAND_LOGO_SRC}
                alt=""
                className="brand-reveal__logo-img"
                style={{
                  clipPath: `inset(0 0 ${100 - revealLinePercent}% 0)`,
                }}
              />
            </div>
          </div>

          <div
            className="brand-reveal__media"
            style={{
              opacity: revealImageOpacity,
              transform: `scale(${revealImageScale})`,
            }}
          >
            <img src={firstMockupPhoto} alt="Featured mockup" />
          </div>
        </section>
      </div>

      <div
        className="featured-press__stage"
        ref={pressStageRef}
        style={{ height: `${pressStageHeight}vh` }}
      >
        <section className="featured-press__hero">
          <div
            className="featured-press__intro"
            style={{
              opacity: 1 - clamp((pressTimeline - (pressCount - 0.4)) / 0.6, 0, 1),
            }}
          >
            <p className="featured-press__eyebrow">
              Where bold ideas find their audience
            </p>
            <h2 className="featured-press__heading">
              <span className="featured-press__heading-bar" />
              Featured in the world's
              <br />
              <span className="featured-press__heading-accent">
                leading voices
              </span>
            </h2>
          </div>

          <div className="featured-press__stack">
            {PRESS_CARDS.map((card, i) => {
              const t = pressTimeline - i;

              let opacity = 0;
              let x = 55;
              let y = 55;
              let rotate = 16;
              let scale = 0.88;

              if (t <= 0) {
                opacity = 0;
              } else if (t < 1) {
                const e = easeOutCubic(clamp(t, 0, 1));
                opacity = clamp(t / 0.2, 0, 1);
                x = 55 - 55 * e - 8 * e;
                y = 55 - 55 * e;
                rotate = 16 - 16 * e;
                scale = 0.88 + 0.14 * e;
              } else {
                const e = easeOutCubic(clamp(t - 1, 0, 1));
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
                  {card.src ? (
                    <img src={card.src} alt={card.alt} />
                  ) : (
                    <div className="featured-press__card-placeholder">
                      {card.label}
                    </div>
                  )}
                </figure>
              );
            })}
          </div>

          <p
            className="featured-press__closing"
            style={{
              opacity: clamp((pressTimeline - (pressCount - 0.5)) / 0.6, 0, 1),
            }}
          >
            Our work is recognized by top publications like{" "}
            <strong>Architectural Digest</strong>,{" "}
            <strong>ELLE Decoration</strong>, and <strong>VOGUE</strong>,
            highlighting a vision of refined originality.
          </p>
        </section>
      </div>
    </div>
  );
}

export default BrandStory;