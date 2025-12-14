"use client"

import { useEffect, useRef, useState } from "react"
import { FileIcon, ShieldIcon, SparklesIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { twMerge } from "tailwind-merge"

type Regulation = {
  icon: typeof FileIcon
  key: "primary" | "secondary" | "tertiary"
}

const regulations: Regulation[] = [
  { icon: FileIcon, key: "primary" },
  { icon: ShieldIcon, key: "secondary" },
  { icon: SparklesIcon, key: "tertiary" },
]

export const RegulationsSection = () => {
  const t = useTranslations("regulations")
  const [visibleRegulations, setVisibleRegulations] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleIntersection() {
      if (!sectionRef.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              regulations.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleRegulations((prev) => new Set([...prev, index]))
                }, index * 150)
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
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/3 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/3 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <FileIcon className="size-4" />
          {t("title")}
        </div>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-3">
        {regulations.map((regulation, index) => {
          const Icon = regulation.icon
          const isVisible = visibleRegulations.has(index)
          const delay = index * 150
          const animationStyle = isVisible
            ? {
                animation: `scale-in 0.6s ease-out ${delay}ms both`,
              }
            : { opacity: 0 }

          return (
            <article
              key={regulation.key}
              className={twMerge(
                "group relative overflow-hidden rounded-2xl border border-border/60 bg-background/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-700",
                isVisible && "opacity-100 scale-100"
              )}
              style={animationStyle}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3 text-primary">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <Icon className="size-5 transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                    {t(`${regulation.key}.name`)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`${regulation.key}.desc`)}
                </p>
              </div>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]" />
            </article>
          )
        })}
      </div>
    </section>
  )
}

