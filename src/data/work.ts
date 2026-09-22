export type CaseBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'pre'; text: string; caption?: string }
  | { kind: 'quote'; text: string }

export type CaseSection = { heading: string; blocks: CaseBlock[] }

export type Project = {
  slug: string
  n: string
  title: string
  tagline: string
  card: string
  stack: string[]
  repo?: string
  demo?: string
  /** Employer work: no repo, and the page says so rather than implying one exists. */
  proprietary?: boolean
  /** Shown as a banner on the case study while facts are still being confirmed. */
  draft?: string
  sections: CaseSection[]
  outcomes: string[]
}

/**
 * Order is deliberate. Playwright Test History leads because it is the
 * only one with a live demo a stranger can click and verify in ten
 * seconds â€” proof beats description. The Connected QA Workflow follows
 * as current production work, and the Agentic Pipeline closes as the
 * open-source generalisation of it.
 */
export const projects: Project[] = [
  {
    slug: 'playwright-test-history',
    n: '01',
    title: 'Playwright Test History',
    tagline: 'A wall of red, resolved into a short list of causes.',
    card: 'CI reporting that outlives Jenkins build rotation. Every run is written to an immutable per-build store outside the build record, then rendered as one self-contained HTML page: every test across every build, and current failures grouped by failure signature. Zero runtime dependencies. 43 unit tests.',
    stack: ['Node.js', 'JUnit XML', 'Jenkins', 'HTML', 'Zero dependencies'],
    repo: 'https://github.com/ParthiCM/playwright-test-history',
    demo: 'https://parthicm.github.io/playwright-test-history',
    sections: [
      {
        heading: 'The problem',
        blocks: [
          {
            kind: 'p',
            text: 'Jenkins, the Playwright HTML reporter, Allure and raw JUnit all show you one thing: the build you\'re looking at. But the questions a team actually asks are all historical.',
          },
          {
            kind: 'quote',
            text: 'Has this test ever passed? Did the fix work? Is this flaky or newly broken? How many distinct problems are behind these sixteen failures?',
          },
          {
            kind: 'p',
            text: 'Every one of those needs evidence that build rotation has already deleted by the time anyone goes looking.',
          },
        ],
      },
      {
        heading: 'The approach',
        blocks: [
          { kind: 'p', text: 'Four decisions, and the whole tool falls out of them:' },
          {
            kind: 'list',
            items: [
              '**Storage lives outside the CI workspace.** Build data survives rotation because rotation never touches it.',
              '**One immutable file per build.** Each run writes exactly one ~12 KB `build-NNNN.json` and never edits another. That single choice makes the system crash-safe, idempotent and concurrency-safe at once â€” parallel builds can\'t collide, and a re-run cleanly replaces only its own build.',
              '**Parse JUnit XML, don\'t query CI APIs.** Every runner already emits JUnit. No credentials, no API version drift, no vendor lock.',
              '**Zero dependencies.** Node 18+ and nothing else. A reporting tool that breaks on `npm audit` isn\'t a reporting tool.',
            ],
          },
        ],
      },
      {
        heading: 'Failure-signature grouping',
        blocks: [
          {
            kind: 'p',
            text: 'A signature is the error message plus the deepest frame in your own code â€” not the framework\'s. Sixteen failing tests with the same root cause collapse into one row.',
          },
          {
            kind: 'quote',
            text: 'In the demo data, sixteen failures collapse to five causes â€” and the top row alone accounts for six tests. That\'s the difference between a morning of triage and a five-minute standup.',
          },
        ],
      },
      {
        heading: 'The report',
        blocks: [
          { kind: 'p', text: 'One self-contained HTML file. No server, no assets.' },
          {
            kind: 'list',
            items: [
              '**Table A** â€” one row per test, one column per build. Shapes, not just colours, distinguish chronic breakage from flakiness from the exact build where a fix landed.',
              '**Table B** â€” current failures grouped by signature, ordered by blast radius.',
              '**Environment-aware** â€” shows which build ran against staging and which against production, so you\'re not comparing runs that were never comparable.',
            ],
          },
        ],
      },
    ],
    outcomes: [
      '43 unit tests on Node\'s native test runner',
      '0 runtime dependencies Â· Node â‰¥ 18 Â· MIT licensed',
      '`npm run demo` generates 14 mock builds â€” evaluation takes one command',
      'Jenkins integration documented for both Freestyle and Pipeline',
    ],
  },

  {
    slug: 'connected-qa-workflow',
    n: '02',
    title: 'The Connected QA Workflow',
    tagline: 'Four tools, three handoffs, zero copy-paste.',
    card: 'The QA workflow at One Click LCA, rebuilt on MCP. Requirements read from Jira, test cases authored straight into BrowserStack Test Management, execution driven through Playwright MCP, and run summaries published back onto the ticket â€” with reusable skill files keeping the whole team\'s output consistent instead of prompt-by-prompt.',
    stack: ['Jira MCP', 'BrowserStack MCP', 'Playwright MCP', 'Jenkins MCP', 'Claude Code', 'Skill files'],
    proprietary: true,
    sections: [
      {
        heading: 'The problem',
        blocks: [
          {
            kind: 'p',
            text: 'A QA team\'s day is shaped by four tools that have never met each other. The requirement lives in Jira. The test cases live in BrowserStack Test Management. The automation lives in the repo. The result has to go back onto the ticket. Between each pair, a person reads one screen and retypes it into another.',
          },
          {
            kind: 'p',
            text: 'The cost isn\'t just the hours. It\'s that every retyping is a chance to drift â€” two engineers write the same test case in two different shapes, and six months later the suite has no house style at all.',
          },
        ],
      },
      {
        heading: 'The approach',
        blocks: [
          {
            kind: 'p',
            text: 'Connect the four tools directly, through MCP, so the artefact moves instead of the person.',
          },
          {
            kind: 'pre',
            text: `Jira MCP          â†’  read the ticket, pull acceptance criteria
BrowserStack MCP  â†’  author test cases into the right folder,
                     in the house HTML format
Playwright MCP    â†’  drive execution against the running app
Jira MCP          â†’  publish the run summary back to the ticket
Jenkins MCP       â†’  reach build state and CI history`,
          },
          {
            kind: 'p',
            text: 'The second half of the work is the part that made it stick: reusable skill files, one per action. Not one general-purpose assistant, but a named procedure for each thing the team actually does â€” file a bug, post a test-case table to a ticket, author a case in the standard format. An engineer runs the action; the skill supplies the structure.',
          },
          {
            kind: 'quote',
            text: 'The standards aren\'t in anyone\'s head, or in a prompt they wrote that morning. They\'re in the skill file, in the repo, reviewed like any other code.',
          },
        ],
      },
      {
        heading: 'Decisions & trade-offs',
        blocks: [
          {
            kind: 'list',
            items: [
              '**MCP over custom API glue.** Bespoke integrations against four APIs would have meant four auth flows, four client libraries and four things to fix on every version bump. MCP gave one protocol and made each tool swappable.',
              '**One skill per action, not one assistant.** A general assistant produces general-quality output. Narrow, named procedures produce artefacts that look like they came from the same team â€” which is the actual goal.',
              '**Skill files live in version control.** They get reviewed, they get diffed, and when a convention changes it changes once for everyone.',
              '**Human review at the artefact boundary.** Cases get read before they\'re accepted, PRs before they\'re merged. The workflow removes the transcription, not the judgement.',
            ],
          },
        ],
      },
    ],
    outcomes: [
      'Requirement â†’ test cases â†’ execution â†’ ticket update, with no manual retyping between systems',
      'One named skill file per action, so consistency is produced by construction rather than caught in review',
      'Conventions version-controlled: a standard changes once, for everyone, and the change is diffable',
      'Four tools reached through a single protocol â€” each one swappable without touching the others',
      'The pattern proven here is what became the open-source QA Agentic Pipeline',
    ],
  },

  {
    slug: 'qa-agentic-pipeline',
    n: '03',
    title: 'QA Agentic Pipeline',
    tagline: 'Jira ticket to draft pull request, in about thirty minutes.',
    card: 'An open-source AI QA system built on Claude Code and MCP. Three orchestrated agents read a ticket, generate test cases in BrowserStack Test Management, write the Playwright tests, open a draft PR and report back to Jira â€” for roughly $0.20â€“$0.35 a run.',
    stack: ['Claude Code', 'MCP', 'Playwright', 'TypeScript', 'Node.js', 'Jira', 'BrowserStack', 'GitHub'],
    repo: 'https://github.com/ParthiCM/qa-agentic-pipeline',
    sections: [
      {
        heading: 'The problem',
        blocks: [
          {
            kind: 'p',
            text: 'A single Jira ticket generates the same five hours of work every time: read the requirement, write the test cases, put them in the test management tool, write the automation, open the PR, update the ticket. None of it is hard. All of it is copy-paste between four systems that don\'t talk to each other.',
          },
          { kind: 'quote', text: 'The intelligence is in the first ten minutes. The rest is transcription.' },
        ],
      },
      {
        heading: 'The approach',
        blocks: [
          { kind: 'p', text: 'Three layers, deliberately separated:' },
          {
            kind: 'list',
            items: [
              '**Agents** (`agents/*.md`) â€” what to do',
              '**Skills** (`skills/*.md`) â€” how to do it, step by step',
              '**Config** (`config/*.md`) â€” domain knowledge, testing conventions, system mappings',
            ],
          },
          {
            kind: 'p',
            text: 'That separation is the whole design. Skills are shared; config is per-team. Five squads can work in one repository without stepping on each other: each owns a `squads/<team-name>/` directory and pulls from a common `shared/` directory. No merge conflicts, no forked copies drifting apart.',
          },
          {
            kind: 'p',
            text: 'Three MCP servers connect it to the outside world: Atlassian (Jira), BrowserStack Test Management, and GitHub.',
          },
        ],
      },
      {
        heading: 'The pipeline',
        blocks: [
          {
            kind: 'pre',
            caption: 'Four phases â€” phase 3 runs two agents concurrently',
            text: `PHASE 1          PHASE 2             PHASE 3  (parallel)        PHASE 4
â”€â”€â”€â”€â”€â”€â”€â”€â”€        â”€â”€â”€â”€â”€â”€â”€â”€â”€           â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€       â”€â”€â”€â”€â”€â”€â”€â”€â”€
Scrape UI    â†’   Collect ticket  â†’   â”Œ Agent A â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â†’  Report
(optional,       key + folder ID     â”‚ test cases â†’       â”‚    + links
 human review)                       â”‚ BrowserStack,      â”‚
                                     â”‚ update Jira        â”‚
                                     â”œ Agent B â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
                                     â”‚ Playwright tests,  â”‚
                                     â”‚ draft PR           â”‚
                                     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜`,
          },
        ],
      },
      {
        heading: 'Decisions & trade-offs',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Markdown, not code.** Agents, skills and config are all `.md`. A QA engineer who can\'t write TypeScript can still extend the pipeline â€” and that was the point.',
              '**Parallel phase 3.** Test-case authoring and automation don\'t depend on each other, so they run at the same time. This is most of the thirty-minute figure.',
              '**Human gate after scraping.** Phase 1 stops for review deliberately. Scraped UI data is the input most likely to be wrong, and a wrong input poisons every downstream phase.',
              '**Draft PRs, never merged.** The pipeline\'s output is always a draft. Speed is the agent\'s job; correctness stays mine.',
            ],
          },
        ],
      },
    ],
    outcomes: [
      'Ticket â†’ draft PR in ~30 minutes',
      '$0.20â€“$0.35 per run, inside a Claude Code Pro subscription',
      'Seven slash commands for targeted runs',
      'Multi-squad from day one â€” folder isolation over repository forking',
    ],
  },
]

export const workIntro = {
  heading: "Three things I built because the tools didn't exist.",
} as const

export function projectBySlug(slug?: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
