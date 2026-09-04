import Link from "next/link"
import { allPosts } from "contentlayer/generated"

import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/section"
import { Sparkline } from "@/components/sparkline"
import { Ticker } from "@/components/ticker"
import { profile } from "@/content/profile"
import { formatMonthYear, sortPostsByDate } from "@/lib/posts"

/** Ambient market line behind the hero — decorative, deliberately quiet. */
const HERO_CURVE = [
  120, 140, 128, 168, 150, 196, 180, 222, 205, 248, 232, 268, 250, 282, 262,
  290, 272, 296,
]

export default function Home() {
  const posts = sortPostsByDate(allPosts).slice(0, 4)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-[-38%] h-[560px] w-[820px] max-w-none -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--glow), transparent 68%)",
          }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] text-accent opacity-[0.18]"
          style={{
            maskImage: "linear-gradient(to top, #000 20%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(to top, #000 20%, transparent 92%)",
          }}
          data-draw
          aria-hidden="true"
        >
          <Sparkline
            id="hero"
            values={HERO_CURVE}
            width={900}
            height={300}
            strokeWidth={1.5}
            endpoint={false}
            padX={0}
            padY={0}
            fluid
            className="h-full w-full"
          />
        </div>

        <div className="relative mx-auto max-w-site px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
          <p
            className="mb-6 flex items-center gap-3 font-mono text-2xs uppercase tracking-eyebrow text-accent"
            data-reveal
          >
            <span
              className="block h-1.5 w-1.5 rounded-full bg-up animate-pulse-ring"
              aria-hidden="true"
            />
            {profile.role} · {profile.location}
          </p>

          <h1
            className="mb-7 max-w-[15ch] font-display text-[2.75rem] leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            data-reveal
          >
            {profile.hero.lead}{" "}
            <em className="not-italic text-accent">
              <span className="italic">{profile.hero.accent}</span>
            </em>
          </h1>

          <p
            className="mb-9 max-w-prose text-[15px] leading-[1.75] text-ink-2 sm:text-base"
            data-reveal
          >
            {profile.intro}
          </p>

          <div className="flex flex-wrap items-center gap-3" data-reveal>
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-lift"
            >
              See the work <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 rounded-sm border border-rule px-5 py-2.5 text-sm font-medium text-ink-2 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-ink"
            >
              Read the writing
            </Link>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ── Stat strip ───────────────────────────────────────── */}
      <div className="border-b border-rule">
        <div className="mx-auto grid max-w-site grid-cols-1 px-6 sm:grid-cols-3 sm:px-8">
          {profile.stats.map((stat, i) => (
            <div
              key={stat.key}
              className={`py-6 ${
                i > 0
                  ? "border-t border-rule sm:border-l sm:border-t-0 sm:pl-6"
                  : ""
              } ${i < profile.stats.length - 1 ? "sm:pr-6" : ""}`}
              data-reveal
            >
              <p className="mb-2 font-mono text-2xs uppercase tracking-label text-ink-3">
                {stat.key}
              </p>
              <p className="font-display text-2xl leading-none text-ink tnum">
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] text-ink-2">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Positions ────────────────────────────────────────── */}
      <Section title="Where I've been" meta="Experience" id="experience">
        <div>
          {profile.positions.map((position, i) => {
            const period = [position.start, position.end]
              .filter(Boolean)
              .join(" — ")

            return (
              <div
                key={`${position.company}-${i}`}
                className="sweep relative grid grid-cols-1 gap-x-6 gap-y-1 border-b border-rule py-5 sm:grid-cols-[1fr_auto] sm:items-baseline"
                data-reveal
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-base font-semibold tracking-tight text-ink">
                      {position.href ? (
                        <a
                          href={position.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-300 hover:text-accent"
                        >
                          {position.company || "—"}
                        </a>
                      ) : (
                        position.company || "—"
                      )}
                    </h3>
                    {position.kind === "education" && (
                      <span className="font-mono text-2xs uppercase tracking-label text-ink-3">
                        Education
                      </span>
                    )}
                    {position.end === "Present" && (
                      <span className="rounded-sm border border-rule-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-accent">
                        Current
                      </span>
                    )}
                  </div>

                  {position.role && (
                    <p className="mt-1 text-[13.5px] text-ink-2">{position.role}</p>
                  )}
                  {position.summary && (
                    <p className="mt-2 max-w-prose text-[13.5px] leading-relaxed text-ink-2">
                      {position.summary}
                    </p>
                  )}

                  {position.highlights && position.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {position.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-2"
                        >
                          <span className="mt-[7px] block h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {position.stack && position.stack.length > 0 && (
                    <p className="mt-3 font-mono text-2xs uppercase tracking-label text-ink-3">
                      {position.stack.join(" · ")}
                    </p>
                  )}
                </div>

                <p className="relative z-10 whitespace-nowrap font-mono text-2xs text-ink-3 tnum sm:text-right">
                  {period || "—"}
                </p>
              </div>
            )
          })}
        </div>

      </Section>

      {/* ── Selected work ────────────────────────────────────── */}
      <Section
        title="Selected work"
        meta={`${profile.projects.length} projects`}
        id="work"
      >
        <div className="space-y-3">
          {profile.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </Section>

      {/* ── Writing ──────────────────────────────────────────── */}
      <Section title="Writing" meta="All essays" metaHref="/writing" id="writing">
        <div>
          {posts.map((post) => (
            <Link
              key={post._id}
              href={post.slug}
              className="sweep group relative grid grid-cols-1 gap-x-6 gap-y-1 border-b border-rule py-4 sm:grid-cols-[1fr_auto] sm:items-baseline"
              data-reveal
            >
              <div className="relative z-10">
                <h3 className="text-[15px] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="mt-1 max-w-prose text-[13.5px] leading-relaxed text-ink-2">
                    {post.description}
                  </p>
                )}
              </div>
              <p className="relative z-10 whitespace-nowrap font-mono text-2xs text-ink-3 tnum sm:text-right">
                {formatMonthYear(post.date)}
              </p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
