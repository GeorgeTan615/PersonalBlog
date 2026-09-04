import { Public_Sans, Source_Serif_4 } from "next/font/google"

import "./globals.css"
import { Analytics } from "@/components/analytics"
import { Reveal } from "@/components/reveal"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/content/profile"

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: `${profile.title} in ${profile.location}, working on backend systems in finance and crypto.`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Reveal />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
