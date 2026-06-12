// ─────────────────────────────────────────────────────────────────────────────
//  MagneticButton — button that attracts toward the cursor on hover
//  Provides the satisfying "pull" micro-interaction
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useCallback } from 'react'

/**
 * @param {object}  props
 * @param {string}  props.children
 * @param {string}  [props.variant]   — 'gold' | 'outline' | 'ghost'
 * @param {string}  [props.href]      — renders as <a> if provided
 * @param {string}  [props.className]
 * @param {object}  [props.style]
 * @param {function}[props.onClick]
 * @param {string}  [props.type]      — button type attribute
 */
export default function MagneticButton({
  children,
  variant = 'gold',
  href,
  className = '',
  style = {},
  onClick,
  type = 'button',
  ...rest
}) {
  const btnRef = useRef(null)
  const animating = useRef(false)

  const variants = {
    gold: {
      background: 'var(--gold)',
      color: 'var(--bg)',
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: 'var(--gold)',
      border: '0.5px solid var(--gold)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-2)',
      border: '0.5px solid var(--border)',
    },
  }

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px 32px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '13px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'none',
    position: 'relative',
    transition: 'background 0.3s, color 0.3s, border-color 0.3s',
    userSelect: 'none',
    ...variants[variant],
    ...style,
  }

  const onMouseMove = useCallback((e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.35
    const dy = (e.clientY - cy) * 0.35
    btn.style.transform = `translate(${dx}px, ${dy}px)`
  }, [])

  const onMouseLeave = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    btn.style.transform = 'translate(0px, 0px)'
    btn.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.3s, color 0.3s'
  }, [])

  const onMouseEnter = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    btn.style.transition = 'transform 0.15s linear, background 0.3s, color 0.3s'
  }, [])

  const commonProps = {
    ref: btnRef,
    'data-cursor': 'hover',
    style: baseStyle,
    className,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    ...rest,
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} {...commonProps}>
      {children}
    </button>
  )
}
