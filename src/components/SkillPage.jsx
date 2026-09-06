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

const BASE_ITEM_TOP = 156;
const BASE_SELECTOR_TOP = 131;
const ITEM_HEIGHT_STEP = 55;
const SLANT_STEP = 7.5;
const BASE_ITEM_LEFT = 1123.5;
const BASE_SELECTOR_LEFT = 1076;

const PROJECTS = [
  {
    id: 0,
    name: 'Hyperspace SIG Website',
    top: 471,
    skills: [
      { id: 0, name: 'REACT', logo: 'react' },
      { id: 1, name: 'TYPESCRIPT', logo: 'typescript' },
      { id: 2, name: 'VITE', logo: 'vite' },
      { id: 3, name: 'SUPABASE', logo: 'supabase' },
      { id: 4, name: 'POSTGRESQL', logo: 'postgresql' }
    ]
  },
  {
    id: 1,
    name: 'FutureU',
    top: 566,
    skills: [
      { id: 0, name: 'REACT', logo: 'react' },
      { id: 1, name: 'JAVASCRIPT / TYPESCRIPT', logo: 'js_ts' },
      { id: 2, name: 'CODE SPLITTING', logo: 'codesplit' },
      { id: 3, name: 'LAZY LOADING', logo: 'lazyload' },
      { id: 4, name: 'PERFORMANCE OPTIMIZATION', logo: 'perf' }
    ]
  },
  {
    id: 2,
    name: 'unimark',
    top: 656,
    skills: [
      { id: 0, name: 'NEXT.JS', logo: 'nextjs' },
      { id: 1, name: 'REACT', logo: 'react' },
      { id: 2, name: 'TYPESCRIPT', logo: 'typescript' },
      { id: 3, name: 'GRAPHQL', logo: 'graphql' },
      { id: 4, name: 'REST APIS', logo: 'restapi' },
      { id: 5, name: 'MYSQL', logo: 'mysql' },
      { id: 6, name: 'JWT', logo: 'jwt' },
      { id: 7, name: 'BCRYPT', logo: 'bcrypt' }
    ]
  }
];

function SkillLogo({ logo }) {
  switch (logo) {
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
    case 'vite':
      return (
        <g transform="translate(51.75, 6.5)">
          <path d="M22.5 3.5l-10 19-10-19 8.5 2.5 1.5 6 1.5-6 8.5-2.5z" fill="#646CFF" stroke="white" strokeWidth="0.8"/>
          <path d="M15.5 2.5L8 14h5l-2 7.5 9-11h-5.5l1-8z" fill="#FFD62E"/>
        </g>
      );
    case 'supabase':
      return (
        <g transform="translate(51.75, 6.5)">
          <rect width="24" height="24" rx="4" fill="#1C1C1C" stroke="#3ECF8E" strokeWidth="1"/>
          <path d="M13.5 2.5L3.5 14.5h8.5l-1.5 7 10-12h-8.5l1.5-7z" fill="#3ECF8E"/>
        </g>
      );
    case 'postgresql':
      return (
        <g transform="translate(51.75, 6.5)">
          <circle cx="12" cy="12" r="11.5" fill="#336791" stroke="white" strokeWidth="1"/>
          <text x="12" y="16.5" fill="white" fontSize="9.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">SQL</text>
        </g>
      );
    case 'js_ts':
      return (
        <g transform="translate(51.75, 6.5)">
          <rect width="11.5" height="24" rx="3" fill="#F7DF1E"/>
          <rect x="12.5" width="11.5" height="24" rx="3" fill="#3178C6"/>
          <text x="5.75" y="16" fill="black" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">JS</text>
          <text x="18.25" y="16" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">TS</text>
        </g>
      );
    case 'codesplit':
      return (
        <g transform="translate(51.75, 6.5)" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="2" width="9" height="9" rx="2" fill="rgba(96,165,250,0.3)"/>
          <rect x="14" y="2" width="9" height="9" rx="2" fill="rgba(96,165,250,0.3)"/>
          <rect x="7.5" y="14" width="9" height="9" rx="2" fill="#60A5FA"/>
          <path d="M5.5 11v1.5a1.5 1.5 0 001.5 1.5h1M18.5 11v1.5a1.5 1.5 0 01-1.5 1.5h-1"/>
        </g>
      );
    case 'lazyload':
      return (
        <g transform="translate(51.75, 6.5)" fill="none" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeDasharray="3 3"/>
          <polyline points="12 7 12 12 15.5 14" stroke="white" strokeWidth="1.8"/>
          <circle cx="12" cy="12" r="1.5" fill="white"/>
        </g>
      );
    case 'perf':
      return (
        <g transform="translate(51.75, 6.5)" fill="none" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 16a9.5 9.5 0 1118 0" stroke="white" strokeWidth="1.8"/>
          <path d="M12 13l4-5" stroke="#10B981" strokeWidth="2.2"/>
          <circle cx="12" cy="13" r="2" fill="#10B981"/>
        </g>
      );
    case 'nextjs':
      return (
        <g transform="translate(51.75, 6.5)">
          <circle cx="12" cy="12" r="11.5" fill="black" stroke="white" strokeWidth="1.2"/>
          <path d="M7.5 7v10h2.3v-5.8l6.2 5.8h1.8V7h-2.3v5.8L9.3 7H7.5z" fill="white"/>
        </g>
      );
    case 'graphql':
      return (
        <g transform="translate(51.75, 6.5)" fill="none" stroke="#E535AB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12,2 22,7.8 22,19.2 12,25 2,19.2 2,7.8" fill="rgba(229,53,171,0.15)"/>
          <circle cx="12" cy="2" r="1.8" fill="#E535AB"/>
          <circle cx="22" cy="7.8" r="1.8" fill="#E535AB"/>
          <circle cx="22" cy="19.2" r="1.8" fill="#E535AB"/>
          <circle cx="12" cy="25" r="1.8" fill="#E535AB"/>
          <circle cx="2" cy="19.2" r="1.8" fill="#E535AB"/>
          <circle cx="2" cy="7.8" r="1.8" fill="#E535AB"/>
          <polygon points="12,6.5 18,17 6,17"/>
        </g>
      );
    case 'restapi':
      return (
        <g transform="translate(51.75, 6.5)">
          <rect width="24" height="24" rx="4" fill="#009688"/>
          <text x="12" y="16.5" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-0.5px">REST</text>
        </g>
      );
    case 'mysql':
      return (
        <g transform="translate(51.75, 6.5)">
          <rect width="24" height="24" rx="4" fill="#00758F"/>
          <text x="12" y="16.5" fill="#F29111" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-0.5px">MySQL</text>
        </g>
      );
    case 'jwt':
      return (
        <g transform="translate(51.75, 6.5)">
          <rect width="24" height="24" rx="4" fill="#D63AFF"/>
          <text x="12" y="16.5" fill="white" fontSize="10" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">JWT</text>
        </g>
      );
    case 'bcrypt':
      return (
        <g transform="translate(51.75, 6.5)" fill="none" stroke="#FFB300" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="10" width="18" height="12" rx="2.5" fill="#FFB300"/>
          <path d="M7 10V6a5 5 0 0110 0v4" stroke="white" strokeWidth="2"/>
          <circle cx="12" cy="15.5" r="1.5" fill="black"/>
          <path d="M12 17v2.5" stroke="black" strokeWidth="1.5"/>
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
            top: `${BASE_SELECTOR_TOP + activeSkillIndex * ITEM_HEIGHT_STEP}px`,
            left: `${BASE_SELECTOR_LEFT - activeSkillIndex * SLANT_STEP}px`
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
                className={`skill-card-item ${isSkillSelected ? 'selected-skill' : ''}`}
                style={{
                  top: `${BASE_ITEM_TOP + sIdx * ITEM_HEIGHT_STEP}px`,
                  left: `${BASE_ITEM_LEFT - sIdx * SLANT_STEP}px`
                }}
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
                    fontSize={skill.name.length > 20 ? '16px' : skill.name.length > 14 ? '19px' : '22px'}
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
