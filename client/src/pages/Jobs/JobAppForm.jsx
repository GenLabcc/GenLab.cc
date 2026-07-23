import { useState } from "react";
import "./JobAppForm.css";

const EMPTY_FORM = {
  fullName: "",
  dob: "",
  gender: "",
  address: "",
  location: "",
  phone: "",
  email: "",
  expectedSalary: "",
  currentCTC: "",
  previousCompany: "",
  previousRole: "",
  resume: null,
};

export default function JobApplicationForm({ job, onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: "" }));
  };

  const setFile = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, resume: file || null }));
    setErrors((err) => ({ ...err, resume: "" }));
  };

  const validateStep1 = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Required";
    if (!form.dob) next.dob = "Required";
    if (!form.gender) next.gender = "Required";
    if (!form.address.trim()) next.address = "Required";
    if (!form.location.trim()) next.location = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Invalid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = () => {
    const next = {};
    if (!form.expectedSalary.trim()) next.expectedSalary = "Required";
    if (!form.resume) next.resume = "Resume is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit({ ...form, jobTitle: job?.title || "" });
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Application submit failed:", err);
      alert("Something went wrong submitting your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="jaf-overlay" onClick={onClose}>
        <div className="jaf-modal" onClick={(e) => e.stopPropagation()}>
          <button className="jaf-close" onClick={onClose}>×</button>
          <div className="jaf-success">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4c7a10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3>Application Submitted</h3>
            <p>Thanks for applying{job?.title ? ` for ${job.title}` : ""} — we'll be in touch soon.</p>
            <button className="jaf-btn jaf-btn--primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jaf-overlay" onClick={onClose}>
      <div className="jaf-modal" onClick={(e) => e.stopPropagation()}>
        <button className="jaf-close" onClick={onClose} aria-label="Close">×</button>

        <div className="jaf-header">
          <h2>Job Application Form</h2>
          {job?.title && <p className="jaf-subtitle">Applying for: {job.title}</p>}
        </div>

        <div className="jaf-progress">
          <div className={`jaf-progress-step ${step >= 1 ? "active" : ""}`}>
            <span>1</span> Personal Details
          </div>
          <div className="jaf-progress-line" />
          <div className={`jaf-progress-step ${step >= 2 ? "active" : ""}`}>
            <span>2</span> Professional Details
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="jaf-page">
              <div className="jaf-field">
                <label>Full Name</label>
                <input value={form.fullName} onChange={set("fullName")} placeholder="Your full name" />
                {errors.fullName && <span className="jaf-error">{errors.fullName}</span>}
              </div>

              <div className="jaf-row">
                <div className="jaf-field">
                  <label>Date of Birth</label>
                  <input type="date" value={form.dob} onChange={set("dob")} />
                  {errors.dob && <span className="jaf-error">{errors.dob}</span>}
                </div>
                <div className="jaf-field">
                  <label>Gender</label>
                  <select value={form.gender} onChange={set("gender")}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <span className="jaf-error">{errors.gender}</span>}
                </div>
              </div>

              <div className="jaf-field">
                <label>Address</label>
                <input value={form.address} onChange={set("address")} placeholder="Street address" />
                {errors.address && <span className="jaf-error">{errors.address}</span>}
              </div>

              <div className="jaf-row">
                <div className="jaf-field">
                  <label>Location</label>
                  <input value={form.location} onChange={set("location")} placeholder="City, State" />
                  {errors.location && <span className="jaf-error">{errors.location}</span>}
                </div>
                <div className="jaf-field">
                  <label>Phone Number</label>
                  <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 00000 00000" />
                  {errors.phone && <span className="jaf-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="jaf-field">
                <label>Email Address</label>
                <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
                {errors.email && <span className="jaf-error">{errors.email}</span>}
              </div>

              <div className="jaf-footer">
                <button type="button" className="jaf-btn jaf-btn--primary" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="jaf-page">
              <div className="jaf-row">
                <div className="jaf-field">
                  <label>Expected Salary</label>
                  <input value={form.expectedSalary} onChange={set("expectedSalary")} placeholder="e.g. 6 LPA" />
                  {errors.expectedSalary && <span className="jaf-error">{errors.expectedSalary}</span>}
                </div>
                <div className="jaf-field">
                  <label>Current CTC</label>
                  <input value={form.currentCTC} onChange={set("currentCTC")} placeholder="e.g. 4 LPA" />
                </div>
              </div>

              <div className="jaf-row">
                <div className="jaf-field">
                  <label>Previous Company Name</label>
                  <input value={form.previousCompany} onChange={set("previousCompany")} placeholder="Optional" />
                </div>
                <div className="jaf-field">
                  <label>Previous Role</label>
                  <input value={form.previousRole} onChange={set("previousRole")} placeholder="Optional" />
                </div>
              </div>

              <div className="jaf-field">
                <label>Resume</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={setFile} />
                {form.resume && <span className="jaf-file-name">Attached: {form.resume.name}</span>}
                {errors.resume && <span className="jaf-error">{errors.resume}</span>}
              </div>

              <div className="jaf-footer jaf-footer--split">
                <button type="button" className="jaf-btn jaf-btn--secondary" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="jaf-btn jaf-btn--primary" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}