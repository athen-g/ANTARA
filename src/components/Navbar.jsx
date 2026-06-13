// ─────────────────────────────────────────────────────────────────────────────
//  Navbar — minimal, shows/hides on scroll direction
//  Logo: ANTARA + "अन्तर" wordmark
//  Features a theme switch toggle + "Hire Me" CTA button in the top right
//  Responsive: Hamburger menu + sliding overlay panel on mobile/tablet viewports
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
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setVisible(y < lastY.current || y < 80 || menuOpen)
      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      window.__lenis?.stop()
    } else {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [menuOpen])

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
    <>
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
            setMenuOpen(false)
            window.__lenis?.scrollTo(0, { duration: 1.4 })
          }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', zIndex: 1001 }}
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

        {/* Nav links — hidden on mobile/tablet */}
        <ul
          style={{
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
          
          {/* Language selector squares — hidden on mobile */}
          <div className="hidden md:flex" style={{ gap: '6px', marginRight: '4px' }}>
            {[
              { lang: 'mr', label: 'अ' },
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
                  fontFamily: l === 'mr' ? "'Noto Serif Devanagari', serif" : (l === 'ja' ? 'sans-serif' : 'Inter, sans-serif'),
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
                aria-label={`Switch language to ${l === 'mr' ? 'Marathi' : (l === 'ja' ? 'Japanese' : 'English')}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Switch to Light Mode Toggle Button — hidden on mobile */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center justify-center"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '0.5px solid var(--border-gold)',
              background: 'transparent',
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

          {/* Hire Me CTA Button — hidden on mobile */}
          <a
            href="mailto:atharvanitinghule@gmail.com"
            className="hidden md:inline-block"
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

          {/* Hamburger Menu Toggle Button — shown on mobile/tablet */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden flex-col justify-center items-center"
            style={{
              width: '36px',
              height: '36px',
              background: 'transparent',
              border: '0.5px solid var(--border-gold)',
              cursor: 'pointer',
              zIndex: 1001,
              position: 'relative',
              outline: 'none',
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                width: '18px',
                height: '1.5px',
                background: 'var(--text-1)',
                position: 'absolute',
                transition: 'transform 0.3s ease',
                transform: menuOpen ? 'rotate(45deg)' : 'translateY(-5px)',
              }}
            />
            <span
              style={{
                width: '18px',
                height: '1.5px',
                background: 'var(--text-1)',
                position: 'absolute',
                transition: 'opacity 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: '18px',
                height: '1.5px',
                background: 'var(--text-1)',
                position: 'absolute',
                transition: 'transform 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg)' : 'translateY(5px)',
              }}
            />
          </button>

        </div>
      </nav>

      {/* Mobile Drawer Menu Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme === 'dark' ? 'rgba(8,8,8,0.98)' : 'rgba(245,240,232,0.98)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '28px',
          transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Navigation Links */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => {
                  setMenuOpen(false)
                  scrollTo(e, href)
                }}
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '24px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'var(--text-1)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
              >
                {t(`nav.${label.toLowerCase()}`)}
              </a>
            </li>
          ))}
        </ul>

        {/* Separator line */}
        <div style={{ width: '40px', height: '0.5px', background: 'var(--border-gold)', margin: '8px 0' }} />

        {/* Language selectors in mobile menu */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { lang: 'mr', label: 'अ' },
            { lang: 'en', label: 'a' },
            { lang: 'ja', label: 'ア' },
          ].map(({ lang: l, label }) => (
            <button
              key={l}
              onClick={() => {
                setLanguage(l)
                // Keep menu open so they see language update, or close? Usually keeping it open is good
              }}
              style={{
                width: '36px',
                height: '36px',
                border: language === l ? '1px solid var(--gold)' : '0.5px solid var(--border)',
                borderRadius: '2px',
                background: language === l ? 'rgba(232, 160, 32, 0.08)' : 'transparent',
                color: language === l ? 'var(--gold)' : 'var(--text-2)',
                fontFamily: l === 'mr' ? "'Noto Serif Devanagari', serif" : (l === 'ja' ? 'sans-serif' : 'Inter, sans-serif'),
                fontSize: '13px',
                fontWeight: language === l ? '800' : '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                outline: 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Theme switch button in mobile menu */}
        <button
          onClick={toggleTheme}
          style={{
            width: '44px',
            height: '44px',
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
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          )}
        </button>

        {/* Hire Me CTA button in mobile menu */}
        <a
          href="mailto:atharvanitinghule@gmail.com"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--bg)',
            background: 'var(--gold)',
            border: 'none',
            padding: '10px 24px',
            textDecoration: 'none',
            transition: 'background 0.3s, color 0.3s',
            display: 'inline-block',
            marginTop: '8px',
          }}
        >
          {t('nav.hireMe')}
        </a>
      </div>
    </>
  )
}
