import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import altarExperienceLogo from '../src/assets/logos/output-onlinepngtools.png';

const CHURCHCENTER_EVENT_ID = process.env.NEXT_PUBLIC_CHURCHCENTER_EVENT_ID || '3133697';
const buildChurchCenterEventUrl = (id) => `https://flcedmonton.churchcenter.com/registrations/events/${id}`;

export default function AltarExperiencePage() {
  const registerUrl = buildChurchCenterEventUrl(CHURCHCENTER_EVENT_ID);
  const now = new Date();
  const startDate = '2025-10-24T18:00:00-06:00';
  const endDate = '2025-10-26T23:59:59-06:00';

  return (
    <>
      <Head>
        <title>Altar Experience Conference 2025 · Freedom Life Church</title>
        <meta name="description" content="Encounter Jesus, experience revival, and be restored in His presence. Oct 24–26 in Edmonton. Register now for Altar Experience 2025." />
        <meta property="og:title" content="Altar Experience Conference 2025" />
        <meta property="og:description" content="Encounter Jesus, experience revival, and be restored in His presence. Oct 24–26 in Edmonton." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.freedomlifechurch.ca/altar-experience" />
      </Head>

      {/* Creative Hero with event image */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[38vh] min-h-[360px] sm:min-h-[420px] md:min-h-[480px]">
          {/* Subtle vignette + glow across the whole hero */}
          <div className="absolute inset-0" style={{
            background: [
              'radial-gradient(120% 80% at 20% -10%, rgba(235,167,62,0.22) 0%, rgba(235,167,62,0.08) 35%, rgba(0,0,0,0) 65%)',
              'radial-gradient(120% 80% at 80% 110%, rgba(235,167,62,0.16) 0%, rgba(235,167,62,0.06) 35%, rgba(0,0,0,0) 65%)',
              'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.06) 55%, rgba(0,0,0,0.14) 100%)'
            ].join(', ')
          }} />
          {/* Overlay gradient from hero system */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overlay-gradient grain opacity-40" />

          {/* Content as 2-column on desktop: left copy, right event card */}
          <div className="relative h-full w-full px-0 sm:px-4 lg:px-8">
            <div className="relative z-10 mx-auto h-full flex items-end sm:items-center py-8 sm:py-10 md:py-12 px-4 sm:px-0" style={{ maxWidth: '88rem' }}>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6 sm:gap-8 md:gap-10 w-full items-start">
                {/* Left: Copy and actions */}
                <div className="md:col-span-4 max-w-3xl">
                  <span className="eyebrow">Conference</span>
                  <h1 className="mt-2 font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 leading-[1.05] text-[clamp(2rem,6vw,3.5rem)]">
                    Altar Experience Conference 2025
                  </h1>
                  <p className="mt-2 max-w-2xl text-base sm:text-lg md:text-xl text-neutral-700 font-medium leading-relaxed">
                    Theme: The Original Mandate · Oct 24–26 · Edmonton
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-flc-500/40 transition"
                    >
                      Register Now
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </a>
                    <a
                      href="#details"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium"
                    >
                      View Details
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>

                {/* Right: Event info card (replicated style from hero slide) */}
                <div className="md:col-span-3 order-first md:order-none">
                  <div className="rounded-xl sm:rounded-2xl shadow-lg overflow-hidden relative flex justify-center px-2 sm:px-2.5 md:px-3 pt-1 sm:pt-1.5 pb-3 sm:pb-3.5 md:pt-2 md:pb-5 border border-flc-200/60 bg-white/80 backdrop-blur">
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
                      {/* Date chip */}
                      <div className="absolute right-1.5 top-1.5 sm:right-2.5 sm:top-2.5 md:right-3 md:top-3">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-white/80 backdrop-blur border border-amber-200 text-2xs sm:text-xs font-semibold text-amber-700 shadow-sm">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          <span className="hidden xs:inline">Oct 24–26 · Edmonton</span>
                          <span className="xs:hidden">Oct 24–26</span>
                        </div>
                      </div>

                      {/* Logo */}
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

                      {/* Chips row */}
                      <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                        {(() => {
                          const start = startDate ? new Date(startDate) : null;
                          const end = endDate ? new Date(endDate) : null;
                          const items = [];
                          if (start && now < start) {
                            const DAY_MS = 24 * 60 * 60 * 1000;
                            const iso = startDate;
                            const m = iso.match(/([+-])(\d{2}):?(\d{2})$/);
                            const sign = m ? (m[1] === '-' ? -1 : 1) : -1;
                            const hh = m ? parseInt(m[2], 10) : 6;
                            const mm = m ? parseInt(m[3], 10) : 0;
                            const eventOffsetMs = sign * (hh * 60 + mm) * 60 * 1000;

                            const startMs = start.getTime();
                            const nowMs = now.getTime();
                            const startDayIdx = Math.floor((startMs + eventOffsetMs) / DAY_MS);
                            const nowDayIdx = Math.floor((nowMs + eventOffsetMs) / DAY_MS);
                            const diffDays = Math.max(0, startDayIdx - nowDayIdx);
                            const label = diffDays === 0 ? 'Starts Today' : `${diffDays} day${diffDays === 1 ? '' : 's'} to go`;
                            items.push(
                              <span key="countdown" className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-500/15 text-amber-800 border border-amber-300 text-2xs sm:text-xs font-semibold">
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/></svg>
                                {label}
                              </span>
                            );
                          }
                          if (end && now <= end) {
                            items.push(
                              <span key="facts" className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/80 backdrop-blur border border-neutral-200 text-2xs sm:text-xs text-neutral-700">
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243"/></svg>
                                3 days · Fri–Sun
                              </span>
                            );
                          }
                          return items;
                        })()}
                      </div>

                      <p className="text-2xs sm:text-xs md:text-sm text-neutral-700 leading-snug mt-1.5 sm:mt-2">
                        Bring family & friends. Expect transformation in God's presence.
                      </p>
                    </div>
                    <div className="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-400/20 blur-2xl" aria-hidden="true" />
                    <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-flc-500/20 blur-2xl" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section id="details" className="relative py-8 sm:py-10 md:py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '78rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
            {/* Quick facts */}
            <div className="card p-5 self-start">
              <h2 className="text-lg font-semibold text-primary-900">Event Info</h2>
              <dl className="mt-3 space-y-2 text-sm text-neutral-700">
                <div className="flex gap-2">
                  <dt className="w-28 text-neutral-500">Dates</dt>
                  <dd>Oct 24–26, 2025</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-28 text-neutral-500">Location</dt>
                  <dd>Freedom Life Church · 14970 114 Ave NW, Edmonton, AB</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-28 text-neutral-500">Registration</dt>
                  <dd>
                    <a className="text-flc-600 hover:text-flc-700 underline" href={registerUrl} target="_blank" rel="noopener noreferrer">Church Center</a>
                  </dd>
                </div>
              </dl>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-neutral-800">Upcoming Dates</h3>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                  <li>Oct 24, 2025 · 7–9pm</li>
                  <li>Oct 25, 2025 · 12–2pm</li>
                  <li>Oct 26, 2025 · 12–2pm</li>
                </ul>
              </div>
              <div className="mt-4">
                <a
                  href={registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-sm font-semibold"
                >
                  Register Now
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-5">
                <h2 className="text-lg font-semibold text-primary-900">Details</h2>
                <div className="mt-3 text-sm leading-relaxed text-neutral-700 space-y-3">
                  <p><strong>Freedom Life Church</strong> presents: <strong>The Altar Experience Conference 2025</strong></p>
                  <p><strong>Theme:</strong> <em>The Original Mandate</em></p>
                  <p>
                    Join us <strong>Friday, October 24 – Sunday, October 26</strong> for a powerful weekend of encounter at <em>The Altar Experience Conference</em>.
                    Each night we will press into God’s presence with focused messages and times of ministry, covering themes such as
                    <strong> personal revival and restoration, rebuilding personal altars, surrender and alignment with the will of God, and walking in authority and identity in the Kingdom of God</strong>.
                  </p>
                  <p>
                    This will be a weekend to return to <em>The Original Mandate</em>—to seek God wholeheartedly and be equipped to walk boldly in His calling.
                  </p>
                  <p>
                    We invite you, your family, and friends to join us at <strong>Freedom Life Church</strong> for this life-changing experience. Come expecting renewal, transformation, and a fresh move of God!
                  </p>
                  <p className="text-neutral-500 text-xs">*Registration opens September 7 and will close October 12*</p>
                </div>
              </div>
              {/* Removed Official Event Page embed by request */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
