# Mind-sage Editorial Design and QA

## Intentional visual changes

This is **not** the previous sidebar/dashboard skin with a different colour. The updated structure uses:

- Horizontal sticky navigation and an accessible Explore mega-menu on desktop
- A separate right-side full-height mobile navigation drawer
- Large editorial type, restrained green-and-cream design, stronger whitespace
- A wide photographic feature (using the approved V9 student imagery) rather than a split hero
- A five-column / responsive two-column educational-stage selector with numbered entries
- Asymmetrical editorial feature storytelling and a streamlined tool directory
- Updated common interior card/field/button/border styling across existing modules
- An expanded footer linking to assessment, support, privacy, Vani and contact resources

Retained: existing fonts (DM Sans, Manrope, Noto Sans Bengali), V9 photos and personal details/report modules, supportive portraits, all 18 quotations, videos, questionnaires and navigation destinations. No model-based diagnostic claims or live backend features were added.

## Actual local checks

The environment blocked normal HTTP browser navigation, so the entire site was rendered for browser testing as a self-contained HTML document with its CSS, JS and image files embedded. This checks the rendered UI and JavaScript event handlers but does not certify a live hosted deployment.

- Chromium rendered the homepage and routes including Contact, Vani, videos, Bro-minD, Smart Check-in, Report Studio, Progress and Guardian Observations without page-level JavaScript errors.
- Desktop (1440 px) and mobile (390 px and 320 px) had no horizontal document overflow in tested pages.
- Mobile navigation opened and closed correctly, with a backdrop and working links.
- Verified five education stage buttons and the correct English tool labels.
- Completed adult UG personal-details intake, all 11 steps in an assessment flow and A4 PDF download.
- Confirmed primary-school form blocked submission without guardian confirmation and proceeded with consent.
- Checked all referenced JavaScript/CSS/image files and syntax-checked all scripts.
- New service worker cache is versioned to avoid stale bundled assets.

The published GitHub Pages URL, offline installation and device-dependent speech features still require live testing after deployment. Any broader clinical/research use requires independent validation and appropriate safeguarding.
