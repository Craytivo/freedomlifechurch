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
        <main className={`min-h-full transition-all duration-300 ${menuOpen ? 'filter blur-sm scale-[0.995]' : 'filter-none'}`} aria-hidden={menuOpen}>
          {children}
        </main>
        {/* Removed in-page overlay so global portal overlay can capture clicks */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;