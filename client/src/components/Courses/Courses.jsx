import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from "react";
import "./Courses.css";
import logo from "../../assets/Course_logo.png";

const coursesData = [
  { id: 1, badge: "Advance Growth", badgeColor: "green",  title: "Full Stack Web Development (MERN)",  description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  { id: 2, badge: "Medium Growth",  badgeColor: "yellow", title: "Full Stack Web Development (MERN)",  description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  { id: 3, badge: "Advance Growth", badgeColor: "green",  title: "Full Stack Web Development (MERN)",  description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  { id: 4, badge: "Advance Growth", badgeColor: "green",  title: "UI/UX Design Fundamentals",           description: "Master design thinking, Figma, and prototyping with real-world projects and mentorship.",   tags: ["Figma", "Adobe XD", "Prototyping", "Research"],  duration: "3 Months", support: "Job Offer Support" },
  { id: 5, badge: "Medium Growth",  badgeColor: "yellow", title: "Data Science & ML",     description: "Dive into data analysis, ML algorithms, and Python for real-world data challenges with expert mentors.",       tags: ["Python", "Pandas", "Scikit-learn", "TensorFlow"], duration: "6 Months", support: "Job Offer Support" },
  { id: 6, badge: "Advance Growth", badgeColor: "green",  title: "DevOps & Cloud Engineering",          description: "Learn CI/CD, Docker, Kubernetes, and AWS for scalable cloud infrastructure with expert mentors",              tags: ["Docker", "AWS", "Kubernetes", "CI/CD Pipeline"],           duration: "4 Months", support: "Job Offer Support" },
];

const AUTOPLAY_INTERVAL = 5000;

/* Circular distance: shortest path around the ring */
const getCircularDiff = (index, active, total) => {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
};

export default function Courses({ registerGoToPage, registerPageRef, registerTotalPages }) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);
  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const totalCards = coursesData.length;

  /* Measure viewport width for spacing calculations */
  const measure = useCallback(() => {
    if (viewportRef.current) {
      setViewportWidth(viewportRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* Keep external refs in sync */
  useEffect(() => {
    registerTotalPages?.(totalCards);
    registerGoToPage?.((page) => {
      setActiveIndex(((page % totalCards) + totalCards) % totalCards);
    });
  }, [registerGoToPage, registerTotalPages, totalCards]);

  useEffect(() => {
    registerPageRef?.(activeIndex);
  }, [activeIndex, registerPageRef]);

  /* Autoplay — wraps circularly */
  useEffect(() => {
    autoplayRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(autoplayRef.current);
  }, [activeIndex, totalCards]);

  /* Circular navigation — always wraps */
  const goTo = (index) => {
    setActiveIndex(((index % totalCards) + totalCards) % totalCards);
  };

  const handlePrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, totalCards]);
  const handleNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, totalCards]);

  /* Responsive: detect mobile for layout adjustments */
  const isMobile = viewportWidth > 0 && viewportWidth < 640;

  /* Touch swipe support for mobile */
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (isSwiping.current) {
      touchEndX.current = e.touches[0].clientX;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const swipeDiff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(swipeDiff) > threshold) {
      setActiveIndex((prev) => {
        const next = swipeDiff > 0 ? prev + 1 : prev - 1;
        return ((next % totalCards) + totalCards) % totalCards;
      });
    }
  }, [totalCards]);

  /* Compute inline style for each card based on circular position */
  const getSlideStyle = (index) => {
    const diff = getCircularDiff(index, activeIndex, totalCards);
    const absDiff = Math.abs(diff);

    /* Responsive spacing: wider cards need more spacing */
    let spacingRatio;
    if (viewportWidth < 480) spacingRatio = 0.72;
    else if (viewportWidth < 640) spacingRatio = 0.65;
    else if (viewportWidth < 1024) spacingRatio = 0.40;
    else if (viewportWidth < 1440) spacingRatio = 0.36;
    else spacingRatio = 0.33;

    const spacing = viewportWidth * spacingRatio;
    const offsetX = diff * spacing;

    /* On mobile, hide cards more than 1 position away for cleaner look */
    const hideThreshold = isMobile ? 1 : 2;

    if (absDiff > hideThreshold) {
      return {
        transform: `translateX(calc(-50% + ${offsetX}px)) translateY(-50%) scale(0.7)`,
        opacity: 0,
        pointerEvents: "none",
        zIndex: 0,
      };
    }

    /* Mobile: only active card is fully visible, neighbors are barely peeking */
    let scale, opacity, blur;
    if (isMobile) {
      scale  = absDiff === 0 ? 1 : 0.88;
      opacity = absDiff === 0 ? 1 : 0.3;
      blur = absDiff === 0 ? 0 : 2;
    } else {
      scale  = absDiff === 0 ? 1    : absDiff === 1 ? 0.85 : 0.75;
      opacity = absDiff === 0 ? 1    : absDiff === 1 ? 0.6  : 0.35;
      blur    = absDiff >= 2 ? 1 : 0;
    }

    const zIndex  = 10 - absDiff;

    return {
      transform: `translateX(calc(-50% + ${offsetX}px)) translateY(-50%) scale(${scale})`,
      opacity,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : "none",
      pointerEvents: absDiff === 0 ? "auto" : "none",
    };
  };

  const getSlideClass = (index) => {
    const diff = getCircularDiff(index, activeIndex, totalCards);
    if (diff === 0) return "courses-carousel-slide active";
    if (Math.abs(diff) === 1) return "courses-carousel-slide adjacent";
    return "courses-carousel-slide";
  };

  return (
    <section className="courses-section">
      <div className="courses-header">
        <h2 className="courses-title">Learn What Industry Demands</h2>
        <p className="courses-subtitle">
          9 Divisions · 26 Courses · Online and Offline · 3 to 6 Month Programs
        </p>
      </div>

      <div className="courses-carousel-container">
        {/* Left Arrow — always enabled (circular) */}
        <button
          className="carousel-arrow carousel-arrow--left"
          onClick={handlePrev}
          aria-label="Previous course"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Carousel Viewport — cards positioned absolutely inside */}
        <div
          className="courses-carousel-viewport"
          ref={viewportRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {coursesData.map((course, index) => (
            <div
              className={getSlideClass(index)}
              key={course.id}
              style={getSlideStyle(index)}
            >
              <div className="courses-card">
                <div className="courses-card-top">
                  <div className={`courses-badge badge-${course.badgeColor}`}>
                    <span>↗</span> {course.badge}
                  </div>
                  <img src={logo} alt="GenLab Logo" className="courses-logo-img" />
                </div>
                <div className="courses-card-bottom">
                  <div className="courses-card-text">
                    <h3 className="courses-card-title">{course.title}</h3>
                    <p className="courses-card-description">{course.description}</p>
                  </div>
                  <div className="courses-tags">
                    {course.tags.map((tag) => (
                      <span key={tag} className="courses-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="courses-pills">
                    <span className="courses-pill courses-pill-duration">{course.duration}</span>
                    <span className="courses-pill courses-pill-support">{course.support}</span>
                  </div>
                  <div className="courses-footer">
                    <button className="courses-btn-syllabus">
                      <svg viewBox="0 0 24 24" className="download-icon" style={{ width: "16px", height: "16px" }} xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3v12M12 15l-5-5M12 15l5-5M4 19h16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Syllabus
                    </button>
                    <button className="courses-btn-enroll">Enroll Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow — always enabled (circular) */}
        <button
          className="carousel-arrow carousel-arrow--right"
          onClick={handleNext}
          aria-label="Next course"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="courses-nav">
        <div className="nav-dots">
          {coursesData.map((_, i) => (
            <button
              key={i}
              className={`nav-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to course ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="courses-explore">
        <button
          className="btn-explore"
          onClick={() => navigate('/tracks')}
        >Explore All Programs</button>
      </div>
    </section>
  );
}
