# Design: Lexjuridico Landing Page

## Technical Approach

Static Astro 7 page: `src/pages/index.astro` assembles 12 section components + shared `Reveal.astro` primitive + `Layout.astro` SEO shell + `global.css` token layer. Zero framework integrations; all interactivity (mobile menu, Reveal, FAQ accordion, EmailJS form) via vanilla module `<script>` colocated per component — Astro bundles each once per page. Tailwind 4 `@theme` exposes the 6 brand tokens only; no ad-hoc hex. Geist self-hosted via Astro fonts API. WhatsApp-first CTAs as `https://wa.me/527772402439?text=…` deep links with Spanish prefill. Primitives ported from `thalex-sytems-landing` (`Reveal.astro` IO, CSS tilt hero, `ContactForm` EmailJS runtime-guard, SEO shell). Delivery: chained slices, each `pnpm build`-verified.

## Architecture Decisions

| # | Decision | Options | Tradeoff | Choice |
|---|----------|---------|----------|--------|
| D1 | Component model | islands vs plain Astro | Islands add runtime dep + framework | Plain Astro + vanilla scripts; only new dep is `@emailjs/browser` (spec) |
| D2 | Reveal primitive | framer-motion vs `Reveal.astro` IO | motion not portable / IO ~20 LOC, no deps | Port Thalex `Reveal.astro`: IO, `once:true`, `prefers-reduced-motion` |
| D3 | Hero tilt | WebGL lib vs CSS transform | WebGL = dep; CSS cheap/static | Port CSS `perspective` + `rotateX/rotateY`, section `overflow-hidden` (spec Hero) |
| D4 | Color palette | ad-hoc hex vs `@theme` tokens | hex sprinkles break brand rule | `@theme`: `--color-carbon #1C1C1C`, `--color-gold #B8953E`, `--color-beige #E8DDC8`, `--color-ivory #F7F4ED`, `--color-stone #6B6B6B`, `--color-white #FFFFFF` (spec Brand) |
| D5 | Typography | Google CDN vs fontsource | CDN = runtime dep; fontsource self-hosts | `fontProviders.fontsource()`, Geist variable, `--font-geist` → `--font-sans` (port D7) |
| D6 | Form delivery | mailto: vs EmailJS | EmailJS client-side, key public by design | `@emailjs/browser`; `init` once + `sendForm`; `PUBLIC_*` runtime-guarded so build never fails (spec Contact) |
| D7 | FAQ accordion | `<details>` vs buttons+aria | details less a11y-control; buttons io aria-expanded | Vanilla JS: `button[aria-expanded]` toggling panel, single-open per group, reduced-motion respected |
| D8 | WhatsApp CTAs | static anchor per block vs shared data | shared data = one source for wa.me link | `WHATSAPP_URL` const in `src/lib/links.ts`, each block passes `msg` prefill; per-block CTA rule (spec) |
| D9 | Assembly timing | all sections one slice vs incremental | `astro build` only compiles imported sections — orphans unverifiable | `index.astro` grows per slice importing each new section (port Thalex D8 for verifiability) |
| D10 | Starter cleanup | delete first vs after sections | early delete breaks scaffold; late = single rollback | Delete `Welcome.astro`/starter assets/favicon in final slice (per proposal rollback rationale) |

## Data Flow

    index.astro ──Layout (lang=es, SEO head, JSON-LD, <Font/>, global.css)
      ├─ Navbar      script: mobile menu toggle (aria-expanded, Escape, focus)
      ├─ Hero        static CSS tilt; no script
      ├─ Services    data array (3 area cards) → render
      ├─ WhyUs       static 4 trust items
      ├─ About       static copy + NAP
      ├─ Process     static 3 steps (01→02→03)
      ├─ FAQ         script: accordion toggle
      ├─ Contact     Google Maps iframe + NAP; embeds ContactForm
      ├─ CTA / Footer  static; WhatsApp deep-links via links.ts
      └─ ContactForm script: submit → native validation → init once →
                       sendForm(serviceId, templateId, form) → status
                       (sending/success/error); env import.meta.env.PUBLIC_EMAILJS_*

No cross-component state; each script self-contained.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `astro.config.mjs` | Create | `fonts` (fontsource Geist), `site` (canonical/OG; domain TBD) |
| `src/styles/global.css` | Create | 6 `@theme` tokens, `--font-sans`, `.reveal`, reduced-motion, focus ring, scrollbar-hide |
| `src/lib/links.ts` | Create | `WHATSAPP_URL` + `waLink(msg)` helper for prefill |
| `src/layouts/Layout.astro` | Create | `lang=es`, `<Font/>`, props `title`/`description`, OG, canonical, JSON-LD LocalBusiness/Attorney, theme-color |
| `src/pages/index.astro` | Create | Assembly, grows per slice (D9) |
| `src/components/Reveal.astro` | Create | IO primitive (port) |
| `Navbar, Hero, Services, WhyUs, About, Process, FAQ, Contact, CTA, Footer, ContactForm.astro` | Create | 11 section/primitive components |
| `package.json` + lockfile | Create/Modify | `@emailjs/browser` (only new dep) |
| `.env.example` | Create | `PUBLIC_EMAILJS_*` + dashboard note |
| `public/favicon*`, starter assets, `src/components/Welcome.astro` | Delete | final slice (D10) |

## Interfaces / Contracts

```ts
// src/lib/links.ts
export const WHATSAPP_NUMBER = "527772402439";
export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// Reveal.astro props
{ as?: "div" | "section" | "li" | "h2"; delayMs?: number; children }
```

**FAQ accordion**: `button[aria-expanded=false]` + `aria-controls`, hidden panel; click toggles, closes siblings (single-open), Escape focus mgmt, reduced-motion → no scroll animation.

**ContactForm env contract**: keys statically inlined by Vite; guard `typeof x !== "undefined" && x !== ""` → `configured` flag; missing keys ⇒ error state on submit, build passes. `module-level let initialized` for `emailjs.init`. Success resets form + Spanish confirmation; failure keeps data + Spanish error.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | Every slice compiles, incl. without `PUBLIC_EMAILJS_*` | `pnpm build` (only gate; no runner) |
| Manual | Reveal reduced-motion, FAQ a11y (aria/keys/single-open), mobile menu (Escape/focus), form states incl. missing-keys, WhatsApp links open `wa.me` with prefill | Dev-server smoke per slice |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. (EmailJS is client-side HTTP to a third party; failure covered by form error state.)

## Migration / Rollout

No migration. Per-slice `git revert` rollback (chained feature branches); EmailJS form isolated last so reverting removes dep + `.env.example` without touching sections. Deletions confined to final slice.

## Open Questions

- [ ] Canonical URL / `site` value (domain TBD) — omit until confirmed
- [ ] Fallback contact email in form error copy
- [ ] Publishable address + Google Maps embed point (`DATA_PENDING` placeholder OK)
- [ ] Confirm practice-area cards beyond Derecho Civil/Mercantil/Demandas
