import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function ManifestoMarquee() {
  const { language } = useLanguage();

  const manifestoItems = {
    en: [
      "SHOSHIN ━ BEGINNER'S MIND",
      "EMPATHY IN DESIGN",
      "SADHANA ━ DEDICATED CRAFT",
      "SYSTEMS THINKING",
      "KINTSUGI ━ BEAUTIFUL IMPERFECTION",
      "CODE AS visual poetry",
      "COLLABORATION BY INTENT",
      "DESIGN AT THE THRESHOLD"
    ],
    mr: [
      "शोषिण ━ नवशिक्याची मनस्थिती",
      "डिझाइनमध्ये सहानुभूती",
      "साधना ━ समर्पित हस्तकला",
      "प्रणाली विचारसरणी",
      "किंटसुगी ━ अपूर्णतेचे सौंदर्य",
      "कोड म्हणजे दृश्य कविता",
      "हेतूने सहकार्य",
      "उंबरठ्यावर डिझाइन"
    ],
    ja: [
      "初心 ━ 初心者の心",
      "デザインにおける共感",
      "サダナ ━ 献身的な技",
      "システム思考",
      "金継ぎ ━ 不完全の美",
      "視覚的詩としてのコード",
      "意図的コラボレーション",
      "境界でのデザイン"
    ]
  };

  const items = manifestoItems[language] || manifestoItems.en;

  const renderItems = () => {
    return Array(6)
      .fill(items)
      .flat()
      .map((item, idx) => (
        <span 
          key={idx} 
          className="inline-flex items-center text-[9px] md:text-[11px] font-ui uppercase tracking-[0.25em] text-[var(--text-3)] font-semibold"
        >
          {item}
          <span className="mx-8 text-[var(--gold)] opacity-35">✦</span>
        </span>
      ));
  };

  return (
    <div className="w-full overflow-hidden py-4 border-y border-[rgba(242,235,217,0.03)] bg-[rgba(15,15,13,0.15)] relative select-none">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-full whitespace-nowrap overflow-hidden">
        <div 
          className="inline-flex animate-manifesto-marquee whitespace-nowrap"
          style={{
            animation: "manifestoScroll 45s linear infinite",
            display: "inline-flex"
          }}
        >
          {renderItems()}
        </div>
      </div>

      <style>{`
        @keyframes manifestoScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-16.666%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
