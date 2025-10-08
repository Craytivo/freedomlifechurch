import React from 'react';

const CarouselControls = ({ prev, next, total, userPaused, setUserPaused, reduceMotion, showIndicators, indicators }) => {
  return (
    <div className="relative z-20 flex items-center justify-between mt-6 sm:mt-8 md:mt-12">
      <div className="hidden md:flex gap-3">
        <button onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); prev(); }} aria-label="Previous slide" className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-flc-500" disabled={total<=1}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); next(); }} aria-label="Next slide" className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-flc-500" disabled={total<=1}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <div className="flex-1 flex justify-center md:justify-start">
        <button
          type="button"
          aria-label={userPaused || reduceMotion ? 'Play carousel' : 'Pause carousel'}
          aria-pressed={userPaused}
          onClick={(e) => { e.preventDefault(); setUserPaused(p => !p); }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-flc-500 text-xs sm:text-sm"
        >
          {userPaused || reduceMotion ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-5.197-3.026A1 1 0 008 9.026v5.948a1 1 0 001.555.832l5.197-3.026a1 1 0 000-1.732z"/></svg>
              Play
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6"/></svg>
              Pause
            </>
          )}
        </button>
      </div>

      {showIndicators && (
        <div className="flex items-center gap-1.5 sm:gap-2" role="tablist" aria-label="Slide indicators">
          {indicators}
        </div>
      )}
    </div>
  );
};

export default CarouselControls;
