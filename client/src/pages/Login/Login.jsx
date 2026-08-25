import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { ArrowRight } from "lucide-react";

const ROLE_TABS = ["Student", "Mentor", "Admin"];
const OTP_LENGTH = 4;
const RESEND_COOLDOWN = 30;

export default function Login() {
  const [view, setView] = useState("signin"); // "signin" | "certificate"

  // ----- Sign in flow state -----
  const [activeRole, setActiveRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (step !== "otp" || resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setStep("otp");
    setResendTimer(RESEND_COOLDOWN);
    // Hook up your OTP request here
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    otpRefs.current[0]?.focus();
    setResendTimer(RESEND_COOLDOWN);
    // Hook up your resend request here
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) return;
    // Hook up your OTP verification here
  };

  // ----- Certificate verification flow state -----
  const [certificateId, setCertificateId] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const handleVerifyCertificate = (e) => {
    e.preventDefault();
    if (!certificateId || !studentEmail) return;
    // Hook up your certificate verification request here
  };

  return (
    <div className="login-page">
      <main className="login-main">
        <div className="verify-bar">
          <button
            type="button"
            className={`verify-bar__option ${
              view === "certificate" ? "verify-bar__option--active" : ""
            }`}
            onClick={() => setView("certificate")}
          >
            Verify a certificate
          </button>
          <button
            type="button"
            className={`verify-bar__option ${
              view === "signin" ? "verify-bar__option--active" : ""
            }`}
            onClick={() => setView("signin")}
          >
            Sign in
          </button>
        </div>

        {view === "signin" && step === "email" && (
          <>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your GenLab account</p>

            <div className="role-tabs">
              {ROLE_TABS.map((role) => (
                <button
                  key={role}
                  className={`role-tab ${activeRole === role ? "role-tab--active" : ""}`}
                  onClick={() => setActiveRole(role)}
                >
                  {role}
                </button>
              ))}
            </div>

            <form className="login-form" onSubmit={handleSendOtp}>
              <div className="input-field">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  required
                />
                <label htmlFor="email">Email Address</label>
              </div>

              <button type="submit" className="otp-button">
                <span>Send OTP</span>
                <span className="otp-button__icon">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </button>
            </form>
          </>
        )}

        {view === "signin" && step === "otp" && (
          <form className="otp-form" onSubmit={handleConfirm}>
            <p className="otp-form__hint">
              4-digit code sent to <span>{email}</span>
            </p>

            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="otp-inputs__digit"
                />
              ))}
            </div>

            <div className="otp-form__resend">
              <p>
                Didn't receive code?
                {resendTimer > 0 && (
                  <span className="otp-form__timer"> 00:{String(resendTimer).padStart(2, "0")}</span>
                )}
              </p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
                className={resendTimer > 0 ? "otp-form__resend-btn--disabled" : ""}
              >
                Resend OTP
              </button>
            </div>

            <div className="otp-form__actions">
              <button
                type="button"
                className="otp-form__back"
                onClick={() => setStep("email")}
              >
                Back
              </button>

              <button type="submit" className="confirm-button">
                <span>Confirm</span>
                <span className="confirm-button__icon">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </form>
        )}

        {view === "certificate" && (
          <>
            <h1 className="login-title">Verify A Certificate</h1>
            <p className="login-subtitle">
              Enter the certificate ID to confirm authenticity
            </p>

            <form className="login-form" onSubmit={handleVerifyCertificate}>
              <div className="input-field">
                <input
                  id="certificateId"
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder=" "
                  required
                />
                <label htmlFor="certificateId">Certificate ID</label>
              </div>

              <div className="input-field">
                <input
                  id="studentEmail"
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder=" "
                  required
                />
                <label htmlFor="studentEmail">Student Email Id</label>
              </div>

              <button type="submit" className="otp-button">
                <span>Verify Now</span>
                <span className="otp-button__icon">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}