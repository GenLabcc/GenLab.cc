import React from "react";
import { useNavigate } from "react-router-dom";
import "./Upskilling.css";
import ConnectSection from "../../components/ConnectSection/ConnectSection";
import Journey from "../LaunchPad/Journey.jsx";
import Courses from "../../components/Courses/Courses.jsx";

const testimonials = [
  {
    id: 1,
    name: "Harikrishnan N.",
    date: "June 12, 2026",
    rating: 5,
    text: "Awesome experience! The course structure is very clear and the mentors are extremely helpful. I learned MERN stack in 6 months and landed my first job!"
  },
  {
    id: 2,
    name: "Johnathan S.",
    date: "May 28, 2026",
    rating: 5,
    text: "The projects are very practical. Building real-world web apps helped me understand core concepts much better than just watching tutorials. Highly recommended!"
  },
  {
    id: 3,
    name: "Sneha M.",
    date: "April 15, 2026",
    rating: 5,
    text: "Excellent mentor support. Whenever I got stuck, the mentors resolved my doubts quickly. The placement preparation was also very useful."
  },
  {
    id: 4,
    name: "Rahul K.",
    date: "March 10, 2026",
    rating: 5,
    text: "The curriculum is updated according to what the industry wants. I liked the focus on data structures and backend optimization."
  }
];

export default function Upskilling() {
  const navigate = useNavigate();

  return (
    <div className="upskilling-page">
      
      {/* 1. HERO SECTION */}
      <section className="upskilling-hero">
        <div className="hero-text-content">
          <h1 className="hero-main-title">
            Leading Upskilling Platform Built For Students And Job Seekers
          </h1>
        </div>

        {/* Existing Courses Component */}
        <div style={{ width: "100%" }}>
          <Courses />
        </div>
        {/* Explore Button */}
        <div className="explore-programs-wrapper">
          <button className="btn-explore-programs" onClick={() => navigate("/tracks")}>
            Explore All Programs
          </button>
        </div>
      </section>

      {/* 2. JOURNEY OF OUR LEARNERS SECTION */}
      <Journey scrollDistanceScale={1} />

      {/* 3. WHY GENLAB? SECTION */}
      <section className="why-genlab-section">
        <div className="section-header-centered">
          <h2 className="why-title">Why GenLab?</h2>
          <p className="why-subtitle">Choose the track that fits you best</p>
        </div>

        <div className="why-cards-grid">
          
          {/* Card 1: Track Real Progress */}
          <div className="why-card card-progress">
            <div className="why-card-text">
              <h3 className="why-card-title">Track Real Progress</h3>
              <p className="why-card-desc">Daily milestones and task lists to keep you focused.</p>
            </div>
            
            {/* Visual: Bar Chart */}
            <div className="why-card-visual progress-bars">
              {[30, 45, 60, 50, 75, 95, 65, 80].map((height, i) => (
                <div 
                  key={i} 
                  className={`bar-col ${i === 5 ? "active-bar" : ""}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          {/* Card 2: Built by practitioners */}
          <div className="why-card card-practitioners">
            <div className="why-card-text">
              <h3 className="why-card-title">Built by practitioners</h3>
              <p className="why-card-desc">Crafted by industry veterans who've been in your shoes.</p>
            </div>
            
            {/* Visual: Vertical modules checklist */}
            <div className="why-card-visual checklist-modules">
              <div className="module-item checked">
                <span className="check-dot">✓</span>
                <span className="module-text">Module 1</span>
                <span className="module-date">May 10, 2024</span>
              </div>
              <div className="module-item pending">
                <span className="check-dot"></span>
                <span className="module-text">Module 2</span>
              </div>
              <div className="module-item pending">
                <span className="check-dot"></span>
                <span className="module-text">Module 3</span>
              </div>
            </div>
          </div>

          {/* Card 3: Mentors who answer */}
          <div className="why-card card-mentors">
            <div className="why-card-text">
              <h3 className="why-card-title">Mentors who answer</h3>
              <p className="why-card-desc">Fast feedback to unblock you whenever you're stuck.</p>
            </div>
            
            {/* Visual: Chat interaction bubble */}
            <div className="why-card-visual chat-box">
              <div className="chat-bubble bubble-user">
                <p className="chat-text">What is API?</p>
                <span className="chat-time">5m ago</span>
              </div>
              <div className="chat-bubble bubble-mentor">
                <p className="chat-text">Sure! API is a way for programs to talk to each other...</p>
                <span className="chat-time">Just now</span>
              </div>
            </div>
          </div>

          {/* Card 4: Paths track the job market */}
          <div className="why-card card-market">
            <div className="why-card-text">
              <h3 className="why-card-title">Paths track the job market</h3>
              <p className="why-card-desc">Curated curriculum aligned with current market needs and placement guidance.</p>
            </div>
            
            {/* Visual: Grid of green box icons */}
            <div className="why-card-visual icon-boxes-row">
              <div className="icon-box-neon">
                <svg viewBox="0 0 24 24" className="neon-svg" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7h-4V5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM10 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h-4V5zm10 14H4V9h16v10z" fill="currentColor" />
                </svg>
              </div>
              <div className="icon-box-neon">
                <svg viewBox="0 0 24 24" className="neon-svg" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 10h2v7H7v-7zm4-3h2v10h-2V7zm4-4h2v14h-2V3zm-4 7v2H9v-2h2z" fill="currentColor" />
                </svg>
              </div>
              <div className="icon-box-neon">
                <svg viewBox="0 0 24 24" className="neon-svg" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 5: A direct line into hiring partners */}
          <div className="why-card card-partners">
            <div className="why-card-text">
              <h3 className="why-card-title">A direct line into hiring partners</h3>
              <p className="why-card-desc">Get your resume in front of top teams looking for your skills.</p>
            </div>
            
            {/* Visual: Glowing sine wave path */}
            <div className="why-card-visual sine-wave-container">
              <svg viewBox="0 0 300 100" className="sine-wave-svg" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M10 50 C50 20, 100 80, 150 50 C200 20, 250 80, 290 50" 
                  fill="none" 
                  stroke="#555" 
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path 
                  d="M10 50 C50 20, 100 80, 150 50 C200 20, 250 80, 290 50" 
                  fill="none" 
                  stroke="#bcf000" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="wave-highlight-path"
                />
                <circle cx="150" cy="50" r="7" fill="#bcf000" className="wave-pulse-dot" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="testimonials-section">
        <div className="section-header-centered">
          <h2 className="testimonials-title">What Our Learners Are Saying!</h2>
          <p className="testimonials-subtitle">Read their experiences</p>
        </div>

        <div className="testimonials-grid">
          
          {/* Left Google Rating Card */}
          <div className="google-rating-card">
            <div className="google-logo-wrapper">
              <svg viewBox="0 0 24 24" className="google-icon-svg" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </div>
            <h3 className="rating-heading">Google Rating</h3>
            <div className="rating-digits-row">
              <span className="big-rating">4.9</span>
              <div className="rating-stars-gold">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star-icon">★</span>
                ))}
              </div>
            </div>
            <p className="rating-reviews-count">Based on 140+ reviews</p>
          </div>

          {/* Right Testimonials List */}
          <div className="testimonials-list-container">
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-header">
                  <div>
                    <h4 className="learner-name">{t.name}</h4>
                    <span className="review-date">{t.date}</span>
                  </div>
                  <div className="google-badge-small">
                    <svg viewBox="0 0 24 24" className="google-icon-small-svg" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>
                <div className="testimonial-rating-row">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="star-gold">★</span>
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. LET'S CONNECT SECTION */}
      <div id="connect">
        <ConnectSection />
      </div>

    </div>
  );
}
