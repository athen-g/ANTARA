import React from "react";

export function BrushStroke({ 
  variant = "horizontal", 
  className = "", 
  color = "var(--gold)", 
  opacity = 0.15 
}) {
  if (variant === "horizontal") {
    return (
      <svg 
        viewBox="0 0 500 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={`w-full h-auto pointer-events-none select-none ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        <path 
          d="M10 14.5C95 10 215 15.5 310 11.5C395 8 450 14 490 10.5C405 13.5 295 8.5 190 12.5C100 16 45 11.5 10 14.5Z" 
          fill={color} 
        />
        <path 
          d="M40 13C120 10.5 220 14 300 11C380 8 430 13 470 10C390 11.5 300 9 210 12.5C130 16 70 12 40 13Z" 
          fill={color} 
          opacity="0.6"
        />
      </svg>
    );
  }

  if (variant === "diagonal") {
    return (
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={`w-24 h-24 pointer-events-none select-none ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        <path 
          d="M12 88C28 70 54 42 88 12C74 26 48 54 22 78C16 83 13 86 12 88Z" 
          stroke={color} 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M20 84C32 70 58 42 80 20" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          opacity="0.7"
        />
      </svg>
    );
  }

  // Variant "corner"
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`w-20 h-20 pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* L-shaped calligraphic frame stroke */}
      <path 
        d="M6 94V6H94" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="square"
      />
      {/* Calligrapher's flourish overlay */}
      <path 
        d="M2 30C2 18 18 2 30 2" 
        stroke={color} 
        strokeWidth="3" 
        strokeLinecap="round"
        opacity="0.4"
      />
      <path 
        d="M6 18C12 12 18 6 24 6" 
        stroke={color} 
        strokeWidth="0.75"
        opacity="0.8"
      />
    </svg>
  );
}
