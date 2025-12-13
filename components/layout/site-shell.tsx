"use client"

import type React from "react"

import { useTranslations } from "next-intl"

import { Navbar } from "@/components/layout/navbar"

type SiteShellProps = {
  children: React.ReactNode
}

const Footer = () => {
  const t = useTranslations()

  return (
    <footer className="border-t border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>{t("footer.title")}</span>
        <span>{t("footer.subtitle")}</span>
      </div>
    </footer>
  )
}

export const SiteShell = ({ children }: SiteShellProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

