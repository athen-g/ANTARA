import React, { useEffect, useRef, useState } from "react";

export function InkReveal({ children, className = "", delay = 0 }) {
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [clipPaths, setClipPaths] = useState({ initial: "", final: "" });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    // Generate unique matching 20-point clip-path polygons
    const pointsCount = 20;
    const angleStep = (Math.PI * 2) / pointsCount;
    const initialPoints = [];
    const finalPoints = [];

    // Use a pseudo-random seed to make it deterministic per component mount
    const seed = Math.random();

    for (let i = 0; i < pointsCount; i++) {
      const angle = i * angleStep;
      
      // Initial tight ink-drop coordinate
      const initVariance = 1 + (Math.sin(angle * 4 + seed * 10) * 0.35); // irregular circle
      const rInit = 2.5 * initVariance;
      const initX = 50 + Math.cos(angle) * rInit;
      const initY = 50 + Math.sin(angle) * rInit;
      initialPoints.push(`${initX.toFixed(2)}% ${initY.toFixed(2)}%`);

      // Final expanded boundary coordinate
      const finalVariance = 1 + (Math.cos(angle * 5 + seed * 5) * 0.25);
      const rFinal = 130 * finalVariance;
      const finalX = 50 + Math.cos(angle) * rFinal;
      const finalY = 50 + Math.sin(angle) * rFinal;
      finalPoints.push(`${finalX.toFixed(2)}% ${finalY.toFixed(2)}%`);
    }

    setClipPaths({
      initial: `polygon(${initialPoints.join(", ")})`,
      final: `polygon(${finalPoints.join(", ")})`
    });

    // Intersection Observer to trigger entrance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add configurable stagger/delay
          setTimeout(() => {
            setRevealed(true);
          }, delay * 1000);
          
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, [delay]);

  const style = {
    clipPath: reducedMotion ? "none" : revealed ? clipPaths.final : clipPaths.initial,
    transition: reducedMotion 
      ? "none" 
      : "clip-path 1.4s cubic-bezier(0.25, 1, 0.3, 1), opacity 0.8s ease-out",
    opacity: revealed ? 1 : 0
  };

  return (
    <div
      ref={containerRef}
      className={`will-change-[clip-path,opacity] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
