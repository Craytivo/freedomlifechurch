import React from 'react';

export default function PrayerSection() {
  return (
    <section id="prayer" className="relative py-10 sm:py-14 md:py-16 bg-neutral-50">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: 'radial-gradient(circle at 85% 20%, rgba(235,167,62,0.08), rgba(235,167,62,0) 55%)'
      }} />
      <div className="relative mx-auto px-3 sm:px-4 lg:px-8" style={{ maxWidth: '78rem' }}>
        <div className="max-w-3xl">
          <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Prayer</span>
          <h2 className="mt-1.5 sm:mt-2 font-heading text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-primary-900">We would love to pray with you</h2>
          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-neutral-700">Share a request or a testimony. Our team prays throughout the week and at gatherings.</p>
        </div>

        <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <a
            href="https://flcedmonton.churchcenter.com/people/forms/12345"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 hover:border-flc-500/40 hover:shadow-sm transition-colors"
          >
            <div className="flex items-start gap-2.5 sm:gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-flc-500/10 text-flc-600 border border-flc-200">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8m-8 4h5M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H9l-4 4v10a2 2 0 002 2z"/></svg>
              </span>
              <div>
                <h3 className="font-semibold text-primary-900 text-sm sm:text-base">Submit a Prayer Request</h3>
                <p className="text-xs sm:text-sm text-neutral-600">Let us know how we can be praying for you.</p>
              </div>
            </div>
          </a>

          <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-flc-500/10 text-flc-600 border border-flc-200">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M12 22a10 10 0 110-20 10 10 0 010 20z"/></svg>
              </span>
              <div className="flex-1">
                <h3 id="prayer-gathering" className="font-semibold text-primary-900 text-sm sm:text-base">Prayer Gathering</h3>
                <p className="text-xs sm:text-sm text-neutral-600">Fridays · 7:00 AM & 7:00 PM · Sanctuary</p>
                <p className="mt-1 text-xs sm:text-sm text-neutral-600">Join us as we agree in prayer for our church and city.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
