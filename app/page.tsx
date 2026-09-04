import { ModeToggle } from "@/components/mode-toggle"
import { profile } from "@/content/profile"

/**
 * Renders [[figures]] in a bullet as emphasised text, so numbers catch the
 * eye when scanning rather than sitting flat in the sentence.
 */
function Emphasise({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[\[.*?\]\])/g).map((part, i) =>
        part.startsWith("[[") && part.endsWith("]]") ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

/** Section label pinned to a left rail while its content scrolls past. */
function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-rule py-12 lg:grid lg:grid-cols-[10rem_1fr] lg:gap-14 lg:py-16">
      <h2 className="mb-7 text-xs font-semibold uppercase tracking-[0.14em] text-ink-3 lg:sticky lg:top-12 lg:mb-0 lg:self-start">
        {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-rule px-2.5 py-1 text-xs text-ink-2">
      {children}
    </span>
  )
}

export default function Home() {
  const { education, openMarket } = profile

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:py-24">
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="pb-12" data-reveal>
        <div className="flex items-start justify-between gap-8">
          <div>
            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-[15px] text-ink-2">
              {profile.title} · {profile.location}
            </p>
          </div>
          <ModeToggle />
        </div>

        <p className="mt-9 max-w-2xl text-lg leading-relaxed text-ink sm:text-xl">
          {profile.positioning}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`mailto:${profile.email}`}
            className="text-[15px] text-ink underline decoration-accent decoration-1 underline-offset-4 transition-colors duration-200 hover:text-accent"
          >
            {profile.email}
          </a>
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-ink-2 transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      {/* ── Impact ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule lg:grid-cols-4">
        {profile.highlights.map((stat) => (
          <div key={stat.label} className="bg-bg-soft/60 px-5 py-6" data-reveal>
            <p className="font-serif text-3xl leading-none text-ink sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-3 text-[13px] font-medium leading-snug text-ink">
              {stat.label}
            </p>
            <p className="mt-1 text-xs leading-snug text-ink-3">{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        {/* ── About ───────────────────────────────────────────── */}
        <Section label="About">
          <div className="max-w-2xl space-y-4" data-reveal>
            {profile.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[15px] leading-relaxed text-ink-2"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-9 max-w-2xl space-y-7">
            {profile.interests.map((item) => (
              <div key={item.heading} data-reveal>
                <h3 className="mb-2 text-[15px] font-semibold text-ink">
                  {item.heading}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-2">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Experience ──────────────────────────────────────── */}
        <Section label="Experience">
          <div className="space-y-12">
            {profile.companies.map((company) => (
              <div key={company.name} data-reveal>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-xl font-semibold tracking-tight text-ink">
                    {company.href ? (
                      <a
                        href={company.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 hover:text-accent"
                      >
                        {company.name}
                      </a>
                    ) : (
                      company.name
                    )}
                  </h3>
                  <span className="shrink-0 text-[13px] tabular-nums text-ink-3">
                    {company.from} — {company.to}
                  </span>
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">
                  {company.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {company.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>

                {/* Role progression, oldest at the bottom of the rail. */}
                <ol className="mt-7 space-y-7 border-l border-rule pl-6">
                  {company.stints.map((stint) => (
                    <li key={stint.title} className="relative">
                      <span
                        className="absolute -left-[1.71rem] top-[0.45rem] h-[7px] w-[7px] rounded-full bg-accent ring-4 ring-bg"
                        aria-hidden="true"
                      />
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                        <h4 className="text-[15px] font-semibold text-ink">
                          {stint.title}
                        </h4>
                        <span className="shrink-0 text-[13px] tabular-nums text-ink-3">
                          {stint.from} — {stint.to}
                        </span>
                      </div>

                      <ul className="mt-2.5 space-y-2">
                        {stint.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2.5 text-sm leading-relaxed text-ink-2"
                          >
                            <span
                              className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink-3"
                              aria-hidden="true"
                            />
                            <span>
                              <Emphasise text={bullet} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Section>

        {/* ── OpenMarket ──────────────────────────────────────── */}
        <Section label="OpenMarket">
          <div
            className="rounded-lg border border-rule bg-bg-soft/60 p-6 sm:p-7"
            data-reveal
          >
            <h3 className="font-serif text-2xl leading-tight text-ink sm:text-3xl">
              {openMarket.tagline}
            </h3>

            <div className="mt-4 max-w-2xl space-y-3">
              {openMarket.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[15px] leading-relaxed text-ink-2"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-7 grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2">
              {openMarket.facts.map((fact) => (
                <div key={fact.k} className="bg-bg px-4 py-3.5">
                  <dt className="text-xs uppercase tracking-[0.1em] text-ink-3">
                    {fact.k}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-snug text-ink">
                    {fact.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {/* ── Side projects ───────────────────────────────────── */}
        <Section label="Side projects">
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.projects.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-lg border border-rule bg-bg-soft/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-3/40 hover:bg-bg-soft"
                data-reveal
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
                    {project.name}
                  </h3>
                  <span
                    className="shrink-0 text-ink-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">
                  {project.blurb}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Section>

        {/* ── Skills ──────────────────────────────────────────── */}
        <Section label="Skills">
          <dl className="space-y-6">
            {profile.skills.map((group) => (
              <div
                key={group.group}
                className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-6"
                data-reveal
              >
                <dt className="mb-2 text-sm font-semibold text-ink sm:mb-0">
                  {group.group}
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ── Education ───────────────────────────────────────── */}
        <Section label="Education">
          <div data-reveal>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="text-base font-semibold text-ink">
                {education.school}
              </h3>
              <span className="shrink-0 text-[13px] tabular-nums text-ink-3">
                {education.from} — {education.to}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-2">{education.course}</p>
            <p className="mt-1 text-sm text-ink-2">{education.note}</p>
          </div>

          <ul className="mt-7 space-y-3">
            {profile.achievements.map((item) => (
              <li
                key={item.name}
                className="flex flex-col gap-0.5 border-t border-rule pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                data-reveal
              >
                <span className="text-sm font-medium text-ink">
                  {item.name}
                </span>
                <span className="text-[13px] text-ink-3">{item.note}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Contact ─────────────────────────────────────────── */}
        <Section label="Get in touch">
          <div data-reveal>
            <p className="mb-5 max-w-xl text-[15px] leading-relaxed text-ink-2">
              Happy to talk markets, backend systems, or anything you&apos;re
              building. The fastest way to reach me is email.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block break-all font-serif text-xl text-ink underline decoration-accent decoration-1 underline-offset-[6px] transition-colors duration-200 hover:text-accent sm:text-2xl lg:text-3xl"
            >
              {profile.email}
            </a>
          </div>
        </Section>
      </div>

      <footer className="border-t border-rule pt-6 text-[13px] text-ink-3">
        © {new Date().getFullYear()} {profile.fullName}
      </footer>
    </div>
  )
}
