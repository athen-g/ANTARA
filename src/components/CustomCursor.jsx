import React, { useEffect, useRef, useState } from "react";
import { useMousePosition } from "../hooks/useMousePosition";

export function CustomCursor() {
  const mouse = useMousePosition();
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  
  const [hovered, setHovered] = useState(false);
  const [projectHovered, setProjectHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Position references for lerping
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect touch device
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(touch);

    // Detect reduced motion settings
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(motion);

    if (touch || motion) return;

    // Show cursor on first mouse movement
    const handleInitialMove = () => {
      setVisible(true);
      window.removeEventListener("mousemove", handleInitialMove);
    };
    window.addEventListener("mousemove", handleInitialMove);

    // Global event delegation for hover states
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest("a, button, [role='button'], input, select, textarea, [data-hover]")) {
        setHovered(true);
      }
      if (target.closest("[data-cursor='project']")) {
        setProjectHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest("a, button, [role='button'], input, select, textarea, [data-hover]")) {
        setHovered(false);
      }
      if (target.closest("[data-cursor='project']")) {
        setProjectHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleInitialMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Physics animation loop for outer ring lerp
  useEffect(() => {
    if (isTouchDevice || reducedMotion) return;

    let rafId;

    const animate = () => {
      // Ring lerp (factor 0.10)
      ringPos.current.x += (mouse.x - ringPos.current.x) * 0.10;
      ringPos.current.y += (mouse.y - ringPos.current.y) * 0.10;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%), 0)`;
      }

      if (dotRef.current) {
        // Dot follows instantly
        dotRef.current.style.transform = `translate3d(calc(${mouse.x}px - 50%), calc(${mouse.y}px - 50%), 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [mouse, isTouchDevice, reducedMotion]);

  if (isTouchDevice || reducedMotion) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out border will-change-transform flex items-center justify-center
          ${visible ? "opacity-100" : "opacity-0 scale-50"}
          ${projectHovered 
            ? "w-[72px] h-[72px] bg-[rgba(160,108,16,0.25)] border-[var(--gold)]" 
            : hovered 
              ? "w-[64px] h-[64px] border-[var(--gold)] mix-blend-difference" 
              : "w-[44px] h-[44px] border-[var(--gold-dim)]"
          }
        `}
        style={{
          // On hover, we morph the border radius to look slightly calligraphic/irregular (brushstroke feel)
          borderRadius: hovered && !projectHovered ? "42% 58% 70% 30% / 45% 45% 55% 55%" : "50%",
        }}
      >
        {/* "開く" (Open) label shown only inside project card hover */}
        {projectHovered && (
          <span 
            className="text-[9px] font-display font-black tracking-wider text-[var(--text-1)] select-none pointer-events-none animate-fade-in"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
          >
            開く
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-[6px] h-[6px] bg-[var(--vermillion)] rounded-full pointer-events-none z-[9999] transition-opacity duration-300 will-change-transform
          ${visible && !projectHovered ? "opacity-100" : "opacity-0"}
        `}
      />
    </>
  );
}
