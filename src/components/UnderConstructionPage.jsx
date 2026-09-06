import React, { useEffect, useRef } from 'react';

/* Water Overlay */
function WaterOverlay() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="skill-water-overlay-video"
        src="/water-overlay.mp4"
        muted
        loop
        playsInline
      />
      <img
        className="skill-image6-overlay"
        src="/image 5.png"
        alt="Texture Overlay"
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 1: Minimalist P3R System Theme (ITEM, EQUIP, STATS)
   ───────────────────────────────────────────────────────────── */
function SystemTheme({ title, onBack }) {
  return (
    <div className="p3r-theme-container theme-system">
      <WaterOverlay />

      {/* Tilted Blue Geometric Polygon */}
      <div className="system-poly-bg" />

      {/* Large Rotated Background Typography */}
      <div className="p3r-bg-typography skill-fall-elem">
        <svg viewBox="0 0 1920 1080" className="p3r-typo-svg">
          <g transform="translate(350, -10) rotate(98.79) skewX(-10) scale(1, 0.98)">
            <text
              x="0"
              y="350"
              fontFamily="'Almarai', sans-serif"
              fontWeight="800"
              fontSize={title.length > 7 ? '320px' : '400px'}
              letterSpacing="-20px"
              fill="#0E3A75"
              opacity="0.85"
            >
              {title}
            </text>
          </g>
        </svg>
      </div>

      {/* Centerpiece Wireframe Graphic */}
      <div className="theme-system-centerpiece skill-fall-elem">
        {title === 'STATS' ? (
          /* Radar Chart for STATS */
          <div className="stats-radar-wrapper">
            <svg width="420" height="420" viewBox="0 0 420 420" className="radar-svg">
              {/* Outer and Inner Hexagons */}
              <polygon points="210,30 366,120 366,300 210,390 54,300 54,120" fill="none" stroke="#01CCF3" strokeWidth="2" opacity="0.4" />
              <polygon points="210,80 323,145 323,275 210,340 97,275 97,145" fill="none" stroke="#01CCF3" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4" />
              <polygon points="210,130 279,170 279,250 210,290 141,250 141,170" fill="none" stroke="#01CCF3" strokeWidth="1" opacity="0.2" />

              {/* Axis lines */}
              <line x1="210" y1="30" x2="210" y2="390" stroke="#01CCF3" strokeWidth="1" opacity="0.3" />
              <line x1="54" y1="120" x2="366" y2="300" stroke="#01CCF3" strokeWidth="1" opacity="0.3" />
              <line x1="54" y1="300" x2="366" y2="120" stroke="#01CCF3" strokeWidth="1" opacity="0.3" />

              {/* Animated Stat Polygon */}
              <polygon points="210,55 340,135 310,285 210,360 85,280 90,130" fill="rgba(1, 204, 243, 0.25)" stroke="#72FFFF" strokeWidth="2.5" className="pulse-polygon" />

              {/* Labels */}
              <text x="210" y="20" fill="#72FFFF" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="'Almarai', sans-serif">HP / SP</text>
              <text x="385" y="125" fill="#72FFFF" fontSize="14" fontWeight="800" textAnchor="start" fontFamily="'Almarai', sans-serif">STR</text>
              <text x="385" y="305" fill="#72FFFF" fontSize="14" fontWeight="800" textAnchor="start" fontFamily="'Almarai', sans-serif">MAG</text>
              <text x="210" y="412" fill="#72FFFF" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="'Almarai', sans-serif">END</text>
              <text x="35" y="305" fill="#72FFFF" fontSize="14" fontWeight="800" textAnchor="end" fontFamily="'Almarai', sans-serif">AGI</text>
              <text x="35" y="125" fill="#72FFFF" fontSize="14" fontWeight="800" textAnchor="end" fontFamily="'Almarai', sans-serif">LUK</text>
            </svg>
            <div className="radar-status-badge">CALIBRATING PARAMETERS</div>
          </div>
        ) : (
          /* Inventory/Armory Slot Grid for ITEM & EQUIP */
          <div className="system-grid-wrapper">
            <div className="grid-header-tag">SECTOR // {title}_INVENTORY_MATRIX</div>
            <div className="system-slots-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="system-slot-box">
                  <div className="slot-corner top-l" />
                  <div className="slot-corner top-r" />
                  <div className="slot-corner bot-l" />
                  <div className="slot-corner bot-r" />
                  <span className="slot-number">{String(i + 1).padStart(2, '0')}</span>
                  <div className="slot-lock-icon">🔒</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Diagnostic Terminal Card */}
      <div className="p3r-terminal-card skill-fall-elem">
        <div className="terminal-hazard-header">
          <div className="hazard-tape-bar">
            <span>CAUTION /// SYSTEM UNDER CALIBRATION /// ACCESS RESTRICTED /// CAUTION</span>
          </div>
        </div>
        <div className="terminal-card-body">
          <div className="terminal-meta-tag">
            <span className="meta-code">SEC_{title}</span>
            <span className="meta-status">LOCKED</span>
          </div>
          <h2 className="terminal-heading">{title} MODULE</h2>
          <p className="terminal-desc">
            This subsystem is undergoing structural synchronization in the Tartarus grid. Data will be unlocked in the next revision.
          </p>
          <div className="terminal-diag-table">
            <div className="diag-row">
              <span className="diag-key">SYSTEM STATE</span>
              <span className="diag-val text-cyan">IN INITIALIZATION</span>
            </div>
            <div className="diag-row">
              <span className="diag-key">ENCRYPTION</span>
              <span className="diag-val text-red">AES-256 (P3R)</span>
            </div>
            <div className="diag-row">
              <span className="diag-key">REVISION</span>
              <span className="diag-val">BUILD_2026.09</span>
            </div>
          </div>
          <div className="terminal-back-btn" onClick={onBack}>
            <span className="back-key">[ESC]</span>
            <span className="back-label">RETURN TO MAIN MENU</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2: Dark Hour / Tartarus Theme (QUEST, CALENDAR, SYSTEM)
   ───────────────────────────────────────────────────────────── */
function DarkHourTheme({ title, onBack }) {
  return (
    <div className="p3r-theme-container theme-darkhour">
      {/* Dark Hour Ambient Eerie Moon & Mist */}
      <div className="darkhour-moon" />
      <div className="darkhour-grid-lines" />

      {/* Large Rotated Typography */}
      <div className="p3r-bg-typography skill-fall-elem">
        <svg viewBox="0 0 1920 1080" className="p3r-typo-svg">
          <g transform="translate(350, -10) rotate(98.79) skewX(-10) scale(1, 0.98)">
            <text
              x="0"
              y="350"
              fontFamily="'Almarai', sans-serif"
              fontWeight="800"
              fontSize={title.length > 7 ? '320px' : '400px'}
              letterSpacing="-20px"
              fill="#063836"
              opacity="0.9"
            >
              {title}
            </text>
          </g>
        </svg>
      </div>

      {/* Centerpiece Clock / Tartarus Spire */}
      <div className="theme-darkhour-centerpiece skill-fall-elem">
        {title === 'CALENDAR' ? (
          /* Midnight 12:00 Dark Hour Clock for CALENDAR */
          <div className="darkhour-clock-wrapper">
            <svg width="400" height="400" viewBox="0 0 400 400" className="clock-svg">
              <circle cx="200" cy="200" r="175" fill="rgba(6, 40, 38, 0.4)" stroke="#00FFE0" strokeWidth="2.5" opacity="0.6" />
              <circle cx="200" cy="200" r="145" fill="none" stroke="#00FFE0" strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
              
              {/* Roman Numerals */}
              <text x="200" y="55" fill="#00FFE0" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="'Almarai', serif">XII</text>
              <text x="345" y="208" fill="#00FFE0" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="'Almarai', serif">III</text>
              <text x="200" y="360" fill="#00FFE0" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="'Almarai', serif">VI</text>
              <text x="55" y="208" fill="#00FFE0" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="'Almarai', serif">IX</text>

              {/* Ticking Clock Hands pointing directly at 12:00 Midnight */}
              <line x1="200" y1="200" x2="200" y2="80" stroke="#FFF933" strokeWidth="4" strokeLinecap="round" className="clock-hour-hand" />
              <line x1="200" y1="200" x2="200" y2="60" stroke="#00FFE0" strokeWidth="2.5" strokeLinecap="round" className="clock-minute-hand" />
              <circle cx="200" cy="200" r="7" fill="#00FFE0" />
            </svg>
            <div className="clock-time-badge">00:00 // THE DARK HOUR</div>
          </div>
        ) : title === 'QUEST' ? (
          /* Tartarus Request Board for QUEST */
          <div className="darkhour-quest-board">
            <div className="quest-board-header">
              <span className="quest-seal-stamp">SEALED</span>
              <h3>ELIZABETH'S REQUEST ARCHIVE</h3>
            </div>
            <div className="quest-items-preview">
              <div className="quest-row">
                <span className="quest-no">REQ #01</span>
                <span className="quest-title">Explore Tartarus Sub-level 01</span>
                <span className="quest-status text-red">LOCKED</span>
              </div>
              <div className="quest-row">
                <span className="quest-no">REQ #02</span>
                <span className="quest-title">Retrieve Old Document Fragment</span>
                <span className="quest-status text-red">LOCKED</span>
              </div>
              <div className="quest-row">
                <span className="quest-no">REQ #03</span>
                <span className="quest-title">Synthesize Special Persona</span>
                <span className="quest-status text-red">LOCKED</span>
              </div>
            </div>
          </div>
        ) : (
          /* Kernel System Terminal for SYSTEM */
          <div className="darkhour-terminal-matrix">
            <div className="matrix-title-bar">TARTARUS_KERNEL_DEBUG // REV_2026</div>
            <div className="matrix-code-lines">
              <p className="code-line">&gt; INITIALIZING MEMENTO_MORI_CORE...</p>
              <p className="code-line">&gt; CHECKING SHADOW_SUPPRESSION_PROTOCOL: <span className="text-cyan">ACTIVE</span></p>
              <p className="code-line">&gt; CONFIG_LOAD: <span className="text-red">[DATA_ENCRYPTED]</span></p>
              <p className="code-line">&gt; PRESS [ESC] TO ABORT AND RETURN TO MENU_</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Dark Hour Terminal Card */}
      <div className="p3r-terminal-card theme-darkhour-card skill-fall-elem">
        <div className="darkhour-card-header">
          <span className="pulse-dot" />
          <span>DARK HOUR PROTOCOL ACTIVE</span>
        </div>
        <div className="terminal-card-body">
          <div className="terminal-meta-tag">
            <span className="meta-code" style={{ color: '#00FFE0', background: 'rgba(0, 255, 224, 0.15)' }}>{title}</span>
            <span className="meta-status" style={{ background: '#00A896' }}>SEALED</span>
          </div>
          <h2 className="terminal-heading" style={{ color: '#E0FFF9' }}>{title}</h2>
          <p className="terminal-desc" style={{ color: '#88D6CB' }}>
            Time stands still in the Dark Hour. The <strong style={{ color: '#00FFE0' }}>{title}</strong> database cannot be unlocked until Tartarus exploration advances.
          </p>
          <div className="terminal-diag-table" style={{ borderColor: 'rgba(0, 255, 224, 0.2)' }}>
            <div className="diag-row">
              <span className="diag-key">TIME CYCLE</span>
              <span className="diag-val" style={{ color: '#00FFE0' }}>12:00 AM (MIDNIGHT)</span>
            </div>
            <div className="diag-row">
              <span className="diag-key">TOWER STATUS</span>
              <span className="diag-val" style={{ color: '#FFF933' }}>MONAD ENCRYPTED</span>
            </div>
          </div>
          <div className="terminal-back-btn darkhour-btn" onClick={onBack}>
            <span className="back-key" style={{ color: '#00FFE0' }}>[ESC]</span>
            <span className="back-label">LEAVE DARK HOUR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 3: Velvet Room Theme (PERSONA, SOCIAL LINK)
   ───────────────────────────────────────────────────────────── */
function VelvetTheme({ title, onBack }) {
  return (
    <div className="p3r-theme-container theme-velvet">
      {/* Velvet Room Blue Glow & Crystal Shards */}
      <div className="velvet-ambient-glow" />
      <div className="velvet-crystal-shard shard-1" />
      <div className="velvet-crystal-shard shard-2" />
      <div className="velvet-crystal-shard shard-3" />

      {/* Large Rotated Typography */}
      <div className="p3r-bg-typography skill-fall-elem">
        <svg viewBox="0 0 1920 1080" className="p3r-typo-svg">
          <g transform="translate(350, -10) rotate(98.79) skewX(-10) scale(1, 0.98)">
            <text
              x="0"
              y="350"
              fontFamily="'Almarai', sans-serif"
              fontWeight="800"
              fontSize={title.length > 7 ? '320px' : '400px'}
              letterSpacing="-20px"
              fill="#181866"
              opacity="0.9"
            >
              {title}
            </text>
          </g>
        </svg>
      </div>

      {/* Centerpiece 3D Tarot Cards / Arcana Constellation */}
      <div className="theme-velvet-centerpiece skill-fall-elem">
        {title === 'PERSONA' ? (
          /* 3D Tilted Tarot Cards for PERSONA */
          <div className="velvet-tarot-hand">
            {/* Card 1: The Fool (0) */}
            <div className="tarot-card card-left">
              <div className="tarot-border">
                <span className="tarot-num">0</span>
                <span className="tarot-name">THE FOOL</span>
                <div className="tarot-emblem">🃏</div>
              </div>
            </div>
            {/* Card 2: Death (XIII) */}
            <div className="tarot-card card-center">
              <div className="tarot-border">
                <span className="tarot-num">XIII</span>
                <span className="tarot-name">DEATH</span>
                <div className="tarot-emblem">💀</div>
              </div>
            </div>
            {/* Card 3: The Magician (I) */}
            <div className="tarot-card card-right">
              <div className="tarot-border">
                <span className="tarot-num">I</span>
                <span className="tarot-name">MAGICIAN</span>
                <div className="tarot-emblem">✨</div>
              </div>
            </div>
          </div>
        ) : (
          /* Social Link Arcana Bond Constellation */
          <div className="velvet-social-constellation">
            <svg width="440" height="360" viewBox="0 0 440 360" className="constellation-svg">
              <line x1="220" y1="60" x2="100" y2="180" stroke="#FFD700" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="220" y1="60" x2="340" y2="180" stroke="#FFD700" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="100" y1="180" x2="160" y2="300" stroke="#00D8FF" strokeWidth="2" />
              <line x1="340" y1="180" x2="280" y2="300" stroke="#00D8FF" strokeWidth="2" />
              <line x1="160" y1="300" x2="280" y2="300" stroke="#FFD700" strokeWidth="2" strokeDasharray="4 4" />

              {/* Arcana Nodes */}
              <g transform="translate(220, 60)">
                <circle r="26" fill="#0A0E5C" stroke="#FFD700" strokeWidth="3" />
                <text y="5" fill="#FFD700" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="'Almarai'">FOOL</text>
              </g>
              <g transform="translate(100, 180)">
                <circle r="24" fill="#0A0E5C" stroke="#00D8FF" strokeWidth="2" />
                <text y="5" fill="#00D8FF" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="'Almarai'">MAGI</text>
              </g>
              <g transform="translate(340, 180)">
                <circle r="24" fill="#0A0E5C" stroke="#00D8FF" strokeWidth="2" />
                <text y="5" fill="#00D8FF" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="'Almarai'">PRIEST</text>
              </g>
              <g transform="translate(160, 300)">
                <circle r="22" fill="#0A0E5C" stroke="#FFD700" strokeWidth="2" />
                <text y="5" fill="#FFD700" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="'Almarai'">EMPR</text>
              </g>
              <g transform="translate(280, 300)">
                <circle r="22" fill="#0A0E5C" stroke="#FFD700" strokeWidth="2" />
                <text y="5" fill="#FFD700" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="'Almarai'">LOVER</text>
              </g>
            </svg>
            <div className="constellation-badge">COMMUNITY BONDS ENCRYPTED</div>
          </div>
        )}
      </div>

      {/* Right Velvet Room Terminal Card */}
      <div className="p3r-terminal-card theme-velvet-card skill-fall-elem">
        <div className="velvet-card-header">
          <span>THE VELVET ROOM // COMPENDIUM</span>
        </div>
        <div className="terminal-card-body">
          <div className="terminal-meta-tag">
            <span className="meta-code" style={{ color: '#FFD700', background: 'rgba(255, 215, 0, 0.15)' }}>ARC_{title}</span>
            <span className="meta-status" style={{ background: '#4338CA' }}>FORGING</span>
          </div>
          <h2 className="terminal-heading" style={{ color: '#FFFFFF' }}>{title} ARCHIVE</h2>
          <p className="terminal-desc" style={{ color: '#C7D2FE' }}>
            The fusion algorithms for the <strong style={{ color: '#FFD700' }}>{title}</strong> compendium are being prepared by Igor and Elizabeth.
          </p>
          <div className="terminal-diag-table" style={{ borderColor: 'rgba(255, 215, 0, 0.25)' }}>
            <div className="diag-row">
              <span className="diag-key">FUSION CHAMBER</span>
              <span className="diag-val" style={{ color: '#FFD700' }}>COMPILING GRIMOIRE</span>
            </div>
            <div className="diag-row">
              <span className="diag-key">ARCANA LEVEL</span>
              <span className="diag-val" style={{ color: '#00D8FF' }}>RANK: MAX_PENDING</span>
            </div>
          </div>
          <div className="terminal-back-btn velvet-btn" onClick={onBack}>
            <span className="back-key" style={{ color: '#FFD700' }}>[ESC]</span>
            <span className="back-label">RETURN TO MENU</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN UNDER CONSTRUCTION CONTROLLER COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function UnderConstructionPage({ title = 'PAGE', onBack, isExiting }) {
  const handleBack = onBack || (() => {});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isExiting) return;
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        handleBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack, isExiting]);

  // Route each page to one of the three distinct P3R themes:
  // 1. Velvet Room Theme: PERSONA, SOCIAL LINK
  // 2. Dark Hour / Tartarus Theme: QUEST, CALENDAR, SYSTEM
  // 3. Minimalist P3R System Theme: ITEM, EQUIP, STATS (and default)
  const isVelvet = title === 'PERSONA' || title === 'SOCIAL LINK';
  const isDarkHour = title === 'QUEST' || title === 'CALENDAR' || title === 'SYSTEM';

  return (
    <div id="construction-page" className={`skill-page-container ${isExiting ? 'skill-exiting' : 'skill-entering'}`}>
      {isVelvet ? (
        <VelvetTheme title={title} onBack={handleBack} />
      ) : isDarkHour ? (
        <DarkHourTheme title={title} onBack={handleBack} />
      ) : (
        <SystemTheme title={title} onBack={handleBack} />
      )}
    </div>
  );
}
