import React, { useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { achievementsData } from "../data/achievements";
import BrushStroke from "../components/BrushStroke";
import gsap from "gsap";

export function Achievements() {
  const { language, t } = useLanguage();
  const watermarkRef = useRef(null);
  const containerRef = useRef(null);
  const feat = achievementsData.featured;

  // Watermark mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xVal = (e.clientX / window.innerWidth - 0.5) * 30;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 30;

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: xVal * 0.8,
          y: yVal * 0.8,
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
      id="achievements" 
      ref={containerRef}
      className="relative w-full py-24 px-6 md:px-12 xl:px-24 overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]"
    >
      {/* 誉 (Honor) Kanji Watermark */}
      <div 
        ref={watermarkRef}
        className="absolute top-[35%] left-[20%] text-[28vw] select-none pointer-events-none z-10 kanji-watermark leading-none opacity-[0.03]"
      >
        誉
      </div>

      <div className="relative max-w-7xl mx-auto z-20">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-display font-black text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase mb-2">
            {t("achievements.titleLabel")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-1)] leading-tight">
            {t("achievements.title")}
          </h2>
          <span className="font-ui text-xs text-[var(--text-3)] mt-1">{t("achievements.japaneseSubtitle")}</span>
          <BrushStroke variant="horizontal" className="w-56 mt-4 opacity-25" />
        </div>

        {/* ACHIEVEMENTS PRESENTATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Main COEP Highlight Card (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-xl border border-[var(--border-gold)] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[var(--gold)] transition-all duration-300">
            <BrushStroke variant="corner" className="absolute top-2 left-2 opacity-20 text-[var(--gold)]" />
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="font-ui text-[10px] tracking-widest text-[var(--gold)] uppercase font-extrabold px-3 py-1 bg-[rgba(232,160,32,0.08)] border border-[var(--border-gold)] rounded-sm">
                  🥈 {feat.title[language] || feat.title.en}
                </span>
                <span className="font-ui text-xs text-[var(--text-3)] font-bold">
                  {feat.date[language] || feat.date.en}
                </span>
              </div>

              <h3 className="font-display font-black text-2xl md:text-4xl text-[var(--text-1)] leading-tight mb-2">
                {feat.project[language] || feat.project.en}
              </h3>
              <p className="font-ui text-xs text-[var(--gold-dim)] tracking-wider mb-6">
                {feat.institution[language] || feat.institution.en}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-ui uppercase text-[var(--text-3)] font-bold">{t("softSkills.roleLabel")}:</span>
                <span className="text-xs font-body text-[var(--text-2)] font-semibold">{feat.role[language] || feat.role.en}</span>
              </div>

              <p className="font-body text-xs md:text-sm text-[var(--text-2)] leading-relaxed max-w-2xl mb-8">
                {feat.description[language] || feat.description.en}
              </p>
            </div>

            {/* Project Exhibition Gallery inside Card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
              {feat.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="aspect-[4/3] rounded overflow-hidden border border-[var(--border)] bg-[var(--bg)]"
                >
                  <img 
                    src={img} 
                    alt={`COEP I2I Exhibition Snap ${idx + 1}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* Direct visual call-to-action card to LinkedIn (Spans 1 column) */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[var(--border-gold)] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(232,160,32,0.02)] pointer-events-none" />
            
            <div>
              <span className="font-ui text-[9px] tracking-[0.2em] text-[var(--text-3)] uppercase font-black">
                {t("achievements.teamCollab")} ━ LINKEDIN
              </span>
              <h3 className="font-display font-black text-2xl text-[var(--text-1)] mt-4 mb-4 leading-snug">
                More Honors & Accolades
              </h3>
              <p className="font-body text-xs text-[var(--text-2)] leading-relaxed">
                Discover the complete list of academic accomplishments, competitive hacking milestones, hackathons, and certifications listed on my professional profile.
              </p>
            </div>

            <a 
              href={achievementsData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--bg-raised)] hover:bg-[var(--gold)] border border-[var(--border-gold)] text-[var(--text-1)] font-ui text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 hover:text-[var(--bg)]"
            >
              <span>{t("achievements.viewAllLinkedIn")}</span>
              <span className="font-sans font-bold">⟶</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
export default Achievements;
