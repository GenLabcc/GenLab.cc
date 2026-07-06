import { useRef, useEffect, useState } from "react";
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

export default function Launch({ compact = false, scrollDistanceScale = 1 }) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const timelineRef = useRef(null);
  const [scrollExtra, setScrollExtra] = useState(0);

  // Measure how much horizontal overflow we need to scroll through
  useEffect(() => {
    const measure = () => {
      if (!timelineRef.current || !stickyRef.current) return;
      const timelineWidth = timelineRef.current.scrollWidth;
      const viewportWidth = timelineRef.current.parentElement?.clientWidth ?? stickyRef.current.clientWidth;
      const extra = compact ? 0 : Math.max(0, timelineWidth - viewportWidth);
      setScrollExtra(extra);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [compact]);

  // Drive horizontal translation from vertical scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // How far we've scrolled into the tall wrapper
      // rect.top starts at some positive value, goes negative as we scroll
      const scrolled = -rect.top;
      // Total scrollable distance within the wrapper (minus one viewport that's always visible)
      const totalScroll = sectionHeight - viewportHeight;

      if (totalScroll <= 0) return;

      // Progress: 0 at top, 1 when fully scrolled through
      const progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);

      // Apply horizontal translation
      const translateX = progress * scrollExtra;
      timelineRef.current.style.transform = `translateX(-${translateX}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollExtra]);

  // The outer wrapper height = 100vh (visible) + scrollExtra (the horizontal distance mapped to vertical scroll)
  const scaledScrollExtra = Math.round(scrollExtra * scrollDistanceScale);
  const wrapperHeight = compact ? "100vh" : `calc(70vh + ${scaledScrollExtra}px)`;

  return (
    <section
      className={`journey-outer ${compact ? "journey-outer--compact" : ""}`}
      ref={sectionRef}
      style={{ height: wrapperHeight }}
    >
      <div className="journey-section" ref={stickyRef}>
        <div className="journey-wrapper">

          {/* Hero card with background image and glows */}
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

          {/* Timeline — translated horizontally based on scroll progress */}
          <div className="journey-timeline-viewport">
            <ol className="journey-timeline" ref={timelineRef}>
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
      </div>
    </section>
  );
}
