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
import ManifestoMarquee from "./components/ManifestoMarquee";
import SoftSkills from "./sections/SoftSkills";
import Achievements from "./sections/Achievements";

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
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

  // Initialize Ko-fi overlay widget with active theme variables
  useEffect(() => {
    if (!showPortfolio) return;

    let activeScript = null;

    const initKofi = () => {
      // Clean up previous widget instance if exists to avoid duplication
      const existingWidget = document.querySelector('.kofi-iframe-container') || document.getElementById('kofi-widget-overlay');
      if (existingWidget) {
        existingWidget.remove();
      }

      if (window.kofiWidgetOverlay) {
        const vermillion = getComputedStyle(document.documentElement).getPropertyValue('--vermillion').trim() || '#C1392B';
        const text1 = getComputedStyle(document.documentElement).getPropertyValue('--text-1').trim() || '#F2EBD9';
        
        window.kofiWidgetOverlay.draw('athen_g', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': vermillion,
          'floating-chat.donateButton.text-color': text1
        });
      }
    };

    // Load overlay widget script
    if (!window.kofiWidgetOverlay) {
      const script = document.createElement("script");
      script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
      script.async = true;
      script.onload = initKofi;
      document.body.appendChild(script);
      activeScript = script;
    } else {
      initKofi();
    }

    // Observe data-theme changes to dynamically swap button colors
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class')) {
          initKofi();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Periodically inspect iframes and inject custom SVG hexagon styles
    const injectStyles = () => {
      const iframes = document.querySelectorAll('.floatingchat-container, .floatingchat-container-mobi');
      iframes.forEach(iframe => {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc && doc.body) {
          const btn = doc.querySelector('.floatingchat-donate-button');
          if (btn && !doc.getElementById('custom-kofi-hex-styles')) {
            const style = doc.createElement('style');
            style.id = 'custom-kofi-hex-styles';
            style.innerHTML = `
              .floatingchat-donate-button {
                background-color: transparent !important;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="12,4 88,4 96,50 88,96 12,96 4,50" fill="none" stroke="%23E7A023" stroke-width="3"/></svg>') !important;
                background-size: 100% 100% !important;
                background-repeat: no-repeat !important;
                border: none !important;
                box-shadow: none !important;
                padding: 10px 24px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                height: 48px !important;
                transition: transform 0.2s ease !important;
              }
              .floatingchat-donate-button:hover {
                transform: scale(1.05) !important;
              }
              .floatingchat-donate-button span {
                color: #E7A023 !important;
                font-family: 'DM Sans', sans-serif !important;
                font-weight: 700 !important;
              }
              .floatingchat-donate-button img.kofiimg {
                filter: sepia(100%) saturate(1000%) hue-rotate(15deg) brightness(95%) contrast(100%) !important;
              }
            `;
            doc.head.appendChild(style);
          }
        }
      });
    };

    const intervalId = setInterval(injectStyles, 500);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
      const existingWidget = document.querySelector('.kofi-iframe-container') || document.getElementById('kofi-widget-overlay');
      if (existingWidget) {
        existingWidget.remove();
      }
      if (activeScript && activeScript.parentNode) {
        activeScript.parentNode.removeChild(activeScript);
      }
    };
  }, [showPortfolio]);

  return (
    <>
      {/* High-frequency visual grain texture overlay */}
      <div className="grain-overlay" />

      {/* Screen Loader Sequence */}
      {showLoader && (
        <Loader
          onExitStart={() => setShowPortfolio(true)}
          onComplete={() => setShowLoader(false)}
        />
      )}

      {/* Main Portfolio Presentation (rendered after loader exits) */}
      {showPortfolio && (
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
            <Hero loaderDone={showPortfolio} prefersReducedMotion={motionPreference} />
            <ManifestoMarquee />
            <About />
            <MarqueeTicker />
            <Projects />
            <SoftSkills />
            <Achievements />
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
