import { ModeToggle } from "@/components/mode-toggle"
import { profile } from "@/content/profile"

/** Section wrapper — a quiet heading and a stack of rows beneath it. */
function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-16" data-reveal>
      <h2 className="mb-6 font-serif text-lg font-normal text-ink">{title}</h2>
      {children}
    </section>
  )
}

export default function Home() {
  const { education } = profile

  return (
    <div className="mx-auto max-w-page px-6 py-16 sm:py-24">
      <header className="flex items-start justify-between gap-6" data-reveal>
        <div>
          <h1 className="font-serif text-3xl font-normal tracking-tight text-ink">
            {profile.name}
          </h1>
          <p className="mt-1.5 text-sm text-ink-2">
            {profile.title} · {profile.location}
          </p>
        </div>
        <ModeToggle />
      </header>

      <div className="mt-8 space-y-4" data-reveal>
        {profile.intro.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-ink">
            {paragraph}
          </p>
        ))}
      </div>

      {/* ── What I'm into ─────────────────────────────────────── */}
      <Section title="What I'm into">
        <div className="space-y-7">
          {profile.interests.map((item) => (
            <div key={item.heading}>
              <h3 className="mb-1.5 text-[15px] font-semibold text-ink">
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
      <Section title="Experience">
        <div className="space-y-6">
          {profile.roles.map((role) => {
            const period = [role.from, role.to].filter(Boolean).join(" — ")

            return (
              <div key={role.company}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[15px] font-semibold text-ink">
                    {role.href ? (
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="decoration-rule underline-offset-4 hover:underline"
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
                  <p className="mt-0.5 text-[14px] text-ink-2">{role.title}</p>
                )}
                {role.blurb && (
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">
                    {role.blurb}
                  </p>
                )}
              </div>
            )
          })}

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[15px] font-semibold text-ink">
                {education.school}
              </h3>
              {education.year && (
                <span className="shrink-0 text-[13px] tabular-nums text-ink-3">
                  {education.year}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[14px] text-ink-2">{education.course}</p>
          </div>
        </div>
      </Section>

      {/* ── Projects ──────────────────────────────────────────── */}
      <Section title="Things I've built">
        <div className="space-y-5">
          {profile.projects.map((project) => (
            <div key={project.name}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[15px] font-semibold text-ink">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-200 hover:text-accent"
                    >
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <span className="shrink-0 text-[13px] text-ink-3">
                  {project.tech}
                </span>
              </div>
              <p className="mt-1 text-[14px] leading-relaxed text-ink-2">
                {project.blurb}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Contact ───────────────────────────────────────────── */}
      <Section title="Get in touch">
        <a
          href={`mailto:${profile.email}`}
          className="text-[15px] text-ink underline decoration-accent underline-offset-4 transition-colors duration-200 hover:text-accent"
        >
          {profile.email}
        </a>

        <div className="mt-4 flex gap-5">
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-ink-2 transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Section>

      <footer className="mt-20 border-t border-rule pt-6 text-[13px] text-ink-3">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  )
}
