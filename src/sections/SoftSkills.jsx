import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { softSkillsEvents } from "../data/softSkills";
import BrushStroke from "../components/BrushStroke";
import gsap from "gsap";

export function SoftSkills() {
  const { language, t } = useLanguage();
  const [activeEvent, setActiveEvent] = useState("render-creation"); // default active event
  const watermarkRef = useRef(null);
  const containerRef = useRef(null);

  // Watermark mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xVal = (e.clientX / window.innerWidth - 0.5) * 35;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 35;

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: xVal * 0.7,
          y: yVal * 0.7,
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
      id="soft-skills" 
      ref={containerRef}
      className="relative w-full py-24 px-6 md:px-12 xl:px-24 overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]"
    >
      {/* 演 (Conduct) Kanji Watermark */}
      <div 
        ref={watermarkRef}
        className="absolute top-[25%] left-[45%] text-[26vw] select-none pointer-events-none z-10 kanji-watermark leading-none opacity-[0.03]"
      >
        演
      </div>

      <div className="relative max-w-7xl mx-auto z-20">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-display font-black text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase mb-2">
            {t("softSkills.titleLabel")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-1)] leading-tight">
            {t("softSkills.title")}
          </h2>
          <span className="font-ui text-xs text-[var(--text-3)] mt-1">{t("softSkills.japaneseSubtitle")}</span>
          <BrushStroke variant="horizontal" className="w-56 mt-4 opacity-25" />
        </div>

        {/* HORIZONTAL / VERTICAL RESPONSIVE ACCORDION */}
        <div className="flex flex-col lg:flex-row gap-6 w-full min-h-[580px] lg:h-[600px] items-stretch select-none">
          
          {softSkillsEvents.map((event, idx) => (
            <EventCard 
              key={event.id}
              event={event}
              idx={idx}
              language={language}
              t={t}
              isSelected={activeEvent === event.id}
              onClick={() => setActiveEvent(event.id)}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

// ── Sub-component for individual event card managing its own slideshow ──────

function EventCard({ event, idx, language, t, isSelected, onClick }) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // Auto-running image slideshow inside the card
  useEffect(() => {
    if (!isSelected || !event.images || event.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % event.images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isSelected, event.images]);

  // Reset slideshow index when collapsed
  useEffect(() => {
    if (!isSelected) {
      setCurrentImgIdx(0);
    }
  }, [isSelected]);

  // Generate description
  let descriptionText = "";
  if (event.id === "render-creation") {
    descriptionText = language === "mr" 
      ? "हायपरस्पेस एक्सआर एसआयजी (HYPERSPACE XR SIG) चे डिझाइन प्रमुख म्हणून, मी एमईएसडब्ल्यूसीओई एक्सआर लॅबमध्ये आयोजित केलेल्या दोन दिवसीय युनिटी वर्कशॉपच्या यशस्वी नियोजनात योगदान दिले. ब्रँडिंग डिझाइन करण्यासोबतच, मी विद्यार्थ्यांना गेम डेव्हलपमेंटच्या मूलभूत संकल्पना शिकवल्या."
      : language === "ja"
      ? "HYPERSPACE XR SIGのデザインヘッドとして、MESWCOE XRラボで開催された2日間のUnityワークショップを共同運営。ビジュアルアイデンティティのデザインから、Unity基礎指導、アーチェリーゲーム制作までサポートしました。"
      : "As Design Head of HYPERSPACE XR SIG, I co-organized the 2-day Unity Workshop in the MESWCOE XR Lab. Responsibilities included graphic branding, poster creation, and instructing attendees on game development concepts using Unity.";
  } else if (event.id === "activate-immersion") {
    descriptionText = language === "mr" 
      ? "अतिथी व्याख्यानाचे डिझाइन प्रमुख आणि यजमान म्हणून, मी मुख्य पाहुणे अक्षय राठोड (संस्थापक, फायरबर्ड व्हीआर) यांची ओळख करून दिली आणि एक्सआर तंत्रज्ञानावरील सत्र आयोजित केले."
      : language === "ja"
      ? "ゲスト講師であるAkshay Rathod氏（Firebird VR社CEO）の招待講演にて司会・ホストを担当。イベント用スライド等のクリエイティブもデザインしました。"
      : "As Design Head and Host, designed event presentations and introduced our speaker, Mr. Akshay Rathod (CEO, Firebird VR) to address emerging XR trends.";
  } else if (event.id === "initiate-calibration") {
    descriptionText = language === "mr" 
      ? "उद्घाटन कार्यक्रमात डिझाइन प्रमुख म्हणून मी फोटोग्राफीची जबाबदारी घेतली आणि व्हीआर अनुभव सत्राचे व्यवस्थापन केले."
      : language === "ja"
      ? "発足イベントにて、スライドデザイン・写真撮影を担当。イベント後半のVR体験コーナーでは学生のデバイス操作サポートを務めました。"
      : "Managed event branding, coordination, photography, and hosted a VR roller coaster simulator session for college attendees during the inaugural SIG event.";
  } else if (event.id === "git-github-workshop") {
    descriptionText = language === "mr" 
      ? "मल्टीपल एसआयजीच्या सहकार्याने आयोजित केलेल्या गिट आणि गिटहब कार्यशाळेत सह-डेव्हलपर आणि मार्गदर्शक म्हणून विद्यार्थ्यांना व्हर्जन कंट्रोल शिकवले."
      : language === "ja"
      ? "複数の学生技術グループ共同で開催されたワークショップの講師として登壇。バージョン管理からGitHub実習まで、ハンズオン形式で指導しました。"
      : "Served as a workshop instructor in a collaborative session across multiple student groups at college, facilitating hands-on training for Git commands, branches, and collaboration workflows.";
  } else if (event.id === "coep-i2i-collab") {
    descriptionText = language === "mr" 
      ? "सीओईपी टेक्नॉलॉजिकल युनिव्हर्सिटीच्या आय२आय राष्ट्रीय स्पर्धेत युनिमार्क टीमसाठी डेटाबेस व्यवस्थापक म्हणून जबाबदारी सायकल चालवली."
      : language === "ja"
      ? "COEP技術大学主催のビジネスモデルコンテストにて、チームunimarkのデータベース管理者としてアーキテクチャ設計・共同開発を担当し、全国690以上のチームから勝ち抜き準優勝を達成。"
      : "Managed database design and architectural modeling for team unimark at the national Ignited Innovators of India (I2I) business competition held at COEP University, securing 2nd prize in the Education category.";
  }

  return (
    <div 
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between p-6 md:p-8 will-change-[flex,max-height,transform] gpu
        ${isSelected 
          ? "border-[var(--gold)] bg-[var(--bg-raised)] shadow-[0_15px_35px_rgba(232,160,32,0.05)] flex-[3.5] max-h-[600px]" 
          : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-gold)] flex-[1] max-h-[110px] lg:max-h-none"
        }
      `}
    >
      {/* 
        IMAGE SLIDESHOW (Fits card completely)
        Fades slides sequentially based on active image index.
      */}
      {event.images && event.images.map((img, imgIdx) => (
        <div 
          key={imgIdx}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 pointer-events-none z-0"
          style={{
            backgroundImage: `url(${img})`,
            opacity: isSelected && currentImgIdx === imgIdx ? 0.18 : 0,
            zIndex: 0
          }}
        />
      ))}

      {/* Static Backdrop Fallback (when collapsed) */}
      {!isSelected && event.backdrop && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.03] pointer-events-none z-0 scale-100 transition-all duration-700"
          style={{ backgroundImage: `url(${event.backdrop})` }}
        />
      )}

      {/* High-contrast gradient overlay to ensure text readability */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-[rgba(8,8,8,0.92)] via-[rgba(8,8,8,0.75)] to-[rgba(8,8,8,0.45)] pointer-events-none z-0 transition-opacity duration-700
          ${isSelected ? "opacity-100" : "opacity-0"}
        `}
      />
      
      {/* Inner Content Grid */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        
        {/* Top Bar: Date / Index */}
        <div className="flex items-center justify-between w-full">
          <span className="font-ui text-[9px] tracking-[0.2em] text-[var(--gold)] uppercase font-black">
            {event.date[language] || event.date.en}
          </span>
          <span className="font-display font-black text-xs text-[var(--text-3)]">
            0{idx + 1}
          </span>
        </div>

        {/* Mid Area: Event Details (Visible only when expanded) */}
        <div 
          className={`transition-all duration-700 mt-4 overflow-hidden
            ${isSelected 
              ? "opacity-100 max-h-[400px] translate-y-0" 
              : "opacity-0 max-h-0 translate-y-2 pointer-events-none lg:hidden"
            }
          `}
        >
          <div className="text-[var(--text-2)] max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-ui uppercase text-[var(--text-3)] font-bold">{t("softSkills.roleLabel")}:</span>
              <span className="text-xs font-body font-semibold">{event.role[language] || event.role.en}</span>
            </div>

            <p className="font-body text-xs md:text-sm leading-relaxed">
              {descriptionText}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Title & Calligraphy Accent */}
        <div className="w-full mt-auto relative min-h-[50px] flex items-end justify-between">
          
          {/* 
            Event Title
            - Rotated vertically and wrapped cleanly when collapsed.
            - Transitions to horizontal when expanded.
          */}
          <h3 
            className={`font-display font-black text-[15px] md:text-lg text-[var(--text-1)] tracking-wide transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-normal will-change-transform lg:origin-left-bottom lg:absolute lg:left-0 lg:bottom-0
              ${isSelected 
                ? "lg:rotate-0 lg:translate-x-0 lg:translate-y-0 lg:max-w-none" 
                : "lg:rotate-[-90deg] lg:-translate-y-6 lg:translate-x-1 lg:max-w-[340px] lg:leading-[1.1]"
              }
            `}
            style={{
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            {event.title[language] || event.title.en}
          </h3>

          {/* Small Calligraphic Accent */}
          <div className="absolute right-0 bottom-0 text-[var(--vermillion)] font-black text-xl">
            ✦
          </div>

        </div>

      </div>

    </div>
  );
}

export default SoftSkills;
