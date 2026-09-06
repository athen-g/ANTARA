import React, { useState, useEffect, useRef } from 'react';

const EYE_FRAMES = [
  '/skill/eye-right.svg',   // Frame 1: Initial resting open eye (no number)
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

const PROJECTS = [
  {
    id: 0,
    name: 'Hyperspace XR SIG',
    top: 471,
    skills: [
      { id: 0, name: 'UNITY', logo: 'unity', selectorTop: 131, itemTop: 156 },
      { id: 1, name: 'C#', logo: 'csharp', selectorTop: 186, itemTop: 211 },
      { id: 2, name: 'WEBXR', logo: 'webxr', selectorTop: 241, itemTop: 266 },
      { id: 3, name: 'THREE.JS', logo: 'threejs', selectorTop: 296, itemTop: 321 }
    ]
  },
  {
    id: 1,
    name: 'FutureU',
    top: 566,
    skills: [
      { id: 0, name: 'REACT', logo: 'react', selectorTop: 131, itemTop: 156 },
      { id: 1, name: 'TYPESCRIPT', logo: 'typescript', selectorTop: 186, itemTop: 211 },
      { id: 2, name: 'NEXT.JS', logo: 'nextjs', selectorTop: 241, itemTop: 266 },
      { id: 3, name: 'NODE.JS', logo: 'nodejs', selectorTop: 296, itemTop: 321 }
    ]
  },
  {
    id: 2,
    name: 'unimark',
    top: 656,
    skills: [
      { id: 0, name: 'PYTHON', logo: 'python', selectorTop: 131, itemTop: 156 },
      { id: 1, name: 'PYTORCH', logo: 'pytorch', selectorTop: 186, itemTop: 211 },
      { id: 2, name: 'FASTAPI', logo: 'fastapi', selectorTop: 241, itemTop: 266 },
      { id: 3, name: 'POSTGRESQL', logo: 'postgresql', selectorTop: 296, itemTop: 321 }
    ]
  }
];

function SkillLogo({ logo }) {
  switch (logo) {
    case 'unity':
      return (
        <g transform="translate(51.75, 6.5)" fill="white">
          <path d="M12 0.5L3.5 5.5v13l8.5 5 8.5-5v-13L12 0.5zm0 3.2l5.8 3.4-3.2 1.9-5.8-3.4 3.2-1.9zm-6.8 4.7l5.8 3.4v6.8l-5.8-3.4V8.4zm13.6 6.8l-5.8 3.4v-6.8l5.8-3.4v6.8z" />
        </g>
      );
    case 'csharp':
      return (
        <g transform="translate(51.75, 6.5)">
          <path d="M12 1L2 6.8v11.4L12 24l10-5.8V6.8L12 1z" fill="#9B4F96" stroke="white" strokeWidth="1.2"/>
          <text x="12" y="16.5" fill="white" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">C#</text>
        </g>
      );
    case 'webxr':
      return (
        <g transform="translate(50, 7)" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="13" rx="3.5" fill="rgba(255,255,255,0.15)"/>
          <circle cx="7.5" cy="10.5" r="2.2" fill="white"/>
          <circle cx="16.5" cy="10.5" r="2.2" fill="white"/>
          <path d="M10 17c1-1 3-1 4 0"/>
        </g>
      );
    case 'threejs':
      return (
        <g transform="translate(52, 6.5)" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.5 1L1 21h21L11.5 1z" fill="rgba(255,255,255,0.18)"/>
          <path d="M11.5 1v20M1 21l10.5-9.5L22 21"/>
        </g>
      );
    case 'react':
      return (
        <g transform="translate(51.75, 6.5)" fill="none" stroke="#00D8FF" strokeWidth="1.4">
          <ellipse cx="12" cy="12" rx="10.5" ry="4"/>
          <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)"/>
          <circle cx="12" cy="12" r="2.2" fill="#00D8FF"/>
        </g>
      );
    case 'typescript':
      return (
        <g transform="translate(51.75, 6.5)">
          <rect width="24" height="24" rx="4" fill="#3178C6"/>
          <text x="12" y="17" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">TS</text>
        </g>
      );
    case 'nextjs':
      return (
        <g transform="translate(51.75, 6.5)">
          <circle cx="12" cy="12" r="11.5" fill="black" stroke="white" strokeWidth="1.2"/>
          <path d="M7.5 7v10h2.3v-5.8l6.2 5.8h1.8V7h-2.3v5.8L9.3 7H7.5z" fill="white"/>
        </g>
      );
    case 'nodejs':
      return (
        <g transform="translate(51.75, 6.5)">
          <path d="M12 1.5l9.5 5.5v11L12 23.5l-9.5-5.5v-11L12 1.5z" fill="#339933" stroke="white" strokeWidth="1"/>
          <text x="12" y="16" fill="white" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">N</text>
        </g>
      );
    case 'python':
      return (
        <g transform="translate(51.75, 6.5)">
          <path d="M11.5 2c-4.5 0-4.2 2-4.2 2l.01 2.1h4.4v.7H4.8S2 6.4 2 11c0 4.5 2.5 4.3 2.5 4.3h1.4v-2.1s-.08-2.5 2.5-2.5h4.2s2.4.04 2.4-2.4V4.4s.36-2.4-3.8-2.4zm-1.2 1.3a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#387EB8"/>
          <path d="M12.5 22c4.5 0 4.2-2 4.2-2l-.01-2.1h-4.4v-.7h6.9s2.8.4 2.8-4.2c0-4.5-2.5-4.3-2.5-4.3h-1.4v2.1s.08 2.5-2.5 2.5h-4.2s-2.4-.04-2.4 2.4v4.2s-.36 2.4 3.8 2.4zm1.2-1.3a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#FFE052"/>
        </g>
      );
    case 'pytorch':
      return (
        <g transform="translate(51.75, 6.5)" fill="none">
          <path d="M14.2 2.5a7.8 7.8 0 013.3 8.6 8 8 0 01-8.5 5.6A7.9 7.9 0 013 9.7a8 8 0 014.3-6.7l-.6 1.8a6.1 6.1 0 00-2.4 4.9 6.2 6.2 0 006.2 6.2 6.2 6.2 0 006.2-6.2 6 6 0 00-2.9-5.2l.4-2z" fill="#EE4C2C"/>
          <circle cx="16.2" cy="3.5" r="1.4" fill="#EE4C2C"/>
        </g>
      );
    case 'fastapi':
      return (
        <g transform="translate(51.75, 6.5)">
          <circle cx="12" cy="12" r="11.5" fill="#059669" stroke="white" strokeWidth="1"/>
          <path d="M13 3L5.5 13.5h5.5l-1 7.5 9-11H12.5L13 3z" fill="white"/>
        </g>
      );
    case 'postgresql':
      return (
        <g transform="translate(51.75, 6.5)">
          <circle cx="12" cy="12" r="11.5" fill="#336791" stroke="white" strokeWidth="1"/>
          <text x="12" y="16.5" fill="white" fontSize="10" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">SQL</text>
        </g>
      );
    default:
      return null;
  }
}

/* Water Overlay for skill page — same looping blend as main menu */
function SkillWaterOverlay() {
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
      {/* Image 6: halftone texture overlay — flipped vertically & rotated 10.6deg per Figma node 103:3322 */}
      <img
        className="skill-image6-overlay"
        src="/image 5.png"
        alt="Skill Texture Overlay"
      />
    </>
  );
}

export default function SkillPage({ onBack, isExiting }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [navMode, setNavMode] = useState('project'); // 'project' | 'skill'
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [eyeFrameIndex, setEyeFrameIndex] = useState(0);
  const [shakeKey, setShakeKey] = useState(0); // increments to re-trigger envelope shake
  const [raysSpinKey, setRaysSpinKey] = useState(0); // increments to re-trigger rays rotation
  const [raysSpinType, setRaysSpinType] = useState('initial'); // 'initial' | 'forward' | 'reverse'

  const handleBack = onBack || (() => {});

  const currentProject = PROJECTS[activeProjectIndex];
  const currentSkills = currentProject.skills;

  // 10-Frame Right Eye Blinking Loop at 24fps with 8-second delay
  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    const runBlinkCycle = async () => {
      // Step through all 10 frames at 24fps (~41.67ms per frame)
      for (let f = 0; f < EYE_FRAMES.length; f++) {
        if (!isMounted) return;
        setEyeFrameIndex(f);
        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, Math.round(1000 / 24));
        });
      }

      // Rest on initial frame
      if (!isMounted) return;
      setEyeFrameIndex(0);

      // Pause for 8 seconds before next blink
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

  // Keyboard navigation for two-tier selection:
  // In 'project' mode: ArrowUp/Down to browse, Enter to select, Esc to return to main menu
  // In 'skill' mode: ArrowUp/Down to browse skills, Esc to return to project mode (with reverse rays spin)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isExiting) return;
      if (navMode === 'project') {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveProjectIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS.length - 1));
          setShakeKey((k) => k + 1);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveProjectIndex((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : 0));
          setShakeKey((k) => k + 1);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setNavMode('skill');
          setActiveSkillIndex(0);
          setRaysSpinType('forward');
          setRaysSpinKey((k) => k + 1);
        } else if (e.key === 'Escape' || e.key === 'Backspace') {
          e.preventDefault();
          handleBack();
        }
      } else if (navMode === 'skill') {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveSkillIndex((prev) => (prev > 0 ? prev - 1 : currentSkills.length - 1));
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveSkillIndex((prev) => (prev < currentSkills.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'Escape' || e.key === 'Backspace') {
          e.preventDefault();
          setNavMode('project');
          setRaysSpinType('reverse');
          setRaysSpinKey((k) => k + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navMode, currentSkills.length, handleBack, isExiting]);

  return (
    <div id="skill-page" className={`skill-page-container ${isExiting ? 'skill-exiting' : 'skill-entering'}`}>

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
            {/* Base body without eye */}
            <img
              src="/skill/vector(without eye).svg"
              alt="Protagonist Vector"
              className="skill-protagonist-vector"
            />

            {/* 10-Frame Blinking Right Eye (Layered below hair, above protagonist) */}
            <div className="skill-eye-container">
              <img
                src={EYE_FRAMES[eyeFrameIndex]}
                alt="Eye Frame"
                className="skill-eye-frame"
              />
            </div>

            {/* Animated Hair Group with organic wave effect (Layered on top of eye) */}
            <div className="skill-animated-hair-group">
              {/* Dark Blue Hair Piece */}
              <div className="skill-dark-blue-hair">
                <img src="/skill/dark-blue-hair.svg" alt="Dark Blue Hair" />
              </div>

              {/* Light Blue Hair Piece */}
              <div className="skill-light-blue-hair">
                <img src="/skill/light-blue-hair.svg" alt="Light Blue Hair" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Water overlay video + texture image — above protagonist & eye, below SKILL text */}
      <SkillWaterOverlay />

      {/* 5. Rotated 'SKILL' Typography (Above video overlay) */}
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
              fontSize="430px"
              letterSpacing="-30.1px"
              fill="#a6a6a6"
            >
              SKILL
            </text>
          </g>
        </svg>
      </div>

      {/* 6. Rotating Lens Flare Light Rays around the Evoker */}
      <div className="skill-rays-wrapper skill-fall-elem">
        <div className="skill-slow-rise">
          <div className="skill-ambient-float">
            <img
              key={raysSpinKey}
              src="/skill/rays.svg"
              alt="Light Rays"
              className={`skill-rays-img ${
                raysSpinType === 'forward'
                  ? 'skill-rays-project-spin'
                  : raysSpinType === 'reverse'
                  ? 'skill-rays-reverse-spin'
                  : 'skill-rays-initial-spin'
              }`}
            />
          </div>
        </div>
      </div>

      {/* 7. Left Project Ribbon Banners (Project 1, 2, 3) */}
      <div className="skill-projects-list">
        {PROJECTS.map((proj, idx) => {
          const isSelected = activeProjectIndex === idx;
          const isConfirmed = isSelected && navMode === 'skill';

          // Accent wedge color: Gray (#757575) when confirmed in skill mode, Red (#E03636) when browsing projects
          const accentFill = isConfirmed ? '#757575' : '#E03636';

          return (
            <div
              key={proj.id}
              className={`skill-project-item ${isSelected ? 'selected' : 'unselected'} ${isConfirmed ? 'confirmed' : ''}`}
              style={{
                top: `${proj.top}px`,
                animationDelay: isExiting ? `${(PROJECTS.length - 1 - idx) * 40}ms` : `${idx * 50}ms`
              }}
              onClick={() => {
                if (!isSelected) {
                  setActiveProjectIndex(idx);
                  setNavMode('project');
                } else {
                  setNavMode('skill');
                  setActiveSkillIndex(0);
                  setRaysSpinType('forward');
                  setRaysSpinKey((k) => k + 1);
                }
              }}
            >
              <svg width="871" height="91" viewBox="0 0 871 91" fill="none" className="skill-project-svg">
                {isSelected ? (
                  <>
                    {/* Selection Accent Wedge: Red in project mode, Gray in skill mode */}
                    <g key={shakeKey} className="envelope-shake">
                      <path d="M185 0H871L857.831 86H185V0Z" fill={accentFill} />
                    </g>
                    {/* White Banner Ribbon */}
                    <path d="M0 5H859.5L843 91H0V5Z" fill="#FFFFFF" />
                    {/* Black Selector Wedge */}
                    <path d="M0 5H229.5L180.5 36.5L322 91H0V5Z" fill="#000000" />
                  </>
                ) : (
                  <>
                    {/* Black Banner Ribbon */}
                    <path d="M0 0H859.5L843 86H0V0Z" fill="#000000" />
                    {/* White Selector Wedge */}
                    <path d="M0 0H228.5L179.5 31.5L321 86H0V0Z" fill="#FFFFFF" />
                  </>
                )}
              </svg>

              {/* Banner Text: subtle yellow glow when confirmed into skill mode */}
              <span
                className={`skill-project-label ${isSelected ? 'text-black' : 'text-white'} ${isConfirmed ? 'project-glow' : ''}`}
              >
                {proj.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* 8. Right Skill Displays with dynamic offset & animated skill selector */}
      <div className={`skill-cards-container ${navMode === 'skill' ? 'focused-offset' : 'resting-offset'} skill-fall-elem`}>
        {/* Dynamic Skill Selector Envelope Envelope (Figma node 142:431) */}
        <div
          className={`skill-selector-envelope ${navMode === 'skill' ? 'active' : 'inactive'}`}
          style={{
            top: `${currentSkills[activeSkillIndex]?.selectorTop || 131}px`
          }}
        >
          <img
            src="/skill/skill-selector.svg"
            alt="Skill Selector Envelope"
            className="skill-selector-img"
          />
        </div>

        {/* Skill Items List */}
        <div className="skill-items-list">
          {currentSkills.map((skill, sIdx) => {
            const isSkillSelected = navMode === 'skill' && activeSkillIndex === sIdx;
            return (
              <div
                key={skill.id}
                className={`skill-card-item skill-card-${sIdx + 1} ${isSkillSelected ? 'selected-skill' : ''}`}
                style={{ top: `${skill.itemTop}px` }}
                onClick={() => {
                  setNavMode('skill');
                  setActiveSkillIndex(sIdx);
                }}
              >
                <svg width="663" height="38" viewBox="0 0 663 38" fill="none" className="skill-card-svg">
                  {/* Black Parallelogram Box on the left */}
                  <path d="M19 1H125.5L110.5 36H0L19 1Z" fill="black" />

                  {/* Tech Stack Logo inside the black box */}
                  <SkillLogo logo={skill.logo} />

                  {/* Skill / Tech Name */}
                  <text
                    x="145"
                    y="19"
                    dominantBaseline="central"
                    fill={isSkillSelected ? '#000000' : '#72FFFF'}
                    fontFamily="'Almarai', 'Archivo Black', 'Fira Sans Extra Condensed', sans-serif"
                    fontWeight="800"
                    fontSize="22px"
                    letterSpacing="-0.03em"
                    fontStyle="italic"
                    style={{ transition: 'fill 0.15s ease' }}
                  >
                    {skill.name}
                  </text>
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
