import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Unified useScrollReveal hook supporting two runtime signatures:
 * 
 * Signature A (GSAP scroll triggers):
 * useScrollReveal(ref, options)
 * 
 * Signature B (IntersectionObserver state):
 * const { ref, isVisible } = useScrollReveal(options)
 */
export function useScrollReveal(firstArg, secondArg) {
  // Check if the first argument is a React ref
  const isRefSignature = firstArg && typeof firstArg === "object" && "current" in firstArg;

  if (isRefSignature) {
    const ref = firstArg;
    const options = secondArg || {};

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
        type = "fade-up",
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

    return;
  } else {
    // Intersection Observer based signature returning ref and visibility status
    const options = firstArg || {};
    const {
      threshold = 0.15,
      rootMargin = "0px",
      once = true,
    } = options;

    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(el);
          } else if (!once) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, isVisible };
  }
}
