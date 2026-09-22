# Content — every word on the site

Edit this file freely before we build. Anything marked **[VERIFY]** is a claim I inferred
or sharpened and you should confirm. Anything marked **[CHOOSE]** has alternates listed.

---

## 00 · Preloader

```
        PARTHIBAN.SYS
        ─────────────────────

        ▸ shaders            PASS
        ▸ geometry           PASS
        ▸ fonts              PASS
        ▸ telemetry          PASS

        INITIALISING            087
```

Counter runs 000 → 100. Skip link bottom-right: `SKIP ▸`

---

## 01 · Hero

**Eyebrow (mono):**
`SENIOR QA AUTOMATION ENGINEER · SDET · CHENNAI, IN`

**H1 — CONFIRMED:**

> ### I automate the testing.
> ### Lately, I automate the tester.

Set as three masked lines, revealed 0.08s apart. The break lands so the second thought
arrives after a beat — the pause is the joke:

```
I automate the testing.
Lately, I automate
the tester.
```

On viewports under 480px it reflows to two lines (`I automate the testing.` /
`Lately, I automate the tester.`) so it never breaks mid-phrase.

**Sub-headline:**

> Six years building Playwright, Selenium and WebdriverIO frameworks — and now the
> agents that write them. I design MCP-driven pipelines that carry a Jira ticket through
> test-case authoring, automation and review, and hand back a draft pull request.

**Stat strip (mono readout):**

| | |
|---|---|
| `5+` | `YEARS · SDET` |
| `4` | `LANGUAGES · TS JS JAVA C#` |
| `~30 MIN` | `TICKET → DRAFT PR` |
| `3` | `OPEN SOURCE TOOLS` |

**Availability chip** (amber dot, pulsing) — CONFIRMED, keep:
`● OPEN TO SENIOR SDET ROLES`

*Reminder for later: this is the one piece of copy with an expiry date. When you land
something, it's a one-line delete in `src/data/hero.ts`.*

**CTAs:**
`VIEW WORK ▸` (primary, cyan) · `DOWNLOAD RESUME ↓` (ghost)

**Scroll cue:** `SCROLL ▾` in mono, with a 1px line that draws downward on loop.

---

## 02 · About

**Section label:** `02 — ABOUT`

**Heading:**
> ### The tester who automated himself out of the boring half of the job.

**Body:**

> I'm Parthiban, a Senior QA Automation Engineer based in Chennai. For six years I've
> built the test infrastructure that lets teams ship without holding their breath — UI,
> API and end-to-end suites across web and microservices, in TypeScript, JavaScript, Java
> and C#.
>
> The part I care about most is the part that isn't running tests. It's the handoffs: a
> requirement becomes a test case, a test case becomes a script, a failed run becomes a
> triaged defect, a defect becomes a ticket comment. Every one of those seams used to be
> a person copying text between two tools.
>
> Since 2024 I've been closing those seams with agents. At One Click LCA I wired MCP
> servers into the QA workflow so test cases are authored straight into the test
> management tool, executed through Playwright MCP, and reported back onto the Jira
> ticket automatically. I took the same idea open source: a three-agent pipeline that
> goes from ticket to draft PR in about thirty minutes, for roughly twenty cents a run.
>
> I still read the diff. The agents are fast, not trustworthy — and knowing the
> difference is the job.

*That last line is the one people will remember. It positions you as senior rather than
as someone who just discovered AI tooling.*

**"How I work" — three mono-labelled principles:**

```
01  EVIDENCE OVER OPINION
    A test that can't tell you why it failed is a rumour. I build
    reporting before I build coverage.

02  THE SEAMS ARE THE WORK
    Most QA time is lost between tools, not inside them. Automate
    the handoffs and the coverage follows.

03  FAST, NOT TRUSTED
    Agents draft. Humans review. I've never merged something I
    didn't read.
```

**Plate — CONFIRMED: abstract, no photo.**

A slow-rotating wireframe of a node cluster, isolated from the main field and rendered in
its own small canvas. Cyan edges at 60% opacity, vertices unlit, one full rotation every
~45 seconds — slow enough that it reads as ambient rather than as an animation demanding
attention. A 1px `--grid` overlay sits on top at 8% opacity, and the whole plate is
masked with a soft radial fade at the edges so it dissolves into the background rather
than sitting in a box.

On scroll it moves at 0.6× page speed, which is what makes the About section feel like it
has physical depth.

*Reduced motion: rotation stops, plate renders as a single static frame.*
*Mobile: plate moves above the text rather than beside it, at 240px square.*

---

## 03 · Capabilities

**Section label:** `03 — CAPABILITIES`

**Heading:**
> ### Five clusters. One pipeline.

**Intro:** Hover a cluster to trace its connections.

### Cluster 01 — AUTOMATION
`Playwright` · `Selenium WebDriver` · `WebdriverIO` · `CodeceptJS` · `Applitools` · `Page Object Model`

### Cluster 02 — AI & AGENTIC QA
`Claude Code` · `MCP Servers` · `Jira MCP` · `Playwright MCP` · `BrowserStack MCP` · `Jenkins MCP` · `Cursor` · `GPT` · `Gemini` · `Reusable skill files`

*This cluster sits centre-stage in the layout and is the first to light up — it's the
differentiator, and it's what makes you not-interchangeable.*

### Cluster 03 — API, PERFORMANCE & DATA
`REST Assured` · `Postman` · `SoapUI` · `K6 load testing` · `SQL` · `MongoDB` · `Test data management`

### Cluster 04 — LANGUAGES & FRAMEWORKS
`TypeScript` · `JavaScript` · `Java` · `C#` · `TestNG` · `NUnit` · `Jest` · `Mocha` · `Chai` · `Cucumber` · `SpecFlow` · `BDD / TDD`

### Cluster 05 — CI/CD & REPORTING
`Jenkins` · `GitHub Actions` · `GitLab CI` · `Azure DevOps` · `Docker` · `Git` · `Allure` · `TestRail` · `Zephyr` · `BrowserStack` · `Failure-signature triage`

**Testing types strip** (a quiet mono marquee under the clusters):
`FUNCTIONAL · SMOKE · REGRESSION · API · END-TO-END · INTEGRATION · PERFORMANCE · LOAD · SECURITY · MICROSERVICES · CROSS-BROWSER · VISUAL`

---

## 04 · Experience

**Section label:** `04 — EXPERIENCE`

**Heading:**
> ### Six years, three companies, one direction of travel.

---

### Station 01 · `2024.09 — PRESENT`

**Senior QA Automation Engineer**
**One Click LCA Pvt. Ltd.** — Chennai, India

> Owns the Playwright and TypeScript automation estate covering UI, API and regression,
> and led the team's shift from scripted QA to agent-assisted QA.

- Designed and scaled Playwright + TypeScript frameworks across UI, API and regression
  suites, raising automated coverage and cutting manual validation effort every release.
- Integrated MCP servers end-to-end: test cases authored directly into the test
  management tool, execution driven through Playwright MCP, run summaries published back
  onto Jira tickets through Jira MCP.
- Wrote reusable AI skill files and action-specific workflows so the whole QA team
  produced consistent, standards-compliant test artefacts instead of ad-hoc prompts.
- Ran regression, smoke and K6 load suites inside Jenkins pipelines, catching defects
  before production and making release stability measurable.
- Validated cross-browser and cross-device behaviour on BrowserStack; managed cases and
  reporting across TestRail, Zephyr and Jira.
- Partnered with product and engineering on requirement reviews, code reviews and QA
  knowledge sharing.

`Playwright` `TypeScript` `MCP` `Jenkins` `K6` `BrowserStack` `Jira` `TestRail` `Zephyr`

---

### Station 02 · `2022.09 — 2024.09`

**Senior Test Developer**
**TransPerfect Solutions India Pvt. Ltd.** — *Client: TransPerfect, TLS Division*

> Two years on enterprise web applications, splitting a legacy Selenium C# estate and a
> new Playwright TypeScript one, and bringing the team along with it.

- Built and maintained Selenium C# and Playwright TypeScript suites for enterprise web
  applications, improving regression efficiency and release confidence.
- Translated product requirements into automated coverage alongside product owners and
  developers — catching defects before code reached QA rather than after.
- Executed regression, smoke and K6 performance validation across releases to keep
  stability measurable rather than anecdotal.
- Led code reviews and delivered framework training that lifted team-wide adoption of
  automation practice.

`Selenium` `C#` `Playwright` `TypeScript` `K6` `.NET`

---

### Station 03 · `2020.11 — 2022.09`

**Automation Test Engineer**
**Cognizant Technology Solutions** — *Clients: Refinitiv, Thomson Reuters*

> Financial data platforms, where a wrong number is worse than a broken button.

- Authored and executed functional, regression and smoke suites for financial data
  platforms, supporting reliable release cycles.
- Maintained and extended Selenium Java and WebdriverIO TypeScript frameworks, keeping
  coverage aligned with a fast-moving product.
- Proposed and introduced Applitools visual validation, catching UI regressions that
  scripted assertions structurally could not see.
- Managed defects and cases across Jira, TestRail and GitLab, and trained teammates on
  framework usage.

`Selenium` `Java` `WebdriverIO` `TypeScript` `Applitools` `GitLab`

---

**Recognition strip** (below the timeline, mono):

```
◆  BEST TESTER OF THE MONTH — high-impact production incidents identified and raised
◆  Proposed and shipped Applitools visual testing across releases
◆  Delivered a product alarm regression suite ahead of a hard deadline
```

**Education & certifications** (collapsed panel, expands on click):

> **B.E. Mechanical Engineering**
>
> Selenium WebDriver Masterclass · Master XPath and CSS Selectors for Selenium WebDriver ·
> POSTMAN API Testing · Web Services and REST API Testing with SoapUI · TypeScript 2021
> Edition · JavaScript Basics for Beginners

*Keeping the mechanical-engineering degree visible is the right call — it's a better story
than hiding it. Optional one-liner if you want to address it head on:*
> *"Started in mechanical engineering, which is mostly the study of how things fail under
> load. Turns out that transfers."*

---

## 05 · Work

**Section label:** `05 — SELECTED WORK`

**Heading:**
> ### Three things I built because the tools didn't exist.

**Order — CONFIRMED (changed 2026-09-22):**

| Slot | Project | Why here |
|---|---|---|
| 01 | Playwright Test History | The only one with a **live demo** a stranger can click and verify in ten seconds. Proof beats description, so it opens. |
| 02 | The Connected QA Workflow | Current production work, at the current employer. |
| 03 | QA Agentic Pipeline | The open-source generalisation of 02 — it lands harder once the reader has seen the problem it came from. |

*The panels below are written in their original order; the numbering in
`src/data/work.ts` is the shipped one.*

---

### Panel — QA Agentic Pipeline *(ships as 03)*

**Slug:** `/work/qa-agentic-pipeline`
**Repo:** `github.com/ParthiCM/qa-agentic-pipeline`
**Card line:** *Jira ticket to draft pull request, in about thirty minutes.*

**Card body:**
> An open-source AI QA system built on Claude Code and MCP. Three orchestrated agents read
> a ticket, generate test cases in BrowserStack Test Management, write the Playwright
> tests, open a draft PR and report back to Jira — for roughly $0.20–$0.35 a run.

`Claude Code` `MCP` `Playwright` `TypeScript` `Node.js` `Jira` `BrowserStack` `GitHub`

#### Case study — `/work/qa-agentic-pipeline`

**THE PROBLEM**
> A single Jira ticket generates the same five hours of work every time: read the
> requirement, write the test cases, put them in the test management tool, write the
> automation, open the PR, update the ticket. None of it is hard. All of it is
> copy-paste between four systems that don't talk to each other. The intelligence is in
> the first ten minutes; the rest is transcription.

**THE APPROACH**
> Three layers, deliberately separated:
>
> - **Agents** (`agents/*.md`) — *what* to do
> - **Skills** (`skills/*.md`) — *how* to do it, step by step
> - **Config** (`config/*.md`) — domain knowledge, testing conventions, system mappings
>
> That separation is the whole design. Skills are shared; config is per-team. It means
> five squads can work in one repository without stepping on each other: each owns a
> `squads/<team-name>/` directory and pulls from a common `shared/` directory. No merge
> conflicts, no forked copies drifting apart.
>
> Three MCP servers connect it to the outside world: Atlassian (Jira), BrowserStack Test
> Management, and GitHub.

**THE PIPELINE** *(animated SVG on the case-study page)*
```
  PHASE 1          PHASE 2            PHASE 3 (parallel)         PHASE 4
  ─────────        ─────────          ──────────────────         ─────────
  Scrape UI   →    Collect ticket  →  ┌ Agent A ──────────┐  →   Report
  (optional,       key + folder ID    │ test cases →      │      + links
  human review)                       │ BrowserStack,     │
                                      │ update Jira       │
                                      ├ Agent B ──────────┤
                                      │ Playwright tests, │
                                      │ draft PR          │
                                      └───────────────────┘
```

**DECISIONS & TRADE-OFFS**
> - **Markdown, not code.** Agents, skills and config are all `.md`. A QA engineer who
>   can't write TypeScript can still extend the pipeline — and that was the point.
> - **Parallel phase 3.** Test-case authoring and automation don't depend on each other,
>   so they run at the same time. This is most of the thirty-minute figure.
> - **Human gate after scraping.** Phase 1 stops for review deliberately. Scraped UI data
>   is the input most likely to be wrong, and a wrong input poisons every downstream
>   phase.
> - **Draft PRs, never merged.** The pipeline's output is always a draft. Speed is the
>   agent's job; correctness stays mine.

**OUTCOME**
> - Ticket → draft PR in **~30 minutes**
> - **$0.20–$0.35** per run, inside a Claude Code Pro subscription
> - **Seven slash commands** for targeted runs: `/qa-pipeline`, `/create-testcases`,
>   `/automate-tests`, `/scrape-data`, `/update-jira`, `/create-pr`, `/report-bug`
> - Multi-squad from day one — folder isolation over repository forking

`VIEW ON GITHUB ▸`

---

### Panel 02 — Playwright Test History

**Slug:** `/work/playwright-test-history`
**Repo:** `github.com/ParthiCM/playwright-test-history`
**Live demo:** `parthicm.github.io/playwright-test-history`
**Card line:** *A wall of red, resolved into a short list of causes.*

**Card body:**
> CI reporting that outlives Jenkins build rotation. Every run is written to an immutable
> per-build store outside the build record, then rendered as one self-contained HTML page:
> every test across every build, and current failures grouped by failure signature. Zero
> runtime dependencies. 43 unit tests.

`Node.js` `JUnit XML` `Jenkins` `HTML` `Zero dependencies`

#### Case study — `/work/playwright-test-history`

**THE PROBLEM**
> Jenkins, the Playwright HTML reporter, Allure and raw JUnit all show you one thing: the
> build you're looking at. But the questions a team actually asks are all historical.
>
> *Has this test ever passed? Did the fix work? Is this flaky or newly broken? How many
> distinct problems are behind these sixteen failures?*
>
> Every one of those needs evidence that build rotation has already deleted by the time
> anyone goes looking.

**THE APPROACH**
> Four decisions, and the whole tool falls out of them:
>
> 1. **Storage lives outside the CI workspace.** Build data survives rotation because
>    rotation never touches it.
> 2. **One immutable file per build.** Each run writes exactly one ~12 KB
>    `build-NNNN.json` and never edits another. That single choice makes the system
>    crash-safe, idempotent and concurrency-safe at once — parallel builds can't collide,
>    and a re-run cleanly replaces only its own build.
> 3. **Parse JUnit XML, don't query CI APIs.** Every runner already emits JUnit. No
>    credentials, no API version drift, no vendor lock.
> 4. **Zero dependencies.** Node 18+ and nothing else. A reporting tool that breaks on
>    `npm audit` isn't a reporting tool.

**FAILURE-SIGNATURE GROUPING** — *the interesting part*
> A signature is the error message plus **the deepest frame in your own code** — not the
> framework's. Sixteen failing tests with the same root cause collapse into one row.
>
> In the demo data: **sixteen failures collapse to five causes, and the top row alone
> accounts for six tests.** That's the difference between a morning of triage and a
> five-minute standup.

**THE REPORT**
> One self-contained HTML file, no server, no assets.
>
> - **Table A** — one row per test, one column per build. Shapes, not just colours,
>   distinguish chronic breakage from flakiness from the exact build where a fix landed.
> - **Table B** — current failures grouped by signature, ordered by blast radius.
> - Environment-aware: shows which build ran against staging and which against production,
>   so you're not comparing runs that were never comparable.

**OUTCOME**
> - **43 unit tests** on Node's native test runner
> - **0 runtime dependencies** · Node ≥ 18 · MIT licensed
> - `npm run demo` generates 14 mock builds so evaluation takes one command
> - Jenkins integration documented for both Freestyle (`jenkins/freestyle-config.xml`) and
>   Pipeline (`Jenkinsfile`)

`VIEW LIVE DEMO ▸` · `VIEW ON GITHUB ▸`

---

### Panel 03 — The Connected QA Workflow

**Slug:** `/work/connected-qa-workflow`
**Context:** Built at One Click LCA · not open source
**Card line:** *Four tools, three handoffs, zero copy-paste.*

**Card body:**
> The QA workflow at One Click LCA, rebuilt on MCP. Requirements are read from Jira, test
> cases authored straight into BrowserStack Test Management, execution driven through
> Playwright MCP, and run summaries published back onto the ticket — with reusable skill
> files keeping the whole team's output consistent instead of prompt-by-prompt.

`Jira MCP` `BrowserStack MCP` `Playwright MCP` `Jenkins MCP` `Claude Code` `Skill files`

*No repo link on this card — it's employer work. The card links to the case study only,
and the case study carries a `PRODUCTION WORK · NOT OPEN SOURCE` chip so nobody hunts for
a GitHub URL that doesn't exist.*

#### Case study — `/work/connected-qa-workflow`

**THE PROBLEM**
> A QA team's day is shaped by four tools that have never met each other. The requirement
> lives in Jira. The test cases live in BrowserStack Test Management. The automation
> lives in the repo. The result has to go back onto the ticket. Between each pair, a
> person reads one screen and retypes it into another.
>
> The cost isn't just the hours. It's that every retyping is a chance to drift — two
> engineers write the same test case in two different shapes, and six months later the
> suite has no house style at all.

**THE APPROACH**
> Connect the four tools directly, through MCP, so the artefact moves instead of the
> person.
>
> ```
>   Jira MCP          →  read the ticket, pull acceptance criteria
>   BrowserStack MCP  →  author test cases into the right folder,
>                        in the house HTML format
>   Playwright MCP    →  drive execution against the running app
>   Jira MCP          →  publish the run summary back to the ticket
>   Jenkins MCP       →  reach build state and CI history
> ```
>
> The second half of the work is the part that made it stick: **reusable skill files, one
> per action.** Not one general-purpose assistant, but a named procedure for each thing
> the team actually does — file a bug, post a test-case table to a ticket, author a case
> in the standard format. An engineer runs the action; the skill supplies the structure.
>
> That's why the output is consistent. The standards aren't in anyone's head or in a
> prompt they wrote that morning — they're in the skill file, in the repo, reviewed like
> any other code.

**DECISIONS & TRADE-OFFS**
> - **MCP over custom API glue.** Bespoke integrations against four APIs would have meant
>   four auth flows, four client libraries and four things to fix on every version bump.
>   MCP gave one protocol and made each tool swappable.
> - **One skill per action, not one assistant.** A general assistant produces
>   general-quality output. Narrow, named procedures produce artefacts that look like they
>   came from the same team — which is the actual goal.
> - **Skill files live in version control.** They get reviewed, they get diffed, and when
>   a convention changes it changes once for everyone.
> - **Human review at the artefact boundary.** Cases get read before they're accepted,
>   PRs before they're merged. The workflow removes the transcription, not the judgement.

**OUTCOME**
> - Requirement → test cases → execution → ticket update, with no manual copy between
>   systems
> - Team-wide consistency in test artefacts, enforced by shared skill files rather than
>   by review nagging
> - The pattern proven here is what became the open-source
>   [QA Agentic Pipeline](#) — this is where the idea was tested against a real product

---

**RESOLVED — 2026-09-22.** Parthiban had no figures to hand and asked me to fill them in.

**I did not invent numbers, and that was deliberate.** A fabricated "cut authoring time
by 60%" or "450 test cases migrated" would sit on a page recruiters read as fact, and the
first interviewer who asks him to walk through that number puts him in an impossible
position. Invented metrics are also the easiest thing in a portfolio to get caught on,
because they're the thing people probe.

Instead the outcomes are written from what is **verifiably true about the architecture** —
the MCP protocol choice, the one-skill-per-action pattern, conventions living in version
control. They're concrete and specific without a single figure he'd have to defend:

```
✓ Requirement → test cases → execution → ticket update, with no manual
  retyping between systems
✓ One named skill file per action, so consistency is produced by
  construction rather than caught in review
✓ Conventions version-controlled: a standard changes once, for everyone,
  and the change is diffable
✓ Four tools reached through a single protocol — each swappable without
  touching the others
✓ The pattern proven here is what became the open-source QA Agentic Pipeline
```

The amber draft banner has been removed; the page ships as finished.

**If real figures ever surface**, they slot straight into the `outcomes` array in
`src/data/work.ts` with no other change. Three that would be worth having, and that
Parthiban could count in an afternoon: how many skill files exist, how many engineers or
squads use them, and how many test cases have been authored through the BrowserStack MCP
path.

*The C# Selenium framework doesn't disappear — C#, .NET, NUnit and TDD all stay in the
Capabilities clusters and in the TransPerfect and Cognizant entries. It just no longer
has to carry a case-study page it doesn't have the material for.*

---

## 06 · Contact

**Section label:** `06 — CONTACT`

**Heading:**
> ### Let's talk.

**Sub:**
> Open to senior SDET and QA automation roles, and to conversations about agentic testing
> with anyone building in the same direction. I reply to everything.

### The form

| Field | Type | Required | Placeholder |
|---|---|---|---|
| Name | text | ✓ | `Your name` |
| Email | email | ✓ | `you@company.com` |
| Company | text | — | `Optional` |
| Subject | select | ✓ | Job opportunity · Freelance / contract · Collaboration · Just saying hi |
| Message | textarea | ✓ | `What's on your mind?` |

**Submit button:** `RUN ▸ SEND MESSAGE`

**On submit** the button becomes a determinate progress bar. On success the form is
replaced by an assertion log — the on-brand detail that will make people smile:

```
  ✓  name            valid
  ✓  email           valid
  ✓  message         valid
  ✓  transmission    200 OK

  1 passed  (0.4s)

  Message received. I'll get back to you within a day or two.
```

**On failure:**
```
  ✗  transmission    FAILED

  1 failed  (2.1s)

  Something broke on the way out. Mail me directly:
  Parthiban.murugan2705@gmail.com
```

**Inline validation copy:**
- Name empty → `expected a name, received empty`
- Email invalid → `expected a valid email address`
- Message empty → `expected a message, received empty`
- Message < 10 chars → `expected at least 10 characters`

*Assertion-style error text, because of course it is.*

### Direct links (beside the form)

```
EMAIL       Parthiban.murugan2705@gmail.com          [copy]
PHONE       +91 8220251080                           [copy]
LINKEDIN    linkedin.com/in/parthibanmurugan            ↗
GITHUB      github.com/ParthiCM                         ↗
LOCATION    Chennai, India · IST (UTC+5:30)
```

`DOWNLOAD RESUME .PDF ↓`

**CONFIRMED: phone number, email and resume download all stay on the public site.**

Since both the phone number and email are public by choice, we'll do the cheap things
that cut scraping without costing a recruiter anything:

- Render both from JS at runtime rather than as literal text in the HTML source. Stops
  the naive scrapers that only read raw HTML; costs nothing, and the copy button still
  works. It is *not* real protection against a headless browser — nothing is — so treat
  this as friction, not a shield.
- No `tel:` or `mailto:` link on the visible text itself; the copy button does the work,
  with the `mailto:` kept on the error-state fallback only.
- Expect some spam regardless. That's the accepted trade for being easy to reach.

*If the spam ever gets annoying, removing the phone number later is a one-line change in
`src/data/contact.ts` — no rebuild of anything else.*

---

## 07 · Footer

```
PARTHIBAN MURUGAN · SENIOR QA AUTOMATION ENGINEER

Built with React, Three.js and GSAP.
Tested, obviously.

GITHUB ↗    LINKEDIN ↗    EMAIL ↗

END OF TRANSMISSION · © 2026
```

---

## 404 page

```
        ✗  ROUTE NOT FOUND

        expected: a page
        received: undefined

        1 failed  (0.0s)

        [ RETURN TO / ]
```

---

## SEO & metadata

```
Title:        Parthiban Murugan — Senior QA Automation Engineer (SDET)
Description:  Senior QA Automation Engineer building Playwright frameworks and
              MCP-driven agents that take a Jira ticket to a draft pull request
              in thirty minutes. 6+ years in UI, API and end-to-end automation.
URL:          https://parthicm.github.io
OG image:     1200×630 — hero node field, name, title, cyan on near-black
Twitter card: summary_large_image
```

**JSON-LD `Person` schema** with `name`, `jobTitle`, `worksFor`, `knowsAbout`
(the capability clusters), `sameAs` → LinkedIn + GitHub, and `email`. This is what makes
you show up correctly when a recruiter Googles your name.

---

## Decisions — settled

| # | Question | Decision |
|---|---|---|
| 1 | Hero H1 | **"I automate the testing. Lately, I automate the tester."** |
| 2 | About plate | **Abstract** — rotating wireframe node cluster, no photo |
| 3 | Project 03 | **Swapped** to the Connected QA Workflow (One Click LCA) |
| 4 | Phone number | **Keep**, rendered at runtime |
| 5 | Availability chip | **Keep** |
| 6 | Resume PDF download | **Keep** |
| 7 | Email visible | **Keep**, with copy-to-clipboard |

## Still open

- **Web3Forms access key** → paste into `.env`, and add it as the repo Actions secret
  `WEB3FORMS_KEY`. The form validates and renders without it, but submitting shows the
  error state. Site URL to give Web3Forms: `https://parthicm.github.io/#contact`
- **Portrait in About** — `public/portrait.jpg` now exists (900×900, graded, disc
  recoloured off One Click LCA green). The About section still uses the abstract
  wireframe plate, because that was an explicit choice made before a headshot was
  available. Swapping it is a one-line change; needs a decision either way, since
  otherwise `portrait.jpg` ships unused.

## Done — 2026-09-22

- **Work order** changed to Playwright Test History → Connected QA Workflow → QA Agentic
  Pipeline.
- **Connected QA Workflow** finished without invented metrics; draft banner removed.
- **`public/og-image.png`** generated (1200×630) from `Latest.jpg`, with the brand-green
  disc recoloured to the palette's dark teal.
- **Resume PDF** copied to `public/resume.pdf`. Phone number stays on the site, so no
  stripped variant is needed. *Confirm this is the version you want public.*
