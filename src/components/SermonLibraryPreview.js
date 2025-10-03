import React from 'react';

// Lightweight preview of recent sermons with a primary featured message.
// Later this can be wired to a real API / YouTube playlist fetch.

const sermons = [
  {
    id: 'latest',
    title: 'Revived Hearts, Renewed Mission',
    date: '2025-09-28',
    series: 'Awakened',
    youtubeId: 'X5K8Wk7pBGw',
    description: 'A call to return to first love and step boldly into Kingdom purpose.'
  },
  {
    id: 'sr2',
    title: 'Power in Stillness',
    date: '2025-09-21',
    series: 'Awakened',
    youtubeId: 'Xp12abc1234',
    description: 'Learning to cultivate holy rest that produces spiritual authority.'
  },
  {
    id: 'sr3',
    title: 'The Furnace of Formation',
    date: '2025-09-14',
    series: 'Awakened',
    youtubeId: 'Yt09def5678',
    description: 'How trials refine and position us for greater usefulness.'
  },
  {
    id: 'sr4',
    title: 'Hearing God in a Loud World',
    date: '2025-09-07',
    series: 'Awakened',
    youtubeId: 'Zk45ghi9012',
    description: 'Practices for tuning your ear to the Shepherd.'
  }
];

const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'});

const SermonLibraryPreview = () => {
  const [featured, ...rest] = sermons;

  return (
    <section id="sermon-library" className="relative py-20 md:py-24 bg-neutral-50/40 content-visibility-auto">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: 'radial-gradient(circle at 75% 25%, rgba(235,167,62,0.07), rgba(235,167,62,0) 60%)'
      }} />
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '82rem' }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary-900 mb-3">Recent Messages</h2>
            <p className="text-neutral-600 text-base md:text-lg max-w-xl leading-relaxed">Catch up on the latest teaching and explore past messages to keep growing mid‑week.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#sermons" className="inline-flex items-center gap-2 text-sm font-medium text-flc-600 hover:text-flc-700">
              View Full Library
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Featured */}
          <div className="lg:col-span-6">
            <div className="group relative rounded-2xl shadow-sm border border-neutral-200 overflow-hidden bg-white">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <img
                  src={`https://img.youtube.com/vi/${featured.youtubeId}/hqdefault.jpg`}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:brightness-105 transition-[filter]"
                  loading="lazy"
                />
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/25 transition-colors"
                  aria-label={`Play sermon: ${featured.title}`}
                >
                  <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/90 group-hover:bg-white shadow-md">
                    <svg className="w-10 h-10 text-flc-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </span>
                </button>
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase text-flc-600 mb-2">
                  <span>{featured.series}</span>
                  <span className="w-1 h-1 rounded-full bg-flc-500" />
                  <time dateTime={featured.date} className="text-neutral-500 font-medium">{formatDate(featured.date)}</time>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-primary-900 mb-3">
                  {featured.title}
                </h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-5 max-w-prose">{featured.description}</p>
                <div className="flex flex-wrap gap-3">
                  <a href={`https://www.youtube.com/watch?v=${featured.youtubeId}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-flc-500/40">
                    Watch Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </a>
                  <a href="#sermons" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-flc-500/30">
                    Full Series
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-6 space-y-6">
            {rest.map(s => (
              <a
                key={s.id}
                href={`https://www.youtube.com/watch?v=${s.youtubeId}`}
                className="group flex gap-5 p-4 md:p-5 rounded-xl border border-neutral-200 bg-white hover:border-flc-500/50 hover:shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-flc-500/30"
              >
                <div className="relative w-40 shrink-0 rounded-md overflow-hidden">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <img
                      src={`https://img.youtube.com/vi/${s.youtubeId}/mqdefault.jpg`}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:brightness-105"
                      loading="lazy"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors">
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/90 group-hover:bg-white shadow-sm">
                        <svg className="w-5 h-5 text-flc-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-flc-600 mb-1">
                    <span>{s.series}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <time dateTime={s.date} className="text-neutral-500 font-medium normal-case tracking-normal">{formatDate(s.date)}</time>
                  </div>
                  <h4 className="font-heading text-[15px] md:text-base font-semibold text-primary-900 mb-1 leading-snug line-clamp-2">
                    {s.title}
                  </h4>
                  <p className="text-neutral-600 text-[13px] leading-snug line-clamp-2 max-w-prose">{s.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SermonLibraryPreview;
