# Changelog

All notable changes made to the **ANTARA** portfolio during this session:

## [1.2.0] - 2026-06-12

### Added
- **Multi-lingual Localization (Sanskrit, English, Japanese)**: Implemented localization support across the entire portfolio site.
  - Added a language selector in `src/components/Navbar.jsx` with three square buttons (`अ` [Sanskrit], `a` [English], `ア` [Japanese]) placed in order next to the theme switch.
  - Established a custom `LanguageProvider` React context in `src/context/LanguageContext.jsx` and wrapped the main application in `src/main.jsx`.
  - Created a comprehensive translations dictionary in `src/data/translations.js` containing Sanskrit (`sa`), English (`en`), and Japanese (`ja`) entries.
  - Localized the **Hero**, **About**, **Projects**, **Skills**, and **Contact** sections, dynamically resolving all text strings, tags, and descriptors depending on the selected language.
  - Updated the project data in `src/data/projects.js` to store descriptions and tags as objects for each language, enabling live translations on selected work cards.

## [1.1.0] - 2026-06-12

### Added
- **Interactive Browser Mockups**: Upgraded the selected work cards in `src/components/ProjectCard.jsx` to render live website previews inside highly-customized **Browser Mockup Frames** configured at a standard **16:9 aspect ratio**. Scaled the internal `<iframe>` viewport by **250%** (using CSS transforms at `scale(0.4)`) to display full high-resolution desktop versions of the website layouts. Dispatches a `postMessage` (`type: 'dismiss-popup'`) and appends `?iframe=true` to dynamically dismiss any popup modals in embedded sites. Added `pointer-events: none` to protect horizontal scroll performance.
- **Descriptive Project Captions**: Updated titles and descriptions in `src/data/projects.js` to match custom specifications and co-founder roles:
  - **FutureU** (privacy-focused MHT-CET college predictor with seat matrices and cutoff trends)
  - **unimark** (lowercased; combined school management and learning system with high-performance attendance database)
  - **Hanasaku (花咲く)** (newly added; pink-themed real-time menstrual health tracker with strict PostgreSQL policies; noted as currently in development/demo phase)
  - **MGC Cosmetics** (premium optimized storefront)
  - **Green Life** (eco-centric micro-interactions platform)
- **Golden Sanskrit Favicon**: Created a new custom vector SVG (`public/favicon.svg`) rendering the Sanskrit letter "अ" filled with a rich golden gradient (`#FCE082` -> `#E8A020` -> `#9E6B0F`), replacing the dark inline data-URI Om symbol in `index.html`.
- **Mandala Visibility Refinement**: Increased the opacity of the `SanskriticDivider` mandalas across the site—especially the central rotating yantra in the Bento grid of the **Tools & Craft** section—making them slightly more visible and prominent.

### Fixed
- **Loader Replay & Lag**: 
  - Restructured `src/App.jsx` to completely unmount `<Loader>` when the loading sequence concludes (`loading === false`).
  - Implemented stable ref-capturing for `onComplete` in `src/components/Loader.jsx` and locked timeouts into a one-time mount hook (`useEffect` with empty dependencies `[]`). This prevents any parent re-renders (like scrolling triggers) from resetting the loader timeline.
  - Removed unoptimized `willChange: 'stroke-dashoffset'` styles from SVG paths to prevent layer creation overhead in Blink-based browsers.
- **Loader Animation Flow**: Refined stagger delays and transitions in the Sri Yantra SVG to ensure the drawing finishes completely by 1.9 seconds, followed by a full breathing scale pulse (up to 1.03 and back to 1.0) before sliding up and unmounting.
- **Hero Section Light Mode**: 
  - Parameterized the WebGL background canvas in `src/sections/Hero.jsx` using shader uniforms (`uBaseColor`, `uNoiseColor`, `uIsLight`) and a `MutationObserver` on `document.documentElement` to respond instantly to light/dark mode switches.
  - Recalibrated the light mode shader logic to vary noise colors around the base cream background `#F5F0E8`, ensuring the Hero section aligns with the rest of the site and resolving the dark section seam.
- **WebGL Golden Blob Bug**: Removed the wobbly, high-contrast golden canvas blobs by setting `alpha: false` on the Three.js renderer and rendering solid colors. This resolved a buffer accumulation bug where transparent canvas frames built up to full opacity.

### Git Housekeeping
- Merged and aligned the local and remote `main` branch to match the `prototype` branch release state.
- Cleaned up local and remote `prototype` and `prototype-2` branches.
