# Mind-sage — Appearance & Contrast Update

This update preserves the editorial layout, existing fonts and colour identity, photographs, quotations, assessment questions and scoring. It focuses on legible text and selectable display modes.

## What changed

- Fixed the Swamiji Vani hero's heading colour, previously dark green over a dark portrait background. White headings, quotation text and source links now contrast against the green overlay in both appearances.
- Added **Dark mode / Light mode** controls in the desktop header and mobile navigation drawer. The selected appearance is retained using the browser's `localStorage` key `mindsage-ui-appearance`, which contains only `dark` or `light`.
- Added a separate dark palette for navigation, panels, reports, forms, buttons, inputs, modal-style menus and the contact page. The original forest-green and cream visual identity remains recognisable in both themes.
- Improved the light/dark contrast of small labels and the photographic Bro-minD action button.
- Switching appearances **does not reload the page or reset form and assessment answers**.
- Updated the offline service-worker asset cache so published visitors receive the new stylesheet.

## Use and testing

Use the **Dark mode** button at the top of the website to switch to dark mode. The same action is available in the mobile menu. Select **Light mode** to return to the original light palette. The preference remains on that device/browser profile; users can override it at any time.

The release was tested using an isolated Chromium browser rendering. The Vani page, homepage, report entry, Contact Us, Bro-minD and mobile navigation were checked in both appearances. Live verification on your GitHub Pages URL is still recommended, particularly for installed offline PWAs and device-specific fonts.

## Privacy

Appearance preference is not part of a wellbeing assessment and carries no identifying information. No new server, network endpoint or data collection has been introduced.
