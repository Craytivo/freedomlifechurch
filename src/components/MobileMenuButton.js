import React from 'react';

const MobileMenuButton = ({ isOpen, onClick }) => {
  // Inline styles used instead of arbitrary value utilities (Tailwind v2 compatibility)
  const barCommon = 'block w-6 rounded bg-neutral-700 transition-all duration-300 ease-out';
  const topStyle = isOpen
    ? { transform: 'translateY(8px) rotate(45deg)', backgroundColor: 'var(--flc-500, #eba73e)' }
    : { transform: 'translateY(0) rotate(0)' };
  const midStyle = isOpen
    ? { opacity: 0, transform: 'scaleX(.4)' }
    : { opacity: 1, transform: 'scaleX(1)' };
  const botStyle = isOpen
    ? { transform: 'translateY(-8px) rotate(-45deg)', backgroundColor: 'var(--flc-500, #eba73e)' }
    : { transform: 'translateY(0) rotate(0)' };

  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center w-10 h-10 focus:outline-none group"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
    >
      <span className="sr-only">{isOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
      <div className="relative w-6 h-5">
        <span
          className={`${barCommon} absolute left-0`}
          style={{ height: '2px', top: 0, ...topStyle }}
        />
        <span
          className={`${barCommon} absolute left-0 bg-neutral-600 group-hover:bg-flc-500`}
          style={{ height: '2px', top: '50%', marginTop: '-1px', ...midStyle }}
        />
        <span
          className={`${barCommon} absolute left-0 bg-neutral-600 group-hover:bg-flc-500`}
          style={{ height: '2px', bottom: 0, ...botStyle }}
        />
      </div>
    </button>
  );
};

export default MobileMenuButton;