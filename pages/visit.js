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

      {/* Premium Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-40 bg-gradient-to-br from-primary-900 via-primary-800 to-flc-600 overflow-hidden">
        {/* Enhanced premium background elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-white/[0.02] via-transparent to-amber-400/[0.05] rounded-full blur-3xl" />
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-flc-600/20 via-transparent to-amber-500/20 animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* True full-width container for mobile */}
        <div className="w-full px-0 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mx-auto" style={{ maxWidth: '80rem' }}>
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold uppercase tracking-wider mb-8 shadow-lg">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                First time here?
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 drop-shadow-2xl leading-[0.9]">
                <span className="block">You're</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200">Welcome Here</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed font-medium max-w-4xl mx-auto tracking-wide mb-10 drop-shadow-lg">
                Every Sunday is a fresh opportunity to encounter Jesus, connect with community, and discover your purpose.
              </p>
              
              {/* Quick action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <a
                  href="#rsvp"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-primary-900 hover:bg-neutral-50 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Let Us Know You're Coming
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
                <a
                  href="#essentials"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-lg transition-all duration-300"
                >
                  View Service Details
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </a>
              </div>
              
              {/* Service highlight */}
              <div className="mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                <div className="grid sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-black text-amber-300 mb-1">12:00 PM</div>
                    <div className="text-white/90 font-medium">Sunday Service</div>
                    <div className="text-white/70 text-sm">MST · Every Week</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-amber-300 mb-1">75-90</div>
                    <div className="text-white/90 font-medium">Minutes</div>
                    <div className="text-white/70 text-sm">Worship & Teaching</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-amber-300 mb-1">ALL</div>
                    <div className="text-white/90 font-medium">Ages Welcome</div>
                    <div className="text-white/70 text-sm">Kids Ministry Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Information - Redesigned */}
      <section id="essentials" className="relative py-16 md:py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="w-full px-0 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mx-auto" style={{ maxWidth: '80rem' }}>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-4 leading-tight">
                Everything You Need to Know
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Your complete guide to visiting Freedom Life Church
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {quickFacts.map(fact => (
                <div key={fact.label} className="group p-6 rounded-2xl border border-neutral-200 bg-white hover:shadow-lg hover:border-flc-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-flc-500 to-flc-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                      {fact.icon}
                    </div>
                    <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-neutral-500">{fact.label}</h3>
                  </div>
                  <p className="text-xl font-bold text-primary-900 mb-2">{fact.value}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{fact.details}</p>
                </div>
              ))}
            </div>

            {/* Service Timeline - Enhanced */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-flc-500/5 via-amber-500/5 to-flc-500/5 border border-flc-200/50 shadow-lg">
              <h3 className="font-heading text-2xl font-black text-primary-900 mb-6 text-center">Your Sunday Experience</h3>
              <div className="grid sm:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="relative mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-flc-500 to-flc-600 flex items-center justify-center text-white font-black text-xl mb-4 shadow-lg">
                    11:45
                    <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="font-bold text-primary-900 mb-1">Doors Open</div>
                  <div className="text-sm text-neutral-600">Kids check-in begins • Coffee available</div>
                </div>
                <div className="text-center">
                  <div className="relative mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center text-white font-black text-xl mb-4 shadow-lg">
                    12:00
                    <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="font-bold text-primary-900 mb-1">Service Begins</div>
                  <div className="text-sm text-neutral-600">Worship, teaching & prayer</div>
                </div>
                <div className="text-center">
                  <div className="relative mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-flc-600 to-amber-500 flex items-center justify-center text-white font-black text-xl mb-4 shadow-lg">
                    1:15
                    <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-4.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-4.5c0-2.33-4.67-3.5-7-3.5z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="font-bold text-primary-900 mb-1">Connect Time</div>
                  <div className="text-sm text-neutral-600">Coffee, conversation & community</div>
                </div>
              </div>
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

      {/* Location & RSVP - Side by Side */}
      <section id="rsvp" className="relative py-16 md:py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="w-full px-0 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mx-auto" style={{ maxWidth: '80rem' }}>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Map & Location Info - Larger */}
              <div className="lg:col-span-8">
                <h2 className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-8 leading-tight">
                  Find Us & Get Directions
                </h2>
                
                {/* Address & Utilities */}
                <div className="mb-6 p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="font-heading text-xl font-bold text-primary-900">Our Location</h3>
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:border-flc-500 hover:text-flc-600 focus:outline-none focus:ring-2 focus:ring-flc-500/30 transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy Address'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-flc-600 hover:text-flc-700"
                    >
                      Open in Maps
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  </div>
                  <p className="text-lg text-neutral-700 font-medium mb-4">{ADDRESS}</p>
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

                {/* Map */}
                <div ref={mapRef}>
                  <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-[16/9] flex items-center justify-center shadow-lg">
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
              </div>

              {/* RSVP Form - Compact */}
              <div className="lg:col-span-4">
                <div className="sticky top-8">
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-flc-500 to-flc-600 text-white shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none" />
                    
                    <div className="relative">
                      <div className="mb-6">
                        <h3 className="font-heading text-2xl font-bold mb-2">Let Us Know You're Coming</h3>
                        <p className="text-white/90 leading-relaxed">We'll have someone ready to welcome you and help with anything you need.</p>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-white/90 mb-2">Your Name *</label>
                          <input 
                            name="name" 
                            value={form.name} 
                            onChange={updateForm} 
                            required 
                            className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm focus:border-white/40 focus:ring-2 focus:ring-white/20 px-4 py-3 text-white placeholder-white/60 transition-colors" 
                            placeholder="First and last name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-white/90 mb-2">Email Address *</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={form.email} 
                            onChange={updateForm} 
                            required 
                            className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm focus:border-white/40 focus:ring-2 focus:ring-white/20 px-4 py-3 text-white placeholder-white/60 transition-colors" 
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-white/90 mb-2">Sunday You're Visiting *</label>
                          <select
                            name="date"
                            value={form.date}
                            onChange={updateForm}
                            required
                            className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm focus:border-white/40 focus:ring-2 focus:ring-white/20 px-4 py-3 text-white transition-colors"
                          >
                            <option value="" disabled className="text-neutral-700">Select a Sunday</option>
                            {upcomingSundays.map(d => (
                              <option key={d.value} value={d.value} className="text-neutral-700">{d.label}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-white/90 mb-2">Party Size</label>
                            <input 
                              type="number" 
                              name="party"
                              value={form.party}
                              onChange={updateForm}
                              min="1" 
                              max="15" 
                              placeholder="How many?"
                              className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm focus:border-white/40 focus:ring-2 focus:ring-white/20 px-4 py-3 text-white placeholder-white/60 transition-colors" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-white/90 mb-2">Special Notes</label>
                            <input 
                              name="notes"
                              value={form.notes}
                              onChange={updateForm}
                              placeholder="Kids ages, etc."
                              className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm focus:border-white/40 focus:ring-2 focus:ring-white/20 px-4 py-3 text-white placeholder-white/60 transition-colors" 
                            />
                          </div>
                        </div>
                        
                        <button 
                          type="submit" 
                          className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-lg bg-white text-flc-600 hover:bg-neutral-50 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                          {submitted ? 'Thank You!' : 'Submit & Get Connected'}
                          {!submitted && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                            </svg>
                          )}
                        </button>
                        
                        {submitted && (
                          <div className="text-center p-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                            <p className="text-white font-medium">We'll be in touch soon. See you Sunday!</p>
                          </div>
                        )}
                      </form>
                      
                      <div className="mt-6 pt-6 border-t border-white/20">
                        <p className="text-xs text-white/70 leading-relaxed text-center">
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