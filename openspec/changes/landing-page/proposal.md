# Proposal: Lexjuridico Landing Page

## Intent

Build the first real deliverable of a greenfield repo: a Spanish-only, professional single-page site for the law firm "Lexjuridico Pineda & Asociados" to become known and capture clients via Google searches, social media, and local maps presence. Today nothing exists. The page must convert visitors to WhatsApp contact ("darse a conocer y captar nuevos clientes").

## Scope

### In Scope
- Full landing, **10 blocks in order**: Header/nav (Inicio|Servicios|Nosotros|Contacto + "Contactar por WhatsApp"; mobile burger + visible WhatsApp) → Hero (dark #1C1C1C, marfil text, gold CTA) → Servicios/Áreas jurídicas (3 cards: Derecho Civil, Derecho Mercantil, Demandas) → ¿Por qué elegirnos? (4 trust items) → Sobre nosotros → Proceso (01 Contáctanos→02 Evaluamos→03 Asesoría) → FAQ (5 Qs, SEO) → Contacto (WhatsApp, tel, correo, dirección + Google Maps embed + "Cómo llegar") → CTA final → Footer (+ Aviso de privacidad | Términos).
- Design tokens from the brand contract: Gris carbón #1C1C1C, Dorado #B8953E, Beige #E8DDC8, Marfil #F7F4ED, Gris medio #6B6B6B, Blanco #FFFFFF — via `@theme`, no ad-hoc hex.
- **WhatsApp-first CTA rule** (WhatsApp is primary CTA page-wide: hero "Contactar por WhatsApp", servicios "Solicitar asesoría", after nosotros "Hablar con un abogado", contacto "Enviar mensaje", CTA final "Solicitar asesoría").
- SEO: meta/OG/canonical, JSON-LD LocalBusiness/Attorney, semantic headings, FAQ schema; linked Google Maps + consistent NAP for local SEO.
- Reuse proven primitives from thalex-sytems-landing: `Reveal.astro` (IO), CSS tilt hero, scroll-snap carousel, `ContactForm` (EmailJS), SEO shell in `Layout.astro`.
- Starter cleanup (Welcome.astro, starter assets, favicon).

### Out of Scope
- i18n / language toggle (Spanish only).
- CMS/blog, backend, real lawyer photos if unavailable (placeholders swappable).
- OG raster now (deferred).
- Any framework or new runtime dependency beyond `@emailjs/browser`; `@lucide/astro` for icons.

## Capabilities

### New Capabilities
- `landing-page`: greenfield capability covering layout/SEO shell, brand tokens + typography, all 10 sections with Spanish copy, interactions (mobile menu, carousel, reveal, FAQ accordion), WhatsApp deep-links, EmailJS contact form, and starter cleanup. Spec may group by section.

### Modified Capabilities
None — `openspec/specs/` is empty (greenfield).

## Approach

~12 small Astro components assembled in `src/pages/index.astro`; all interactions via vanilla `<script>` (menu toggle, carousel `scrollBy`, IO Reveal, FAQ accordion) — no islands. WhatsApp CTAs as `https://wa.me/527772402439?...` deep links. Contact form via `@emailjs/browser`: `emailjs.init({publicKey})` once + `emailjs.sendForm(...)`; `PUBLIC_EMAILJS_*` read at runtime so build never fails without keys. Geist font via Astro built-in fonts API (fontsource). Verification gate: `pnpm build` (no test runner).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/index.astro` | New | Assembles all 10 sections |
| `src/layouts/Layout.astro` | New | `lang=es`, SEO head, JSON-LD, font |
| `src/styles/global.css` | New | 6 brand tokens + font binding |
| `src/components/*` | New | Navbar, Hero, Services, WhyUs, About, Process, FAQ, Contact, CTA, Footer, Reveal, ContactForm |
| `package.json` | New | `@emailjs/browser` (only new dep) |
| `.env.example` | New | `PUBLIC_EMAILJS_*` keys |
| `public/` | New | favicon, og image (deferred) |
| `astro.config.mjs` | New | fonts option |
| `openspec/config.yaml` | Modified | UI copy: Spanish (done) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Missing confirmed data: email, address, "Cómo llegar", photos | High | Marked placeholders `DATA_PENDING`; swappable; spec requires only confirmed fields have real values |
| EmailJS keys missing at build/deploy | Med | Runtime-read `PUBLIC_EMAILJS_*`; form shows error, build never fails |
| Phone format for WhatsApp (country code) | Med | Use intl format `+52 777 240 2439` for `wa.me`; confirm country (+52) |
| >400/800-line delivery | Med | Chained slices, `auto-chain`; each slice `pnpm build` |
| Legal-area list beyond the 3 named | Med | Cards as contract; marketing confirms more areas before copy |

## Rollback Plan

Per-slice `git revert` of the slice commit (each slice `pnpm build`-verified). Slice order keeps EmailJS form isolated last: reverting it removes dep + `.env.example` without touching sections. Early slices add only new files, so rollback is clean. Config.yaml edits adive/additive.

## Dependencies

- `@emailjs/browser` (runtime; client-side sendForm; dashboard config).
- Geist via Astro fonts API (network at build, self-hosted output).
- `@lucide/astro` icons. Primitives reused from thalex-sytems-landing.
- Client to confirm: email, full address (publishable), country code/WhatsApp number, any extra practice areas, lawyer photos.

## Success Criteria

- [ ] `pnpm build` passes after every slice, including without `PUBLIC_EMAILJS_*`.
- [ ] All 10 blocks render in order; WhatsApp-first CTA present per page CTA rule.
- [ ] `lang="es"`, all copy neutral Spanish, no English UI strings; SEO head + JSON-LD present.
- [ ] 6 brand colors only via `@theme` tokens, no ad-hoc hex.
- [ ] `@emailjs/browser` is the only new runtime dependency.
- [ ] Reveal/carousel/menu/FAQ work without frameworks; reduced-motion respected.

## Proposal question round

Assumptions for client review: phone country code +52 (Mexico) for `wa.me`; publishable full address + Google Maps embed point; business email; a definitive list of practice areas beyond Derecho Civil/Mercantil/Demandas; whether lawyer photos exist; legal disclaimer text for Aviso de privacidad/Términos. Correct the above before spec if any assumption is wrong.
