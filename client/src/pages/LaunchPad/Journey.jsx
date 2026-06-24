import { useRef, useEffect } from "react";
import "./Journey.css";
import bg from "../../assets/bg.png";

const steps = [
  { number: 1, title: "You're In. Welcome to GenLab.", description: "Onboarding and orientation to your learning path" },
  { number: 2, title: "First Day Energy", description: "Corporate immersion and workspace induction" },
  { number: 3, title: "Heads Down, Skills Up", description: "Hands-on training, live sessions, and weekly skill builds" },
  { number: 4, title: "Speak Up, Stand Out", description: "Voice sessions and group discussions for communication and confidence" },
  { number: 5, title: "Learn from the Best", description: "Expert talks and insights from founders, creators, and industry leaders" },
  { number: 6, title: "See How It Really Works", description: "Industry visits and corporate exposure programs" },
  { number: 7, title: "Build Something That's Actually Yours", description: "Live project execution and portfolio development" },
  { number: 8, title: "How Far Have You Come?", description: "Mid-program assessment and personal progress review" },
  { number: 9, title: "Get Seen. Get Noticed.", description: "Resume building, LinkedIn setup, and interview preparation" },
  { number: 10, title: "Showtime", description: "Mock interviews, demo day, and portfolio showcase" },
  { number: 11, title: "Go Land That Job.", description: "Placement support, referrals, and career launch" },
];

export default function Launch({ timelineRef }) {
  const internalRef = useRef(null);
  const scrollEl = timelineRef || internalRef;
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const AUTO_SPEED = 1.2;

  useEffect(() => {
    const el = scrollEl.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const tick = () => {
      if (!pausedRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;

        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft = maxScroll;
        } else {
          el.scrollLeft = Math.min(el.scrollLeft + AUTO_SPEED, maxScroll);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [scrollEl]);

  return (
    <section className="journey-section" ref={sectionRef}>
      <div className="journey-wrapper">

        {/* bg.png as background image; glows layer on top for depth */}
        <div
          className="journey-hero"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="journey-glow glow-1"></div>
          <div className="journey-glow glow-2"></div>

          <h1 className="journey-hero__title">
            Journey<br />Of Our<br />Learners
          </h1>

          <div className="journey-hero__line"></div>

          <p className="journey-hero__text">
            Your First Day to Your First Offer.
            Here's What the Journey Looks Like.
          </p>
        </div>

        <div className="journey-timeline-scroll" ref={scrollEl}>
          <ol className="journey-timeline">
            {steps.map((step) => (
              <li className="journey-step" key={step.number}>
                <div className="journey-step__top">
                  <span className="journey-step__badge">{step.number}</span>
                  <h3 className="journey-step__title">{step.title}</h3>
                </div>
                <div className="journey-step__bottom">
                  <div className="journey-step__rule">
                    <span className="journey-step__ad">ad</span>
                  </div>
                  <p className="journey-step__description">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}