import React, { useState, useRef, useEffect } from 'react';

// Plan a Visit section tailored for first-time guests
// Includes quick facts, simple interest form (non-submitting placeholder), and next-step CTAs.

const quickFacts = [
  { label: 'Sunday Service', value: '12:00 PM MST', icon: (
    <svg className="w-4 h-4 text-flc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M12 22a10 10 0 110-20 10 10 0 010 20z"/></svg>
  ) },
  { label: 'Location', value: '14970 114 Ave NW, Edmonton, Alberta T5M 4G4', icon: (
    <svg className="w-4 h-4 text-flc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11a3 3 0 100-6 3 3 0 000 6z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.5-7.5 10.5-7.5 10.5S4.5 18 4.5 10.5A7.5 7.5 0 1119.5 10.5z"/></svg>
  ) },
  { label: 'Kids Ministry', value: 'Available (Check-In opens 15 min early)', icon: (
    <svg className="w-4 h-4 text-flc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a4 4 0 108 0 4 4 0 00-8 0zm0 0v10a2 2 0 002 2h4a2 2 0 002-2V7"/></svg>
  ) },
  { label: 'Parking', value: 'Free on-site & overflow', icon: (
    <svg className="w-4 h-4 text-flc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 6h8a3 3 0 010 6H5V6zm0 0v12M5 12h8"/></svg>
  ) },
];

const nextSteps = [
  { label: 'Get Directions', href: 'https://www.google.com/maps/search/?api=1&query=14970+114+Ave+NW+Edmonton+Alberta+T5M+4G4' },
  { label: 'What to Expect', href: '#expect' },
  { label: 'Message Archive', href: '#sermons' },
];

const ADDRESS = '14970 114 Ave NW, Edmonton, Alberta T5M 4G4';
// Use Google Maps embed with address query to ensure the pin is correct without manual lat/lon
const GOOGLE_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

const PlanVisitSection = () => {
  const [form, setForm] = useState({ name: '', email: '', date: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  // Build a list of upcoming Sundays (next 12)
  const upcomingSundays = React.useMemo(() => {
    const out = [];
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const day = start.getDay(); // 0 = Sunday
    const daysUntilNextSunday = (7 - day) % 7; // 0 if today Sunday, else days left
    const firstSunday = new Date(start);
    firstSunday.setDate(firstSunday.getDate() + daysUntilNextSunday);
    for (let i = 0; i < 12; i++) {
      const s = new Date(firstSunday);
      s.setDate(firstSunday.getDate() + i * 7);
      // ISO date (YYYY-MM-DD) in local time
      const value = s.toLocaleDateString('en-CA');
      const label = s.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
      out.push({ value, label });
    }
    return out;
  }, []);

  // Lazy load map when in viewport (only if API key placeholder replaced OR we decide to show no-key iframe alt)
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setMapReady(true);
          observer.disconnect();
        }
      });
    }, { rootMargin: '200px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder success UI only
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="plan-visit" className="relative py-20 md:py-28 bg-white w-full">
      {/* Enhanced premium background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: [
          'radial-gradient(circle at 24% 18%, rgba(235,167,62,0.08), rgba(235,167,62,0) 60%)',
          'radial-gradient(circle at 75% 85%, rgba(235,167,62,0.04), rgba(235,167,62,0) 50%)',
          'linear-gradient(135deg, rgba(235,167,62,0.02) 0%, rgba(235,167,62,0) 50%)'
        ].join(', ')
      }} />
      
      {/* True full-width container for mobile */}
      <div className="w-full px-0 sm:px-6 lg:px-8">
        <div className="px-0 sm:px-0 mx-auto" style={{ maxWidth: '78rem' }}>
        <div className="px-4 sm:px-0">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-start">
            {/* Left: Intro & Facts */}
            <div className="lg:col-span-7">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">First time here?</div>
                <h2 className="mt-3 font-heading text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-4 drop-shadow-md leading-[1.1]">
                  Plan Your Visit
                </h2>
                <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl font-medium tracking-wide">
                  We know visiting a church for the first time can feel uncertain. Let us know you're coming and we'll save you a spot, help your family check in, and make sure you feel at home.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-10">
                {quickFacts.map(f => (
                  <div key={f.label} className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/60 hover:bg-white transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      {f.icon}
                      <p className="text-[11px] uppercase tracking-wide text-neutral-500 font-semibold">{f.label}</p>
                    </div>
                    <p className="text-sm text-neutral-800 font-medium leading-snug">{f.value}</p>
                  </div>
                ))}
              </div>
              {/* What to Expect */}
              <div className="mb-10 rounded-xl border border-neutral-200 bg-neutral-50/70">
                <div className="p-5 md:p-6">
                  <h3 className="font-heading text-base font-semibold text-primary-900 mb-3">What to Expect</h3>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm text-neutral-700">
                    <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" /><span>Friendly team to welcome and guide you.</span></li>
                    <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" /><span>Service is about 75–90 minutes.</span></li>
                    <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" /><span>Modern worship and practical Bible teaching.</span></li>
                    <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" /><span>Kids check‑in opens 15 minutes before service.</span></li>
                  </ul>
                </div>
              </div>
              {/* Map + Address Utilities */}
              <div ref={mapRef} className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-heading text-base font-semibold text-primary-900 m-0">Location</h3>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(ADDRESS);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2500);
                      } catch (e) {
                        // fallback: select text? (skipped for brevity)
                      }
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-neutral-300 bg-white text-[12px] font-medium text-neutral-700 hover:border-flc-500 hover:text-flc-600 focus:outline-none focus:ring-2 focus:ring-flc-500/30 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy Address'}
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-flc-600 hover:text-flc-700"
                  >
                    View Larger Map
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </a>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-[16/9] flex items-center justify-center">
                  {mapReady ? (
                    <>
                      {!mapLoaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 gap-3">
                          <div className="w-10 h-10 border-4 border-neutral-300 border-t-flc-500 rounded-full animate-spin" aria-label="Loading map" />
                          <span className="text-[12px]">Loading map…</span>
                        </div>
                      )}
                      <iframe
                        title={`Map showing location of ${ADDRESS}`}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={GOOGLE_EMBED_URL}
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        onLoad={() => setMapLoaded(true)}
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 gap-3">
                      <div className="w-10 h-10 border-4 border-neutral-300 border-t-flc-500 rounded-full animate-spin" aria-label="Preparing map" />
                      <span className="text-[12px]">Preparing map…</span>
                    </div>
                  )}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-white/25" aria-hidden="true" />
                </div>
                <p className="mt-3 text-[13px] text-neutral-600 leading-relaxed max-w-md">{ADDRESS}</p>
                {/* Google Maps embed includes built-in attribution */}
              </div>
              <div className="flex flex-wrap gap-4 mb-6">
                {nextSteps.map(s => (
                  <a key={s.label} href={s.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium transition-colors">
                    <span>{s.label}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </a>
                ))}
              </div>
              <div className="text-[13px] text-neutral-500">
                Prefer to just show up? That's perfect too—come say hi at the Connect area after service.
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-flc-500/40">
                  Ask a Question
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium">
                  Get Directions
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            {/* Right: Simple RSVP Form */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-flc-500/5 via-transparent to-transparent rounded-2xl pointer-events-none" aria-hidden="true" />
              <form onSubmit={handleSubmit} className="relative p-6 rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="mb-5">
                  <h3 className="font-heading text-xl font-semibold text-primary-900 mb-1">Let Us Know You're Coming</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">We'll send you a short confirmation and have someone ready to welcome you.</p>
                </div>
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Name</label>
                    <input name="name" value={form.name} onChange={update} required className="w-full rounded-md border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/30 text-sm px-3 py-2 bg-neutral-50 focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Email</label>
                    <input type="email" name="email" value={form.email} onChange={update} required className="w-full rounded-md border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/30 text-sm px-3 py-2 bg-neutral-50 focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Sunday You're Visiting</label>
                    <select
                      name="date"
                      value={form.date}
                      onChange={update}
                      required
                      className="w-full rounded-md border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/30 text-sm px-3 py-2 bg-neutral-50 focus:bg-white transition-colors"
                    >
                      <option value="" disabled>Select a Sunday</option>
                      {upcomingSundays.map(d => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">How many in your party? (optional)</label>
                    <input type="number" min="1" max="12" placeholder="2" className="w-full rounded-md border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/30 text-sm px-3 py-2 bg-neutral-50 focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Anything we can prepare? (optional)</label>
                    <textarea rows="3" placeholder="Allergies, accessibility, ages of kids, etc." className="w-full rounded-md border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/30 text-sm px-3 py-2 bg-neutral-50 focus:bg-white transition-colors" />
                  </div>
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-md bg-flc-500 hover:bg-flc-600 text-white font-semibold text-sm tracking-wide shadow-sm focus:outline-none focus:ring-2 focus:ring-flc-500/40 transition-colors">
                  {submitted ? 'Submitted!' : 'Submit & Connect'}
                  {!submitted && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>}
                </button>
                {submitted && (
                  <p className="mt-3 text-center text-[13px] text-flc-600 font-medium">We'll be in touch soon. See you Sunday!</p>
                )}
                <div className="mt-5 text-[11px] text-neutral-400 leading-relaxed">
                  This form does not store data yet. Replace with your integration (Church Center, custom API, or email automation) later.
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default PlanVisitSection;