import Link from "next/link"

type SectionProps = {
  id?: string
  title: string
  /** Right-aligned note — a count, a date range, a link label. */
  meta?: string
  metaHref?: string
  children: React.ReactNode
  className?: string
}

export function Section({
  id,
  title,
  meta,
  metaHref,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`border-t border-rule py-16 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-site px-6 sm:px-8">
        <div className="mb-9 flex items-baseline justify-between gap-6" data-reveal>
          <h2 className="font-display text-3xl leading-none tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          {meta &&
            (metaHref ? (
              <Link
                href={metaHref}
                className="shrink-0 font-mono text-2xs uppercase tracking-label text-ink-3 transition-colors duration-300 hover:text-accent"
              >
                {meta} <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <span className="shrink-0 font-mono text-2xs uppercase tracking-label text-ink-3">
                {meta}
              </span>
            ))}
        </div>
        {children}
      </div>
    </section>
  )
}
