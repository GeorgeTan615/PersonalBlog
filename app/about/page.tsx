import { Metadata } from "next"
import { notFound } from "next/navigation"
import { allPages } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"
import { profile } from "@/content/profile"

const page = () => allPages.find((p) => p.slugAsParams === "about")

export const metadata: Metadata = {
  title: "About",
  description: page()?.description ?? profile.tagline,
}

export default function AboutPage() {
  const about = page()

  if (!about) {
    notFound()
  }

  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-site px-6 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
          <p
            className="mb-5 font-mono text-2xs uppercase tracking-eyebrow text-accent"
            data-reveal
          >
            {profile.role} · {profile.location}
          </p>
          <h1
            className="mb-6 max-w-[14ch] font-display text-[2.5rem] leading-[1.06] tracking-tight text-ink sm:text-6xl"
            data-reveal
          >
            {profile.fullName}
          </h1>
          <p
            className="max-w-prose text-[15px] leading-[1.75] text-ink-2"
            data-reveal
          >
            {profile.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-site gap-12 px-6 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1fr_15rem] lg:gap-16">
        <div className="prose-site max-w-prose" data-reveal>
          <Mdx code={about.body.code} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border-t border-rule pt-5" data-reveal>
            <p className="mb-4 font-mono text-2xs uppercase tracking-label text-ink-3">
              Currently
            </p>
            <ul className="space-y-3">
              {profile.now.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-2"
                >
                  <span
                    className="mt-[7px] block h-1 w-1 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-9 border-t border-rule pt-5" data-reveal>
            <p className="mb-4 font-mono text-2xs uppercase tracking-label text-ink-3">
              Elsewhere
            </p>
            <ul className="space-y-2.5">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13.5px] text-ink-2 transition-colors duration-300 hover:text-accent"
                  >
                    {social.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[13.5px] text-ink-2 transition-colors duration-300 hover:text-accent"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}
