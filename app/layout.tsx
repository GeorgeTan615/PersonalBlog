import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google"

import "./globals.css"
import { Analytics } from "@/components/analytics"
import { Reveal } from "@/components/reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/content/profile"

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  // Next has no metric overrides for this face, so name the fallback
  // explicitly rather than letting it drop to an unstyled default.
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: false,
})

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata = {
  title: {
    default: `${profile.fullName} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  openGraph: {
    title: `${profile.fullName} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-on-accent"
          >
            Skip to content
          </a>

          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />

          <Reveal />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
