// ─────────────────────────────────────────────────────────────────────────────
//  Loader — Sri Yantra mandala assembles, then loader clips up
//  The mandala draws each ring/triangle sequentially, pulses, then exits
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from 'react'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const [phase, setPhase] = useState('assembling') // 'assembling' | 'pulsing' | 'exiting'

  useEffect(() => {
    // Phase timeline
    // 0–2000ms: mandala assembles
    // 2000–2600ms: pulse
    // 2600–3400ms: exit slide up
    // 3400ms: call onComplete

    const t1 = setTimeout(() => setPhase('pulsing'),  2000)
    const t2 = setTimeout(() => setPhase('exiting'),  2600)
    const t3 = setTimeout(() => onComplete?.(),       3400)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      aria-label="Loading — assembling yantra"
      role="status"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        transform: phase === 'exiting' ? 'translateY(-100%)' : 'translateY(0)',
        transition: phase === 'exiting'
          ? 'transform 0.8s cubic-bezier(0.16,1,0.3,1)'
          : 'none',
        pointerEvents: phase === 'exiting' ? 'none' : 'all',
        willChange: 'transform',
      }}
    >
      {/* Sri Yantra SVG */}
      <div
        style={{
          transform: phase === 'pulsing' ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}
      >
        <SriYantraSVG />
      </div>

      {/* Name reveal — letter by letter */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          overflow: 'hidden',
        }}
      >
        {'ATHARVA GHULE'.split('').map((char, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 900,
              fontSize: '13px',
              letterSpacing: '0.3em',
              color: 'var(--text-2)',
              display: 'inline-block',
              opacity: 0,
              animation: `letterFadeIn 0.05s ease forwards ${0.1 + i * 0.07}s`,
              willChange: 'transform, opacity',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes letterFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ── Sri Yantra SVG — concentric rings + interlocked triangles ────────────────

function SriYantraSVG() {
  const cx = 120
  const cy = 120
  const size = 240

  const [drawn, setDrawn] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Ring radii
  const rings = [108, 90, 72, 56]
  // Triangle paths (simplified 9-triangle yantra: 4 downward + 5 upward)
  const triangles = [
    // Outer downward (large)
    `M ${cx},${cy - 80} L ${cx + 69},${cy + 40} L ${cx - 69},${cy + 40} Z`,
    // Outer upward (large)
    `M ${cx},${cy + 80} L ${cx + 69},${cy - 40} L ${cx - 69},${cy - 40} Z`,
    // Mid downward
    `M ${cx},${cy - 56} L ${cx + 48},${cy + 28} L ${cx - 48},${cy + 28} Z`,
    // Mid upward
    `M ${cx},${cy + 56} L ${cx + 48},${cy - 28} L ${cx - 48},${cy - 28} Z`,
    // Inner downward
    `M ${cx},${cy - 36} L ${cx + 31},${cy + 18} L ${cx - 31},${cy + 18} Z`,
    // Inner upward
    `M ${cx},${cy + 36} L ${cx + 31},${cy - 18} L ${cx - 31},${cy - 18} Z`,
    // Innermost downward
    `M ${cx},${cy - 20} L ${cx + 17},${cy + 10} L ${cx - 17},${cy + 10} Z`,
    // Innermost upward
    `M ${cx},${cy + 20} L ${cx + 17},${cy - 10} L ${cx - 17},${cy - 10} Z`,
  ]

  const totalElements = rings.length + triangles.length
  const delayPerElement = 120 // slightly faster stagger for smoother feel

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      {/* Outer rings */}
      {rings.map((r, i) => {
        const circ = 2 * Math.PI * r
        return (
          <circle
            key={`ring-${i}`}
            cx={cx}
            cy={cy}
            r={r}
            stroke="var(--gold-dim)"
            strokeWidth="0.5"
            opacity="0.6"
            style={{
              strokeDasharray: circ,
              strokeDashoffset: drawn ? 0 : circ,
              transition: `stroke-dashoffset 1.2s cubic-bezier(0.25, 1, 0.5, 1) ${i * delayPerElement}ms`,
              willChange: 'stroke-dashoffset',
            }}
          />
        )
      })}

      {/* Triangles */}
      {triangles.map((d, i) => {
        const pathLen = 600 // safe upper bound for triangle perimeter
        return (
          <path
            key={`tri-${i}`}
            d={d}
            stroke="var(--gold)"
            strokeWidth="0.5"
            opacity="0.7"
            style={{
              strokeDasharray: pathLen,
              strokeDashoffset: drawn ? 0 : pathLen,
              transition: `stroke-dashoffset 1.0s cubic-bezier(0.25, 1, 0.5, 1) ${(rings.length + i) * delayPerElement}ms`,
              willChange: 'stroke-dashoffset',
            }}
          />
        )
      })}

      {/* Center bindu (dot) */}
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill="var(--gold)"
        style={{
          opacity: drawn ? 1 : 0,
          transition: 'opacity 0.6s ease 1.6s',
          willChange: 'opacity',
        }}
      />

      {/* OM symbol in center — subtle */}
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fontFamily="'Noto Serif Devanagari', serif"
        fontSize="14"
        fill="var(--gold)"
        opacity="0.5"
        style={{
          opacity: drawn ? 0.5 : 0,
          transition: 'opacity 0.8s ease 1.7s',
          willChange: 'opacity',
        }}
      >
        ॐ
      </text>
    </svg>
  )
}
