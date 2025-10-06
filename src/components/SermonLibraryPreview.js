import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load the modal to keep initial bundle small
const VideoModal = dynamic(() => import('./VideoModal'), { ssr: false });

// Fetches recent videos from /api/youtube/recent (playlist preferred if set)

const formatDate = (iso) => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'});
};

const SermonLibraryPreview = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        // Request more than we display so we can filter out private/deleted entries
        const resp = await fetch('/api/youtube/recent?limit=12', { cache: 'no-store' });
        if (!resp.ok) throw new Error(`Failed: ${resp.status}`);
        const data = await resp.json();
        if (!aborted && Array.isArray(data.items)) setItems(data.items);
      } catch (e) {
        setError(e);
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, []);

  const fallback = (
    <div className="py-10 text-center text-neutral-500 text-sm">
      {error ? 'Unable to load recent messages.' : 'Loading messages…'}
    </div>
  );

  if (loading && items.length === 0) return (
    <section id="sermon-library" className="relative py-20 md:py-24 bg-neutral-50/40 content-visibility-auto">
      <div className="w-full px-0 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 mx-auto" style={{ maxWidth: '82rem' }}>
          {fallback}
        </div>
      </div>
    </section>
  );

  // Filter out common placeholder entries from playlists
  const visible = items.filter(v => {
    const t = (v.title || '').toLowerCase();
    return v.id && t !== 'private video' && t !== 'deleted video';
  });

  if (visible.length === 0) return (
    <section id="sermon-library" className="relative py-20 md:py-24 bg-neutral-50/40 content-visibility-auto">
      <div className="w-full px-0 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 mx-auto" style={{ maxWidth: '82rem' }}>
          <div className="py-10 text-center text-neutral-500 text-sm">No recent messages found.</div>
        </div>
      </div>
    </section>
  );

  const [featured, ...restAll] = visible;
  const rest = restAll.slice(0, 4); // show only 4 in right column

  return (
    <>
    <section id="sermon-library" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-neutral-50/40 via-white to-neutral-50/30 content-visibility-auto w-full">
      {/* Enhanced premium background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: [
          'radial-gradient(circle at 75% 25%, rgba(235,167,62,0.08), rgba(235,167,62,0) 60%)',
          'radial-gradient(circle at 25% 75%, rgba(235,167,62,0.05), rgba(235,167,62,0) 50%)',
          'linear-gradient(135deg, rgba(235,167,62,0.02) 0%, rgba(235,167,62,0) 40%)'
        ].join(', ')
      }} />
      <div className="absolute -inset-x-10 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" aria-hidden="true" />
      
      {/* True full-width container for mobile */}
      <div className="w-full px-0 sm:px-4 lg:px-8">
        <div className="px-0 sm:px-0 mx-auto" style={{ maxWidth: '82rem' }}>
        <div className="px-4 sm:px-0">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Stay encouraged</div>
              <h2 className="mt-2 sm:mt-3 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-2 sm:mb-3 drop-shadow-md leading-[1.1]">Recent Messages</h2>
              <p className="text-neutral-600 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed font-medium tracking-wide">Catch up on the latest teaching and explore past messages to keep growing mid‑week.</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="#sermons" className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-flc-600 hover:text-flc-700">
                View Full Library
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
              <a href="https://www.youtube.com/@FLCEdmonton?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700">
                Subscribe
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-14 items-start">
            {/* Featured */}
            <div className="lg:col-span-6">
              <div className="group relative rounded-2xl shadow-sm border border-neutral-200 overflow-hidden bg-white">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <Image
                    src={`https://img.youtube.com/vi/${featured.id}/hqdefault.jpg`}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:brightness-105 transition-all duration-300"
                    priority
                  />
                  <button
                    onClick={() => setModalVideo(featured.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors"
                    aria-label={`Play ${featured.title}`}
                  >
                    <span className="inline-flex w-16 h-16 sm:w-20 sm:h-20 items-center justify-center rounded-full bg-white/90 group-hover:bg-white shadow-lg transition-all">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-flc-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </span>
                  </button>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-flc-600 mb-2">
                    <span>Latest</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <time dateTime={featured.published} className="text-neutral-500 font-medium normal-case tracking-normal">{formatDate(featured.published)}</time>
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-primary-900 mb-2 leading-tight">
                    {featured.title}
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed line-clamp-3">{featured.description}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => setModalVideo(featured.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-sm font-semibold transition-colors"
                    >
                      Watch Now
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${featured.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-flc-600 hover:text-flc-700"
                    >
                      View on YouTube
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent List */}
            <div className="lg:col-span-6">
              <div className="space-y-4 sm:space-y-5">
                {rest.map(s => (
                  <a
                    key={s.id}
                    href={`https://www.youtube.com/watch?v=${s.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-neutral-200 bg-white hover:border-flc-500/40 hover:shadow-sm transition-colors"
                  >
                    <div className="relative w-28 sm:w-32 lg:w-40 flex-none">
                      <div className="relative w-full rounded-lg overflow-hidden bg-neutral-100" style={{ paddingBottom: '56.25%' }}>
                        <Image
                          src={`https://img.youtube.com/vi/${s.id}/hqdefault.jpg`}
                          alt={s.title}
                          fill
                          sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 160px"
                          className="object-cover group-hover:brightness-105"
                          priority={false}
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors">
                          <span className="inline-flex w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 items-center justify-center rounded-full bg-white/90 group-hover:bg-white shadow-sm">
                            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-flc-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-flc-600 mb-1">
                        <span>Recent</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300" />
                        <time dateTime={s.published} className="text-neutral-500 font-medium normal-case tracking-normal">{formatDate(s.published)}</time>
                      </div>
                      <h4 className="font-heading text-sm sm:text-[15px] md:text-base font-semibold text-primary-900 mb-1 leading-snug line-clamp-2">
                        {s.title}
                      </h4>
                      <p className="text-neutral-600 text-[11px] sm:text-[12px] md:text-[13px] leading-snug line-clamp-2 max-w-prose">{s.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
    <VideoModal open={!!modalVideo} videoId={modalVideo || ''} title="Sermon" onClose={() => setModalVideo(null)} />
    </>
  );
};

export default SermonLibraryPreview;