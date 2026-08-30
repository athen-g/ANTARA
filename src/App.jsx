import React, { useState, useEffect, useCallback, useRef } from 'react';
import BlobTransition from './components/BlobTransition';
import DoubleCircleTransition from './components/DoubleCircleTransition';
import SkillPage from './components/SkillPage';

/* ── 16:9 Viewport Scaler Hook ── */
function useViewportScale() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const DESIGN_W = 1920;
    const DESIGN_H = 1080;

    const compute = () => {
      const scaleX = window.innerWidth / DESIGN_W;
      const scaleY = window.innerHeight / DESIGN_H;
      const s = Math.min(scaleX, scaleY);
      const ox = (window.innerWidth - DESIGN_W * s) / 2;
      const oy = (window.innerHeight - DESIGN_H * s) / 2;
      setScale(s);
      setOffset({ x: ox, y: oy });
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return { scale, offset };
}

/* ── P3R Multi-Phase Cinematic Intro ── */
function IntroSequence({ onComplete, onFadeStart }) {
  const [waterSliding, setWaterSliding] = useState(false);
  const [loaderFading, setLoaderFading] = useState(false);
  const [videoFading, setVideoFading] = useState(false);
  const introVideoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setWaterSliding(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!waterSliding) return;
    const fadeTimer = setTimeout(() => {
      setLoaderFading(true);
      if (introVideoRef.current) introVideoRef.current.play().catch(() => {});
    }, 2200);
    return () => clearTimeout(fadeTimer);
  }, [waterSliding]);

  const handleTimeUpdate = useCallback(() => {
    if (introVideoRef.current) {
      const duration = introVideoRef.current.duration;
      const currentTime = introVideoRef.current.currentTime;
      if (duration && duration - currentTime <= 5.0 && !videoFading) {
        setVideoFading(true);
        if (onFadeStart) onFadeStart();
        setTimeout(() => onComplete(), 1200);
      }
    }
  }, [videoFading, onFadeStart, onComplete]);

  const handleIntroEnded = useCallback(() => onComplete(), [onComplete]);

  return (
    <div id="intro-sequence">
      <video
        ref={introVideoRef}
        className={`intro-video ${videoFading ? 'strong-fade-out' : ''}`}
        src="/intro.mp4"
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleIntroEnded}
      />
      <div id="water-reveal" className={loaderFading ? 'fade-out' : ''}>
        <div className="water-text-layer">
          <h1 className="water-title">Memento Mori</h1>
          <p className="water-subtitle">
            Remember, You Will Die.<br />
            Time never waits.<br />
            It delivers all equally to the same end.
          </p>
        </div>
        <div className={`water-fill ${waterSliding ? 'sliding' : ''}`}>
          <div className="wave-edge">
            <svg
              className="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#029EEB" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#0288D1" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#029EEB" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0288D1" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="wave-grad-3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#029EEB" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0288D1" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="wave-grad-4" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#029EEB" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0288D1" stopOpacity="1" />
                </linearGradient>
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="url(#wave-grad-1)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="url(#wave-grad-2)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="url(#wave-grad-3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="url(#wave-grad-4)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Water Overlay (looping blend on menu) ── */
function WaterOverlay() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <>
      <video ref={videoRef} className="water-overlay-video" src="/water-overlay.mp4" muted loop playsInline />
      <img className="image5-overlay" src="/image 5.png" alt="Image 5 Overlay" />
    </>
  );
}

// Bounding box dimensions & relative offsets
const selectedTextOffsets = {
  'SKILL': { x: 25, y: 135 }, 'ITEM': { x: 50, y: 70 }, 'EQUIP': { x: 50, y: 90 },
  'PERSONA': { x: 35, y: 80 }, 'STATS': { x: 55, y: 45 }, 'QUEST': { x: 40, y: 65 },
  'SOCIAL LINK': { x: 35, y: 60 }, 'CALENDAR': { x: 35, y: 55 }, 'SYSTEM': { x: 75, y: -45 }
};

const frontTriangleOffsets = {
  'SKILL': { x: 0, y: -20 }, 'ITEM': { x: 0, y: -20 }, 'EQUIP': { x: 0, y: -60 },
  'PERSONA': { x: 0, y: -67.5 }, 'STATS': { x: 0, y: 0 }, 'QUEST': { x: 0, y: 0 },
  'SOCIAL LINK': { x: 0, y: -40 }, 'CALENDAR': { x: 0, y: 0 }, 'SYSTEM': { x: 0, y: 0 }
};

const backTriangleOffsets = {
  'SKILL': { x: 36, y: -6 }, 'ITEM': { x: 41.5, y: -16.5 }, 'EQUIP': { x: 29, y: -58.5 },
  'PERSONA': { x: 0.5, y: -88 }, 'STATS': { x: 20.5, y: 6 }, 'QUEST': { x: 11.5, y: -11 },
  'SOCIAL LINK': { x: 2, y: -22 }, 'CALENDAR': { x: -7, y: -9 }, 'SYSTEM': { x: -34, y: 4 }
};

const menuOptions = [
  { name: 'SKILL', baseX: 824, baseY: 220, selectedX: 751, selectedUpshift: 130, passedUpshift: 60, restingOffset: 130, frontPath: 'M381 0L343 137L0 228L381 0Z', backPath: 'M322 0L292 124L0 208L322 0Z', unselected: { fontSize: 66, letterSpacing: '-0.20em', skewX: 6, skewY: -26, fill: '#72FFFF' }, selected: { fontSize: 126, letterSpacing: '-0.15em', skewX: 7, skewY: -28, fill: '#000000' } },
  { name: 'ITEM', baseX: 869, baseY: 280, selectedX: 745, selectedUpshift: 130, passedUpshift: 90, restingOffset: 130, frontPath: 'M437 0L351 147.5L0 168.5L437 0Z', backPath: 'M364.5 0L298 147L0 157L364.5 0Z', unselected: { fontSize: 64, letterSpacing: '-0.18em', skewX: -5, skewY: -15, fill: '#0BC9FE' }, selected: { fontSize: 133, letterSpacing: '-0.22em', skewX: -5, skewY: -15, fill: '#000000' } },
  { name: 'EQUIP', baseX: 827, baseY: 350, selectedX: 725, selectedUpshift: 150, passedUpshift: 90, restingOffset: 130, frontPath: 'M481.5 0L383.5 170.5L0 225.5L481.5 0Z', backPath: 'M434 0L348 162.5L0 230L434 0Z', unselected: { fontSize: 64, letterSpacing: '-0.15em', skewX: 4, skewY: -21, fill: '#6AE6FE' }, selected: { fontSize: 117, letterSpacing: '-0.15em', skewX: 0, skewY: -20, fill: '#000000' } },
  { name: 'PERSONA', baseX: 779, baseY: 410, selectedX: 695, selectedUpshift: 130, passedUpshift: 90, restingOffset: 130, frontPath: 'M537.5 0L474 180L0 183.5L537.5 0Z', backPath: 'M529 0L472.5 185.5L0 204L529 0Z', unselected: { fontSize: 68, letterSpacing: '-0.18em', skewX: -1, skewY: -20, fill: '#72FFFF' }, selected: { fontSize: 122, letterSpacing: '-0.18em', skewX: -1, skewY: -20, fill: '#000000' } },
  { name: 'STATS', baseX: 835.11, baseY: 418, selectedX: 730, selectedUpshift: 130, passedUpshift: 80, restingOffset: 130, frontPath: 'M522.5 0L432.5 141.5L0 152.5L522.5 0Z', backPath: 'M476.5 0L394 129.5L0 148.5L476.5 0Z', unselected: { fontSize: 64, letterSpacing: '-0.26em', skewX: -22, skewY: -3, fill: '#0BC9FE' }, selected: { fontSize: 135, letterSpacing: '-0.26em', skewX: -18, skewY: -1, fill: '#000000' } },
  { name: 'QUEST', baseX: 796.72, baseY: 490, selectedX: 720, selectedUpshift: 130, passedUpshift: 80, restingOffset: 130, frontPath: 'M485.5 0L340 150L0 161L485.5 0Z', backPath: 'M464 0L327 154L0 177.5L464 0Z', unselected: { fontSize: 64, letterSpacing: '-0.24em', skewX: -5, skewY: -14, fill: '#6AE6FE' }, selected: { fontSize: 130, letterSpacing: '-0.24em', skewX: -5, skewY: -14, fill: '#000000' } },
  { name: 'SOCIAL LINK', baseX: 813, baseY: 532, selectedX: 670, selectedUpshift: 130, passedUpshift: 70, restingOffset: 130, frontPath: 'M706 0L563 193L0 187L706 0Z', backPath: 'M707 0L572 178.5L0 156L707 0Z', unselected: { fontSize: 64, letterSpacing: '-0.20em', skewX: -7, skewY: -8, fill: '#72FFFF' }, selected: { fontSize: 128, letterSpacing: '-0.20em', skewX: -7, skewY: -8, fill: '#000000' } },
  { name: 'CALENDAR', baseX: 756, baseY: 574, selectedX: 650, selectedUpshift: 100, passedUpshift: 50, restingOffset: 130, frontPath: 'M690 0L568 164L0 127.5L690 0Z', backPath: 'M674 0L560.5 156L0 135.5L674 0Z', unselected: { fontSize: 64, letterSpacing: '-0.24em', skewX: -12, skewY: -4, fill: '#6AE6FE' }, selected: { fontSize: 130, letterSpacing: '-0.22em', skewX: -12, skewY: -4, fill: '#000000' } },
  { name: 'SYSTEM', baseX: 814, baseY: 598, selectedX: 700, selectedUpshift: 0, passedUpshift: 0, restingOffset: 130, frontPath: 'M617 27.5L393 167.5L0 0L617 27.5Z', backPath: 'M675 0L441 165.5L0 6L675 0Z', unselected: { fontSize: 64, letterSpacing: '-0.22em', skewX: -28, skewY: 10, fill: '#0BC9FE' }, selected: { fontSize: 126, letterSpacing: '-0.22em', skewX: -28, skewY: 10, fill: '#000000' } }
];

function BlueBackground() {
  return (
    <div className="blue-bg">
      <img src="/blue.svg" alt="Blue Background" />
    </div>
  );
}

function App() {
  const { scale, offset } = useViewportScale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [introComplete, setIntroComplete] = useState(false);
  const [menuFadeIn, setMenuFadeIn] = useState(false);

  // View state: 'menu' | 'transitioning' (to skill) | 'skill' | 'transitioning_back' (to menu)
  const [viewState, setViewState] = useState('menu');
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 960, y: 540 });

  const handleFadeStart = useCallback(() => setMenuFadeIn(true), []);
  const handleIntroComplete = useCallback(() => { setIntroComplete(true); setMenuFadeIn(true); }, []);

  // Background liquid vectors frame loop with 8-second delay between cycles
  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    const runCycle = async () => {
      for (let f = 1; f <= 10; f++) {
        if (!isMounted) return;
        setCurrentFrame(f);
        await new Promise((resolve) => { timeoutId = setTimeout(resolve, Math.round(1000 / 24)); });
      }
      if (!isMounted) return;
      await new Promise((resolve) => { timeoutId = setTimeout(resolve, 8000); });
      if (!isMounted) return;
      runCycle();
    };

    runCycle();
    return () => { isMounted = false; clearTimeout(timeoutId); };
  }, []);

  const handleConfirm = useCallback(() => {
    if (viewState !== 'menu') return;
    const currentOption = menuOptions[activeIndex];
    if (currentOption && currentOption.name === 'SKILL') {
      const originX = (currentOption.selectedX || 400) + 200;
      const originY = (currentOption.baseY || 100) + (currentOption.restingOffset || 0) - (currentOption.selectedUpshift || 0) + 50;
      setTransitionOrigin({ x: originX, y: originY });
      setViewState('transitioning');
    }
  }, [viewState, activeIndex]);

  const handleBackToMenu = useCallback(() => {
    if (viewState === 'skill') {
      setViewState('transitioning_back');
    }
  }, [viewState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewState !== 'menu') return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((prev) => Math.min(prev + 1, 8)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((prev) => Math.max(prev - 1, 0)); }
      else if (e.key === 'Enter' || e.key === ' ' || e.key === 'b' || e.key === 'B') { e.preventDefault(); handleConfirm(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewState, handleConfirm]);

  const getVectorFrameSrc = (frame) => {
    if (frame === 10) return '/vectors-anim/Property 1=Vectors-1.svg';
    return `/vectors-anim/Property 1=Vectors-${frame}.svg`;
  };

  const isMenuVisible = menuFadeIn || introComplete;

  // Render the Main Menu View
  const renderMainMenuContent = () => (
    <div className="main-menu-stage">
      {!introComplete && (
        <IntroSequence onComplete={handleIntroComplete} onFadeStart={handleFadeStart} />
      )}

      <WaterOverlay />
      <BlueBackground />

      <div style={{ display: 'none' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((f) => (
          <img key={f} src={getVectorFrameSrc(f)} alt="" />
        ))}
      </div>

      <div className="vectors-bg">
        <img id="vector-frame" src={getVectorFrameSrc(currentFrame)} alt="Protagonist Vector" />
      </div>

      <div className="animated-hair-group">
        <div className="dark-blue-hair-piece">
          <img src="/dark-blue-hair.svg" alt="Dark Blue Hair" />
        </div>
        <div className="light-blue-hair-piece">
          <svg viewBox="0 0 754 1054" style={{ height: '100%', width: 'auto', display: 'block' }}>
            <g transform="translate(0, 590.224)">
              <path d="M105.673 236C102.243 225.876 101.68 219.618 100.173 209.5C98.3588 197.319 98.1731 179.001 98.1731 179.001C98.1731 179.001 90.4092 197.77 88.6731 210.501C87.1731 221.5 87.1731 226.5 83.6731 235.501C83.6731 235.501 82.1731 254.5 81.1731 263.5C81.1731 263.5 79.854 278.296 79.1731 287.5C78.3514 298.606 79.3437 317.342 78.6731 316C77.6731 313.999 67.6731 281 59.6731 260.001C52.7477 241.822 50.0086 230.842 45.1731 212C41.892 199.215 38.9516 182.249 36.8399 169.972L33.6731 154.001C33.1731 154.001 31.4174 165.254 30.1731 172.501C28.7996 180.5 29.1731 185 28.1731 185.001C27.7429 185.001 27.0811 175.78 26.3672 165.337L23.6731 136.001L24.6731 131.5L26.1731 123L37.1731 146L49.6731 183.5L45.1731 127.5L43.1731 70L40.6731 53.5L45.1731 64.5L48.1731 28L59.6731 0L65.1731 30.5L81.1731 57L96.6731 77L94.1731 58L114.673 71.5L102.173 113V140.5L105.673 172.501L112.673 197.5L107.673 217L105.673 236Z" fill="#01CCF3"/>
              <path d="M17.6731 270.5C21.1731 258.499 20.4041 261.998 20.6731 249.5C17.1731 252 15.6588 238.725 8.67309 226.5C4.67309 219.5 0.173086 200 0.173086 200C-0.326908 202.999 0.33317 223.5 1.17308 231.001C2.01298 238.502 6.17308 260.001 9.17308 280.501C12.8223 305.437 17.6731 345.5 19.1731 344.001C20.6731 342.502 16.2268 329.606 16.6731 320.316C17.6731 299.5 17.6731 270.5 17.6731 270.5Z" fill="#01CCF3"/>
            </g>
          </svg>
        </div>
      </div>

      <div className={`dynamic-left-index ${isMenuVisible ? 'menu-fade-in' : 'menu-hidden'}`}>
        {String(activeIndex + 1).padStart(2, '0')}
      </div>
      <div className={`dynamic-left-main ${isMenuVisible ? 'menu-fade-in' : 'menu-hidden'}`}>
        MAIN
      </div>

      <svg
        className={`menu-canvas ${isMenuVisible ? 'menu-fade-in' : 'menu-hidden'}`}
        width="1920" height="1080" viewBox="0 0 1920 1080"
        style={{ position: 'absolute', top: 0, left: 0, width: '1920px', height: '1080px', zIndex: 7, pointerEvents: 'none' }}
      >
        <g transform="translate(0, 50) scale(1.1)">
          {[...menuOptions].reverse().map((option) => {
            const index = menuOptions.findIndex((o) => o.name === option.name);
            const isActive = activeIndex === index;
            const typography = isActive ? option.selected : option.unselected;

            let containerX = option.baseX;
            let containerY;

            if (isActive) {
              containerX = option.selectedX;
              containerY = option.baseY + option.restingOffset - option.selectedUpshift;
            } else if (index < activeIndex) {
              containerX = option.baseX;
              containerY = option.baseY + option.restingOffset - option.passedUpshift;
            } else {
              containerX = option.baseX;
              containerY = option.baseY + option.restingOffset;
            }

            const textOffset = isActive ? selectedTextOffsets[option.name] : { x: 0, y: 0 };
            const backOffset = isActive ? backTriangleOffsets[option.name] : null;
            const frontOffset = isActive ? frontTriangleOffsets[option.name] : null;

            return (
              <g
                key={option.name}
                transform={`translate(${containerX}, ${containerY})`}
                style={{ pointerEvents: 'auto', transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)' }}
              >
                {isActive && backOffset && (
                  <path d={option.backPath} fill="#FFF" transform={`translate(${backOffset.x || 0}, ${backOffset.y || 0})`} />
                )}
                <text
                  x={0} y={0}
                  fill={typography.fill}
                  dominantBaseline="hanging"
                  transform={`translate(${textOffset.x}, ${textOffset.y}) skewX(${typography.skewX}) skewY(${typography.skewY})`}
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontWeight: 'normal',
                    fontSize: `${typography.fontSize}px`,
                    letterSpacing: typography.letterSpacing,
                    transition: 'all 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                  onClick={() => {
                    if (activeIndex === index) handleConfirm();
                    else setActiveIndex(index);
                  }}
                >
                  {option.name}
                </text>
                {isActive && frontOffset && (
                  <g transform={`translate(${frontOffset.x || 0}, ${frontOffset.y || 0})`}>
                    <path className="front-triangle-path" d={option.frontPath} fill="#E03636" style={{ mixBlendMode: 'lighten' }} />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );

  return (
    <div className="viewport-letterbox">
      <div
        className="app-scaler"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          left: `${offset.x}px`,
          top: `${offset.y}px`,
        }}
      >
        <div id="app" className={`app-root view-${viewState}`}>
          {/* ── SKILL PAGE VIEW ── */}
          {viewState === 'skill' && (
            <SkillPage onBack={handleBackToMenu} />
          )}

          {/* ── TWO-PHASE BLUE BLOB TRANSITION (To Skill) ── */}
          {viewState === 'transitioning' && (
            <BlobTransition
              originX={transitionOrigin.x}
              originY={transitionOrigin.y}
              onComplete={() => setViewState('skill')}
            >
              <SkillPage onBack={handleBackToMenu} isEntering={true} />
            </BlobTransition>
          )}

          {/* ── DOUBLE CIRCLE REVEAL TRANSITION (Back to Menu) ── */}
          {viewState === 'transitioning_back' && (
            <>
              <SkillPage onBack={() => {}} />
              <DoubleCircleTransition onComplete={() => setViewState('menu')}>
                {renderMainMenuContent()}
              </DoubleCircleTransition>
            </>
          )}

          {/* ── MAIN MENU VIEW (Resting / Entering) ── */}
          {(viewState === 'menu' || viewState === 'transitioning') && (
            renderMainMenuContent()
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
