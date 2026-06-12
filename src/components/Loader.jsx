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
      }}
    >
      {/* Sri Yantra SVG */}
      <div
        style={{
          transform: phase === 'pulsing' ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <SriYantraSVG assembling={phase === 'assembling'} />
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

function SriYantraSVG({ assembling }) {
  const cx = 120
  const cy = 120
  const size = 240

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
  const delayPerElement = 2000 / totalElements

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Outer rings */}
      {rings.map((r, i) => (
        <circle
          key={`ring-${i}`}
          cx={cx}
          cy={cy}
          r={r}
          stroke="var(--gold-dim)"
          strokeWidth="0.5"
          opacity="0.6"
          style={{
            strokeDasharray: `${2 * Math.PI * r}`,
            strokeDashoffset: assembling ? `${2 * Math.PI * r}` : 0,
            transition: assembling
              ? `stroke-dashoffset 0.5s ease ${i * delayPerElement}ms`
              : 'none',
          }}
        />
      ))}

      {/* Triangles */}
      {triangles.map((d, i) => {
        const pathLen = 400 // approximate
        return (
          <path
            key={`tri-${i}`}
            d={d}
            stroke="var(--gold)"
            strokeWidth="0.5"
            opacity="0.7"
            style={{
              strokeDasharray: pathLen,
              strokeDashoffset: assembling ? pathLen : 0,
              transition: assembling
                ? `stroke-dashoffset 0.4s ease ${(rings.length + i) * delayPerElement}ms`
                : 'none',
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
          opacity: assembling ? 0 : 1,
          transition: 'opacity 0.4s ease 1.8s',
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
          opacity: assembling ? 0 : 0.5,
          transition: 'opacity 0.6s ease 1.9s',
        }}
      >
        ॐ
      </text>
    </svg>
  )
}
