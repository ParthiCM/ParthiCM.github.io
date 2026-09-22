# Design System — "Mission Control"

Portfolio for Parthiban Murugan · Senior QA Automation Engineer (SDET)
Target: `https://parthicm.github.io`

---

## 1. Concept

A flight deck for software quality.

The site is not decorated with generic tech imagery — it renders **your actual subject
matter** as cinema. A volumetric field of test nodes hangs in space. Edges connect them
into pipelines. Nodes resolve pass-green or fail-red as the camera moves through them.
Scrolling is a single continuous camera move through that space: push in, dolly, orbit,
pull back to a wide, then push into one node that becomes the contact panel.

Every visual element is doing a job:

| Element | Means |
|---|---|
| Node field | A test suite |
| Edges between nodes | Pipeline dependencies |
| Green / red pulses | Pass / fail state |
| Clustering | Capability domains |
| Camera pull-back to wide | Career timeline / scale |
| Film grain + 2.39:1 letterbox | The cinematographic register |

This is why this direction beats stock drone footage: it is the same wow factor, it loads
in ~200 KB instead of ~30 MB, and a technical interviewer immediately understands that
the visual *is* the portfolio.

---

## 2. Colour

Avionics palette. Near-black base, cyan as the primary signal, pass/fail as functional
semantics rather than decoration.

```css
:root {
  /* Surfaces — darkest to lightest */
  --void:    #050607;   /* page background, deepest space */
  --deck:    #0A0D10;   /* section backgrounds */
  --panel:   #101519;   /* cards, form fields */
  --raised:  #181F25;   /* hover state on panels */

  /* Structure */
  --grid:    #1A2228;   /* 1px rules, card borders */
  --grid-hi: #263038;   /* borders on hover/focus */

  /* Text */
  --text:    #E6EDF3;   /* headings, body */
  --muted:   #8B98A5;   /* secondary copy */
  --dim:     #56626E;   /* mono labels, metadata */

  /* Signal — the accent system */
  --signal:  #00D4FF;   /* PRIMARY. links, focus rings, active states */
  --pass:    #3DDC97;   /* success, green pulses, form success */
  --fail:    #FF5C5C;   /* errors, red pulses, form validation */
  --warn:    #FFB020;   /* highlights, "available for work" dot */

  /* Glows — used only in WebGL + box-shadow, never as text colour */
  --glow-signal: 0 0 24px rgba(0, 212, 255, 0.35);
  --glow-pass:   0 0 24px rgba(61, 220, 151, 0.30);
}
```

**Rules**

- `--signal` cyan is the only interactive colour. If it's cyan, it does something.
- `--pass` / `--fail` are *semantic*. Never use them for decoration — they appear on node
  pulses, form validation, and build-state chips only. This restraint is what makes the
  green/red read as meaningful instead of as a gamer palette.
- Body text is always `--text` or `--muted` on `--void`/`--deck`. Never coloured text on
  coloured backgrounds.
- Contrast: `--text` on `--void` = 15.8:1. `--muted` on `--void` = 7.4:1. `--signal` on
  `--void` = 11.1:1. All comfortably AA, most AAA.

### Light mode

Deliberately **not** offered. The concept is a darkened flight deck; a light variant would
be a different site. Instead we respect `prefers-contrast: more` by lifting `--muted` to
`--text` and thickening the `--grid` rules.

---

## 3. Typography

Three faces, three jobs. All Google Fonts, all variable, subset to latin.

```css
--font-display: 'Archivo', 'Helvetica Neue', Arial, sans-serif;   /* variable: wdth 75–125, wght 300–700 */
--font-mono:    'JetBrains Mono', ui-monospace, monospace;        /* 400, 500 */
```

| Face | Used for |
|---|---|
| **Archivo** | Headings *and* body. A signage grotesque with a real width axis — set expanded (`wdth 115`, `wght 600`) it reads as instrument-panel lettering; set normal (`wdth 100`, `wght 400`) it's a clean, quiet body face. One family doing two jobs keeps the page coherent. |
| **JetBrains Mono** | The telemetry layer — section numbers, eyebrow labels, stat readouts, code, build IDs, the assertion log in the contact form. Always `text-transform: uppercase; letter-spacing: 0.14em` when used as a label. |

> **Changed from the first draft** (Space Grotesk + Inter → Archivo). Space Grotesk has
> become *the* default "technical-looking" webfont and Inter the default body face; the
> pair is now a recognisable signature of generated design and would undercut the whole
> direction on sight. Archivo's width axis is also doing real work here — the expanded
> H1 is a typographic choice you can't get from Space Grotesk at all.

Set the width axis with `font-variation-settings`, not `font-stretch`, for reliable
cross-browser behaviour on the variable file:

```css
h1 { font-variation-settings: 'wdth' 115, 'wght' 600; letter-spacing: -0.028em; }
body { font-variation-settings: 'wdth' 100, 'wght' 400; }
```

### Fluid scale

```css
--step--1: clamp(0.80rem, 0.76rem + 0.19vw, 0.90rem);   /* mono labels */
--step-0:  clamp(1.00rem, 0.95rem + 0.24vw, 1.13rem);   /* body */
--step-1:  clamp(1.25rem, 1.16rem + 0.44vw, 1.50rem);   /* lead paragraph */
--step-2:  clamp(1.56rem, 1.41rem + 0.76vw, 2.00rem);   /* h3 */
--step-3:  clamp(1.95rem, 1.70rem + 1.24vw, 2.67rem);   /* h2 */
--step-4:  clamp(2.44rem, 2.04rem + 1.98vw, 3.55rem);   /* section titles */
--step-5:  clamp(3.05rem, 2.42rem + 3.12vw, 4.74rem);   /* hero h1 mobile→desktop */
--step-6:  clamp(3.81rem, 2.83rem + 4.86vw, 6.31rem);   /* hero h1 wide */
```

**Rules**

- Headings: `font-weight: 500`, `letter-spacing: -0.02em`, `line-height: 1.05`. Tight and
  confident — never 700 at display sizes, it looks shouty.
- Body: `line-height: 1.65`, `max-width: 68ch`.
- Mono labels: `0.75rem`, `uppercase`, `letter-spacing: 0.14em`, colour `--dim`.

---

## 4. Layout & spacing

- **Grid:** 12 columns, `max-width: 1440px`, gutters `clamp(1rem, 4vw, 5rem)`.
- **Spacing scale:** `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192px`.
- **Section rhythm:** each full section is `min-height: 100svh` (small viewport height —
  avoids the iOS address-bar jump) with `padding-block: clamp(6rem, 12vh, 10rem)`.
- **Radius:** `2px` on everything. Sharp corners read as instrumentation. The only
  exception is the availability dot and avatar, which are circles.
- **Borders:** always `1px solid var(--grid)`. Never a shadow for separation — this is a
  dark UI, shadows are invisible. Separation comes from border + surface lift.

---

## 5. Motion choreography

The whole page is **one camera move**. GSAP ScrollTrigger drives a single timeline; the
R3F camera reads its progress. Sections don't animate independently — they are beats in
one shot.

### Beat sheet

```
BEAT 00 · PRELOAD                                         ~1.8s, skippable
  Black. Centre: mono counter 000 → 100.
  Beneath it, a system-check list ticks over:
      ▸ shaders          PASS
      ▸ geometry         PASS
      ▸ fonts            PASS
      ▸ telemetry        PASS
  At 100: letterbox bars retract vertically, revealing a camera
  ALREADY in motion. Never reveal a static scene — the move starts
  behind the curtain.

BEAT 01 · HERO                                            scroll 0 → 12%
  Camera pushes forward (dolly-in) through ~400 nodes.
  Nodes near camera are sharp; far field falls into DOF blur.
  Occasional node pulses --pass or --fail, edge lights travel
  along a connection.
  H1 masks up line-by-line (clip-path reveal, 0.9s, power3.out,
  0.08s stagger). Stat strip fades in last.
  Film grain at 4% opacity, vignette at 35%.

BEAT 02 · ABOUT                                           scroll 12 → 28%
  TRANSITION: letterbox bars close to 2.39:1 and reopen (0.6s).
  Camera arcs right and slows. Node field recedes, DOF deepens.
  About panel slides in from the left with a 40px parallax offset.
  The portrait (or abstract plate) sits at a different depth and
  moves at 0.6× scroll speed.

BEAT 03 · CAPABILITIES                                    scroll 28 → 45%
  Camera orbits 25° around the field.
  Nodes REORGANISE — they fly into five labelled clusters.
  This is the signature moment of the site.
  Hovering a cluster: its edges light --signal, siblings dim to 20%.

BEAT 04 · EXPERIENCE                                      scroll 45 → 62%
  Camera pulls back to a wide establishing shot. Field becomes
  small, quiet, distant.
  A vertical "flight path" line DRAWS downward (scrubbed to scroll)
  through three stations. Each station card enters from an
  alternating side, scrubbed not triggered — scroll up and it
  reverses cleanly.

BEAT 05 · WORK                                            scroll 62 → 85%
  HORIZONTAL SCROLL-JACK. Vertical scroll is translated to lateral
  movement across three full-bleed project panels, while the 3D
  camera performs a genuine sideways dolly — parallax between the
  DOM panels and the WebGL background sells real depth.
  Progress rail at the bottom: ── ●──○──○

BEAT 06 · CONTACT                                         scroll 85 → 97%
  Camera pushes INTO a single node, which scales up and becomes
  the contact panel frame.
  Grain lifts to 7%, vignette closes to 55%. The field goes quiet —
  no more pulses.

BEAT 07 · FOOTER                                          scroll 97 → 100%
  Near-black. Mono only. "END OF TRANSMISSION · 2026".
```

### Case-study page transitions

Clicking a project card: the card's bounding box expands to full-viewport (FLIP
technique), a curtain wipe passes over it, and the route changes underneath. Reverse on
back. Framer Motion handles this; `react-router` handles the URL.

### Micro-interactions

| Element | Behaviour |
|---|---|
| Cursor | Custom 8px dot + 32px ring with spring lag. Ring scales to 56px and inverts over links. Hidden on touch devices. |
| Links | Cyan underline sweeps in from left, 0.3s `cubic-bezier(0.4, 0, 0.2, 1)`. |
| Buttons | Border brightens to `--grid-hi`, background lifts `--panel` → `--raised`, a 1px cyan line fills left-to-right behind the label. |
| Cards | Lift `translateY(-4px)`, border → `--signal` at 40% opacity, a faint cyan glow. No 3D tilt — it's overused and fights the real 3D. |
| Nav | Collapses to a floating pill after 100vh. Dot-nav on the right edge shows the seven beats; active dot expands to a 24px line. |
| Text reveal | Per-line clip-path mask, never per-character bouncing (which reads as cheap). |

### Reduced motion & mobile

Both are first-class, not afterthoughts.

**`prefers-reduced-motion: reduce`**
- Preloader skipped entirely.
- Scroll-jack disabled; the work section becomes a vertical stack.
- 3D field renders as a **single static frame**, no camera movement, no pulses.
- All reveals become instant opacity changes (`0.01ms`).
- Lenis smooth scroll disabled — native scroll restored.

**Mobile (`< 768px`)**
- Node count drops 400 → 120; DOF and bloom post-processing off.
- `dpr` capped at 1.5.
- Horizontal scroll-jack replaced with a native swipe carousel (scroll-snap).
- Custom cursor disabled.
- If the device reports `hardwareConcurrency <= 4` **or** the first 60 frames average
  below 45fps, the canvas is swapped for a pre-rendered static WebP of the same scene.
  The page must never feel broken on a mid-tier Android.

---

## 6. Technical stack

```
Vite 6 + React 18 + TypeScript     strict, project references
plain CSS + custom properties      tokens.css / base.css / app.css / sections.css / case.css
react-router-dom v6                / and /work/:slug
three (vanilla)                    node field, camera, custom point shader
lenis                              smooth scroll
```

**Why not Next.js:** we need a purely static export and there's no server-rendering
benefit here. Vite's dev server is faster for the shader iteration loop this build needs.

**Three things the first draft of this spec called for that were dropped during the
build**, each because it would have added weight without earning it:

| Dropped | Why |
|---|---|
| **Tailwind CSS** | This site is almost entirely bespoke — a shader field, a sticky lateral dolly, hand-tuned type. Utilities would have carried close to none of the CSS, while adding a build step and a second vocabulary for the same tokens. Plain CSS with custom properties does the whole job. |
| **@react-three/fiber + drei** | Would have meant rewriting a working vanilla Three.js scene as JSX for no behavioural gain, and adding ~80 KB. The scene is one class with a `ref`; React never needs to reconcile it. |
| **GSAP + ScrollTrigger** | The scroll choreography turned out to need `position: sticky` plus a transform driven by scroll progress — fewer moving parts than a pinning library, no layout thrash, and it cannot strand the page in a pinned state if something throws. GSAP was removed from the dependency list rather than left installed and unused. |
| **@react-three/postprocessing** | Bloom and DOF would roughly double the GPU cost for an effect the additive point shader already approximates. The depth-of-field role is played by a per-section scrim instead. Worth revisiting if we ever want the field sharper behind the copy. |

### Actual shipped bundle

| Chunk | Raw | Gzipped |
|---|---|---|
| `three` | 465 KB | **116.5 KB** |
| `index` (app + React + Router) | 218 KB | **72.8 KB** |
| `index.css` | 29 KB | **6.6 KB** |
| `motion` (lenis) | 19 KB | **5.6 KB** |
| `index.html` | 3.3 KB | **1.3 KB** |
| `CaseStudy` (lazy) | 3.3 KB | 1.3 KB |
| **Initial route total** | | **≈ 203 KB** |

Against a 280 KB budget. Three is the single largest cost by a distance; if we ever need
headroom, that is the one to attack.

### Performance budget

| Metric | Budget |
|---|---|
| JS (gzipped, initial route) | ≤ 280 KB |
| Largest Contentful Paint | ≤ 2.0s on 4G |
| Time to Interactive | ≤ 3.0s on 4G |
| Desktop frame rate | 60fps sustained |
| Mobile frame rate | ≥ 45fps, else static fallback |
| Lighthouse Performance | ≥ 85 (accepting the 3D cost) |
| Lighthouse A11y / Best Practices / SEO | 100 |

Three.js is code-split and lazy-loaded behind the preloader so the first paint is DOM-only.

### Accessibility

Non-negotiable, and doubly so for a QA engineer's portfolio — this page *is* a work sample.

- The `<canvas>` is `aria-hidden="true"`. It carries zero information not also in the DOM.
- Full keyboard path through every section, card and form field. Visible `--signal` focus
  ring, `2px` offset, never removed.
- Scroll-jack has a keyboard escape: arrow keys and Tab move between project panels
  directly.
- Semantic landmarks, one `<h1>`, correct heading order.
- Form: real `<label>`s, `aria-invalid`, `aria-describedby` on errors, `role="status"` on
  the result region.
- A "skip to content" link as the first focusable element.
- Colour is never the sole carrier of meaning — pass/fail states always pair with an icon
  and a text label.

---

## 7. Section inventory

| # | Section | Route | Key content |
|---|---|---|---|
| 00 | Preloader | `/` | System-check sequence |
| 01 | Hero | `/` | H1, sub, stat strip, availability |
| 02 | About | `/` | Bio, portrait, "how I work" |
| 03 | Capabilities | `/` | 5 clusters, interactive |
| 04 | Experience | `/` | 3 roles, vertical flight path |
| 05 | Work | `/` | 3 projects, horizontal dolly |
| 06 | Contact | `/` | Web3Forms form + direct links |
| 07 | Footer | `/` | Mono sign-off |
| — | Case study | `/work/:slug` | Problem → architecture → decisions → outcome |
| — | 404 | `*` | In-character error page |

Copy for all of these lives in `02-CONTENT.md`.
