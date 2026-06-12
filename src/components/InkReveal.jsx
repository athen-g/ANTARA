// ─────────────────────────────────────────────────────────────────────────────
//  InkReveal — wraps children; plays ink-wash clip-path reveal on viewport enter
//  Each instance generates a unique irregular polygon so no two reveals look identical
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useMemo } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

/**
 * Generates an irregular ink-splash polygon (20 points).
 * The shape is a roughly circular blob with random deviations.
 * We pre-compute the REVEALED polygon (full-cover) and the START polygon (collapsed centre).
 */
function generateInkPolygon(seed) {
  const points = 20
  const cx = 50 // centre x %
  const cy = 50 // centre y %

  // Pseudo-random from seed — deterministic per element
  const rng = (n) => {
    const x = Math.sin(seed + n * 127.1) * 43758.5453
    return x - Math.floor(x)
  }

  const revealedPoints = []
  const startPoints    = []

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI
    // Revealed: irregular blob extending beyond the bounding box
    const rOuter = 75 + rng(i * 2) * 35       // 75–110%
    const rx = cx + Math.cos(angle) * rOuter
    const ry = cy + Math.sin(angle) * rOuter
    revealedPoints.push(`${rx.toFixed(1)}% ${ry.toFixed(1)}%`)

    // Start: collapsed near centre, random micro-offsets for organic feel
    const rInner = 1 + rng(i * 3) * 2
    const sx = cx + Math.cos(angle) * rInner
    const sy = cy + Math.sin(angle) * rInner
    startPoints.push(`${sx.toFixed(1)}% ${sy.toFixed(1)}%`)
  }

  return {
    start:   `polygon(${startPoints.join(', ')})`,
    revealed: `polygon(${revealedPoints.join(', ')})`,
  }
}

/**
 * @param {object}  props
 * @param {React.ReactNode} props.children
 * @param {number}  [props.delay=0]          — delay before reveal starts (ms)
 * @param {number}  [props.duration=1400]    — transition duration (ms)
 * @param {number}  [props.threshold=0.12]   — intersection threshold
 * @param {string}  [props.className]
 * @param {object}  [props.style]
 * @param {string}  [props.as='div']         — wrapper element type
 */
export default function InkReveal({
  children,
  delay = 0,
  duration = 1400,
  threshold = 0.12,
  className = '',
  style = {},
  as: Tag = 'div',
}) {
  const innerRef = useRef(null)
  const { ref: wrapRef, isVisible } = useScrollReveal({ threshold })

  // Unique seed per instance — based on component mount order via a counter
  const seed = useMemo(() => Math.random() * 999, [])
  const { start, revealed } = useMemo(() => generateInkPolygon(seed), [seed])

  // Apply clip-path when isVisible flips true
  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    if (isVisible) {
      el.style.transition = `clip-path ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`
      // rAF to ensure the browser paints the start state first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.clipPath = revealed
        })
      })
    } else {
      el.style.clipPath = start
      el.style.transition = 'none'
    }
  }, [isVisible, start, revealed, delay, duration])

  // Initialise with collapsed clip-path
  useEffect(() => {
    const el = innerRef.current
    if (el) {
      el.style.clipPath = start
    }
  }, [start])

  return (
    <Tag ref={wrapRef} className={`ink-reveal-wrapper ${className}`} style={style}>
      <div ref={innerRef} style={{ willChange: 'clip-path' }}>
        {children}
      </div>
    </Tag>
  )
}
