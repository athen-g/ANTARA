// ─────────────────────────────────────────────────────────────────────────────
//  Hero — the opening statement
//  WebGL noise background · Sumi-e letter reveal · Role cycling · Parallax
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import BrushStroke from '../components/BrushStroke.jsx'
import { useMousePosition } from '../hooks/useMousePosition.js'

const ROLES = ['UI/UX Designer', 'Frontend Developer', 'Fullstack Developer']

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/athen-g',                        icon: 'GH' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/atharva-g45/',            icon: 'LI' },
  { label: 'Instagram', href: 'https://www.instagram.com/athen_g_/',                icon: 'IG' },
]



export default function Hero({ loaderDone, prefersReducedMotion }) {
  const sectionRef = useRef(null)
  const atharvaRef = useRef(null)
  const ghuleRef   = useRef(null)
  const taglineRef = useRef(null)
  const socialsRef = useRef(null)
  const scrollRef  = useRef(null)
  const kanjiRef   = useRef(null)

  const [roleIndex, setRoleIndex]  = useState(0)
  const [roleVisible, setRoleVisible] = useState(true)

  const mouse = useMousePosition()



  // Role cycling with clip-path wipe
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false)
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length)
        setRoleVisible(true)
      }, 500)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // GSAP letter-by-letter reveal after loader
  useEffect(() => {
    if (!loaderDone || prefersReducedMotion) return

    const tl = gsap.timeline({ delay: 0.2 })

    // "ATHARVA" — each letter
    const atharvaEl = atharvaRef.current
    const ghuleEl   = ghuleRef.current

    if (atharvaEl) {
      const letters = atharvaEl.querySelectorAll('.hero-letter')
      tl.fromTo(
        letters,
        { clipPath: 'polygon(0% 110%, 100% 110%, 100% 110%, 0% 110%)', y: 40, opacity: 0 },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 110%, 0% 110%)',
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: 'power3.out',
        }
      )
    }

    if (ghuleEl) {
      const letters = ghuleEl.querySelectorAll('.hero-letter')
      tl.fromTo(
        letters,
        { clipPath: 'polygon(0% 110%, 100% 110%, 100% 110%, 0% 110%)', y: 40, opacity: 0 },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 110%, 0% 110%)',
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: 'power3.out',
        },
        '-=0.5'
      )
    }

    // Tagline — word by word
    if (taglineRef.current) {
      const words = taglineRef.current.querySelectorAll('.tagline-word')
      tl.fromTo(
        words,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' },
        '-=0.3'
      )
    }

    // Socials + scroll indicator
    if (socialsRef.current) {
      tl.fromTo(
        socialsRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.4'
      )
    }

    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.3'
      )
    }
  }, [loaderDone, prefersReducedMotion])

  // Mouse parallax on kanji watermark
  useEffect(() => {
    if (!kanjiRef.current) return
    const x = mouse.ndcX * 30
    const y = -mouse.ndcY * 20
    kanjiRef.current.style.transform = `translate(${x}px, ${y}px)`
  }, [mouse])

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero — Atharva Ghule introduction"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '72px', // navbar height
      }}
    >


      {/* Shoji screen grid overlay */}
      <div
        aria-hidden="true"
        className="bg-shoji"
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
      />

      {/* 創 Kanji watermark (create/originate) */}
      <div
        ref={kanjiRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5%',
          right: 'clamp(16px, 5vw, 80px)',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(140px, 25vw, 320px)',
          lineHeight: 1,
          color: 'var(--text-1)',
          opacity: 0.04,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        創
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          paddingLeft: 'clamp(64px, 8vw, 120px)',
          paddingRight: 'clamp(24px, 6vw, 96px)',
          paddingTop: 'clamp(60px, 8vh, 120px)',
          paddingBottom: 'clamp(60px, 8vh, 100px)',
        }}
      >
        {/* Section label */}
        <p className="text-label" style={{ marginBottom: '28px', opacity: loaderDone ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}>
          Portfolio — अन्तर — 2025
        </p>

        {/* Name block */}
        <div
          style={{
            marginBottom: '24px',
            lineHeight: 0.85,
          }}
        >
          {/* ATHARVA */}
          <div
            ref={atharvaRef}
            aria-label="Atharva"
            style={{ display: 'flex', gap: '0.01em', overflow: 'hidden' }}
          >
            {'ATHARVA'.split('').map((char, i) => (
              <span
                key={i}
                className="hero-letter"
                aria-hidden="true"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(72px, 13vw, 175px)',
                  lineHeight: 0.85,
                  letterSpacing: '-0.04em',
                  color: 'var(--text-1)',
                  display: 'inline-block',
                  clipPath: 'polygon(0% 110%, 100% 110%, 100% 110%, 0% 110%)',
                  willChange: 'clip-path, transform',
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* GHULE — outlined */}
          <div
            ref={ghuleRef}
            aria-label="Ghule"
            style={{ display: 'flex', gap: '0.01em', overflow: 'hidden' }}
          >
            {'GHULE'.split('').map((char, i) => (
              <span
                key={i}
                className="hero-letter"
                aria-hidden="true"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(72px, 13vw, 175px)',
                  lineHeight: 0.85,
                  letterSpacing: '-0.04em',
                  WebkitTextStroke: '1px var(--gold)',
                  color: 'transparent',
                  display: 'inline-block',
                  clipPath: 'polygon(0% 110%, 100% 110%, 100% 110%, 0% 110%)',
                  willChange: 'clip-path, transform',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Brushstroke under name */}
        <BrushStroke
          variant="horizontal"
          isVisible={loaderDone}
          delay={1200}
          opacity={0.18}
          style={{ marginBottom: '28px', maxWidth: '480px' }}
        />

        {/* Role cycling box */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            border: '0.5px solid var(--border-gold)',
            padding: '10px 20px',
            marginBottom: '32px',
            overflow: 'hidden',
            minWidth: '280px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--gold)',
              flexShrink: 0,
            }}
          />
          <span
            aria-live="polite"
            aria-label={`Current role: ${ROLES[roleIndex]}`}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(13px, 2vw, 18px)',
              color: 'var(--text-1)',
              clipPath: roleVisible
                ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
              transition: 'clip-path 0.5s cubic-bezier(0.16,1,0.3,1)',
              whiteSpace: 'nowrap',
            }}
          >
            {ROLES[roleIndex]}
          </span>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.8vw, 18px)',
            lineHeight: 1.7,
            color: 'var(--text-2)',
            maxWidth: '520px',
            marginBottom: '48px',
          }}
        >
          {`Crafting digital experiences that live at the intersection of art and code.`
            .split(' ')
            .map((word, i) => (
              <span
                key={i}
                className="tagline-word"
                style={{ display: 'inline-block', marginRight: '0.3em', opacity: 0 }}
              >
                {word}
              </span>
            ))}
        </p>

        {/* Corner brushstroke accent */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', top: 'clamp(60px, 8vh, 100px)', right: 'clamp(40px, 8vw, 140px)', opacity: 0.12 }}
        >
          <BrushStroke variant="corner" isVisible={loaderDone} delay={1400} color="var(--gold)" width="80px" />
        </div>

        {/* Bottom row: socials + scroll indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          {/* Social links */}
          <div ref={socialsRef} style={{ display: 'flex', gap: '12px' }}>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-cursor="hover"
                style={{
                  width: '36px',
                  height: '36px',
                  border: '0.5px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '9px',
                  letterSpacing: '0.05em',
                  color: 'var(--text-2)',
                  textDecoration: 'none',
                  transition: 'background 0.3s, color 0.3s, border-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--gold)'
                  e.currentTarget.style.color = 'var(--bg)'
                  e.currentTarget.style.borderColor = 'var(--gold)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-2)'
                  e.currentTarget.style.borderColor = 'var(--border-gold)'
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            ref={scrollRef}
            aria-hidden="true"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              opacity: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                writingMode: 'vertical-rl',
              }}
            >
              SCROLL
            </span>
            <div
              style={{
                width: '1px',
                height: '48px',
                background: 'linear-gradient(to bottom, var(--gold), transparent)',
                animation: 'scrollBounce 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
