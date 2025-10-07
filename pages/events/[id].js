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

      {/* Hero banner placeholder (could be replaced with image) */}
      <section className="relative h-48 md:h-64 bg-gradient-to-b from-neutral-200 to-neutral-100">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(235,167,62,0.12), rgba(235,167,62,0) 55%)' }} aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />
      </section>

      <section className="relative -mt-8 md:-mt-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-flc-600">{event.category}</div>
                <h1 className="mt-1 font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-primary-900">{event.title}</h1>
                <p className="mt-3 text-neutral-700 leading-relaxed">{event.blurb}</p>

                <hr className="my-5 border-neutral-200" />

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-primary-900">Location</h3>
                    <p className="text-sm text-neutral-700">{event.locationName}</p>
                    <p className="text-sm text-neutral-600">{event.address}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-primary-900">Date & Time</h3>
                    <p className="text-sm text-neutral-700">{dateLabel}</p>
                    <p className="text-sm text-neutral-600">{event.time}</p>
                  </div>
                  {event.provides?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-primary-900">This Event Provides</h3>
                      <ul className="mt-1 space-y-1 text-sm text-neutral-700">
                        {event.provides.map(p => (
                          <li key={p} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-flc-500" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={gmaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium">
                    Directions
                  </a>
                  <button type="button" onClick={() => navigator.clipboard?.writeText(`${event.locationName}, ${event.address}`)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium">
                    Copy Address
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-primary-900">{event.locationName}</div>
                <p className="text-[13px] text-neutral-600">{event.address}</p>
                <div className="mt-3 text-[13px] text-neutral-700">{dateLabel}</div>
                <div className="text-[13px] text-neutral-500">{event.time}</div>
                <div className="mt-3 flex items-center gap-2">
                  <a href={gmaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-[12px] font-medium">Directions</a>
                  <button type="button" onClick={() => navigator.clipboard?.writeText(`${event.locationName}, ${event.address}`)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-[12px] font-medium">Copy</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm">
            <Link href="/events" className="text-flc-600 hover:text-flc-700">← Back to Events</Link>
          </div>
        </div>
      </section>
    </>
  );
}
