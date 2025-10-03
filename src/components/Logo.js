import React from 'react';
import Image from 'next/image';
import mainLogo from '../assets/logos/FLC main logo.png';

const Logo = ({ size = 'default' }) => {
  const sizeMap = {
    small: 'h-8',      // appropriate for compact contexts
    default: 'h-12',   // fits comfortably inside a 64px header
    large: 'h-16'      // optional larger usage outside header
  };

  return (
    <a href="#home" className="flex items-center group" aria-label="Freedom Life Church Home">
  <span className={`relative block w-auto ${sizeMap[size]}`} style={{ aspectRatio: '5 / 2' }}>
        <Image
          src={mainLogo}
            alt="Freedom Life Church Logo"
            fill
            sizes="(max-width: 768px) 140px, 180px"
            className="object-contain"
            priority
            draggable={false}
        />
      </span>
      {/* Accessible hidden text for screen readers (kept for semantics) */}
      <span className="sr-only">Freedom Life Church</span>
    </a>
  );
};

export default Logo;