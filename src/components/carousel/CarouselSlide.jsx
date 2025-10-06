import React from 'react';
import Image from 'next/image';
import CTAButton from '../CTAButton';
import SmartLink from '../SmartLink';
import altarExperienceLogo from '../../assets/logos/output-onlinepngtools.png';

const CarouselSlide = ({
  slide,
  i,
  index,
  total,
  active,
  reduceMotion,
  now,
  latestVideoId,
  sermonReady,
  setSermonReady,
  sermonPlay,
  setSermonPlay,
  iframeLoaded,
  setIframeLoaded,
  next,
  prev,
}) => {
  const handleSermonActivate = () => {
    if (!sermonReady) setSermonReady(true);
    setSermonPlay(true);
  };

  return (
    <div
      id={`hero-slide-${slide.id}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${slide.title} (${i + 1} of ${total})`}
      className={`transition-opacity ${reduceMotion ? '' : 'duration-700'} ${active ? 'opacity-100 relative z-10' : 'opacity-0 pointer-events-none'} ${active ? '' : 'hidden md:block'} md:absolute md:inset-0`}
      aria-hidden={!active}
      aria-live={active ? 'polite' : 'off'}
    >
      <div className="relative z-20 flex items-center justify-between mb-3 sm:mb-4 md:mb-3">
        <div className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-flc-500/12 via-amber-500/8 to-flc-500/12 border border-flc-200/20 backdrop-blur-sm text-flc-700 text-xs font-semibold uppercase tracking-wide shadow-sm">
            <div className="w-1.5 h-1.5 bg-flc-500 rounded-full animate-pulse" />
            {slide.badge}
          </span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 font-medium">Slide {i + 1} of {total}</span>
        </div>
        <div className="flex-none flex md:hidden items-center gap-2 ml-1" aria-hidden={total <= 1}>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev(); }}
            aria-label="Previous slide"
            disabled={total <= 1}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm border border-neutral-200/50 text-neutral-600 hover:bg-white hover:border-neutral-300 hover:shadow-md disabled:opacity-40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-flc-500/50 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); next(); }}
            aria-label="Next slide"
            disabled={total <= 1}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm border border-neutral-200/50 text-neutral-600 hover:bg-white hover:border-neutral-300 hover:shadow-md disabled:opacity-40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-flc-500/50 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="mb-4 sm:mb-6 md:mb-5">
        <h2 className="font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 tracking-tight leading-[1.05] text-[clamp(1.75rem,7vw,3.5rem)] sm:text-[clamp(2rem,4.5vw,3.5rem)] drop-shadow-sm">
          {slide.title}
        </h2>
        <p className="font-heading text-flc-600 mt-3 text-[11px] sm:text-sm md:text-base font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase drop-shadow-sm">
          {slide.subtitle}
        </p>
      </div>

      <div className="md:h-full grid md:grid-cols-7 gap-6 sm:gap-8 md:gap-12 lg:gap-14 items-start">
        <div className="order-2 md:order-1 text-left md:col-span-4 md:pr-6 lg:pr-12 relative z-20 px-4 sm:px-0 py-2 sm:py-0">
          <span aria-hidden="true" className="hidden md:block absolute -left-6 top-4 bottom-6 w-px bg-gradient-to-b from-flc-500/50 via-flc-500/10 to-transparent" />
          <p className="font-body text-neutral-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-5 md:mb-6 max-w-3xl">
            {slide.description}
          </p>
          {slide.id === 'conference' && (
            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6 text-neutral-700 max-w-3xl">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm">
                {['Prophetic ministry','Extended worship','Regional leaders','Personal renewal','Unity and commission','Kingdom identity'].map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="text-xs sm:text-[13px] leading-relaxed text-neutral-600">
                <strong className="font-semibold text-neutral-800">Why come?</strong> Step away from routine, rekindle your first love, receive fresh impartation, and return strengthened for the mandate ahead.
              </div>
            </div>
          )}
          {slide.id === 'sermon' && (
            <div className="mb-5 sm:mb-6 max-w-xl">
              <div className="p-2.5 sm:p-3 rounded-lg bg-neutral-50 border border-neutral-200 flex items-start gap-2.5 sm:gap-3">
                <span className="inline-flex w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-flc-500/10 text-flc-600 items-center justify-center text-[10px] sm:text-[11px] font-semibold">NEW</span>
                <div className="space-y-1 sm:space-y-1.5">
                  <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-600">Catch the most recent message and explore previous series to keep growing midweek.</p>
                  <p className="text-[11px] sm:text-[12px] leading-relaxed text-neutral-500">Watch live Sundays at 12:00 PM (MST), or on‑demand anytime.</p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 rounded-lg border border-neutral-200 bg-neutral-50/80 p-3 sm:p-4">
                <p className="text-[11px] sm:text-[12px] text-neutral-500 uppercase font-semibold tracking-wide mb-2">Highlights</p>
                <ul className="grid grid-cols-1 gap-2 text-xs sm:text-[13px] text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                    <span>Biblical teaching that forms strong disciples.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                    <span>Clear, practical application for everyday life.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                    <span>Spirit‑led ministry and intentional moments of prayer.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {slide.id === 'prayer-focus' && (
            <div className="mb-5 sm:mb-6 max-w-xl">
              <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-3 sm:p-4 md:p-5">
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-2.5 sm:mb-3">
                  Focus your agreement on these themes—set a reminder, gather with someone, and lean into listening prayer.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] md:text-[13px]">
                  {slide.focuses?.map(f => (
                    <li key={f} className="flex items-center gap-2 px-2 py-1 rounded-md bg-white border border-neutral-200 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                      <span className="text-neutral-700 font-medium leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 items-start sm:items-center">
                  <SmartLink href="#prayer-gathering" className="text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase text-flc-600 hover:text-flc-700 inline-flex items-center gap-1">
                    Weekly Prayer Gatherings
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </SmartLink>
                  <span className="text-[10px] sm:text-[11px] text-neutral-400">Fridays · 7:00 AM & 7:00 PM</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <CTAButton href={slide.id === 'sermon' ? '/sermons' : slide.ctaHref}>
              {slide.ctaLabel}
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </CTAButton>
            {slide.id === 'sermon' && (
              <CTAButton
                href="https://www.youtube.com/@FLCEdmonton/streams"
                variant="secondary"
              >
                More Streams
                <svg className="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </CTAButton>
            )}
            {slide.id === 'sermon' && (
              <CTAButton
                href="https://www.youtube.com/@FLCEdmonton"
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-100"
              >
                Subscribe on YouTube
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </CTAButton>
            )}
            {slide.id === 'prayer-focus' && (
              <CTAButton href="/prayer" variant="outline">
                Prayer Resources
              </CTAButton>
            )}
          </div>
        </div>

        <div className="order-1 md:order-2 relative z-10 w-full md:col-span-3 mb-4 sm:mb-6 md:mb-0 px-4 sm:px-0 py-2 sm:py-0">
          {slide.id === 'conference' ? (
            <div className="rounded-xl sm:rounded-2xl shadow-lg overflow-hidden relative flex justify-center px-2 sm:px-2.5 md:px-3 pt-1 sm:pt-1.5 pb-3 sm:pb-3.5 md:pt-2 md:pb-5 border border-flc-200/60">
              <div className="absolute inset-0 bg-gradient-to-br from-flc-50 via-amber-50 to-neutral-100" />
              <div className="absolute inset-0" style={{ background: 'radial-gradient(90% 70% at 50% 0%, rgba(235,167,62,0.22) 0%, rgba(235,167,62,0) 60%)' }} />
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
              <div className="relative w-full max-w-xs sm:max-w-md mx-auto flex flex-col items-center text-center">
                {(() => {
                  const start = slide.startDate ? new Date(slide.startDate) : null;
                  const end = slide.endDate ? new Date(slide.endDate) : null;
                  const showDates = start && end && now <= end;
                  if (!showDates) return null;
                  return (
                    <div className="absolute right-1.5 top-1.5 sm:right-2.5 sm:top-2.5 md:right-3 md:top-3">
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-white/80 backdrop-blur border border-amber-200 text-[10px] sm:text-[11px] font-semibold text-amber-700 shadow-sm">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span className="hidden xs:inline">Oct 24–26 · Edmonton</span>
                        <span className="xs:hidden">Oct 24–26</span>
                      </div>
                    </div>
                  );
                })()}
                <div className="relative -mt-0.5 sm:-mt-1 -mb-0.5 sm:-mb-1 select-none pointer-events-none">
                  <div className="relative w-32 sm:w-40 md:w-56 h-16 sm:h-20 md:h-28 drop-shadow-md">
                    <Image
                      src={altarExperienceLogo}
                      alt="Altar Experience Conference Logo"
                      fill
                      sizes="(max-width:640px) 128px, (max-width:768px) 160px, 224px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <h3 className="font-heading text-base sm:text-lg md:text-2xl font-bold leading-snug text-primary-900 mt-0.5 sm:mt-1">
                  <span className="block text-[8px] sm:text-[9px] md:text-[11px] font-semibold tracking-[0.08em] text-flc-600 uppercase mb-0.5">
                    Encounter · Revival · Restoration
                  </span>
                  <span className="text-primary-900">The Original Mandate</span>
                </h3>
                {(() => {
                  const start = slide.startDate ? new Date(slide.startDate) : null;
                  const end = slide.endDate ? new Date(slide.endDate) : null;
                  const items = [];
                  if (start && now < start) {
                    // Compute days-to-go by event timezone calendar days (derived from ISO offset)
                    const DAY_MS = 24 * 60 * 60 * 1000;
                    const iso = slide.startDate;
                    const m = iso.match(/([+-])(\d{2}):?(\d{2})$/);
                    const sign = m ? (m[1] === '-' ? -1 : 1) : -1; // default to -06:00 style negative offset
                    const hh = m ? parseInt(m[2], 10) : 6;
                    const mm = m ? parseInt(m[3], 10) : 0;
                    const eventOffsetMs = sign * (hh * 60 + mm) * 60 * 1000;

                    const startMs = start.getTime();
                    const nowMs = now.getTime();
                    // Convert to event-local day index by shifting by offset, then flooring by day
                    const startDayIdx = Math.floor((startMs + eventOffsetMs) / DAY_MS);
                    const nowDayIdx = Math.floor((nowMs + eventOffsetMs) / DAY_MS);
                    const diffDays = Math.max(0, startDayIdx - nowDayIdx);

                    const label = diffDays === 0 ? 'Starts Today' : `${diffDays} day${diffDays === 1 ? '' : 's'} to go`;
                    items.push(
                      <span key="countdown" className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-500/15 text-amber-800 border border-amber-300 text-[10px] sm:text-[11px] font-semibold">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/></svg>
                        {label}
                      </span>
                    );
                  }
                  if (end && now <= end) {
                    items.push(
                      <span key="facts" className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/80 backdrop-blur border border-neutral-200 text-[10px] sm:text-[11px] text-neutral-700">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243"/></svg>
                        3 days · Fri–Sun
                      </span>
                    );
                  }
                  if (!items.length) return null;
                  return (
                    <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">{items}</div>
                  );
                })()}
                <p className="text-[9px] sm:text-[10px] md:text-sm text-neutral-700 leading-snug mt-1.5 sm:mt-2">
                  Bring family & friends. Expect transformation in God's presence.
                </p>
              </div>
              <div className="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-400/20 blur-2xl" aria-hidden="true" />
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-flc-500/20 blur-2xl" aria-hidden="true" />
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
            <div className="rounded-lg sm:rounded-xl shadow-lg overflow-hidden bg-black relative group md:scale-[1.05] md:origin-center">
              <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
                {!sermonReady && (
                  <Image
                    src={`https://img.youtube.com/vi/${latestVideoId}/hqdefault.jpg`}
                    alt="Latest sermon thumbnail"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="absolute inset-0 object-cover"
                    priority={false}
                    draggable={false}
                  />
                )}
                {!sermonReady && (
                  <Image
                    src={`https://img.youtube.com/vi/${latestVideoId}/mqdefault.jpg`}
                    alt=""
                    width={160}
                    height={90}
                    aria-hidden="true"
                    className="pointer-events-none absolute opacity-0"
                    priority={false}
                  />
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
                        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" aria-label="Loading video" />
                      </div>
                    )}
                  </>
                )}
                {!sermonPlay && (
                  <button
                    type="button"
                    onClick={handleSermonActivate}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
                    aria-label="Play latest sermon"
                  >
                    <span className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 group-hover:bg-white shadow-lg transition-all border border-white/60">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-flc-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
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
};

export default CarouselSlide;
