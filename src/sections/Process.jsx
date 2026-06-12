import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BrushStroke from "../components/BrushStroke";

export function Process() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const checkMotion = () => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };

    checkViewport();
    checkMotion();

    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // GSAP ScrollTrigger Animations for Torii Pathway
  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    const path = pathRef.current;
    if (!container) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    // Animate the path line draw-in
    if (path) {
      if (isMobile) {
        timeline.fromTo(
          path,
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 1.8, ease: "power2.inOut" }
        );
      } else {
        timeline.fromTo(
          path,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 2.0, ease: "power2.inOut" }
        );
      }
    }

    // Stagger fade-in for Torii gates
    timeline.fromTo(
      ".torii-gate-wrapper",
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.25, ease: "power3.out" },
      "-=1.5"
    );

    // Stagger fade-in for process details cards
    timeline.fromTo(
      ".process-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      "-=0.6"
    );
  }, [isMobile, reducedMotion]);

  const steps = [
    {
      id: "01",
      name: "Discover",
      kanji: "探", // Tan (Explore / Probe)
      label: "Phase I",
      description: "Understanding requirements, detailing constraints, and mapping out the sacred geometry of the problem space."
    },
    {
      id: "02",
      name: "Design",
      kanji: "画", // Gaku (Plan / Picture)
      label: "Phase II",
      description: "Carving negative space, structuring layouts, and sketching proportions with absolute visual focus."
    },
    {
      id: "03",
      name: "Develop",
      kanji: "編", // Hen (Compile / Weave)
      label: "Phase III",
      description: "Weaving interactive react structures and optimizing performance for buttery-smooth rendering curves."
    },
    {
      id: "04",
      name: "Deploy",
      kanji: "放", // Hō (Release / Launch)
      label: "Phase IV",
      description: "Auditing details, polishing web accessibility, and hosting a fast production artifact on Vercel."
    }
  ];

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="relative w-full py-24 px-6 md:px-12 xl:px-24 overflow-hidden border-b border-[var(--border)]"
    >
      <div className="relative max-w-7xl mx-auto z-20">
        
        {/* Section Title */}
        <div className="flex flex-col items-start mb-20">
          <span className="font-display font-black text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase mb-2">
            Process — 経路 — The Pathway
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-1)] leading-tight">
            Creative Process.
          </h2>
          <span className="font-ui text-xs text-[var(--text-3)] mt-1">道具と技</span>
          <BrushStroke variant="horizontal" className="w-56 mt-4 opacity-25" />
        </div>

        {/* TORII GATE PATHWAY AREA */}
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 md:px-12 mb-16">
          
          {/* 
            DOTTED PATH LINE
            Runs horizontally on desktop through gates, and vertically on mobile.
          */}
          {!reducedMotion && (
            isMobile ? (
              // Vertical Dotted Path for Mobile
              <div 
                ref={pathRef}
                className="absolute top-10 bottom-10 left-1/2 w-[2px] pointer-events-none z-0 origin-top"
                style={{
                  backgroundImage: "linear-gradient(to bottom, var(--gold) 40%, transparent 40%)",
                  backgroundSize: "2px 10px",
                  opacity: 0.35
                }}
              />
            ) : (
              // Horizontal Dotted Path for Desktop
              <div 
                ref={pathRef}
                className="absolute left-0 right-0 top-[80px] h-[2px] pointer-events-none z-0 origin-left"
                style={{
                  backgroundImage: "linear-gradient(to right, var(--gold) 40%, transparent 40%)",
                  backgroundSize: "10px 2px",
                  opacity: 0.35
                }}
              />
            )
          )}

          {/* Torii Gates List */}
          {steps.map((step, idx) => (
            <div 
              key={step.id} 
              className="torii-gate-wrapper flex flex-col items-center z-10 select-none group"
            >
              {/* Torii SVG element */}
              <div className="relative w-[100px] h-[160px] flex items-center justify-center text-[var(--vermillion)] hover:scale-105 transition-transform duration-300">
                <svg 
                  viewBox="0 0 100 160" 
                  className="w-full h-full fill-none stroke-current" 
                  strokeWidth="2.2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Vertical Columns slanted slightly inwards */}
                  <line x1="28" y1="28" x2="25" y2="160" />
                  <line x1="72" y1="28" x2="75" y2="160" />
                  
                  {/* Straight lintel support beam (Nuki) */}
                  <line x1="16" y1="62" x2="84" y2="62" />
                  
                  {/* Central lintel support block (Gakuzuka) */}
                  <line x1="50" y1="36" x2="50" y2="62" strokeWidth="1.5" />
                  
                  {/* Top curved main beam (Kasagi) with detailed curvature */}
                  <path 
                    d="M 5,22 C 25,29 75,29 95,22 L 95,34 C 75,40 25,40 5,34 Z" 
                    fill="currentColor" 
                    stroke="none" 
                  />
                </svg>

                {/* Floating Kanji watermark inside the Gate */}
                <span className="absolute top-[68px] font-display font-black text-xl text-[var(--text-3)] group-hover:text-[var(--gold)] transition-colors duration-300">
                  {step.kanji}
                </span>

                {/* Micro Red Thread intersection */}
                <div className="absolute top-[80px] w-1.5 h-1.5 rounded-full bg-[var(--vermillion)] opacity-60 z-20"></div>
              </div>

              {/* Label */}
              <div className="mt-4 flex flex-col items-center">
                <span className="font-ui text-[9px] uppercase tracking-widest text-[var(--text-3)] font-bold">
                  {step.label}
                </span>
                <span className="font-display font-black text-sm text-[var(--text-1)] mt-1 tracking-wider uppercase">
                  {step.name}
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* STEPS DETAILED DESCRIPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="process-card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg hover:border-[var(--border-gold)] transition-colors duration-300 relative"
            >
              <div className="absolute top-4 right-4 text-[10px] font-ui text-[var(--gold-dim)] font-bold">
                {step.id}
              </div>
              <h4 className="font-display font-black text-lg text-[var(--text-1)] mb-2 uppercase tracking-wide">
                {step.name}
              </h4>
              <p className="font-body text-xs leading-relaxed text-[var(--text-2)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
