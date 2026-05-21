import React, { useEffect } from 'react';
import './SplashScreen.css';
import logo from '../assets/Genlab.png';
import bgImage from '../assets/bg.png';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    // Splash lifecycle: shrink 0-1.8s, logo 1.6-3.4s, expand 3.2-4.5s
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="elegant-splash-container">
      <div className="elegant-square elegant-outer">
        <div className="elegant-square elegant-inner">
          <div 
            className="elegant-square elegant-bg" 
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <img src={logo} alt="Gen Lab Logo" className="elegant-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
