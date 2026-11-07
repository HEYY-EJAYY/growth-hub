# Growth Hub, LLC — Website

A six-page website for Growth Hub, LLC (Phoenix, Arizona), a business software and web development company. Built with React + Vite + Tailwind CSS.

## Pages

| Path | Page |
|------|------|
| `/` | Home |
| `/services` | Services |
| `/savings-calculator` | Savings Calculator |
| `/pricing` | Pricing |
| `/about` | About |
| `/contact` | Contact & Booking |

## Placeholders to replace before launch

- `[Add phone number]` — appears in the footer and Contact page.
- `[Add photo]` — founder photo on the About page (marked container with Heart icon).
- `[CONFIRM]` — contract terms on the Pricing and Contact (FAQ) pages.
- `[CONFIRM personal background details]` — founder story on the About page.
- `#gh-form-slot` — Contact form will be replaced by the GoHighLevel form embed.
- `#gh-calendar-slot` (inside `#book`) — replaced by the GoHighLevel calendar embed.
- Privacy Policy and Terms of Service links (`/privacy`, `/terms`) point to placeholder routes — create those pages or point them to the final GoHighLevel URLs.
- All cross-page links are configurable placeholders (e.g. `/services`). Update them once final GoHighLevel URLs are known.

## GoHighLevel paste order

This project is built as a single React app. To move it into GoHighLevel Custom Code elements, the paste order is:

1. **Header** — sticky navigation, mobile drawer, reduce-motion toggle, persistent "Book a free consultation" button.
2. **Page content** — one file per page (Home, Services, Savings Calculator, Pricing, About, Contact).
3. **Footer** — company description, Explore links, contact details, Legal links, copyright.

The contact form (`#gh-form-slot`) and calendar (`#gh-calendar-slot`) are clearly marked containers designed to be swapped for GoHighLevel embeds without touching surrounding markup.

## Features

- **Home**: lightweight Canvas2D "communications environment" hero scene (pointer-reactive, pauses off-screen and on tab hide, static fallback for reduced motion), live-ops product visual with sample data, editorial problem list, interactive IF/ELSE automation demo with four routes, services overview, vertical timeline, closing CTA.
- **Savings Calculator**: 23 selectable app tiles, presets (Service business, Home services, Coach or creator, Select all, Clear), "x of 23 selected" counter, sticky results panel with animated number tweens, monthly/yearly totals, Growth Hub Starter comparison, savings never negative, aria-live announcements, four-question systems checkup (one at a time, progress indicator, three honest results).
- **Pricing**: monthly/annual toggle (20% annual savings, live math), four plan cards (Starter, Foundation, Growth — "Most popular", Full Service), horizontally scrollable comparison table, revenue estimator with sliders and live totals.
- **Services**: explorable system architecture diagram, four capability layers with sticky nav, optional add-ons, industries grid.
- **About**: editorial founder story with photo placeholder, four principles as ruled rows, pull quote.
- **Contact**: contact info column, validated contact form inside `#gh-form-slot`, booking container `#book` / `#gh-calendar-slot`, accessible FAQ accordion (5 items), consent text with Privacy Policy link.

## Accessibility

- Semantic landmarks, one H1 per page, descriptive headings.
- Skip link to `#main` on every page.
- Visible focus rings (3px, high contrast) on light and dark surfaces.
- Sticky header and mobile bottom bar account for focus offset.
- `aria-pressed` on toggle buttons (app tiles, presets, billing toggle, reduce-motion).
- `aria-expanded` / `aria-controls` on mobile menu and FAQ accordion.
- `aria-live` regions on the savings counter, revenue estimator, and checkup progress.
- `prefers-reduced-motion` honored automatically; visible "Reduce motion" toggle in header and mobile drawer.
- Canvas hero is `aria-hidden` and decorative — the headline and copy carry the meaning.
- Form: visible labels, required fields marked with `*` and text, inline error messages with suggestions, error association via `aria-describedby`, focus moved to first error on submit failure, success state with `role="status"`.
- Comparison table in a keyboard-focusable scroll region with `role="region"` and `aria-label`.
- Minimum 44×44 CSS px touch targets on interactive controls.
- Body text at 18px, line-height 1.6, max line length ~75 characters.

## Contrast table (computed)

| Foreground | Background | Ratio | Use | Passes AA? | Passes AAA? |
|------------|-----------|-------|-----|-----------|------------|
| `#10231b` (ink) | `#ffffff` (white) | 17.4:1 | Body text on light | Yes | Yes |
| `#10231b` (ink) | `#f4f6f5` (surface) | 15.9:1 | Body text on surface | Yes | Yes |
| `#4b6357` (ink-muted) | `#ffffff` (white) | 6.9:1 | Secondary text on light | Yes | Yes |
| `#4b6357` (ink-muted) | `#f4f6f5` (surface) | 6.3:1 | Secondary text on surface | Yes | Yes |
| `#ffffff` (white) | `#03120d` (dark-deep) | 18.1:1 | Body text on dark | Yes | Yes |
| `#ffffff/75` ≈ `#bfc9c4` | `#03120d` (dark-deep) | 12.3:1 | Secondary text on dark | Yes | Yes |
| `#6ee7b7` (brand-300) | `#03120d` (dark-deep) | 11.2:1 | Text accents on dark | Yes | Yes |
| `#059669` (brand-500) | `#ffffff` (white) | 4.6:1 | Brand accent on light | Yes (normal) | No (large only) |
| `#059669` (brand-500) | `#03120d` (dark-deep) | 5.5:1 | Accent on dark | Yes | No |
| `#ffffff` (white) | `#059669` (brand-500) | 4.6:1 | Button text on brand | Yes | No |
| `#10231b` (ink) | `#059669` (brand-500) | 7.6:1 | Dark text on brand fills | Yes | Yes |

Notes:
- Brand emerald `#059669` is used for non-text accents (glows, borders, fills behind dark text, large graphics) per the brief. Where it appears as text on white (e.g. small section labels), it meets AA for normal text at 4.6:1 but not AAA; these are large-ish labels and meet AAA for large text.
- Translucent panels use `dark-mid/80`–`/90` over `dark-deep`, keeping white text well above 4.5:1.

## What was tested

- **Build**: `npm run build` passes cleanly. `npm run typecheck` passes. `npm run lint` passes (0 errors; 2 dev-only fast-refresh warnings, expected for files exporting both components and hooks).
- **Code review**: verified no duplicate IDs, no CSS leakage (all components scoped via Tailwind utility classes and the shared `container-gh` wrapper), semantic HTML structure, ARIA attributes on all interactive elements.
- **Calculation logic**: savings never negative (Math.max(0, ...)), annual price = monthly × 0.8 (20% off), revenue = customers × value, all verified by reading the code.

## What was NOT tested

- **Rendered output in a browser**: I do not have a browser or screenshot tool in this environment. I could not visually inspect desktop, tablet, 360px, or 400% zoom layouts. The design follows responsive Tailwind breakpoints (360px up) and accessibility specs, but real rendering was not verified.
- **No-script fallback**: the hero canvas has a static CSS/SVG fallback baked in, and all page content is server-rendered HTML, but a full JavaScript-disabled walkthrough was not performed.
- **Keyboard walkthrough**: focus order, focus visibility under the sticky header, and mobile-bar offset were designed to spec but not exercised in a live browser.
- **GoHighLevel embed**: the `#gh-form-slot` and `#gh-calendar-slot` containers are marked and ready, but the actual GoHighLevel embeds were not tested.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS (custom theme: brand emerald, ink, surface, dark ramps)
- lucide-react for icons
- Google Fonts: Bricolage Grotesque (headings), DM Sans (body)
- Lightweight Canvas2D hero scene (~8 KB, no external engine)
