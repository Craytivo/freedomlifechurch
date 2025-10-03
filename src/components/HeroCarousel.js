import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import altarExperienceLogo from '../assets/logos/output-onlinepngtools.png';

// Base slide configuration (can be extended via props later)
const baseSlides = [
  {
    id: 'conference',
    title: 'Altar Experience Conference 2025',
    subtitle: 'Theme: The Original Mandate · Oct 24–26 · Edmonton',
    ctaLabel: 'Register Now',
    ctaHref: 'https://flcedmonton.churchcenter.com/registrations/events/3133697',
    description: 'A weekend of encounter, revival, and restoration in God\'s presence. Focused messages on renewal, surrender, and walking in Kingdom identity.',
    badge: 'Conference',
    image: null // optional future background
  },
  {
    id: 'sermon',
    title: 'Latest Sermon Stream',
    subtitle: 'Watch our most recent YouTube message',
    ctaLabel: 'Watch Sermon',
    ctaHref: 'https://www.youtube.com/watch?v=X5K8Wk7pBGw',
    description: 'Join us as we dive into the Word. Be encouraged, equipped, and strengthened in your faith journey.',
    badge: 'Sermon',
    image: null
  },
  {
    id: 'prayer-focus',
    title: 'Weekly Prayer Focus',
    subtitle: 'Join the house in united agreement',
    ctaLabel: 'Submit a Request',
    ctaHref: '#prayer',
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
  const slides = customSlides || baseSlides;
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const next = useCallback(() => setIndex(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex(i => (i - 1 + total) % total), [total]);
  const goTo = (i) => setIndex(i);

  // Video / sermon related state defined before effects referencing them

  // State for dynamic sermon video (could be fetched from API; placeholder here)
  const [latestVideoId, setLatestVideoId] = useState('X5K8Wk7pBGw');
  const [sermonReady, setSermonReady] = useState(false);
  const [sermonPlay, setSermonPlay] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const sermonStateRef = useRef({ play: false });
  const [paused, setPaused] = useState(false);

  // Auto advance (disabled while video playing or paused)
  useEffect(() => {
    if (paused || sermonPlay) return;
    const id = setInterval(next, autoAdvanceMs);
    return () => clearInterval(id);
  }, [paused, sermonPlay, next, autoAdvanceMs]);

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

  // On mobile, start with the second slide (index 1) to show “second card” first
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile && total > 1) {
      setIndex(1);
    }
  }, [total]);

  // Inject keyframes for flame watermark only once
  useEffect(() => {
    const styleId = 'hero-flame-watermark-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `@keyframes flameWatermarkFade{0%,100%{opacity:.16}50%{opacity:.05}}.flame-watermark{animation:flameWatermarkFade 5.2s ease-in-out infinite;}`;
      document.head.appendChild(style);
    }
  }, []);

  // Inject keyframes for progress bar animation
  useEffect(() => {
    const styleId = 'hero-carousel-progress-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `@keyframes heroCarouselProgress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-white"
      aria-label="Featured content carousel"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Faint gold glow bar */}
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
  <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10" style={{ maxWidth: '88rem' }}>
        <div className="relative">
          {/* Slide Container: static height on mobile, fixed/min height only on desktop */}
          <div className="relative md:min-h-[520px]">
            {slides.map((slide, i) => {
              const active = i === index;
              return (
                <div
                  key={slide.id}
                  className={`transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'} ${active ? '' : 'hidden md:block'} md:absolute md:inset-0 md:${active ? '' : 'pointer-events-none'}`}
                  aria-hidden={!active}
                  aria-live={active ? 'polite' : 'off'}
                >
                  {/* Slide header: badge + slide index + mobile arrows (always on top) */}
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="inline-flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-flc-500/10 text-flc-600 text-xs font-semibold uppercase tracking-wide">{slide.badge}</span>
                      <span className="text-[11px] uppercase tracking-wider text-neutral-500">Slide {i + 1} of {total}</span>
                    </div>
                    {/* Mobile inline arrows */}
                    <div className="flex md:hidden items-center gap-1 ml-1" aria-hidden={total <= 1}>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        aria-label="Previous slide"
                        disabled={total <= 1}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 transition-colors focus:outline-none focus:ring-2 focus:ring-flc-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        aria-label="Next slide"
                        disabled={total <= 1}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 transition-colors focus:outline-none focus:ring-2 focus:ring-flc-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>

                  {/* Title and subtitle directly under header (always below header, before grid) */}
                  <div className="mb-3 md:mb-4">
                    <h2 className="font-heading font-bold text-primary-900 tracking-tight leading-[1.15] text-[clamp(1.9rem,4.2vw,3.25rem)]">
                      {slide.title}
                    </h2>
                    <p className="font-heading text-flc-600 mt-2 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase">
                      {slide.subtitle}
                    </p>
                  </div>

                  <div className="md:h-full grid md:grid-cols-7 gap-10 md:gap-12 lg:gap-14 items-center">
                    {/* Text Content (on mobile this comes after media) */}
                    <div className="order-2 md:order-1 text-left md:col-span-4 md:pr-6 lg:pr-12 relative">
                      {/* Decorative vertical accent (desktop only) */}
                      <span aria-hidden="true" className="hidden md:block absolute -left-6 top-4 bottom-6 w-px bg-gradient-to-b from-flc-500/50 via-flc-500/10 to-transparent" />
                      {/* Title and subtitle moved above header section */}
                      <p className="font-body text-neutral-700 text-base md:text-lg leading-relaxed mb-5 md:mb-6 max-w-3xl">
                        {slide.description}
                      </p>
                      {slide.id === 'conference' && (
                        <div className="space-y-4 mb-6 text-neutral-700 max-w-3xl">
                          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                            {['Prophetic Ministry','Extended Worship','Regional Leaders','Personal Renewal','Unity & Commission','Kingdom Identity'].map(point => (
                              <li key={point} className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="text-[13px] leading-relaxed text-neutral-600">
                            <strong className="font-semibold text-neutral-800">Why come?</strong> Step away from routine, rekindle first love, receive fresh impartation and return strengthened for the mandate ahead.
                          </div>
                        </div>
                      )}
                      {slide.id === 'sermon' && (
                        <div className="mb-6 max-w-xl">
                          <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 flex items-start gap-3">
                            <span className="inline-flex w-6 h-6 rounded-md bg-flc-500/10 text-flc-600 items-center justify-center text-[11px] font-semibold">NEW</span>
                            <p className="text-[13px] leading-relaxed text-neutral-600">Catch the most recent message and explore previous series to go deeper mid-week.</p>
                          </div>
                        </div>
                      )}
                      {slide.id === 'prayer-focus' && (
                        <div className="mb-6 max-w-xl">
                          <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4 md:p-5">
                            <p className="text-[13px] text-neutral-600 leading-relaxed mb-3">
                              Focus your agreement on these themes—set a reminder, gather with someone, and lean into listening prayer.
                            </p>
                            <ul className="grid grid-cols-2 gap-2 text-[12px] md:text-[13px]">
                              {slide.focuses?.map(f => (
                                <li key={f} className="flex items-center gap-2 px-2 py-1 rounded-md bg-white border border-neutral-200 shadow-xs">
                                  <span className="w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                                  <span className="text-neutral-700 font-medium leading-snug">{f}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 flex flex-wrap gap-3 items-center">
                              <a href="#prayer-gathering" className="text-[11px] font-semibold tracking-wide uppercase text-flc-600 hover:text-flc-700 inline-flex items-center gap-1">
                                Weekly Prayer Gatherings
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                              </a>
                              <span className="text-[11px] text-neutral-400">Fridays · 7:00 AM & 7:00 PM</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-4">
                        <a
                          href={slide.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-flc-500 hover:bg-flc-600 text-white font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-flc-500/40"
                        >
                          {slide.ctaLabel}
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                        </a>
                        {slide.id === 'sermon' && (
                          <a
                            href="https://www.youtube.com/@FLCEdmonton/streams"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-flc-500/30"
                          >
                            More Streams
                          </a>
                        )}
                        {slide.id === 'prayer-focus' && (
                          <a
                            href="#prayer"
                            className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-flc-500/30"
                          >
                            Prayer Resources
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Media Area (first on mobile, right on desktop) */}
                    <div className="order-1 md:order-2 relative w-full md:col-span-3 mb-6 md:mb-0">
                      {slide.id === 'conference' ? (
                        <div className="rounded-xl shadow-lg overflow-hidden relative flex justify-center px-2.5 md:px-3 pt-1.5 pb-3.5 md:pt-2 md:pb-5">
                          {/* Light gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-flc-50 via-flc-100 to-neutral-100" />
                          {/* Soft radial center glow */}
                          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.6), rgba(255,255,255,0) 65%)' }} />
                          {/* Animated flame watermark */}
                          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                            <Image
                              src={altarExperienceLogo}
                              alt="Altar Experience watermark"
                              fill
                              className="flame-watermark select-none opacity-15 mix-blend-multiply object-contain"
                              style={{ transform: 'translate(-50%, -50%) scale(2.4)', top: '50%', left: '50%', position: 'absolute', filter: 'blur(0.5px)' }}
                              draggable={false}
                              priority={false}
                            />
                          </div>
                          <div className="relative w-full max-w-md mx-auto flex flex-col items-center text-center">
                            <div className="relative -mt-1 -mb-1 select-none pointer-events-none">
                              <div className="relative w-40 md:w-56 h-20 md:h-28 drop-shadow-md">
                                <Image
                                  src={altarExperienceLogo}
                                  alt="Altar Experience Conference Logo"
                                  fill
                                  sizes="(max-width:768px) 160px, 224px"
                                  className="object-contain"
                                  priority
                                />
                              </div>
                            </div>
                            <h3 className="font-heading text-lg md:text-2xl font-bold leading-snug text-primary-900 mt-1">
                              <span className="block text-[9px] md:text-[11px] font-semibold tracking-[0.08em] text-flc-600 uppercase mb-0.5">
                                Encounter · Revival · Restoration
                              </span>
                              <span className="text-primary-900">The Original Mandate</span>
                            </h3>
                            <p className="text-[10px] md:text-sm text-neutral-700 leading-snug mt-1">
                              Bring family & friends. Expect transformation in God&apos;s presence.
                            </p>
                          </div>
                        </div>
                      ) : slide.id === 'prayer-focus' ? (
                        <div className="rounded-xl shadow-lg overflow-hidden relative border border-neutral-200 bg-gradient-to-br from-flc-50 via-neutral-50 to-white">
                          <div className="relative p-5 md:p-6 lg:p-7">
                            <div className="inline-flex items-center gap-2 mb-2">
                              <span className="px-2.5 py-1 rounded-full bg-flc-500/10 text-flc-600 text-[11px] font-semibold uppercase tracking-wide">Prayer</span>
                            </div>
                            <h3 className="font-heading text-lg md:text-2xl font-bold leading-snug text-primary-900">
                              Ways to pray this week
                            </h3>
                            <p className="text-[13px] md:text-sm text-neutral-600 mt-2">
                              Set a simple rhythm and agree with the prayer focuses.
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                              <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                                <span>Take 10 minutes daily to pray through each focus.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                                <span>Pair up with a friend or family member to agree together.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                                <span>Write a short testimony when you see breakthrough.</span>
                              </li>
                            </ul>
                            <div className="mt-5 p-3 rounded-lg bg-flc-500/10 border border-flc-200 text-[13px] text-flc-700">
                              “Pray without ceasing.” — 1 Thess. 5:17
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl shadow-lg overflow-hidden bg-black relative group md:scale-[1.05] md:origin-center">
                          {/* Maintain true 16:9 to avoid black letterbox bars */}
                          <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
                            {/* Thumbnail (dynamic from video ID) */}
                            {!sermonReady && (
                              <picture>
                                <source srcSet={`https://img.youtube.com/vi/${latestVideoId}/hqdefault.jpg`} />
                                <img
                                  src={`https://img.youtube.com/vi/${latestVideoId}/hqdefault.jpg`}
                                  alt="Latest sermon thumbnail"
                                  className="absolute inset-0 w-full h-full object-cover"
                                  loading="lazy"
                                  draggable={false}
                                />
                              </picture>
                            )}
                            {sermonReady && (
                              <>
                                <iframe
                                  className="absolute inset-0 w-full h-full"
                                  src={`https://www.youtube.com/embed/${latestVideoId}?rel=0&autoplay=${sermonPlay?1:0}&mute=1`}
                                  title="Latest Sermon"
                                  loading="lazy"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                  onLoad={() => setIframeLoaded(true)}
                                />
                                {!iframeLoaded && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" aria-label="Loading video" />
                                  </div>
                                )}
                              </>
                            )}
                            {/* Play Overlay */}
                            {!sermonPlay && (
                              <button
                                type="button"
                                onClick={handleSermonActivate}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
                                aria-label="Play latest sermon"
                              >
                                <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/90 group-hover:bg-white shadow-lg transition-all border border-white/60">
                                  <svg className="w-10 h-10 text-flc-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-10">
            <div className="hidden md:flex gap-3">
              <button onClick={prev} aria-label="Previous slide" className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-flc-500" disabled={total<=1}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={next} aria-label="Next slide" className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-flc-500" disabled={total<=1}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>

            {showIndicators && (
              <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Go to slide ${i + 1}: ${s.title}`}
                    onClick={() => goTo(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-flc-500 ${
                      i === index ? 'bg-flc-500 w-8' : 'bg-neutral-300 w-2'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Auto-advance progress bar */}
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-neutral-200/40 overflow-hidden" aria-hidden="true">
        <div
          key={index + (paused || sermonPlay ? '-paused' : '-running')}
          className={`h-full origin-left bg-flc-500 ${paused || sermonPlay ? '' : 'animate-[heroCarouselProgress_var(--heroProgDur)_linear_forwards]'}`}
          style={{
            // Use CSS var for timing; restart via key change above
            '--heroProgDur': `${autoAdvanceMs}ms`
          }}
        />
      </div>
    </section>
  );
};

export default HeroCarousel;