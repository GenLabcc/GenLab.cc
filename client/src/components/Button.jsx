import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({ children, onClick, disabled = false, type = "button", className = "", variant = "secondary" }) => {

    // Primary: Solid white/light-gray background, dark text
    // Secondary: Hollow, white border, white text (current)
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
    };

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.01 } : {}}
            whileTap={!disabled ? { scale: 0.99 } : {}}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`custom-btn ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default React.memo(Button);
