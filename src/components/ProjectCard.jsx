import React, { useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { BrushStroke } from "./BrushStroke";

export function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const primaryAccent = project.accent[0];
  const secondaryAccent = project.accent[1];

  return (
    <div
      className="group relative w-full md:w-[65vw] xl:w-[45vw] flex-shrink-0 bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6 md:p-8 flex flex-col justify-between transition-all duration-500 ease-out select-none cursor-none overflow-hidden"
      data-cursor="project"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translate3d(0, -8px, 0)" : "translate3d(0, 0, 0)",
        borderColor: hovered ? "var(--border-gold)" : "var(--border)",
        boxShadow: hovered 
          ? `0 20px 40px -15px ${primaryAccent}44, 0 1px 3px rgba(0, 0, 0, 0.2)`
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Decorative Ink Brushstroke Sweep on Hover */}
      <div 
        className="absolute top-0 left-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
      >
        <BrushStroke variant="horizontal" color={primaryAccent} opacity={0.65} className="h-[4px] w-full" />
      </div>

      {/* Top Section: Watermark ID & Title */}
      <div className="relative">
        {/* Accent Left Border */}
        <div 
          className="absolute -left-6 md:-left-8 top-0 h-10 w-[4px] transition-all duration-500"
          style={{ 
            backgroundColor: primaryAccent,
            boxShadow: hovered ? `0 0 12px ${primaryAccent}` : "none"
          }}
        />

        {/* Large Watermark ID Number */}
        <span 
          className="absolute top-0 right-0 font-display font-black text-8xl md:text-9xl tracking-tighter select-none pointer-events-none transition-colors duration-500 leading-none"
          style={{ color: "var(--bg-raised)" }}
        >
          {project.id}
        </span>

        {/* Title */}
        <h3 className="relative font-display font-black text-2xl md:text-4xl text-[var(--text-1)] z-10 pt-2 pr-16 leading-tight">
          {project.title}
        </h3>

        {/* Tag Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-ui font-medium tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-[var(--border-gold)] text-[var(--gold)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Middle Section: Visual Placeholder Grid & Description */}
      <div className="my-6 flex flex-col gap-6">
        {/* Gradient Yantra Placeholder */}
        <div 
          className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden flex items-center justify-center border border-[rgba(242,235,217,0.03)]"
          style={{
            background: `linear-gradient(135deg, ${primaryAccent}99, ${secondaryAccent}bb)`
          }}
        >
          {/* Subtle Yantra Overlay (Simplified Sri Yantra geometry) */}
          <div className="absolute w-28 h-28 opacity-15 text-white animate-rotate-slow">
            <svg 
              viewBox="0 0 200 200" 
              className="w-full h-full stroke-current fill-none" 
              strokeWidth="0.8"
            >
              <circle cx="100" cy="100" r="90" />
              <polygon points="100,28 162,136 38,136" />
              <polygon points="100,172 162,64 38,64" />
              <circle cx="100" cy="100" r="60" />
              <circle cx="100" cy="100" r="40" />
            </svg>
          </div>
          
          {/* Subtle sumi-e ink smoke background */}
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4'/%3E%3CfeDisplacementMap scale='20'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23f)'/%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Short Description */}
        <p className="font-body text-xs md:text-sm leading-relaxed text-[var(--text-2)] line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Bottom Section: Action Button */}
      <div className="mt-auto flex items-center justify-between">
        {/* Red Thread connection node */}
        <div className="flex items-center gap-1.5">
          <span 
            className="w-1.5 h-1.5 rounded-full bg-[var(--vermillion)] transition-all duration-300"
            style={{ 
              transform: hovered ? "scale(1.5)" : "scale(1)",
              boxShadow: hovered ? `0 0 8px var(--vermillion)` : "none"
            }}
          />
          <span className="text-[9px] font-ui tracking-widest text-[var(--text-3)] uppercase">LINK</span>
        </div>

        {/* Visit Button wrapped in Magnetic physics */}
        <MagneticButton>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-ui font-bold tracking-widest uppercase px-4 py-2 border border-[var(--gold-dim)] text-[var(--gold)] rounded hover:bg-[var(--gold)] hover:text-black hover:border-transparent transition-all duration-300"
          >
            開く <span className="text-[8px] opacity-80">━ Visit</span>
          </a>
        </MagneticButton>
      </div>
    </div>
  );
}
