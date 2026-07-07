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

  const handlePrev = () => goTo(activeIndex - 1);
  const handleNext = () => goTo(activeIndex + 1);

  /* Compute inline style for each card based on circular position */
  const getSlideStyle = (index) => {
    const diff = getCircularDiff(index, activeIndex, totalCards);
    const absDiff = Math.abs(diff);

    /* Spacing between card centers — ~34% of viewport */
    const spacing = viewportWidth * 0.34;
    const offsetX = diff * spacing;

    /* Cards more than 2 positions away: hide them */
    if (absDiff > 2) {
      return {
        transform: `translateX(calc(-50% + ${offsetX}px)) translateY(-50%) scale(0.7)`,
        opacity: 0,
        pointerEvents: "none",
        zIndex: 0,
      };
    }

    const scale  = absDiff === 0 ? 1    : absDiff === 1 ? 0.85 : 0.75;
    const opacity = absDiff === 0 ? 1    : absDiff === 1 ? 0.6  : 0.35;
    const zIndex  = 10 - absDiff;
    const blur    = absDiff >= 2 ? 1 : 0;

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
        <div className="courses-carousel-viewport" ref={viewportRef}>
          {coursesData.map((course, index) => (
            <div
              className={getSlideClass(index)}
              key={course.id}
              style={getSlideStyle(index)}
            >
              <div className="course-card">
                <div className="course-card-top">
                  <div className={`course-badge badge-${course.badgeColor}`}>
                    <span>↗</span> {course.badge}
                  </div>
                  <img src={logo} alt="GenLab Logo" className="course-logo-img" />
                </div>
                <div className="course-card-bottom">
                  <div className="course-card-text">
                    <h3 className="course-card-title">{course.title}</h3>
                    <p className="course-card-description">{course.description}</p>
                  </div>
                  <div className="course-tags">
                    {course.tags.map((tag) => (
                      <span key={tag} className="course-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="course-pills">
                    <span className="pill pill-duration">{course.duration}</span>
                    <span className="pill pill-support">{course.support}</span>
                  </div>
                  <div className="course-footer">
                    <button className="btn-syllabus">↓ Syllabus</button>
                    <button className="btn-enroll">Enroll Now</button>
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
