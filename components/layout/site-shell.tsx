"use client"

import type React from "react"

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"

type SiteShellProps = {
  children: React.ReactNode
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

