# Landing Page Specification

## Purpose

Greenfield Spanish-only single-page site for "Lexjuridico Pineda & Asociados": it introduces the firm and converts visitors to WhatsApp contact. Static Astro 7 site with vanilla scripts only (no frameworks); verification gate is `pnpm build` (no test runner). Unconfirmed client data is marked `DATA_PENDING` and must remain swappable without structural change.

## Requirements

### Requirement: Page Structure — 10 Blocks In Order

The system MUST render ten blocks in the exact order: Header, Hero, Servicios (Áreas jurídicas), ¿Por qué elegirnos?, Sobre nosotros, Proceso, FAQ, Contacto, CTA final, Footer.

#### Scenario: Landing renders all blocks in order

- GIVEN the site is built and served
- WHEN a visitor loads the root URL
- THEN all ten blocks render in the order above
- AND each block is reachable via in-page anchors (Inicio / Servicios / Nosotros / Contacto)

#### Scenario: Content visible without JavaScript

- GIVEN JavaScript is disabled or fails to load
- WHEN the visitor loads the root URL
- THEN all ten blocks and their content remain visible
- AND no content is permanently hidden by an interaction script

### Requirement: Spanish-Only UI Copy and DATA_PENDING Policy

All UI copy MUST be neutral/professional Spanish and the document MUST set `lang="es"`; the page MUST NOT display English UI strings (visible text, labels, or `aria-label`s). Unconfirmed client data MUST be marked with the literal `DATA_PENDING` marker and MUST render as a clearly-marked placeholder so the page builds before confirmation. Confirmed data: firm name "Lexjuridico Pineda & Asociados"; phone +52 777 240 2439 (+52 assumption to be confirmed).

#### Scenario: All visible copy is Spanish

- GIVEN the rendered page
- WHEN inspecting all visible text and `aria-label` attributes
- THEN no English UI strings are present
- AND `lang="es"` is set on the document

#### Scenario: Pending data renders as placeholder

- GIVEN email, address, photos, or extra practice areas are unconfirmed
- WHEN the page renders
- THEN each pending field shows a `DATA_PENDING`-marked placeholder
- AND replacing the placeholder with confirmed content requires no structural change

### Requirement: Section Copy

The system MUST render the following Spanish copy under each block heading.

| Block | Copy (ES) |
|---|---|
| Header | Nav: Inicio · Servicios · Nosotros · Contacto; CTA "Contactar por WhatsApp"; móvil: burger + botón WhatsApp visible |
| Hero | H1 "Defendemos tus derechos con experiencia y compromiso"; sub "Asesoría jurídica profesional y cercana para personas y empresas"; CTA dorado "Contactar por WhatsApp"; enlace secundario "Conoce nuestros servicios" → #servicios |
| Servicios | Título "Áreas jurídicas"; 3 tarjetas: "Derecho Civil" ("Contratos, sucesiones, propiedad y asuntos familiares"), "Derecho Mercantil" ("Sociedades, contratos comerciales y cumplimiento legal para empresas"), "Demandas" ("Representación legal en demandas civiles y mercantiles"); cada tarjeta "Solicitar asesoría"; `DATA_PENDING` slot para áreas adicionales |
| ¿Por qué elegirnos? | Título "¿Por qué elegirnos?"; 4 items: "Experiencia jurídica" · "Atención cercana" · "Confidencialidad" · "Compromiso con resultados", cada uno con una línea breve |
| Sobre nosotros | Título "Sobre nosotros"; párrafo institucional ("En Lexjuridico Pineda & Asociados acompañamos a personas y empresas con una visión cercana y profesional del derecho…"); `DATA_PENDING` fotos y semblanza |
| Proceso | Título "Nuestro proceso"; pasos: 01 "Contáctanos" · 02 "Evaluamos" · 03 "Asesoría", cada uno con una línea breve |
| Contacto | Título "Contacto"; CTA WhatsApp "Enviar mensaje"; teléfono "+52 777 240 2439"; correo `DATA_PENDING`; dirección `DATA_PENDING` + Google Maps incrustado + enlace "Cómo llegar"; formulario: Nombre, Correo electrónico, Teléfono, Mensaje, botón "Enviar consulta" |
| CTA final | Título "¿Necesitas asesoría legal?"; sub "Cuéntanos tu caso y recibirás una respuesta rápida."; CTA "Solicitar asesoría" |
| Footer | Nombre del despacho; enlaces "Aviso de privacidad" y "Términos" (`DATA_PENDING` textos legales); contacto resumido; año |

#### Scenario: Copy renders verbatim

- GIVEN the built page
- WHEN inspecting each block
- THEN each heading, body line, label, and CTA matches the table above

### Requirement: FAQ Content (5 Questions)

The system MUST render five FAQ items in order with the following Q&A: (1) "¿Qué tipos de asuntos atienden?" → "Atendemos Derecho Civil, Derecho Mercantil y Demandas. `DATA_PENDING`: áreas adicionales."; (2) "¿Cómo solicito una asesoría?" → "Escríbenos por WhatsApp o envía el formulario de contacto y te responderemos a la brevedad."; (3) "¿Atienden a personas y a empresas?" → "Sí, brindamos asesoría tanto a personas físicas como a empresas."; (4) "¿Cuál es el costo de la primera consulta?" → "`DATA_PENDING`: costo no confirmado."; (5) "¿Dónde están ubicados?" → "`DATA_PENDING`: dirección y cobertura."

#### Scenario: FAQ items expand with answers

- GIVEN the FAQ block rendered
- WHEN a visitor opens each question
- THEN the corresponding answer is shown
- AND answers containing `DATA_PENDING` display an explicit pending marker

### Requirement: Brand Design Tokens (6 Colours + Typography)

The system MUST define the six brand colours as design tokens in Tailwind `@theme` and MUST NOT use ad-hoc hex values in any style or markup.

| Token | Value |
|---|---|
| gris-carbón | #1C1C1C |
| dorado | #B8953E |
| beige | #E8DDC8 |
| marfil | #F7F4ED |
| gris-medio | #6B6B6B |
| blanco | #FFFFFF |

Typography MUST use the Geist family via the Astro fonts API (self-hosted output).

#### Scenario: Colours reference tokens only

- GIVEN the final stylesheet
- WHEN searching for hex colour values
- THEN the only hex occurrences are the six token definitions in `@theme`
- AND all component styles reference token names

### Requirement: WhatsApp-First CTA Rule

WhatsApp MUST be the primary CTA page-wide as deep links `https://wa.me/527772402439?text={mensaje}` with a URL-encoded Spanish prefill. Required placements: Hero "Contactar por WhatsApp" (dorado), each Service card "Solicitar asesoría", after Sobre nosotros "Hablar con un abogado", Contacto "Enviar mensaje", CTA final "Solicitar asesoría". At least one WhatsApp CTA MUST be visible in any viewport; the mobile header keeps a visible WhatsApp button next to the burger. Secondary channels (phone, form) MUST NOT outrank WhatsApp visually in any block.

#### Scenario: Every placement deep-links to WhatsApp

- GIVEN the rendered page at mobile and desktop widths
- WHEN inspecting the five required CTA placements
- THEN each is an `https://wa.me/527772402439` link with prefilled Spanish text
- AND at least one WhatsApp CTA is visible in every viewport

### Requirement: SEO Head, Semantic Structure and JSON-LD

The document MUST set `lang="es"`, a unique title, meta description, canonical URL, and OG tags (title, description, type, url; `og:image` deferred). Canonical/OG url use `DATA_PENDING` domain. The page MUST use semantic headings with exactly one `h1`. The page MUST emit two JSON-LD nodes: `LegalService` (subtype of `LocalBusiness`/`Attorney`) with name, telephone "+52 777 240 2439", url, and `DATA_PENDING` address and areaServed; and `FAQPage` mirroring the five FAQ entries verbatim. NAP (name, address, phone) MUST be consistent across visible copy, JSON-LD, and the Google Maps link.

#### Scenario: Structured data parses

- GIVEN the built page
- WHEN the embedded JSON-LD is parsed
- THEN a `LegalService` node and an `FAQPage` node with five entries are present
- AND FAQPage answers match the FAQ block answers verbatim

#### Scenario: Head metadata present without og:image

- GIVEN the built page
- THEN title, meta description, canonical, and OG title/description/type are present
- AND the page renders correctly without an og:image

### Requirement: Mobile Menu

A burger button MUST toggle the navigation on mobile and MUST expose `aria-expanded` and `aria-controls`. The menu MUST close on link activation, Escape, and outside click; on close, focus MUST return to the burger. Without JavaScript the menu MUST NOT trap or hide content: in-page anchors MUST still navigate to every block.

#### Scenario: Open, select, close

- GIVEN a mobile viewport
- WHEN the visitor opens the menu, activates a link, then reopens and presses Escape
- THEN the menu closes in both cases and focus returns to the burger

### Requirement: Reveal and Carousel Interactions

Scroll-reveal MUST use IntersectionObserver and MUST NOT move elements when `prefers-reduced-motion` is active. Revealed content MUST NOT remain hidden permanently: if IntersectionObserver is unavailable or fails, all content MUST become visible. The Services cards MAY use a scroll-snap carousel on small screens; its controls MUST be labelled buttons (`aria-label`), keyboard-operable, and MUST NOT auto-move under reduced motion.

#### Scenario: Reveal on scroll

- GIVEN IntersectionObserver is available
- WHEN a reveal target enters the viewport
- THEN it transitions to its visible state once
- AND with reduced motion it appears without movement

#### Scenario: Observer failure never hides content

- GIVEN IntersectionObserver is unavailable
- WHEN the page renders
- THEN all content is visible without any reveal animation

### Requirement: FAQ Accordion Interaction

Each FAQ item MUST remain operable without JavaScript (native `details`/`summary` or equivalent) and MUST expose `aria-expanded`/`aria-controls` when enhanced. Enter and Space MUST toggle an item.

#### Scenario: Toggle with keyboard

- GIVEN an FAQ item with focus
- WHEN the visitor presses Enter and then Escape-like close via Space
- THEN the answer toggles open and closed
- AND `aria-expanded` reflects the state

### Requirement: Contact Form (EmailJS) with Graceful Failure

The form MUST send through `@emailjs/browser` (`emailjs.sendForm`) using runtime-read `PUBLIC_EMAILJS_*` (public key, service ID, template ID). The build MUST NOT fail when `PUBLIC_EMAILJS_*` are unset; the form MUST then render and, on submit, show the Spanish error "El formulario no está disponible en este momento. Escríbenos por WhatsApp." with a WhatsApp link, and MUST NOT appear to succeed. On success the form MUST show "Mensaje enviado. Te contactaremos pronto." Client-side validation messages MUST be in Spanish.

#### Scenario: Keys present, send succeeds

- GIVEN all `PUBLIC_EMAILJS_*` keys are set at runtime
- WHEN the visitor submits a valid form
- THEN the message is sent and the Spanish confirmation is shown

#### Scenario: Keys missing, graceful failure

- GIVEN no `PUBLIC_EMAILJS_*` keys are set
- WHEN the visitor submits the form
- THEN the Spanish error message and WhatsApp fallback link are shown
- AND `pnpm build` still succeeds with the same environment

### Requirement: Accessibility

The system MUST respect `prefers-reduced-motion` (no reveal/carousel animation). All interactive elements MUST show a visible focus indicator (dorado focus-visible ring). Icon-only controls (burger, carousel arrows, WhatsApp icon links) MUST carry descriptive Spanish `aria-label`s. All text MUST meet WCAG AA contrast; gold-on-light body text is prohibited (≈2.5:1) — dorado is reserved for CTAs on dark or large display text. A skip-link MAY be provided.

#### Scenario: Visible focus throughout

- GIVEN the rendered page
- WHEN tabbing through all interactive elements
- THEN every element shows a visible focus indicator

#### Scenario: Reduced motion respected

- GIVEN `prefers-reduced-motion: reduce`
- WHEN the page loads and scrolls
- THEN no elements animate or move

### Requirement: Starter Cleanup

The system MUST remove Astro starter boilerplate (Welcome.astro, starter assets) and MUST ship a brand favicon replaceable later.

#### Scenario: No starter residue

- GIVEN the built site
- WHEN inspecting the output and source
- THEN no starter page, starter assets, or default favicon remain

### Requirement: Verification Gate and Success Criteria

`pnpm build` MUST succeed after every slice, including with no `PUBLIC_EMAILJS_*` set. The change is complete only when: all ten blocks render in order; WhatsApp-first CTAs follow the rule; `lang="es"` with no English UI strings; the six brand colours appear exclusively via `@theme` tokens; `@emailjs/browser` is the only new runtime dependency (`@lucide/astro` icons exempt); menu/reveal/carousel/FAQ work without frameworks; reduced motion is respected.

#### Scenario: Build passes with and without keys

- GIVEN clean installs
- WHEN running `pnpm build` with and without `PUBLIC_EMAILJS_*` set
- THEN the build succeeds in both cases
- AND any failing slice blocks completion of that slice