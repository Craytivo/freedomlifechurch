import React, { useEffect, useState, useMemo } from 'react';
import SearchBar from './SearchBar';

const SidePanel = ({ isOpen, onClose, navigation }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const [query, setQuery] = useState('');

  const sectionHeading = 'uppercase tracking-wide text-[11px] font-semibold text-neutral-500 mb-2 flex items-center justify-between';
  const linkBase = 'flex items-center gap-2 px-2 py-2 rounded-md text-sm text-neutral-700 hover:text-flc-600 hover:bg-neutral-50 transition-colors duration-150';
  const iconCircle = 'w-5 h-5 flex items-center justify-center text-neutral-400';

  // Raw data definitions for sections
  const data = useMemo(() => ({
    getInvolved: [
      { label: 'Watch Church Online', href: '#online' },
      { label: 'Live Stream', href: '#livestream' },
      { label: 'Growth', href: '#growth' },
      { label: 'Giving', href: '#giving' },
      { label: 'Volunteer', href: '#volunteer' },
      { label: 'Events', href: '#events' },
      { label: 'Salvation', href: '#salvation' },
      { label: 'Baptism', href: '#baptism' },
      { label: 'Need Prayer', href: '#prayer' },
    ],
    discover: [
      { label: 'Sermons', href: '#sermons' },
      { label: 'Study Guides', href: '#guides' },
      { label: 'Store', href: '#store' },
    ],
    ministries: [
      { label: 'Men', href: '#men', dot: 'bg-blue-600' },
      { label: 'Women', href: '#women', dot: 'bg-pink-500' },
      { label: 'Children', href: '#children', dot: 'bg-yellow-500' },
      { label: 'Outreach', href: '#outreach', dot: 'bg-green-500' },
      { label: 'Music', href: '#music', dot: 'bg-purple-500' },
    ],
    about: [
      { label: 'Freedom Life Church', href: '#freedom-life-church' },
      { label: 'Beliefs & Values', href: '#beliefs-&-values' },
    ]
  }), []);

  const lowerQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!lowerQuery) return data;
    const filterList = (items) => items.filter(i => i.label.toLowerCase().includes(lowerQuery));
    return {
      getInvolved: filterList(data.getInvolved),
      discover: filterList(data.discover),
      ministries: filterList(data.ministries),
      about: filterList(data.about)
    };
  }, [lowerQuery, data]);

  const anyResults = Object.values(filtered).some(list => list.length > 0);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 supports-[backdrop-filter]:backdrop-blur-[2px] backdrop-blur-[2px] transition-opacity duration-300 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 w-80 bg-brand-white shadow-xl border-r border-neutral-200 transform transition-transform duration-300 ease-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isOpen}
        aria-label="Primary navigation"
      >
        {/* Search */}
        <div className="px-5 pt-4 pb-4 border-b border-neutral-100">
          <SearchBar placeholder="Search menu..." value={query} onChange={setQuery} />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-8">
          {/* Get Involved */}
          {filtered.getInvolved.length > 0 && (
            <div>
              <div className={sectionHeading}>
                <span>Get Involved</span>
                <button className="text-neutral-400 hover:text-neutral-600" aria-label="Configure section">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.757.426 1.757 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.757-2.924 1.757-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.757-.426-1.757-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                </button>
              </div>
              <nav className="space-y-1">
                {filtered.getInvolved.map(item => (
                  <a key={item.label} href={item.href} className={linkBase}>
                    <span className={iconCircle}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </span>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Discover */}
          {filtered.discover.length > 0 && (
            <div>
              <div className={sectionHeading}>Discover</div>
              <nav className="space-y-1">
                {filtered.discover.map(item => (
                  <a key={item.label} href={item.href} className={linkBase}>
                    <span className={iconCircle}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </span>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Ministries */}
          {filtered.ministries.length > 0 && (
            <div>
              <div className={sectionHeading}>Ministries</div>
              <nav className="space-y-1">
                {filtered.ministries.map(item => (
                  <a key={item.label} href={item.href} className={linkBase}>
                    <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* About */}
          {filtered.about.length > 0 && (
            <div>
              <div className={sectionHeading}>About</div>
              <nav className="space-y-1">
                {filtered.about.map(item => (
                  <a key={item.label} href={item.href} className={linkBase}>{item.label}</a>
                ))}
              </nav>
            </div>
          )}

          {!anyResults && (
            <div className="text-center text-neutral-400 text-sm pt-4">
              No matches for &ldquo;{query}&rdquo;.
            </div>
          )}

          {/* Church Centre Card */}
          <div className="rounded-lg border border-neutral-200 p-4 bg-neutral-50">
            <h4 className="font-semibold text-sm mb-1">Church Centre</h4>
            <p className="text-xs text-neutral-600 leading-relaxed mb-3">Access your groups, giving history, event registrations, and more through the Church Centre portal.</p>
            <button className="w-full text-center text-sm font-medium bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-md py-2 transition-colors duration-200">Access Church Centre</button>
          </div>
        </div>

        {/* Footer area */}
        <div className="border-t border-neutral-100 px-5 py-4 space-y-3 text-[11px] text-neutral-500">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {['Vision','Terms','Privacy'].map(label => (
              <a key={label} href={`#${label.toLowerCase()}`} className="hover:text-flc-600">{label}</a>
            ))}
          </div>
          <div className="text-neutral-400 text-[10px]">© {new Date().getFullYear()} Freedom Life Church. All rights reserved.</div>
          <div className="flex items-center gap-3 pt-1">
            {['facebook','instagram','youtube','spotify'].map(icon => (
              <a key={icon} href={`#${icon}`} className="w-6 h-6 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-flc-500 hover:text-white text-neutral-600 transition-colors duration-200 text-[10px] capitalize">
                {icon[0]}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-neutral-100 mt-2">
            <a href="#profile" className="block text-neutral-600 hover:text-flc-600 text-sm font-medium mb-1">My Account</a>
            <a href="#signout" className="block text-neutral-500 hover:text-flc-600 text-sm">Sign Out</a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidePanel;