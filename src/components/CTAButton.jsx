import React from 'react';
import SmartLink from './SmartLink';

/**
 * CTAButton
 * - If href is provided, renders a SmartLink styled as a button
 * - Otherwise renders a native button
 */
const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold focus:outline-none focus:ring-2 transition-all duration-300 cursor-pointer';

const variants = {
  primary: 'px-6 py-2.5 bg-gradient-to-r from-flc-600 via-flc-500 to-amber-500 hover:from-flc-700 hover:via-flc-600 hover:to-amber-600 text-white shadow-lg shadow-flc-500/20 hover:shadow-xl hover:shadow-flc-500/30',
  secondary: 'px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-neutral-200/50 text-neutral-700 hover:bg-white hover:border-neutral-300 hover:shadow-md',
  outline: 'px-4 py-2.5 border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600',
  danger: 'px-6 py-2.5 bg-red-600 text-white hover:bg-red-700 shadow',
};

const sizes = {
  sm: 'text-sm',
  md: 'text-sm sm:text-base',
  lg: 'text-base sm:text-lg',
};

const CTAButton = ({
  href,
  children,
  className = '',
  leftIcon,
  rightIcon,
  variant = 'primary',
  size = 'md',
  as = 'button',
  ...rest
}) => {
  const classes = [baseClasses, variants[variant] || variants.primary, sizes[size], className].join(' ').trim();

  if (href) {
    return (
      <SmartLink href={href} className={classes} {...rest}>
        {leftIcon}
        {children}
        {rightIcon}
      </SmartLink>
    );
  }

  const As = as;
  return (
    <As className={classes} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </As>
  );
};

export default CTAButton;
