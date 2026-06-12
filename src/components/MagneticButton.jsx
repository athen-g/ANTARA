import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export function MagneticButton({ 
  children, 
  className = "", 
  range = 28, 
  strength = 0.35, 
  ...props 
}) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = el.getBoundingClientRect();
      const x = clientX - (rect.left + rect.width / 2);
      const y = clientY - (rect.top + rect.height / 2);

      // Check if mouse is within range
      const distance = Math.sqrt(x * x + y * y);
      if (distance < rect.width / 2 + range) {
        // Move towards mouse with strength modifier
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        // Return to center
        handleMouseLeave();
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.45)"
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength]);

  return (
    <div 
      ref={buttonRef} 
      className={`inline-block cursor-none ${className}`} 
      {...props}
      data-hover
    >
      {children}
    </div>
  );
}
