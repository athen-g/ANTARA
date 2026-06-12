// ─────────────────────────────────────────────────────────────────────────────
//  Contact — 縁 (en) — connection / fate
//  Dramatic InkReveal · Sanskrit subtext · Brushstroke email underline
//  Torii-framed social links · Form with gold focus borders
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef } from 'react'
import InkReveal from '../components/InkReveal.jsx'
import BrushStroke from '../components/BrushStroke.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import SanskriticDivider from '../components/SanskriticDivider.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useLanguage } from '../context/LanguageContext'

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/athen-g',               short: 'GH', desc: '@athen-g'    },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/atharvaghule',      short: 'LI', desc: 'atharvaghule' },
  { label: 'Instagram', href: 'https://www.instagram.com/athen_g_/',              short: 'IG', desc: '@athen_g_'    },
]

// SVG torii frame for social buttons
function ToriiSocialBtn({ social }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${social.label}: ${social.desc}`}
      data-cursor="hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        transition: 'opacity 0.3s',
      }}
    >
      {/* Torii SVG frame */}
      <div style={{ position: 'relative', width: '64px', height: '88px' }}>
        <svg
          width="64" height="88"
          viewBox="0 0 64 88"
          fill="none"
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Left pillar */}
          <line x1="14" y1="20" x2="14" y2="80"
            stroke={hovered ? 'var(--vermillion)' : 'var(--border-gold)'}
            strokeWidth="1.5" strokeLinecap="round"
            style={{ transition: 'stroke 0.3s' }}
          />
          {/* Right pillar */}
          <line x1="50" y1="20" x2="50" y2="80"
            stroke={hovered ? 'var(--vermillion)' : 'var(--border-gold)'}
            strokeWidth="1.5" strokeLinecap="round"
            style={{ transition: 'stroke 0.3s' }}
          />
          {/* Lower crossbeam */}
          <line x1="8" y1="30" x2="56" y2="30"
            stroke={hovered ? 'var(--vermillion)' : 'var(--border-gold)'}
            strokeWidth="1.5" strokeLinecap="round"
            style={{ transition: 'stroke 0.3s' }}
          />
          {/* Upper curved crossbeam */}
          <path d="M 4,20 Q 14,14 32,12 Q 50,14 60,20"
            stroke={hovered ? 'var(--vermillion)' : 'var(--border-gold)'}
            strokeWidth="1.5" strokeLinecap="round" fill="none"
            style={{ transition: 'stroke 0.3s' }}
          />
        </svg>

        {/* Icon inside the gate */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '52%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: hovered ? 'var(--vermillion)' : 'var(--text-2)',
            transition: 'color 0.3s',
          }}
        >
          {social.short}
        </div>
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: hovered ? 'var(--vermillion)' : 'var(--text-3)',
          transition: 'color 0.3s',
        }}
      >
        {social.label}
      </span>
    </a>
  )
}

export default function Contact() {
  const { language, t } = useLanguage()
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.08 })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormState((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, connect to a form service (Formspree, etc.)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact Atharva Ghule"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        transition: 'background-color 0.4s ease, color 0.4s ease',
        overflow: 'hidden',
      }}
    >
      {/* SanskriticDivider Variant C — top of section */}
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '24px 0',
          background: 'var(--bg-surface)',
          transition: 'background-color 0.4s ease',
        }}
      >
        <SanskriticDivider variant="C" size={100} opacity={0.22} color="var(--gold-dim)" />
      </div>

      {/* 縁 Kanji watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(120px, 22vw, 280px)',
          lineHeight: 1,
          color: 'var(--text-1)',
          opacity: 0.035,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'pulseSlow 4s ease-in-out infinite',
        }}
      >
        縁
      </div>

      <div
        className="section-pad"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Label */}
        <InkReveal>
          <p className="text-label" style={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('contact.titleLabel')}
          </p>
        </InkReveal>

        {/* Main headline — dramatic word-by-word InkReveal */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          {(t('contact.letCreate') || '')
            .split(language === 'ja' ? '' : ' ')
            .map((word, i, arr) => (
              <InkReveal key={`${language}-${i}`} delay={i * 60} style={{ display: 'inline-block', marginRight: language === 'ja' ? '0' : '0.25em' }}>
                <span
                  style={{
                    fontFamily: language === 'sa' ? "'Noto Serif Devanagari', serif" : (language === 'ja' ? 'sans-serif' : 'Syne, sans-serif'),
                    fontWeight: 900,
                    fontSize: 'clamp(36px, 6vw, 96px)',
                    lineHeight: 1.0,
                    letterSpacing: '-0.03em',
                    color: i === arr.length - 1 ? 'var(--gold)' : 'var(--text-1)',
                  }}
                >
                  {word}
                </span>
              </InkReveal>
            ))}
        </div>

        {/* Sanskrit subtext */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 6vw, 72px)',
          }}
        >
          <InkReveal delay={400}>
            <p
              style={{
                fontFamily: "'Noto Serif Devanagari', serif",
                fontSize: 'clamp(14px, 2vw, 20px)',
                color: 'var(--gold)',
                opacity: 0.6,
                letterSpacing: '0.1em',
              }}
              aria-label={t('contact.subtext')}
            >
              {t('contact.subtext')}
            </p>
          </InkReveal>
        </div>

        {/* Email — massive link with brushstroke underline */}
        <InkReveal delay={500}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 80px)', position: 'relative' }}>
            <a
              href="mailto:atharvanitinghule@gmail.com"
              data-cursor="hover"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(20px, 4vw, 52px)',
                color: 'var(--text-1)',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                transition: 'color 0.3s',
                display: 'inline-block',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
            >
              atharvanitinghule@gmail.com
            </a>
            {/* Brushstroke underline */}
            <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'center' }}>
              <BrushStroke
                variant="horizontal"
                color="var(--gold)"
                opacity={0.35}
                isVisible={isVisible}
                delay={700}
                style={{ maxWidth: '640px' }}
              />
            </div>
          </div>
        </InkReveal>

        {/* ── Two columns: socials + form ─────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          {/* Left: Torii social buttons */}
          <InkReveal delay={300}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p className="text-label" style={{ marginBottom: '8px' }}>{t('contact.findMe')}</p>

              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {SOCIALS.map((social) => (
                  <ToriiSocialBtn key={social.label} social={social} />
                ))}
              </div>

              {/* Decorative yantra */}
              <div style={{ marginTop: '24px' }}>
                <SanskriticDivider
                  variant="B"
                  size={80}
                  opacity={0.22}
                  color="var(--gold-dim)"
                  rotate={false}
                />
              </div>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'var(--text-2)',
                  maxWidth: '280px',
                }}
              >
                {t('contact.openToCollabs')}
              </p>
            </div>
          </InkReveal>

          {/* Right: Contact form */}
          <InkReveal delay={450}>
            {submitted ? (
              <div
                style={{
                  padding: '40px',
                  border: '0.5px solid var(--border-gold)',
                  textAlign: 'center',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Noto Serif Devanagari', serif",
                    fontSize: '48px',
                    color: 'var(--gold)',
                    opacity: 0.6,
                    marginBottom: '16px',
                  }}
                >
                  ॐ
                </div>
                <p
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '20px',
                    color: 'var(--text-1)',
                    marginBottom: '8px',
                  }}
                >
                  {t('contact.msgReceived')}
                </p>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--text-2)' }}>
                  {t('contact.msgSubtext')}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-label="Contact form"
                style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-label"
                    style={{ display: 'block', marginBottom: '8px' }}
                  >
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder={t('contact.namePlaceholder')}
                    className="form-input"
                    aria-required="true"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-label"
                    style={{ display: 'block', marginBottom: '8px' }}
                  >
                    {t('contact.emailLabel')}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder={t('contact.emailPlaceholder')}
                    className="form-input"
                    aria-required="true"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-label"
                    style={{ display: 'block', marginBottom: '8px' }}
                  >
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    className="form-input"
                    aria-required="true"
                    style={{ resize: 'vertical', fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                {/* Submit */}
                <MagneticButton type="submit" variant="gold" style={{ alignSelf: 'flex-start' }}>
                  {t('contact.sendBtn')}
                </MagneticButton>
              </form>
            )}
          </InkReveal>
        </div>
      </div>
    </section>
  )
}
