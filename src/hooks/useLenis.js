import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    // Disable smooth scroll if reduced motion is requested
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    let rafId;
    function update(time) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, []);

  return React.createElement(LenisContext.Provider, { value: lenis }, children);
}

export function useLenis() {
  return useContext(LenisContext);
}
