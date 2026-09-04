/**
 * Single source of truth for everything personal on the site.
 *
 * ─────────────────────────────────────────────────────────────
 *  TO FILL IN — anything marked `""` below is a fact I couldn't
 *  verify from the repo or a public profile, so it is left empty
 *  rather than guessed. The UI hides empty fields cleanly, so the
 *  site is truthful as-is; filling these in just makes it complete.
 * ─────────────────────────────────────────────────────────────
 */

export type Position = {
  company: string
  role: string
  /** e.g. "2024" — leave "" if unknown; the row hides the period. */
  start: string
  /** e.g. "2026", or "Present" for the current role. */
  end: string
  location?: string
  summary: string
  /** Two or three concrete things you shipped. Shown on hover/expand. */
  highlights?: string[]
  stack?: string[]
  href?: string
  kind: "work" | "education"
}

export type Project = {
  name: string
  tagline: string
  description: string
  language: string
  href?: string
  status?: string
  /** Shape of the sparkline drawn beside it — purely decorative. */
  curve: number[]
}

export const profile = {
  name: "George Tan",
  fullName: "George Tan Juan Sheng",
  role: "Backend Engineer",
  location: "Malaysia",

  /** The one-line version, used in metadata and the footer. */
  tagline: "Backend engineer building systems for quantitative research and crypto analytics.",

  /** The hero. Kept in two parts so the accent can wrap independently. */
  hero: {
    lead: "Engineering for people who",
    accent: "care about the numbers.",
  },

  intro:
    "I build backend systems for quantitative research and crypto analytics — the pipelines, services and data plumbing that sit under other people's decisions. Before this it was consumer fintech. Off the clock I'm reading annual reports, taking apart how Bitcoin actually works, and writing most of it down.",

  email: "georgetan.business@gmail.com",

  socials: [
    { label: "GitHub", href: "https://github.com/GeorgeTan615", handle: "GeorgeTan615" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/georgetanjs", handle: "georgetanjs" },
  ],

  /** Shown in the strip under the hero. */
  stats: [
    { key: "Currently", value: "Backend", sub: "Quant research & crypto" },
    { key: "Primary stack", value: "Go", sub: "TypeScript, Java, Python" },
    { key: "Based in", value: "MY", sub: "Malaysia · GMT+8" },
  ],

  positions: <Position[]>[
    {
      // TODO: swap for the actual company name. Until then this describes
      // the firm accurately without naming it, so the row still reads.
      company: "Quant Research & Crypto Analytics",
      role: "Backend Engineer",
      start: "2024",
      end: "Present",
      summary:
        "Backend infrastructure for quantitative research and crypto analytics — data pipelines, internal services and the systems research runs on.",
      highlights: [],
      stack: ["Go", "Python", "PostgreSQL"],
      kind: "work",
    },
    {
      company: "MoneyLion",
      role: "Software Engineer",
      // TODO: your actual start/end years at MoneyLion.
      start: "",
      end: "",
      summary:
        "Consumer fintech at scale — backend services for a US mobile banking and financial-products platform.",
      highlights: [],
      stack: [],
      href: "https://www.moneylion.com/about/",
      kind: "work",
    },
    {
      // TODO: full legal/company name, your title, and dates.
      company: "Open Market",
      role: "",
      start: "",
      end: "",
      summary: "",
      highlights: [],
      stack: [],
      kind: "work",
    },
    {
      company: "Monash University Malaysia",
      role: "BSc Computer Science",
      start: "",
      end: "",
      summary: "Computer science, with the data-engineering and distributed-systems electives.",
      kind: "education",
    },
  ],

  projects: <Project[]>[
    {
      name: "SignalB",
      tagline: "Strategy signals from historical price data",
      description:
        "Evaluates financial assets' historical data against strategies you define, and fires a signal when the conditions actually trip. Written to stop me eyeballing charts.",
      language: "Go",
      status: "WIP",
      href: "https://github.com/GeorgeTan615/SignalB",
      curve: [14, 17, 15, 21, 19, 26, 24, 31, 29, 36, 34, 41],
    },
    {
      name: "FinvTracker",
      tagline: "Portfolio performance, one place",
      description:
        "Full-stack SaaS for tracking financial and investment performance across accounts, so the picture isn't split across five apps and a spreadsheet.",
      language: "TypeScript",
      href: "https://github.com/GeorgeTan615/FinvTracker",
      curve: [30, 27, 32, 28, 34, 31, 38, 35, 40, 37, 43, 41],
    },
    {
      name: "Simple Blockchain",
      tagline: "A chain, from first principles",
      description:
        "Blocks, hashing, proof-of-work and UTXOs written from scratch in Go. The fastest way I've found to actually understand a thing is to build the smallest working version of it.",
      language: "Go",
      href: "https://github.com/GeorgeTan615/Simple-Blockchain",
      curve: [12, 14, 13, 18, 22, 20, 25, 29, 27, 33, 38, 42],
    },
    {
      name: "Streaming Pipeline",
      tagline: "Real-time ingestion on Kafka & Spark",
      description:
        "A big-data application streaming and processing events in real time — Kafka for transport, Spark for the heavy lifting.",
      language: "Python",
      href: "https://github.com/GeorgeTan615/Big-Data-Management-Processing-Application",
      curve: [20, 24, 22, 28, 26, 33, 30, 37, 34, 40, 38, 44],
    },
    {
      name: "E-Commerce Backend",
      tagline: "Microservices, done properly",
      description:
        "An MVC microservices backend in Java, built around isolating cart checkout so one slow dependency can't take the order path down with it.",
      language: "Java",
      href: "https://github.com/GeorgeTan615/ECommerce-Backend",
      curve: [16, 19, 18, 23, 21, 27, 25, 30, 28, 34, 32, 38],
    },
  ],

  /**
   * The ticker tape. Deliberately facts about me rather than fake market
   * data — it reads as a market strip without pretending to be a live feed.
   */
  ticker: [
    { symbol: "GO", note: "primary", dir: "up" },
    { symbol: "TYPESCRIPT", note: "daily", dir: "up" },
    { symbol: "POSTGRES", note: "always", dir: "flat" },
    { symbol: "KAFKA", note: "streaming", dir: "up" },
    { symbol: "MONEYLION", note: "prev.", dir: "flat" },
    { symbol: "BTC", note: "researched", dir: "up" },
    { symbol: "2318.HK", note: "analysed", dir: "down" },
    { symbol: "MONASH", note: "comp sci", dir: "flat" },
    { symbol: "SPARK", note: "batch", dir: "flat" },
    { symbol: "JAVA", note: "services", dir: "flat" },
  ] as { symbol: string; note: string; dir: "up" | "down" | "flat" }[],

  /** Rendered on the about page as a "currently" block. */
  now: [
    "Building data infrastructure for quant research and crypto analytics.",
    "Reading annual reports for fun — most recently Ping An's.",
    "Writing up whatever I've just figured out, mostly markets and backend work.",
  ],
}

export type Profile = typeof profile
