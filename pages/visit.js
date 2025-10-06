import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// Visit page - comprehensive guide for first-time visitors
// Expanded version of PlanVisitSection with additional helpful information

const quickFacts = [
  { 
    label: 'Sunday Service', 
    value: '12:00 PM MST', 
    details: 'Join us every Sunday for worship, teaching, and community',
    icon: (
      <svg className="w-5 h-5 text-flc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M12 22a10 10 0 110-20 10 10 0 010 20z"/>
      </svg>
    ) 
  },
  { 
    label: 'Location', 
    value: '14970 114 Ave NW, Edmonton, Alberta T5M 4G4', 
    details: 'Located in north Edmonton with easy access from major routes',
    icon: (
      <svg className="w-5 h-5 text-flc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a3 3 0 100-6 3 3 0 000 6z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.5-7.5 10.5-7.5 10.5S4.5 18 4.5 10.5A7.5 7.5 0 1119.5 10.5z"/>
      </svg>
    ) 
  },
  { 
    label: 'Kids Ministry', 
    value: 'Available for all ages', 
    details: 'Safe, engaging ministry for infants through high school. Check-in opens 15 minutes early',
    icon: (
      <svg className="w-5 h-5 text-flc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a4 4 0 108 0 4 4 0 00-8 0zm0 0v10a2 2 0 002 2h4a2 2 0 002-2V7"/>
      </svg>
    ) 
  },
  { 
    label: 'Parking', 
    value: 'Free on-site & overflow', 
    details: 'Ample parking available with accessible spaces and overflow areas',
    icon: (
      <svg className="w-5 h-5 text-flc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 6h8a3 3 0 010 6H5V6zm0 0v12M5 12h8"/>
      </svg>
    ) 
  },
];

const whatToExpect = [
  { 
    title: 'Welcoming Environment', 
    description: 'Our greeting team will help you find parking, check in kids, and answer any questions.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    )
  },
  { 
    title: 'Contemporary Worship', 
    description: 'Engaging music that draws us into God\'s presence, creating space for authentic worship.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
      </svg>
    )
  },
  { 
    title: 'Biblical Teaching', 
    description: 'Practical, life-changing messages from God\'s Word that equip you for daily life.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    )
  },
  { 
    title: 'Prayer Ministry', 
    description: 'Opportunities for personal prayer and ministry after each service.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    )
  },
];

const commonQuestions = [
  {
    question: 'What should I wear?',
    answer: 'Come as you are! We dress casually to business casual. You\'ll fit right in whether you\'re in jeans or a suit.'
  },
  {
    question: 'How long is the service?',
    answer: 'Our services typically run 75-90 minutes, including worship, teaching, and time for prayer ministry.'
  },
  {
    question: 'What about my kids?',
    answer: 'We have engaging, age-appropriate ministry for infants through high school. Check-in opens 15 minutes before service, and our team will help you get set up.'
  },
  {
    question: 'Will I be asked to do anything?',
    answer: 'Never! You\'re welcome to participate as much or as little as you\'re comfortable with. There\'s no pressure to give, stand, or participate.'
  },
  {
    question: 'How do I get connected?',
    answer: 'Visit our Connect area after service, join a small group, or serve on a team. We\'ll help you find the best next step for your journey.'
  },
  {
    question: 'Is there an offering?',
    answer: 'We do receive an offering during service, but giving is never expected from guests. This time is for our members and regular attendees.'
  },
];

const ADDRESS = '14970 114 Ave NW, Edmonton, Alberta T5M 4G4';
const GOOGLE_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

export default function VisitPage() {
  const [form, setForm] = useState({ name: '', email: '', date: '', party: '', notes: '' });
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
      const value = s.toLocaleDateString('en-CA');
      const label = s.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
      out.push({ value, label });
    }
    return out;
  }, []);

  // Lazy load map when in viewport
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

  const updateForm = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder success UI only
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Head>
        <title>Plan Your Visit – Freedom Life Church</title>
        <meta name="description" content="Planning your first visit to Freedom Life Church? Find service times, what to expect, directions, and answers to common questions." />
        <meta property="og:title" content="Plan Your Visit – Freedom Life Church" />
        <meta property="og:description" content="Join us Sundays at 12:00 PM MST. Get directions, learn what to expect, and let us know you're coming." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Enhanced premium background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: [
            'radial-gradient(circle at 15% 25%, rgba(235,167,62,0.08), rgba(235,167,62,0) 60%)',
            'radial-gradient(circle at 85% 75%, rgba(235,167,62,0.05), rgba(235,167,62,0) 50%)',
            'linear-gradient(135deg, rgba(235,167,62,0.02) 0%, rgba(235,167,62,0) 50%)'
          ].join(', ')
        }} />
        
        {/* True full-width container for mobile */}
        <div className="w-full px-0 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mx-auto" style={{ maxWidth: '80rem' }}>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider mb-6">
                First time here?
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-6 drop-shadow-md leading-[1.05]">
                Plan Your Visit
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 leading-relaxed font-medium max-w-3xl mx-auto tracking-wide">
                We know visiting a church for the first time can feel uncertain. We're here to make your experience welcoming, comfortable, and meaningful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="relative py-16 md:py-20 bg-neutral-50">
        <div className="w-full px-0 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mx-auto" style={{ maxWidth: '80rem' }}>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-4 leading-tight">
                The Essentials
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Everything you need to know for your first visit
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickFacts.map(fact => (
                <div key={fact.label} className="p-6 rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-flc-500/10 text-flc-600">
                      {fact.icon}
                    </div>
                    <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-neutral-500">{fact.label}</h3>
                  </div>
                  <p className="text-lg font-semibold text-primary-900 mb-2">{fact.value}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{fact.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="w-full px-0 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mx-auto" style={{ maxWidth: '80rem' }}>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-4 leading-tight">
                What to Expect
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Here's what a typical Sunday looks like at Freedom Life Church
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {whatToExpect.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-none w-12 h-12 rounded-xl bg-flc-500/10 text-flc-600 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary-900 mb-2">{item.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-flc-500/5 via-amber-500/5 to-flc-500/5 border border-flc-200/50">
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">Service Timeline</h3>
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-flc-600 mb-1">11:45 AM</div>
                  <div className="text-sm font-semibold text-neutral-700 mb-1">Doors Open</div>
                  <div className="text-xs text-neutral-600">Kids check-in begins</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-flc-600 mb-1">12:00 PM</div>
                  <div className="text-sm font-semibold text-neutral-700 mb-1">Service Starts</div>
                  <div className="text-xs text-neutral-600">Worship & teaching</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-flc-600 mb-1">1:15 PM</div>
                  <div className="text-sm font-semibold text-neutral-700 mb-1">Service Ends</div>
                  <div className="text-xs text-neutral-600">Connect time begins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 md:py-20 bg-neutral-50">
        <div className="w-full px-0 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mx-auto" style={{ maxWidth: '80rem' }}>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-4 leading-tight">
                Common Questions
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                We've answered the questions we hear most from first-time visitors
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {commonQuestions.map((item, index) => (
                <details key={index} className="group rounded-xl border border-neutral-200 bg-white overflow-hidden">
                  <summary className="list-none flex items-center justify-between gap-4 py-4 px-6 cursor-pointer hover:bg-neutral-50">
                    <span className="font-semibold text-primary-900">{item.question}</span>
                    <svg className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-neutral-600 leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="w-full px-0 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mx-auto" style={{ maxWidth: '80rem' }}>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Map & Location Info */}
              <div className="lg:col-span-7">
                <h2 className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-6 leading-tight">
                  Find Us
                </h2>
                
                {/* Address & Utilities */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="font-heading text-lg font-bold text-primary-900">Location</h3>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(ADDRESS);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2500);
                        } catch (e) {
                          // fallback
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-neutral-300 bg-white text-xs font-medium text-neutral-700 hover:border-flc-500 hover:text-flc-600 focus:outline-none focus:ring-2 focus:ring-flc-500/30 transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy Address'}
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-flc-600 hover:text-flc-700"
                    >
                      View Larger Map
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                  <p className="text-lg text-neutral-700 font-medium">{ADDRESS}</p>
                </div>

                {/* Map */}
                <div ref={mapRef} className="mb-8">
                  <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-[16/9] flex items-center justify-center">
                    {mapReady ? (
                      <>
                        {!mapLoaded && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 gap-3">
                            <div className="w-10 h-10 border-4 border-neutral-300 border-t-flc-500 rounded-full animate-spin" aria-label="Loading map" />
                            <span className="text-sm">Loading map…</span>
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
                        <span className="text-sm">Preparing map…</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-flc-500 hover:bg-flc-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-flc-500/40 transition-colors"
                  >
                    Get Directions
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                  <a 
                    href="tel:780-123-4567" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 font-semibold transition-colors"
                  >
                    Call Us
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* RSVP Form */}
              <div className="lg:col-span-5">
                <div className="sticky top-8">
                  <div className="relative p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <div className="absolute -inset-4 bg-gradient-to-br from-flc-500/5 via-transparent to-transparent rounded-3xl pointer-events-none" aria-hidden="true" />
                    
                    <div className="relative">
                      <div className="mb-6">
                        <h3 className="font-heading text-2xl font-bold text-primary-900 mb-2">Let Us Know You're Coming</h3>
                        <p className="text-neutral-600 leading-relaxed">We'll send you a confirmation and have someone ready to welcome you and your family.</p>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">Your Name *</label>
                          <input 
                            name="name" 
                            value={form.name} 
                            onChange={updateForm} 
                            required 
                            className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-4 py-3 bg-neutral-50 focus:bg-white transition-colors" 
                            placeholder="First and last name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Address *</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={form.email} 
                            onChange={updateForm} 
                            required 
                            className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-4 py-3 bg-neutral-50 focus:bg-white transition-colors" 
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">Sunday You're Visiting *</label>
                          <select
                            name="date"
                            value={form.date}
                            onChange={updateForm}
                            required
                            className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-4 py-3 bg-neutral-50 focus:bg-white transition-colors"
                          >
                            <option value="" disabled>Select a Sunday</option>
                            {upcomingSundays.map(d => (
                              <option key={d.value} value={d.value}>{d.label}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">Party Size (optional)</label>
                          <input 
                            type="number" 
                            name="party"
                            value={form.party}
                            onChange={updateForm}
                            min="1" 
                            max="15" 
                            placeholder="How many people?"
                            className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-4 py-3 bg-neutral-50 focus:bg-white transition-colors" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-2">Anything we should know? (optional)</label>
                          <textarea 
                            name="notes"
                            value={form.notes}
                            onChange={updateForm}
                            rows="3" 
                            placeholder="Ages of kids, accessibility needs, allergies, etc."
                            className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-4 py-3 bg-neutral-50 focus:bg-white transition-colors" 
                          />
                        </div>
                        
                        <button 
                          type="submit" 
                          className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-lg bg-flc-500 hover:bg-flc-600 text-white font-semibold text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-flc-500/40 transition-colors"
                        >
                          {submitted ? 'Thank You!' : 'Submit & Get Connected'}
                          {!submitted && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                            </svg>
                          )}
                        </button>
                        
                        {submitted && (
                          <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                            <p className="text-green-700 font-medium">We'll be in touch soon. See you Sunday!</p>
                          </div>
                        )}
                      </form>
                      
                      <div className="mt-6 pt-6 border-t border-neutral-200">
                        <p className="text-xs text-neutral-400 leading-relaxed text-center">
                          Prefer to just show up? That's perfect too! Come say hi at our Connect area after service.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}