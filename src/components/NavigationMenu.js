import React from 'react';

const NavigationMenu = ({ items, className = '', isMobile = false, activePath = '' }) => {
  // Desktop: use tighter spacing with larger click targets via vertical padding
  const baseClasses = isMobile 
    ? "flex flex-col space-y-1"
    : "flex items-center gap-7"; // gap instead of space-x for future responsive tweaks

  const linkClasses = isMobile
    ? "text-neutral-700 hover:text-neutral-900 font-body font-medium py-2 px-3 rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-flc-500/60"
  : "relative inline-flex items-center h-10 font-body font-medium text-sm leading-none tracking-wide text-neutral-700 hover:text-neutral-900 transition-colors duration-200 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-flc-500 after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-flc-500/50";

  return (
    <nav className={`${baseClasses} ${className}`}>
      {items.map((item) => {
        const isActive = activePath === item.href;
        return (
          <a
            key={item.name}
            href={item.href}
            className={`${linkClasses} ${isActive ? 'after:w-full text-neutral-900' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="relative">{item.name}</span>
          </a>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;