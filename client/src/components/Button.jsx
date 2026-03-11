import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, disabled = false, type = "button", className = "", variant = "secondary" }) => {

    // Primary: Solid white/light-gray background, dark text
    // Secondary: Hollow, white border, white text (current)
    const variants = {
        primary: disabled
            ? 'bg-white/20 text-white/40 cursor-not-allowed'
            : 'bg-[#F2F2F2] text-[#070707] hover:bg-white',
        secondary: disabled
            ? 'opacity-30 cursor-not-allowed border border-white/40 text-white'
            : 'border border-white/40 text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
    };

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.01 } : {}}
            whileTap={!disabled ? { scale: 0.99 } : {}}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full py-[18px] rounded-full font-medium text-[16px]
                transition-all duration-300
                flex items-center justify-center gap-2
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </motion.button>
    );
};

export default Button;
