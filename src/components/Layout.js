import React, { useState, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = useCallback(() => setMenuOpen(o => !o), []);
  const handleCloseMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className={`min-h-screen flex flex-col ${menuOpen ? 'overflow-hidden' : ''}`}>
      <Header isMenuOpen={menuOpen} onToggleMenu={handleToggleMenu} onCloseMenu={handleCloseMenu} />
      <div className="relative flex-grow">
        {/* Content wrapper with blur when menu open */}
        <main className={`min-h-full transition-all duration-300 ${menuOpen ? 'filter blur-sm scale-[0.995]' : 'filter-none'} ${menuOpen ? 'pointer-events-none select-none' : ''}`} aria-hidden={menuOpen}>
          {children}
        </main>
        {/* Optional translucent overlay to slightly dim while still allowing pointer-events to side panel only */}
        {menuOpen && (
          <div className="absolute inset-0 bg-black/5" aria-hidden="true" />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;