import { Sparkline } from "@/components/sparkline"
import type { Project } from "@/content/profile"

const CARD_CLASS =
  "group grid grid-cols-1 items-center gap-5 rounded-sm border border-rule bg-bg-2 px-5 py-5 transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:border-rule-2 sm:grid-cols-[1fr_130px]"

export function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-[15px] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
            {project.name}
          </h3>
          {project.status && (
            <span className="font-mono text-[10px] uppercase tracking-label text-ink-3">
              {project.status}
            </span>
          )}
          {project.href && (
            <span
              className="font-mono text-[10px] text-ink-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            >
              ↗
            </span>
          )}
        </div>

        <p className="mt-1.5 max-w-prose text-[13.5px] leading-relaxed text-ink-2">
          {project.description}
        </p>

        <p className="mt-3 font-mono text-2xs uppercase tracking-label text-accent">
          {project.language}
        </p>
      </div>

      <div className="hidden text-accent sm:block" data-draw aria-hidden="true">
        <Sparkline
          id={project.name.toLowerCase().replace(/\s+/g, "-")}
          values={project.curve}
          width={130}
          height={44}
        />
      </div>
    </>
  )

  if (!project.href) {
    return (
      <div className={CARD_CLASS} data-reveal>
        {body}
      </div>
    )
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={CARD_CLASS}
      data-reveal
    >
      {body}
    </a>
  )
}
