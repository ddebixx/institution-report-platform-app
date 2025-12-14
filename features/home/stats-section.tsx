"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { twMerge } from "tailwind-merge"

type Stat = {
  key: "reportsSubmitted" | "activeModerators" | "avgResponseTime" | "complianceRate"
  value: string
  suffix?: string
}

const stats: Stat[] = [
  { key: "reportsSubmitted", value: "10K+", suffix: "" },
  { key: "activeModerators", value: "50+", suffix: "" },
  { key: "avgResponseTime", value: "24", suffix: "h" },
  { key: "complianceRate", value: "99.9", suffix: "%" },
]

export const StatsSection = () => {
  const t = useTranslations("stats")
  const [visibleStats, setVisibleStats] = useState<Set<number>>(new Set())
  const [animatedValues, setAnimatedValues] = useState<Record<number, number>>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleIntersection() {
      if (!sectionRef.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              stats.forEach((stat, index) => {
                setTimeout(() => {
                  setVisibleStats((prev) => new Set([...prev, index]))
                 
                  const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ""))
                 
                  if (!isNaN(numericValue) && numericValue > 0) {
                    const duration = 2000
                    const steps = 60
                    const increment = numericValue / steps
                    let current = 0

                    const timer = setInterval(() => {
                      current += increment
                      if (current >= numericValue) {
                        current = numericValue
                        clearInterval(timer)
                      }
                      setAnimatedValues((prev) => ({ ...prev, [index]: current }))
                    }, duration / steps)
                  } else {
                    setAnimatedValues((prev) => ({ ...prev, [index]: 0 }))
                  }
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
      className="relative w-full p-6 sm:p-12"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary/15 animate-ping" style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/2 right-1/4 h-2 w-2 rounded-full bg-primary/15 animate-ping" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-1/4 left-1/2 h-2 w-2 rounded-full bg-primary/15 animate-ping" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h2>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const isVisible = visibleStats.has(index)
          const animatedValue = animatedValues[index]
          const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ""))
          const delay = index * 100
          const rotation = index % 2 === 0 ? "rotate-1" : "-rotate-1"
          
          let displayValue = stat.value
          if (!isNaN(numericValue) && numericValue > 0 && animatedValue !== undefined) {
            const formatted = animatedValue.toFixed(stat.suffix === "%" ? 1 : 0)
            if (stat.value.includes("K")) {
              displayValue = `${(animatedValue / 1000).toFixed(0)}K+`
            } else if (stat.value.includes("+")) {
              displayValue = `${formatted}+`
            } else {
              displayValue = `${formatted}${stat.suffix || ""}`
            }
          }

          return (
            <div
              key={stat.key}
              className={twMerge(
                "group relative overflow-hidden rounded-2xl border border-border/60 bg-background/90 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-700 sm:p-8",
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              )}
              style={{
                animationDelay: `${delay}ms`,
                ...(isVisible && {
                  animation: `scale-in 0.6s ease-out ${delay}ms both`,
                }),
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

              <div className="relative z-10">
                <div className="mb-2 text-5xl font-bold text-primary transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                  {displayValue}
                  {stat.suffix && <span className="text-3xl">{stat.suffix}</span>}
                </div>
                <div className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {t(stat.key)}
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

