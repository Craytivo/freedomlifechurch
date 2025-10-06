/* global Map Set Promise */
import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { loadEventsFromICS } from '../src/lib/icsEvents';

// Build relevant filters dynamically from event data
function classifyEvent(e) {
  const tags = new Set();
  const title = (e.title || '').toLowerCase();
  const blurb = (e.blurb || '').toLowerCase();
  const text = `${title} ${blurb}`;

  if (/\b(sunday\s+service|service)\b/.test(text)) tags.add('Services');
  if (/\bprayer\b/.test(text)) tags.add('Prayer');
  if (/(small\s*group|\bgroups?\b|bible)/.test(text)) tags.add('Groups');
  if (/(women|women's|ladies)/.test(text)) tags.add('Women');
  if (/(men|men's)/.test(text)) tags.add('Men');
  if (/(child|children|kids|youth|vbs|vacation\s*bible)/.test(text)) tags.add('Kids & Youth');
  if (tags.size === 0) tags.add('Special');

  try {
    const d = new Date(e.date);
    if (!isNaN(d)) {
      const dayName = d.toLocaleString(undefined, { weekday: 'long' });
      tags.add(dayName);
    }
  } catch (err) {
    // ignore parse errors; tags remain as derived from text
  }

  return Array.from(tags);
}

function classNames(...a) { return a.filter(Boolean).join(' '); }

function monthKey(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }

function buildCalendar(baseDate) {
  // returns array of Date covering 6 weeks grid for the current month view
  const start = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const end = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);
  const startOfGrid = new Date(start);
  startOfGrid.setDate(start.getDate() - ((start.getDay() + 6) % 7)); // Monday as first day (Mon=0)
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(startOfGrid);
    d.setDate(startOfGrid.getDate() + i);
    days.push(d);
  }
  return { start, end, days };
}

export default function EventsPage({ initialEvents }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [clientEvents, setClientEvents] = useState(null);
  const [loadingLive, setLoadingLive] = useState(false);
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const { start, days } = useMemo(() => buildCalendar(cursor), [cursor]);
  const monthKeyStr = monthKey(cursor);

  // Public subscription links
  const ICS_PUBLIC_URL = 'https://calendar.google.com/calendar/ical/8e73fa46e8c3ad6c7a7411573ace4e8ab8c2edf600abc7c72cc3dc82cf38a9eb%40group.calendar.google.com/public/basic.ics';
  const GOOGLE_CAL_LINK = 'https://calendar.google.com/calendar/u/0/r?cid=8e73fa46e8c3ad6c7a7411573ace4e8ab8c2edf600abc7c72cc3dc82cf38a9eb@group.calendar.google.com';

  // Use client-fetched events if available; otherwise fall back to SSG-provided events
  const events = clientEvents ?? initialEvents;

  // Client-side hydrate: fetch from API to ensure live site matches local even if SSG missed events
  React.useEffect(() => {
    let abort = false;
    const shouldFetch = process.env.NODE_ENV === 'production' ? true : (!initialEvents || initialEvents.length === 0);
    if (!shouldFetch) return;
    setLoadingLive(true);
    (async () => {
      try {
        const resp = await fetch('/api/events', { cache: 'no-store' });
        if (!resp.ok) throw new Error('Failed to load events');
        const data = await resp.json();
        if (!abort && Array.isArray(data.events) && data.events.length) {
          setClientEvents(data.events);
        }
        // If still empty, retry once after a short delay in case of cold starts
        if (!abort && (!data.events || data.events.length === 0)) {
          await new Promise(r => setTimeout(r, 800));
          const r2 = await fetch('/api/events', { cache: 'no-store' });
          if (r2.ok) {
            const d2 = await r2.json();
            if (Array.isArray(d2.events) && d2.events.length) setClientEvents(d2.events);
          }
        }
      } catch (e) {
        // ignore; fallback embed will handle UI
      } finally {
        if (!abort) setLoadingLive(false);
      }
    })();
    return () => { abort = true; };
  }, [initialEvents]);
  const { tagIndex, filters } = useMemo(() => {
    const tagIndex = new Map(); // id -> tags[]
    const counts = new Map();
    for (const e of events) {
      const tags = classifyEvent(e);
      tagIndex.set(e.id, tags);
      for (const t of tags) counts.set(t, (counts.get(t) || 0) + 1);
    }
    // Order filters by a sensible priority then by count
    const priority = new Map([
      ['Services', 1],
      ['Prayer', 2],
      ['Groups', 3],
      ['Kids & Youth', 4],
      ['Women', 5],
      ['Men', 6],
      ['Special', 7],
      ['Sunday', 10], ['Wednesday', 11], ['Friday', 12], ['Saturday', 13], ['Monday', 14], ['Tuesday', 15], ['Thursday', 16],
    ]);
    const filters = Array.from(counts.entries())
      .sort((a, b) => (priority.get(a[0]) ?? 100) - (priority.get(b[0]) ?? 100) || b[1] - a[1])
      .map(([name]) => name);
    return { tagIndex, filters };
  }, [events]);

  // Color mapping for categories/tags
  const tagBgColors = {
    'Men': 'bg-blue-600',
    'Women': 'bg-pink-500',
    'Kids & Youth': 'bg-emerald-600',
    'Prayer': 'bg-violet-600',
    'Groups': 'bg-indigo-600',
    'Services': 'bg-amber-600',
    'Special': 'bg-neutral-400'
  };
  const tagTextColors = {
    'Men': 'text-blue-600',
    'Women': 'text-pink-500',
    'Kids & Youth': 'text-emerald-600',
    'Prayer': 'text-violet-600',
    'Groups': 'text-indigo-600',
    'Services': 'text-amber-600',
    'Special': 'text-neutral-500'
  };
  const tagBorderColors = {
    'Men': 'border-blue-600',
    'Women': 'border-pink-500',
    'Kids & Youth': 'border-emerald-600',
    'Prayer': 'border-violet-600',
    'Groups': 'border-indigo-600',
    'Services': 'border-amber-600',
    'Special': 'border-neutral-400'
  };
  const colorPriority = ['Men','Women','Kids & Youth','Prayer','Groups','Services','Special'];
  const eventBgColor = (e) => {
    const tags = (tagIndex.get(e.id) || []);
    for (const t of colorPriority) if (tags.includes(t)) return tagBgColors[t];
    return 'bg-neutral-400';
  };
  const eventTextColor = (e) => {
    const tags = (tagIndex.get(e.id) || []);
    for (const t of colorPriority) if (tags.includes(t)) return tagTextColors[t];
    return 'text-neutral-500';
  };

  const filterButtonClasses = (name, active) => {
    if (name === 'All') {
      return active
        ? 'bg-flc-500 text-white border-flc-500'
        : 'border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600';
    }
    const text = tagTextColors[name];
    const border = tagBorderColors[name];
    if (!text || !border) {
      return active
        ? 'bg-neutral-800 text-white border-neutral-800'
        : 'border-neutral-300 text-neutral-700 hover:border-neutral-500 hover:text-neutral-800';
    }
    return active
      ? `${border} ${text.replace('text-','bg-')} text-white`
      : `${border} ${text} bg-white hover:opacity-90`;
  };

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return events;
    return events.filter(e => (tagIndex.get(e.id) || []).includes(activeFilter));
  }, [events, tagIndex, activeFilter]);
  const byDate = useMemo(() => {
    const map = new Map();
    for (const e of filtered) {
      const k = e.date;
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(e);
    }
    return map;
  }, [filtered]);

  const visibleList = filtered.filter(e => e.date.slice(0,7) === monthKeyStr);
  const dayEvents = selectedDate ? byDate.get(selectedDate.toLocaleDateString('en-CA')) || [] : [];

  // Simple upcoming highlights (top 3)
  const upcoming = useMemo(() => {
    const todayKey = new Date().toLocaleDateString('en-CA');
    return events
      .filter(e => e.date >= todayKey)
      .sort((a,b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
      .slice(0, 3);
  }, [events]);

  const categoryIcon = (name) => {
    const cls = 'w-4 h-4';
    switch ((name || '').toLowerCase()) {
      case 'services':
        return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M12 3v18"/></svg>);
      case 'prayer':
        return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>);
      case 'groups':
        return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2a5 5 0 019.288-1.857"/></svg>);
      case 'kids & youth':
        return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6l7 4-7 4-7-4 7-4z"/></svg>);
      case 'women':
        return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M12 12v8M9 21h6"/></svg>);
      case 'men':
        return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="15" r="6"/><path d="M15 9l6-6M15 3h6v6"/></svg>);
      default:
        return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>);
    }
  };

  const monthLabel = cursor.toLocaleString(undefined, { month: 'long', year: 'numeric' });

  const goPrev = () => setCursor(c => new Date(c.getFullYear(), c.getMonth()-1, 1));
  const goNext = () => setCursor(c => new Date(c.getFullYear(), c.getMonth()+1, 1));

  return (
    <>
      <Head>
        <title>Events – Freedom Life Church</title>
        <meta name="description" content="See upcoming events at Freedom Life Church and find your next step." />
      </Head>

      <section className="relative py-12 md:py-16 bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: 'radial-gradient(circle at 12% 8%, rgba(235,167,62,0.06), rgba(235,167,62,0) 55%)'
        }} />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">What’s happening</span>
              <h1 className="mt-2 font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-primary-900">Events</h1>
              <p className="mt-2 text-neutral-700 max-w-2xl">Find opportunities to connect, serve, and grow. Browse highlights, filter by category, or tap a date to see what’s on. Services happen every Sunday at 12:00 PM—everyone’s welcome.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                key="All"
                type="button"
                onClick={() => { setActiveFilter('All'); setSelectedDate(null); }}
                className={classNames(
                  'px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors',
                  filterButtonClasses('All', activeFilter === 'All')
                )}
                aria-pressed={activeFilter === 'All'}
              >
                All
              </button>
              {filters.map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => { setActiveFilter(f); setSelectedDate(null); }}
                  className={classNames(
                    'px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors',
                    filterButtonClasses(f, activeFilter === f)
                  )}
                  aria-pressed={activeFilter === f}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Subscription actions */}
          <div className="mb-6 flex flex-wrap gap-3">
            <a
              href={ICS_PUBLIC_URL}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-semibold"
              target="_blank" rel="noopener noreferrer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Subscribe (ICS)
            </a>
            <a
              href={GOOGLE_CAL_LINK}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-sm font-semibold"
              target="_blank" rel="noopener noreferrer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5h18v14H3z"/></svg>
              Add to Google
            </a>
          </div>

          {/* Highlights */}
          {upcoming.length > 0 && (
            <div className="mb-8 grid md:grid-cols-3 gap-4">
              {upcoming.map((e) => (
                <Link key={`hi-${e.id}`} href={`/events/${e.id}`} className="group rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm p-4 hover:border-flc-500/40 hover:shadow-sm transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-flc-500/10 text-flc-700">
                      {categoryIcon(e.category)}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-wide text-flc-600 font-semibold">Featured</div>
                      <h3 className="mt-0.5 font-heading text-base font-semibold text-primary-900 group-hover:text-flc-600 truncate">{e.title}</h3>
                      <div className="mt-0.5 text-[12px] text-neutral-600">{new Date(e.date).toLocaleDateString(undefined,{ month:'short', day:'numeric' })} · {e.time}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Calendar + List */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Calendar */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
                  <button onClick={goPrev} aria-label="Previous month" className="p-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <div className="text-sm font-semibold text-primary-900">{monthLabel}</div>
                  <button onClick={goNext} aria-label="Next month" className="p-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-px bg-neutral-200">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                    <div key={d} className="bg-neutral-50 text-[11px] font-semibold uppercase tracking-wide text-neutral-500 py-2 text-center">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-px bg-neutral-200">
                  {days.map((d,i) => {
                    const inMonth = d.getMonth() === start.getMonth();
                    const key = d.toLocaleDateString('en-CA');
                    const has = (byDate.get(key) || []).length > 0;
                    const selected = selectedDate && key === selectedDate.toLocaleDateString('en-CA');
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDate(new Date(d))}
                        className={classNames(
                          'relative min-h-[72px] bg-white px-2 py-1 text-left focus:outline-none focus:ring-2 focus:ring-flc-500/40',
                          !inMonth && 'opacity-45',
                          selected && 'ring-2 ring-flc-500/50'
                        )}
                        aria-pressed={selected}
                      >
                        <div className="text-[11px] font-semibold text-neutral-500">{d.getDate()}</div>
                        {has && <div className="absolute bottom-1 left-2 flex gap-1">
                          {(byDate.get(key) || []).slice(0,3).map((ev, idx) => (
                            <span key={idx} className={`w-1.5 h-1.5 rounded-full ${eventBgColor(ev)}`} />
                          ))}
                          {(byDate.get(key) || []).length > 3 && <span className="text-[10px] text-neutral-400">+{(byDate.get(key) || []).length - 3}</span>}
                        </div>}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-neutral-600">
                  {colorPriority
                    .filter(name => filters.includes(name))
                    .map(name => (
                      <div key={`legend-${name}`} className="inline-flex items-center gap-1.5">
                        <span className={`inline-block w-2 h-2 rounded-full ${tagBgColors[name] || 'bg-neutral-400'}`} />
                        <span className="capitalize">{name}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Day details */}
              {selectedDate && (
                <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-4">
                  <div className="text-sm font-semibold text-primary-900 mb-2">{selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                  {(dayEvents.length === 0) ? (
                    <div className="text-sm text-neutral-500">No events on this day.</div>
                  ) : (
                    <ul className="space-y-3">
                      {dayEvents.map(e => (
                        <li key={e.id}>
                          <Link href={`/events/${e.id}`} className="flex items-start gap-3 group rounded-md px-1 py-0.5 -mx-1 hover:bg-neutral-50">
                            <span className={`mt-1 inline-flex w-2 h-2 rounded-full ${eventBgColor(e)}`} />
                            <div>
                              <div className="text-sm font-semibold text-primary-900 group-hover:text-flc-600">{e.title}</div>
                              <div className="text-[12px] text-neutral-600">{e.time} · {e.locationName}</div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* List */}
            <div className="lg:col-span-7">
              <div className="grid md:grid-cols-2 gap-4">
                {visibleList.length === 0 ? (
                  <div className="col-span-full text-neutral-500 text-sm space-y-3">
                    {loadingLive && (
                      <div>Loading live events…</div>
                    )}
                    {!loadingLive && (
                      <div>
                        No events found for this month. Try another month or category, or subscribe to the calendar to stay up to date.
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={ICS_PUBLIC_URL}
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-[12px] font-semibold"
                        target="_blank" rel="noopener noreferrer"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        ICS
                      </a>
                      <a
                        href={GOOGLE_CAL_LINK}
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-[12px] font-semibold"
                        target="_blank" rel="noopener noreferrer"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5h18v14H3z"/></svg>
                        Google
                      </a>
                    </div>
                  </div>
                ) : visibleList.map(e => (
                  <Link key={e.id} href={`/events/${e.id}`} className="group rounded-2xl border border-neutral-200 bg-white p-4 md:p-5 hover:border-flc-500/40 hover:shadow-sm transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide font-semibold">
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md bg-neutral-100 ${eventTextColor(e)}`}>
                            {categoryIcon(e.category)}
                          </span>
                          <span className={`truncate ${eventTextColor(e)}`}>
                            {e.category}
                          </span>
                        </div>
                        <h3 className="mt-1 font-heading text-lg font-semibold text-primary-900 group-hover:text-flc-600">{e.title}</h3>
                        <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{e.blurb}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="inline-flex flex-col items-center justify-center px-2.5 py-1.5 rounded-md bg-neutral-50 border border-neutral-200 text-neutral-700">
                          <span className="text-[11px] font-semibold uppercase tracking-wide">{new Date(e.date).toLocaleString(undefined,{ month:'short'})}</span>
                          <span className="text-base font-bold text-primary-900">{new Date(e.date).getDate()}</span>
                        </div>
                        <div className="mt-1 text-[12px] text-neutral-500">{e.time}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Map view removed as requested */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  try {
    const initialEvents = await loadEventsFromICS();
    // If SSG was able to load events, ship with ISR
    if (Array.isArray(initialEvents) && initialEvents.length > 0) {
      return { props: { initialEvents }, revalidate: 60 * 5 };
    }
  } catch (e) {
    // Log and fall back to client hydration
    console.warn('getStaticProps: ICS fetch failed at build time', e);
  }
  // As a fallback, return empty and let client hydrate below.
  return { props: { initialEvents: [] }, revalidate: 60 * 5 };
}

// Extra safety: server-side runtime fallback for platforms blocking ICS at build
// Expose /events-ssr route by switching to SSR if env flag is set; otherwise rely on ISR + client hydrate.
// If you want guaranteed server fetching at request time, uncomment below and comment getStaticProps.
// export async function getServerSideProps() {
//   try {
//     const initialEvents = await loadEventsFromICS();
//     return { props: { initialEvents } };
//   } catch {
//     return { props: { initialEvents: [] } };
//   }
// }
