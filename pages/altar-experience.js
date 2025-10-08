import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import altarExperienceLogo from '../src/assets/logos/output-onlinepngtools.png';

const CHURCHCENTER_EVENT_ID = process.env.NEXT_PUBLIC_CHURCHCENTER_EVENT_ID || '3133697';
const buildChurchCenterEventUrl = (id) => `https://flcedmonton.churchcenter.com/registrations/events/${id}`;

export default function AltarExperiencePage() {
  const registerUrl = buildChurchCenterEventUrl(CHURCHCENTER_EVENT_ID);
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const startDate = '2025-10-24T18:00:00-06:00';
  const endDate = '2025-10-26T23:59:59-06:00';
  const locationAddress = 'Freedom Life Church · 14970 114 Ave NW, Edmonton, AB';

  // Helpers: calendar links (overall event)
  const toGCalDate = (iso) => {
    const d = new Date(iso);
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const hh = String(d.getUTCHours()).padStart(2, '0');
    const mi = String(d.getUTCMinutes()).padStart(2, '0');
    const ss = String(d.getUTCSeconds()).padStart(2, '0');
    return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
  };
  const gcalHref = React.useMemo(() => {
    const text = encodeURIComponent('Altar Experience Conference 2025');
    const details = encodeURIComponent('Encounter Jesus, experience revival, and be restored in His presence.');
    const loc = encodeURIComponent(locationAddress);
    const dates = `${toGCalDate(startDate)}/${toGCalDate(endDate)}`;
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${loc}`;
  }, [startDate, endDate]);
  const icsContent = React.useMemo(() => {
    const uid = 'altar-experience-2025@freedomlifechurch.ca';
    const dtStamp = toGCalDate(new Date().toISOString());
    const dtStart = toGCalDate(startDate);
    const dtEnd = toGCalDate(endDate);
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Freedom Life Church//Altar Experience 2025//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'SUMMARY:Altar Experience Conference 2025',
      'DESCRIPTION:Encounter Jesus, experience revival, and be restored in His presence.',
      `LOCATION:${locationAddress.replace(/,/g, '\\,')}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  }, [startDate, endDate, locationAddress]);
  const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

  // Sticky mobile CTA (visible when scrolled beyond hero top)
  const [showSticky, setShowSticky] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 220);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Share links
  const [pageUrl, setPageUrl] = React.useState('https://www.freedomlifechurch.ca/altar-experience');
  React.useEffect(() => {
    if (typeof window !== 'undefined') setPageUrl(window.location.href);
  }, []);
  const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const xShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Join me at Altar Experience 2025')}&url=${encodeURIComponent(pageUrl)}`;
  const mailShare = `mailto:?subject=${encodeURIComponent('Join me at Altar Experience 2025')}&body=${encodeURIComponent('Let’s go to Altar Experience 2025: ' + pageUrl)}`;

  // Pull Day 1–3 sessions from calendar
  const [sessionEvents, setSessionEvents] = React.useState([]);
  React.useEffect(() => {
    let abort = false;
    (async () => {
      try {
        const resp = await fetch('/api/events?fresh=1', { cache: 'no-store' });
        if (!resp.ok) return;
        const data = await resp.json();
        const events = Array.isArray(data.events) ? data.events : [];
        const targetDates = new Set(['2025-10-24', '2025-10-25', '2025-10-26']);
        const match = (e) =>
          targetDates.has(e.date) && /altar|experience|conference|session/i.test(`${e.title} ${e.blurb}`);
        const picked = events.filter(match).sort((a,b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
        if (!abort) setSessionEvents(picked);
      } catch {}
    })();
    return () => { abort = true; };
  }, []);

  return (
    <>
      <Head>
        <title>Altar Experience Conference 2025 · Freedom Life Church</title>
        <meta name="description" content="Encounter Jesus, experience revival, and be restored in His presence. Oct 24–26 in Edmonton. Register now for Altar Experience 2025." />
        <meta property="og:title" content="Altar Experience Conference 2025" />
        <meta property="og:description" content="Encounter Jesus, experience revival, and be restored in His presence. Oct 24–26 in Edmonton." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.freedomlifechurch.ca/altar-experience" />
        {/* JSON-LD: Event with subEvent sessions */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'Altar Experience Conference 2025',
            startDate,
            endDate,
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: {
              '@type': 'Place',
              name: 'Freedom Life Church',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '14970 114 Ave NW',
                addressLocality: 'Edmonton',
                addressRegion: 'AB',
                postalCode: 'T5M4G4',
                addressCountry: 'CA'
              }
            },
            offers: {
              '@type': 'Offer',
              price: 0,
              priceCurrency: 'CAD',
              availability: 'https://schema.org/InStock'
            },
            subEvent: [
              { '@type': 'Event', name: 'Friday Session', startDate: '2025-10-24T19:00:00-06:00', endDate: '2025-10-24T21:00:00-06:00' },
              { '@type': 'Event', name: 'Saturday Session', startDate: '2025-10-25T12:00:00-06:00', endDate: '2025-10-25T14:00:00-06:00' },
              { '@type': 'Event', name: 'Sunday Session', startDate: '2025-10-26T12:00:00-06:00', endDate: '2025-10-26T14:00:00-06:00' }
            ]
          }) }}
        />
      </Head>

      {/* Creative Hero with event image */}
    <section className="relative w-full overflow-hidden">
  <div className="relative min-h-[500px] sm:min-h-[560px] md:min-h-[640px] flex items-center">
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
            <div className="relative z-10 mx-auto h-full flex items-center py-12 sm:py-16 md:py-20 px-4 sm:px-0" style={{ maxWidth: '88rem' }}>
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
                    {/* Add-to-calendar */}
                    <div className="flex items-center gap-2 mt-2">
                      <a href={gcalHref} target="_blank" rel="noopener noreferrer" className="text-2xs sm:text-xs px-3 py-1.5 rounded-full border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600">Google</a>
                      <a href={icsHref} download="altar-experience-2025.ics" className="text-2xs sm:text-xs px-3 py-1.5 rounded-full border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600">Apple/ICS</a>
                    </div>
                  </div>
                  {/* Share strip */}
                  <div className="mt-3 flex items-center gap-3 text-2xs sm:text-xs text-neutral-600">
                    <span className="kicker text-neutral-500">Share</span>
                    <a href={fbShare} target="_blank" rel="noopener noreferrer" className="underline hover:text-flc-600">Facebook</a>
                    <a href={xShare} target="_blank" rel="noopener noreferrer" className="underline hover:text-flc-600">X</a>
                    <a href={mailShare} className="underline hover:text-flc-600">Email</a>
                  </div>
                </div>

                {/* Right: Event info card (replicated style from hero slide) */}
                <div className="md:col-span-3 md:order-none mt-6 md:mt-0">
                  <div role="region" aria-label="Event summary" className="rounded-xl sm:rounded-2xl shadow-lg overflow-hidden relative flex justify-center px-2 sm:px-2.5 md:px-3 pt-1 sm:pt-1.5 pb-3 sm:pb-3.5 md:pt-2 md:pb-5 border border-flc-200/60 bg-white/80 backdrop-blur md:scale-125 lg:scale-150 origin-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-flc-50 via-amber-50 to-neutral-100" />
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(90% 70% at 50% 0%, rgba(235,167,62,0.22) 0%, rgba(235,167,62,0) 60%)' }} />
                    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                      <Image
                        src={altarExperienceLogo}
                        alt=""
                        fill
                        className="flame-watermark select-none opacity-15 mix-blend-multiply object-contain motion-reduce:animate-none"
                        style={{ transform: 'translate(-50%, -50%) scale(2.4)', top: '50%', left: '50%', position: 'absolute', filter: 'blur(0.5px)' }}
                        draggable={false}
                        priority={false}
                      />
                    </div>
                    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto flex flex-col items-center text-center">
                      {/* Date chip */}
                      <div className="absolute right-1.5 top-1.5 sm:right-2.5 sm:top-2.5 md:right-3 md:top-3">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur border border-amber-300 text-2xs sm:text-xs font-semibold text-amber-800 shadow-sm">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          <span className="hidden xs:inline">Oct 24–26 · Edmonton</span>
                          <span className="xs:hidden">Oct 24–26</span>
                        </div>
                      </div>

                      {/* Logo */}
                      <div className="relative -mt-0.5 sm:-mt-1 -mb-0.5 sm:-mb-1 select-none pointer-events-none">
                        <div className="relative w-32 sm:w-44 md:w-80 h-16 sm:h-22 md:h-40 drop-shadow-md">
                          <Image
                            src={altarExperienceLogo}
                            alt="Altar Experience Conference Logo"
                            fill
                            sizes="(max-width:640px) 160px, (max-width:768px) 192px, 320px"
                            className="object-contain"
                            priority
                          />
                        </div>
                      </div>

                      {/* Chips row with live countdown */}
                      <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                        {(() => {
                          const start = startDate ? new Date(startDate) : null;
                          const end = endDate ? new Date(endDate) : null;
                          const items = [];
                          if (start && now < start) {
                            let diff = start.getTime() - now.getTime();
                            if (diff < 0) diff = 0;
                            const days = Math.floor(diff / (24 * 60 * 60 * 1000));
                            diff -= days * 24 * 60 * 60 * 1000;
                            const hours = Math.floor(diff / (60 * 60 * 1000));
                            diff -= hours * 60 * 60 * 1000;
                            const minutes = Math.floor(diff / (60 * 1000));
                            diff -= minutes * 60 * 1000;
                            const seconds = Math.floor(diff / 1000);
                            const pad = (n) => String(n).padStart(2, '0');
                            const label = `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
                            // Desktop/tablet: full countdown with seconds
                            items.push(
                              <span key="countdown" className="hidden md:inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-500/15 text-amber-900 border border-amber-300 text-2xs sm:text-xs font-semibold">
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/></svg>
                                {label}
                              </span>
                            );
                            // Mobile fallback: simple starts label
                            items.push(
                              <span key="countdown-mobile" className="md:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-300 text-2xs font-semibold">
                                Starts Oct 24
                              </span>
                            );
                          }
                          if (end && now <= end) {
                            items.push(
                              <span key="facts" className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/90 backdrop-blur border border-neutral-300 text-2xs sm:text-xs text-neutral-800">
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
        {/* Ambient flourishes */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: [
            'radial-gradient(circle at 10% 20%, rgba(235,167,62,0.06), rgba(235,167,62,0) 55%)',
            'radial-gradient(circle at 90% 10%, rgba(235,167,62,0.05), rgba(235,167,62,0) 55%)'
          ].join(', ')
        }} />
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '78rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
            {/* Quick facts */}
            <div className="card p-5 self-start relative overflow-hidden">
              <span className="kicker text-amber-700/80">At a glance</span>
              <h2 className="mt-1 text-lg font-semibold text-primary-900">Event Info</h2>
              <span className="absolute -left-1 top-6 bottom-6 w-1 bg-gradient-to-b from-amber-300/60 via-amber-300/20 to-transparent rounded-full" />
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
              {/* Location & parking */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-neutral-800">Location & Parking</h3>
                <p className="mt-1 text-sm text-neutral-700">Freedom Life Church · 14970 114 Ave NW, Edmonton, AB</p>
                <p className="text-xs text-neutral-500">Parking available on-site; please use the main south entrance. Doors open 30 minutes prior to each session.</p>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  <a className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium" href="https://www.google.com/maps/search/?api=1&query=14970+114+Ave+NW+Edmonton+AB+T5M+4G4" target="_blank" rel="noopener noreferrer">
                    Get Directions
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </a>
                  <div className="rounded-md overflow-hidden border border-neutral-200">
                    <iframe title="Freedom Life Church Map" aria-label="Map to Freedom Life Church" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full" style={{ minHeight: '180px', border: 0 }} src="https://www.google.com/maps?q=14970+114+Ave+NW+Edmonton+AB+T5M+4G4&output=embed" />
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-5 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-flc-500/10 blur-2xl" aria-hidden="true" />
                <div className="absolute -left-12 bottom-0 w-48 h-48 rounded-full bg-amber-300/10 blur-2xl" aria-hidden="true" />
                <span className="kicker text-amber-700/80">What to expect</span>
                <h2 className="mt-1 text-lg font-semibold text-primary-900">Details</h2>
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
              {/* Schedule at a glance */}
              <div className="card p-5">
                <span className="kicker text-amber-700/80">Schedule</span>
                <h2 className="mt-1 text-lg font-semibold text-primary-900">Schedule at a Glance</h2>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-md border border-neutral-200 p-3">
                    <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wide">Friday</p>
                    <p className="mt-1 text-neutral-800">Doors 6:30 PM</p>
                    <p className="text-neutral-700">Session 7:00–9:00 PM</p>
                  </div>
                  <div className="rounded-md border border-neutral-200 p-3">
                    <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wide">Saturday</p>
                    <p className="mt-1 text-neutral-800">Doors 11:30 AM</p>
                    <p className="text-neutral-700">Session 12:00–2:00 PM</p>
                  </div>
                  <div className="rounded-md border border-neutral-200 p-3">
                    <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wide">Sunday</p>
                    <p className="mt-1 text-neutral-800">Doors 11:30 AM</p>
                    <p className="text-neutral-700">Session 12:00–2:00 PM</p>
                  </div>
                </div>
                {/* Sessions from Calendar */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-neutral-800">Conference Sessions (from calendar)</h3>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[{label:'Day 1', date:'2025-10-24'}, {label:'Day 2', date:'2025-10-25'}, {label:'Day 3', date:'2025-10-26'}].map((d) => {
                      const ev = sessionEvents.find(e => e.date === d.date);
                      const friendly = new Date(d.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
                      return (
                        <div key={d.date} className="rounded-md border border-neutral-200 p-3 bg-white">
                          <p className="text-neutral-500 text-[11px] font-semibold uppercase tracking-wide">{d.label}</p>
                          <p className="text-sm font-semibold text-primary-900 mt-0.5">{friendly}</p>
                          <p className="text-sm text-neutral-600">{ev ? ev.time : (d.date === '2025-10-24' ? '7:00 PM' : '12:00 PM')}</p>
                          {ev ? (
                            <Link href={`/events/${ev.id}`} className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-flc-600 hover:text-flc-700">
                              View details
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                            </Link>
                          ) : (
                            <span className="mt-2 inline-block text-[12px] text-neutral-400">Coming soon</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 21 Days of Fasting & Prayer */}
              <div className="card p-5">
                <span className="kicker text-amber-700/80">Consecration</span>
                <h2 className="mt-1 text-lg font-semibold text-primary-900">21 Days of Fasting & Prayer</h2>
                <p className="mt-1 text-sm text-neutral-700"><strong>October 6 – October 26</strong></p>
                <div className="mt-2 text-sm leading-relaxed text-neutral-700 space-y-3">
                  <p>Freedom Life Church is entering into 21 days of fasting and prayer—not only to prepare for The Altar Experience Conference, but because we believe God is calling us into a season of holy consecration.</p>
                  <p><strong>Daniel Fast</strong>: We encourage a Daniel fast (fruits, vegetables, whole foods) or a thoughtful alternative as led by the Holy Spirit.</p>
                  <p>This is more than skipping meals. It’s a sacred time to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Seek God with undivided hearts</li>
                    <li>Walk in renewal and holiness</li>
                    <li>Intercede for our families, leaders, and city</li>
                    <li>Prepare for a fresh move of God at The Altar Experience</li>
                  </ul>
                  <div>
                    <p className="font-semibold text-neutral-800">3-Week Spiritual Focus</p>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Week 1: Repentance & Renewal</li>
                      <li>Week 2: Intercession & Provision</li>
                      <li>Week 3: Mission & Commissioning</li>
                    </ul>
                  </div>
                  <p className="text-neutral-700">We are setting aside distractions, humbling ourselves, and declaring: <em>"Lord, we are Yours. Set us apart for Your purpose."</em></p>
                </div>
              </div>

              {/* Kids & follow-up */}
              <div className="card p-5">
                <span className="kicker text-amber-700/80">Families</span>
                <h2 className="mt-1 text-lg font-semibold text-primary-900">Kids & Follow-up</h2>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-800">Childcare & Check-in</h3>
                    <p className="mt-1 text-neutral-700">Kids ministry is available for most sessions. Check-in opens 15 minutes before each session.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-800">Can’t make it?</h3>
                    <p className="mt-1 text-neutral-700">Watch the <a className="text-flc-600 hover:text-flc-700 underline" href="/live">livestream</a> or <a className="text-flc-600 hover:text-flc-700 underline" href="mailto:?subject=Join%20me%20at%20Altar%20Experience%202025&body=Let%E2%80%99s%20go%20to%20Altar%20Experience%202025%3A%20https%3A%2F%2Fwww.freedomlifechurch.ca%2Faltar-experience">invite a friend</a>.</p>
                  </div>
                </div>
              </div>
              {/* Removed Official Event Page embed by request */}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="mx-auto max-w-screen-xl px-4 pb-4">
          <div className="rounded-xl shadow-lg border border-neutral-200 bg-white p-3 flex items-center justify-between gap-3">
            <div className="text-xs font-medium text-neutral-700">Join us Oct 24–26</div>
            <div className="flex items-center gap-2">
              <a href="#details" className="px-3 py-1.5 rounded-md border border-neutral-300 text-neutral-700 text-xs">Details</a>
              <a href={registerUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md bg-flc-500 text-white text-xs">Register</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
