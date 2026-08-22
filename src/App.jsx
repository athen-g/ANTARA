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
  'SKILL': { x: 0, y: 0 },
  'ITEM': { x: 0, y: 0 },
  'EQUIP': { x: 0, y: -60 },
  'PERSONA': { x: 0, y: -67.5 },
  'STATS': { x: 0, y: 0 },
  'QUEST': { x: 0, y: 0 },
  'SOCIAL LINK': { x: 0, y: 0 },
  'CALENDAR': { x: 0, y: 0 },
  'SYSTEM': { x: 0, y: 0 }
};

const backTriangleOffsets = {
  'SKILL': { x: 36, y: 14 },
  'ITEM': { x: 41.5, y: 3.5 },
  'EQUIP': { x: 29, y: -58.5 },
  'PERSONA': { x: 0.5, y: -88 },
  'STATS': { x: 20.5, y: 6 },
  'QUEST': { x: 11.5, y: -11 },
  'SOCIAL LINK': { x: 2, y: 18 },
  'CALENDAR': { x: -7, y: -9 },
  'SYSTEM': { x: -34, y: 4 }
};

const menuOptions = [
  {
    name: 'SKILL',
    baseX: 824,
    baseY: 220,
    selectedX: 751,
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
    frontPath: 'M437 0L351 147.5L0 168.5L437 0Z',
    backPath: 'M364.5 0L298 147L0 157L364.5 0Z',
    unselected: { fontSize: 64, letterSpacing: '-0.18em', skewX: -5, skewY: -15, fill: '#0BC9FE' },
    selected: { fontSize: 133, letterSpacing: '-0.22em', skewX: -5, skewY: -15, fill: '#000000' }
  },
  {
    name: 'EQUIP',
    baseX: 827,
    baseY: 360,
    selectedX: 725,
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
    frontPath: 'M690 0L568 164L0 127.5L690 0Z',
    backPath: 'M674 0L560.5 156L0 135.5L674 0Z',
    unselected: { fontSize: 64, letterSpacing: '-0.24em', skewX: -12, skewY: -4, fill: '#6AE6FE' },
    selected: { fontSize: 130, letterSpacing: '-0.22em', skewX: -12, skewY: -4, fill: '#000000' }
  },
  {
    name: 'SYSTEM',
    baseX: 814,
    baseY: 618,
    selectedX: 700,
    frontPath: 'M617 27.5L393 167.5L0 0L617 27.5Z',
    backPath: 'M675 0L441 165.5L0 6L675 0Z',
    unselected: { fontSize: 64, letterSpacing: '-0.22em', skewX: -28, skewY: 10, fill: '#0BC9FE' },
    selected: { fontSize: 126, letterSpacing: '-0.22em', skewX: -28, skewY: 10, fill: '#000000' }
  }
];

function BlueBackground() {
  return (
    <div className="blue-bg">
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1920 1080H162.5C158 1067 148.353 1060.84 145.5 1046C143 1033 138 1019.5 133 1002C127.143 981.503 129.337 951.949 124.5 945.5C121.508 941.511 120.505 933.046 120.5 933.001C120.5 933.001 118 922.21 118 915.5C118 905 117.5 890.001 118 888.501C118.353 887.442 119.856 894.857 120.5 895.5C121 895.999 122.356 896.793 122.5 896.001C123.5 890.5 119.5 861.502 121 863.501C122.5 865.501 125.231 878.748 128 888.501C132.776 905.324 139.5 927.001 140.5 931.501C141.401 935.553 145 940.5 147.5 939.501C150.286 938.388 132.624 841.002 132.5 835.001C132.469 833.5 130.5 782.002 134.5 783.501C138.5 785 136.16 806.5 137 814.001C137.84 821.502 142 843.001 145 863.501C148.649 888.437 153.5 928.498 155 927.001C156.5 925.502 152.054 912.606 152.5 903.315C153.5 882.5 153.5 853.5 153.5 853.5C157 841.499 157 835.155 157 823.501C157 788.5 151.5 784.892 151.5 760.001C151.5 755.501 151.962 752.368 152.5 747.501C153.216 741.023 153.5 738.5 155 731.001C155.982 726.093 158 720 159.5 719.001C160.748 718.169 163 768.002 164 768.001C165 768 164.627 763.5 166 755.501C167.244 748.254 169 737.001 169.5 737.001C170.5 737.001 175.222 772.484 181 795C185.835 813.842 188.575 824.823 195.5 843.001C203.5 864 213.5 896.999 214.5 899C215.171 900.342 214.178 881.606 215 870.5C215.681 861.296 217 846.5 217 846.5C217.998 837.516 219.495 818.569 219.5 818.501C223 809.5 223 804.5 224.5 793.501C226.233 780.791 233.974 762.063 234 762.001C234.001 762.068 234.189 780.341 236 792.5C237.507 802.618 238.07 808.876 241.5 819C245.456 830.676 253.5 848.5 255.5 848.001C257.5 847.502 260.037 827.567 263.5 814.5C268.693 794.905 279.5 762.001 280.5 765.5C281.546 769.161 282 798 282.5 802.5C283 807 284.838 819.5 287 830C290.5 847 292.5 856 297.5 868C302.147 879.153 307.5 888 313 901.5C314.708 905.693 321.5 919 322.5 919C323.5 919 317.372 901.071 315 888.501C310 862.001 297.001 823.671 297.5 823.501C299 823 318.5 855.307 321 860.001C324.995 867.501 333.389 888.036 340 905.5C347.938 926.469 347.506 938.973 358 958.5C368.524 978.082 388.051 1000.97 391.5 1003C400 1008 438.1 1051.2 442 1046C449.5 1036 485 958.501 494.5 924.001C496.894 915.306 494.507 889.081 494.5 889.001C491 859.5 480 821.5 480 818.5C480 815.5 463 794.501 464 794C465 793.499 479.5 806.001 480 808C480.5 809.999 487.5 815.501 488.5 818.5C489.5 821.499 491.5 823.5 492 825.5C492.5 827.5 498 833.001 498.5 828.5C499 823.999 509 744.501 510.5 744C512 743.499 509.5 757.499 513 757C516.5 756.501 516 725.499 519.5 730C523 734.501 525 748.002 525.5 750.001C526.001 752.002 548.5 789.502 549.5 789.501C550.125 789.5 549.773 785.398 549.544 783.055L549.462 782.234C549.565 782.58 549.594 782.562 549.5 782C549.354 781.122 549.378 781.401 549.462 782.234C549.016 780.736 547.187 772.406 548 772C549 771.5 550 776 551.5 776C553 776 553.5 772.5 553.5 772.5C553.5 772.5 555.5 765.502 558 760.501C560.5 755.5 566 751 569 757.5C572 764 580 771 581 774.5C582 778 594 793 596.5 797C599 801 602 811 603.5 812.5C605 814 642.5 872 645 875.5C647.5 879 652.5 886.502 654.5 889.001C656.5 891.5 657.5 898 658.5 900.5C659.5 903 660 906 662.5 906C665 906 668 906 672 904C676 902 683.5 893 687 889.001C690.5 885.002 690.5 858 691 852.5C691.5 847 691 819.5 689 817C687 814.5 672.5 792.999 670 790.5C667.5 788.001 651 772.499 647 774.5C643 776.501 628.5 759.5 627 756.5C625.5 753.5 616.5 733 614.5 731.5C612.5 730 609 714.499 607.5 711.5C606 708.501 633.5 731.5 634 731C634.5 730.5 632.5 725.5 631 723.5C629.5 721.5 624.5 713.001 623.5 712.001C622.5 711.002 618.5 699 619.5 698.5C620.5 698 627.463 702.501 628.5 703.5C629.537 704.499 640.944 703.999 642.5 703.5C644.055 703.001 650 687.502 650.5 686.501C651 685.502 658 678.002 659 678.001C660 678 662.5 686.501 663.5 686.501C664.5 686.501 668.5 678.5 668.5 676.501C668.5 674.503 678.984 673.502 679 673.501C679 673.501 682 667.502 683.5 668.001C685 668.5 681.001 645.506 681 645.001C681 644.502 676.5 626.5 675.5 626.5C674.5 626.5 672 540.506 671 539.501C670 538.501 668.5 529.502 668.5 528.501C668.5 527.501 675 502.003 674 501.501C673 501.001 689.5 453.001 684 442.501C678.5 432.001 705.499 357.503 704.5 353.001C703.5 348.501 746.499 264.002 743 259.001C739.5 254.001 793.999 167.003 795.5 160.501C797 154.001 836.999 92.003 839.5 86.001C842 80.001 880 14.0016 888.5 0.500977C888.608 0.32939 888.569 0.162946 888.388 0H1920V1080Z" fill="#0018B4" />
        <path d="M0 0.493164V0H34.377C14.6967 0.276281 2.54313 0.455174 0 0.493164Z" fill="#0018B4" />
      </svg>
    </div>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);

  // Background liquid vectors frame loop with 8-second delay between cycles
  useEffect(() => {
    let intervalId;
    let timeoutId;

    const startAnimation = () => {
      intervalId = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev === 10) {
            clearInterval(intervalId);
            timeoutId = setTimeout(() => {
              setCurrentFrame(1);
              startAnimation();
            }, 8000);
            return 10;
          }
          return prev + 1;
        });
      }, 80);
    };

    startAnimation();

    return () => {
      clearInterval(intervalId);
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
        {menuOptions.map((option, index) => {
          const isActive = activeIndex === index;
          const typography = isActive ? option.selected : option.unselected;

          // 1. Calculate parent container coordinate (X, Y)
          let containerX = option.baseX;
          let containerY;

          const maxIndex = menuOptions.length - 1;
          const factor = Math.pow((maxIndex - index) / maxIndex, 0.6);
          const selectedUpshift = factor * 130;
          const pastUpshift = factor * 15;

          if (isActive) {
            containerX = option.selectedX;
            containerY = option.baseY + 130 - selectedUpshift;
          } else if (index < activeIndex) {
            containerX = option.baseX;
            containerY = option.baseY + 130 - selectedUpshift - pastUpshift;
          } else {
            containerX = option.baseX;
            containerY = option.baseY + 130;
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
      </svg>
    </div>
  );
}

export default App;
