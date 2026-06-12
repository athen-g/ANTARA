// ─────────────────────────────────────────────────────────────────────────────
//  About — 間 (ma) — the space between
//  Left: OM symbol + brushstroke + animated stats
//  Right: Bio + skill pills
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from 'react'
import InkReveal from '../components/InkReveal.jsx'
import BrushStroke from '../components/BrushStroke.jsx'
import SanskriticDivider from '../components/SanskriticDivider.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const STATS = [
  { value: 12, label: 'Projects Shipped', suffix: '' },
  { value: 3,  label: 'Years Experience', suffix: '+' },
  { value: 5,  label: 'Client Rating',    suffix: '★' },
]

const SKILL_PILLS = [
  'React', 'TypeScript', 'Node.js', 'Figma', 'Three.js',
  'GSAP', 'Tailwind', 'Next.js', 'PostgreSQL', 'Framer',
]

// Animated counter — counts up once visible
function CountUp({ target, suffix = '', isVisible }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isVisible || started.current) return
    started.current = true
    const duration = 1800
    const start    = Date.now()
    const tick = () => {
      const elapsed  = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3) // ease out cubic
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isVisible, target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: pillsRef, isVisible: pillsVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section
      id="about"
      aria-label="About Atharva Ghule"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* SanskriticDivider Variant B — above section */}
      <div
        aria-hidden="true"
        style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', background: 'var(--bg-surface)' }}
      >
        <SanskriticDivider variant="B" size={100} opacity={0.15} color="var(--gold-dim)" />
      </div>

      {/* 間 Kanji watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(140px, 22vw, 300px)',
          lineHeight: 1,
          color: 'var(--text-1)',
          opacity: 0.035,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'pulseSlow 4s ease-in-out infinite',
        }}
      >
        間
      </div>

      <div
        ref={sectionRef}
        className="section-pad"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}
      >
        {/* ── Left Column (45%) ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* OM symbol as graphic element */}
          <InkReveal delay={100}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '16px',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  fontFamily: "'Noto Serif Devanagari', serif",
                  fontWeight: 400,
                  fontSize: 'clamp(100px, 16vw, 200px)',
                  lineHeight: 1,
                  color: 'var(--gold)',
                  opacity: 0.15,
                  userSelect: 'none',
                }}
              >
                ॐ
              </div>

              <BrushStroke variant="horizontal" isVisible={isVisible} delay={400} opacity={0.2} />
            </div>
          </InkReveal>

          {/* Animated stats */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            {STATS.map(({ value, label, suffix }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(40px, 6vw, 68px)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-1)',
                  }}
                >
                  <CountUp target={value} suffix={suffix} isVisible={isVisible} />
                </div>
                <div className="text-label" style={{ marginTop: '4px' }}>{label}</div>
                <div
                  aria-hidden="true"
                  style={{
                    height: '0.5px',
                    background: 'var(--border-gold)',
                    marginTop: '12px',
                    width: '60%',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column (55%) ────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* Section label */}
          <InkReveal delay={0}>
            <p className="text-label">About — 間 — The Space Between</p>
          </InkReveal>

          {/* Headline */}
          <InkReveal delay={150}>
            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--text-1)',
              }}
            >
              Designing at the
              <br />
              <span style={{ color: 'var(--gold)' }}>threshold</span> of
              <br />
              art & engineering.
            </h2>
          </InkReveal>

          {/* Bio */}
          <InkReveal delay={250}>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: 1.85,
                color: 'var(--text-2)',
              }}
            >
              I'm Atharva — a designer and developer from India who believes the most
              powerful digital experiences live in the liminal space between visual poetry
              and technical precision. I build products that feel inevitable: where every
              pixel is intentional, every interaction considered, and every line of code
              serves the story.
            </p>
          </InkReveal>

          <InkReveal delay={320}>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: 1.85,
                color: 'var(--text-2)',
              }}
            >
              With roots in UI/UX and branches reaching into fullstack development,
              I speak fluently across disciplines — from early discovery and systems
              thinking through to deployment and beyond. The work I'm most proud of
              doesn't announce itself; it simply feels right.
            </p>
          </InkReveal>

          {/* Brushstroke divider */}
          <BrushStroke variant="diagonal" isVisible={isVisible} delay={500} opacity={0.12} style={{ alignSelf: 'flex-start' }} width="60px" />

          {/* Skill pills */}
          <div ref={pillsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SKILL_PILLS.map((skill, i) => (
              <span
                key={skill}
                className="skill-chip"
                style={{
                  opacity: pillsVisible ? 1 : 0,
                  transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Sanskrit decorative text */}
          <div
            aria-hidden="true"
            style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: '13px',
              color: 'var(--gold)',
              opacity: 0.45,
              letterSpacing: '0.1em',
            }}
          >
            सृजन · शिल्प · संयोग
          </div>
        </div>
      </div>
    </section>
  )
}
