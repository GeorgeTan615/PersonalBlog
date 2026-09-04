/**
 * Everything the site renders. Sourced from George's 2026 resume.
 *
 * Emphasis convention: wrap a figure in [[...]] inside any bullet or blurb
 * and it renders in the accent colour, so metrics catch the eye while
 * scanning. See the Emphasise component in app/page.tsx.
 */

export type Stint = {
  title: string
  from: string
  to: string
  bullets: string[]
}

export type Company = {
  name: string
  from: string
  to: string
  summary: string
  stack: string[]
  href?: string
  /** Roles held at this company, most recent first. */
  stints: Stint[]
}

export type Project = {
  name: string
  blurb: string
  tags: string[]
  href?: string
}

export const profile = {
  name: "George Tan",
  fullName: "George Tan Juan Sheng",
  title: "Backend Engineer",
  location: "Malaysia",

  positioning:
    "I build low-latency backend systems for market data and trading. Most recently I led the backend team behind OpenMarket, taking it from an in-house tool to a public platform with 80,000 monthly users.",

  intro: [
    "I'm a backend engineer from Malaysia, with three years across fintech and crypto market data. I spent two and a half years at Trontal Group on OpenMarket, moving from engineer to leading a team of six, and before that I worked on fraud decisioning at MoneyLion.",
    "The work I like is the unglamorous kind: profiling a service until it does five times the throughput, or working out why a database replication topology quietly became the bottleneck.",
  ],

  /** Real figures from the work below. Nothing invented. */
  highlights: [
    { value: "80K", label: "Monthly active users", note: "OpenMarket at handover" },
    { value: "$1M", label: "Annual recurring revenue", note: "Scaled from in-house tool" },
    { value: "500K/s", label: "Messages processed", note: "Live feed, up from 100K/s" },
    { value: "6", label: "Engineers led", note: "Backend team, 2025–26" },
  ],

  interests: [
    {
      heading: "Finance is what I'd be reading about anyway",
      body: "I'm properly interested in the financial industry: how markets work, how a company actually makes its money, and how to invest my own sensibly. I like taking a business apart. Reading the annual report, working through the numbers, deciding whether the price makes any sense. I've gone deep on a few, Chinese insurers especially. It's also why market-data work suits me. I care what the numbers mean, not just how fast they move.",
    },
    {
      heading: "And I like making things fast",
      body: "Most of my favourite work has been performance work. Replacing CGO with native Go and watching throughput go up fivefold. Pushing order-book maths into Postgres with Rust so it runs next to the data. Most of what I know came from building the smallest working version of something to see how it holds up, which is why I wrote a blockchain from scratch instead of reading about one.",
    },
  ],

  companies: <Company[]>[
    {
      name: "Trontal Group",
      from: "Mar 2024",
      to: "Aug 2026",
      summary:
        "Quant research and crypto analytics. I worked on OpenMarket, their market-data and trading platform, through four roles as it went from in-house tool to public product.",
      stack: [
        "Go",
        "Rust",
        "PostgreSQL / TimescaleDB",
        "Kafka",
        "Dragonfly",
        "Kubernetes",
        "AWS",
      ],
      stints: [
        {
          title: "Individual Contributor",
          from: "Jun 2026",
          to: "Aug 2026",
          bullets: [
            "Designed a low-latency Hyperliquid execution system with chain-side idempotency safeguards that prevented duplicate order execution.",
            "Integrated Polymarket prediction markets into OpenMarket across market data, order flow and execution.",
            "Hosted Hyperliquid non-validating nodes to retrieve and serve exclusive Hyperliquid data on OpenMarket.",
          ],
        },
        {
          title: "Lead Engineer",
          from: "Aug 2025",
          to: "Jun 2026",
          bullets: [
            "Led [[six backend engineers]] and scaled OpenMarket to [[80K MAU]], [[10K DAU]] and [[$1 million ARR]].",
            "Scaled the real-time live feed from [[100K]] to [[500K messages/second]] by replacing CGO libraries with native Go, plus pooling, CPU profiling and concurrent workers.",
            "Refactored the ingestion pipeline with concurrent, idempotent database writers, reaching [[200K messages/second]] at maximum throughput without sacrificing correctness.",
            "Spearheaded a migration from PostgreSQL primary-replica to a multi-master architecture with application-side replication, after replication proved to be the bottleneck for high write volume.",
            "Built a real-time alerting system for price and indicator triggers, delivering through browser, email and webhooks.",
            "Tuned TimescaleDB queries and diagnosed continuous-aggregate duplication under concurrent refreshes, producing a reproducible case for the maintainers (TimescaleDB issue #9221).",
          ],
        },
        {
          title: "Senior Backend Engineer",
          from: "Feb 2025",
          to: "Aug 2025",
          bullets: [
            "Wrote custom PostgreSQL functions in Rust with pgrx so compute-intensive order-book operations run next to the data, improving performance by at least [[10x]].",
            "Redesigned caching with Dragonfly, request coalescing and timestamp bucketing, raising the cache-hit ratio by [[20%]] and accelerating time-series queries.",
          ],
        },
        {
          title: "Backend Engineer II",
          from: "Mar 2024",
          to: "Feb 2025",
          bullets: [
            "Rebuilt cron-based order-book processing as a low-latency real-time service in Go and Rust, supporting [[100x more symbols]] and delivering updates within [[250ms]] of source changes.",
            "Built an autonomous validation and gap-fill service that cross-checked upstream sources and backfilled missing or inconsistent time-series data.",
            "Heavy Postgres query-plan analysis and CPU profiling across services to serve data with minimal latency.",
          ],
        },
      ],
    },
    {
      name: "MoneyLion",
      from: "Jun 2023",
      to: "Mar 2024",
      href: "https://www.moneylion.com/about/",
      summary:
        "Consumer fintech. Backend work on the platform's shared fraud-decisioning systems.",
      stack: [
        "Java",
        "Spring",
        "Kafka",
        "DocumentDB",
        "Kubernetes",
        "AWS",
        "Datadog",
      ],
      stints: [
        {
          title: "Backend Engineer",
          from: "Jun 2023",
          to: "Mar 2024",
          bullets: [
            "Developed and maintained a shared fraud-decisioning platform used across product teams to combat account takeover, identity theft and chargebacks.",
            "Built optimised backfill tooling with indexes, batch fetching and multithreading to sanitise sensitive data for [[14M+ users]], cutting monthly servicing costs by [[$8,422]].",
            "Took part in biweekly 24/7 on-call rotations, troubleshooting outages, latency and error-rate incidents across backend services.",
          ],
        },
      ],
    },
  ],

  /** The product most of the Trontal work went into. */
  openMarket: {
    name: "OpenMarket",
    tagline: "From in-house tool to public trading platform",
    body: [
      "OpenMarket began life as something Trontal built for itself. Over two and a half years I helped take it public and then led the backend team behind it: market data, order flow, execution, alerting, and the ingestion pipeline underneath all of it.",
      "Most of the engineering problems were throughput and correctness at the same time. Feeds that can't drop messages, writes that can't double-count, and queries that have to come back fast enough to trade on.",
    ],
    facts: [
      { k: "Scale at handover", v: "80K monthly users · 10K daily · $1M ARR" },
      { k: "Live feed", v: "500K messages/second, up from 100K" },
      { k: "Ingestion", v: "200K messages/second, concurrent and idempotent" },
      { k: "Order book", v: "100x more symbols, updates within 250ms" },
      { k: "Integrations", v: "Hyperliquid execution and self-hosted nodes, Polymarket" },
      { k: "Storage", v: "PostgreSQL / TimescaleDB, multi-master, Dragonfly cache" },
    ],
  },

  projects: <Project[]>[
    {
      name: "SignalB",
      blurb:
        "Watches historical price data against strategies I define, and fires a signal when the conditions actually trip. Built so I'd stop eyeballing charts.",
      tags: ["Go", "Market data", "Strategy engine"],
      href: "https://github.com/GeorgeTan615/SignalB",
    },
    {
      name: "FinvTracker",
      blurb:
        "Tracks investment performance across accounts in one place, instead of five apps and a spreadsheet.",
      tags: ["TypeScript", "Full-stack", "Postgres"],
      href: "https://github.com/GeorgeTan615/FinvTracker",
    },
    {
      name: "Simple Blockchain",
      blurb:
        "Blocks, hashing, proof of work and UTXOs, written from scratch to understand how a chain really works.",
      tags: ["Go", "Proof of work", "UTXO"],
      href: "https://github.com/GeorgeTan615/Simple-Blockchain",
    },
    {
      name: "Streaming Pipeline",
      blurb:
        "Real-time ingestion and processing of event streams on Kafka and Spark.",
      tags: ["Python", "Kafka", "Spark"],
      href: "https://github.com/GeorgeTan615/Big-Data-Management-Processing-Application",
    },
  ],

  skills: [
    {
      group: "Languages",
      items: ["Go", "Rust", "SQL", "Java", "Python", "TypeScript", "Bash"],
    },
    {
      group: "Backend & data",
      items: [
        "PostgreSQL / TimescaleDB",
        "Kafka",
        "Dragonfly / Redis",
        "DocumentDB / MongoDB",
        "Spring",
      ],
    },
    {
      group: "Cloud & observability",
      items: ["AWS", "Kubernetes", "Docker", "Prometheus", "Grafana", "Datadog"],
    },
  ],

  education: {
    school: "Monash University Malaysia",
    course: "Bachelor of Computer Science",
    from: "2020",
    to: "2022",
    note: "CGPA 4.0 · WAM 87.51%",
  },

  achievements: [
    { name: "Monash High Achiever Award", note: "Top 1% of the cohort" },
    { name: "QuickHack 2022", note: "Champion" },
    { name: "MDashHack 2022", note: "1st Runner-Up, 36 teams" },
  ],

  email: "georgetan.business@gmail.com",

  links: [
    { label: "GitHub", href: "https://github.com/GeorgeTan615" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/georgetanjs" },
  ],
}
