import React from "react";

export function MarqueeTicker() {
  const row1Items = [
    "UI/UX Design",
    "Frontend Dev",
    "Fullstack",
    "React",
    "Next.js",
    "Figma",
    "Node.js",
    "Tailwind",
    "TypeScript"
  ];

  const row2Items = [
    { text: "デザイン", jp: true },
    { text: "開発", jp: true },
    { text: "クリエイティブ", jp: true },
    { text: "Wix", jp: false },
    { text: "Vercel", jp: false },
    { text: "PostgreSQL", jp: false },
    { text: "Framer", jp: false },
    { text: "設計", jp: true },
    { text: "コード", jp: true }
  ];

  // Helper to repeat items to ensure a seamless looping width
  const renderRow1 = () => {
    return Array(6)
      .fill(row1Items)
      .flat()
      .map((item, idx) => (
        <span key={idx} className="inline-flex items-center text-xs md:text-sm font-ui uppercase tracking-widest text-[var(--text-3)] font-medium">
          {item}
          <span className="mx-6 text-[var(--gold-dim)] opacity-40">·</span>
        </span>
      ));
  };

  const renderRow2 = () => {
    return Array(6)
      .fill(row2Items)
      .flat()
      .map((item, idx) => (
        <span 
          key={idx} 
          className={`inline-flex items-center text-xs md:text-sm font-ui tracking-widest font-medium
            ${item.jp ? "text-[var(--gold)] text-[1.1em] font-display font-bold" : "text-[var(--text-3)] uppercase"}
          `}
        >
          {item.text}
          <span className="mx-6 text-[var(--vermillion)] opacity-30">·</span>
        </span>
      ));
  };

  return (
    <div className="w-full overflow-hidden py-10 flex flex-col gap-6 relative border-y border-[rgba(242,235,217,0.03)] bg-[rgba(15,15,13,0.3)]">
      {/* Dynamic Gradient Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none"></div>

      {/* Row 1: Left scrolling */}
      <div className="flex w-full whitespace-nowrap overflow-hidden">
        <div 
          className="inline-flex animate-marquee-left whitespace-nowrap"
          style={{
            animation: "marqueeLeft 26s linear infinite",
            display: "inline-flex"
          }}
        >
          {renderRow1()}
        </div>
      </div>

      {/* Row 2: Right scrolling */}
      <div className="flex w-full whitespace-nowrap overflow-hidden">
        <div 
          className="inline-flex animate-marquee-right whitespace-nowrap"
          style={{
            animation: "marqueeRight 28s linear infinite",
            display: "inline-flex"
          }}
        >
          {renderRow2()}
        </div>
      </div>

      {/* Embedded keyframe styles to guarantee self-containment */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-16.666%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-16.666%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </div>
  );
}
