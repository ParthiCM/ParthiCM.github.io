/**
 * Every word on the site. Copy lives here, not in components, so
 * rewriting a sentence never means touching layout or motion code.
 * Source of truth for review: docs/02-CONTENT.md
 */

/* ---------------------------------------------------------------- 01 HERO */

export const hero = {
  eyebrowRole: 'Senior QA Automation Engineer',
  eyebrowMeta: 'SDET · Chennai, India',
  /** Three masked lines. The break before "the tester" is the timing. */
  headline: ['I automate the testing.', 'Lately, I automate', 'the tester.'],
  sub: 'Six years building Playwright, Selenium and WebdriverIO frameworks — and now the agents that write them. I design MCP-driven pipelines that carry a Jira ticket through test-case authoring, automation and review, and hand back a draft pull request.',
  subEmphasis: 'MCP-driven pipelines',
  stats: [
    { v: '6+', l: 'Years · SDET' },
    { v: '4', l: 'Languages' },
    { v: '~30m', l: 'Ticket → PR' },
    { v: '3', l: 'OSS tools' },
  ],
} as const

/* --------------------------------------------------------------- 02 ABOUT */

export const about = {
  heading: 'The tester who automated himself out of the boring half of the job.',
  body: [
    "I'm Parthiban, a Senior QA Automation Engineer based in Chennai. For six years I've built the test infrastructure that lets teams ship without holding their breath — UI, API and end-to-end suites across web and microservices, in TypeScript, JavaScript, Java and C#.",
    "The part I care about most is the part that isn't running tests. It's the handoffs: a requirement becomes a test case, a test case becomes a script, a failed run becomes a triaged defect, a defect becomes a ticket comment. Every one of those seams used to be a person copying text between two tools.",
    'Since 2024 I\'ve been closing those seams with agents. At One Click LCA I wired MCP servers into the QA workflow so test cases are authored straight into the test management tool, executed through Playwright MCP, and reported back onto the Jira ticket automatically. I took the same idea open source: a three-agent pipeline that goes from ticket to draft PR in about thirty minutes, for roughly twenty cents a run.',
    'I still read the diff. The agents are fast, not trustworthy — and knowing the difference is the job.',
  ],
  principles: [
    {
      n: '01',
      t: 'Evidence over opinion',
      d: "A test that can't tell you why it failed is a rumour. I build reporting before I build coverage.",
    },
    {
      n: '02',
      t: 'The seams are the work',
      d: 'Most QA time is lost between tools, not inside them. Automate the handoffs and the coverage follows.',
    },
    {
      n: '03',
      t: 'Fast, not trusted',
      d: "Agents draft. Humans review. I've never merged something I didn't read.",
    },
  ],
} as const

/* -------------------------------------------------------- 03 CAPABILITIES */

export const capabilities = {
  heading: 'Five clusters. One pipeline.',
  intro: 'Hover a cluster to trace its connections.',
  clusters: [
    {
      n: '01',
      t: 'Automation',
      featured: false,
      items: ['Playwright', 'Selenium WebDriver', 'WebdriverIO', 'CodeceptJS', 'Applitools', 'Page Object Model'],
    },
    {
      n: '02',
      t: 'AI & agentic QA',
      featured: true,
      items: ['Claude Code', 'MCP servers', 'Jira MCP', 'Playwright MCP', 'BrowserStack MCP', 'Jenkins MCP', 'Cursor', 'GPT', 'Gemini', 'Reusable skill files'],
    },
    {
      n: '03',
      t: 'API, performance & data',
      featured: false,
      items: ['REST Assured', 'Postman', 'SoapUI', 'K6 load testing', 'SQL', 'MongoDB', 'Test data management'],
    },
    {
      n: '04',
      t: 'Languages & frameworks',
      featured: false,
      items: ['TypeScript', 'JavaScript', 'Java', 'C#', 'TestNG', 'NUnit', 'Jest', 'Mocha', 'Chai', 'Cucumber', 'SpecFlow', 'BDD / TDD'],
    },
    {
      n: '05',
      t: 'CI/CD & reporting',
      featured: false,
      items: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Azure DevOps', 'Docker', 'Git', 'Allure', 'TestRail', 'Zephyr', 'BrowserStack', 'Failure-signature triage'],
    },
  ],
  testingTypes: [
    'Functional', 'Smoke', 'Regression', 'API', 'End-to-end', 'Integration',
    'Performance', 'Load', 'Security', 'Microservices', 'Cross-browser', 'Visual',
  ],
} as const

/* ---------------------------------------------------------- 04 EXPERIENCE */

export const experience = {
  heading: 'Six years, three companies, one direction of travel.',
  stations: [
    {
      n: '01',
      period: '2024.09 — Present',
      current: true,
      role: 'Senior QA Automation Engineer',
      company: 'One Click LCA Pvt. Ltd.',
      meta: 'Chennai, India',
      summary:
        "Owns the Playwright and TypeScript automation estate covering UI, API and regression, and led the team's shift from scripted QA to agent-assisted QA.",
      points: [
        'Designed and scaled Playwright + TypeScript frameworks across UI, API and regression suites, raising automated coverage and cutting manual validation effort every release.',
        'Integrated MCP servers end-to-end: test cases authored directly into the test management tool, execution driven through Playwright MCP, run summaries published back onto Jira tickets through Jira MCP.',
        'Wrote reusable AI skill files and action-specific workflows so the whole QA team produced consistent, standards-compliant test artefacts instead of ad-hoc prompts.',
        'Ran regression, smoke and K6 load suites inside Jenkins pipelines, catching defects before production and making release stability measurable.',
        'Validated cross-browser and cross-device behaviour on BrowserStack; managed cases and reporting across TestRail, Zephyr and Jira.',
        'Partnered with product and engineering on requirement reviews, code reviews and QA knowledge sharing.',
      ],
      stack: ['Playwright', 'TypeScript', 'MCP', 'Jenkins', 'K6', 'BrowserStack', 'Jira', 'TestRail', 'Zephyr'],
    },
    {
      n: '02',
      period: '2022.09 — 2024.09',
      current: false,
      role: 'Senior Test Developer',
      company: 'TransPerfect Solutions India Pvt. Ltd.',
      meta: 'Client: TransPerfect, TLS Division',
      summary:
        'Two years on enterprise web applications, splitting a legacy Selenium C# estate and a new Playwright TypeScript one, and bringing the team along with it.',
      points: [
        'Built and maintained Selenium C# and Playwright TypeScript suites for enterprise web applications, improving regression efficiency and release confidence.',
        'Translated product requirements into automated coverage alongside product owners and developers — catching defects before code reached QA rather than after.',
        'Executed regression, smoke and K6 performance validation across releases to keep stability measurable rather than anecdotal.',
        'Led code reviews and delivered framework training that lifted team-wide adoption of automation practice.',
      ],
      stack: ['Selenium', 'C#', 'Playwright', 'TypeScript', 'K6', '.NET'],
    },
    {
      n: '03',
      period: '2020.11 — 2022.09',
      current: false,
      role: 'Automation Test Engineer',
      company: 'Cognizant Technology Solutions',
      meta: 'Clients: Refinitiv, Thomson Reuters',
      summary: 'Financial data platforms, where a wrong number is worse than a broken button.',
      points: [
        'Authored and executed functional, regression and smoke suites for financial data platforms, supporting reliable release cycles.',
        'Maintained and extended Selenium Java and WebdriverIO TypeScript frameworks, keeping coverage aligned with a fast-moving product.',
        'Proposed and introduced Applitools visual validation, catching UI regressions that scripted assertions structurally could not see.',
        'Managed defects and cases across Jira, TestRail and GitLab, and trained teammates on framework usage.',
      ],
      stack: ['Selenium', 'Java', 'WebdriverIO', 'TypeScript', 'Applitools', 'GitLab'],
    },
  ],
  recognition: [
    'Best Tester of the Month — high-impact production incidents identified and raised',
    'Proposed and shipped Applitools visual testing across releases',
    'Delivered a product alarm regression suite ahead of a hard deadline',
  ],
  education: {
    degree: 'B.E. Mechanical Engineering',
    note: 'Started in mechanical engineering, which is mostly the study of how things fail under load. Turns out that transfers.',
    certifications: [
      'Selenium WebDriver Masterclass',
      'Master XPath and CSS Selectors for Selenium WebDriver',
      'POSTMAN API Testing',
      'Web Services and REST API Testing with SoapUI',
      'TypeScript 2021 Edition',
      'JavaScript Basics for Beginners',
    ],
  },
} as const

/* ---------------------------------------------------------- 06 CONTACT */

export const contact = {
  heading: "Let's talk.",
  sub: 'Open to senior SDET and QA automation roles, and to conversations about agentic testing with anyone building in the same direction. I reply to everything.',
  subjects: ['Job opportunity', 'Freelance / contract', 'Collaboration', 'Just saying hi'],
  errors: {
    name: 'expected a name, received empty',
    email: 'expected a valid email address',
    messageEmpty: 'expected a message, received empty',
    messageShort: 'expected at least 10 characters',
    rate: 'too many requests — wait a moment',
    bot: 'submitted too fast to be human',
  },
} as const

export const footer = {
  built: 'Built with React, Three.js and Lenis.',
  tested: 'Tested, obviously.',
  signoff: 'End of transmission',
} as const
