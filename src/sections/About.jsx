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
import { useLanguage } from '../context/LanguageContext'

const STATS = [
  { value: 12, labelKey: 'about.shipped', suffix: '' },
  { value: 3,  labelKey: 'about.experience', suffix: '+' },
  { value: 5,  labelKey: 'about.rating',    suffix: '★' },
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
  const { language, t } = useLanguage()
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: pillsRef, isVisible: pillsVisible } = useScrollReveal({ threshold: 0.2 })

  const aboutKanjiWatermark = language === 'ja' ? 'म' : '間'
  const aboutOmSymbol = language === 'mr' ? '禅' : 'ॐ'
  const aboutQuote = language === 'mr' ? '創造 · 技巧 · 調和' : t('about.sanskritQuote')

  return (
    <section
      id="about"
      aria-label="About Atharva Ghule"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      {/* SanskriticDivider Variant B — above section */}
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 0',
          background: 'var(--bg-surface)',
          transition: 'background-color 0.4s ease',
        }}
      >
        <SanskriticDivider variant="B" size={100} opacity={0.25} color="var(--gold-dim)" />
      </div>

      {/* 間 Kanji watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: language === 'ja' ? "'Noto Serif Devanagari', serif" : 'Syne, sans-serif',
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
        {aboutKanjiWatermark}
      </div>

      <div
        ref={sectionRef}
        className="section-pad grid grid-cols-1 lg:grid-cols-[45%_55%]"
        style={{
          position: 'relative',
          zIndex: 1,
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
                  fontFamily: language === 'mr' ? 'sans-serif' : "'Noto Serif Devanagari', serif",
                  fontWeight: 400,
                  fontSize: 'clamp(100px, 16vw, 200px)',
                  lineHeight: 1,
                  color: 'var(--gold)',
                  opacity: 0.15,
                  userSelect: 'none',
                }}
              >
                {aboutOmSymbol}
              </div>

              <BrushStroke variant="horizontal" isVisible={isVisible} delay={400} opacity={0.2} />
            </div>
          </InkReveal>

          {/* Animated stats */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 'clamp(24px, 4vw, 48px)',
            }}
          >
            {STATS.map(({ value, labelKey, suffix }) => (
              <div key={labelKey} style={{ flex: '1 1 140px', minWidth: '120px' }}>
                <div
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(40px, 6vw, 68px)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-1)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <CountUp target={value} suffix={suffix} isVisible={isVisible} />
                </div>
                <div className="text-label" style={{ marginTop: '4px' }}>{t(labelKey)}</div>
                <div
                  aria-hidden="true"
                  style={{
                    height: '0.5px',
                    background: 'var(--border-gold)',
                    marginTop: '12px',
                    width: '100%',
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
            <p className="text-label">{t('about.title')}</p>
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
              {t('about.headline')}
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
              {t('about.bio1')}
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
              {t('about.bio2')}
            </p>
          </InkReveal>

          {/* Mindset & Philosophies block */}
          <InkReveal delay={380}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-b border-[var(--border)] my-2">
              <div>
                <span className="font-devanagari text-xs text-[var(--gold)] font-bold block mb-1">初心 ━ SHOSHIN</span>
                <p className="text-[11px] leading-relaxed text-[var(--text-2)]">
                  {language === 'ja' 
                    ? "すべての物事に対して、先入観を持たず、開かれた心で貪欲に取り組むこと。" 
                    : language === 'mr'
                    ? "नवीन कल्पना आणि दृष्टीकोन स्वीकारण्याची नेहमी तयारी ठेवणे."
                    : "Approaching every situation with openness, eagerness, and lack of preconceptions."}
                </p>
              </div>
              <div>
                <span className="font-devanagari text-xs text-[var(--gold)] font-bold block mb-1">修行 ━ SADHANA</span>
                <p className="text-[11px] leading-relaxed text-[var(--text-2)]">
                  {language === 'ja' 
                    ? "技術を磨き、複雑なスキルを習得するための、規律ある日々の実践。" 
                    : language === 'mr'
                    ? "दररोज नियमित अभ्यासातून कला आणि कौशल्याची वाढ करणे."
                    : "Disciplined daily execution to refine craft and master complex skills."}
                </p>
              </div>
              <div>
                <span className="font-devanagari text-xs text-[var(--gold)] font-bold block mb-1">金継ぎ ━ KINTSUGI</span>
                <p className="text-[11px] leading-relaxed text-[var(--text-2)]">
                  {language === 'ja' 
                    ? "傷や失敗、学習の過程を受け入れ、それらを美しく輝く成長の軌跡とすること。" 
                    : language === 'mr'
                    ? "अपूर्णतेचा स्वीकार करून चुकांमधून शिकणे व अधिक सुंदर बनणे."
                    : "Embracing scars, errors, and learning phases, making them beautiful highlights of growth."}
                </p>
              </div>
            </div>
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
                  transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s, border-color 0.3s ease, color 0.3s ease, background 0.3s ease`,
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
              fontFamily: language === 'mr' ? 'sans-serif' : "'Noto Serif Devanagari', serif",
              fontSize: '13px',
              color: 'var(--gold)',
              opacity: 0.85,
              letterSpacing: '0.1em',
            }}
          >
            {aboutQuote}
          </div>
        </div>
      </div>
    </section>
  )
}
