import { useState } from "react";
import "./JobsSection.css";

import SoftwareDeveloperPDF from "../../assets/job_des/Software_Developer.pdf";
import DigitalMarPDF from "../../assets/job_des/Digital_Marketing_Executive.pdf";
import DesignerPDF from "../../assets/job_des/Senior_Designer.pdf";
import { href } from "react-router";


import JobApplicationForm from "./JobAppForm.jsx";

const JOBS = [
  {
    id: 1,
    title: "Software Developer",
    type: "Full-time",
    location: "On-site",
    experience: "1-2 years",
    description:
      "Develop, test, and maintain scalable software and web applications, working closely with the team on new features, debugging, API integrations, and code reviews.",
    tags: ["Java", "Python", "React"],
    pdfUrl: SoftwareDeveloperPDF,
  },
  {
    id: 2,
    title: "Digital Marketing Executive",
    type: "Full-time",
    location: "On-site",
    experience: "1-2 years",
    description:
      "Design user flows, wireframes, and polished interfaces for web and mobile products, working closely with engineering to ship them.",
    tags: ["Canva", "Design Systems", "SEO"],
    pdfUrl: DigitalMarPDF
  },
  {
    id: 3,
    title: "Senior Designer",
    type: "Full-time",
    location: "On-Site",
    experience: "1-2 years",
    description:
      "Support content creation, social media scheduling, and campaign tracking while learning the fundamentals of digital marketing.",
    tags: ["Photoshop", "Figma",  "Illustrator", "Premiere Pro"],
    pdfUrl: DesignerPDF
  },
];

function JobCard({ job, onApply }) {
  return (
    <div className="job-card">
      <div className="job-card__header">
        <h3 className="job-card__title">{job.title}</h3>
        <span className="job-card__type">{job.type}</span>
      </div>

      <div className="job-card__meta">
        <span className="job-card__meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          {job.location}
        </span>
        <span className="job-card__meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {job.experience}
        </span>
      </div>

      <p className="job-card__desc">
        {job.description}{" "}
        {job.pdfUrl && (
          <a
            href={job.pdfUrl}
            target = "_blank"
            rel="noopener noreferrer"
            className="job-card__read-more"
          >
            Read More
          </a>
        )}
      </p>

      <div className="job-card__tags">
        {job.tags.map((tag) => (
          <span key={tag} className="job-card__tag">
            {tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        className="job-card__apply-btn"
        onClick={() => onApply && onApply(job)}
      >
        Apply Now
      </button>
    </div>
  );
}

export default function JobsSection({ onApplySubmit }) {
  const [activeJob, setActiveJob] = useState(null);

  return (
    <section className="jobs-section">
      <div className="jobs-section__header">
        <h2 className="jobs-section__title">Open Positions</h2>
        <p className="jobs-section__subtitle">
          Join our team — explore current openings below.
        </p>
      </div>

      <div className="jobs-section__grid">
        {JOBS.map((job) => (
          <JobCard key={job.id} job={job} onApply={() => setActiveJob(job)} />
        ))}
      </div>

      {activeJob && (
        <JobApplicationForm
          job = {activeJob}
          onClose={() => setActiveJob(null)}
          onSubmit={onApplySubmit}
        />
      )}
    </section>
  );
}