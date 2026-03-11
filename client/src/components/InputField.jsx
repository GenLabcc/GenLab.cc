import React from 'react';
import { motion } from 'framer-motion';

const InputField = ({ label, placeholder, value, onChange, type = "text", id, readOnly = false, ...props }) => {
    return (
        <div className="flex flex-col gap-3 w-full text-left font-['Clash Display',sans-serif]">
            {label && (
                <label htmlFor={id} className="text-white/90 text-[15px] font-medium leading-none pl-1 tracking-wide">
                    {label}
                </label>
            )}
            <motion.input
                whileFocus={!readOnly ? { scale: 1.002, borderColor: "rgba(255,255,255,0.4)" } : {}}
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                {...props}
                className={`
                    w-full px-6 py-[18px] rounded-full text-white placeholder:text-gray-500 text-[16px] outline-none transition-all
                    ${readOnly
                        ? 'bg-white/[0.05] border border-white/20'
                        : 'bg-white/[0.02] border border-white/20 focus:bg-white/[0.04]'
                    }
                `}
            />
        </div>
    );
};

export default InputField;
