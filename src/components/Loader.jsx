import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onComplete }) {
  const [isDone, setIsDone] = useState(false);
  const name = "ATHARVA GHULE";

  useEffect(() => {
    // 2.0s for assembly, 0.4s for pulse, then trigger exit
    const timer = setTimeout(() => {
      setIsDone(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          key="loader-container"
          className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-[9999] select-none pointer-events-none"
          style={{ backgroundColor: "var(--bg)" }}
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Central Sacred Yantra Mandala */}
          <motion.div 
            className="relative flex items-center justify-center mb-8"
            initial={{ scale: 1 }}
            animate={isDone ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <svg 
              viewBox="0 0 200 200" 
              className="w-40 h-40 md:w-56 md:h-56 fill-none stroke-[var(--gold)]" 
              strokeWidth="0.75"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer boundary circle */}
              <circle cx="100" cy="100" r="90" className="path-dash-animate" style={{ animationDelay: "0s" }} />
              
              {/* Bhupura (Outer Square Gateways) */}
              <path 
                d="M 30,30 L 90,30 L 90,20 L 110,20 L 110,30 L 170,30 L 170,90 L 180,90 L 180,110 L 170,110 L 170,170 L 110,170 L 110,180 L 90,180 L 90,170 L 30,170 L 30,110 L 20,110 L 20,90 L 30,90 Z" 
                className="path-dash-animate" 
                style={{ animationDelay: "0.2s" }}
              />

              {/* Concentric inner circles */}
              <circle cx="100" cy="100" r="76" className="path-dash-animate" style={{ animationDelay: "0.4s" }} />
              <circle cx="100" cy="100" r="66" className="path-dash-animate" style={{ animationDelay: "0.6s" }} />

              {/* 8-Petal Lotus representation */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <ellipse 
                  key={angle} 
                  cx="100" 
                  cy="100" 
                  rx="10" 
                  ry="30" 
                  transform={`rotate(${angle} 100 100)`} 
                  className="path-dash-animate" 
                  style={{ animationDelay: `${0.8 + idx * 0.05}s` }} 
                />
              ))}

              {/* Central Interlocking Triangles */}
              <polygon points="100,52 142,126 58,126" className="path-dash-animate" style={{ animationDelay: "1.2s" }} />
              <polygon points="100,148 142,74 58,74" className="path-dash-animate" style={{ animationDelay: "1.4s" }} />

              <polygon points="100,64 130,116 70,116" className="path-dash-animate" style={{ animationDelay: "1.6s" }} opacity="0.6" />
              <polygon points="100,136 130,84 70,84" className="path-dash-animate" style={{ animationDelay: "1.7s" }} opacity="0.6" />

              {/* Center Bindu (Universal Seed) */}
              <circle cx="100" cy="100" r="2.5" className="fill-[var(--vermillion)]" stroke="none" />
            </svg>
          </motion.div>

          {/* Letter Stagger Name Fade-in */}
          <motion.div 
            className="flex items-center tracking-[0.3em] font-display font-black text-xs md:text-sm text-[var(--text-1)] select-none pl-[0.3em]"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.04,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {name.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className={char === " " ? "w-[0.6em]" : ""}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
