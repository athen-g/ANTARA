import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(ref, options = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const targets = options.selector ? el.querySelectorAll(options.selector) : el;
      gsap.set(targets, { opacity: 1, y: 0, x: 0, scale: 1, clipPath: "none" });
      return;
    }

    const {
      selector = null,
      type = "fade-up", // "fade-up", "fade-in", "scale-in", "slide-left", "slide-right"
      delay = 0,
      duration = 1.2,
      start = "top 85%",
      stagger = 0,
      scrub = false,
      once = true,
    } = options;

    const targets = selector ? el.querySelectorAll(selector) : el;
    if (!targets || (selector && targets.length === 0)) return;

    let varsFrom = { opacity: 0 };
    let varsTo = {
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
      stagger: stagger || 0,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
        scrub,
      },
    };

    if (type === "fade-up") {
      varsFrom.y = 40;
      varsTo.y = 0;
    } else if (type === "scale-in") {
      varsFrom.scale = 0.95;
      varsTo.scale = 1;
    } else if (type === "slide-left") {
      varsFrom.x = 50;
      varsTo.x = 0;
    } else if (type === "slide-right") {
      varsFrom.x = -50;
      varsTo.x = 0;
    }

    // Set initial state
    gsap.set(targets, varsFrom);
    
    // Create ScrollTrigger animation
    const anim = gsap.to(targets, varsTo);

    return () => {
      anim.kill();
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
    };
  }, [ref, options.selector, options.type, options.delay, options.duration, options.start, options.stagger, options.scrub, options.once]);
}
