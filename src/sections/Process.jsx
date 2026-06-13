import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BrushStroke from "../components/BrushStroke";
import { useLanguage } from "../context/LanguageContext";

export function Process() {
  const { language, t } = useLanguage();
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 1024 : false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    const checkMotion = () => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };

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
      kanji: "探", // Explore / Probe
      label: "Phase I"
    },
    {
      id: "02",
      kanji: "画", // Plan / Picture
      label: "Phase II"
    },
    {
      id: "03",
      kanji: "編", // Compile / Weave
      label: "Phase III"
    },
    {
      id: "04",
      kanji: "放", // Release / Launch
      label: "Phase IV"
    }
  ];

  const stepTranslations = t("process.steps") || [];

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
            {t("process.titleLabel")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-1)] leading-tight">
            {t("process.title")}
          </h2>
          <span className="font-ui text-xs text-[var(--text-3)] mt-1">{t("process.japaneseSubtitle")}</span>
          <BrushStroke variant="horizontal" className="w-56 mt-4 opacity-25" />
        </div>

        {/* TORII GATE PATHWAY AREA */}
        <div className="relative flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-4 lg:px-12 mb-16">
          
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
          {steps.map((step, idx) => {
            const stepTitle = stepTranslations[idx]?.title || "";
            const isSanskritGates = language === 'ja';
            const stepSyllable = isSanskritGates
              ? (idx === 0 ? 'दृ' : idx === 1 ? 'रच' : idx === 2 ? 'सिध' : 'मुक')
              : step.kanji;
            
            return (
              <div 
                key={step.id} 
                className="torii-gate-wrapper flex flex-col items-center z-10 select-none group"
              >
                {/* Torii/Torana SVG element */}
                <div className="relative w-[100px] h-[160px] flex items-center justify-center text-[var(--vermillion)] hover:scale-105 transition-transform duration-300">
                  {isSanskritGates ? (
                    /* Sanskrit temple Torana arch */
                    <svg 
                      viewBox="0 0 100 160" 
                      className="w-full h-full fill-none stroke-current" 
                      strokeWidth="2.2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="30" y1="52" x2="30" y2="160" />
                      <line x1="70" y1="52" x2="70" y2="160" />
                      <path d="M 15,52 C 30,30 70,30 85,52" fill="none" />
                      <path d="M 30,72 C 40,62 60,62 70,72" fill="none" />
                      <path d="M 50,15 L 44,35 L 56,35 Z" fill="currentColor" stroke="none" />
                      <line x1="50" y1="15" x2="50" y2="35" />
                    </svg>
                  ) : (
                    /* Japanese Torii gate */
                    <svg 
                      viewBox="0 0 100 160" 
                      className="w-full h-full fill-none stroke-current" 
                      strokeWidth="2.2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="28" y1="28" x2="25" y2="160" />
                      <line x1="72" y1="28" x2="75" y2="160" />
                      <line x1="16" y1="62" x2="84" y2="62" />
                      <line x1="50" y1="36" x2="50" y2="62" strokeWidth="1.5" />
                      <path 
                        d="M 5,22 C 25,29 75,29 95,22 L 95,34 C 75,40 25,40 5,34 Z" 
                        fill="currentColor" 
                        stroke="none" 
                      />
                    </svg>
                  )}

                  {/* Floating Kanji/Devanagari watermark inside the Gate */}
                  <span 
                    className="absolute top-[68px] font-black text-xl text-[var(--text-3)] group-hover:text-[var(--gold)] transition-colors duration-300"
                    style={{ fontFamily: isSanskritGates ? "'Noto Serif Devanagari', serif" : 'inherit' }}
                  >
                    {stepSyllable}
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
                    {stepTitle}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

        {/* STEPS DETAILED DESCRIPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {steps.map((step, idx) => {
            const stepTitle = stepTranslations[idx]?.title || "";
            const stepDesc = stepTranslations[idx]?.desc || "";
            return (
              <div 
                key={step.id} 
                className="process-card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg hover:border-[var(--border-gold)] transition-colors duration-300 relative"
              >
                <div className="absolute top-4 right-4 text-[10px] font-ui text-[var(--gold-dim)] font-bold">
                  {step.id}
                </div>
                <h4 className="font-display font-black text-lg text-[var(--text-1)] mb-2 uppercase tracking-wide">
                  {stepTitle}
                </h4>
                <p className="font-body text-xs leading-relaxed text-[var(--text-2)]">
                  {stepDesc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
