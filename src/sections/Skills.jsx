import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { skillCategories } from "../data/skills";
import SanskriticDivider from "../components/SanskriticDivider";
import BrushStroke from "../components/BrushStroke";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";

export function Skills() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const watermarkRef = useRef(null);

  // Trigger stagger fade-in for bento cells on scroll entrance
  useScrollReveal(containerRef, {
    selector: ".bento-cell",
    type: "scale-in",
    stagger: 0.1,
    once: true
  });

  // Trigger stagger fade-in for skill chips
  useScrollReveal(containerRef, {
    selector: ".skill-chip",
    type: "fade-up",
    stagger: 0.04,
    once: true,
    delay: 0.3
  });

  // Soft mouse parallax for the 道 (dō) watermark
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xVal = (e.clientX / window.innerWidth - 0.5) * 30;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 30;

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: xVal * 0.7,
          y: yVal * 0.7,
          duration: 1.4,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Helper to map category IDs to custom CSS grid area classes on desktop
  const gridClasses = {
    design: "md:col-span-1 md:row-span-2 min-h-[380px] md:min-h-[520px]",
    frontend: "md:col-span-1 md:row-span-1 min-h-[200px] md:min-h-[250px]",
    backend: "md:col-span-1 md:row-span-2 min-h-[380px] md:min-h-[520px]",
    nocode: "md:col-span-1 md:row-span-1 min-h-[200px] md:min-h-[250px]",
    devtools: "md:col-span-2 md:row-span-1 min-h-[200px] md:min-h-[250px]"
  };

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative w-full py-24 px-6 md:px-12 xl:px-24 overflow-hidden border-b border-[var(--border)]"
    >
      {/* 道 Kanji Watermark */}
      <div 
        ref={watermarkRef}
        className="absolute top-1/4 left-[35%] text-[26vw] select-none pointer-events-none z-10 kanji-watermark leading-none"
      >
        道
      </div>

      <div className="relative max-w-7xl mx-auto z-20">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-display font-black text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase mb-2">
            {t("skills.titleLabel")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-1)] leading-tight">
            {t("skills.title")}
          </h2>
          <span className="font-ui text-xs text-[var(--text-3)] mt-1">{t("skills.japaneseSubtitle")}</span>
          <BrushStroke variant="horizontal" className="w-56 mt-4 opacity-25" />
        </div>

        {/* YANTRA BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:grid-rows-3 auto-rows-auto">
          
          {/* Bento Cell 1: Design Tools (Left Column, spans 2 rows) */}
          <div 
            className={`bento-cell group relative bg-[var(--bg-card)] rounded-xl border border-[var(--border-gold)] p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[var(--gold)] ${gridClasses.design}`}
          >
            <BrushStroke variant="corner" className="absolute top-2 left-2 opacity-20 text-[var(--gold)]" />
            <div>
              <span className="font-ui uppercase tracking-widest text-[9px] text-[var(--gold)] font-black">
                {skillCategories[0].japanese}
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-[var(--text-1)] mt-1 mb-4">
                {t("skills.categories.design")}
              </h3>
              <p className="font-body text-xs text-[var(--text-2)] mb-6 leading-relaxed">
                {t("skills.designDesc")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {skillCategories[0].skills.map((skill) => (
                <span key={skill} className="skill-chip text-[9px] font-ui tracking-wider px-2.5 py-1.5 bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--gold)] rounded transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bento Cell 2: Frontend (Center Column, Row 1) */}
          <div 
            className={`bento-cell group relative bg-[var(--bg-card)] rounded-xl border border-[var(--border-gold)] p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[var(--gold)] ${gridClasses.frontend}`}
          >
            <BrushStroke variant="corner" className="absolute top-2 left-2 opacity-20 text-[var(--gold)]" />
            <div>
              <span className="font-ui uppercase tracking-widest text-[9px] text-[var(--gold)] font-black">
                {skillCategories[1].japanese}
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-[var(--text-1)] mt-1 mb-2">
                {t("skills.categories.frontend")}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {skillCategories[1].skills.map((skill) => (
                <span key={skill} className="skill-chip text-[9px] font-ui tracking-wider px-2.5 py-1.5 bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--gold)] rounded transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bento Cell 3: Backend (Right Column, spans 2 rows) */}
          <div 
            className={`bento-cell group relative bg-[var(--bg-card)] rounded-xl border border-[var(--border-gold)] p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[var(--gold)] ${gridClasses.backend}`}
          >
            <BrushStroke variant="corner" className="absolute top-2 left-2 opacity-20 text-[var(--gold)]" />
            <div>
              <span className="font-ui uppercase tracking-widest text-[9px] text-[var(--gold)] font-black">
                {skillCategories[2].japanese}
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-[var(--text-1)] mt-1 mb-4">
                {t("skills.categories.backend")}
              </h3>
              <p className="font-body text-xs text-[var(--text-2)] mb-6 leading-relaxed">
                {t("skills.backendDesc")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {skillCategories[2].skills.map((skill) => (
                <span key={skill} className="skill-chip text-[9px] font-ui tracking-wider px-2.5 py-1.5 bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--gold)] rounded transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Center Cell: Hosting the Rotating Yantra (Center Column, Row 2) */}
          <div className="hidden md:flex items-center justify-center p-6 min-h-[250px] relative">
            <div className="flex flex-col items-center">
              {/* Central Bindu of Bento Grid (Mandala Rotating) */}
              <div className="relative w-28 h-28 opacity-65 text-[var(--gold)] animate-rotate-slow flex items-center justify-center">
                <SanskriticDivider variant="A" className="w-full h-full p-0 py-0" opacity={0.9} />
              </div>
              <span className="font-ui text-[8px] tracking-[0.3em] uppercase text-[var(--text-3)] mt-2 select-none font-bold">
                BINDU ━ CENTRE
              </span>
            </div>
          </div>

          {/* Bento Cell 4: No-Code (Left Column, Row 3) */}
          <div 
            className={`bento-cell group relative bg-[var(--bg-card)] rounded-xl border border-[var(--border-gold)] p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[var(--gold)] ${gridClasses.nocode}`}
          >
            <BrushStroke variant="corner" className="absolute top-2 left-2 opacity-20 text-[var(--gold)]" />
            <div>
              <span className="font-ui uppercase tracking-widest text-[9px] text-[var(--gold)] font-black">
                {skillCategories[3].japanese}
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-[var(--text-1)] mt-1 mb-2">
                {t("skills.categories.nocode")}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {skillCategories[3].skills.map((skill) => (
                <span key={skill} className="skill-chip text-[9px] font-ui tracking-wider px-2.5 py-1.5 bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--gold)] rounded transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bento Cell 5: Dev Tools (Center/Right Columns, Row 3) */}
          <div 
            className={`bento-cell group relative bg-[var(--bg-card)] rounded-xl border border-[var(--border-gold)] p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[var(--gold)] ${gridClasses.devtools}`}
          >
            <BrushStroke variant="corner" className="absolute top-2 left-2 opacity-20 text-[var(--gold)]" />
            <div>
              <span className="font-ui uppercase tracking-widest text-[9px] text-[var(--gold)] font-black">
                {skillCategories[4].japanese}
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-[var(--text-1)] mt-1 mb-2">
                {t("skills.categories.devtools")}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {skillCategories[4].skills.map((skill) => (
                <span key={skill} className="skill-chip text-[9px] font-ui tracking-wider px-2.5 py-1.5 bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--gold)] rounded transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
