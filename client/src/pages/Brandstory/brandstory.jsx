import { useEffect, useState, useRef, useCallback } from "react";
import "./BrandStory.css";
import logoWhite from "../../assets/logo-white.svg";
import whoWeArePhoto from "../../assets/who-we-are.jpg.webp";

const CELL_W = 90;
const CELL_H = 150;

// Diagonal stagger (in real ms now, since this phase is time-based again).
const COL_STAGGER = 140;
const ROW_STAGGER = 100;
const DRAW_LEN = 2600; // how long each individual arch takes to draw
const FADE_LEN = 900; // logo fade-in duration, after the grid finishes

const LOGO_SCALE = 1; // fixed size — logo no longer zooms on scroll

// Scroll distance (in viewport heights) the arch-hero section holds
// for while its intro (grid draw + logo fade-in) plays out.
const SCROLL_LENGTH_VH = 150;

// =========================================================
// Featured press stack (section 2)
// =========================================================
// Drop real cover images in src/assets/press/ and import them the same
// way logoWhite is imported above, e.g.:
//   import cover1 from "../../assets/press/cover-1.jpg";
// then set `src: cover1` below. Any card left with `src: null` just
// renders a placeholder box (with `label`) so the section works before
// real assets exist.
const PRESS_CARDS = [
  { key: "cover-1", src: whoWeArePhoto, label: "VOGUE", alt: "Press feature 1" },
  { key: "cover-2", src: whoWeArePhoto, label: "AD", alt: "Press feature 2" },
  { key: "cover-3", src: whoWeArePhoto, label: "identity", alt: "Press feature 3" },
  { key: "cover-4", src: whoWeArePhoto, label: "ELLE DECORATION", alt: "Press feature 4" },
];

// How much scroll (in vh) is spent on each card, and how much extra
// scroll is held at the end for the closing line to sit on screen.
const PRESS_SCROLL_PER_CARD_VH = 90;
const PRESS_CLOSING_HOLD_VH = 60;

function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

// easeOutCubic — used for the press cards' settle-in / push-out motion.
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function BrandStory() {
  const [grid, setGrid] = useState([]);
  const [maxDelay, setMaxDelay] = useState(0);
  const [timeline, setTimeline] = useState(0); // draw progress, in ms
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [gridOpacity, setGridOpacity] = useState(1);

  const stageRef = useRef(null);
  const hasBuiltGrid = useRef(false);
  const playRafId = useRef(null);

  useEffect(() => {
    const buildGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const cols = Math.ceil(width / CELL_W) + 1;
      const rows = Math.ceil(height / CELL_H) + 2;

      const cells = [];
      let max = 0;

      for (let col = 0; col < cols; col++) {
        const offsetY = (col % 2) * (CELL_H / 2);
        for (let row = -1; row < rows; row++) {
          const rowIndex = row + 1;
          const delay = col * COL_STAGGER + rowIndex * ROW_STAGGER;
          if (delay > max) max = delay;

          cells.push({
            key: `${col}-${row}`,
            x: col * CELL_W,
            y: row * CELL_H + offsetY,
            delay,
          });
        }
      }

      setGrid(cells);
      setMaxDelay(max);
      hasBuiltGrid.current = true;
    };

    const initTimer = setTimeout(buildGrid, 50);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildGrid, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const drawTotal = maxDelay + DRAW_LEN;

  // --- Autoplay: draw grid + fade in logo the moment the section is visible ---
  const playIntro = useCallback(() => {
    if (playRafId.current) cancelAnimationFrame(playRafId.current);

    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;

      const drawElapsed = clamp(elapsed, 0, drawTotal);
      setTimeline(drawElapsed);

      const fadeElapsed = clamp((elapsed - drawTotal) / FADE_LEN, 0, 1);
      setLogoOpacity(fadeElapsed);
      setGridOpacity(1 - fadeElapsed);

      if (elapsed < drawTotal + FADE_LEN) {
        playRafId.current = requestAnimationFrame(tick);
      }
    };

    playRafId.current = requestAnimationFrame(tick);
  }, [drawTotal]);

  useEffect(() => {
    if (!stageRef.current || drawTotal <= DRAW_LEN) return; // wait for grid to build

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasBuiltGrid.current) {
            playIntro();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [drawTotal, playIntro]);

  // =========================================================
  // Section 2: featured-press card stack (scroll-driven)
  // =========================================================
  const pressStageRef = useRef(null);
  const pressRafId = useRef(null);
  const [pressProgress, setPressProgress] = useState(0); // 0..1 across the pinned section

  const updatePressProgress = useCallback(() => {
    if (!pressStageRef.current) return;
    const rect = pressStageRef.current.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;
    setPressProgress(clamp(-rect.top / scrollable, 0, 1));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (pressRafId.current) return;
      pressRafId.current = requestAnimationFrame(() => {
        updatePressProgress();
        pressRafId.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updatePressProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (pressRafId.current) cancelAnimationFrame(pressRafId.current);
    };
  }, [updatePressProgress]);

  const pressCount = PRESS_CARDS.length;
  // Total "units" of progress: one per card, plus a fraction reserved
  // for holding the closing line on screen at the end.
  const pressTotalUnits =
    pressCount + PRESS_CLOSING_HOLD_VH / PRESS_SCROLL_PER_CARD_VH;
  const pressStageHeight =
    pressCount * PRESS_SCROLL_PER_CARD_VH + PRESS_CLOSING_HOLD_VH;
  const pressTimeline = pressProgress * pressTotalUnits;

  return (
    <div className="brand-story">
      <div
        className="scroll-stage"
        ref={stageRef}
        style={{ height: `${SCROLL_LENGTH_VH}vh` }}
      >
        <section className="arch-hero">
          <svg
            className="arch-grid"
            preserveAspectRatio="none"
            style={{ opacity: gridOpacity }}
          >
            {grid.map((cell) => {
              const cellProgress = clamp(
                (timeline - cell.delay) / DRAW_LEN,
                0,
                1
              );
              return (
                <path
                  key={cell.key}
                  className="arch-path"
                  pathLength={1}
                  style={{ strokeDashoffset: 1 - cellProgress }}
                  transform={`translate(${cell.x}, ${cell.y})`}
                  d={`
                    M0,${CELL_W / 2}
                    A${CELL_W / 2},${CELL_W / 2} 0 0 1 ${CELL_W / 2},0
                    L${CELL_W / 2},0
                    A${CELL_W / 2},${CELL_W / 2} 0 0 1 ${CELL_W},${CELL_W / 2}
                    L${CELL_W},${CELL_H - CELL_W / 2}
                    A${CELL_W / 2},${CELL_W / 2} 0 0 1 ${CELL_W / 2},${CELL_H}
                    A${CELL_W / 2},${CELL_W / 2} 0 0 1 0,${CELL_H - CELL_W / 2}
                    Z
                  `}
                />
              );
            })}
          </svg>

          <div
            className="arch-logo-wrap"
            style={{
              opacity: logoOpacity,
              "--scroll-scale": LOGO_SCALE,
            }}
          >
            <img src={logoWhite} alt="GenLab Logo" className="arch-logo" />
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
              // t <= 0        not entered yet
              // 0 < t < 1     entering / settling
              // 1 <= t < 2    resting, then pushed out as the next card arrives
              // t >= 2        fully gone
              const t = pressTimeline - i;

              let opacity = 0;
              let x = 55; // vw offscreen right
              let y = 55; // vh offscreen bottom
              let rotate = 16; // deg
              let scale = 0.88;

              if (t <= 0) {
                opacity = 0;
              } else if (t < 1) {
                const e = easeOutCubic(clamp(t, 0, 1));
                opacity = clamp(t / 0.2, 0, 1);
                x = 55 - 55 * e - 8 * e; // settle slightly left-of-center
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