import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import "./Courses.css";
import logo from "../../assets/Course_logo.png";

const coursesData = [
  { id: 1, badge: "Advance Growth", badgeColor: "green",  title: "Full Stack Web Development (MERN)",  description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  { id: 2, badge: "Medium Growth",  badgeColor: "yellow", title: "Full Stack Web Development (MERN)",  description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  { id: 3, badge: "Advance Growth", badgeColor: "green",  title: "Full Stack Web Development (MERN)",  description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  { id: 4, badge: "Advance Growth", badgeColor: "green",  title: "UI/UX Design Fundamentals",           description: "Master design thinking, Figma, and prototyping with real-world projects and mentorship.",   tags: ["Figma", "Adobe XD", "Prototyping", "Research"],  duration: "3 Months", support: "Job Offer Support" },
  { id: 5, badge: "Medium Growth",  badgeColor: "yellow", title: "Data Science & Machine Learning",     description: "Dive into data analysis, ML algorithms, and Python for real-world data challenges.",       tags: ["Python", "Pandas", "Scikit-learn", "TensorFlow"], duration: "6 Months", support: "Job Offer Support" },
  { id: 6, badge: "Advance Growth", badgeColor: "green",  title: "DevOps & Cloud Engineering",          description: "Learn CI/CD, Docker, Kubernetes, and AWS for scalable cloud infrastructure.",              tags: ["Docker", "AWS", "Kubernetes", "CI/CD"],           duration: "4 Months", support: "Job Offer Support" },
];

const CARDS_PER_PAGE = 3;
const MOBILE_CARDS_PER_PAGE = 1;
const MOBILE_BREAKPOINT = 640;

const getCardsPerPage = () =>
  window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_CARDS_PER_PAGE : CARDS_PER_PAGE;

export default function Courses({ registerGoToPage, registerPageRef, registerTotalPages }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage);
  const totalPages = Math.ceil(coursesData.length / cardsPerPage);

  useEffect(() => {
    registerTotalPages?.(totalPages);
    registerGoToPage?.((page) => {
      setCurrentPage(Math.min(page, totalPages - 1));
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
    setCurrentPage((page) => Math.min(page, totalPages - 1));
  }, [totalPages]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentPage((page) => (page + 1) % totalPages);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [totalPages]);

  // Keep App's ref always current
  useEffect(() => {
    registerPageRef?.(currentPage);
  }, [currentPage, registerPageRef]);

  const visibleCourses = coursesData.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section className="courses-section">
      <div className="courses-header">
        <h2 className="courses-title">LEARN WHAT INDUSTRY DEMANDS</h2>
        <p className="courses-subtitle">
          9 Divisions · 26 Courses · Online and Offline · 3 to 6 Month Programs
        </p>
      </div>

      <div className="courses-grid">
        {visibleCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <div className="course-card-top">
              <div className={`course-badge badge-${course.badgeColor}`}>
                <span>↗</span> {course.badge}
              </div>
              <img src={logo} alt="GenLab Logo" className="course-logo-img" />
            </div>
            <div className="course-card-bottom">
              <div className="course-text">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
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
      </div>

      <div className="courses-nav">
        <button className="nav-arrow" onClick={handlePrev} disabled={currentPage === 0} aria-label="Previous">&#8592;</button>
        <div className="nav-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} className={`nav-dot ${i === currentPage ? "active" : ""}`} onClick={() => setCurrentPage(i)} aria-label={`Page ${i + 1}`} />
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