import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "../context/LanguageContext";
import { achievementsData } from "../data/achievements";
import BrushStroke from "../components/BrushStroke";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Achievements() {
  const { language, t } = useLanguage();
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);

  // Trigger animations on scroll
  useScrollReveal(sectionRef, {
    selector: ".achievement-card",
    type: "fade-up",
    stagger: 0.15,
    once: true
  });

  // Soft mouse parallax on the 誉 (homare) watermark
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xVal = (e.clientX / window.innerWidth - 0.5) * 35;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 35;

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: xVal * 0.7,
          y: yVal * 0.7,
          duration: 1.4,
          ease: "power2.out",
          force3D: true
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative w-full py-24 px-6 md:px-12 xl:px-24 overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]"
      style={{ transition: "background-color 0.4s ease, color 0.4s ease" }}
    >
      {/* 誉 (Homare - honor/glory) Kanji Watermark */}
      <div
        ref={watermarkRef}
        className="absolute top-1/4 left-[40%] text-[28vw] select-none pointer-events-none z-10 kanji-watermark leading-none opacity-[0.035]"
      >
        誉
      </div>

      <div className="relative max-w-5xl mx-auto z-20">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-display font-black text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase mb-2">
            {t("achievements.titleLabel")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-1)] leading-tight">
            {t("achievements.title")}
          </h2>
          <span className="font-ui text-xs text-[var(--text-3)] mt-1">
            {t("achievements.japaneseSubtitle")}
          </span>
          <BrushStroke variant="horizontal" className="w-56 mt-4 opacity-25" />
        </div>

        {/* CARDS CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-8">
          
          {/* COEP I2I Showcase Card */}
          {achievementsData.map((award) => (
            <div
              key={award.id}
              className="achievement-card col-span-1 md:col-span-8 bg-[var(--bg-surface)] border border-[var(--border-gold)] rounded-xl p-8 flex flex-col justify-between hover:border-[var(--gold)] transition-all duration-500 hover:shadow-[0_4px_30px_rgba(232,160,32,0.02)] relative overflow-hidden"
            >
              {/* Corner accent */}
              <BrushStroke variant="corner" className="absolute top-2 left-2 opacity-25 text-[var(--gold)]" />
              
              <div className="mb-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="font-ui text-[9px] uppercase tracking-widest text-[var(--gold)] font-bold px-3 py-1 border border-[var(--border-gold)] rounded bg-[var(--bg)]">
                    {award.date[language] || award.date.en}
                  </span>
                  <span className="font-ui text-[9px] uppercase tracking-widest text-[var(--vermillion)] font-bold bg-[rgba(193,57,43,0.1)] px-3 py-1 rounded">
                    {t("achievements.educationCategory")}
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl md:text-3xl text-[var(--text-1)] mb-1 leading-snug">
                  {award.title[language] || award.title.en}
                </h3>
                <h4 className="font-ui text-[11px] uppercase tracking-wider text-[var(--text-3)] font-bold mb-6 pl-0.5">
                  {award.organization[language] || award.organization.en}
                </h4>
                <p className="font-body text-sm leading-relaxed text-[var(--text-2)]">
                  {award.description[language] || award.description.en}
                </p>
              </div>

              {/* Tag links */}
              <div className="flex flex-wrap gap-2 mt-auto border-t border-[var(--border)] pt-6">
                <span className="text-[10px] font-ui text-[var(--text-2)] px-2.5 py-1 bg-[var(--bg)] border border-[var(--border)] rounded">
                  {t("achievements.unimarkProject")}
                </span>
                <span className="text-[10px] font-ui text-[var(--text-2)] px-2.5 py-1 bg-[var(--bg)] border border-[var(--border)] rounded">
                  {t("achievements.teamCollab")}
                </span>
              </div>
            </div>
          ))}

          {/* LinkedIn Link Card */}
          <a
            href="https://www.linkedin.com/in/atharva-g45/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="achievement-card col-span-1 md:col-span-4 bg-[var(--bg-surface)] border border-[var(--border-gold)] rounded-xl p-8 flex flex-col justify-between hover:border-[var(--gold)] transition-all duration-500 hover:shadow-[0_4px_30px_rgba(232,160,32,0.03)] group"
          >
            <div className="flex flex-col">
              <span className="font-ui text-[9px] uppercase tracking-widest text-[var(--text-3)] font-bold mb-2">
                MORE ACCOMPLISHMENTS
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-[var(--text-1)] mb-4 group-hover:text-[var(--gold)] transition-colors">
                {t("achievements.viewAllLinkedIn")}
              </h3>
              <p className="font-body text-xs leading-relaxed text-[var(--text-2)]">
                Visit my LinkedIn profile to explore other certifications, Hackathon details, and developer achievements.
              </p>
            </div>
            
            {/* Calligraphic arrow indicator */}
            <div className="mt-8 flex items-center gap-2 font-ui text-xs font-bold text-[var(--gold)] tracking-widest">
              <span>EXPLORE</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">━▶</span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
