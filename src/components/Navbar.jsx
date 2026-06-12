// ─────────────────────────────────────────────────────────────────────────────
//  Navbar — minimal, shows/hides on scroll direction
//  Logo: ANTARA + "अन्तर" wordmark
//  Features a theme switch toggle + "Hire Me" CTA button in the top right
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const NAV_LINKS = [
  { label: 'Work',    href: '#projects' },
  { label: 'About',   href: '#about'    },
  { label: 'Process', href: '#process'  },
  { label: 'Contact', href: '#contact'  },
]

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState('dark')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setVisible(y < lastY.current || y < 80)
      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Sync local state with document attribute on mount
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
    setTheme(currentTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const scrollTo = (e, href) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s',
        background: scrolled 
          ? (theme === 'dark' ? 'rgba(8,8,8,0.85)' : 'rgba(245,240,232,0.85)') 
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '0.5px solid var(--border)' : 'none',
        padding: '0 clamp(24px, 6vw, 96px)',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          window.__lenis?.scrollTo(0, { duration: 1.4 })
        }}
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        data-cursor="hover"
        aria-label="ANTARA — Atharva Ghule, back to top"
      >
        <span
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 900,
            fontSize: '15px',
            letterSpacing: '0.15em',
            color: 'var(--text-1)',
            textTransform: 'uppercase',
          }}
        >
          ANTARA
        </span>
        <span
          style={{
            fontFamily: "'Noto Serif Devanagari', serif",
            fontSize: '11px',
            color: 'var(--gold)',
            marginLeft: '6px',
            opacity: 0.85,
            fontWeight: 400
          }}
          aria-hidden="true"
        >
          अन्तर
        </span>
      </a>

      {/* Nav links — hidden on mobile */}
      <ul
        style={{
          display: 'flex',
          gap: '40px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
        className="hidden md:flex"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              onClick={(e) => scrollTo(e, href)}
              data-cursor="hover"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-2)',
                textDecoration: 'none',
                transition: 'color 0.3s',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--text-1)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-2)')}
            >
              {t(`nav.${label.toLowerCase()}`)}
            </a>
          </li>
        ))}
      </ul>

      {/* Right Column: Theme toggle + Language selectors + Hire Me button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        
        {/* Language selector squares */}
        <div style={{ display: 'flex', gap: '6px', marginRight: '4px' }}>
          {[
            { lang: 'sa', label: 'अ' },
            { lang: 'en', label: 'a' },
            { lang: 'ja', label: 'ア' },
          ].map(({ lang: l, label }) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              style={{
                width: '28px',
                height: '28px',
                border: language === l ? '1px solid var(--gold)' : '0.5px solid var(--border)',
                borderRadius: '2px',
                background: language === l ? 'rgba(232, 160, 32, 0.08)' : 'transparent',
                color: language === l ? 'var(--gold)' : 'var(--text-2)',
                fontFamily: l === 'sa' ? "'Noto Serif Devanagari', serif" : (l === 'ja' ? 'sans-serif' : 'Inter, sans-serif'),
                fontSize: '11px',
                fontWeight: language === l ? '800' : '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)'
                e.currentTarget.style.color = 'var(--gold)'
              }}
              onMouseLeave={(e) => {
                if (language !== l) {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-2)'
                }
              }}
              data-cursor="hover"
              aria-label={`Switch language to ${l === 'sa' ? 'Sanskrit' : (l === 'ja' ? 'Japanese' : 'English')}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Switch to Light Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '0.5px solid var(--border-gold)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-1)',
            cursor: 'pointer',
            transition: 'background 0.3s, color 0.3s',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--border-gold)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
          data-cursor="hover"
          aria-label="Toggle visual theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          )}
        </button>

        {/* Hire Me CTA Button */}
        <a
          href="mailto:atharvanitinghule@gmail.com"
          data-cursor="hover"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--bg)',
            background: 'var(--gold)',
            border: 'none',
            padding: '8px 20px',
            textDecoration: 'none',
            transition: 'background 0.3s, color 0.3s',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--text-1)'
            e.target.style.color = (theme === 'dark' ? '#080808' : '#F5F0E8')
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--gold)'
            e.target.style.color = 'var(--bg)'
          }}
        >
          {t('nav.hireMe')}
        </a>
      </div>
    </nav>
  )
}
