import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import fragmentShader from "../shaders/noise.glsl?raw";
import { BrushStroke } from "../components/BrushStroke";
import { SplitText } from "../utils/splitText";

// Simple vertex shader for the full-screen quad
const quadVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const watermarkRef = useRef(null);
  
  const roles = ["UI/UX Designer", "Frontend Developer", "Fullstack Developer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [wipeActive, setWipeActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Cycle role subtitle with a left-to-right clip wipe
  useEffect(() => {
    const interval = setInterval(() => {
      setWipeActive(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setWipeActive(true);
      }, 500); // Match transition length
    }, 3300);

    return () => clearInterval(interval);
  }, []);

  // WebGL Liquid Noise Background Setup
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReducedMotion);
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    renderer.setPixelRatio(1); // Low pixel ratio for fast noise computation
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // full screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Resolve theme colors
    const getThemeColors = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      const bgStr = rootStyle.getPropertyValue("--bg").trim() || "#080808";
      const surfaceStr = rootStyle.getPropertyValue("--bg-surface").trim() || "#0F0F0D";
      return {
        colorBg: new THREE.Color(bgStr),
        colorSurface: new THREE.Color(surfaceStr)
      };
    };

    const { colorBg, colorSurface } = getThemeColors();

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
      uColorBg: { value: colorBg },
      uColorSurface: { value: colorSurface }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: quadVertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Watch for theme switch modifications
    const observer = new MutationObserver(() => {
      const { colorBg, colorSurface } = getThemeColors();
      uniforms.uColorBg.value = colorBg;
      uniforms.uColorSurface.value = colorSurface;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Rendering Loop
    const clock = new THREE.Clock();
    let animationFrameId;
    let isPageVisible = true;

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const animate = () => {
      if (!isPageVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      // Scale down time speed by 0.0001 factor for slow liquid movements
      uniforms.uTime.value = clock.getElapsedTime() * 0.035;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // GSAP Text entrance sequences
  useEffect(() => {
    if (reducedMotion) return;

    // Entrance timeline
    const tl = gsap.timeline({ delay: 0.1 });

    // Kanji watermark fades in and settles
    tl.fromTo(
      watermarkRef.current,
      { opacity: 0, scale: 1.15 },
      { opacity: 0.04, scale: 1, duration: 2.2, ease: "power2.out" }
    );

    // Animate ATHARVA letters clip-path reveals
    tl.fromTo(
      ".hero-name-first .char-span",
      { 
        y: "110%", 
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" 
      },
      { 
        y: "0%", 
        clipPath: "polygon(-10% -20%, 110% -20%, 110% 120%, -10% 120%)", 
        duration: 1.4, 
        stagger: 0.06, 
        ease: "power4.out" 
      },
      "-=1.8"
    );

    // Animate GHULE letters clip-path reveals
    tl.fromTo(
      ".hero-name-last .char-span",
      { 
        y: "110%", 
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" 
      },
      { 
        y: "0%", 
        clipPath: "polygon(-10% -20%, 110% -20%, 110% 120%, -10% 120%)", 
        duration: 1.4, 
        stagger: 0.06, 
        ease: "power4.out" 
      },
      "-=1.2"
    );

    // Role Cyclist & Subtitle stagger reveals
    tl.fromTo(
      ".hero-box-stroke",
      { strokeDashoffset: 600, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
      "-=0.8"
    );

    tl.fromTo(
      ".hero-tagline span",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.6"
    );

    tl.fromTo(
      ".hero-social-link",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    );

    tl.fromTo(
      ".hero-scroll-indicator",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    );
  }, [reducedMotion]);

  // Mouse Parallax movement
  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e) => {
      const xVal = (e.clientX / window.innerWidth - 0.5) * 40; // max shift 20px
      const yVal = (e.clientY / window.innerHeight - 0.5) * 40;

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: xVal * 0.7,
          y: yVal * 0.7,
          duration: 1.2,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  const socialLinks = [
    { name: "GH", url: "https://github.com/athen-g", label: "GitHub" },
    { name: "LN", url: "https://linkedin.com", label: "LinkedIn" },
    { name: "X", url: "https://x.com", label: "X" }
  ];

  return (
    <section 
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-6 md:px-12 xl:px-24 overflow-hidden z-10"
    >
      {/* Three.js Noise Shader Canvas */}
      {!reducedMotion ? (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-[var(--bg-surface)] z-0" />
      )}

      {/* Shoji Screen Grid Lines Overlay */}
      <div className="shoji-grid opacity-10 md:opacity-20" />

      {/* 創 Kanji Watermark (positioned top-right) */}
      <div 
        ref={watermarkRef}
        className="absolute top-1/4 right-[5%] md:right-[10%] text-[24vw] select-none pointer-events-none z-10 kanji-watermark leading-none"
      >
        創
      </div>

      {/* Hero Content Container */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col justify-center items-start z-20">
        
        {/* Calligraphic Corner Accents */}
        <BrushStroke variant="corner" className="absolute -top-12 -left-6 md:-left-12 opacity-25 rotate-90 text-[var(--gold)]" />
        
        {/* Main Display Typography */}
        <div className="flex flex-col mt-8 md:mt-0 font-display font-black leading-[0.82] tracking-tighter">
          
          {/* ATHARVA name clip container */}
          <h1 className="hero-name-first text-[clamp(44px,12.5vw,155px)] text-[var(--text-1)] select-none overflow-hidden pb-1 flex flex-wrap">
            <SplitText text="ATHARVA" charClassName="hero-char char-span" />
          </h1>
          
          {/* GHULE text outlined */}
          <h2 className="hero-name-last text-[clamp(44px,12.5vw,155px)] text-stroke-gold select-none overflow-hidden pb-2 flex flex-wrap">
            <SplitText text="GHULE" charClassName="hero-char char-span" />
          </h2>
        </div>

        {/* Subtitle & Role Cycler in BrushStroke frame */}
        <div className="relative mt-6 md:mt-8 flex items-center justify-start">
          
          {/* Decorative frame box */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
            <svg viewBox="0 0 200 48" className="w-full h-full" preserveAspectRatio="none">
              <path 
                className="hero-box-stroke stroke-[var(--gold)] fill-none stroke-[0.8]" 
                strokeDasharray="600" 
                strokeDashoffset="600"
                d="M 2,2 L 198,2 L 198,46 L 2,46 Z" 
              />
            </svg>
          </div>

          <div className="px-6 py-2.5 z-10">
            <div 
              className={`font-ui uppercase tracking-[0.25em] text-[10px] md:text-xs font-bold text-[var(--gold)] transition-all duration-500
                ${wipeActive ? "text-wipe-active" : "text-wipe-enter"}
              `}
            >
              {roles[roleIndex]}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="hero-tagline max-w-md mt-8 font-body text-sm md:text-base leading-relaxed text-[var(--text-2)] flex flex-wrap gap-x-1.5">
          {"Crafting digital experiences that live at the intersection of art and code.".split(" ").map((word, idx) => (
            <span key={idx} className="inline-block">{word}</span>
          ))}
        </p>

        {/* Bottom Bar: Social & Scroll */}
        <div className="w-full mt-16 md:mt-24 flex flex-row items-end justify-between">
          
          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link w-9 h-9 border border-[var(--border-gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-all duration-300 rounded flex items-center justify-center font-ui text-[10px] font-bold cursor-none"
                title={social.label}
                data-hover
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <a
            href="#about"
            className="hero-scroll-indicator flex flex-col items-center gap-3 cursor-none text-[var(--text-3)] hover:text-[var(--gold)] transition-colors duration-300"
            data-hover
          >
            <span className="font-ui uppercase tracking-[0.25em] text-[8px] md:text-[9px] rotate-180 writing-mode-vertical select-none font-bold">
              SCROLL
            </span>
            <div className="w-[1px] h-14 bg-gradient-to-b from-[var(--text-3)] to-transparent relative overflow-hidden">
              {/* Animating line trace */}
              <div 
                className="absolute top-0 left-0 w-full h-1/2 bg-[var(--vermillion)]"
                style={{
                  animation: "pulseLine 2.2s cubic-bezier(0.76, 0, 0.24, 1) infinite"
                }}
              />
            </div>
          </a>

        </div>

      </div>

      <style>{`
        .writing-mode-vertical {
          writing-mode: vertical-lr;
        }
        @keyframes pulseLine {
          0% { transform: translateY(-100%); }
          50%, 100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
