/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx,ts}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      // Every colour resolves through a CSS variable so the two themes
      // swap wholesale. See app/globals.css for the token definitions.
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        "bg-3": "var(--bg-3)",
        rule: "var(--rule)",
        "rule-2": "var(--rule-2)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "on-accent": "var(--on-accent)",
        up: "var(--up)",
        down: "var(--down)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1.4" }],
      },
      letterSpacing: {
        label: "0.18em",
        eyebrow: "0.24em",
      },
      maxWidth: {
        site: "62rem",
        prose: "44rem",
      },
      boxShadow: {
        lift: "var(--shadow)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 0.84, 0.3, 1)",
      },
    },
  },
  plugins: [],
}
