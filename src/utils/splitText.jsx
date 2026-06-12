import React from "react";

/**
 * SplitText splits a string into word and character spans
 * so that GSAP can stagger them individually.
 */
export function SplitText({ 
  text, 
  type = "chars", 
  className = "", 
  wordClassName = "inline-block mr-[0.2em] last:mr-0 whitespace-nowrap", 
  charClassName = "inline-block" 
}) {
  if (!text) return null;

  // Render for screen readers to keep it accessible
  const ariaLabel = text;

  if (type === "words") {
    const words = text.split(" ");
    return (
      <span className={className} aria-label={ariaLabel}>
        {words.map((word, i) => (
          <span key={i} className={wordClassName} style={{ display: "inline-block" }}>
            {word}
          </span>
        ))}
      </span>
    );
  }

  // type === "chars"
  const words = text.split(" ");
  return (
    <span className={className} aria-label={ariaLabel}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className={wordClassName} style={{ display: "inline-block" }}>
          {word.split("").map((char, cIdx) => (
            <span 
              key={cIdx} 
              className={charClassName} 
              style={{ display: "inline-block", position: "relative" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
