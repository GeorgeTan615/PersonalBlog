import Link from "next/link"

import { profile } from "@/content/profile"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-site px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal>
            <p className="mb-3 font-mono text-2xs uppercase tracking-label text-ink-3">
              Get in touch
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="font-display text-2xl leading-tight tracking-tight text-ink transition-colors duration-300 hover:text-accent sm:text-3xl"
            >
              {profile.email}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-2">
              Always happy to talk markets, backend systems, or anything
              you&apos;re building.
            </p>
          </div>

          <div className="flex gap-6" data-reveal>
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="block font-mono text-2xs uppercase tracking-label text-ink-3">
                  {social.label}
                </span>
                <span className="mt-1 block text-sm text-ink-2 transition-colors duration-300 group-hover:text-accent">
                  {social.handle} <span aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 font-mono text-2xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.fullName}
          </span>
          <span className="flex items-center gap-4">
            <Link href="/writing" className="transition-colors duration-300 hover:text-accent">
              Writing
            </Link>
            <Link href="/about" className="transition-colors duration-300 hover:text-accent">
              About
            </Link>
            <span className="hidden sm:inline">Built with Next.js</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
