import React, { useEffect, useRef } from 'react';

const VideoModal = ({ open, videoId, title = 'Video', onClose }) => {
  const closeRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Focus close button on mount
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-label="Close video"
      />
      {/* Container */}
      <div className="relative mx-4 w-full max-w-4xl">
        <div className="relative w-full rounded-lg overflow-hidden shadow-xl bg-black" style={{ paddingBottom: '56.25%' }}>
          {videoId && (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
        <div className="absolute -top-12 right-0 flex items-center gap-2">
          <a
            href={videoId ? `https://www.youtube.com/watch?v=${videoId}` : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md text-sm text-white/90 hover:text-white border border-white/30"
          >
            Open on YouTube
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-md bg-white text-neutral-800 text-sm font-semibold hover:bg-neutral-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
