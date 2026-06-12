import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import layout components
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { ParticleField } from "./components/ParticleField";
import { CustomCursor } from "./components/CustomCursor";

// Import sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import { MarqueeTicker } from "./components/MarqueeTicker";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Process } from "./sections/Process";
import Contact from "./sections/Contact";
import { Footer } from "./sections/Footer";

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [motionPreference, setMotionPreference] = useState(false);

  useEffect(() => {
    // Detect system reduced motion preferences
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionPreference(mediaQuery.matches);

    const handleMotionChange = (e) => {
      setMotionPreference(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  return (
    <>
      {/* High-frequency visual grain texture overlay */}
      <div className="grain-overlay" />

      {/* Screen Loader Sequence */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Main Portfolio Presentation (rendered after loader exits) */}
      {!loading && (
        <div className="relative min-h-screen overflow-x-hidden animate-fade-in">
          {/* WebGL Sanskrit Particle Canvas */}
          <ParticleField />

          {/* Dual-Element Morphing Pointer */}
          <CustomCursor />

          {/* Minimal Auto-Hiding Navigation */}
          <Navbar />

          {/* 
            THE RED THREAD OF FATE (赤い糸)
            Positioned at x=40px from left. Wobbles via CSS and features 
            curved loops representing branching/rejoining during transitions.
          */}
          <div className="absolute left-[40px] top-0 bottom-0 w-[2px] pointer-events-none select-none z-10 hidden md:block">
            <svg 
              className="w-full h-full text-[var(--vermillion)] opacity-30" 
              preserveAspectRatio="none" 
              viewBox="0 0 10 100"
            >
              <path 
                d="M 5,0 
                   L 5,14 
                   C 0,15 0,17 5,18 
                   C 10,19 10,21 5,22 
                   L 5,30 
                   C 0,31 0,33 5,34 
                   C 10,35 10,37 5,38 
                   L 5,47 
                   C 0,48 0,50 5,51 
                   C 10,52 10,54 5,55 
                   L 5,66 
                   C 0,67 0,69 5,70 
                   C 10,71 10,73 5,74 
                   L 5,88 
                   C 0,89 0,91 5,92 
                   C 10,93 10,95 5,96 
                   L 5,100" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                fill="none" 
                className="red-thread-line" 
              />
            </svg>
          </div>

          {/* Main Layout Containers */}
          <main id="main-content">
            <Hero loaderDone={!loading} prefersReducedMotion={motionPreference} />
            <About />
            <MarqueeTicker />
            <Projects />
            <Skills />
            <Process />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
