import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import altarExperienceLogo from '../src/assets/logos/output-onlinepngtools.png';

const CHURCHCENTER_EVENT_ID = process.env.NEXT_PUBLIC_CHURCHCENTER_EVENT_ID || '3133697';
const buildChurchCenterEventUrl = (id) => `https://flcedmonton.churchcenter.com/registrations/events/${id}`;

export default function AltarExperiencePage() {
  const registerUrl = buildChurchCenterEventUrl(CHURCHCENTER_EVENT_ID);

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

      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        {/* Ambient gradient overlay matching hero style */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 overlay-gradient grain" />
        <div className="w-full px-0 sm:px-4 lg:px-8 pt-10 pb-8 sm:pt-12 sm:pb-10 md:pt-16 md:pb-14">
          <div className="mx-auto px-4 sm:px-0" style={{ maxWidth: '88rem' }}>
            <span className="eyebrow">Conference</span>
            {/* Logo from hero slide */}
            <div className="relative mt-2">
              <div className="relative w-28 sm:w-32 md:w-40 h-12 sm:h-14 md:h-16">
                <Image src={altarExperienceLogo} alt="Altar Experience" fill className="object-contain" priority />
              </div>
            </div>
            <h1 className="mt-2 max-w-3xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 leading-[1.1]">
              Altar Experience Conference 2025
            </h1>
            <p className="mt-3 max-w-2xl text-base sm:text-lg md:text-xl text-neutral-700 font-medium leading-relaxed">
              Theme: The Original Mandate · Oct 24–26 · Edmonton
            </p>
            <p className="mt-4 max-w-3xl text-neutral-700">
              A three-day gathering to encounter Jesus, experience revival, and be restored in His presence. Expect focused messages on renewal, surrender, and living in your Kingdom identity.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
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
        </div>
      </section>

      {/* Details */}
      <section id="details" className="relative py-8 sm:py-10 md:py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '78rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Quick facts */}
            <div className="card p-5">
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

            {/* Details + embedded page */}
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
              <div className="card p-0 overflow-hidden">
                <div className="px-5 pt-5">
                  <h2 className="text-lg font-semibold text-primary-900">Official Event Page</h2>
                  <p className="mt-1 mb-3 text-sm text-neutral-600">The content below is loaded from Church Center. If it doesn’t appear, use the button to view the event on Church Center.</p>
                </div>
                <div className="bg-white">
                  <iframe
                    title="Altar Experience — Church Center"
                    src={registerUrl}
                    referrerPolicy="no-referrer-when-downgrade"
                    loading="lazy"
                    className="w-full"
                    style={{ minHeight: '70vh', border: '0' }}
                  />
                </div>
              </div>
              <div className="text-sm">
                <a className="inline-flex items-center gap-2 text-flc-600 hover:text-flc-700 underline" href={registerUrl} target="_blank" rel="noopener noreferrer">
                  Open on Church Center
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
