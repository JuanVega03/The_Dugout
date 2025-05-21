import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Dugout | MLB Stats & Predictions",
  description: "Your premier destination for MLB statistics, predictions, and betting insights",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>
          {`
            :root {
              --color-hr: hsl(var(--chart-1));
              --color-avg: hsl(var(--chart-2));
              --color-era: hsl(var(--chart-3));
              --color-so: hsl(var(--chart-4));
              --color-wins: hsl(var(--chart-1));
              --color-runs: hsl(var(--chart-2));
              --color-obp: hsl(var(--chart-3));
              --color-slg: hsl(var(--chart-4));
            }
          `}
        </style>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
