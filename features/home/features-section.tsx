"use client"

import { useEffect, useRef, useState } from "react"
import {
  FileTextIcon,
  ShieldCheckIcon,
  SearchIcon,
  CheckCircleIcon,
  LayoutDashboardIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { twMerge } from "tailwind-merge"

type Feature = {
  icon: typeof FileTextIcon
  key: "pdf" | "regulations" | "moderation" | "dashboard"
}

const features: Feature[] = [
  { icon: FileTextIcon, key: "pdf" },
  { icon: SearchIcon, key: "regulations" },
  { icon: CheckCircleIcon, key: "moderation" },
  { icon: LayoutDashboardIcon, key: "dashboard" },
]

export const FeaturesSection = () => {
  const t = useTranslations("features")
  const [visibleFeatures, setVisibleFeatures] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleIntersection() {
      if (!sectionRef.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              features.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleFeatures((prev) => new Set([...prev, index]))
                }, index * 100)
              })
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(sectionRef.current)

      return () => {
        observer.disconnect()
      }
    }

    handleIntersection()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full p-6"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/2 via-transparent to-primary/2 opacity-30 animate-pulse" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />

      <div className="relative z-10 mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <ShieldCheckIcon className="size-4" />
          {t("title")}
        </div>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => {
          const Icon = feature.icon
          const isVisible = visibleFeatures.has(index)
          const delay = index * 100

          return (
            <div
              key={feature.key}
              className={twMerge(
                "group relative overflow-hidden rounded-2xl border border-border/20 bg-background/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-700",
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-12 opacity-0 scale-95"
              )}
              style={{
                animationDelay: `${delay}ms`,
                ...(isVisible && {
                  animation: `scale-in 0.6s ease-out ${delay}ms both`,
                }),
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 transition-all duration-500 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5" />
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]" />

              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-xs group-hover:shadow-primary/20">
                  <Icon className="size-6 transition-all duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`${feature.key}.desc`)}
                </p>
              </div>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

