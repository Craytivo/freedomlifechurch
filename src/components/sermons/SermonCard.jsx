import React from 'react';

const formatDuration = (duration) => {
  if (!duration || duration === 'Unknown') return 'Unknown';
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  if (hours > 0) return `${hours}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  return `${minutes}:${seconds.toString().padStart(2,'0')}`;
};

const formatDate = (date) => new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric'}).format(date);
const formatViewCount = (count) => { const n = parseInt(count)||0; if(n>=1_000_000) return `${(n/1_000_000).toFixed(1)}M`; if(n>=1_000) return `${(n/1_000).toFixed(1)}K`; return n.toString(); };

const SermonCard = ({ sermon, categoryLabel, onPlay }) => (
  <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
    <div className="relative aspect-video overflow-hidden">
      <img
        src={sermon.thumbnail}
        alt={sermon.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => onPlay?.(sermon)}
          className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-600 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
        >
          <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          <span className="sr-only">Play sermon</span>
        </button>
      </div>
      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">{formatDuration(sermon.duration)}</div>
      <div className="absolute top-2 left-2">
        <span className="px-2 py-1 bg-blue-500/90 text-white text-xs font-medium rounded-full">{categoryLabel}</span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-primary-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{sermon.title}</h3>
      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        <span>{sermon.speaker}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <span>{formatDate(sermon.date)}</span>
      </div>
      {sermon.series && (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full mb-3">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          {sermon.series}
        </div>
      )}
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          {formatViewCount(sermon.viewCount)} views
        </div>
      </div>
    </div>
  </div>
);

export default SermonCard;
