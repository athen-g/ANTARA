# Changelog

All notable changes made to the **ANTARA** portfolio during this session:

## [1.4.0] - 2026-06-13

### Added
- **Global Smooth Scroll Engine Fix**: Exposed the `lenisInstance` as `window.__lenis` in `useLenis.js`. This resolves a scrolling fallback bug where navbar smooth scroll offsets failed to target the active scroll engine.
- **Drawer Scroll Locking**: Configured the mobile navigation overlay in `Navbar.jsx` to lock the body scroll position and pause Lenis events when the menu is open, restoring scroll state on navigation.
- **Header Specificity Override Fix**: Removed inline `display: flex` declarations that clashed with Tailwind's responsive classes (`hidden`, `md:flex`, `md:hidden`), correcting layout rendering on mobile headers.
- **Dynamic Spacing Rhythm**: Tuned container paddings using CSS clamp values to dynamically adapt layout margins across mobile, tablet, and desktop screens.

### Fixed
- **Mobile Text & Email Overflow**: Reduced minimum font-size bounds inside `Hero.jsx` (`nameSize`) and `Contact.jsx` (email links) to avoid text overflows on narrow (320px) screens.
- **Hero Name & Role Box Scaling**: Refined English name size clamp bounds and redesigned the role cycling container in `Hero.jsx` to use dynamic clamp dimensions, preventing visual overflow and character clipping on small mobile viewports.
- **Torii Pathway Breakpoint Match**: Adjusted layout direction queries in `Process.jsx` to match vertical/horizontal dotted lines, resolving alignment mismatches on tablet screens.
- **Contact Form Columns Stacking**: Converted the grid layout in `Contact.jsx` to stack vertically below 1024px, matching bento grid guidelines and improving readability of contact inputs.
- **Projects Tablet Spacing**: Lowered the breakpoint threshold for the projects stacked layout in `Projects.jsx` to `< 1024px`. This disables horizontal scrubbing/scrolling for tablet touch viewports, presenting stacked cards instead.
- **GSAP Desktop clean-up crash**: Fixed a TypeError crash on desktop viewports by calling `scrollTween.revert()` directly instead of accessing the nonexistent `.revert()` method on the `scrollTrigger` instance.
- **Responsive Project Cards**: Configured `ProjectCard.jsx` to accept `isStacked`, dynamically scaling width (`100%`) and reducing internal card padding on smaller viewports.
- **Skills Bento Adaptability**: Set bento grid structures in `Skills.jsx` to stack on tablet resolutions, hiding the decorative rotating yantra to save screen space.
- **Process Pathway Columns**: Swapped dotted process lines in `Process.jsx` to stack vertically under 1024px, and updated step cards layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) to prevent squashing descriptions.

## [1.3.0] - 2026-06-12

### Added
- **Marathi Translation Support**: Replaced Sanskrit (`sa`) language support with Marathi (`mr`) translations.
- **Dynamic Name Translation**: Localized the co-founder name on the Hero section to render "Atharva Ghule" (English), "अथर्व घुले" (Marathi), and "アタルヴァ グーレ" (Japanese) depending on the selected language.
- **Visual Overlap & Layout Fixes**: 
  - Adjusted Devanagari and Katakana name line-height, letter-spacing, and font-size dynamically to avoid clipping/overlapping on all screens.
  - Animate Devanagari/Katakana names as single blocks to preserve Unicode conjunct structures and ensure correct rendering on language swap.
  - Locked tags on work cards to remain in English only.
- **Dynamic Cross-Cultural Design Swapping**:
  - **Japanese Mode (`ja`)**: Automatically shifts Japanese watermarks (`創`, `間`, `匠`, `縁`), Torii gate pathways, and Kanji steps to Sanskrit counterparts (Devanagari watermarks `सृ`, `म`, `शिल्प`, `योग`, temple archways, and Sanskrit root characters `दृ`, `रच`, `सिध`, `मुक`).
  - **Marathi Mode (`mr`)**: Automatically shifts Sanskrit/Devanagari watermarks and dividers (`ॐ` icons, lotus circles, rotating yantra mandalas, Sanskrit quote) to Japanese Zen counterparts (Katakana/Kanji background particles, `禅` / `和` icons, Japanese Kamon flower watermarks, and translation quote `創造 · 技巧 · 調和`).

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
