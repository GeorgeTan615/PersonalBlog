import Link from "next/link"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { GitHubLogo } from "@/components/github-logo"
import { LinkedInLogo } from "@/components/linkedin-logo"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "George's Safe Space",
  description: "Personal site for blogging",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-8">
            <header>
              <div className="flex items-center justify-between my-5 text-md">
                <Link href="/" className="font-semibold">George&apos;s Safe Space</Link>
                <nav className="ml-auto text-sm font-medium space-x-3 flex items-center justify-between">
                  <ModeToggle />
                  <LinkedInLogo link="https://www.linkedin.com/in/georgetanjs"/>
                  <GitHubLogo link="https://github.com/GeorgeTan615"/>
                  <Link href="/about">About</Link>
                </nav>
              </div>
            </header>
            <main className="mt-8">{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
