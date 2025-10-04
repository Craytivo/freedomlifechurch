import React from 'react';
import Link from 'next/link';

const items = [
  {
    key: 'groups',
    title: 'Groups',
    blurb: 'Find community and grow in faith together.',
    href: '#groups',
    color: 'text-blue-600',
    bgMark: 'bg-blue-500/10',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    key: 'nextgen',
    title: 'Kids & Youth',
    blurb: 'A safe, fun space to grow in Jesus.',
    href: '#nextgen',
    color: 'text-purple-600',
    bgMark: 'bg-purple-500/10',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a4 4 0 108 0 4 4 0 00-8 0zm0 0v10a2 2 0 002 2h4a2 2 0 002-2V7M16 11a3 3 0 116 0 3 3 0 01-6 0zm0 0v6a2 2 0 002 2h2a2 2 0 002-2v-2" />
      </svg>
    )
  },
  {
    key: 'serve',
    title: 'Serve / Volunteer',
    blurb: 'Use your gifts to build the church.',
    href: '#volunteer',
    color: 'text-green-600',
    bgMark: 'bg-green-500/10',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v7m8-7v7M12 3v8m0 0l-3-3m3 3l3-3" />
      </svg>
    )
  },
  {
    key: 'prayer',
    title: 'Prayer Requests',
    blurb: 'We would love to pray with you.',
    href: '#prayer',
    color: 'text-cyan-600',
    bgMark: 'bg-cyan-500/10',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    key: 'baptism',
    title: 'Baptism',
    blurb: 'Take your next step in following Jesus.',
    href: '#baptism',
    color: 'text-orange-600',
    bgMark: 'bg-orange-500/10',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15s3 2 9 2 9-2 9-2m-3-6a6 6 0 11-12 0 6 6 0 0112 0z" />
      </svg>
    )
  },
  {
    key: 'giving',
    title: 'Giving',
    blurb: 'Partner with the mission of FLC.',
    href: 'https://flcedmonton.churchcenter.com/giving',
    external: true,
    color: 'text-amber-600',
    bgMark: 'bg-amber-500/10',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  }
];

const Card = ({ item, spanClass = '' }) => (
  <div className={`relative rounded-xl overflow-hidden shadow-sm border border-neutral-200 bg-white group ${spanClass} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-flc-500/30 focus-within:-translate-y-0.5 focus-within:shadow-md focus-within:border-flc-500/30 focus-within:ring-2 focus-within:ring-flc-500/30`}>
    {/* Soft background mark */}
    <div className={`absolute -right-10 -top-10 w-48 h-48 rounded-full ${item.bgMark}`} aria-hidden="true" />
    <div className="relative p-5 md:p-6 lg:p-7 flex flex-col h-[236px] md:h-[256px]">
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/90 border border-neutral-200 shadow-sm ${item.color}`}>
        {item.icon}
      </div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-2">{item.title}</div>
      <h3 className="text-xl md:text-2xl font-extrabold text-neutral-900 leading-snug">
        <span className="bg-gradient-to-br text-transparent bg-clip-text from-neutral-900 to-neutral-700">{item.blurb}</span>
      </h3>
      <div className="mt-auto pt-4">
        <Link
          href={item.href}
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="inline-flex items-center text-sm font-semibold text-neutral-900 hover:text-flc-600 focus:outline-none"
          aria-label={`Learn more about ${item.title}`}
        >
          Learn more
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </div>
  </div>
);

const WaysToGetInvolved = () => {
  return (
    <section className="bg-neutral-50 py-12 md:py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">For every age</div>
          <h2 className="mt-3 font-heading text-3xl md:text-4xl font-extrabold text-neutral-900">A place for you and your family</h2>
          <p className="mt-2 text-neutral-600">Find belonging for every season: vibrant kids & youth, authentic community for adults, and meaningful ways to serve together.</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const singleInLastRowLg = items.length % 3 === 1 && isLast; // span full width on lg
            const singleInLastRowSm = items.length % 2 === 1 && isLast; // span full width on sm
            const spanClass = `${singleInLastRowSm ? 'sm:col-span-2' : ''} ${singleInLastRowLg ? 'lg:col-span-3' : ''}`.trim();
            return <Card key={item.key} item={item} spanClass={spanClass} />;
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="#next-steps" className="inline-flex items-center px-5 py-2.5 rounded-md border border-neutral-300 bg-white text-neutral-800 hover:border-flc-500 hover:text-flc-600 font-medium focus:outline-none focus:ring-2 focus:ring-flc-500/30">
            See all Next Steps
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WaysToGetInvolved;
