import { useState } from "react";
import styles from "./CustomCourses.module.css";

const CustomCourseModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "", phone: "",
    course: "", customCourse: "", duration: "",
    mode: "", status: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRadio = (group, value) =>{
    setFormData((prev) => ({ ...prev, [group]:value}));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_CUSTOM_COURSE_URL;
    const params = new URLSearchParams({
      name: formData.name,
      phone: formData.phone,
      course: formData.course === "Others" ? formData.customCourse : formData.course,
      duration: formData.duration,
      mode: formData.mode,
      status: formData.status,
    });

    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    onClose();
  };

  const CheckPill = ({ group, value, label }) => (
    <label className={`${styles.checkPill} ${formData[group].includes(value) ? styles.active : ""}`}>
      <input
        type="radio"
        name= {group}
        checked={formData[group].includes(value)}
        onChange={() => handleRadio(group, value)}
      />
      <span>{label}</span>
    </label>
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Custom course enquiry</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.group}>
              <label>Name</label>
              <input name="name" type="text" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={styles.group}>
              <label>Mobile number</label>
              <input name="phone" type="tel" placeholder="+91 00000 00000" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.row}>
            <div className={styles.group}>
              <label>Course</label>
              <select name="course" value={formData.course} onChange={handleChange} required>
                <option value="" disabled>Select course</option>
                <option value='Data Science'>Data Science</option>
                <option value='Data Analytics'>Data Analytics</option>
                <option value='AI & Machine Learning'>AI & Machine Learning</option>
                <option value='Agentic AI'>Agentic AI</option>
                <option value='Conversational Engineer'>Conversational Engineer</option>

                <option value='Full Stack Web Development (MERN)'>Full Stack Web Development (MERN)</option>
                <option value= 'Python Django Full Stack'>Python Django Full Stack</option>
                <option value='Java Full Stack'>Java Full Stack</option>
                <option value='Flutter Mobile App Development'>Flutter Mobile App Development</option>
                <option value='Front End Development'>Front End Development</option>

                <option value='DevOps Engineering'>DevOps Engineering</option>
                <option value='Cloud Computing'>Cloud Computing</option>
                <option value='Software Testing'>Software Testing</option>
                <option value= 'Cybersecurity'>Cybersecurity</option>

                <option value='Robotics with AI & IoT'>Robotics with AI & IoT</option>
                <option value='Arduino & Physical Computing'>Arduino & Physical Computing</option>

                <option value='UI Design'>UI Design</option>
                <option value='UX Research'>UX Research</option>
                <option value='UX/UI Design'>UX/UI Design</option>
                <option value='Graphic Design & Video Editing'>Graphic Design & Video Editing</option>
                <option value='Design Engineer'>Design Engineer</option>

                <option value='Business Analytics'>Business Analytics</option>
                <option value='Digital Marketing'>Digital Marketing</option>
                <option value='Performance Marketing'>Performance Marketing</option>

                <option value='Project Management'>Project Management</option>
                <option value ='HRMS & Payroll'>HRMS & Payroll</option>
                <option value ='Financial Accounting'>Financial Accounting</option>
                <option value='Others'>Others</option>
              </select>
            </div>
            <div className={styles.group}>
              <label>Duration</label>
              <select name="duration" value={formData.duration} onChange={handleChange} required>
                <option value="" disabled>Select duration</option>
                <option value="1 Month">2 Weeks</option>
                <option value="2 Months">1 Months</option>
                <option value="3 Months">2 Months</option>
                <option value="6 Months">3 Months</option>
              </select>
            </div>
          </div>

          {formData.course === "Others" && (
            <div className={styles.group}>
              <label>Custom Course Name</label>
              <input
                name="customCourse"
                type="text"
                placeholder="Enter custom course name"
                value={formData.customCourse}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className={styles.divider} />

          <div className={styles.checkGroup}>
            <label className={styles.groupLabel}>Mode of class</label>
            <div className={styles.checkRow}>
              <CheckPill group="mode" value="Online" label="Online" />
              <CheckPill group="mode" value="Offline" label="Offline" />
              <CheckPill group="mode" value="Hybrid" label="Hybrid" />
            </div>
          </div>

          <div className={styles.checkGroup}>
            <label className={styles.groupLabel}>Status</label>
            <div className={styles.checkRow}>
              <CheckPill group="status" value="Job seeker" label="Job seeker" />
              <CheckPill group="status" value="Fresher" label="Fresher" />
              <CheckPill group="status" value="Experienced" label="Experienced" />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>Submit enquiry</button>
        </form>
      </div>
    </div>
  );
};

export default CustomCourseModal;