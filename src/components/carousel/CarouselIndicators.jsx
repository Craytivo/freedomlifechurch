import React from 'react';

const CarouselIndicators = ({ slides, index, onSelect }) => (
  <>
    {slides.map((s, i) => (
      <button
        key={s.id}
        role="tab"
        aria-selected={i === index}
        aria-controls={`hero-slide-${s.id}`}
        aria-label={`Go to slide ${i + 1}: ${s.title}`}
        onClick={() => onSelect(i)}
        className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-flc-500 ${
          i === index ? 'bg-flc-500 w-6 sm:w-8' : 'bg-neutral-300 w-2'
        }`}
      />
    ))}
  </>
);

export default CarouselIndicators;
