import { useState } from "react";
import "./Tracksection.css";
import EnrollModal from "./Enroll";
import courseThumbnail from "../../assets/Course_logo.png";
import ConnectSection from "../ConnectSection/ConnectSection";

const trackOneCourses = [
  { id: 1, growth: "advance", title: "Data Science", description: "Build statistical and predictive modelling skills with hands-on Python projects and real datasets.", tags: ["Python", "Statistical Modelling", "Data Wrangling", "Predictive Analysis"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 2, growth: "medium", title: "Data Analytics", description: "Turn raw data into business insights with dashboards and modern visualisation tools.", tags: ["SQL", "Dashboards", "Visualization Tools"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 3, growth: "advance", title: "AI & Machine Learning", description: "Learn to build and deploy intelligent models with supervised and unsupervised learning techniques.", tags: ["Supervised & Unsupervised Learning", "Model Building", "Deployment"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 4, growth: "advance", title: "Agentic AI", description: "Design AI agents that automate workflows and integrate seamlessly with modern LLM tools.", tags: ["AI Agents", "Workflow Automation", "LLM Integration", "Tool Use"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 5, growth: "advance", title: "Conversational Engineer", description: "Design and build intelligent conversational systems that power natural, human-like AI interactions.", tags: ["Conversational AI", "Prompt Engineering", "LLM Integration", "Chatbot Frameworks"], duration: "4 - 6 Months", support: "Job Offer Support" },
  // { id: 6, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 7, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 8, growth: "medium", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 9, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
];

const trackTwoCourses = [
  { id: 10, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 11, growth: "medium", title: "Python Django Full Stack", description: "Master end-to-end web development with Python and Django, from APIs to deployment.", tags: ["Python", "Django", "REST APIs", "Databases", "Deployment"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 12, growth: "advance", title: "Java Full Stack", description: "Build enterprise-grade applications with Java and Spring Boot, backed by hands-on projects.", tags: ["Core Java", "Spring Boot", "REST APIs", "Hibernate", "MySQL", "Deployment"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 13, growth: "medium", title: "Flutter Mobile App Development", description: "Create cross-platform mobile apps for iOS and Android with a single Flutter codebase.", tags: ["Flutter", "Dart"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 14, growth: "medium", title: "Front End Development", description: "Craft responsive, modern web interfaces with strong front-end fundamentals and React.", tags: ["HTML", "CSS", "JavaScript", "React"], duration: "4 - 6 Months", support: "Job Offer Support" },
  // { id: 15, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
];

const trackThreeCourses = [
  { id: 16, growth: "advance", title: "DevOps Engineering", description: "Automate delivery pipelines and manage cloud infrastructure with industry-standard DevOps tools.", tags: ["CI/CD Pipelines", "Docker", "Kubernetes", "Cloud Infrastructure"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 17, growth: "medium", title: "Cloud Computing", description: "Get hands-on with cloud architecture, deployment, and cost management across major platforms.", tags: ["AWS", "Azure", "GCP", "Cloud Architecture", "Deployment", "Cost Management"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 18, growth: "advance", title: "Software Testing", description: "Build strong manual and automation testing skills using leading frameworks and tools.", tags: ["Selenium", "Test Frameworks", "Manual & Automation Testing"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 19, growth: "advance", title: "Cybersecurity", description: "Learn to identify and defend against threats with ethical hacking and security best practices.", tags: ["Ethical Hacking", "Network Security", "Threat Analysis", "Compliance"], duration: "4 - 6 Months", support: "Job Offer Support" },
  // { id: 20, growth: "medium", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 21, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
];

const trackFourCourses = [
  { id: 22, growth: "medium", title: "Robotics with AI & IoT", description: "Combine embedded systems with AI to build smart, sensor-driven robotics solutions.", tags: ["Embedded Systems", "Sensors", "AI Integration", "Hardware Programming"], duration: "4 - 6 Months", support: "Job Offer Support" },
  { id: 23, growth: "medium", title: "Arduino & Physical Computing", description: "Prototype real-world hardware projects using microcontrollers, sensors, and actuators.", tags: ["Microcontrollers", "Sensors", "Actuators", "Prototyping"], duration: "4 - 6 Months", support: "Job Offer Support" },
  // { id: 24, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 25, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 26, growth: "medium", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 27, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 28, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 29, growth: "medium", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 30, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
];

const trackFiveCourses = [
  { id: 31, growth: "medium", title: "UI Design", description: "Master visual design principles and build polished, reusable design systems in Figma.", tags: ["Figma", "Design Systems", "Prototyping", "Visual Design Principles"], duration: "3 - 4 Months", support: "Job Offer Support" },
  { id: 32, growth: "medium", title: "UX Research", description: "Uncover user needs through interviews, usability testing, and journey mapping.", tags: ["User Interviews", "Usability Testing", "Journey Mapping"], duration: "3 - 4 Months", support: "Job Offer Support" },
  { id: 33, growth: "advance", title: "UX/UI Design", description: "Take products from research to prototype with combined UX and UI design expertise.", tags: ["Research", "Prototyping", "UI & UX Design"], duration: "3 - 6 Months", support: "Job Offer Support" },
  { id: 34, growth: "medium", title: "Graphic Design & Video Editing", description: "Blend branding and layout design with motion graphics and professional video editing.", tags: ["Adobe Creative Suite", "Typography", "Motion Graphics", "Color Grading"], duration: "3 - 6 Months", support: "Job Offer Support" },
  { id: 35, growth: "advance", title: "Design Engineer", description: "Bridge design and code to build polished, functional interfaces ready for production.", tags: ["Figma", "HTML", "CSS", "JavaScript", "Design Systems"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 36, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
];

const trackSixCourses = [
  { id: 37, growth: "medium", title: "Business Analytics", description: "Drive smarter business decisions with data, dashboards, and reporting tools.", tags: ["Excel", "Power BI", "Reporting", "Data-Driven Decision Making"], duration: "4 Months", support: "Job Offer Support" },
  { id: 38, growth: "advance", title: "Digital Marketing", description: "Plan and execute full-funnel digital strategies across SEO, social, and email.", tags: ["SEO", "Email Marketing", "Social Media Strategy", "Analytics"], duration: "4 Months", support: "Job Offer Support" },
  { id: 39, growth: "medium", title: "Performance Marketing", description: "Run and optimise high-performing paid campaigns across major ad platforms.", tags: ["META Ads", "Google Ads", "Paid Campaigns", "ROAS Optimisation"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 40, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 41, growth: "medium", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 42, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 43, growth: "medium", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
  // { id: 44, growth: "advance", title: "Full Stack Web Development (MERN)", description: "Build full stack skills in MERN with expert guidance, hands-on projects, and career support.", tags: ["Git", "MongoDB", "Express", "React", "Node.js"], duration: "6 Months", support: "Job Offer Support" },
];

const trackSevenCourses = [
  { id: 43, growth: "medium", title: "Project Management", description: "Lead projects confidently with Agile and Scrum frameworks and modern planning tools.", tags: ["Agile", "Scrum", "Project Planning", "Risk Management", "Tools"], duration: "3 Months", support: "Job Offer Support" },
  { id: 44, growth: "medium", title: "HRMS & Payroll", description: "Manage workforce operations end-to-end with HR systems and payroll compliance tools.", tags: ["HR Systems", "Payroll Processing", "Compliance", "Workforce Tools"], duration: "3 Months", support: "Job Offer Support" },
  { id: 45, growth: "medium", title: "Financial Accounting", description: "Build core finance skills from bookkeeping to GST compliance and reporting.", tags: ["Tally", "GST", "Bookkeeping", "Balance Sheets", "Financial Reporting"], duration: "3 Months", support: "Job Offer Support" },
];

const tracksData = [
  { id: 1, name: "Data & AI", courses: trackOneCourses },
  { id: 2, name: "Development", courses: trackTwoCourses },
  { id: 3, name: "DevOps & Security", courses: trackThreeCourses },
  { id: 4, name: "Advanced Tech", courses: trackFourCourses },
  { id: 5, name: "Design And UI UX", courses: trackFiveCourses },
  { id: 6, name: "Business & Management", courses: trackSixCourses },
  { id: 7, name: "Management & Finance", courses: trackSevenCourses },
];

const GrowthBadge = ({ type }) => {
  const isAdvance = type === "advance";
  return (
    <span className={`growth-badge ${isAdvance ? "advance" : "medium"}`}>
      <svg viewBox="0 0 24 24" className="growth-icon" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7H21V13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {isAdvance ? "Advance Growth" : "Medium Growth"}
    </span>
  );
};

const CourseCard = ({ course }) => {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  return (
    <div className="track-card">
      <div className="course-image">
        <img src={courseThumbnail} alt={course.title} className="course-thumbnail" />
        <GrowthBadge type={course.growth} />
      </div>

      <div className="course-body">
        <h3 className="course-track-title">{course.title}</h3>
        <p className="course-track-description">{course.description}</p>

        <div className="tag-row">
          {course.tags.map((tag) => (
            <span className="tag-pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="tag-row">
          <span className="tag-pill dark">{course.duration}</span>
          <span className="tag-pill dark">{course.support}</span>
        </div>

        <div className="course-track-footer">
          <button className="syllabus-btn" type="button">
            <svg viewBox="0 0 24 24" className="download-icon" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V15M12 15L7 10M12 15L17 10M4 19H20" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Syllabus
          </button>

          <button className="enroll-btn" type="button" onClick={() => {
            setSelectedCourse(course.title);
            setEnrollOpen(true)}}>
            Enroll Now
          </button>
          <EnrollModal 
            isOpen={enrollOpen} 
            onClose={() => setEnrollOpen(false)} 
            courseName ={selectedCourse}/>
        </div>
      </div>
    </div>
  );
};

const TrackSection = () => {
  const [activeTrack, setActiveTrack] = useState(0);
  const activeTrackData = tracksData[activeTrack];

  return (
    <>
    <section className="courses-page">
      <header className="page-header">
        <h1 className="track-title">Leading Upskilling Platform <br/> Built For Students And Job Seekers</h1>
        <span className="choose-from-label">Choose From</span>
        <h1 className="page-title">Industry-Relevant Free Courses</h1>
        <p className="page-subtitle">
          9 Divisions &middot; 26 Courses &middot; Online and Offline &middot; 3 to 6 Month Programs
        </p>
      </header>

      <div className="courses-layout">
        
        <nav className="track-tabs-mobile">
          {tracksData.map((track, idx) => {
            const isActive = idx === activeTrack;
            return (
              <button
                key={track.id}
                type="button"
                className={`track-tab ${isActive ? "active" : ""}`}
                onClick={() => setActiveTrack(idx)}
              >
                {isActive && (
                  <svg className="track-tab-check" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7" fill="currentColor" />
                    <path
                      d="M5 8.2L7 10.2L11.2 5.8"
                      stroke="#0c0c0c"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {track.name}
              </button>
            );
          })}
        </nav>

        
        <nav className="track-nav-list">
          {tracksData.map((track, idx) => (
            <button
              key={track.id}
              type="button"
              className={`track-nav-item ${idx === activeTrack ? "active" : ""}`}
              onClick={() => setActiveTrack(idx)}
            >
              <span className="track-nav-label">
                <span className="track-number">{String(idx + 1).padStart(2, "0")}</span>
                <span className="track-name-text">{track.name}</span>
              </span>
              <svg className="chevron-right" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </nav>

        <div className="content-panel">
          <div className="content-header">
            <span className="content-track-name">{activeTrackData.name}</span>
            <span className="content-divider-line" />
            <span className="content-course-count">{activeTrackData.courses.length} Courses</span>
          </div>

          <div className="track-grid">
            {activeTrackData.courses.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
    <ConnectSection/>
    </>
  );
};

export default TrackSection;
