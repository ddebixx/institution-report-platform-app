"use client"

import { useEffect, useRef, useState } from "react"
import {
  EyeIcon,
  ShieldIcon,
  ZapIcon,
  FileCheckIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { twMerge } from "tailwind-merge"

type Benefit = {
  icon: typeof EyeIcon
  key: "efficiency" | "compliance"
}

const benefits: Benefit[] = [
  { icon: ZapIcon, key: "efficiency" },
  { icon: FileCheckIcon, key: "compliance" },
]

export const BenefitsSection = () => {
  const t = useTranslations("benefits")
  const [visibleBenefits, setVisibleBenefits] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleIntersection() {
      if (!sectionRef.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              benefits.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleBenefits((prev) => new Set([...prev, index]))
                }, index * 120)
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
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.03),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.03),transparent_50%)]" />
      </div>

      <div className="relative z-10 mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-2">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          const isVisible = visibleBenefits.has(index)
          const delay = index * 120
          const animationStyle = isVisible
            ? index % 2 === 0
              ? { animation: `slide-in-left 0.8s ease-out ${delay}ms both` }
              : { animation: `slide-in-right 0.8s ease-out ${delay}ms both` }
            : { opacity: 0 }

          return (
            <div
              key={benefit.key}
              className={twMerge(
                "group relative overflow-hidden rounded-2xl border border-border/20 bg-background/90 p-8 shadow-xs backdrop-blur-sm transition-all duration-700",
                isVisible && "opacity-100"
              )}
              style={animationStyle}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]" />

              <div className="relative z-10 flex gap-6">
                <div className="shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:shadow-xs group-hover:shadow-primary/30">
                    <Icon className="size-8 transition-all duration-300 group-hover:scale-110" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {t(`${benefit.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`${benefit.key}.desc`)}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              
              <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

