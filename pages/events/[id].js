import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { findEventById, listEventIds } from '../../src/lib/icsEvents';
import { normalizeEvent } from '../../src/lib/eventsUtil';

export async function getStaticPaths() {
  // Reduce build load: defer page generation to first request
  // If you want to pre-render a handful, you can add them to paths.
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const event = await findEventById(params.id);
    if (!event) return { notFound: true, revalidate: 60 };
    return { props: { event }, revalidate: 300 };
  } catch (e) {
    return { notFound: true, revalidate: 60 };
  }
}

export default function EventDetail({ event }) {
  // Force scroll to top on mount (mobile browsers sometimes preserve scroll)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        // Double-tap to counter history restoration
        setTimeout(() => window.scrollTo(0, 0), 0);
      } catch {}
    }
  }, []);

  if (!event) return null;
  const dateObj = new Date(event.date);
  const dateLabel = dateObj.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`;

  return (
    <>
      <Head>
        <title>{`${event.title} – Freedom Life Church`}</title>
        <meta name="description" content={event.blurb} />
      </Head>

      {/* Premium, minimal hero */}
      <section className="relative py-10 md:py-14 bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: 'radial-gradient(60% 40% at 20% 10%, rgba(235,167,62,0.06) 0%, rgba(235,167,62,0) 70%)'
        }} />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">{event.category}</span>
              <span className="text-[12px] text-neutral-500">{dateLabel} · {event.time}</span>
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-extrabold tracking-tight text-primary-900">{event.title}</h1>
            {event.blurb && (
              <p className="mt-3 text-neutral-700 text-base md:text-lg leading-relaxed">{event.blurb}</p>
            )}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="relative pb-14 md:pb-20 bg-white">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Location</div>
                    <div className="mt-1 text-sm font-semibold text-primary-900">{event.locationName || 'TBA'}</div>
                    {event.address && <div className="text-sm text-neutral-600">{event.address}</div>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={gmaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-[12px] font-semibold">Open in Maps</a>
                      {event.address && (
                        <button type="button" onClick={() => navigator.clipboard?.writeText(`${event.locationName}, ${event.address}`)} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-[12px] font-semibold">Copy Address</button>
                      )}
                    </div>
                  </div>
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Date & Time</div>
                    <div className="mt-1 text-sm font-semibold text-primary-900">{dateLabel}</div>
                    <div className="text-sm text-neutral-600">{event.time}</div>
                  </div>
                </div>

                {event.provides?.length > 0 && (
                  <div className="mt-5">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 mb-2">This event provides</div>
                    <div className="flex flex-wrap gap-2">
                      {event.provides.map(p => (
                        <span key={p} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-neutral-200 text-[12px] text-neutral-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 text-sm">
                <Link href="/events" className="text-flc-600 hover:text-flc-700">← Back to Events</Link>
              </div>
            </div>

            {/* Side summary */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-primary-900">{event.category}</div>
                <div className="mt-1 text-[13px] text-neutral-700">{dateLabel} · {event.time}</div>
                {event.locationName && <div className="mt-2 text-[13px] text-neutral-600">{event.locationName}</div>}
                {event.address && <div className="text-[13px] text-neutral-500">{event.address}</div>}
                <div className="mt-3 flex items-center gap-2">
                  <a href={gmaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-[12px] font-medium">Directions</a>
                  {event.address && (
                    <button type="button" onClick={() => navigator.clipboard?.writeText(`${event.locationName}, ${event.address}`)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-[12px] font-medium">Copy</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
