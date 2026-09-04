import { ModeToggle } from "@/components/mode-toggle"
import { profile } from "@/content/profile"

/**
 * Editorial two-column section: the label holds the left rail and stays put
 * while its content scrolls past, so the page has structure without needing
 * boxes drawn around everything.
 */
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
      <div>{children}</div>
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
  const { education } = profile

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:py-24">
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="pb-14" data-reveal>
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

      {/* ── About ─────────────────────────────────────────────── */}
      <Section label="About">
        <div className="max-w-2xl space-y-4" data-reveal>
          {profile.intro.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-relaxed text-ink-2">
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

      {/* ── Experience ────────────────────────────────────────── */}
      <Section label="Experience">
        <div className="space-y-1">
          {profile.roles.map((role) => {
            const period = [role.from, role.to].filter(Boolean).join(" — ")

            return (
              <div
                key={role.company}
                className="-mx-4 rounded-md px-4 py-4 transition-colors duration-300 hover:bg-bg-soft"
                data-reveal
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-base font-semibold text-ink">
                    {role.href ? (
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 hover:text-accent"
                      >
                        {role.company}
                      </a>
                    ) : (
                      role.company
                    )}
                  </h3>
                  {period && (
                    <span className="shrink-0 text-[13px] tabular-nums text-ink-3">
                      {period}
                    </span>
                  )}
                </div>
                {role.title && (
                  <p className="mt-1 text-sm text-ink-2">{role.title}</p>
                )}
                {role.blurb && (
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-2">
                    {role.blurb}
                  </p>
                )}
              </div>
            )
          })}

          <div className="-mx-4 rounded-md px-4 py-4" data-reveal>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="text-base font-semibold text-ink">
                {education.school}
              </h3>
              {education.year && (
                <span className="shrink-0 text-[13px] tabular-nums text-ink-3">
                  {education.year}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-ink-2">{education.course}</p>
          </div>
        </div>
      </Section>

      {/* ── Work ──────────────────────────────────────────────── */}
      <Section label="Selected work">
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.projects.map((project, i) => {
            // An odd count would leave the last card alone in its row, so it
            // takes the full width instead.
            const fillsRow =
              profile.projects.length % 2 === 1 &&
              i === profile.projects.length - 1

            return (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col rounded-lg border border-rule bg-bg-soft/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-3/40 hover:bg-bg-soft ${
                fillsRow ? "sm:col-span-2" : ""
              }`}
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
            )
          })}
        </div>
      </Section>

      {/* ── Skills ────────────────────────────────────────────── */}
      <Section label="Skills">
        <dl className="space-y-6">
          {profile.skills.map((group) => (
            <div
              key={group.group}
              className="sm:grid sm:grid-cols-[7rem_1fr] sm:gap-6"
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

      {/* ── Contact ───────────────────────────────────────────── */}
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

      <footer className="border-t border-rule pt-6 text-[13px] text-ink-3">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  )
}
