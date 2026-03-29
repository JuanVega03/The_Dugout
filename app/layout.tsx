import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "The Dugout | MLB Picks & Predictions",
  description: "Algorithm-powered MLB picks with edge analysis, model win probabilities, and Kelly criterion sizing.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#0a0f1a] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
