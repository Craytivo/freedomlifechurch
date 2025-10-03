import React from 'react';

const SearchBar = ({ placeholder = "Search...", value, onChange, onSubmit, onKeyDown, inputRef }) => {
  const handleSubmit = (e) => {
    if (onSubmit) onSubmit(e);
    else e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            onKeyDown={onKeyDown}
            ref={inputRef}
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 border border-neutral-200 rounded-full text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-flc-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </form>
  );
};

export default SearchBar;