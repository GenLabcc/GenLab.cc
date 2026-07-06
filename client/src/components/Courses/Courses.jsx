import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Courses.css";
import logo from "../../assets/Course_logo.png";

const coursesData = [
  { id: 1, badge: "Advance Growth", badgeColor: "green",  title: "Full Stack Web Development (MERN)",  description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  { id: 2, badge: "Medium Growth",  badgeColor: "yellow", title: "Full Stack Web Development (MERN)",  description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  { id: 3, badge: "Advance Growth", badgeColor: "green",  title: "Full Stack Web Development (MERN)",  description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  { id: 4, badge: "Advance Growth", badgeColor: "green",  title: "UI/UX Design Fundamentals",           description: "Master design thinking, Figma, and prototyping with real-world projects and mentorship with career support.",   tags: ["Figma", "Adobe XD", "Prototyping", "Research"],  duration: "3 Months", support: "Job Offer Support" },
  { id: 5, badge: "Medium Growth",  badgeColor: "yellow", title: "Data Science & ML",     description: "Dive into data analysis, ML algorithms, and Python for real-world data challenges with expert mentors.",       tags: ["Python", "Pandas", "Scikit-learn", "TensorFlow"], duration: "6 Months", support: "Job Offer Support" },
  { id: 6, badge: "Advance Growth", badgeColor: "green",  title: "DevOps & Cloud Engineering",          description: "Learn CI/CD, Docker, Kubernetes, and AWS for scalable cloud infrastructure with expert mentors",              tags: ["Docker", "AWS", "Kubernetes", "CI/CD Pipeline"],           duration: "4 Months", support: "Job Offer Support" },
];

const CARDS_PER_PAGE = 3;
const MOBILE_CARDS_PER_PAGE = 1;
const MOBILE_BREAKPOINT = 640;

const getCardsPerPage = () =>
  window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_CARDS_PER_PAGE : CARDS_PER_PAGE;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function Courses({ registerGoToPage, registerPageRef, registerTotalPages }) {
  const navigate = useNavigate();
  const [[currentPage, direction], setPageState] = useState([0, 0]);
  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage);
  const totalPages = Math.ceil(coursesData.length / cardsPerPage);

  const paginate = (newPage) => {
    const clamped = Math.max(0, Math.min(totalPages - 1, newPage));
    setPageState(([prevPage]) => [clamped, clamped > prevPage ? 1 : -1]);
  };

  useEffect(() => {
    registerTotalPages?.(totalPages);
    registerGoToPage?.((page) => {
      paginate(page);
    });
  }, [registerGoToPage, registerTotalPages, totalPages]);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPageState(([page]) => [Math.min(page, totalPages - 1), 0]);
  }, [totalPages]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      paginate((currentPage + 1) % totalPages);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [currentPage, totalPages]);

  // Keep App's ref always current
  useEffect(() => {
    registerPageRef?.(currentPage);
  }, [currentPage, registerPageRef]);

  const visibleCourses = coursesData.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  const handlePrev = () => paginate(currentPage - 1);
  const handleNext = () => paginate(currentPage + 1);

return (
    <section className="courses-section">
      <div className="courses-header">
        <h2 className="courses-title">Learn What Industry Demands</h2>
        <p className="courses-subtitle">
          9 Divisions · 26 Courses · Online and Offline · 3 to 6 Month Programs
        </p>
      </div>

      <div className="courses-grid-wrapper" style={{ overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            className="courses-grid"
            key={currentPage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {visibleCourses.map((course) => (
              <div className="course-card" key={course.id}>
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
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="courses-nav">
        <button className="nav-arrow" onClick={handlePrev} disabled={currentPage === 0} aria-label="Previous">&#8592;</button>
        <div className="nav-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} className={`nav-dot ${i === currentPage ? "active" : ""}`} onClick={() => paginate(i)} aria-label={`Page ${i + 1}`} />
          ))}
        </div>
        <button className="nav-arrow" onClick={handleNext} disabled={currentPage === totalPages - 1} aria-label="Next">&#8594;</button>
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
