import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SanskriticDivider } from "../components/SanskriticDivider";
import { InkReveal } from "../components/InkReveal";
import { BrushStroke } from "../components/BrushStroke";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Count-up Stat Utility Component
function StatCounter({ end, suffix = "", duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let startTime = null;
    let frameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frameId = requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      cancelAnimationFrame(frameId);
      if (ref.current) observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={ref} className="font-display font-black text-3xl md:text-5xl text-[var(--gold)]">
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  const containerRef = useRef(null);
  const watermarkRef = useRef(null);

  // Trigger entrance stagger for skills using our useScrollReveal hook
  useScrollReveal(containerRef, {
    selector: ".about-stagger",
    type: "fade-up",
    stagger: 0.08,
    once: true
  });

  // Soft mouse parallax for the 間 (ma) watermark
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xVal = (e.clientX / window.innerWidth - 0.5) * 30;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 30;

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: xVal * 0.6,
          y: yVal * 0.6,
          duration: 1.5,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const coreSkills = [
    "Figma", "UI/UX Design", "Design Systems", "React 18", 
    "Vite", "GSAP 3", "Three.js", "Tailwind CSS", 
    "Node.js", "Wix Studio", "Fullstack Development"
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full py-24 px-6 md:px-12 xl:px-24 overflow-hidden bg-[var(--bg-surface)] border-b border-[var(--border)]"
    >
      {/* Lotus OM Divider at Section Entry */}
      <SanskriticDivider variant="B" className="absolute top-0 left-0" />

      {/* 間 Kanji Watermark */}
      <div 
        ref={watermarkRef}
        className="absolute top-1/3 left-[15%] text-[26vw] select-none pointer-events-none z-10 kanji-watermark leading-none"
      >
        間
      </div>

      <div className="relative max-w-7xl mx-auto md:grid md:grid-cols-12 md:gap-16 items-start z-20 pt-16">
        
        {/* Left Column (45% on desktop) */}
        <div className="col-span-5 flex flex-col items-start gap-8">
          
          {/* InkReveal graphic panel */}
          <InkReveal className="w-full flex items-center justify-center p-8 bg-[var(--bg-card)] rounded-xl border border-[var(--border)] relative overflow-hidden group">
            {/* Shoji subtle subgrid */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
            
            {/* Om (ॐ) Devanagari graphic */}
            <div className="font-sanskrit text-[160px] md:text-[200px] leading-none select-none text-[var(--gold)] opacity-15 transition-opacity duration-500 group-hover:opacity-25 py-4">
              ॐ
            </div>
            
            {/* Sumi-e corner details */}
            <BrushStroke variant="corner" className="absolute top-2 left-2 rotate-90 opacity-15" />
            <BrushStroke variant="corner" className="absolute bottom-2 right-2 -rotate-90 opacity-15" />
          </InkReveal>

          {/* calligrapher brushstroke separator */}
          <BrushStroke variant="horizontal" className="w-full opacity-20" />

          {/* Count-Up Stats Panel */}
          <div className="w-full grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-8">
            <div className="flex flex-col items-start">
              <StatCounter end={12} />
              <span className="font-ui uppercase tracking-widest text-[8px] md:text-[9px] text-[var(--text-3)] mt-2 font-bold">
                Projects Shipped
              </span>
            </div>
            <div className="flex flex-col items-start">
              <StatCounter end={3} suffix="+" />
              <span className="font-ui uppercase tracking-widest text-[8px] md:text-[9px] text-[var(--text-3)] mt-2 font-bold">
                Years Practice
              </span>
            </div>
            <div className="flex flex-col items-start">
              <StatCounter end={5} suffix="★" />
              <span className="font-ui uppercase tracking-widest text-[8px] md:text-[9px] text-[var(--text-3)] mt-2 font-bold">
                Client Rating
              </span>
            </div>
          </div>

        </div>

        {/* Right Column (55% on desktop) */}
        <div className="col-span-7 flex flex-col justify-center items-start mt-12 md:mt-0">
          
          {/* Section Heading */}
          <div className="about-stagger flex flex-col items-start mb-6">
            <span className="font-display font-black text-[10px] tracking-[0.25em] text-[var(--gold)] uppercase mb-2">
              MA ━ Space & Pause / 間
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-1)] leading-tight">
              The Space Between.
            </h2>
          </div>

          {/* Editorial Biography */}
          <p className="about-stagger font-body text-sm md:text-base leading-relaxed text-[var(--text-2)] mb-6">
            In Sanskrit, <strong>Antara</strong> represents the space between — the liminal threshold where static designs dissolve into dynamic code. My work resides precisely in this gap, uniting the visceral strokes of calligraphic art with the rigid, logical grids of digital frameworks.
          </p>

          <p className="about-stagger font-body text-sm md:text-base leading-relaxed text-[var(--text-2)] mb-8">
            I craft digital products that breathe. Inspired by Japanese <strong>Sumi-e (墨絵)</strong> and ancient <strong>Yantra geometry</strong>, I value negative space (ma), structured proportions, and subtle micro-movements. I believe code should feel like a single, cohesive artwork, built with clean logic, semantic detail, and absolute obsession.
          </p>

          {/* Staggered Skill Pills */}
          <div className="about-stagger flex flex-wrap gap-2.5">
            {coreSkills.map((skill) => (
              <span
                key={skill}
                className="about-pill inline-block text-[10px] font-ui font-medium tracking-wider uppercase px-4 py-2 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-1)] rounded-full hover:border-[var(--gold)] transition-colors duration-300 select-none"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>

      </div>
      
      <style>{`
        .bg-grid {
          background-image: radial-gradient(var(--border-gold) 1px, transparent 1px);
          background-size: 16px 16px;
        }
      `}</style>
    </section>
  );
}
