import React, { useEffect } from 'react';

/**
 * DoubleCircleTransition: Authentic Persona 3 Reload return transition
 * Two expanding circular apertures from bottom-left (Makoto portrait)
 * and top-right (ocean water) expand to reveal the Main Menu underneath.
 */
export default function DoubleCircleTransition({ children, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 580);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="double-circle-transition-wrapper">
      {/* SVG ClipPath Definition with native SVG <animate> for 100% reliable hardware acceleration */}
      <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <clipPath id="double-circle-reveal-clip" clipPathUnits="userSpaceOnUse">
            {/* Circle 1: Bottom-Left (Makoto's portrait in main menu) */}
            <circle cx="240" cy="920" r="0">
              <animate
                attributeName="r"
                from="0"
                to="1900"
                dur="0.55s"
                begin="0s"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.2 0.8 0.2 1"
              />
            </circle>
            {/* Circle 2: Top-Right (Ocean water / menu side in main menu) */}
            <circle cx="1450" cy="180" r="0">
              <animate
                attributeName="r"
                from="0"
                to="1900"
                dur="0.55s"
                begin="0s"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.2 0.8 0.2 1"
              />
            </circle>
          </clipPath>
        </defs>
      </svg>

      {/* Main Menu revealed through expanding apertures */}
      <div
        className="main-menu-reveal-layer"
        style={{
          width: '1920px',
          height: '1080px',
          position: 'absolute',
          top: 0,
          left: 0,
          clipPath: 'url(#double-circle-reveal-clip)',
          WebkitClipPath: 'url(#double-circle-reveal-clip)'
        }}
      >
        {children}
      </div>
    </div>
  );
}
