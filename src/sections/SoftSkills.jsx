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

        {/* HORIZONTAL ACCORDION PANELS */}
        <div className="flex flex-col lg:flex-row gap-6 w-full min-h-[580px] lg:h-[600px] items-stretch select-none">
          
          {softSkillsEvents.map((event, idx) => {
            const isSelected = activeEvent === event.id;
            
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
                ? "COEP技術大学主催 of ビジネスモデルコンテストにて、チームunimarkのデータベース管理者としてアーキテクチャ設計・共同開発を担当し、全国690以上のチームから勝ち抜き準優勝を達成。"
                : "Managed database design and architectural modeling for team unimark at the national Ignited Innovators of India (I2I) business competition held at COEP University, securing 2nd prize in the Education category.";
            }

            return (
              <div 
                key={event.id}
                onClick={() => setActiveEvent(event.id)}
                className={`relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between p-6 md:p-8 will-change-[flex,transform] gpu
                  ${isSelected 
                    ? "flex-[3.5] border-[var(--gold)] bg-[var(--bg-raised)] shadow-[0_15px_35px_rgba(232,160,32,0.05)]" 
                    : "flex-[1] border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-gold)]"
                  }
                `}
              >
                {/* Backdrop Image Overlay */}
                {event.backdrop && (
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 pointer-events-none z-0
                      ${isSelected ? "opacity-15 scale-105" : "opacity-[0.03] scale-100"}
                    `}
                    style={{ backgroundImage: `url(${event.backdrop})` }}
                  />
                )}
                
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

                  {/* Mid Area: Details Box (Visible ONLY when expanded) */}
                  <div 
                    className={`transition-all duration-700 flex flex-col justify-start gap-4 mt-6
                      ${isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none lg:hidden h-0 overflow-hidden"}
                    `}
                  >
                    {/* Role & Description Box */}
                    <div className="text-[var(--text-2)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-ui uppercase text-[var(--text-3)] font-bold">{t("softSkills.roleLabel")}:</span>
                        <span className="text-xs font-body font-semibold">{event.role[language] || event.role.en}</span>
                      </div>

                      <p className="font-body text-xs md:text-sm leading-relaxed max-w-2xl">
                        {descriptionText}
                      </p>
                    </div>

                    {/* Snaps Grid */}
                    {event.images && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl mt-2">
                        {event.images.slice(0, 3).map((img, imgIdx) => (
                          <div 
                            key={imgIdx} 
                            className="aspect-[4/3] rounded overflow-hidden border border-[var(--border)] bg-[var(--bg)]"
                          >
                            <img 
                              src={img} 
                              alt={`Event snap ${imgIdx + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Bar: Title & Kanji */}
                  <div className="w-full mt-auto relative min-h-[50px] flex items-end justify-between">
                    
                    {/* Event Title (Vertical when collapsed, Horizontal when expanded) */}
                    <h3 
                      className={`font-display font-black text-lg md:text-xl text-[var(--text-1)] tracking-wide transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap will-change-transform lg:absolute lg:left-0 lg:bottom-0 lg:origin-left-bottom
                        ${isSelected 
                          ? "lg:rotate-0 lg:translate-x-0 lg:translate-y-0" 
                          : "lg:rotate-[-90deg] lg:-translate-y-6"
                        }
                      `}
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
          })}

        </div>

      </div>
    </section>
  );
}
export default SoftSkills;
