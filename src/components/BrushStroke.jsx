// ─────────────────────────────────────────────────────────────────────────────
//  BrushStroke — SVG brushstroke decorative element
//  Variants: 'horizontal' | 'diagonal' | 'corner'
//  Draws in when isVisible prop becomes true, or on mount if autoPlay
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef } from 'react'

/**
 * @param {object}  props
 * @param {'horizontal'|'diagonal'|'corner'} [props.variant='horizontal']
 * @param {string}  [props.color='var(--gold)']
 * @param {number}  [props.opacity=0.15]
 * @param {boolean} [props.isVisible=true]   — triggers draw animation
 * @param {number}  [props.delay=0]          — ms delay before draw
 * @param {string}  [props.width='100%']
 * @param {string}  [props.className]
 * @param {object}  [props.style]
 */
export default function BrushStroke({
  variant = 'horizontal',
  color = 'var(--gold)',
  opacity = 0.15,
  isVisible = true,
  delay = 0,
  width = '100%',
  className = '',
  style = {},
}) {
  const pathRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const len = path.getTotalLength?.() || 600

    // Reset
    path.style.strokeDasharray  = `${len}`
    path.style.strokeDashoffset = `${len}`
    path.style.opacity = '0'
    path.style.transition = 'none'

    if (isVisible) {
      const timer = setTimeout(() => {
        path.style.transition = `stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1), opacity 0.2s`
        path.style.strokeDashoffset = '0'
        path.style.opacity = String(opacity)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, delay, opacity])

  const variants = {
    horizontal: {
      viewBox: '0 0 600 24',
      height: '24',
      path: 'M 2,12 C 60,8 120,16 180,11 C 240,6 300,15 360,10 C 420,5 480,14 540,10 C 560,9 580,11 598,10',
      strokeWidth: '3',
      linecap: 'round',
    },
    diagonal: {
      viewBox: '0 0 300 300',
      height: '120',
      path: 'M 10,280 C 40,240 80,200 120,155 C 160,110 200,70 240,30 C 260,15 280,8 295,4',
      strokeWidth: '2.5',
      linecap: 'round',
    },
    corner: {
      viewBox: '0 0 120 120',
      height: '80',
      // Sumi-e corner flourish — a calligrapher's entry stroke
      path: 'M 8,110 C 10,80 6,50 14,28 C 20,10 32,5 50,4 C 68,3 90,8 112,12',
      strokeWidth: '2',
      linecap: 'round',
    },
  }

  const v = variants[variant] || variants.horizontal

  return (
    <svg
      viewBox={v.viewBox}
      width={width}
      height={v.height}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', overflow: 'visible', ...style }}
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d={v.path}
        stroke={color}
        strokeWidth={v.strokeWidth}
        strokeLinecap={v.linecap}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
