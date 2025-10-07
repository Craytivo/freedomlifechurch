import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch(_) {}
  }, [theme]);

  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-flc-500/50"
    >
      {theme === 'dark' ? (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a1 1 0 011 1v2a1 1 0 11-2 0V4a1 1 0 011-1zm0 14a4 4 0 110-8 4 4 0 010 8zm0 4a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM3 11a1 1 0 011-1h2a1 1 0 110 2H4a1 1 0 01-1-1zm14 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM5.05 5.05a1 1 0 011.414 0L8 6.586A1 1 0 116.586 8L5.05 6.464a1 1 0 010-1.414zm10.364 10.364a1 1 0 011.414 0L20 18.586A1 1 0 1118.586 20l-1.536-1.536a1 1 0 010-1.414zM18.95 5.05a1 1 0 010 1.414L17.414 8A1 1 0 1116 6.586L17.536 5.05a1 1 0 011.414 0zM5.05 18.95a1 1 0 011.414 0L8 20.586A1 1 0 016.586 22L5.05 20.464a1 1 0 010-1.414z"/></svg>
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.64 13A9 9 0 1111 2.36 7 7 0 0021.64 13z"/></svg>
      )}
      <span className="text-sm font-medium hidden xl:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
};

export default ThemeToggle;
