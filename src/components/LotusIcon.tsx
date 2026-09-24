import React from 'react';

interface LotusIconProps {
  className?: string;
  size?: number;
}

export const LotusIcon: React.FC<LotusIconProps> = ({ className = 'w-6 h-6', size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central petal */}
      <path
        d="M24 8C24 8 20 16 20 22C20 26 24 29 24 29C24 29 28 26 28 22C28 16 24 8 24 8Z"
        fill="url(#lotus-gold-grad-1)"
      />
      {/* Left inner petal */}
      <path
        d="M14 15C14 15 15.5 24 18.5 27C21.5 30 24 29.5 24 29.5C24 29.5 19.5 27 18.5 22.5C17.5 18 14 15 14 15Z"
        fill="url(#lotus-gold-grad-2)"
      />
      {/* Right inner petal */}
      <path
        d="M34 15C34 15 32.5 24 29.5 27C26.5 30 24 29.5 24 29.5C24 29.5 28.5 27 29.5 22.5C30.5 18 34 15 34 15Z"
        fill="url(#lotus-gold-grad-2)"
      />
      {/* Left outer petal */}
      <path
        d="M10 24C10 24 13.5 29 19 31C23.5 32.5 24 30.5 24 30.5C24 30.5 17.5 30 15 26.5C12.5 23 10 24 10 24Z"
        fill="url(#lotus-gold-grad-3)"
      />
      {/* Right outer petal */}
      <path
        d="M38 24C38 24 34.5 29 29 31C24.5 32.5 24 30.5 24 30.5C24 30.5 30.5 30 33 26.5C35.5 23 38 24 38 24Z"
        fill="url(#lotus-gold-grad-3)"
      />
      {/* Base petal cradle */}
      <path
        d="M17 33C17 33 20.5 36.5 24 36.5C27.5 36.5 31 33 31 33C28.5 35 25.5 35.5 24 35.5C22.5 35.5 19.5 35 17 33Z"
        fill="url(#lotus-gold-grad-1)"
      />
      <defs>
        <linearGradient id="lotus-gold-grad-1" x1="24" y1="8" x2="24" y2="36.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="lotus-gold-grad-2" x1="24" y1="15" x2="24" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="lotus-gold-grad-3" x1="24" y1="24" x2="24" y2="32.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#92400E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
