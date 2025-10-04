import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "DBT Management System - PCR Act & PoA Act",
  description: "Direct Benefit Transfer Management System for implementing PCR Act & PoA Act",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="light" storageKey="dbt-ui-theme">
          <LanguageProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
