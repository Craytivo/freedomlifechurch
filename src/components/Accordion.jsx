import React from 'react';

/**
 * Accordion
 * Renders a list of expandable items using native <details> for accessibility.
 * Props:
 * - items: Array<{ title: ReactNode, content: ReactNode }>
 * - tone: 'neutral' | 'white' (background tone)
 * - className: wrapper classes
 * - itemClassName: classes per details item
 */
const Accordion = ({ items = [], tone = 'neutral', className = '', itemClassName = '' }) => {
  const toneBg = tone === 'white' ? 'bg-white' : 'bg-neutral-50';
  const hoverBorder = tone === 'white' ? 'hover:border-flc-500/30' : '';
  return (
    <div className={className}>
      {items.map((it, idx) => (
        <details key={idx} className={`group rounded-xl border border-neutral-200 ${toneBg} overflow-hidden ${hoverBorder} ${itemClassName}`}> 
          <summary className="list-none flex items-center justify-between gap-4 py-4 px-6 cursor-pointer hover:bg-neutral-100">
            <span className="font-semibold text-primary-900">{it.title}</span>
            <svg className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </summary>
          <div className="px-6 pb-4">
            {typeof it.content === 'string' ? (
              <p className="text-neutral-600 leading-relaxed">{it.content}</p>
            ) : (
              it.content
            )}
          </div>
        </details>
      ))}
    </div>
  );
};

export default Accordion;
