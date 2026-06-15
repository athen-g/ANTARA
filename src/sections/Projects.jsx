import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import BrushStroke from "../components/BrushStroke";
import { useLanguage } from "../context/LanguageContext";

export function Projects() {
  const { language, t } = useLanguage();
  const projectsWatermark = language === 'ja' ? 'शिल्प' : '匠';
  const triggerRef = useRef(null);
  const scrollRef = useRef(null);
  const watermarkRef = useRef(null);
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

  // GSAP Horizontal Scroll Pinning for Desktop
  useEffect(() => {
    if (isMobile || reducedMotion) return;

    const scrollEl = scrollRef.current;
    const triggerEl = triggerRef.current;
    if (!scrollEl || !triggerEl) return;

    // Calculate total horizontal movement width (scrollWidth - viewportWidth)
    const getScrollAmount = () => {
      return scrollEl.scrollWidth - window.innerWidth;
    };

    let scrollTween = gsap.fromTo(
      scrollEl,
      { x: 0 },
      {
        x: () => -getScrollAmount(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: triggerEl,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          // Sync rendering refreshes
          onRefresh: () => {
            gsap.set(scrollEl, { x: gsap.getProperty(scrollEl, "x") });
          }
        }
      }
    );

    return () => {
      if (scrollTween) {
        scrollTween.revert();
        scrollTween.kill();
      }
    };
  }, [isMobile, reducedMotion]);

  // Soft mouse parallax for the 匠 (takumi) watermark
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xVal = (e.clientX / window.innerWidth - 0.5) * 35;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 35;

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: xVal * 0.8,
          y: yVal * 0.8,
          duration: 1.6,
          ease: "power2.out",
          force3D: true
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={triggerRef} 
      id="projects" 
      className={`relative w-full overflow-hidden border-b border-[var(--border)]
        ${isMobile || reducedMotion ? "py-24 px-6 md:px-12 xl:px-24" : "h-screen bg-bg"}
      `}
    >
      {/* 匠 Kanji Watermark */}
      <div 
        ref={watermarkRef}
        className="absolute top-1/3 left-[40%] text-[26vw] select-none pointer-events-none z-10 kanji-watermark leading-none"
        style={{ fontFamily: language === 'ja' ? "'Noto Serif Devanagari', serif" : 'inherit' }}
      >
        {projectsWatermark}
      </div>

      {isMobile || reducedMotion ? (
        // MOBILE / REDUCED MOTION LAYOUT: Stacked project cards
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="flex flex-col items-start mb-12">
            <span className="font-display font-black text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase mb-2">
              {t("projects.titleLabel")}
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[var(--text-1)]">
              {t("projects.title")}
            </h2>
            <span className="font-ui text-xs text-[var(--text-3)] mt-1">{t("projects.japaneseSubtitle")}</span>
            <BrushStroke variant="horizontal" className="w-48 mt-4 opacity-30" />
          </div>

          <div className="flex flex-col gap-10 w-full mt-8 items-center">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} isStacked={true} />
            ))}
          </div>
        </div>
      ) : (
        // DESKTOP HORIZONTAL EMAKIMONO SCROLL LAYOUT
        <div className="w-full h-full flex items-center relative z-20">
          
          {/* Scroll wrapper translated left */}
          <div 
            ref={scrollRef} 
            className="flex items-center gap-10 px-24 h-[75vh] will-change-transform"
            style={{ display: "flex", flexFlow: "row nowrap" }}
          >
            {/* Title intro card inside the horizontal strip */}
            <div 
              style={{
                width: '35vw',
                minWidth: '420px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
                paddingRight: '48px',
                userSelect: 'none'
              }}
            >
              <span className="font-display font-black text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase mb-2">
                {t("projects.titleLabel")}
              </span>
              <h2 className="font-display font-black text-5xl xl:text-7xl text-[var(--text-1)] leading-none">
                {t("projects.title")}
              </h2>
              <span className="font-ui text-sm text-[var(--text-3)] tracking-widest uppercase mt-3 pl-1">
                {t("projects.japaneseSubtitle")}
              </span>
              <BrushStroke variant="horizontal" className="w-full mt-6 opacity-25" />
              
              <div className="mt-8 text-xs font-ui text-[var(--text-3)] tracking-widest flex items-center gap-2">
                <span>{t("projects.scrollDown")}</span>
                <span className="animate-pulse">━▶</span>
              </div>
            </div>

            {/* List of projects */}
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} isStacked={false} />
            ))}

            {/* Empty space card to close the scroll emakimono neatly */}
            <div className="w-[12vw] flex-shrink-0" />
          </div>

        </div>
      )}
    </div>
  );
}
