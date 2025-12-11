import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { SiteShell } from "@/components/layout/site-shell"

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Institution Report Platform",
  description: "Submit institution reports securely and access the admin area.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  )
}
