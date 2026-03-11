import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import BackgroundGlow from '@/components/BackgroundGlow';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import logoWithSparkle from "@/assets/logo.png";
import logoIcon from "@/assets/logo-white.svg";

const VerifyCertificate = () => {
    // Steps: 'request' | 'otp' | 'verified'
    const [step, setStep] = useState('request');
    const [certificateId, setCertificateId] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    // Mock data for verified state
    const [verifiedData, setVerifiedData] = useState({
        name: 'John',
        program: 'name@email.com',
        startDate: '10/01/2025',
        endDate: '12/02/2025',
        certId: 'GL/INT/123'
    });

    const isRequestValid = certificateId.trim().length > 0 && email.trim().length > 0;
    const isOtpComplete = otp.every(v => v.length === 1);

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (isRequestValid) {
            setStep('otp');
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (isOtpComplete) {
            setStep('verified');
        }
    };

    const handleOtpChange = (value, index) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-5 sm:p-8 md:p-12 font-['Clash Display',sans-serif] overflow-x-hidden">
            <BackgroundGlow />

            <AnimatePresence mode="wait">
                {step === 'request' && (
                    <motion.div
                        key="request"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-[480px] z-10 text-center"
                    >
                        <div className="flex justify-center mb-8 sm:mb-12">
                            <Link to="/">
                                <img src={logoWithSparkle} alt="GenLab" className="h-[40px] sm:h-[50px] w-auto" />
                            </Link>
                        </div>

                        <div className="mb-10 sm:mb-16 px-4">
                            <h2 className="text-[24px] sm:text-[36px] leading-tight sm:leading-[46px] font-medium font-clash text-white">
                                Verify Your Certificate
                            </h2>
                        </div>

                        <form onSubmit={handleSendOtp} className="flex flex-col gap-6 sm:gap-8 px-4 sm:px-10">
                            <InputField
                                label="Certificate ID"
                                id="cert-id"
                                placeholder="GL/INT/123"
                                value={certificateId}
                                onChange={(e) => setCertificateId(e.target.value)}
                            />

                            <InputField
                                label="Registered Email"
                                id="reg-email"
                                type="email"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="pt-10 sm:pt-16">
                                <Button
                                    type="submit"
                                    disabled={!isRequestValid}
                                    variant="secondary"
                                >
                                    Send OTP
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {step === 'otp' && (
                    <motion.div
                        key="otp"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-[480px] z-10 text-center"
                    >
                        <div className="flex justify-center mb-8 sm:mb-12">
                            <img src={logoWithSparkle} alt="GenLab" className="h-[40px] sm:h-[50px] w-auto" />
                        </div>

                        <div className="mb-6">
                            <h2 className="text-[28px] sm:text-[36px] leading-tight font-medium text-white">
                                Enter OTP
                            </h2>
                        </div>
                        <p className="text-[14px] sm:text-[15px] text-gray-400 mb-12 sm:mb-16">
                            6-digit code sent to {email || 'name@email.com'}
                        </p>

                        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-10 sm:gap-16 px-6 sm:px-10">
                            <div className="flex justify-between gap-2 sm:gap-3">
                                {otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        id={`otp-${idx}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                                        onKeyDown={(e) => handleKeyDown(e, idx)}
                                        className="w-full aspect-square max-w-[50px] sm:max-w-[64px] rounded-xl sm:rounded-2xl bg-white/[0.08] border border-white/10 text-white text-center text-xl sm:text-2xl font-medium outline-none focus:border-white/40 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                                    />
                                ))}
                            </div>

                            <Button
                                type="submit"
                                disabled={!isOtpComplete}
                                variant="primary"
                            >
                                Verify
                            </Button>
                        </form>
                    </motion.div>
                )}

                {step === 'verified' && (
                    <motion.div
                        key="verified"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-[520px] z-10 text-center"
                    >
                        <div className="flex justify-center mb-8 sm:mb-10">
                            <img src={logoWithSparkle} alt="GenLab" className="h-[35px] sm:h-[45px] w-auto" />
                        </div>

                        <div className="mb-16 sm:mb-26 px-4">
                            <h2 className="text-[28px] sm:text-[42px] leading-tight font-medium text-white">
                                Certificate Verified
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4 sm:gap-6 text-left px-5 sm:px-12">
                            <InputField label="Name" value={verifiedData.name} readOnly />

                            <InputField label="Program" value={verifiedData.program} readOnly />

                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-5">
                                <InputField label="Start Date" value={verifiedData.startDate} readOnly />
                                <InputField label="End Date" value={verifiedData.endDate} readOnly />
                            </div>

                            <InputField label="Certificate ID" value={verifiedData.certId} readOnly />

                            <div className="pt-10 sm:pt-14">
                                <Button variant="primary">
                                    Done
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-6 sm:bottom-10 left-0 right-0 text-center text-[12px] sm:text-[13px] text-gray-500 font-medium px-6"
            >
                <p>
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </motion.footer>
        </div>
    );
};

export default VerifyCertificate;
