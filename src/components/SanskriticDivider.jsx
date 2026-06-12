import React from "react";

export function SanskriticDivider({ 
  variant = "A", 
  className = "", 
  color = "var(--gold-dim)", 
  opacity = 0.25 
}) {
  return (
    <div className={`w-full flex items-center justify-center py-12 overflow-hidden ${className}`}>
      {/* Red Thread intersection point */}
      <div className="absolute left-[40px] w-3 h-3 rounded-full bg-vermillion opacity-40 z-10 hidden md:block"></div>
      
      <div 
        className="relative w-[120px] h-[120px] flex items-center justify-center animate-rotate-slow"
        style={{ color, opacity }}
      >
        {variant === "A" && (
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-full stroke-current fill-none" 
            strokeWidth="0.55"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric Circles */}
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="75" />
            <circle cx="100" cy="100" r="60" />
            
            {/* Interlocking Triangles (Hexagram representation of Shiva/Shakti) */}
            <polygon points="100,28 162,136 38,136" />
            <polygon points="100,172 162,64 38,64" />
            
            {/* Additional inner triangles for Sri Yantra complexity */}
            <polygon points="100,48 145,126 55,126" opacity="0.6" />
            <polygon points="100,152 145,74 55,74" opacity="0.6" />
            
            {/* Center Bindu dot */}
            <circle cx="100" cy="100" r="2" className="fill-current" />
          </svg>
        )}

        {variant === "B" && (
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-full stroke-current fill-none" 
            strokeWidth="0.6"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer circles */}
            <circle cx="100" cy="100" r="88" />
            <circle cx="100" cy="100" r="78" />
            
            {/* 8 Lotus Petals */}
            <g transform="translate(100, 100)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <ellipse 
                  key={angle} 
                  cx="0" 
                  cy="0" 
                  rx="15" 
                  ry="45" 
                  transform={`rotate(${angle})`} 
                  className="stroke-current"
                />
              ))}
            </g>
            
            {/* Inner Circle */}
            <circle cx="100" cy="100" r="42" className="fill-bg" />
            
            {/* Centered OM Symbol (Unrotated text wrapper to keep ॐ upright) */}
            <g transform="rotate(0)">
              {/* Note: Noto Serif Devanagari is imported in index.html */}
              <text 
                x="100" 
                y="111" 
                fontFamily="'Noto Serif Devanagari', serif" 
                fontSize="32" 
                textAnchor="middle" 
                stroke="none" 
                className="fill-current font-normal select-none pointer-events-none"
                style={{ transformOrigin: "100px 100px", transform: "rotate(calc(var(--rotation, 0deg) * -1))" }}
              >
                ॐ
              </text>
            </g>
          </svg>
        )}

        {variant === "C" && (
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-full stroke-current fill-none" 
            strokeWidth="0.65"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bhupura (Outer Square with 4 Gates) */}
            <path d="M 20,20 L 90,20 L 90,10 L 110,10 L 110,20 L 180,20 L 180,90 L 190,90 L 190,110 L 180,110 L 180,180 L 110,180 L 110,190 L 90,190 L 90,180 L 20,180 L 20,110 L 10,110 L 10,90 L 20,90 Z" />
            
            {/* Double Circle inside Bhupura */}
            <circle cx="100" cy="100" r="68" />
            <circle cx="100" cy="100" r="60" />
            
            {/* Concentric triangles inside representing nested chakra gates */}
            <polygon points="100,45 148,128 52,128" />
            <polygon points="100,155 148,72 52,72" />
            <circle cx="100" cy="100" r="16" />
            <circle cx="100" cy="100" r="2" className="fill-current" stroke="none" />
          </svg>
        )}
      </div>
    </div>
  );
}
