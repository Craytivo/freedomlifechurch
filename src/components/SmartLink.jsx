import React from 'react';
import Link from 'next/link';

/**
 * SmartLink
 * - href starting with '/' uses Next.js client navigation
 * - href starting with '#' performs smooth scroll to in-page anchor
 * - otherwise treated as external and opens in a new tab by default (unless target provided)
 */
const SmartLink = ({
  href,
  children,
  className = '',
  onClick,
  target,
  rel,
  scrollBehavior = 'smooth',
  role,
  ariaLabel,
  prefetch,
  ...rest
}) => {
  if (!href) return (
    <span className={className} role={role} aria-label={ariaLabel} {...rest}>
      {children}
    </span>
  );

  // In-page anchor
  if (href.startsWith('#')) {
    const handleAnchorClick = (e) => {
      if (onClick) onClick(e);
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: scrollBehavior });
      }
    };
    return (
      <a href={href} className={className} onClick={handleAnchorClick} role={role} aria-label={ariaLabel} {...rest}>
        {children}
      </a>
    );
  }

  // Internal route
  if (href.startsWith('/')) {
    return (
      <Link href={href} prefetch={prefetch} className={className} role={role} aria-label={ariaLabel} {...rest}>
        {children}
      </Link>
    );
  }

  // External link
  const externalRel = rel || 'noopener noreferrer';
  const externalTarget = target || '_blank';
  return (
    <a href={href} className={className} target={externalTarget} rel={externalRel} role={role} aria-label={ariaLabel} {...rest}>
      {children}
    </a>
  );
};

export default SmartLink;
