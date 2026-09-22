# Contact form & GitHub Pages deployment

---

## Part 1 — Contact form (Web3Forms)

GitHub Pages serves static files only — there is no server to receive a form POST. The
form therefore posts to a third-party endpoint that emails you. We chose Web3Forms:
**free, 250 submissions/month, no account to create.**

### What you need to do (2 minutes, one time)

1. Go to **https://web3forms.com**
2. Enter `Parthiban.murugan2705@gmail.com` in the "Create Access Key" box
3. Press create — an access key (a UUID) arrives in your inbox
4. Paste it into `.env` as `VITE_WEB3FORMS_KEY=<your-key>`

**The key is public by design.** It only authorises "send an email to the address that
created this key" — it cannot read anything, and it can't be abused to mail someone else.
Web3Forms documents it as safe to commit. We'll still put it in `.env` and inject it at
build time via a GitHub Actions secret, purely so the raw repo stays clean.

### The request

```ts
// src/lib/submitContact.ts
const ENDPOINT = 'https://api.web3forms.com/submit'

export async function submitContact(form: ContactForm) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: import.meta.env.VITE_WEB3FORMS_KEY,

      // Shown in the email you receive
      subject: `[Portfolio] ${form.subject} — ${form.name}`,
      from_name: 'parthicm.github.io',
      replyto: form.email,          // so "Reply" in Gmail goes to them

      // The actual content
      name: form.name,
      email: form.email,
      company: form.company || '—',
      enquiry_type: form.subject,
      message: form.message,

      botcheck: form.botcheck,      // honeypot — must be empty
    }),
  })

  const json = await res.json()
  if (!res.ok || !json.success) throw new Error(json.message ?? 'Submission failed')
  return json
}
```

### Spam protection — three layers, no captcha friction

1. **Honeypot.** A `botcheck` input hidden with `position: absolute; left: -9999px` and
   `tabindex="-1"` `aria-hidden="true"`. Humans never see or tab to it; bots fill every
   field they find. Web3Forms rejects the submission server-side if it's non-empty.
2. **Time-to-submit floor.** Record a timestamp on mount. If the form is submitted in
   under 3 seconds, it's a bot — reject client-side without sending.
3. **Client rate limit.** Store the last submit time in `localStorage`; block a second
   submission within 60 seconds with `too many requests — wait a moment`.

hCaptcha is available on the free tier and drops in with one attribute if spam ever
becomes a real problem. We won't ship it initially — it's an accessibility cost and a
friction cost for a problem you probably won't have.

### States the form must handle

| State | UI |
|---|---|
| `idle` | Button reads `RUN ▸ SEND MESSAGE` |
| `invalid` | Inline assertion-style errors under each bad field, `aria-invalid="true"`, focus moves to the first error |
| `sending` | Button becomes a determinate cyan progress bar, form fields go `disabled` |
| `success` | Form replaced by the green assertion log (see `02-CONTENT.md`), `role="status"` |
| `error` | Red assertion log + the direct mailto fallback, `role="alert"` |
| `ratelimited` | Inline notice, button disabled with a 60s countdown |

**Always render the direct email address on the page as well.** If Web3Forms is down or
an ad-blocker eats the request, a recruiter must still be able to reach you. The form is
a convenience, never the only path.

---

## Part 2 — GitHub Pages hosting

### Answer to your question: yes, free, no domain needed

Create a repository named **exactly** `ParthiCM.github.io`. GitHub treats a repo matching
`<username>.github.io` as your **user site** and serves it at the root:

```
https://parthicm.github.io                         ← this portfolio
https://parthicm.github.io/playwright-test-history ← your existing demo, untouched
https://parthicm.github.io/qa-agentic-pipeline     ← available if you ever add one
```

Your existing project page keeps working exactly as it does now — project pages live as
subpaths under the user site and are deployed from their own repos independently.

**Included free:** HTTPS with an auto-provisioned certificate, a global CDN, and
deploy-on-push.

**Limits worth knowing:** ~1 GB repository, 100 MB per file, 100 GB bandwidth/month, and
10 builds/hour. Our ~280 KB budget is nowhere near any of these — which is the other
reason the WebGL direction beat 30 MB of drone footage.

### Repository layout

```
ParthiCM.github.io/
├─ .github/workflows/deploy.yml
├─ public/
│  ├─ resume.pdf
│  ├─ og-image.png
│  ├─ favicon.svg
│  └─ .nojekyll              ← stops GitHub running Jekyll over the build
├─ src/
├─ docs/                     ← these three planning files
├─ index.html
├─ vite.config.ts
└─ package.json
```

### Vite config

```ts
// vite.config.ts
export default defineConfig({
  base: '/',              // user site = served from root. NOT '/repo-name/'.
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
```

### The SPA routing problem — and the fix

`/work/qa-agentic-pipeline` is a client-side route. It doesn't exist as a file, so a
**direct visit or a page refresh on that URL returns GitHub's 404** — the router never
gets a chance to run.

The standard fix: after building, copy `dist/index.html` to `dist/404.html`. GitHub serves
`404.html` for any unmatched path, the React app boots, and the router resolves the URL
normally. Clean URLs preserved, no hash fragments.

**As built:** done with a small Vite plugin rather than `cp` in the npm script, because
`cp` needs Git Bash on Windows and would work on the Ubuntu CI runner but not on
Parthiban's machine. The plugin behaves identically on both.

```ts
// vite.config.ts
function spaFallback(): Plugin {
  return {
    name: 'gh-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      copyFileSync(resolve(root, 'dist/index.html'), resolve(root, 'dist/404.html'))
    },
  }
}
```

Verified: `dist/404.html` is byte-identical to `dist/index.html` after every build.

This is worth testing explicitly before we call the build done: **open a case-study URL
in a fresh tab and hard-refresh it.** It's the single most common way a GitHub Pages SPA
ships broken.

### Deploy workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          VITE_WEB3FORMS_KEY: ${{ secrets.WEB3FORMS_KEY }}
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### One-time GitHub setup

1. Create the repo `ParthiCM.github.io` (public — Pages on private repos needs Pro)
2. **Settings → Pages → Build and deployment → Source: `GitHub Actions`**
   *(not "Deploy from a branch" — that's the old path and it won't run the workflow)*
3. **Settings → Secrets and variables → Actions → New repository secret**
   Name `WEB3FORMS_KEY`, value = your access key
4. Push to `main` → the workflow runs → live in about 90 seconds

First deploy occasionally takes a few minutes while the certificate provisions. After
that it's ~60–90s per push.

### Later: adding a custom domain

If you ever buy e.g. `parthiban.dev`, it's a 5-minute change with no rebuild:

1. Add a `public/CNAME` file containing just `parthiban.dev`
2. At your registrar, point four `A` records at GitHub's IPs (`185.199.108–111.153`) and
   a `CNAME` for `www` → `parthicm.github.io`
3. Settings → Pages → Custom domain → enter it → tick **Enforce HTTPS**

The `.github.io` URL then permanently redirects to the new domain, so any link you've
already shared keeps working.

---

## Pre-launch checklist

**Functional**
- [ ] Contact form sends a real email end-to-end (test with a live submission)
- [ ] Honeypot rejects a filled `botcheck`
- [ ] Rate limit blocks a rapid second submit
- [ ] Error state shows when the endpoint is blocked (test with devtools offline)
- [ ] Hard-refresh works on every `/work/:slug` URL
- [ ] 404 page renders for a genuinely unknown path
- [ ] Resume PDF downloads and opens
- [ ] Every external link opens in a new tab with `rel="noopener noreferrer"`

**Performance**
- [ ] Lighthouse ≥ 85 Performance, 100 A11y / Best Practices / SEO
- [ ] Bundle ≤ 280 KB gzipped on the initial route
- [ ] 60fps on desktop; static fallback confirmed on a throttled mid-tier mobile profile

**Accessibility**
- [ ] Full keyboard traverse with a visible focus ring throughout
- [ ] Scroll-jack escapable by keyboard
- [ ] `prefers-reduced-motion` genuinely stills the scene
- [ ] Screen-reader pass over the form's error and success announcements

**Cross-platform** — natural fit for your BrowserStack access
- [ ] Chrome, Firefox, Safari, Edge
- [ ] iOS Safari and Android Chrome, portrait and landscape
- [ ] Verify `100svh` behaves on iOS with the address bar showing and hidden

**Content**
- [ ] Every `[VERIFY]` item in `02-CONTENT.md` resolved
- [ ] OG image renders correctly in a LinkedIn post preview
- [ ] Name Googles correctly (JSON-LD `Person` schema in place)
