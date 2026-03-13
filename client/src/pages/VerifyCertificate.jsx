import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundGlow from '@/components/BackgroundGlow';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import logoWithSparkle from "@/assets/logo.png";
import './VerifyCertificate.css';

const VerifyCertificate = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState('request');
  const [certificateId, setCertificateId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [verifiedData, setVerifiedData] = useState(null);

  const isRequestValid = certificateId.trim().length > 0 && email.trim().length > 0;

  const handleVerify = useCallback(async (e) => {
    e.preventDefault();
    if (!isRequestValid) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      const params = new URLSearchParams({
        action: 'verifyCertificate',
        certId: certificateId.trim(),
        email: email.trim().toLowerCase()
      });

      const response = await fetch(`${scriptUrl}?${params.toString()}`);
      const result = await response.json();

      if (result.status === 'success') {
        setVerifiedData({
          name: result.data.name,
          program: result.data.program,
          startDate: result.data.startDate,
          endDate: result.data.endDate,
          certId: result.data.certId
        });

        setStep('verified');
      } else {
        setErrorMessage(result.message || 'Certificate not found. Please check your details.');
      }

    } catch (error) {
      console.error('Verification error:', error);
      setErrorMessage('An error occurred during verification. Please try again later.');
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



    </div>
  );
};

export default VerifyCertificate;
