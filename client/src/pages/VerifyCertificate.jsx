import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundGlow from '@/components/BackgroundGlow';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import logoWithSparkle from "@/assets/logo.png";
import './VerifyCertificate.css';

const VerifiedTick = () => {
  const sparkleCount = 8;
  return (
    <div className="verified-tick-container">
      <div className="glow-pulse" />
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          fill="rgba(50, 205, 50, 0.1)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          stroke="#32CD32"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M32 52L44 64L68 40"
          stroke="#32CD32"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, scale: 0.5, opacity: 0 }}
          animate={{ pathLength: 1, scale: 1, opacity: 1 }}
          transition={{ 
            pathLength: { duration: 0.3, delay: 0.6 },
            scale: { type: "spring", stiffness: 400, damping: 10, delay: 0.6 },
            opacity: { duration: 0.1, delay: 0.6 }
          }}
        />
      </svg>
      
      {/* Modern Sparkle Pop */}
      {Array.from({ length: sparkleCount }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
          animate={{ 
            scale: [0, 1, 0], 
            opacity: [0, 1, 0],
            x: Math.cos((i * (360 / sparkleCount)) * Math.PI / 180) * 80,
            y: Math.sin((i * (360 / sparkleCount)) * Math.PI / 180) * 80
          }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            backgroundColor: '#32CD32',
            borderRadius: '50%',
            boxShadow: '0 0 10px #32CD32'
          }}
        />
      ))}
    </div>
  );
};

const ErrorMark = () => {
  const sparkleCount = 8;
  return (
    <div className="verified-tick-container error-mark-container">
      <div className="glow-pulse error-glow" />
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          fill="rgba(228, 75, 75, 0.1)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          stroke="#e44b4b"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M35 35L65 65M65 35L35 65"
          stroke="#e44b4b"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, scale: 0.5, opacity: 0 }}
          animate={{ pathLength: 1, scale: 1, opacity: 1 }}
          transition={{ 
            pathLength: { duration: 0.3, delay: 0.6 },
            scale: { type: "spring", stiffness: 400, damping: 10, delay: 0.6 },
            opacity: { duration: 0.1, delay: 0.6 }
          }}
        />
      </svg>
      
      {/* Red Sparkle Pop */}
      {Array.from({ length: sparkleCount }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
          animate={{ 
            scale: [0, 1, 0], 
            opacity: [0, 1, 0],
            x: Math.cos((i * (360 / sparkleCount)) * Math.PI / 180) * 80,
            y: Math.sin((i * (360 / sparkleCount)) * Math.PI / 180) * 80
          }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            backgroundColor: '#e44b4b',
            borderRadius: '50%',
            boxShadow: '0 0 10px #e44b4b'
          }}
        />
      ))}
    </div>
  );
};

const VerifyingState = ({ isSuccess }) => {
  const [isScanning, setIsScanning] = React.useState(true);

  React.useEffect(() => {
    // Show scanner for at least 1.5s
    const timer = setTimeout(() => {
        // Only stop scanning if we have a result
        if (isSuccess !== null) {
            setIsScanning(false);
        }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  // If scanning finished and we still don't have isSuccess (slow network),
  // we effectively wait for isSuccess to become non-null.
  // Actually, we'll just check it in the render.
  const showResult = !isScanning && isSuccess !== null;

  return (
    <motion.div
      key="verifying"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="verifying-card"
    >
      <div className="logo-verified">
        <img src={logoWithSparkle} alt="GenLab" className="logo-img" />
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="scanning-container-wrapper"
          >
            <div className="scanning-container">
              <div className="pulse-ring" />
              <div className="scanning-line" />
            </div>
            <h2 className="verifying-text">Checking Database</h2>
            <p className="verifying-subtext">Searching for certificate record...</p>
          </motion.div>
        ) : (
          <motion.div
            key="result-view"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="tick-success-wrapper"
          >
            {isSuccess ? (
              <>
                <VerifiedTick />
                <h2 className="verifying-text" style={{ color: '#32CD32' }}>Match Found!</h2>
                <p className="verifying-subtext">Certificate authenticity confirmed.</p>
              </>
            ) : (
              <>
                <ErrorMark />
                <h2 className="verifying-text" style={{ color: '#e44b4b' }}>Verification Failed</h2>
                <p className="verifying-subtext">No record found with these details.</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const VerifyCertificate = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState('request');
  const [certificateId, setCertificateId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [verifiedData, setVerifiedData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const isRequestValid = certificateId.trim().length > 0 && email.trim().length > 0;

  const handleVerify = useCallback(async (e) => {
    e.preventDefault();
    if (!isRequestValid) return;

    setErrorMessage('');
    setIsSuccess(null);
    
    // START ANIMATION IMMEDIATELY
    setStep('verifying');
    setLoading(true);

    try {
      const scriptUrl = import.meta.env.VITE_CERTIFICATE_VERIFY_URL;
      
      if (!scriptUrl) {
        console.error('Verification Error: VITE_CERTIFICATE_VERIFY_URL is not defined in environment variables.');
        throw new Error('Script URL missing');
      }

      const params = new URLSearchParams({
        action: 'verifyCertificate',
        certId: certificateId.trim(),
        email: email.trim().toLowerCase()
      });

      console.log('Fetching verification from:', scriptUrl);
      const response = await fetch(`${scriptUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 'success') {
        // Simple date formatting: "Jun 02, 2025" or similar, excluding day and time
        const formatDate = (dateInput) => {
          if (!dateInput || dateInput === 'Ongoing') return dateInput || '';
          const date = new Date(dateInput);
          if (isNaN(date.getTime())) return dateInput; 
          
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          });
        };

        setVerifiedData({
          name: result.data.name,
          program: result.data.program,
          startDate: formatDate(result.data.startDate),
          endDate: formatDate(result.data.endDate) || 'Ongoing',
          certId: result.data.certId
        });

        setIsSuccess(true);
        setTimeout(() => {
          setStep('verified');
        }, 3200); 
      } else {
        setIsSuccess(false);
        setErrorMessage(result.message || 'Certificate not found. Please check your details.');
        setTimeout(() => {
          setStep('request');
        }, 3200); 
      }

    } catch (error) {
      console.error('Detailed Verification Error:', {
        message: error.message,
        stack: error.stack,
        env_url: import.meta.env.VITE_CERTIFICATE_VERIFY_URL
      });
      setIsSuccess(false);
      setErrorMessage('An error occurred during verification. Please try again later.');
      setTimeout(() => {
        setStep('request');
      }, 3200);
    } finally {
      setLoading(false);
    }
  }, [certificateId, email, isRequestValid]);

  const handleCertIdChange = useCallback((e) => {
    setCertificateId(e.target.value);
    setErrorMessage('');
  }, []);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  }, []);

  const handleDone = useCallback(() => navigate('/'), [navigate]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -30,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="verify-container">
      <BackgroundGlow />

      {/* Content Wrapper */}
      <div className="content-wrapper">

        <AnimatePresence mode="wait">

          {step === 'request' && (
            <motion.div
              key="request"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="request-card"
            >

              <div className="logo-container">
                <Link to="/">
                  <img src={logoWithSparkle} alt="GenLab" className="logo-img" />
                </Link>
              </div>

              <div className="title-container">
                <h2 className="title">
                  Verify Your Certificate
                </h2>
              </div>

              <form onSubmit={handleVerify} className="form-container">

                <InputField
                  label="Certificate ID"
                  id="cert-id"
                  placeholder="GL/INT/123"
                  value={certificateId}
                  onChange={handleCertIdChange}
                />

                <InputField
                  label="Registered Email"
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />

                {errorMessage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="error-message"
                  >
                    {errorMessage}
                  </motion.p>
                )}

                <div className="btn-wrapper">
                  <Button
                    type="submit"
                    disabled={!isRequestValid || loading}
                    variant="primary"
                    className="verify-btn"
                  >
                    {loading ? 'Verifying...' : 'Verify Certificate'}
                  </Button>
                </div>

              </form>
            </motion.div>
          )}

          {step === 'verifying' && (
            <VerifyingState isSuccess={isSuccess} />
          )}

          {step === 'verified' && (
            <motion.div
              key="verified"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="verified-card"
            >

              <div className="logo-verified">
                <img src={logoWithSparkle} alt="GenLab" className="logo-img" />
              </div>

              <div className="verified-title-container">
                <h2 className="verified-title">
                  Certificate Verified
                </h2>
              </div>

              <div className="verified-form">

                <InputField label="Name" value={verifiedData?.name || ''} readOnly />
                <InputField label="Program" value={verifiedData?.program || ''} readOnly />

                <div className="grid-dates">
                  <InputField label="Start Date" value={verifiedData?.startDate || ''} readOnly />
                  <InputField label="End Date" value={verifiedData?.endDate || ''} readOnly />
                </div>

                <InputField label="Certificate ID" value={verifiedData?.certId || ''} readOnly />

                <div className="verified-btn-wrapper">
                  <Button variant="primary" onClick={handleDone} className="done-btn">
                    Done
                  </Button>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* Footer - Only show on request step */}
      {step === 'request' && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="footer"
        >
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.footer>
      )}

    </div>
  );
};

export default VerifyCertificate;
