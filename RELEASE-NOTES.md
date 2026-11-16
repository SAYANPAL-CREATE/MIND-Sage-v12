# Mind-sage — Legible Text and Dark Mode

This package contains the full Mind-sage editorial website, including all working student/guardian pathways, assessment banks, personalized PDF reporting, Bro-minD, 18 Swamiji Vani quotations, Watch & Learn, and contact details. No assessment score or personal-data collection behaviour has been changed.

## Visual updates

- Fixed previously low-contrast headings on dark photographic panels, especially the Swamiji Vani heading.
- Added a persistent Light / Dark appearance control to the desktop header and mobile drawer.
- Styled the dark appearance across pages, forms, report studio, video library, Vani, and contact cards.
- Improved colour contrast of personal-details form headings, field labels, source links, and the photographic Bro-minD call-to-action.
- Kept existing forest-green/cream visual identity and all original photos, fonts, layout and quotations.

## How to deploy

Extract every file to your GitHub Pages repository root. The ZIP has the files at its top level; do not upload the ZIP alone or its parent folder. Commit all changed files, particularly `index.html`, `atelier.js`, `theme.css`, and `sw.js`.

When the site updates, hard-refresh (`Ctrl+Shift+R`). An installed PWA may continue to show cached styling until its service worker updates. Do not clear site storage unnecessarily, because that can remove users' saved wellbeing entries. Test in a separate repository before replacing the active website.

## Scope and tests

An isolated Chromium test verified navigation of the homepage, Vani, assessments entry, Report Studio, Contact Us, Bro-minD and videos in both modes, plus mobile drawer, absence of mobile horizontal overflow in tested screens, and persistence of a typed name across mode switches. The dark theme is an interface preference only, stored locally as a `dark`/`light` setting.

The published GitHub Pages deployment should still be checked after upload, especially on browsers with different fonts and operating system accessibility settings.
