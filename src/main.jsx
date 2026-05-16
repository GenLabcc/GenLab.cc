import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import './index.css';

function Root() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
