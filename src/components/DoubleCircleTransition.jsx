import React, { useEffect } from 'react';

/**
 * DoubleCircleTransition: Authentic Persona 3 Reload return transition
 * GPU Compositor Accelerated (100% 60fps/120fps smooth)
 * Two circular apertures at bottom-left and top-right scale up via CSS transform: scale()
 * on the GPU compositor thread without triggering CPU re-rasterization.
 */
export default function DoubleCircleTransition({ children, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="double-circle-transition-wrapper">
      {/* Circle 1: Bottom-Left (Makoto portrait at 240px, 920px) */}
      <div className="gpu-circle-portal portal-bottom-left">
        <div className="portal-content-align offset-bottom-left">
          {children}
        </div>
      </div>

      {/* Circle 2: Top-Right (Ocean water at 1450px, 180px) */}
      <div className="gpu-circle-portal portal-top-right">
        <div className="portal-content-align offset-top-right">
          {children}
        </div>
      </div>
    </div>
  );
}
