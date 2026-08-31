import React, { useEffect } from 'react';

/**
 * DoubleCircleTransition: Authentic Persona 3 Reload return transition
 * Two transparent circular apertures expand from bottom-left (Makoto's portrait)
 * and top-right (ocean water), cutting holes through the Skill Menu to reveal the Main Menu underneath.
 */
export default function DoubleCircleTransition({ children, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 550);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="double-circle-transition-wrapper">
      {/* SVG Mask Definition */}
      <svg className="double-circle-mask-def" width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <mask id="double-circle-reveal-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080">
            {/* White base = keep visible */}
            <rect width="1920" height="1080" fill="white" />
            {/* Two expanding black circles = make transparent to reveal main menu underneath */}
            {/* Circle 1: Bottom-Left (Makoto's head/hair position in main menu) */}
            <circle cx="240" cy="920" r="0" fill="black" className="reveal-circle-1" />
            {/* Circle 2: Top-Right (Ocean water / menu side in main menu) */}
            <circle cx="1450" cy="180" r="0" fill="black" className="reveal-circle-2" />
          </mask>
        </defs>
      </svg>

      {/* Masked Foreground (Skill Page) */}
      <div className="skill-exit-masked">
        {children}
      </div>
    </div>
  );
}
