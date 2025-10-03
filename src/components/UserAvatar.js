import React, { useState, useMemo } from 'react';

// A more polished avatar component with:
// - Optional image (imageUrl prop)
// - Fallback to initials (name prop) or a default flame glyph
// - Solid neutral background (no gradient)
// - Focus ring + hover elevation
// - Graceful image error handling
// Future enhancement: status dot, user menu popover

const UserAvatar = ({ onClick, imageUrl, name }) => {
  const [imgError, setImgError] = useState(false);

  const initials = useMemo(() => {
    if (!name) return 'FL'; // Default brand initials
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase()).join('');
  }, [name]);

  const showImage = imageUrl && !imgError;

  return (
    <button
      onClick={onClick}
      type="button"
      className="relative group inline-flex items-center justify-center w-9 h-9 rounded-full focus:outline-none focus:ring-2 focus:ring-flc-500 transition-all duration-200"
      aria-label={name ? `${name} menu` : 'User menu'}
    >
      <span
        className="relative inline-flex w-9 h-9 rounded-full overflow-hidden select-none text-[11px] font-medium tracking-wide uppercase items-center justify-center text-neutral-700 bg-neutral-200 border border-neutral-300 group-hover:border-neutral-400 transition-colors"
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name || 'User'}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            draggable="false"
          />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
        <span className="sr-only">{name || 'User'}</span>
      </span>
    </button>
  );
};

export default UserAvatar;