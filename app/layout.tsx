import Link from "next/link"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"

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
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between my-5 text-sm">
                <Link href="/" className="font-semibold">George's Safe Space</Link>
                <nav className="ml-auto font-medium space-x-6 flex items-center justify-between">
                  <ModeToggle />
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                </nav>
              </div>
              {/* <hr /> */}
            </header>
            <main className="mt-8">{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
