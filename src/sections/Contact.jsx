import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SanskriticDivider } from "../components/SanskriticDivider";
import { BrushStroke } from "../components/BrushStroke";
import { InkReveal } from "../components/InkReveal";
import { MagneticButton } from "../components/MagneticButton";

export function Contact() {
  const watermarkRef = useRef(null);
  const [focusStates, setFocusStates] = useState({ name: false, email: false, message: false });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  // Soft mouse parallax for the 縁 (en) watermark
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xVal = (e.clientX / window.innerWidth - 0.5) * 35;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 35;

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: xVal * 0.75,
          y: yVal * 0.75,
          duration: 1.5,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleFocus = (field) => {
    setFocusStates((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocusStates((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setFormSent(false);
    }, 3000);
  };

  const socialChannels = [
    { name: "GitHub", url: "https://github.com/athen-g" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Figma", url: "https://figma.com" }
  ];

  return (
    // DRAMATIC INK REVEAL CONTAINER WRAPPING CONTACT SECTION
    <InkReveal 
      id="contact" 
      className="relative w-full py-24 px-6 md:px-12 xl:px-24 overflow-hidden border-b border-[var(--border)]"
    >
      {/* Sri Yantra Gate Bhupura Divider at Section Entry */}
      <SanskriticDivider variant="C" className="absolute top-0 left-0" />

      {/* 縁 Kanji Watermark */}
      <div 
        ref={watermarkRef}
        className="absolute top-1/4 right-[10%] text-[26vw] select-none pointer-events-none z-10 kanji-watermark leading-none"
      >
        縁
      </div>

      <div className="relative max-w-7xl mx-auto z-20 pt-16">
        
        {/* Title */}
        <div className="flex flex-col items-start mb-12">
          <span className="font-display font-black text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase mb-2">
            EN ━ Connection & Fate / 縁
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-1)] leading-none">
            Let's create<br />something timeless.
          </h2>
          <span className="font-sanskrit text-sm text-[var(--gold)] opacity-75 mt-3 block select-none">
            सहयोग करें
          </span>
          <BrushStroke variant="horizontal" className="w-56 mt-4 opacity-25" />
        </div>

        {/* Massive calligraphic Email block */}
        <div className="w-full flex flex-col items-start mb-16">
          <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-[var(--text-3)] mb-2 block font-bold">
            DIRECT INQUIRY
          </span>
          <div className="relative inline-block group">
            <a 
              href="mailto:atharvag.design@gmail.com" 
              className="font-display font-black text-xl sm:text-3xl md:text-5xl tracking-tighter text-[var(--text-1)] hover:text-[var(--gold)] transition-colors duration-300 pl-0.5 cursor-none"
              data-hover
            >
              atharvag.design@gmail.com
            </a>
            {/* Vermillion calligraphic underline sweep */}
            <BrushStroke 
              variant="horizontal" 
              className="absolute -bottom-4 left-0 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
              color="var(--vermillion)" 
              opacity={1} 
            />
          </div>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start mt-12">
          
          {/* Left Column: Social nodes framed in Torii gates */}
          <div className="col-span-5 flex flex-col justify-start items-start">
            <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-[var(--text-3)] mb-6 font-bold">
              DIGITAL PATHWAYS
            </span>
            <div className="flex flex-wrap gap-6">
              {socialChannels.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-20 h-24 flex flex-col items-center justify-center text-[var(--gold-dim)] hover:text-[var(--gold)] transition-colors duration-500 group select-none cursor-none"
                  data-hover
                >
                  {/* Custom mini-SVG Torii Gate frame */}
                  <svg 
                    viewBox="0 0 100 120" 
                    className="absolute inset-0 w-full h-full fill-none stroke-current opacity-30 group-hover:opacity-75 transition-opacity duration-500" 
                    strokeWidth="2.2"
                  >
                    {/* Columns slanted */}
                    <line x1="28" y1="20" x2="25" y2="120" />
                    <line x1="72" y1="20" x2="75" y2="120" />
                    {/* Support straight Beam */}
                    <line x1="18" y1="50" x2="82" y2="50" />
                    {/* Top Curved Main Beam */}
                    <path 
                      d="M 10,14 C 30,20 70,20 90,14 L 90,24 C 70,30 30,30 10,24 Z" 
                      fill="currentColor" 
                      stroke="none" 
                    />
                  </svg>
                  
                  {/* Social Name acronym */}
                  <span className="relative z-10 font-ui font-black text-[10px] tracking-wider uppercase text-[var(--text-1)] mt-2">
                    {social.name.substring(0, 2)}
                  </span>
                  
                  {/* Social Name label */}
                  <span className="relative z-10 text-[8px] font-ui tracking-widest text-[var(--text-3)] uppercase mt-1">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="col-span-7">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              
              {/* Name field */}
              <div className="flex flex-col relative">
                <label className="relative block text-[10px] font-ui uppercase tracking-widest text-[var(--text-3)] mb-2 font-bold select-none">
                  Name
                  {/* Focus line sweep */}
                  <BrushStroke 
                    variant="horizontal" 
                    className={`absolute -bottom-1.5 left-0 w-16 transition-transform duration-500 origin-left ${focusStates.name ? "scale-x-100 opacity-80" : "scale-x-0 opacity-0"}`} 
                    color="var(--gold)" 
                    opacity={1} 
                  />
                </label>
                <input
                  type="text"
                  required
                  placeholder="Atharva Ghule"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-gold)] rounded px-4 py-3 text-xs text-[var(--text-1)] placeholder-[var(--text-3)] focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col relative">
                <label className="relative block text-[10px] font-ui uppercase tracking-widest text-[var(--text-3)] mb-2 font-bold select-none">
                  Email
                  <BrushStroke 
                    variant="horizontal" 
                    className={`absolute -bottom-1.5 left-0 w-16 transition-transform duration-500 origin-left ${focusStates.email ? "scale-x-100 opacity-80" : "scale-x-0 opacity-0"}`} 
                    color="var(--gold)" 
                    opacity={1} 
                  />
                </label>
                <input
                  type="email"
                  required
                  placeholder="atharvag@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-gold)] rounded px-4 py-3 text-xs text-[var(--text-1)] placeholder-[var(--text-3)] focus:border-[var(--gold)] focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col relative">
                <label className="relative block text-[10px] font-ui uppercase tracking-widest text-[var(--text-3)] mb-2 font-bold select-none">
                  Message
                  <BrushStroke 
                    variant="horizontal" 
                    className={`absolute -bottom-1.5 left-0 w-16 transition-transform duration-500 origin-left ${focusStates.message ? "scale-x-100 opacity-80" : "scale-x-0 opacity-0"}`} 
                    color="var(--gold)" 
                    opacity={1} 
                  />
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Let's build the space between..."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-gold)] rounded px-4 py-3 text-xs text-[var(--text-1)] placeholder-[var(--text-3)] focus:border-[var(--gold)] focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex justify-start">
                <MagneticButton>
                  <button
                    type="submit"
                    className="px-6 py-3 border border-[var(--gold)] text-[var(--gold)] font-ui font-black uppercase text-[10px] tracking-widest rounded hover:bg-[var(--gold)] hover:text-black transition-colors duration-300 flex items-center gap-2 cursor-none"
                  >
                    {formSent ? "送信中..." : "送信 Send"} <span className="text-[8px] opacity-75">━▶</span>
                  </button>
                </MagneticButton>
              </div>

            </form>
          </div>

        </div>

      </div>
    </InkReveal>
  );
}
