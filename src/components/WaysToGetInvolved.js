import React from 'react';
import Link from 'next/link';
import Heading from './Heading';

const items = [
  {
    key: 'groups',
    title: 'Groups',
    blurb: 'Find community and grow in faith together.',
    href: 'https://freedomlifechurch.netlify.app/groups',
    external: true,
    color: 'text-indigo-600',
    tint: 'bg-indigo-50',
    bg: 'bg-indigo-500',
    dot: 'bg-indigo-600'
  },
  {
    key: 'nextgen',
    title: 'Kids & Youth',
    blurb: 'A safe, fun space to grow in Jesus.',
    href: 'https://freedomlifechurch.netlify.app/groups/children',
    external: true,
    color: 'text-emerald-600', // Kids = green like sidebar
    tint: 'bg-emerald-50',
    bg: 'bg-emerald-500',
    dot: 'bg-emerald-600'
  },
  {
    key: 'serve',
    title: 'Serve / Volunteer',
    blurb: 'Use your gifts to build the church.',
    href: 'https://freedomlifechurch.netlify.app/groups/volunteer',
    external: true,
    color: 'text-amber-600',
    tint: 'bg-amber-50',
    bg: 'bg-amber-500',
    dot: 'bg-amber-600'
  },
  {
    key: 'prayer',
    title: 'Prayer Requests',
    blurb: 'We would love to pray with you.',
    href: 'https://freedomlifechurch.netlify.app/prayer',
    external: true,
    color: 'text-violet-600',
    tint: 'bg-violet-50',
    bg: 'bg-violet-500',
    dot: 'bg-violet-600'
  },
  {
    key: 'baptism',
    title: 'Baptism',
    blurb: 'Take your next step in following Jesus.',
    href: 'https://freedomlifechurch.netlify.app/baptism',
    external: true,
    color: 'text-blue-600',
    tint: 'bg-blue-50',
    bg: 'bg-blue-500',
    dot: 'bg-blue-600'
  },
  {
    key: 'giving',
    title: 'Giving',
    blurb: 'Partner with the mission of FLC.',
    href: 'https://freedomlifechurch.netlify.app/giving',
    external: true,
    color: 'text-rose-600',
    tint: 'bg-rose-50',
    bg: 'bg-rose-500',
    dot: 'bg-rose-600'
  }
];

const Card = ({ item, spanClass = '' }) => (
  <div className={`card card-hover relative ${spanClass} p-5 sm:p-6 md:p-6 overflow-hidden`}> 
    {/* Faint color blob in the top-right */}
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -top-6 -right-6 w-28 h-28 rounded-full ${item.bg} opacity-15 blur-[36px]`}
    />
    <div className="flex flex-col">
      {/* Title pill without icon */}
      <div className="inline-flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${item.tint} ${item.color}`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${item.dot}`} />
          {item.title}
        </span>
      </div>
      <h3 className="mt-3 font-heading text-lg sm:text-xl font-semibold text-primary-900 leading-snug">
        {item.blurb}
      </h3>
      <div className="pt-3">
        <Link
          href={item.href}
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-flc-600"
          aria-label={`Learn more about ${item.title}`}
        >
          Learn more
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </div>
  </div>
);

const WaysToGetInvolved = () => {
  return (
    <section className="relative py-10 md:py-14 bg-white">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">For every age & season</span>
          <Heading as="h2" size="md" align="center" className="mt-3">A place for you and your family</Heading>
          <p className="mt-2 text-neutral-700 leading-relaxed">
            Discover belonging for every season of life: vibrant kids & youth ministries, authentic community for adults, and meaningful ways to serve together as a family.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const singleInLastRowLg = items.length % 3 === 1 && isLast;
            const singleInLastRowSm = items.length % 2 === 1 && isLast;
            const spanClass = `${singleInLastRowSm ? 'sm:col-span-2' : ''} ${singleInLastRowLg ? 'lg:col-span-3' : ''}`.trim();
            return <Card key={item.key} item={item} spanClass={spanClass} />;
          })}
        </div>

        <div className="mt-8 sm:mt-10 flex justify-center">
          <Link href="#next-steps" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-neutral-300 text-neutral-800 hover:border-flc-500 hover:text-flc-600 text-sm font-semibold">
            Explore all next steps
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WaysToGetInvolved;
