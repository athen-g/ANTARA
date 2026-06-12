// ─────────────────────────────────────────────────────────────────────────────
//  SanskriticDivider — SVG yantra / mandala geometry between sections
//  Variant A: 9-triangle yantra (outer circle + interlocked triangles)
//  Variant B: Seed syllable circle — OM in lotus petal arrangement
//  Variant C: Shri Chakra outer square with gates
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'

/**
 * @param {'A'|'B'|'C'} [variant='A']
 * @param {number}  [size=120]         — SVG height in px
 * @param {string}  [color='var(--gold-dim)']
 * @param {number}  [opacity=0.2]
 * @param {boolean} [rotate=true]      — applies slow CSS rotation
 * @param {string}  [className]
 * @param {object}  [style]
 */
export default function SanskriticDivider({
  variant = 'A',
  size = 120,
  color = 'var(--gold-dim)',
  opacity = 0.2,
  rotate = true,
  className = '',
  style = {},
}) {
  const svgProps = {
    width: size,
    height: size,
    viewBox: '0 0 200 200',
    fill: 'none',
    'aria-hidden': 'true',
    style: {
      display: 'block',
      opacity,
      animation: rotate ? 'rotateSlow 120s linear infinite' : 'none',
      ...style,
    },
    className,
  }

  const stroke = color
  const sw = '0.5'
  const cx = 100
  const cy = 100

  if (variant === 'A') {
    // Simplified 9-triangle yantra: concentric circles + interlocked triangles
    return (
      <svg {...svgProps}>
        {/* Concentric circles */}
        {[92, 78, 64, 50, 36].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} stroke={stroke} strokeWidth={sw} />
        ))}
        {/* Downward triangles */}
        <polygon points={`${cx},${cy - 76} ${cx + 66},${cy + 38} ${cx - 66},${cy + 38}`} stroke={stroke} strokeWidth={sw} />
        <polygon points={`${cx},${cy - 52} ${cx + 45},${cy + 26} ${cx - 45},${cy + 26}`} stroke={stroke} strokeWidth={sw} />
        <polygon points={`${cx},${cy - 32} ${cx + 28},${cy + 16} ${cx - 28},${cy + 16}`} stroke={stroke} strokeWidth={sw} />
        {/* Upward triangles */}
        <polygon points={`${cx},${cy + 76} ${cx + 66},${cy - 38} ${cx - 66},${cy - 38}`} stroke={stroke} strokeWidth={sw} />
        <polygon points={`${cx},${cy + 52} ${cx + 45},${cy - 26} ${cx - 45},${cy - 26}`} stroke={stroke} strokeWidth={sw} />
        <polygon points={`${cx},${cy + 32} ${cx + 28},${cy - 16} ${cx - 28},${cy - 16}`} stroke={stroke} strokeWidth={sw} />
        {/* Bindu */}
        <circle cx={cx} cy={cy} r={2} fill={stroke} />
      </svg>
    )
  }

  if (variant === 'B') {
    // OM / seed syllable in lotus petal arrangement (8 petals)
    const petalCount = 8
    const petalR = 28
    const outerR = 70

    return (
      <svg {...svgProps}>
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={outerR} stroke={stroke} strokeWidth={sw} />
        <circle cx={cx} cy={cy} r={outerR - 8} stroke={stroke} strokeWidth={sw} opacity="0.5" />

        {/* 8 lotus petals — ellipses rotated around center */}
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = (i / petalCount) * 360
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy - petalR}
              rx="10"
              ry={petalR}
              stroke={stroke}
              strokeWidth={sw}
              fill="none"
              transform={`rotate(${angle}, ${cx}, ${cy})`}
            />
          )
        })}

        {/* Inner circle */}
        <circle cx={cx} cy={cy} r={18} stroke={stroke} strokeWidth={sw} />

        {/* OM glyph — rendered as text */}
        <text
          x={cx}
          y={cy + 7}
          textAnchor="middle"
          fontFamily="'Noto Serif Devanagari', serif"
          fontSize="22"
          fill={stroke}
          opacity="0.8"
        >
          ॐ
        </text>
      </svg>
    )
  }

  if (variant === 'C') {
    // Outermost square of a traditional yantra with four T-shaped "gates"
    const sq = 80  // half side of square
    const gw = 16  // gate width
    const gd = 16  // gate depth

    return (
      <svg {...svgProps}>
        {/* Outer square */}
        <rect x={cx - sq} y={cy - sq} width={sq * 2} height={sq * 2} stroke={stroke} strokeWidth={sw} />

        {/* Inner square (slightly smaller) */}
        <rect x={cx - sq + 8} y={cy - sq + 8} width={(sq - 8) * 2} height={(sq - 8) * 2} stroke={stroke} strokeWidth={sw} />

        {/* Four T-shaped gates */}
        {/* Top gate */}
        <polyline points={`${cx - gw},${cy - sq} ${cx - gw},${cy - sq - gd} ${cx + gw},${cy - sq - gd} ${cx + gw},${cy - sq}`} stroke={stroke} strokeWidth={sw} />
        {/* Bottom gate */}
        <polyline points={`${cx - gw},${cy + sq} ${cx - gw},${cy + sq + gd} ${cx + gw},${cy + sq + gd} ${cx + gw},${cy + sq}`} stroke={stroke} strokeWidth={sw} />
        {/* Left gate */}
        <polyline points={`${cx - sq},${cy - gw} ${cx - sq - gd},${cy - gw} ${cx - sq - gd},${cy + gw} ${cx - sq},${cy + gw}`} stroke={stroke} strokeWidth={sw} />
        {/* Right gate */}
        <polyline points={`${cx + sq},${cy - gw} ${cx + sq + gd},${cy - gw} ${cx + sq + gd},${cy + gw} ${cx + sq},${cy + gw}`} stroke={stroke} strokeWidth={sw} />

        {/* Concentric inner circles */}
        {[40, 28, 18].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} stroke={stroke} strokeWidth={sw} />
        ))}

        {/* Diagonal cross lines */}
        <line x1={cx - sq + 8} y1={cy - sq + 8} x2={cx + sq - 8} y2={cy + sq - 8} stroke={stroke} strokeWidth={sw} opacity="0.4" />
        <line x1={cx + sq - 8} y1={cy - sq + 8} x2={cx - sq + 8} y2={cy + sq - 8} stroke={stroke} strokeWidth={sw} opacity="0.4" />

        {/* Center bindu */}
        <circle cx={cx} cy={cy} r={2.5} fill={stroke} />
      </svg>
    )
  }

  return null
}
