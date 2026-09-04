"use client"

import { useEffect } from "react"

/**
 * Fades blocks in as they scroll into view.
 *
 * Blocks opt in with `data-reveal` and stay visible until this mounts and
 * adds `js` to <html>, so the page reads fine if the script never runs.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    root.classList.add("js")

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    )

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-shown"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement

          const siblings = el.parentElement
            ? Array.from(el.parentElement.children).filter((n) =>
                n.hasAttribute("data-reveal")
              )
            : []
          const index = Math.max(0, siblings.indexOf(el))

          window.setTimeout(
            () => el.classList.add("is-shown"),
            reduce ? 0 : Math.min(index, 5) * 60
          )

          observer.unobserve(el)
        })
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 }
    )

    targets.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      root.classList.remove("js")
    }
  }, [])

  return null
}
