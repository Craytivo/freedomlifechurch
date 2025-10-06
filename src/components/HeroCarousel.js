import React, { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import CarouselShell from './carousel/CarouselShell';
import CarouselControls from './carousel/CarouselControls';
import CarouselIndicators from './carousel/CarouselIndicators';
import CarouselSlide from './carousel/CarouselSlide';
import CTAButton from './CTAButton';
import SmartLink from './SmartLink';

// Centralized configuration via env (editable without code changes)
const CHURCHCENTER_EVENT_ID = process.env.NEXT_PUBLIC_CHURCHCENTER_EVENT_ID || '3133697';
const CONFERENCE_RECAP_URL = process.env.NEXT_PUBLIC_CONFERENCE_RECAP_URL || '';
const buildChurchCenterEventUrl = (id) => `https://flcedmonton.churchcenter.com/registrations/events/${id}`;

// Base slide configuration (can be extended via props later)
const baseSlides = [
  {
    id: 'conference',
    title: 'Altar Experience Conference 2025',
    subtitle: 'Theme: The Original Mandate · Oct 24–26 · Edmonton',
    ctaLabel: 'Register Now',
    // ctaHref will be injected by lifecycle transform using env ID above
    ctaHref: undefined,
    // Lifecycle window (local time offset included)
    startDate: '2025-10-24T18:00:00-06:00',
    endDate: '2025-10-26T23:59:59-06:00',
      description: 'A three-day gathering to encounter Jesus, experience revival, and be restored in His presence. Expect focused messages on renewal, surrender, and living in your Kingdom identity.',
    badge: 'Conference',
    image: null // optional future background
  },
  {
    id: 'sermon',
      title: 'Latest Message',
      subtitle: 'Watch our most recent message on YouTube.',
    ctaLabel: 'Watch Sermon',
    ctaHref: 'https://www.youtube.com/watch?v=X5K8Wk7pBGw',
      description: 'Join us as we open God\'s Word. Be encouraged, equipped, and strengthened for your faith journey.',
    badge: 'Sermon',
    image: null
  },
  {
    id: 'prayer-focus',
    title: 'Weekly Prayer Focus',
    subtitle: 'Join the house in united agreement',
    ctaLabel: 'Submit a Request',
    ctaHref: '/prayer',
    description: 'We are setting aside this week to pray intentionally for renewal in hearts, bold witness in our city, and healing for those battling illness.',
    badge: 'Prayer Focus',
    focuses: [
      'Renewed First Love',
      'Families Strengthened',
      'Healing & Wholeness',
      'Salvations & Baptism',
      'City Awakening'
    ],
    image: null
  }
];

const HeroCarousel = ({
  slides: customSlides,
  autoAdvanceMs = 15000,
  pauseOnHover = true,
  showIndicators = true
}) => {
  // Build slides with lifecycle adjustments (avoid mutating base configuration)
  const now = new Date();
  const computeConferenceState = (slide) => {
    const start = slide.startDate ? new Date(slide.startDate) : null;
    const end = slide.endDate ? new Date(slide.endDate) : null;
    const before = start ? now < start : false;
    const during = start && end ? now >= start && now <= end : false;
    const after = end ? now > end : false;
    return { before, during, after };
  };

  const transformedSlides = (customSlides || baseSlides).map((s) => {
    if (s.id !== 'conference') return s;
    const status = computeConferenceState(s);
    // Default registration link using env id
    const registerHref = buildChurchCenterEventUrl(CHURCHCENTER_EVENT_ID);
    if (status.after) {
      return {
        ...s,
        badge: 'Highlights',
        ctaLabel: 'Watch Recap',
        ctaHref: CONFERENCE_RECAP_URL || 'https://www.youtube.com/playlist?list=PL_REPLACE_WITH_ACTUAL',
        subtitle: 'Highlights & Messages · Watch on YouTube',
        // Optionally tweak description post-event
        description: 'Thanks for joining us! Rewatch key messages and moments from Altar Experience 2025.'
      };
    }
    // Before/during: keep conference registration
    return {
      ...s,
      ctaLabel: 'Register Now',
      ctaHref: registerHref
    };
  });

  const slides = transformedSlides;
  const [index, setIndex] = useState(0);
  const total = slides.length;
  
  // Touch/swipe support for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const next = useCallback(() => setIndex(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex(i => (i - 1 + total) % total), [total]);
  const goTo = (i) => setIndex(i);

  // Handle touch events for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  // Video / sermon related state defined before effects referencing them

  // State for dynamic sermon video (could be fetched from API; placeholder here)
  const [latestVideoId, setLatestVideoId] = useState('X5K8Wk7pBGw');
  const [sermonReady, setSermonReady] = useState(false);
  const [sermonPlay, setSermonPlay] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const sermonStateRef = useRef({ play: false });
  const [paused, setPaused] = useState(false); // hover pause
  const [userPaused, setUserPaused] = useState(false); // explicit pause via control
  const [reduceMotion, setReduceMotion] = useState(false);

  // Honor prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handle = () => setReduceMotion(!!mql.matches);
    handle();
    if (mql.addEventListener) mql.addEventListener('change', handle);
    else mql.addListener(handle);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handle);
      else mql.removeListener(handle);
    };
  }, []);

  // Auto advance (disabled while video playing, paused, user-paused, or reduced motion)
  const autoAdvanceEnabled = !paused && !sermonPlay && !userPaused && !reduceMotion;
  useEffect(() => {
    if (!autoAdvanceEnabled) return;
    const id = setInterval(next, autoAdvanceMs);
    return () => clearInterval(id);
  }, [autoAdvanceEnabled, next, autoAdvanceMs]);

  // Attempt to fetch latest video ID (YouTube channel feed). This may be blocked by CORS in browser.
  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        const resp = await fetch('/api/youtube/latest', { cache: 'no-store' });
        if (!resp.ok) return; // graceful: keep default fallback id
        const data = await resp.json();
        if (!aborted && data.videoId && /^[a-zA-Z0-9_-]{6,}$/.test(data.videoId)) {
          setLatestVideoId(data.videoId);
        }
      } catch (e) {
        // fallback: leave default; optionally could log
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('Failed to load latest video ID, using fallback', e);
        }
      }
    })();
    return () => { aborted = true; };
  }, []);

  // (Placeholder) dynamic retrieval: in future we could fetch YouTube Data API.
  // useEffect(() => { fetchLatestVideoId().then(id => setLatestVideoId(id)); }, []);

  const handleSermonActivate = () => {
    if (!sermonReady) setSermonReady(true);
    setSermonPlay(true);
    sermonStateRef.current.play = true;
  };

  // If user already clicked play and we revisit slide, keep it shown/playing
  useEffect(() => {
    if (sermonStateRef.current.play && !sermonPlay) {
      setSermonReady(true);
      setSermonPlay(true);
    }
  }, [sermonPlay]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') { next(); }
    else if (e.key === 'ArrowLeft') { prev(); }
  };

  // Navigation is handled by SmartLink/CTAButton components

  // Ensure the first slide (Conference) remains first on mobile as it's the most important
  useEffect(() => {
    // No-op: previously started on slide 2 for mobile; keeping 0 to highlight key event
  }, [total]);

  // Keyframes are provided via global CSS; no runtime injection needed

  return (
    <>
    {/* Preload current YouTube thumbnail to speed up first paint */}
    <Head>
      {latestVideoId && (
        <link rel="preload" as="image" href={`https://img.youtube.com/vi/${latestVideoId}/hqdefault.jpg`} />
      )}
    </Head>
    <CarouselShell
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Enhanced faint gold glow bar with premium shimmer effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-full h-2 md:h-3"
        style={{
          background: `
            radial-gradient(circle at 12% 90%, rgba(235,167,62,0.55) 0%, rgba(235,167,62,0.25) 40%, rgba(235,167,62,0) 72%),
            radial-gradient(circle at 50% 95%, rgba(235,167,62,0.6) 0%, rgba(235,167,62,0.28) 42%, rgba(235,167,62,0) 75%),
            radial-gradient(circle at 85% 88%, rgba(235,167,62,0.5) 0%, rgba(235,167,62,0.22) 38%, rgba(235,167,62,0) 70%),
            linear-gradient(90deg, rgba(235,167,62,0.15) 0%, rgba(235,167,62,0.45) 50%, rgba(235,167,62,0.15) 100%),
            linear-gradient(to bottom, rgba(235,167,62,0.35), rgba(235,167,62,0) 68%)
          `,
          filter: 'blur(0.5px)',
          opacity: 0.75,
          maskImage: 'linear-gradient(to right, rgba(0,0,0,.6), rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,.6)), linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0) 100%)',
          maskComposite: 'intersect'
        }}
      />

      {/* Premium ambient gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 15% 25%, rgba(235,167,62,0.04), rgba(235,167,62,0) 60%),
            radial-gradient(circle at 85% 75%, rgba(235,167,62,0.03), rgba(235,167,62,0) 50%),
            linear-gradient(135deg, rgba(235,167,62,0.02) 0%, rgba(235,167,62,0) 50%)
          `
        }}
      />

      {/* Floating premium elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className={`absolute top-16 left-8 w-20 h-20 bg-flc-500/3 rounded-full blur-xl ${reduceMotion ? '' : 'animate-pulse'}`} />
        <div className={`absolute bottom-20 right-12 w-16 h-16 bg-amber-500/4 rounded-full blur-lg ${reduceMotion ? '' : 'animate-pulse'}`} style={{ animationDelay: '2s' }} />
        <div className={`absolute top-1/3 right-1/4 w-12 h-12 bg-flc-600/2 rounded-full blur-md ${reduceMotion ? '' : 'animate-pulse'}`} style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Enhanced container with true full-width mobile and premium desktop spacing */}
      <div className="w-full px-0 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-10">
        <div className="relative px-0 sm:px-0 mx-auto" style={{ maxWidth: '88rem' }}>
          {/* Slide Container: optimized height for mobile, fixed/min height only on desktop; reserve space for bottom controls */}
          <div className="relative pb-12 sm:pb-14 md:min-h-[520px] md:pb-16 lg:pb-20">
            {slides.map((slide, i) => (
              <CarouselSlide
                key={slide.id}
                slide={slide}
                i={i}
                index={index}
                total={total}
                active={i === index}
                reduceMotion={reduceMotion}
                now={now}
                latestVideoId={latestVideoId}
                sermonReady={sermonReady}
                setSermonReady={setSermonReady}
                sermonPlay={sermonPlay}
                setSermonPlay={setSermonPlay}
                iframeLoaded={iframeLoaded}
                setIframeLoaded={setIframeLoaded}
                next={next}
                prev={prev}
              />
            ))}
          </div>
          <CarouselControls
            prev={prev}
            next={next}
            total={total}
            userPaused={userPaused}
            setUserPaused={setUserPaused}
            reduceMotion={reduceMotion}
            showIndicators={showIndicators}
            indicators={<CarouselIndicators slides={slides} index={index} onSelect={goTo} />}
          />
        </div>
      </div>
      {/* Auto-advance progress bar */}
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-neutral-200/40 overflow-hidden" aria-hidden="true">
        <div
          key={index + (autoAdvanceEnabled ? '-running' : '-paused')}
          className={`h-full origin-left bg-flc-500 ${autoAdvanceEnabled && !reduceMotion ? 'hero-progress-anim' : ''}`}
          style={{
            // Use CSS var for timing; restart via key change above
            '--heroProgDur': `${autoAdvanceMs}ms`
          }}
        />
      </div>
    </CarouselShell>
    </>
  );
};

export default HeroCarousel;