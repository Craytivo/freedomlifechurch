import React, { useState } from 'react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'My Profile', href: '#profile' },
    { name: 'My Groups', href: '#groups' },
    { name: 'Prayer Requests', href: '#prayers' },
    { name: 'Giving History', href: '#giving' },
    { name: 'Settings', href: '#settings' },
    { name: 'Sign Out', href: '#signout' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-neutral-200 hover:bg-neutral-300 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-flc-500"
      >
        <svg 
          className="w-5 h-5 text-neutral-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-brand-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-flc-500 font-body text-sm transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;