import React, { useState, useEffect, useRef } from 'react';

const EYE_FRAMES = [
  '/skill/eye-right.svg',   // Frame 1: Initial resting open eye
  '/skill/eye-right-1.svg', // Frame 2
  '/skill/eye-right-2.svg', // Frame 3
  '/skill/eye-right-3.svg', // Frame 4
  '/skill/eye-right-4.svg', // Frame 5
  '/skill/eye-right-5.svg', // Frame 6: Fully closed blink
  '/skill/eye-right-6.svg', // Frame 7
  '/skill/eye-right-7.svg', // Frame 8
  '/skill/eye-right-8.svg', // Frame 9
  '/skill/eye-right-9.svg'  // Frame 10: Fully reopened
];

/* Water Overlay — same looping blend as main menu & skill menu */
function ConstructionWaterOverlay() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="skill-water-overlay-video"
        src="/water-overlay.mp4"
        muted
        loop
        playsInline
      />
      <img
        className="skill-image6-overlay"
        src="/image 5.png"
        alt="Texture Overlay"
      />
    </>
  );
}

const CONSTRUCTION_BANNERS = [
  { id: 0, title: 'SYSTEM STATUS', status: 'UNDER CONSTRUCTION', top: 471 },
  { id: 1, title: 'PHASE', status: 'IN DEVELOPMENT', top: 566 },
  { id: 2, title: 'DATABASE', status: 'DATA ENCRYPTED', top: 656 }
];

export default function UnderConstructionPage({ title = 'PAGE', onBack, isExiting }) {
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [eyeFrameIndex, setEyeFrameIndex] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);

  const handleBack = onBack || (() => {});

  // 10-Frame Right Eye Blinking Loop at 24fps with 8-second delay
  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    const runBlinkCycle = async () => {
      for (let f = 0; f < EYE_FRAMES.length; f++) {
        if (!isMounted) return;
        setEyeFrameIndex(f);
        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, Math.round(1000 / 24));
        });
      }

      if (!isMounted) return;
      setEyeFrameIndex(0);

      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 8000);
      });

      if (!isMounted) return;
      runBlinkCycle();
    };

    runBlinkCycle();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isExiting) return;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveBannerIndex((prev) => (prev > 0 ? prev - 1 : CONSTRUCTION_BANNERS.length - 1));
        setShakeKey((k) => k + 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveBannerIndex((prev) => (prev < CONSTRUCTION_BANNERS.length - 1 ? prev + 1 : 0));
        setShakeKey((k) => k + 1);
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack, isExiting]);

  return (
    <div id="construction-page" className={`skill-page-container ${isExiting ? 'skill-exiting' : 'skill-entering'}`}>

      {/* 1. Protagonist Shadow Silhouette */}
      <div className="skill-shadow-layer skill-fall-elem">
        <div className="skill-slow-rise">
          <div className="skill-ambient-float">
            <img src="/skill/shadow.svg" alt="Shadow" className="skill-shadow-img" />
          </div>
        </div>
      </div>

      {/* 2. Tilted Deep Blue Polygon Background */}
      <div className="skill-blue-poly-wrapper skill-fall-elem">
        <div className="skill-blue-poly-rotator">
          <div className="skill-blue-poly-bg" />
        </div>
      </div>

      {/* 3. Protagonist Silhouette, Blinking Eye & Animated Hair Group */}
      <div className="skill-protagonist-wrapper skill-fall-elem">
        <div className="skill-slow-rise">
          <div className="skill-ambient-float">
            <img
              src="/skill/vector(without eye).svg"
              alt="Protagonist Vector"
              className="skill-protagonist-vector"
            />
            <div className="skill-eye-container">
              <img
                src={EYE_FRAMES[eyeFrameIndex]}
                alt="Eye Frame"
                className="skill-eye-frame"
              />
            </div>
            <div className="skill-animated-hair-group">
              <div className="skill-dark-blue-hair">
                <img src="/skill/dark-blue-hair.svg" alt="Dark Blue Hair" />
              </div>
              <div className="skill-light-blue-hair">
                <img src="/skill/light-blue-hair.svg" alt="Light Blue Hair" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Looping Water Video Overlay */}
      <ConstructionWaterOverlay />

      {/* 5. Dynamic Rotated Typography for the Section Name */}
      <div className="skill-typo-wrapper skill-fall-elem">
        <svg
          viewBox="0 0 1920 1080"
          className="skill-typo-svg"
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
        >
          <g transform="translate(373.015, -8.548) rotate(98.79) skewX(-10) scale(1, 0.98)">
            <text
              x="0"
              y="350"
              fontFamily="'Almarai', sans-serif"
              fontWeight="800"
              fontSize={title.length > 8 ? '320px' : '400px'}
              letterSpacing={title.length > 8 ? '-18px' : '-28px'}
              fill="#a6a6a6"
            >
              {title}
            </text>
          </g>
        </svg>
      </div>

      {/* 6. Rotating Lens Flare Light Rays */}
      <div className="skill-rays-wrapper skill-fall-elem">
        <div className="skill-slow-rise">
          <div className="skill-ambient-float">
            <img
              src="/skill/rays.svg"
              alt="Light Rays"
              className="skill-rays-img skill-rays-initial-spin"
            />
          </div>
        </div>
      </div>

      {/* 7. Left Project Ribbon Banners */}
      <div className="skill-projects-list">
        {CONSTRUCTION_BANNERS.map((banner, idx) => {
          const isSelected = activeBannerIndex === idx;

          return (
            <div
              key={banner.id}
              className={`skill-project-item ${isSelected ? 'selected' : 'unselected'}`}
              style={{
                top: `${banner.top}px`,
                animationDelay: isExiting ? `${(CONSTRUCTION_BANNERS.length - 1 - idx) * 40}ms` : `${idx * 50}ms`
              }}
              onClick={() => setActiveBannerIndex(idx)}
            >
              <svg width="871" height="91" viewBox="0 0 871 91" fill="none" className="skill-project-svg">
                {isSelected ? (
                  <>
                    <g key={shakeKey} className="envelope-shake">
                      <path d="M185 0H871L857.831 86H185V0Z" fill="#E03636" />
                    </g>
                    <path d="M0 5H859.5L843 91H0V5Z" fill="#FFFFFF" />
                    <path d="M0 5H229.5L180.5 36.5L322 91H0V5Z" fill="#000000" />
                  </>
                ) : (
                  <>
                    <path d="M0 0H859.5L843 86H0V0Z" fill="#000000" />
                    <path d="M0 0H228.5L179.5 31.5L321 86H0V0Z" fill="#FFFFFF" />
                  </>
                )}
              </svg>

              <span
                className={`skill-project-label ${isSelected ? 'text-black' : 'text-white'}`}
              >
                {banner.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* 8. Right Information Card & P3R Caution Terminal Panel */}
      <div className="skill-cards-container resting-offset skill-fall-elem">
        <div className="construction-panel-wrapper">
          {/* Top Caution Header */}
          <div className="construction-caution-header">
            <div className="caution-hazard-tape">
              <span className="hazard-text">CAUTION /// WORK IN PROGRESS /// SYSTEM LOCKED /// CAUTION /// WORK IN PROGRESS</span>
            </div>
          </div>

          {/* Diagnostic Info Display Card */}
          <div className="construction-card-body">
            <div className="construction-card-glitch-badge">
              <span className="glitch-code">SEC_{title.replace(/\s+/g, '_')}</span>
              <span className="glitch-status">LOCKED</span>
            </div>

            <h2 className="construction-title">UNDER CONSTRUCTION</h2>
            <p className="construction-desc">
              The <strong className="highlight-cyan">{title}</strong> module is currently being calibrated in the Velvet Room database.
            </p>

            <div className="construction-meta-grid">
              <div className="meta-box">
                <span className="meta-label">SECTOR</span>
                <span className="meta-value">{title}</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">REVISION</span>
                <span className="meta-value">P3R_2026.09</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">CLEARANCE</span>
                <span className="meta-value text-red">RESTRICTED</span>
              </div>
            </div>

            <div className="construction-return-prompt" onClick={handleBack}>
              <div className="return-icon-wedge" />
              <span className="return-key">[ESC]</span>
              <span className="return-text">RETURN TO MAIN MENU</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
