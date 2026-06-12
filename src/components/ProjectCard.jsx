// ─────────────────────────────────────────────────────────────────────────────
//  ProjectCard — individual project card in the horizontal emakimono scroll
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import MagneticButton from './MagneticButton.jsx'
import BrushStroke from './BrushStroke.jsx'
import SanskriticDivider from './SanskriticDivider.jsx'

/**
 * @param {object} props
 * @param {object} props.project — project data from projects.js
 * @param {number} props.index   — position index (0-based)
 */
export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const { id, title, url, tags, description, accent } = project

  return (
    <article
      data-cursor="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Project: ${title}`}
      style={{
        position: 'relative',
        width: 'clamp(300px, 65vw, 720px)',
        flexShrink: 0,
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border)',
        borderLeft: `4px solid ${accent[0]}`,
        padding: '48px 40px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 80px rgba(0,0,0,0.5), inset 0 0 0 0.5px ${accent[0]}44`
          : '0 4px 24px rgba(0,0,0,0.2)',
        cursor: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Brushstroke sweeps across top edge on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
          height: '3px',
        }}
      >
        <BrushStroke
          variant="horizontal"
          color={accent[0]}
          opacity={hovered ? 0.8 : 0}
          isVisible={hovered}
          style={{
            transition: 'opacity 0.4s',
            marginTop: '-10px',
          }}
        />
      </div>

      {/* Project number watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20px',
          right: '28px',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 900,
          fontSize: '120px',
          lineHeight: 1,
          color: hovered ? `${accent[0]}18` : 'var(--bg-raised)',
          userSelect: 'none',
          transition: 'color 0.4s',
          letterSpacing: '-0.04em',
          pointerEvents: 'none',
        }}
      >
        {id}
      </div>

      {/* Gradient image placeholder with miniature yantra overlay */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          borderRadius: '1px',
          background: `linear-gradient(135deg, ${accent[0]}22, ${accent[1]}44)`,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Yantra overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SanskriticDivider
            variant="A"
            size={100}
            color={accent[0]}
            opacity={0.1}
            rotate={hovered}
          />
        </div>

        {/* Gradient shimmer on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, transparent, ${accent[0]}15, transparent)`,
            transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(24px, 3vw, 36px)',
          lineHeight: 1.05,
          color: 'var(--text-1)',
          letterSpacing: '-0.02em',
          marginTop: '8px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {title}
      </h3>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-2)',
              border: `0.5px solid ${accent[0]}44`,
              padding: '3px 9px',
              transition: 'border-color 0.3s, color 0.3s',
              borderColor: hovered ? `${accent[0]}88` : `${accent[0]}44`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: 1.75,
          color: 'var(--text-2)',
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* CTA */}
      <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
        <MagneticButton
          href={url}
          variant="outline"
          style={{
            borderColor: accent[0],
            color: accent[0],
            padding: '10px 24px',
            fontSize: '12px',
          }}
        >
          開く &nbsp;→&nbsp; Visit
        </MagneticButton>
      </div>
    </article>
  )
}
