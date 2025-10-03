import React, { useState } from 'react';

// Plan a Visit section tailored for first-time guests
// Includes quick facts, simple interest form (non-submitting placeholder), and next-step CTAs.

const quickFacts = [
  { label: 'Sunday Service', value: '12:00 PM MST' },
  { label: 'Location', value: 'Edmonton, AB' },
  { label: 'Kids Ministry', value: 'Available (Check-In opens 15 min early)' },
  { label: 'Parking', value: 'Free on-site & overflow' },
];

const nextSteps = [
  { label: 'Get Directions', href: '#directions' },
  { label: 'What to Expect', href: '#expect' },
  { label: 'Message Archive', href: '#sermons' },
];

const PlanVisitSection = () => {
  const [form, setForm] = useState({ name: '', email: '', date: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder success UI only
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="plan-visit" className="relative py-20 md:py-28 bg-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: 'radial-gradient(circle at 24% 18%, rgba(235,167,62,0.07), rgba(235,167,62,0) 60%)'
      }} />
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '78rem' }}>
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Left: Intro & Facts */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-900 mb-5">
                Plan Your Visit
              </h2>
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl">
                We know visiting a church for the first time can feel uncertain. We’ve made it simple. Let us know you’re coming and our team will greet you, help your family check in, and answer any questions.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {quickFacts.map(f => (
                <div key={f.label} className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/60 hover:bg-white transition-colors">
                  <p className="text-[11px] uppercase tracking-wide text-neutral-500 font-semibold mb-1">{f.label}</p>
                  <p className="text-sm text-neutral-800 font-medium leading-snug">{f.value}</p>
                </div>
              ))}
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
              Prefer to just show up? That’s perfect too—come say hi at the Connect area after service.
            </div>
          </div>

          {/* Right: Simple RSVP Form */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-flc-500/5 via-transparent to-transparent rounded-2xl pointer-events-none" aria-hidden="true" />
            <form onSubmit={handleSubmit} className="relative p-6 rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="mb-5">
                <h3 className="font-heading text-xl font-semibold text-primary-900 mb-1">Let Us Know You’re Coming</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">We’ll send you a short confirmation and have someone ready to welcome you.</p>
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
                  <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Approx. Date Visiting</label>
                  <input type="date" name="date" value={form.date} onChange={update} className="w-full rounded-md border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/30 text-sm px-3 py-2 bg-neutral-50 focus:bg-white transition-colors" />
                </div>
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-md bg-flc-500 hover:bg-flc-600 text-white font-semibold text-sm tracking-wide shadow-sm focus:outline-none focus:ring-2 focus:ring-flc-500/40 transition-colors">
                {submitted ? 'Submitted!' : 'Submit & Connect'}
                {!submitted && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>}
              </button>
              {submitted && (
                <p className="mt-3 text-center text-[13px] text-flc-600 font-medium">We’ll be in touch soon. See you Sunday!</p>
              )}
              <div className="mt-5 text-[11px] text-neutral-400 leading-relaxed">
                This form does not store data yet. Replace with your integration (Church Center, custom API, or email automation) later.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanVisitSection;
