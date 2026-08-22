import React, { useState, useEffect } from 'react';

// Bounding box dimensions & relative offsets
const unselectedDims = {
  'SKILL': { w: 187.954, h: 173.759 },
  'ITEM': { w: 171.441, h: 126.683 },
  'EQUIP': { w: 209.241, h: 159.924 },
  'PERSONA': { w: 349.327, h: 220.533 },
  'STATS': { w: 254.662, h: 100.471 },
  'QUEST': { w: 239.745, h: 147.477 },
  'SOCIAL LINK': { w: 435.671, h: 148.042 },
  'CALENDAR': { w: 387.021, h: 114.752 },
  'SYSTEM': { w: 302.379, h: 120.532 }
};

const selectedDims = {
  'SKILL': { w: 381, h: 294.66 },
  'ITEM': { w: 437, h: 298.083 },
  'EQUIP': { w: 481.5, h: 259.787 },
  'PERSONA': { w: 537.5, h: 312.54 },
  'STATS': { w: 522.5, h: 168.169 },
  'QUEST': { w: 485.5, h: 230.942 },
  'SOCIAL LINK': { w: 709, h: 251.844 },
  'CALENDAR': { w: 697, h: 180.75 },
  'SYSTEM': { w: 675, h: 215 }
};

const selectedTextOffsets = {
  'SKILL': { x: 25, y: 135 },
  'ITEM': { x: 50, y: 70 },
  'EQUIP': { x: 50, y: 90 },
  'PERSONA': { x: 35, y: 80 },
  'STATS': { x: 55, y: 45 },
  'QUEST': { x: 40, y: 65 },
  'SOCIAL LINK': { x: 35, y: 60 },
  'CALENDAR': { x: 35, y: 55 },
  'SYSTEM': { x: 75, y: -45 }
};

const frontTriangleOffsets = {
  'SKILL': { x: 0, y: -20 },
  'ITEM': { x: 0, y: -20 },
  'EQUIP': { x: 0, y: -60 },
  'PERSONA': { x: 0, y: -67.5 },
  'STATS': { x: 0, y: 0 },
  'QUEST': { x: 0, y: 0 },
  'SOCIAL LINK': { x: 0, y: -40 },
  'CALENDAR': { x: 0, y: 0 },
  'SYSTEM': { x: 0, y: 0 }
};

const backTriangleOffsets = {
  'SKILL': { x: 36, y: -6 },
  'ITEM': { x: 41.5, y: -16.5 },
  'EQUIP': { x: 29, y: -58.5 },
  'PERSONA': { x: 0.5, y: -88 },
  'STATS': { x: 20.5, y: 6 },
  'QUEST': { x: 11.5, y: -11 },
  'SOCIAL LINK': { x: 2, y: -22 },
  'CALENDAR': { x: -7, y: -9 },
  'SYSTEM': { x: -34, y: 4 }
};

const menuOptions = [
  {
    name: 'SKILL',
    baseX: 824,
    baseY: 220,
    selectedX: 751,
    selectedUpshift: 130,
    passedUpshift: 60,
    restingOffset: 130,
    frontPath: 'M381 0L343 137L0 228L381 0Z',
    backPath: 'M322 0L292 124L0 208L322 0Z',
    unselected: { fontSize: 66, letterSpacing: '-0.20em', skewX: 6, skewY: -26, fill: '#72FFFF' },
    selected: { fontSize: 126, letterSpacing: '-0.15em', skewX: 7, skewY: -28, fill: '#000000' }
  },
  {
    name: 'ITEM',
    baseX: 869,
    baseY: 280,
    selectedX: 745,
    selectedUpshift: 130,
    passedUpshift: 90,
    restingOffset: 130,
    frontPath: 'M437 0L351 147.5L0 168.5L437 0Z',
    backPath: 'M364.5 0L298 147L0 157L364.5 0Z',
    unselected: { fontSize: 64, letterSpacing: '-0.18em', skewX: -5, skewY: -15, fill: '#0BC9FE' },
    selected: { fontSize: 133, letterSpacing: '-0.22em', skewX: -5, skewY: -15, fill: '#000000' }
  },
  {
    name: 'EQUIP',
    baseX: 827,
    baseY: 350,
    selectedX: 725,
    selectedUpshift: 150,
    passedUpshift: 90,
    restingOffset: 130,
    frontPath: 'M481.5 0L383.5 170.5L0 225.5L481.5 0Z',
    backPath: 'M434 0L348 162.5L0 230L434 0Z',
    unselected: { fontSize: 64, letterSpacing: '-0.15em', skewX: 4, skewY: -21, fill: '#6AE6FE' },
    selected: { fontSize: 117, letterSpacing: '-0.15em', skewX: 0, skewY: -20, fill: '#000000' }
  },
  {
    name: 'PERSONA',
    baseX: 779,
    baseY: 410,
    selectedX: 695,
    selectedUpshift: 130,
    passedUpshift: 90,
    restingOffset: 130,
    frontPath: 'M537.5 0L474 180L0 183.5L537.5 0Z',
    backPath: 'M529 0L472.5 185.5L0 204L529 0Z',
    unselected: { fontSize: 68, letterSpacing: '-0.18em', skewX: -1, skewY: -20, fill: '#72FFFF' },
    selected: { fontSize: 122, letterSpacing: '-0.18em', skewX: -1, skewY: -20, fill: '#000000' }
  },
  {
    name: 'STATS',
    baseX: 835.11,
    baseY: 418,
    selectedX: 730,
    selectedUpshift: 130,
    passedUpshift: 80,
    restingOffset: 130,
    frontPath: 'M522.5 0L432.5 141.5L0 152.5L522.5 0Z',
    backPath: 'M476.5 0L394 129.5L0 148.5L476.5 0Z',
    unselected: { fontSize: 64, letterSpacing: '-0.26em', skewX: -22, skewY: -3, fill: '#0BC9FE' },
    selected: { fontSize: 135, letterSpacing: '-0.26em', skewX: -18, skewY: -1, fill: '#000000' }
  },
  {
    name: 'QUEST',
    baseX: 796.72,
    baseY: 490,
    selectedX: 720,
    selectedUpshift: 130,
    passedUpshift: 80,
    restingOffset: 130,
    frontPath: 'M485.5 0L340 150L0 161L485.5 0Z',
    backPath: 'M464 0L327 154L0 177.5L464 0Z',
    unselected: { fontSize: 64, letterSpacing: '-0.24em', skewX: -5, skewY: -14, fill: '#6AE6FE' },
    selected: { fontSize: 130, letterSpacing: '-0.24em', skewX: -5, skewY: -14, fill: '#000000' }
  },
  {
    name: 'SOCIAL LINK',
    baseX: 813,
    baseY: 532,
    selectedX: 670,
    selectedUpshift: 130,
    passedUpshift: 70,
    restingOffset: 130,
    frontPath: 'M706 0L563 193L0 187L706 0Z',
    backPath: 'M707 0L572 178.5L0 156L707 0Z',
    unselected: { fontSize: 64, letterSpacing: '-0.20em', skewX: -7, skewY: -8, fill: '#72FFFF' },
    selected: { fontSize: 128, letterSpacing: '-0.20em', skewX: -7, skewY: -8, fill: '#000000' }
  },
  {
    name: 'CALENDAR',
    baseX: 756,
    baseY: 574,
    selectedX: 650,
    selectedUpshift: 100,
    passedUpshift: 50,
    restingOffset: 130,
    frontPath: 'M690 0L568 164L0 127.5L690 0Z',
    backPath: 'M674 0L560.5 156L0 135.5L674 0Z',
    unselected: { fontSize: 64, letterSpacing: '-0.24em', skewX: -12, skewY: -4, fill: '#6AE6FE' },
    selected: { fontSize: 130, letterSpacing: '-0.22em', skewX: -12, skewY: -4, fill: '#000000' }
  },
  {
    name: 'SYSTEM',
    baseX: 814,
    baseY: 598,
    selectedX: 700,
    selectedUpshift: 0,
    passedUpshift: 0,
    restingOffset: 130,
    frontPath: 'M617 27.5L393 167.5L0 0L617 27.5Z',
    backPath: 'M675 0L441 165.5L0 6L675 0Z',
    unselected: { fontSize: 64, letterSpacing: '-0.22em', skewX: -28, skewY: 10, fill: '#0BC9FE' },
    selected: { fontSize: 126, letterSpacing: '-0.22em', skewX: -28, skewY: 10, fill: '#000000' }
  }
];

function BlueBackground() {
  return (
    <>
      <div className="blue-bg">
        <img src="/blue.svg" alt="Blue Background" />
      </div>
      <div className="dark-blue-hair-bg">
        <img src="/dark-blue-hair.svg" alt="Dark Blue Hair" />
      </div>
    </>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);

  // Background liquid vectors frame loop with 8-second delay between cycles
  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    const runCycle = async () => {
      for (let f = 1; f <= 10; f++) {
        if (!isMounted) return;
        setCurrentFrame(f);
        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, Math.round(1000 / 24));
        });
      }

      if (!isMounted) return;
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 8000);
      });

      if (!isMounted) return;
      runCycle();
    };

    runCycle();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        setActiveIndex((prev) => Math.min(prev + 1, 8));
      } else if (e.key === 'ArrowUp') {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getVectorFrameSrc = (frame) => {
    if (frame === 10) {
      return '/vectors-anim/Property 1=Vectors-1.svg';
    }
    return `/vectors-anim/Property 1=Vectors-${frame}.svg`;
  };

  return (
    <div id="app">
      {/* White page background with the inline blue SVG background */}
      <BlueBackground />

      {/* Preload all animation frames to prevent repeated filesystem requests */}
      <div style={{ display: 'none' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((f) => (
          <img key={f} src={getVectorFrameSrc(f)} alt="" />
        ))}
      </div>

      {/* Single protagonist vector sequence instance */}
      <div className="vectors-bg">
        <img
          id="vector-frame"
          src={getVectorFrameSrc(currentFrame)}
          alt="Protagonist Vector"
        />
        {/* Light Blue Hair Layer Overlay */}
        <svg
          className="light-blue-hair-overlay"
          viewBox="0 0 754 1054"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          <g transform="translate(0, 590.224)">
            <path d="M105.673 236C102.243 225.876 101.68 219.618 100.173 209.5C98.3588 197.319 98.1731 179.001 98.1731 179.001C98.1731 179.001 90.4092 197.77 88.6731 210.501C87.1731 221.5 87.1731 226.5 83.6731 235.501C83.6731 235.501 82.1731 254.5 81.1731 263.5C81.1731 263.5 79.854 278.296 79.1731 287.5C78.3514 298.606 79.3437 317.342 78.6731 316C77.6731 313.999 67.6731 281 59.6731 260.001C52.7477 241.822 50.0086 230.842 45.1731 212C41.892 199.215 38.9516 182.249 36.8399 169.972L33.6731 154.001C33.1731 154.001 31.4174 165.254 30.1731 172.501C28.7996 180.5 29.1731 185 28.1731 185.001C27.7429 185.001 27.0811 175.78 26.3672 165.337L23.6731 136.001L24.6731 131.5L26.1731 123L37.1731 146L49.6731 183.5L45.1731 127.5L43.1731 70L40.6731 53.5L45.1731 64.5L48.1731 28L59.6731 0L65.1731 30.5L81.1731 57L96.6731 77L94.1731 58L114.673 71.5L102.173 113V140.5L105.673 172.501L112.673 197.5L107.673 217L105.673 236Z" fill="#01CCF3"/>
            <path d="M17.6731 270.5C21.1731 258.499 20.4041 261.998 20.6731 249.5C17.1731 252 15.6588 238.725 8.67309 226.5C4.67309 219.5 0.173086 200 0.173086 200C-0.326908 202.999 0.33317 223.5 1.17308 231.001C2.01298 238.502 6.17308 260.001 9.17308 280.501C12.8223 305.437 17.6731 345.5 19.1731 344.001C20.6731 342.502 16.2268 329.606 16.6731 320.316C17.6731 299.5 17.6731 270.5 17.6731 270.5Z" fill="#01CCF3"/>
            <path d="M471.673 128.5C470.173 125.501 497.673 148.5 498.173 148C498.673 147.5 496.673 142.5 495.173 140.5C493.673 138.5 488.673 130 487.673 129.001C486.673 128.002 482.673 116 483.673 115.5C484.673 115 491.636 119.501 492.673 120.5C493.71 121.499 505.118 120.999 506.673 120.5C508.229 120.001 514.173 104.5 514.673 103.501C515.173 102.502 522.173 95.0016 523.173 95.0008C524.173 95 526.673 103.501 527.673 103.501C528.673 103.501 532.673 95.5 532.673 93.5008L522.173 91.5H513.673L507.673 89.5L503.673 92.5L499.173 95.0008H496.673L487.673 97.5L477.673 100L466.673 102L455.173 103.501L446.173 106L433.173 107.5L425.173 102L408.673 92.5L399.673 87L387.673 81.5L361.673 72.5L376.173 84.5L399.673 103.501L412.173 117.5L419.173 126L422.173 132L434.173 156L453.673 153.5L473.673 158.5L483.173 168L491.173 173.5C489.673 170.5 480.673 150 478.673 148.5C476.673 147 473.173 131.499 471.673 128.5Z" fill="#01CCF3"/>
            <path d="M453.173 161.5L450.673 160.5L449.173 159.5L448.173 158L446.173 157.5H438.173L437.673 159H445.173L446.173 160L447.173 161L446.173 162L444.173 162.5L442.173 163.5L440.173 164.5L440.673 166L441.173 167V169V171L443.173 172L444.173 170.5L446.173 168.5L448.673 166.5L449.673 165.5L451.173 165H466.173L470.173 166L472.173 167L474.173 168.25L476.173 170L478.923 171.741L482.173 174L483.673 175L486.173 177L488.173 178L490.173 179L493.173 181L484.173 171.5L481.673 170.5L478.923 168.25L476.173 166L473.173 164.5L471.173 163H466.673H462.173L459.173 162.5H455.173L453.173 161.5Z" fill="#01CCF3"/>
          </g>
        </svg>
      </div>

      {/* Rotated dynamic left index (01 to 09) and MAIN vertical text */}
      <div className="dynamic-left-index">
        {String(activeIndex + 1).padStart(2, '0')}
      </div>
      <div className="dynamic-left-main">
        MAIN
      </div>

      {/* Absolute Coordinate SVG Canvas with container rectangles */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1920px',
          height: '1080px',
          zIndex: 4,
          pointerEvents: 'none'
        }}
      >
        <g transform="translate(0, 50) scale(1.1)">
          {[...menuOptions].reverse().map((option) => {
            const index = menuOptions.findIndex((o) => o.name === option.name);
            const isActive = activeIndex === index;
            const typography = isActive ? option.selected : option.unselected;

            // 1. Calculate parent container coordinate (X, Y)
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

            // 2. Setup text relative offset inside container
            const textOffset = isActive ? selectedTextOffsets[option.name] : { x: 0, y: 0 };

            // 3. Setup backdrop elements (Back / Front triangles) relative positions
            const backOffset = isActive ? backTriangleOffsets[option.name] : null;
            const frontOffset = isActive ? frontTriangleOffsets[option.name] : null;

            return (
              <g
                key={option.name}
                transform={`translate(${containerX}, ${containerY})`}
                style={{
                  pointerEvents: 'auto',
                  isolation: 'isolate',
                  transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                {/* 1. White Backdrop Triangle (BOTTOM) */}
                {isActive && backOffset && (
                  <path
                    d={option.backPath}
                    fill="#FFF"
                    transform={`translate(${backOffset.x || 0}, ${backOffset.y || 0})`}
                  />
                )}

                {/* 2. Black Text (MIDDLE) */}
                <text
                  x={0}
                  y={0}
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
                  onClick={() => setActiveIndex(index)}
                >
                  {option.name}
                </text>

                {/* 3. Red Front Triangle with Lighten Blend Mode (TOP) */}
                {isActive && frontOffset && (
                  <g transform={`translate(${frontOffset.x || 0}, ${frontOffset.y || 0})`}>
                    <path
                      className="front-triangle-path"
                      d={option.frontPath}
                      fill="#E03636"
                      style={{ mixBlendMode: 'lighten' }}
                    />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default App;
