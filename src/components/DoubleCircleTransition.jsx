import React, { useEffect } from 'react';

export default function DoubleCircleTransition({ onComplete, children }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 650);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="double-circle-transition-container">
      {/* SVG ClipPath Definition for the two expanding transparent circles */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="double-circle-clip" clipPathUnits="userSpaceOnUse">
            {/* Bottom-Left Circle (over protagonist head/eye region) */}
            <circle cx="380" cy="940" r="1800" className="double-circle-bl" />
            {/* Top-Right Circle (over blue background/evoker region) */}
            <circle cx="1450" cy="180" r="1800" className="double-circle-tr" />
          </clipPath>
        </defs>
      </svg>

      {/* Main Menu revealed through the two expanding transparent circle cutouts */}
      <div
        className="double-circle-revealed-layer"
        style={{
          clipPath: 'url(#double-circle-clip)',
          WebkitClipPath: 'url(#double-circle-clip)'
        }}
      >
        {children}
      </div>
    </div>
  );
}
