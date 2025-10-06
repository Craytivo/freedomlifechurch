import React from 'react';

const CarouselShell = ({
  children,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => (
  <section
    className="relative overflow-hidden bg-white w-full"
    role="region"
    aria-roledescription="carousel"
    aria-label="Featured content carousel"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onKeyDown={onKeyDown}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
    tabIndex={0}
  >
    {children}
  </section>
);

export default CarouselShell;
