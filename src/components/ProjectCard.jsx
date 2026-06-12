// ─────────────────────────────────────────────────────────────────────────────
//  ProjectCard — individual project card in the horizontal emakimono scroll
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import MagneticButton from './MagneticButton.jsx'
import BrushStroke from './BrushStroke.jsx'
import SanskriticDivider from './SanskriticDivider.jsx'
import { useLanguage } from '../context/LanguageContext'

/**
 * @param {object} props
 * @param {object} props.project — project data from projects.js
 * @param {number} props.index   — position index (0-based)
 */
export default function ProjectCard({ project, index }) {
  const { language, t } = useLanguage()
  const [hovered, setHovered] = useState(false)
  const { id, title, url, tags, description, accent } = project

  const activeTags = tags || []
  const activeDescription = (description && typeof description === 'object') ? (description[language] || description.en) : (description || '')

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

      {/* Browser mockup iframe representing the actual website */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: '6px',
          background: 'var(--bg-surface)',
          border: '0.5px solid var(--border)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Browser title/control bar */}
        <div
          style={{
            height: '28px',
            background: 'var(--bg-raised)',
            borderBottom: '0.5px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '6px',
            flexShrink: 0,
          }}
        >
          {/* Mac-like controls */}
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }} />
          
          {/* Address bar URL display */}
          <div
            style={{
              flex: 1,
              height: '16px',
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: '3px',
              marginLeft: '12px',
              marginRight: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              color: 'var(--text-3)',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.02em',
              border: '0.5px solid rgba(255, 255, 255, 0.03)',
            }}
          >
            {url.replace('https://', '').replace('http://', '')}
          </div>
        </div>

        {/* IFrame window */}
        <div style={{ flex: 1, position: 'relative', width: '100%', overflow: 'hidden' }}>
          <iframe
            src={url}
            title={`Preview of ${title}`}
            onLoad={(e) => {
              try {
                e.target.contentWindow.postMessage({ type: 'dismiss-popup', source: 'antara-portfolio' }, '*');
              } catch (err) {
                // Ignore cross-origin warnings if browser blocks it
              }
            }}
            style={{
              width: '250%',
              height: '250%',
              border: 'none',
              pointerEvents: 'none', // Prevent capturing pointer scroll inside horizontal emakimono
              background: 'var(--bg-raised)',
              transform: 'scale(0.4)',
              transformOrigin: 'top left',
            }}
            loading="lazy"
          />
        </div>
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
        {activeTags.map((tag) => (
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
        {activeDescription}
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
          {t('projectCard.visit')}
        </MagneticButton>
      </div>
    </article>
  )
}
