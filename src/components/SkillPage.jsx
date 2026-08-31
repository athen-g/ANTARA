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
    name: 'Project 1',
    top: 471,
    skills: [
      { id: 0, name: 'Skill 1', img: '/skill/skill-1.svg', selectorTop: 131, itemTop: 156 },
      { id: 1, name: 'Skill 2', img: '/skill/skill-2.svg', selectorTop: 186, itemTop: 211 }
    ]
  },
  {
    id: 1,
    name: 'Project 2',
    top: 566,
    skills: [
      { id: 0, name: 'Skill 1', img: '/skill/skill-1.svg', selectorTop: 131, itemTop: 156 },
      { id: 1, name: 'Skill 2', img: '/skill/skill-2.svg', selectorTop: 186, itemTop: 211 }
    ]
  },
  {
    id: 2,
    name: 'Project 3',
    top: 656,
    skills: [
      { id: 0, name: 'Skill 1', img: '/skill/skill-1.svg', selectorTop: 131, itemTop: 156 },
      { id: 1, name: 'Skill 2', img: '/skill/skill-2.svg', selectorTop: 186, itemTop: 211 }
    ]
  }
];

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

export default function SkillPage({ onBack }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [navMode, setNavMode] = useState('project'); // 'project' | 'skill'
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [eyeFrameIndex, setEyeFrameIndex] = useState(0);
  const [shakeKey, setShakeKey] = useState(0); // increments to re-trigger envelope shake
  const [raysSpinKey, setRaysSpinKey] = useState(0); // increments to re-trigger rays rotation
  const [hasProjectSelected, setHasProjectSelected] = useState(false);

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
  // In 'skill' mode: ArrowUp/Down to browse skills, Esc to return to project mode
  useEffect(() => {
    const handleKeyDown = (e) => {
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
          setHasProjectSelected(true);
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
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navMode, currentSkills.length, handleBack]);

  return (
    <div id="skill-page" className="skill-page-container">

      {/* 1. Protagonist Shadow Silhouette */}
      <div className="skill-shadow-layer skill-fall-elem">
        <img src="/skill/shadow.svg" alt="Shadow" className="skill-shadow-img" />
      </div>

      {/* 2. Tilted Deep Blue Polygon Background */}
      <div className="skill-blue-poly-wrapper skill-fall-elem">
        <div className="skill-blue-poly-rotator">
          <div className="skill-blue-poly-bg" />
        </div>
      </div>

      {/* 3. Protagonist Silhouette & 10-Frame Blinking Eye Group */}
      <div className="skill-protagonist-wrapper skill-fall-elem">
        {/* Base body without eye */}
        <img
          src="/skill/vector(without eye).svg"
          alt="Protagonist Vector"
          className="skill-protagonist-vector"
        />

        {/* 10-Frame Blinking Right Eye */}
        <div className="skill-eye-container">
          <img
            src={EYE_FRAMES[eyeFrameIndex]}
            alt="Eye Frame"
            className="skill-eye-frame"
          />
        </div>
      </div>

      {/* 4. Water overlay video + texture image — above protagonist & eye, below SKILL text */}
      <SkillWaterOverlay />

      {/* 5. Rotated 'SKILL' Typography (Above video overlay) */}
      <div className="skill-typo-wrapper skill-fall-elem">
        <div className="skill-typo-rotator">
          <span className="skill-typo-text">SKILL</span>
        </div>
      </div>

      {/* 6. Rotating Lens Flare Light Rays around the Evoker */}
      <div className="skill-rays-wrapper">
        <img
          key={raysSpinKey}
          src="/skill/rays.svg"
          alt="Light Rays"
          className={`skill-rays-img ${hasProjectSelected ? 'skill-rays-project-spin' : 'skill-rays-initial-spin'}`}
        />
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
                animationDelay: `${idx * 50}ms`
              }}
              onClick={() => {
                if (!isSelected) {
                  setActiveProjectIndex(idx);
                  setNavMode('project');
                } else {
                  setNavMode('skill');
                  setActiveSkillIndex(0);
                  setHasProjectSelected(true);
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
                <img src={skill.img} alt={skill.name} className="skill-card-img" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
