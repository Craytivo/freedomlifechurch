import React from 'react';

const NavigationMenu = ({ items, className = '', isMobile = false }) => {
  // Desktop: use tighter spacing with larger click targets via vertical padding
  const baseClasses = isMobile 
    ? "flex flex-col space-y-1"
    : "flex items-center gap-7"; // gap instead of space-x for future responsive tweaks

  const linkClasses = isMobile
    ? "text-neutral-700 hover:text-neutral-900 font-body font-medium py-2 px-3 rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-flc-500/60"
    : "relative inline-flex items-center h-10 font-body font-medium text-[13px] leading-none tracking-wide text-neutral-700 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-flc-500/50 transition-colors";

  return (
    <nav className={`${baseClasses} ${className}`}>
      {items.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={linkClasses}
        >
          <span className="relative">
            {item.name}
            <span className="pointer-events-none absolute -bottom-2 left-0 w-0 h-[2px] bg-flc-500 transition-all duration-300 group-hover:w-full peer-[:focus-visible]:w-full" aria-hidden="true"></span>
          </span>
        </a>
      ))}
    </nav>
  );
};

export default NavigationMenu;