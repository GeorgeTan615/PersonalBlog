import Link from "next/link"
import { Metadata } from "next"
import { allPosts } from "contentlayer/generated"

import { formatMonthYear, groupPostsByYear } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on markets, backend engineering and whatever I've most recently taken apart.",
}

export default function WritingPage() {
  const years = groupPostsByYear(allPosts)
  const total = allPosts.length

  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-site px-6 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
          <p
            className="mb-5 font-mono text-2xs uppercase tracking-eyebrow text-accent"
            data-reveal
          >
            {total} {total === 1 ? "essay" : "essays"}
          </p>
          <h1
            className="mb-5 max-w-[16ch] font-display text-[2.5rem] leading-[1.06] tracking-tight text-ink sm:text-6xl"
            data-reveal
          >
            Writing
          </h1>
          <p
            className="max-w-prose text-[15px] leading-[1.75] text-ink-2"
            data-reveal
          >
            Mostly markets and backend engineering — equity write-ups, how
            Bitcoin actually works under the hood, books worth the time, and the
            occasional bad day at work. I write things down because it&apos;s the
            fastest way to find out whether I really understood them.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-site px-6 py-14 sm:px-8 sm:py-16">
        {years.map(([year, posts]) => (
          <section key={year} className="mb-14 last:mb-0">
            <div
              className="mb-5 flex items-center gap-4 border-b border-rule pb-3"
              data-reveal
            >
              <h2 className="font-mono text-2xs uppercase tracking-label text-ink-3 tnum">
                {year}
              </h2>
              <span className="font-mono text-2xs text-ink-3">
                {posts.length}
              </span>
            </div>

            <div>
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={post.slug}
                  className="sweep group relative grid grid-cols-1 gap-x-6 gap-y-1 border-b border-rule py-5 sm:grid-cols-[1fr_auto] sm:items-baseline"
                  data-reveal
                >
                  <div className="relative z-10">
                    <h3 className="text-base font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="mt-1.5 max-w-prose text-[13.5px] leading-relaxed text-ink-2">
                        {post.description}
                      </p>
                    )}
                  </div>

                  <div className="relative z-10 flex items-baseline gap-4 font-mono text-2xs text-ink-3 tnum sm:flex-col sm:items-end sm:gap-1">
                    <span className="whitespace-nowrap">
                      {formatMonthYear(post.date)}
                    </span>
                    <span className="whitespace-nowrap">
                      {post.readTimeMinutes}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
