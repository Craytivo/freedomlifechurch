import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchBar from './SearchBar';
import NavigationMenu from './NavigationMenu';
import MobileMenuButton from './MobileMenuButton';
import SidePanel from './SidePanel';
import GiveLink from './GiveLink';
import UserAvatar from './UserAvatar';
import Logo from './Logo';

const Header = ({ isMenuOpen, onToggleMenu, onCloseMenu }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigation = [
    { name: 'Groups', href: '/groups', section: 'Primary' },
  { name: 'Events', href: '/events', section: 'Primary' },
  { name: 'About', href: '/about', section: 'Primary' },
  ];

  // Mirror side panel data for global search (keep in sync with SidePanel.js)
  const sidePanelSections = {
    'Get Involved': [
      { name: 'Watch Online', href: '#online', desc: 'Watch messages and services' },
      { name: 'Live Stream', href: '#livestream', desc: 'Watch live' },
      { name: 'Groups', href: '#groups', desc: 'Get in groups to grow your faith' },
  // Serve removed from desktop nav; keep volunteers under Get Involved
      { name: 'Giving', href: '#giving', desc: 'Ongoing act of worship' },
      { name: 'Volunteer', href: '#volunteer', desc: 'Join a team at your local campus' },
      { name: 'Events', href: '#events', desc: 'Find events near you' },
      { name: 'Salvation', href: '#salvation', desc: 'Salvation and prayer' },
      { name: 'Next Steps', href: '#next-steps', desc: 'Grow in Next Steps' },
      { name: 'Need Prayer?', href: '#prayer', desc: 'Support through faith' },
    ],
    'Discover': [
      { name: 'Sermons', href: '#sermons' },
      { name: 'Study Guides', href: '#guides' },
      { name: 'Store', href: '#store' },
    ],
    'Ministries': [
      { name: 'Outreach', href: '#outreach', desc: 'Volunteer in your community' },
      { name: 'NextGen', href: '#nextgen', desc: 'Join our kids & high schoolers' },
      { name: 'Young Adults', href: '#young-adults', desc: 'For adults ages 18–25' },
    ],
    'Opportunities': [
      { name: 'Jobs', href: '#jobs' },
      { name: 'Apprenticeships', href: '#apprenticeships' },
      { name: 'Internship', href: '#internship' },
    ],
    'About': [
      { name: 'Freedom Life Church', href: '/about' },
      { name: 'Beliefs & Values', href: '/about#mission' },
    ],
  };

  const allSearchItems = Object.entries(sidePanelSections).flatMap(([section, items]) =>
    items.map(i => ({ ...i, section }))
  ).concat(navigation);

  const [searchQuery, setSearchQuery] = useState('');
  const filteredResults = searchQuery.trim()
    ? allSearchItems.filter(item => {
        const q = searchQuery.trim().toLowerCase();
        return item.name.toLowerCase().includes(q) || (item.desc && item.desc.toLowerCase().includes(q));
      })
    : [];
  const groupedResults = filteredResults.reduce((acc, item) => {
    acc[item.section] = acc[item.section] || [];
    acc[item.section].push(item);
    return acc;
  }, {});
  const showResults = searchQuery.length > 0;  
  const [activeIndex, setActiveIndex] = useState(-1);
  const flatResults = filteredResults; // already flat list
  const searchInputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Live service signal (Mountain Time 12:00 - 14:00)
  const [isLive, setIsLive] = useState(false);
  const computeLive = useCallback(() => {
    try {
      const now = new Date();
      // Use America/Denver for Mountain Time with DST awareness
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Denver', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(now);
      const hourPart = parts.find(p => p.type === 'hour');
      const minutePart = parts.find(p => p.type === 'minute');
      if (!hourPart || !minutePart) return false;
      const hour = parseInt(hourPart.value, 10);
      // We only need hour window check (12:00 inclusive to 14:00 exclusive)
      return hour >= 12 && hour < 14;
    } catch (e) {
      return false;
    }
  }, []);

  useEffect(() => {
    setIsLive(computeLive());
    const id = setInterval(() => {
      setIsLive(computeLive());
    }, 60000); // update each minute
    return () => clearInterval(id);
  }, [computeLive]);

  // Live badge now only shows during the defined service window (12:00–13:59 MT)

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [searchQuery]);

  const handleKeyDown = useCallback((e) => {
    if (!showResults || flatResults.length === 0) {
      if (e.key === 'Escape') {
        setSearchQuery('');
        setActiveIndex(-1);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => {
        const next = (prev + 1) % flatResults.length;
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => {
        const next = (prev - 1 + flatResults.length) % flatResults.length;
        return next;
      });
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < flatResults.length) {
        const item = flatResults[activeIndex];
        window.location.href = item.href;
        setSearchQuery('');
        setActiveIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setSearchQuery('');
      setActiveIndex(-1);
    }
  }, [showResults, flatResults, activeIndex]);

  // Ensure active item is scrolled into view
  useEffect(() => {
    if (activeIndex < 0) return;
    const container = resultsContainerRef.current;
    if (!container) return;
    const el = container.querySelector(`[data-result-index="${activeIndex}"]`);
    if (el) {
      const elTop = el.offsetTop;
      const elBottom = elTop + el.offsetHeight;
      if (elTop < container.scrollTop) {
        container.scrollTop = elTop - 8;
      } else if (elBottom > container.scrollTop + container.clientHeight) {
        container.scrollTop = elBottom - container.clientHeight + 8;
      }
    }
  }, [activeIndex]);

  const [fade, setFade] = useState(false);
  const [metaVisible, setMetaVisible] = useState(true);
  const metaRowRef = useRef(null);
  const taglineRef = useRef(null);
  const timesRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setFade(y > 40); // start fading after 40px
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Simpler width-based hide: if combined intrinsic widths + gap exceed container, hide row
  useEffect(() => {
    const measure = () => {
      const row = metaRowRef.current;
      const tag = taglineRef.current;
      const times = timesRef.current;
      if (!row || !tag || !times) return;
      const available = row.clientWidth;
      // Assume ~48px desired spacing between items
      const required = tag.scrollWidth + times.scrollWidth + 48;
      setMetaVisible(available >= required);
    };
    measure();
    window.addEventListener('resize', measure);
    const id = setInterval(measure, 500); // light periodic check to catch font loading shifts
    return () => { window.removeEventListener('resize', measure); clearInterval(id); };
  }, []);

  return (
    <header
      className="bg-white shadow-sm border-b border-neutral-100 sticky top-0 z-40 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
    >
  <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 items-center h-16 gap-4 md:flex">
          <div className="-ml-2 justify-self-start">
            <MobileMenuButton isOpen={isMenuOpen} onClick={onToggleMenu} />
          </div>
          <div className="flex-shrink-0 justify-self-center md:justify-self-auto">
            <Logo size="default" />
          </div>
          {isLive && (
            <a
              href="#livestream"
              className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
              aria-label="Live service is on. Watch livestream."
            >
              <span className="relative inline-flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 animate-ping opacity-60"></span>
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-red-600"></span>
              </span>
              <span className="tracking-wide">LIVE</span>
            </a>
          )}
          <div className="hidden md:flex flex-1 justify-center px-4 relative">
            <div className="w-full max-w-xl relative">
              <SearchBar
                placeholder="Search site navigation..."
                value={searchQuery}
                onChange={setSearchQuery}
                onKeyDown={handleKeyDown}
                inputRef={searchInputRef}
              />
              {showResults && (
                <div
                  ref={resultsContainerRef}
                  className="absolute mt-2 w-full rounded-xl border border-neutral-200 bg-white shadow-lg z-50 max-h-[60vh] overflow-y-auto py-2"
                  role="listbox"
                  aria-label="Search results"
                >
                  {filteredResults.length === 0 && (
                    <div className="py-6 text-center text-sm text-neutral-400">No results for &ldquo;{searchQuery}&rdquo;</div>
                  )}
                  {Object.entries(groupedResults).map(([section, items]) => (
                    <div key={section} className="px-3 pb-2">
                      <div className="pt-2 pb-1 px-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">{section}</div>
                      <ul className="space-y-1">
                        {items.map(item => {
                          const globalIndex = flatResults.indexOf(item);
                          const isActive = globalIndex === activeIndex;
                          return (
                            <li key={section + item.name} data-result-index={globalIndex}>
                              <a
                                href={item.href}
                                role="option"
                                aria-selected={isActive}
                                className={`block px-2 py-2 rounded-md text-sm transition-colors ${isActive ? 'bg-flc-500 text-white' : 'text-neutral-700 hover:bg-neutral-50 hover:text-flc-600'}`}
                                onMouseEnter={() => setActiveIndex(globalIndex)}
                                onMouseLeave={() => setActiveIndex(prev => prev === globalIndex ? -1 : prev)}
                                onClick={() => { setSearchQuery(''); setActiveIndex(-1); }}
                              >
                                <span className="block truncate">{item.name}</span>
                                {item.desc && <span className={`block text-[11px] ${isActive ? 'text-white/85' : 'text-neutral-500'} truncate`}>{item.desc}</span>}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu items={navigation} />
            <GiveLink />
            <UserAvatar onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} />
          </div>
          </div>
          <div
            ref={metaRowRef}
            className={`hidden md:flex items-center justify-between pb-2 -mt-1 transition-all duration-300 ${metaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none select-none h-0 overflow-hidden'}`}
            aria-hidden={!metaVisible}
          >
            <p
              ref={taglineRef}
              className={`flex items-center gap-1 font-normal italic transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'} text-[11px] md:text-[12px] tracking-tight text-neutral-500`}
            >
              <span
                aria-hidden="true"
                className="inline-block w-px h-3 bg-neutral-300 rounded-sm"
              />
              <span>A growing community pursuing presence, transformation & mission.</span>
            </p>
            <p ref={timesRef} className="text-[11px] font-normal text-neutral-500 whitespace-nowrap tracking-tight">
              Sundays 12:00 PM MST <span className="mx-1 text-neutral-300">•</span> Saturday Prayer 10:00 AM MST
            </p>
          </div>
        </div>
      </div>
  <SidePanel isOpen={isMenuOpen} onClose={onCloseMenu} />
    </header>
  );
};

export default Header;