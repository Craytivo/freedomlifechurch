import React, { useMemo, useState } from 'react';
import Head from 'next/head';

// Example events data (replace with CMS/API when ready)
const baseEvents = [
  {
    id: 'sun-service',
    title: 'Sunday Worship Experience',
    date: '2025-10-05', // YYYY-MM-DD
    time: '12:00 PM',
    location: 'FLC Campus',
    category: 'Church-wide',
    href: '#plan-visit',
    blurb: 'Join us for worship, teaching, and community.'
  },
  {
    id: 'prayer-friday',
    title: 'Friday Prayer Gathering',
    date: '2025-10-10',
    time: '7:00 AM & 7:00 PM',
    location: 'FLC Campus',
    category: 'Prayer',
    href: '#prayer',
    blurb: 'Start and end your Friday in agreement with the house.'
  },
  {
    id: 'youth-night',
    title: 'Youth Night',
    date: '2025-10-11',
    time: '6:30 PM',
    location: 'FLC Campus',
    category: 'NextGen',
    href: '#nextgen',
    blurb: 'A high-energy night for grades 6–12 to grow in faith and friendships.'
  },
  {
    id: 'groups-week',
    title: 'Groups Week',
    date: '2025-10-14',
    time: 'Various',
    location: 'Across the City',
    category: 'Groups',
    href: '#groups',
    blurb: 'Find your people and grow spiritually together.'
  },
  {
    id: 'serve-day',
    title: 'Serve Day: Community Outreach',
    date: '2025-10-18',
    time: '9:00 AM',
    location: 'TBA',
    category: 'Outreach',
    href: '#outreach',
    blurb: 'Be the hands and feet of Jesus in our city.'
  }
];

const categories = ['All', 'Church-wide', 'Prayer', 'Groups', 'NextGen', 'Outreach'];

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

export default function EventsPage() {
  const [activeCat, setActiveCat] = useState('All');
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const { start, end, days } = useMemo(() => buildCalendar(cursor), [cursor]);
  const monthKeyStr = monthKey(cursor);

  const events = baseEvents; // swap with fetched data later
  const filtered = events.filter(e => activeCat === 'All' || e.category === activeCat);
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
              <p className="mt-2 text-neutral-700 max-w-2xl">Find opportunities to connect, serve, and grow. Filter by category or browse the calendar.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setActiveCat(cat); setSelectedDate(null); }}
                  className={classNames(
                    'px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors',
                    activeCat === cat ? 'bg-flc-500 text-white border-flc-500' : 'border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600'
                  )}
                  aria-pressed={activeCat === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

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
                          {(byDate.get(key) || []).slice(0,3).map((_, idx) => (
                            <span key={idx} className="w-1.5 h-1.5 rounded-full bg-flc-500" />
                          ))}
                          {(byDate.get(key) || []).length > 3 && <span className="text-[10px] text-neutral-400">+{(byDate.get(key) || []).length - 3}</span>}
                        </div>}
                      </button>
                    );
                  })}
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
                        <li key={e.id} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex w-2 h-2 rounded-full bg-flc-500" />
                          <div>
                            <div className="text-sm font-semibold text-primary-900">{e.title}</div>
                            <div className="text-[12px] text-neutral-600">{e.time} · {e.location}</div>
                          </div>
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
                  <div className="col-span-full text-neutral-500 text-sm">No events found for this month.</div>
                ) : visibleList.map(e => (
                  <a key={e.id} href={e.href} className="group rounded-2xl border border-neutral-200 bg-white p-4 md:p-5 hover:border-flc-500/40 hover:shadow-sm transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] uppercase tracking-wide text-flc-600 font-semibold">{e.category}</div>
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
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
