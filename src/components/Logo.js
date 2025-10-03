import React from 'react';
import mainLogo from '../assets/logos/FLC main logo.png';

const Logo = ({ size = 'default' }) => {
  const sizeMap = {
    small: 'h-8',      // appropriate for compact contexts
    default: 'h-12',   // fits comfortably inside a 64px header
    large: 'h-16'      // optional larger usage outside header
  };

  return (
    <a href="#home" className="flex items-center group" aria-label="Freedom Life Church Home">
      <img
        src={mainLogo}
        alt="Freedom Life Church Logo"
        className={`object-contain w-auto ${sizeMap[size]}`}
        draggable={false}
      />
      {/* Accessible hidden text for screen readers (kept for semantics) */}
      <span className="sr-only">Freedom Life Church</span>
    </a>
  );
};

export default Logo;