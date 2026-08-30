import React, { useEffect, useState } from 'react';

// Organic, asymmetric Persona 3 Reload droplet blob SVG path
const BLOB_PATH = "M320,180 C440,90 560,140 680,210 C790,280 840,410 820,530 C800,660 720,780 600,830 C480,880 340,860 230,790 C120,710 60,590 80,460 C100,320 200,260 320,180 Z";

export default function BlobTransition({ originX = 960, originY = 540, onComplete, children }) {
  const [phase, setPhase] = useState('phase1'); // 'phase1' | 'phase2'

  useEffect(() => {
    // Phase 1 duration: ~480ms (Outer blue blob expands over menu)
    const phase2Timer = setTimeout(() => {
      setPhase('phase2');
    }, 480);

    // Phase 2 duration: ~550ms (Inner cutout blob opens from center to reveal Skill page)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1030);

    return () => {
      clearTimeout(phase2Timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div id="blob-transition-root" className={`blob-transition-container phase-${phase}`}>
      {/* SVG Defs for organic blob clip paths */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="inner-reveal-blob-clip" clipPathUnits="userSpaceOnUse">
            <g
              className={`inner-blob-scaler ${phase === 'phase2' ? 'inner-blob-active' : ''}`}
              style={{ transformOrigin: '960px 540px' }}
            >
              <path d={BLOB_PATH} />
            </g>
          </clipPath>
        </defs>
      </svg>

      {/* Phase 1: Expanding outer blue blob originating at selected menu item */}
      <svg
        className="outer-blob-svg"
        viewBox="0 0 1920 1080"
        width="1920"
        height="1080"
      >
        <g
          className="outer-blob-scaler"
          style={{ transformOrigin: `${originX}px ${originY}px` }}
        >
          <path
            d={BLOB_PATH}
            fill="#0018B4"
            fillOpacity="0.88"
          />
        </g>
      </svg>

      {/* Phase 2: Destination Skill Page revealed through expanding inner blob cutout */}
      {phase === 'phase2' && (
        <div
          className="blob-revealed-destination"
          style={{
            clipPath: 'url(#inner-reveal-blob-clip)',
            WebkitClipPath: 'url(#inner-reveal-blob-clip)'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
