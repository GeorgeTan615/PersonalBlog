"use client"

import { useEffect } from "react"

/**
 * Drives every scroll-triggered animation on the site.
 *
 * Elements opt in with `data-reveal` (fade + rise) or `data-draw`
 * (charts inking themselves in). Both are *visible* until this mounts
 * and adds `js` to <html>, so a page that never runs JS still reads
 * correctly — the animation is an enhancement, never a gate.
 *
 * Siblings within a group are staggered so a section arrives as a wave.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    root.classList.add("js")

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal],[data-draw]")
    )

    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-shown"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement

          const siblings = el.parentElement
            ? Array.from(el.parentElement.children).filter(
                (n) =>
                  n.hasAttribute("data-reveal") || n.hasAttribute("data-draw")
              )
            : []
          const index = Math.max(0, siblings.indexOf(el))

          window.setTimeout(
            () => el.classList.add("is-shown"),
            reduce ? 0 : Math.min(index, 6) * 70
          )

          observer.unobserve(el)
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    )

    targets.forEach((t) => observer.observe(t))

    return () => {
      observer.disconnect()
      root.classList.remove("js")
    }
  }, [])

  return null
}
