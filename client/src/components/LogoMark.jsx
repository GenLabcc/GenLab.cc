import React from 'react';
import rawSvg from '../assets/logo-white.svg?raw';
import './LogoMark.css';

export default function LogoMark({ color = 'white', size = 32, className = '' }) {
  return (
    <div
      className={`logo-mark-wrapper ${className}`}
      style={{
        width: size,
        height: size,
        color: color,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      dangerouslySetInnerHTML={{ __html: rawSvg }}
    />
  );
}
