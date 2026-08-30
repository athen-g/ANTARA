import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
  { id: 0, name: 'Project 1', top: 471 },
  { id: 1, name: 'Project 2', top: 566 },
  { id: 2, name: 'Project 3', top: 656 }
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

export default function SkillPage({ onBack, isEntering = false }) {
  const navigate = useNavigate();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [eyeFrameIndex, setEyeFrameIndex] = useState(0);

  const handleBack = onBack || (() => navigate('/'));

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

  // Keyboard navigation: ArrowUp, ArrowDown, Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveProjectIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS.length - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveProjectIndex((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack]);

  return (
    <div id="skill-page" className={`skill-page-container ${isEntering ? 'skill-entering' : ''}`}>

      {/* Water overlay video + texture image — same as main menu */}
      <SkillWaterOverlay />

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

      {/* 3. Rotated 'SKILL' Typography */}
      <div className="skill-typo-wrapper skill-fall-elem">
        <div className="skill-typo-rotator">
          <span className="skill-typo-text">SKILL</span>
        </div>
      </div>

      {/* 4. Protagonist Silhouette & 10-Frame Blinking Eye Group */}
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

      {/* 5. Rotating Lens Flare Light Rays around the Evoker */}
      <div className="skill-rays-wrapper">
        <img
          src="/skill/rays.svg"
          alt="Light Rays"
          className="skill-rays-img skill-rays-spinning"
        />
      </div>

      {/* 6. Left Project Ribbon Banners (Project 1, 2, 3) */}
      <div className="skill-projects-list">
        {PROJECTS.map((proj, idx) => {
          const isSelected = activeProjectIndex === idx;
          return (
            <div
              key={proj.id}
              className={`skill-project-item ${isSelected ? 'selected' : 'unselected'}`}
              style={{
                top: `${proj.top}px`,
                animationDelay: `${idx * 50}ms`
              }}
              onClick={() => setActiveProjectIndex(idx)}
            >
              <svg width="871" height="91" viewBox="0 0 871 91" fill="none" className="skill-project-svg">
                {isSelected ? (
                  <>
                    {/* Red Selection Accent Wedge */}
                    <path d="M185 0H871L857.831 86H185V0Z" fill="#E03636" />
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

              {/* Banner Text */}
              <span className={`skill-project-label ${isSelected ? 'text-black' : 'text-white'}`}>
                {proj.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* 7. Right Skill & SP Cost Displays */}
      <div className="skill-cards-list skill-fall-elem">
        <div className="skill-card-item skill-card-1">
          <img src="/skill/skill-1.svg" alt="Skill 1" className="skill-card-img" />
        </div>
        <div className="skill-card-item skill-card-2">
          <img src="/skill/skill-2.svg" alt="Skill 2" className="skill-card-img" />
        </div>
      </div>

      {/* 8. Bottom-Right Navigation Command Bar */}
      <div className="skill-bottom-bar">
        <span className="skill-cmd-hint">Use a Skill</span>
        <div className="skill-cmd-buttons">
          <button className="skill-btn-back" onClick={handleBack} title="Back to Menu">
            <span className="skill-btn-circle">Ⓐ</span> Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
