// ─────────────────────────────────────────────────────────────────────────────
//  Hero — the opening statement
//  WebGL noise background · Sumi-e letter reveal · Role cycling · Parallax
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import BrushStroke from '../components/BrushStroke.jsx'
import { useMousePosition } from '../hooks/useMousePosition.js'
import { useLanguage } from '../context/LanguageContext'

const DEFAULT_ROLES = ['UI/UX Designer', 'Frontend Developer', 'Fullstack Developer']

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/athen-g',                        icon: 'GH' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/atharva-g45/',            icon: 'LI' },
  { label: 'Instagram', href: 'https://www.instagram.com/athen_g_/',                icon: 'IG' },
]

// ── Tiny noise canvas background (Three.js) ───────────────────────────────────
function useNoiseBackground(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false })
    renderer.setPixelRatio(1) // Low res — it's pure texture
    renderer.setSize(canvas.offsetWidth || window.innerWidth, canvas.offsetHeight || window.innerHeight)

    const scene  = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // Resolve theme colors dynamically
    const getThemeColors = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      const rootStyle = getComputedStyle(document.documentElement)
      const bgStr = rootStyle.getPropertyValue('--bg').trim() || (isLight ? '#F5F0E8' : '#080808')
      const noiseColorStr = isLight ? '#E8DEC9' : '#0d0b07'
      return {
        base: new THREE.Color(bgStr),
        noise: new THREE.Color(noiseColorStr),
        isLight: isLight ? 1.0 : 0.0
      }
    }

    const initialColors = getThemeColors()

    // Fullscreen quad
    const geo = new THREE.PlaneGeometry(2, 2)
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBaseColor: { value: initialColors.base },
        uNoiseColor: { value: initialColors.noise },
        uIsLight: { value: initialColors.isLight }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uBaseColor;
        uniform vec3 uNoiseColor;
        uniform float uIsLight;
        varying vec2 vUv;

        // Compact simplex noise
        vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
        vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
        vec4 permute(vec4 x){return mod289v4(((x*34.)+1.)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.7928429-0.8537347*r;}
        float snoise(vec3 v){
          const vec2 C=vec2(1./6.,1./3.);
          const vec4 D=vec4(0.,.5,1.,2.);
          vec3 i=floor(v+dot(v,C.yyy));
          vec3 x0=v-i+dot(i,C.xxx);
          vec3 g=step(x0.yzx,x0.xyz);
          vec3 l=1.-g;
          vec3 i1=min(g.xyz,l.zxy);
          vec3 i2=max(g.xyz,l.zxy);
          vec3 x1=x0-i1+C.xxx;
          vec3 x2=x0-i2+C.yyy;
          vec3 x3=x0-D.yyy;
          i=mod289v3(i);
          vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
          float n_=.142857142857;
          vec3 ns=n_*D.wyz-D.xzx;
          vec4 j=p-49.*floor(p*ns.z*ns.z);
          vec4 x_=floor(j*ns.z);
          vec4 y_=floor(j-7.*x_);
          vec4 x=x_*ns.x+ns.yyyy;
          vec4 y=y_*ns.x+ns.yyyy;
          vec4 h=1.-abs(x)-abs(y);
          vec4 b0=vec4(x.xy,y.xy);
          vec4 b1=vec4(x.zw,y.zw);
          vec4 s0=floor(b0)*2.+1.;
          vec4 s1=floor(b1)*2.+1.;
          vec4 sh=-step(h,vec4(0.));
          vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
          vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
          vec3 p0=vec3(a0.xy,h.x);
          vec3 p1=vec3(a0.zw,h.y);
          vec3 p2=vec3(a1.xy,h.z);
          vec3 p3=vec3(a1.zw,h.w);
          vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
          vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
          m=m*m;
          return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main(){
          float t=uTime*0.00008;
          float n1=snoise(vec3(vUv*2.5,t));
          float n2=snoise(vec3(vUv*5.,t*1.3+17.));
          float n=(n1*.6+n2*.4)*0.014;
          
          vec3 col;
          if (uIsLight > 0.5) {
            vec3 warm = vec3(0.02, 0.01, -0.01) * n;
            col = uBaseColor + vec3(n * 0.4) + warm;
            col = clamp(col, uBaseColor - 0.015, uBaseColor + 0.015);
          } else {
            vec3 warm = uNoiseColor * max(n, 0.) * 3.0;
            col = clamp(uBaseColor + n + warm, vec3(0.02), vec3(0.075));
          }
          
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })

    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    let frameId
    let lastTime = 0
    const animate = (time) => {
      if (!document.hidden) {
        const delta = Math.min(time - lastTime, 33)
        lastTime = time
        mat.uniforms.uTime.value += delta
        renderer.render(scene, camera)
      }
      frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)

    const onResize = () => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    }
    window.addEventListener('resize', onResize, { passive: true })

    // Theme observer to dynamically update uniforms
    const observer = new MutationObserver(() => {
      const colors = getThemeColors()
      mat.uniforms.uBaseColor.value.copy(colors.base)
      mat.uniforms.uNoiseColor.value.copy(colors.noise)
      mat.uniforms.uIsLight.value = colors.isLight
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      mat.dispose()
      geo.dispose()
      renderer.dispose()
    }
  }, [])
}

export default function Hero({ loaderDone, prefersReducedMotion }) {
  const { language, t } = useLanguage()
  const roles = t('hero.roles') || DEFAULT_ROLES

  const sectionRef = useRef(null)
  const atharvaRef = useRef(null)
  const ghuleRef   = useRef(null)
  const taglineRef = useRef(null)
  const socialsRef = useRef(null)
  const scrollRef  = useRef(null)
  const canvasRef  = useRef(null)
  const kanjiRef   = useRef(null)

  const [roleIndex, setRoleIndex]  = useState(0)
  const [roleVisible, setRoleVisible] = useState(true)
  const [revealDone, setRevealDone] = useState(false)

  const mouse = useMousePosition()

  const firstName = t('hero.firstName') || 'ATHARVA'
  const lastName = t('hero.lastName') || 'GHULE'
  const isEnglish = language === 'en'
  const nameFont = language === 'mr' ? "'Noto Serif Devanagari', serif" : (language === 'ja' ? 'sans-serif' : 'Syne, sans-serif')
  const nameSize = language === 'en' ? 'clamp(30px, 9vw, 175px)' : 'clamp(26px, 8vw, 110px)'
  const nameLineHeight = language === 'mr' ? 1.35 : (language === 'ja' ? 1.15 : 0.85)
  const nameLetterSpacing = language === 'en' ? '-0.04em' : 'normal'
  const heroWatermark = language === 'ja' ? 'सृ' : '創'

  // WebGL noise background
  useNoiseBackground(canvasRef)

  // Role cycling with clip-path wipe
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false)
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length)
        setRoleVisible(true)
      }, 500)
    }, 2800)
    return () => clearInterval(interval)
  }, [roles.length])

  // GSAP letter-by-letter reveal after loader
  useEffect(() => {
    if (!loaderDone || prefersReducedMotion) return

    const tl = gsap.timeline({ delay: 0.2, defaults: { force3D: true } })

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

    tl.call(() => setRevealDone(true))
  }, [loaderDone, prefersReducedMotion])

  // Mouse parallax on kanji watermark
  useEffect(() => {
    if (!kanjiRef.current) return
    const x = mouse.ndcX * 30
    const y = -mouse.ndcY * 20
    kanjiRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
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
      {/* WebGL noise background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

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
          fontFamily: language === 'ja' ? "'Noto Serif Devanagari', serif" : 'Syne, sans-serif',
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
        {heroWatermark}
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          paddingLeft: 'clamp(24px, 8vw, 120px)',
          paddingRight: 'clamp(24px, 6vw, 96px)',
          paddingTop: 'clamp(60px, 8vh, 120px)',
          paddingBottom: 'clamp(60px, 8vh, 100px)',
        }}
      >
        {/* Section label */}
        <p className="text-label" style={{ marginBottom: '28px', opacity: loaderDone ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}>
          {t('hero.portfolioLabel')}
        </p>

        {/* Name block */}
        <div
          style={{
            marginBottom: '24px',
            lineHeight: nameLineHeight,
          }}
        >
          {/* Screen-reader accessible version of the name */}
          <span className="sr-only">{firstName} {lastName}</span>

          {/* ATHARVA */}
          <div
            ref={atharvaRef}
            aria-hidden="true"
            style={{ display: 'flex', gap: '0.01em', overflow: 'hidden' }}
          >
            {isEnglish ? (
              firstName.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-letter"
                  aria-hidden="true"
                  style={{
                    fontFamily: nameFont,
                    fontWeight: 900,
                    fontSize: nameSize,
                    lineHeight: nameLineHeight,
                    letterSpacing: nameLetterSpacing,
                    color: 'var(--text-1)',
                    display: 'inline-block',
                    clipPath: (revealDone || prefersReducedMotion) ? 'none' : 'polygon(0% 110%, 100% 110%, 100% 110%, 0% 110%)',
                    willChange: 'clip-path, transform',
                  }}
                >
                  {char}
                </span>
              ))
            ) : (
              <span
                className="hero-letter"
                style={{
                  fontFamily: nameFont,
                  fontWeight: 900,
                  fontSize: nameSize,
                  lineHeight: nameLineHeight,
                  letterSpacing: nameLetterSpacing,
                  color: 'var(--text-1)',
                  display: 'inline-block',
                  clipPath: (revealDone || prefersReducedMotion) ? 'none' : 'polygon(0% 110%, 100% 110%, 100% 110%, 0% 110%)',
                  willChange: 'clip-path, transform',
                }}
              >
                {firstName}
              </span>
            )}
          </div>

          {/* GHULE — outlined */}
          <div
            ref={ghuleRef}
            aria-hidden="true"
            style={{ display: 'flex', gap: '0.01em', overflow: 'hidden' }}
          >
            {isEnglish ? (
              lastName.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-letter"
                  aria-hidden="true"
                  style={{
                    fontFamily: nameFont,
                    fontWeight: 900,
                    fontSize: nameSize,
                    lineHeight: nameLineHeight,
                    letterSpacing: nameLetterSpacing,
                    WebkitTextStroke: '1px var(--gold)',
                    color: 'transparent',
                    display: 'inline-block',
                    clipPath: (revealDone || prefersReducedMotion) ? 'none' : 'polygon(0% 110%, 100% 110%, 100% 110%, 0% 110%)',
                    willChange: 'clip-path, transform',
                  }}
                >
                  {char}
                </span>
              ))
            ) : (
              <span
                className="hero-letter"
                style={{
                  fontFamily: nameFont,
                  fontWeight: 900,
                  fontSize: nameSize,
                  lineHeight: nameLineHeight,
                  letterSpacing: nameLetterSpacing,
                  WebkitTextStroke: '1px var(--gold)',
                  color: 'transparent',
                  display: 'inline-block',
                  clipPath: (revealDone || prefersReducedMotion) ? 'none' : 'polygon(0% 110%, 100% 110%, 100% 110%, 0% 110%)',
                  willChange: 'clip-path, transform',
                }}
              >
                {lastName}
              </span>
            )}
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
            gap: 'clamp(10px, 1.5vw, 16px)',
            border: '0.5px solid var(--border-gold)',
            padding: '8px clamp(12px, 3vw, 20px)',
            marginBottom: '32px',
            overflow: 'hidden',
            minWidth: 'clamp(200px, 60vw, 280px)',
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
            aria-label={`Current role: ${roles[roleIndex] || ''}`}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(11px, 2vw, 16px)',
              color: 'var(--text-1)',
              clipPath: roleVisible
                ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
              transition: 'clip-path 0.5s cubic-bezier(0.16,1,0.3,1)',
              whiteSpace: 'nowrap',
            }}
          >
            {roles[roleIndex] || ''}
          </span>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: language === 'sa' ? "'Noto Serif Devanagari', serif" : (language === 'ja' ? 'sans-serif' : 'Inter, sans-serif'),
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.8vw, 18px)',
            lineHeight: 1.7,
            color: 'var(--text-2)',
            maxWidth: '520px',
            marginBottom: '48px',
          }}
        >
          {(t('hero.tagline') || '')
            .split(language === 'ja' ? '' : ' ')
            .map((word, i) => (
              <span
                key={`${language}-${i}`}
                className="tagline-word"
                style={{ display: 'inline-block', marginRight: language === 'ja' ? '0' : '0.3em', opacity: loaderDone ? 1 : 0 }}
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
              {t('hero.scroll')}
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
