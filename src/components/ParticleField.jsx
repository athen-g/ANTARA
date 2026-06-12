import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import vertexShader from "../shaders/particles.glsl?raw";

// Fragment shader to sample from the character texture atlas and apply theme-based coloring
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 uColor1; // Gold
  uniform vec3 uColor2; // Vermillion
  
  varying float vOpacity;
  varying float vSeed;
  
  void main() {
    // Select a cell in the 4x4 atlas grid based on the particle's random seed
    float charIndex = floor(mod(vSeed * 100.0, 16.0));
    float col = mod(charIndex, 4.0);
    float row = floor(charIndex / 4.0);
    
    // Calculate UV coordinates mapping to the specific character cell
    vec2 atlasUv = (gl_PointCoord + vec2(col, row)) / 4.0;
    
    // Sample opacity mask from the white text atlas
    vec4 texColor = texture2D(uTexture, atlasUv);
    
    // Interpolate between gold and vermillion accents based on seed value
    vec3 accentColor = mix(uColor1, uColor2, fract(vSeed * 7.0));
    
    gl_FragColor = vec4(accentColor, texColor.a * vOpacity);
  }
`;

export function ParticleField() {
  const mountRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect reduced motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReducedMotion);
    if (prefersReducedMotion) return;

    const container = mountRef.current;
    if (!container) return;

    // Detect mobile screens to halve particle count
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 22 : 65;

    // Setup Scene, Camera, WebGLRenderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // BUILD DYNAMIC SANSKRIT CHARACTER ATLAS CANVAS
    const atlasCanvas = document.createElement("canvas");
    atlasCanvas.width = 256;
    atlasCanvas.height = 256;
    const ctx = atlasCanvas.getContext("2d");
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, 256, 256);

    const chars = ["अ", "ब", "क", "ड", "ग", "ह", "ज", "ल", "म", "न", "प", "र", "स", "त", "ॐ", "अ"];
    ctx.font = "normal 44px 'Noto Serif Devanagari', serif";
    ctx.fillStyle = "#ffffff"; // Draw in pure white to allow color tinting in shader
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < 16; i++) {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = col * 64 + 32;
      const y = row * 64 + 32;
      ctx.fillText(chars[i], x, y);
    }

    const texture = new THREE.CanvasTexture(atlasCanvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // BUILD PARTICLES GEOMETRY
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const seeds = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a 3D box
      positions[i * 3] = (Math.random() - 0.5) * 16.0;      // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16.0;  // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.0;   // Z

      seeds[i] = Math.random();
      speeds[i] = 0.08 + Math.random() * 0.18; // Speed factor
      scales[i] = 0.4 + Math.random() * 0.8;   // Scale size
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    // RESOLVE THEME COLORS
    const getThemeColors = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      const goldStr = rootStyle.getPropertyValue("--gold").trim() || "#E8A020";
      const vermillionStr = rootStyle.getPropertyValue("--vermillion").trim() || "#C1392B";
      return {
        colorGold: new THREE.Color(goldStr),
        colorVermillion: new THREE.Color(vermillionStr)
      };
    };

    const { colorGold, colorVermillion } = getThemeColors();

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(-999, -999) },
      uTexture: { value: texture },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uRepelRadius: { value: 3.2 }, // World coordinates repulsion radius
      uRepelStrength: { value: 1.4 },
      uColor1: { value: colorGold },
      uColor2: { value: colorVermillion }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // MOUSE PARALLAX & REPULSION TRACKING
    const mouseNDC = new THREE.Vector2();
    const targetMouseWorld = new THREE.Vector2(-999, -999);
    const lerpedMouseWorld = new THREE.Vector2(-999, -999);

    const handleMouseMove = (event) => {
      mouseNDC.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Project NDC to Z=0 world space coordinates
      const vector = new THREE.Vector3(mouseNDC.x, mouseNDC.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const posWorld = camera.position.clone().add(dir.multiplyScalar(distance));
      
      targetMouseWorld.set(posWorld.x, posWorld.y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // RESPONSIVE SCREEN RESIZE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };

    window.addEventListener("resize", handleResize);

    // THEME OBSERVER
    const observer = new MutationObserver(() => {
      const { colorGold, colorVermillion } = getThemeColors();
      uniforms.uColor1.value = colorGold;
      uniforms.uColor2.value = colorVermillion;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // RENDER LOOP WITHVisibility Control
    const clock = new THREE.Clock();
    let isPageVisible = true;
    let animationFrameId;

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const tick = () => {
      if (!isPageVisible) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.1); // cap delta-time to avoid jumps
      const elapsedTime = clock.getElapsedTime();

      // Update uniforms
      uniforms.uTime.value = elapsedTime;

      // Soft mouse lerping to smooth out spring repulsion transitions
      lerpedMouseWorld.x += (targetMouseWorld.x - lerpedMouseWorld.x) * 0.08;
      lerpedMouseWorld.y += (targetMouseWorld.y - lerpedMouseWorld.y) * 0.08;
      uniforms.uMouse.value.copy(lerpedMouseWorld);

      // Mouse Parallax effect on whole particle system
      points.position.x += (mouseNDC.x * 0.4 - points.position.x) * 0.03;
      points.position.y += (mouseNDC.y * 0.4 - points.position.y) * 0.03;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    // Run tick
    tick();

    // CLEANUP
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
