import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "../context/LanguageContext";
import { softSkillsData } from "../data/softSkills";
import BrushStroke from "../components/BrushStroke";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function SoftSkills() {
  const { language, t } = useLanguage();
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const watermarkRef = useRef(null);
  const [activePhoto, setActivePhoto] = useState(null);

  // Trigger animations on scroll
  useScrollReveal(sectionRef, {
    selector: ".timeline-card",
    type: "fade-up",
    stagger: 0.15,
    once: true
  });

  // Soft mouse parallax on the 演 (en) watermark
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xVal = (e.clientX / window.innerWidth - 0.5) * 35;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 35;

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: xVal * 0.75,
          y: yVal * 0.75,
          duration: 1.5,
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
      id="soft-skills"
      className="relative w-full py-24 px-6 md:px-12 xl:px-24 overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]"
      style={{ transition: "background-color 0.4s ease, color 0.4s ease" }}
    >
      {/* 演 (En - performance/conduct) Kanji Watermark */}
      <div
        ref={watermarkRef}
        className="absolute top-1/3 left-[30%] text-[28vw] select-none pointer-events-none z-10 kanji-watermark leading-none opacity-5"
      >
        演
      </div>

      <div className="relative max-w-6xl mx-auto z-20">
        
        {/* Section Title */}
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="font-display font-black text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase mb-2">
            {t("softSkills.titleLabel")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-1)] leading-tight">
            {t("softSkills.title")}
          </h2>
          <span className="font-ui text-xs text-[var(--text-3)] mt-1">
            {t("softSkills.japaneseSubtitle")}
          </span>
          <BrushStroke variant="horizontal" className="w-56 mt-4 opacity-25" />
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative w-full min-h-[500px]">
          
          {/* Central Timeline Line (Dashed Calligraphic Style) */}
          <div
            ref={lineRef}
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 opacity-25 z-10"
            style={{
              backgroundImage: "linear-gradient(to bottom, var(--gold) 40%, transparent 40%)",
              backgroundSize: "1px 12px",
              backgroundRepeat: "repeat-y"
            }}
          />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-16 md:gap-24 w-full">
            {softSkillsData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row w-full relative z-20 
                    ${isEven ? "md:justify-start" : "md:justify-end"}
                  `}
                >
                  {/* Timeline Pulse Dot on Central Line */}
                  <div
                    className="absolute left-[20px] md:left-1/2 top-8 w-2.5 h-2.5 rounded-full bg-[var(--bg)] border border-[var(--gold)] -translate-x-1/2 flex items-center justify-center z-30"
                  >
                    <div className="w-1 h-1 rounded-full bg-[var(--vermillion)] animate-ping" />
                  </div>

                  {/* Card Container */}
                  <div
                    className={`timeline-card w-full md:w-[46%] ml-10 md:ml-0 bg-[var(--bg-surface)] border border-[var(--border-gold)] rounded-lg p-6 md:p-8 hover:border-[var(--gold)] transition-all duration-500 hover:shadow-[0_4px_30px_rgba(232,160,32,0.02)]
                      ${isEven ? "md:text-right md:items-end" : "md:text-left md:items-start"}
                      flex flex-col justify-between overflow-hidden
                    `}
                  >
                    <div className="w-full flex flex-col">
                      <span className="font-ui text-[9px] uppercase tracking-widest text-[var(--gold)] font-bold mb-1">
                        {item.date[language] || item.date.en}
                      </span>
                      <h3 className="font-display font-black text-xl md:text-2xl text-[var(--text-1)] mb-2">
                        {item.title[language] || item.title.en}
                      </h3>
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-ui text-[var(--text-3)]">
                          {t("softSkills.roleLabel")}:
                        </span>
                        <span className="text-[10px] font-ui text-[var(--text-2)] font-bold uppercase tracking-wider px-2 py-0.5 border border-[var(--border)] rounded bg-[var(--bg)]">
                          {item.role[language] || item.role.en}
                        </span>
                      </div>
                      <p className="font-body text-xs leading-relaxed text-[var(--text-2)] mb-6">
                        {item.description[language] || item.description.en}
                      </p>
                    </div>

                    {/* Inline Image Reveal Frame */}
                    <div 
                      onClick={() => setActivePhoto(item.poster || item.backdrop)}
                      className="group/img relative w-full h-32 md:h-40 overflow-hidden rounded border border-[var(--border)] bg-[rgba(0,0,0,0.4)] cursor-pointer"
                    >
                      {/* Grayed background image, colorizes on card hover */}
                      <img
                        src={item.backdrop}
                        alt="Event Backdrop"
                        className="w-full h-full object-cover opacity-35 grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 group-hover/img:opacity-85 transition-all duration-700 ease-[var(--ease-ink)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] to-transparent opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-350">
                        <span className="font-ui text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border border-[var(--gold)] bg-[var(--bg)] text-[var(--gold)] font-black rounded backdrop-blur">
                          {t("softSkills.viewPhotos")}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* FULL SCREEN LIGHTBOX GALLERY MODAL */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 w-full h-full bg-[rgba(8,8,8,0.92)] z-[99999] flex flex-col items-center justify-center p-6 animate-fade-in cursor-zoom-out"
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 w-10 h-10 border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--text-1)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
          >
            ✕
          </button>
          <div className="relative max-w-4xl max-h-[80vh] overflow-hidden flex items-center justify-center rounded-lg border border-[var(--border-gold)]">
            <img
              src={activePhoto}
              alt="Expanded Event Media"
              className="w-auto h-auto max-w-full max-h-[75vh] object-contain"
            />
          </div>
          <span className="font-ui text-[10px] uppercase tracking-widest text-[var(--text-3)] mt-6">
            {t("softSkills.closePhotos")}
          </span>
        </div>
      )}
    </section>
  );
}
