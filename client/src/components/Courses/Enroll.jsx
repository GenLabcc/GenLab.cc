import { useEffect, useState } from "react";
import styles from "./Enroll.module.css";

const EnrollModal = ({ isOpen, onClose, courseName }) => {
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "",
    course: "", status: "", comments: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (courseName) {
        setFormData((prev) => ({ ...prev, course: courseName}));
    }
  }, [courseName]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = import.meta.env.VITE_ENROLL_FORM_URL;

    try {
        const params = new URLSearchParams({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            course: formData.course,
            status: formData.status,
            comments: formData.comments,
            formType: "enrollment",
        });
        await fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
        });

        setStatus("success");
        setTimeout(() => {
          setFormData({ name: "", phone: "", email: "", course: "", status: "", comments: "" });
          onClose();
          setStatus("");
       },  1500);

    }   catch (error) {
        console.error("Enrollment submission error:", error);
        setStatus("error")
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Enroll now</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.group}>
              <label>Name</label>
              <input name="name" type="text" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={styles.group}>
              <label>Phone number</label>
              <input name="phone" type="tel" placeholder="+91 00000 00000" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.group}>
            <label>Email address</label>
            <input name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
          </div>

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


              </select>
            </div>
            <div className={styles.group}>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="" disabled>Select status</option>
                <option value="student">Student</option>
                <option value="professional">Working professional</option>
              </select>
            </div>
          </div>

          <div className={styles.group}>
            <label>Comments <span>(optional)</span></label>
            <textarea name="comments" rows={3} placeholder="Anything else you'd like us to know" value={formData.comments} onChange={handleChange} />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
            {status === "loading" ? "Submitting..."
            : status === "success" ? "Submitted ✓" 
            : status === "error" ? "Failed ✕"
            : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default EnrollModal;