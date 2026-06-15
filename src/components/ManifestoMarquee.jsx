import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function ManifestoMarquee() {
  const { language } = useLanguage();

  const items = [
    { sk: "शोषिन", ja: "初心", en: "BEGINNER'S MIND" },
    { sk: "साधना", ja: "修行", en: "DEDICATED PRACTICE" },
    { sk: "किंटसुगी", ja: "金継ぎ", en: "IMPERFECTION'S BEAUTY" },
    { sk: "सहयोग", ja: "協調", en: "MINDFUL COLLABORATION" },
    { sk: "सहानुभूती", ja: "共感", en: "EMPATHY WITH PURPOSE" },
    { sk: "संवाद", ja: "対話", en: "HARMONIOUS DIALOGUE" },
    { sk: "सृजन", ja: "創造", en: "CREATIVE EMISSION" }
  ];

  // Repeat items to fill screen width nicely
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div 
      className="relative w-full py-6 bg-[var(--bg-surface)] border-y border-[var(--border)] overflow-hidden select-none z-20"
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      <div 
        className="marquee-track marquee-left flex items-center gap-12 whitespace-nowrap will-change-transform"
        style={{
          display: "flex",
          width: "max-content",
          animationDuration: "40s"
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-4 text-xs tracking-[0.25em] font-display font-black text-[var(--text-2)] hover:text-[var(--gold)] transition-colors duration-300"
          >
            <span className="font-devanagari text-[var(--gold)] text-sm">{item.sk}</span>
            <span>({item.ja})</span>
            <span>━</span>
            <span className="font-inter uppercase text-[10px]">{item.en}</span>
            <span className="text-[var(--vermillion)] opacity-60 ml-4 font-black">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
