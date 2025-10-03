import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';

// From-scratch, portal-based sidebar that reliably overlays the entire viewport
// even when scrolled, with robust z-index and proper scroll locking.
const SidePanel = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Mount guard for portals (avoids SSR mismatches)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape and lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const navigationSections = [
    {
      title: 'Get Involved',
      items: [
        { 
          name: 'Visit FLC', 
          href: '/visit', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        },
        { 
          name: 'Live Stream', 
          href: '/live', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )
        },
        { 
          name: 'Groups', 
          href: '/groups', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          )
        },
        { 
          name: 'Giving', 
          href: '/giving', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )
        },
        { 
          name: 'Volunteer', 
          href: '/volunteer', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          )
        },
        { 
          name: 'Events', 
          href: '/events', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )
        },
        { 
          name: 'Salvation', 
          href: '/salvation', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          )
        },
        { 
          name: 'Baptism', 
          href: '/baptism', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )
        },
        { 
          name: 'Need Prayer?', 
          href: '/prayer', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'Discover',
      items: [
        { 
          name: 'Sermons', 
          href: '/sermons', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )
        },
        { 
          name: 'Study Guides', 
          href: '/study-guides', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          )
        },
        { 
          name: 'Store', 
          href: '/store', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'Ministries',
      items: [
        {
          name: "Men's",
          href: '#mens',
          icon: (
            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Womens',
          href: '#womens',
          icon: (
            <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Children',
          href: '#children',
          icon: (
            <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Volunteer',
          href: '#volunteer',
          icon: (
            <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Outreach',
          href: '#outreach',
          icon: (
            <svg className="w-5 h-5 text-violet-500" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Music',
          href: '#music',
          icon: (
            <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="currentColor" />
            </svg>
          )
        }
      ]
    }
  ];

  // Search filter state for menu items
  const [searchQuery, setSearchQuery] = useState('');
  const normalized = searchQuery.trim().toLowerCase();
  const filteredSections = normalized
    ? navigationSections
        .map(section => {
          const titleMatch = section.title.toLowerCase().includes(normalized);
          if (titleMatch) return section; // show full section when title matches
          const items = section.items.filter(item => {
            const nameHit = item.name.toLowerCase().includes(normalized);
            const descHit = item.desc ? item.desc.toLowerCase().includes(normalized) : false;
            return nameHit || descHit;
          });
          return items.length ? { ...section, items } : null;
        })
        .filter(Boolean)
    : navigationSections;

  const isActiveRoute = (href) => router.pathname === href;

  if (!mounted || !isOpen) return null;

  const sidebar = (
    <div className="fixed inset-0 z-[10000]" aria-modal="true" role="dialog">
      {/* Underlay to catch clicks anywhere and close */}
      <div
        className="fixed inset-0 bg-black/50"
        style={{ zIndex: 10000 }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed top-0 left-0 h-screen w-[320px] max-w-[85vw] bg-white shadow-2xl will-change-transform transition-transform duration-300 ease-out"
        style={{ zIndex: 10001, transform: 'translateX(0)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button in the top-right of panel */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-flc-500"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation + Footer content */}
        <nav className="h-[calc(100vh-65px)] overflow-y-auto p-4 space-y-8">
          {/* Search Bar */}
          <div className="sticky top-0 z-[2] -mt-px bg-white pb-3">
            <label htmlFor="sidebar-search" className="sr-only">Search menu</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </div>
              <input
                id="sidebar-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="w-full rounded-md border border-neutral-300 pl-9 pr-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-flc-500 focus:border-flc-500"
              />
            </div>
          </div>
          <div className="space-y-8">
            {(filteredSections.length > 0 ? filteredSections : []).map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const active = isActiveRoute(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          active
                            ? 'bg-amber-50 text-amber-900 border-l-4 border-amber-600 font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                        }`}
                      >
                        <span className={`mr-3 ${active ? 'text-amber-600' : 'text-neutral-400 group-hover:text-neutral-500'}`}>
                          {item.icon}
                        </span>
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
            {normalized && filteredSections.length === 0 && (
              <div className="text-sm text-neutral-500">No matches found.</div>
            )}
          </div>

          {/* MyFLC card */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <h3 className="text-base font-semibold text-neutral-900">MyFLC</h3>
            <p className="mt-1 text-sm text-neutral-600">
              Looking to view your group details or giving history? MyFLC is our church’s portal for attenders and leaders.
            </p>
            <Link
              href="/myflc"
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-300 transition-colors"
            >
              Access MyFLC
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l10-10M17 7H7m10 0v10" />
              </svg>
            </Link>
          </div>

          {/* Contact and Social */}
          <div className="pt-2 pb-6 border-t border-neutral-200">
            <address className="not-italic text-[13px] leading-5 text-neutral-600">
              14970 114 Ave NW
              <br />
              Edmonton, AB T5M 4G4
            </address>
            <div className="mt-2 text-[13px] text-neutral-600">780-729-0399</div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.youtube.com/@FLCEdmonton"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a4 4 0 00-2.8-2.8C18.9 3 12 3 12 3s-6.9 0-8.7.4A4 4 0 00.5 6.2 41.5 41.5 0 000 12a41.5 41.5 0 00.5 5.8 4 4 0 002.8 2.8C5.1 21 12 21 12 21s6.9 0 8.7-.4a4 4 0 002.8-2.8A41.5 41.5 0 0024 12a41.5 41.5 0 00-.5-5.8zM9.75 15.5v-7l6 3.5-6 3.5z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/FLCedmonton/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073C24 5.446 18.627.073 12 .073 5.373.073 0 5.446 0 12.073 0 18.06 4.388 23.025 10.125 23.925v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/flcyeg/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.648.001 12.017.001zM8.449 16.988c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54zm7.119 0c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54z" />
                </svg>
              </a>
            </div>
            <div className="mt-4 text-[12px] text-neutral-400">© {new Date().getFullYear()} Freedom Life Church. All Rights Reserved.</div>
          </div>
        </nav>
      </div>
    </div>
  );

  return createPortal(sidebar, document.body);
};

export default SidePanel;