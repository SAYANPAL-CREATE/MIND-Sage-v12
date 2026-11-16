# Mind-sage — Editorial Website Release

Mind-sage is a browser-based student wellbeing and guided reflection platform. This release changes the entire public-facing website shell and homepage into a new, horizontal-navigation editorial layout, while keeping the established V9 questionnaires and feature modules.

## Included

- Five education-specific entry paths: primary school (guardian-led), high school, UG, PG and Ph.D.
- Four core assessment tracks with 10 questions each per student category, plus contextual follow-up
- Smart Check-in, Report Studio, personalized reports, progress tracking, guardian observations
- Bro-minD Plus, Mind Garden, Emotion Landscape, relaxation tools, journal and voice guidance
- Swamiji Vani (18 sourced selections), Watch & Learn videos and literacy resources
- Contact Us with original portraits and the supplied email/LinkedIn links
- English/Bengali interface, PWA manifest, service worker, offline asset caching

## Deployment on GitHub Pages

1. Extract the ZIP. The file `index.html` must be in the **repository root** together with `.css`, `.js`, `.webp`, `.png`, `.svg` and `.webmanifest` assets.
2. Create a separate GitHub repository (recommended while testing), e.g. `Mind-Sage-Editorial`, and upload all extracted files from the release folder, **not** the parent folder.
3. In GitHub Settings → Pages, select **Deploy from a branch**, branch `main`, directory `/(root)`.
4. Open the published address, including `#/home`. Confirm that all portrait images, navigation, assessment pages, and reports work after refreshing the page.
5. For a site previously deployed at the same URL, force-refresh (Ctrl+Shift+R). If the old service worker remains active, close all site tabs and clear stored site cache. Deleting local data can remove users' saved wellbeing entries, so take care not to delete it without their permission.

No external server, database, API key, Render deployment or build command is required for static features. Browser speech capabilities depend on browser/device support. A configured secure backend would be needed for a real cloud AI service, clinician accounts or central participant records.

## Privacy and continuity

The application is designed to keep directly identifying fields (such as names, DOB and guardian details) in the current tab rather than saving them with diary and research exports. PDFs include those details, so they should not be downloaded on shared devices without appropriate care.

To avoid unintentionally mixing locally saved records with earlier Mind-sage releases hosted on the same GitHub Pages origin, this edition uses **its own browser-storage keys**. Previous release data is not automatically imported. Do not imply a migration or discard old website/browser data without a deliberate plan.

## Assessment interpretation

The core assessment questions are custom reflection questions; response-frequency percentages should not be interpreted as a diagnosis, a probability of psychiatric illness or a medication recommendation. A clinician decides treatment. Children’s primary-school pathway is observation-based, answered by a guardian.

## Contents

- `index.html` loads all scripts and styles in order.
- `atelier.js` / `atelier.css` implement the new layout and editorial homepage.
- The assessment/scoring engine and existing feature modules stay in the other `.js` files.
- `sw.js` pre-caches static site assets, not responses or other personal information.
- `ASSESSMENT-METHODS.md` and `SOURCES.md` document the earlier assessment approach and reference materials.
- `DESIGN-AND-QA.md` summarizes design differences and tests performed.
