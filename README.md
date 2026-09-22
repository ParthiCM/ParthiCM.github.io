# parthicm.github.io

Portfolio for **Parthiban Murugan** — Senior QA Automation Engineer (SDET).

Dark "Mission Control" flight-deck direction: a WebGL field of test nodes and pipeline
edges, flown through by a camera that reads scroll progress.

---

## Run it

```bash
npm install
cp .env.example .env     # then paste your Web3Forms key in
npm run dev              # http://localhost:5173
```

```bash
npm run build            # type check + production build into dist/
npm run preview          # serve dist/ at http://localhost:4173
npm run typecheck        # types only
```

## Before it goes live

1. **Web3Forms key.** Go to <https://web3forms.com>, enter `Parthiban.murugan2705@gmail.com`,
   and a key arrives by email. Put it in `.env` as `VITE_WEB3FORMS_KEY`, and add it as a
   repository secret named `WEB3FORMS_KEY` (Settings → Secrets and variables → Actions).
   Without it the form renders and validates, but submitting shows the error state.
2. **Repository name must be exactly `ParthiCM.github.io`** — that is what makes GitHub
   serve it at the root rather than under `/repo-name/`.
3. **Settings → Pages → Source: `GitHub Actions`** (not "Deploy from a branch").
4. **Set a per-repo git identity** so commits don't carry a work email:
   ```bash
   git config user.email "Parthiban.murugan2705@gmail.com"
   ```
5. **`public/og-image.png`** (1200×630) is not yet made — social previews fall back to no
   image until it is.

Deploys on push to `main`. The workflow type-checks before building, so a type error
fails the deploy rather than shipping.

## Layout

```
docs/                     the plan — design system, all copy, deploy notes
mockups/hero.html         standalone hero prototype (the design review artefact)
src/
  data/                   every word on the site, typed. Copy edits happen here.
  gl/NodeField.ts         the Three.js scene
  components/             scene host, preloader, chrome (top bar, dot nav, cursor, film fx)
  sections/               01 hero … 06 contact, footer
  pages/                  Home, CaseStudy, NotFound
  lib/                    device/quality detection, reveal hook, Web3Forms client
  styles/                 tokens → base → app → sections → case
```

**Copy lives in `src/data/`, never in components.** Rewriting a sentence should never
mean touching layout or motion code.

## Things worth knowing before changing anything

- **`--signal` cyan means "you can click this."** Nothing decorative uses it. `--pass`
  and `--fail` are semantic too — node pulses, build state, form validation only.
- **The node field is five slabs on a treadmill.** When one passes the camera it is
  recycled to the back of the queue, which happens off-screen. Don't "simplify" it into
  one looping chunk: the repeat becomes visible within about twenty seconds.
- **The Work section scroll-jack degrades below 900px** and under `prefers-reduced-motion`
  to a plain vertical stack, and has a keyboard escape (`focusin` scrolls the window to
  the focused panel). Without that it is a keyboard trap.
- **`dist/404.html` is a copy of `index.html`.** It is what makes `/work/:slug` survive a
  hard refresh on GitHub Pages. Never delete the Vite plugin that writes it.
- **Reduced motion is real, not cosmetic:** preloader skipped, camera frozen, pulses off,
  Lenis disabled, reveals instant.

## Still open

- Scale / time-saved / team-size figures for the Connected QA Workflow case study —
  the page carries a visible draft banner until those land.
- `public/og-image.png`.
- Lighthouse and BrowserStack passes.
