"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { ModeToggle } from "@/components/mode-toggle"
import { profile } from "@/content/profile"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
]

export function SiteNav() {
  const pathname = usePathname()
  const [lifted, setLifted] = useState(false)

  // The bar gains its rule and blur only once the page has moved, so the
  // top of the site reads as one uninterrupted surface.
  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        lifted
          ? "nav-blur border-b border-rule"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="font-display text-xl leading-none tracking-tight text-ink transition-colors duration-300 hover:text-accent"
        >
          {profile.name}
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={isActive(link.href)}
              className="wipe relative text-[13px] font-medium text-ink-2 transition-colors duration-300 hover:text-ink data-[active=true]:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
