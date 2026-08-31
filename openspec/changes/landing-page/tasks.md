# Tasks: Lexjuridico Landing Page

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1600–2000 |
| 400-line budget risk | High |
| Delivery strategy | auto-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

Delivery by branch commits (no PR — Thalex pref). Each slice: commit + build. Repo not scaffolded (Slice A creates `src/`); config.yaml style already done.

### Work Units (test `pnpm build`; harness `pnpm dev`; rollback revert)

| Unit | Goal | Boundary |
|------|------|----------|
| A | Scaffold + tokens + links | new files |
| B | Layout SEO, Navbar, Hero | new files |
| C | Services/WhyUs/About/Process | new files |
| D | FAQ/Contact/CTA/Footer | new files || E | EmailJS form (last) | dep+.env only |
| F | Cleanup + favicon | restores files |

## Phase 1: Foundation (Slice A)

- [ ] A1 Scaffold Astro 7 + Tailwind 4 (pnpm); build green.
- [ ] A2 `astro.config.mjs`: fontsource Geist; `site` omitted (DATA_PENDING).
- [ ] A3 `global.css`: 6 `@theme` tokens, `--font-sans`, `.reveal`, dorado ring, reduced-motion, scrollbar-hide.
- [ ] A4 `links.ts`: `WHATSAPP_NUMBER`, `waLink(msg)`.
- [ ] A5 Commit A; build.

## Phase 2: Shell + Early Sections (Slice B)

- [ ] B1 Threat Matrix N/A — no RED tests.
- [ ] B2 `Layout.astro`: `lang=es`, `<Font/>`, meta/OG/canonical, JSON-LD `LegalService`+`FAQPage` (DATA_PENDING).
- [ ] B3 `Reveal.astro` (IO, once, reduced-motion; fallback visible).
- [ ] B4 `index.astro` assembly grows per slice (D9).
- [ ] B5 `Navbar.astro`: anchors, mobile menu (aria, Escape, close→burger focus), WhatsApp visible.
- [ ] B6 `Hero.astro`: carbon, marfil text, gold CTA, secondary link, tilt.
- [ ] B7 Commit B; build.

## Phase 3: Mid Sections (Slice C)

- [ ] C1 `Services.astro`: 3 cards + `DATA_PENDING` extras slot; "Solicitar asesoría"; carousel.
- [ ] C2 `WhyUs.astro`: 4 trust items.
- [ ] C3 `About.astro`: paragraph + `DATA_PENDING` photos; "Hablar con un abogado".
- [ ] C4 `Process.astro`: 01/02/03 steps.
- [ ] C5 Commit C; build.

## Phase 4: FAQ/Contact/CTA/Footer (Slice D)

- [ ] D1 `FAQ.astro`: 5 Qs verbatim, aria accordion (single-open, Enter/Space, reduced-motion); `DATA_PENDING`.
- [ ] D2 `Contact.astro`: NAP, "Enviar mensaje", phone, DATA_PENDING email/address, Maps.
- [ ] D3 `CTA.astro`: "Solicitar asesoría".
- [ ] D4 `Footer.astro`: name, Aviso/Términos (DATA_PENDING), contact, year.
- [ ] D5 Commit D; build.

## Phase 5: EmailJS Form, Isolated Last (Slice E)

- [ ] E1 Add `@emailjs/browser` (only new dep).
- [ ] E2 `ContactForm.astro`: Spanish validation; `init`+`sendForm`; `PUBLIC_EMAILJS_*` guard; missing keys → Spanish error + WhatsApp fallback, no false success; success resets.
- [ ] E3 `.env.example`: `PUBLIC_EMAILJS_*`.
- [ ] E4 Wire into Contact; commit E; build w/ & w/o keys.

## Phase 6: Cleanup + Favicon (Slice F)

- [ ] F1 Delete `Welcome.astro`, astro.svg, background.svg, favicon.
- [ ] F2 Add brand `public/favicon*`; polish.
- [ ] F3 Commit F; build; no starter residue; only 6 hex in `@theme`.

## Data Drop (swap-in, no structural change)

- [ ] Swap each `DATA_PENDING` field (email, address, site, areas, photos, legal texts).