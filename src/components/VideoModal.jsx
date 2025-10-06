import React, { useEffect, useRef } from 'react';

const VideoModal = ({ open, onClose, videoId, title = 'Sermon video' }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    // Basic focus management
    const prevActive = document.activeElement;
    setTimeout(() => dialogRef.current?.focus(), 0);
    // Prevent background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (prevActive && prevActive.focus) prevActive.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`; 

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <button
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
        tabIndex={-1}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative mx-4 w-full max-w-5xl outline-none"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-10 right-0 text-white/90 hover:text-white"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-black aspect-video">
            <iframe
              title={title}
              src={src}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="bg-white px-4 py-3 flex items-center justify-between">
            <div className="text-sm font-medium text-neutral-800 truncate pr-3">{title}</div>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Watch on YouTube
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
