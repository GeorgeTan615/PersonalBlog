/**
 * Everything the site renders. One file, plain data.
 *
 * Anything left as "" is a fact I couldn't verify — the layout skips
 * empty fields, so nothing is invented and nothing looks broken.
 */

export type Role = {
  company: string
  title: string
  /** "2024", or "" if unknown. */
  from: string
  /** "Present", a year, or "" if unknown. */
  to: string
  blurb: string
  href?: string
}

export type Project = {
  name: string
  blurb: string
  tech: string
  href?: string
}

export const profile = {
  name: "George Tan",
  title: "Backend Engineer",
  location: "Malaysia",

  intro: [
    "I'm a backend engineer based in Malaysia. Right now I build data infrastructure at a quant research and crypto analytics firm.",
    "Before that I wrote backend services for consumer fintech at MoneyLion. I studied Computer Science at Monash Malaysia.",
  ],

  interests: [
    {
      heading: "Finance is what I'd be reading about anyway",
      body: "I'm properly interested in the financial industry: how markets work, how a company actually makes its money, and how to invest my own sensibly. I like taking a business apart. Reading the annual report, working through the numbers, deciding whether the price makes any sense. I've gone deep on a few, Chinese insurers especially.",
    },
    {
      heading: "And I like building things",
      body: "Mostly backend. Go and TypeScript, services and data pipelines. Most of what I know came from building the smallest working version of something to see how it holds up. That's why I wrote a blockchain from scratch instead of reading about one.",
    },
  ],

  roles: <Role[]>[
    {
      // TODO: swap in the real company name.
      company: "Quant research & crypto analytics firm",
      title: "Backend Engineer",
      from: "2024",
      to: "Present",
      blurb:
        "Data infrastructure and backend services: the pipelines and systems the research side runs on.",
    },
    {
      company: "MoneyLion",
      title: "Software Engineer",
      // TODO: your actual years here.
      from: "",
      to: "",
      blurb:
        "Backend services for a consumer fintech platform doing mobile banking and financial products at scale.",
      href: "https://www.moneylion.com/about/",
    },
    {
      // TODO: confirm the company name — I have it as both "Open Market"
      // and "Supermarket" from our conversation. Also your title and years.
      company: "Open Market",
      title: "",
      from: "",
      to: "",
      blurb: "",
    },
  ],

  education: {
    school: "Monash University Malaysia",
    course: "BSc Computer Science",
    year: "",
  },

  projects: <Project[]>[
    {
      name: "SignalB",
      blurb:
        "Watches historical price data against strategies I define, and fires a signal when the conditions actually trip. Built so I'd stop eyeballing charts.",
      tech: "Go",
      href: "https://github.com/GeorgeTan615/SignalB",
    },
    {
      name: "FinvTracker",
      blurb:
        "Tracks investment performance across accounts in one place, instead of five apps and a spreadsheet.",
      tech: "TypeScript",
      href: "https://github.com/GeorgeTan615/FinvTracker",
    },
    {
      name: "Simple Blockchain",
      blurb:
        "Blocks, hashing, proof of work and UTXOs, written from scratch to understand how a chain really works.",
      tech: "Go",
      href: "https://github.com/GeorgeTan615/Simple-Blockchain",
    },
    {
      name: "E-Commerce Backend",
      blurb:
        "Microservices in Java, built around isolating cart checkout so a slow dependency can't take the order path down with it.",
      tech: "Java",
      href: "https://github.com/GeorgeTan615/ECommerce-Backend",
    },
    {
      name: "Streaming Pipeline",
      blurb:
        "Real-time ingestion and processing on Kafka and Spark.",
      tech: "Python",
      href:
        "https://github.com/GeorgeTan615/Big-Data-Management-Processing-Application",
    },
  ],

  email: "georgetan.business@gmail.com",

  links: [
    { label: "GitHub", href: "https://github.com/GeorgeTan615" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/georgetanjs" },
  ],
}
