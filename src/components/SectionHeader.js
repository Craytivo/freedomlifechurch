import React from 'react';
import Heading from './Heading';

/**
 * Reusable section header component with proper typography hierarchy
 * Designed to be visually appealing without being oversized
 */
const SectionHeader = ({ 
  title, 
  subtitle, 
  badge,
  size = 'default',
  alignment = 'left',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  badgeClassName = ''
}) => {
  // Define size variants that follow typography best practices
  const sizeVariants = {
    small: {
      title: 'text-xl sm:text-2xl md:text-3xl',
      subtitle: 'text-base md:text-lg',
      spacing: 'mb-2'
    },
    default: {
      title: 'text-2xl sm:text-3xl md:text-4xl',
      subtitle: 'text-lg md:text-xl',
      spacing: 'mb-3'
    },
    large: {
      title: 'text-3xl sm:text-4xl md:text-5xl',
      subtitle: 'text-xl md:text-2xl',
      spacing: 'mb-4'
    }
  };

  const variant = sizeVariants[size];
  const alignmentClasses = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left';

  return (
    <div className={`${alignmentClasses} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-flc-500/10 text-flc-700 text-xs font-semibold uppercase tracking-wide mb-3 ${badgeClassName}`}>
          {badge}
        </div>
      )}
      <Heading as="h2" size={size === 'large' ? 'lg' : size === 'small' ? 'sm' : 'base'} align={alignment} weight="bold" gradient className={`${variant.spacing} ${titleClassName}`}>
        {title}
      </Heading>
      
      {subtitle && (
        <p className={`text-neutral-600 leading-relaxed font-medium max-w-3xl ${alignment === 'center' ? 'mx-auto' : ''} ${variant.subtitle} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;