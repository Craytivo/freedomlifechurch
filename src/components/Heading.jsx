import React from 'react';

const sizeMap = {
  h1: {
    base: 'text-3xl sm:text-4xl md:text-5xl',
    xl: 'text-4xl sm:text-5xl md:text-6xl',
    lg: 'text-3xl sm:text-4xl md:text-5xl',
    md: 'text-2xl sm:text-3xl md:text-4xl',
    sm: 'text-xl sm:text-2xl md:text-3xl',
  },
  h2: {
    base: 'text-2xl sm:text-3xl md:text-4xl',
    lg: 'text-3xl sm:text-4xl',
    md: 'text-2xl sm:text-3xl',
    sm: 'text-xl sm:text-2xl',
  },
  h3: {
    base: 'text-xl sm:text-2xl md:text-3xl',
    md: 'text-xl sm:text-2xl',
    sm: 'text-lg sm:text-xl',
  },
};

const Heading = ({
  as = 'h2',
  children,
  align = 'left', // 'left' | 'center' | 'right'
  size, // 'sm'|'md'|'lg'|'xl' (not all sizes apply to all levels)
  weight = 'bold', // unified default weight
  gradient = false,
  className = '',
}) => {
  const Tag = as;
  const sizes = sizeMap[as] || sizeMap.h2;
  const sz = size && sizes[size] ? sizes[size] : (sizes.base || sizes.md);
  const alignCls = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  const weightCls = weight === 'bold' ? 'font-bold' : weight === 'semibold' ? 'font-semibold' : weight === 'medium' ? 'font-medium' : 'font-normal';
  const colorCls = gradient ? 'text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700' : 'text-primary-900';

  return (
    <Tag className={`font-heading ${weightCls} tracking-tight leading-tight ${colorCls} ${sz} ${alignCls} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
