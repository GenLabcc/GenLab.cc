import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoMark from '../LogoMark.jsx';
import './Navbar.css';

const CustomSparkle = ({ className = '' }) => (
  <svg className={`custom-sparkle-icon ${className}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0254 20C9.70998 20 9.44337 19.7716 9.36699 19.4656C9.12352 18.4903 8.65744 17.4531 7.96875 16.3542C7.15278 15.0347 5.98958 13.8108 4.47917 12.6823C3.16549 11.6894 1.85181 11.0123 0.538138 10.6511C0.227005 10.5656 0 10.2897 0 9.96702C0 9.65066 0.218273 9.37795 0.522473 9.29109C1.81045 8.92335 3.05122 8.32632 4.24479 7.5C5.61632 6.54514 6.76215 5.3993 7.68229 4.0625C8.49629 2.87165 9.05507 1.69388 9.35863 0.529207C9.43815 0.224095 9.70676 0 10.0221 0C10.3409 0 10.6114 0.229058 10.689 0.53833C10.8642 1.23654 11.138 1.9512 11.5104 2.68229C11.9792 3.58507 12.5781 4.45312 13.3073 5.28646C14.0538 6.10243 14.8872 6.84028 15.8073 7.5C17.0097 8.35231 18.232 8.95111 19.4744 9.2964C19.7792 9.38109 20 9.65244 20 9.96874C20 10.2898 19.7725 10.5634 19.4629 10.6483C18.6754 10.8642 17.8648 11.2124 17.0312 11.6927C16.0243 12.283 15.0868 12.9861 14.2188 13.8021C13.3507 14.6007 12.6389 15.4427 12.0833 16.3281C11.3933 17.4293 10.9267 18.4745 10.6837 19.4639C10.6083 19.7708 10.3413 20 10.0254 20Z" fill="currentColor" />
  </svg>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="nav-container">
      {/* Logo + Pill grouped together on the left */}
      <div className="nav-left-group">
        <Link to="/" className="logo-circle" aria-label="GenLab home">
          <LogoMark color="white" size={28} />
        </Link>

        {/* Main Nav Pill */}
        <div className="nav-pill">
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/people" className="nav-link">People</Link>
            <Link to="/#launchpad" className="nav-link">Launchpad</Link>
            <Link to="/products" className="nav-link">Product</Link>
            <Link to="/verify-certificate" className="nav-link">Certificate</Link>
          </div>

          <button className="cta-btn">
            Shabdam AI
            <CustomSparkle />
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} color="#E0E0E0" /> : <Menu size={20} color="#E0E0E0" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/people" className="nav-link" onClick={() => setIsMenuOpen(false)}>People</Link>
          <Link to="/#launchpad" className="nav-link" onClick={() => setIsMenuOpen(false)}>Launchpad</Link>
          <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>Product</Link>
          <Link to="/verify-certificate" className="nav-link" onClick={() => setIsMenuOpen(false)}>Certificate</Link>

          <button className="cta-btn mobile-cta-overlay" style={{ display: 'flex' }}>
            Shabdam AI
            <CustomSparkle />
          </button>
        </div>
      )}
    </nav>
  );
}
