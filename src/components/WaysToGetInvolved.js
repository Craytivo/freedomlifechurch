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
  <div className={`group relative rounded-2xl overflow-hidden shadow-sm border border-neutral-200/60 bg-white/90 backdrop-blur-sm ${spanClass} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-flc-500/30 focus-within:-translate-y-1 focus-within:shadow-lg focus-within:shadow-black/5 focus-within:border-flc-500/30 focus-within:ring-2 focus-within:ring-flc-500/20`}>
    {/* Enhanced background mark with gradient */}
    <div className={`absolute -right-12 -top-12 w-56 h-56 rounded-full bg-gradient-to-br ${item.bgMark} opacity-60 blur-xl`} aria-hidden="true" />
    <div className={`absolute -right-8 -top-8 w-40 h-40 rounded-full ${item.bgMark} opacity-40`} aria-hidden="true" />
    
    {/* Premium corner accent */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/60 to-transparent" aria-hidden="true" />
    
    <div className="relative p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col h-[220px] sm:h-[240px] md:h-[276px]">
      {/* Enhanced icon with premium styling */}
      <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-white via-white to-neutral-50 border border-neutral-200/80 shadow-md ${item.color} group-hover:shadow-lg transition-all duration-300`}>
        <div className="transform group-hover:scale-110 transition-transform duration-300">
          {item.icon}
        </div>
      </div>
      
      <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500 mb-3 sm:mb-4 mt-4">{item.title}</div>
      
      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-primary-900 leading-tight mb-auto">
        <span className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 bg-clip-text text-transparent group-hover:from-primary-800 group-hover:via-primary-700 group-hover:to-flc-600 transition-all duration-300">
          {item.blurb}
        </span>
      </h3>
      
      <div className="pt-4 sm:pt-5">
        <Link
          href={item.href}
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="inline-flex items-center text-sm sm:text-base font-bold text-primary-900 hover:text-flc-600 focus:outline-none group-hover:text-flc-600 transition-colors duration-300"
          aria-label={`Learn more about ${item.title}`}
        >
          Learn more
          <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-flc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </div>
  </div>
);

const WaysToGetInvolved = () => {
  return (
    <section className="relative bg-gradient-to-b from-neutral-50 via-white to-neutral-50/40 py-8 sm:py-12 md:py-16 overflow-hidden w-full">
      {/* Enhanced premium background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-flc-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-400/[0.05] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-flc-500/[0.01] via-transparent to-amber-400/[0.01] rounded-full blur-3xl" />
      </div>
      
      {/* True full-width container for mobile with premium desktop spacing */}
      <div className="relative w-full px-0 sm:px-4 lg:px-8">
        <div className="px-0 sm:px-0 mx-auto" style={{ maxWidth: '88rem' }}>
        <div className="px-4 sm:px-0">
          <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-flc-500/10 via-flc-500/5 to-amber-500/10 border border-flc-500/20 text-flc-700 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-flc-500" aria-hidden="true" />
            For every age & season
          </div>
          <h2 className="mt-5 sm:mt-6 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 tracking-tight leading-[1.05] drop-shadow-lg">
            A place for you
            <span className="block bg-gradient-to-r from-flc-600 via-flc-500 to-amber-500 bg-clip-text text-transparent mt-2">and your family</span>
          </h2>
          <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-neutral-600 leading-relaxed font-semibold max-w-4xl mx-auto tracking-wide">
            Discover belonging for every season of life: vibrant kids & youth ministries, authentic community for adults, and meaningful ways to serve together as a family.
          </p>
        </div>

        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const singleInLastRowLg = items.length % 3 === 1 && isLast; // span full width on lg
            const singleInLastRowSm = items.length % 2 === 1 && isLast; // span full width on sm
            const spanClass = `${singleInLastRowSm ? 'sm:col-span-2' : ''} ${singleInLastRowLg ? 'lg:col-span-3' : ''}`.trim();
            return <Card key={item.key} item={item} spanClass={spanClass} />;
          })}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link href="#next-steps" className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-neutral-300/60 bg-white/80 backdrop-blur-sm text-primary-900 hover:border-flc-500/60 hover:text-flc-600 hover:bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-flc-500/30 text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-300">
            Explore All Next Steps
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-flc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default WaysToGetInvolved;
