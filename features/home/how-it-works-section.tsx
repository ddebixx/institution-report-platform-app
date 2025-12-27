"use client"

import { useEffect, useRef, useState } from "react"
import {
  FileTextIcon,
  EyeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { twMerge } from "tailwind-merge"

type Step = {
  icon: typeof FileTextIcon
  number: number
  key: "step1" | "step2" | "step3" | "step4"
}

const steps: Step[] = [
  { icon: FileTextIcon, number: 1, key: "step1" },
  { icon: EyeIcon, number: 2, key: "step2" },
  { icon: CheckCircleIcon, number: 3, key: "step3" },
  { icon: ArrowRightIcon, number: 4, key: "step4" },
]

export const HowItWorksSection = () => {
  const t = useTranslations("howItWorks")
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleIntersection() {
      if (!sectionRef.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              steps.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleSteps((prev) => new Set([...prev, index]))
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
      className="relative w-full max-w-[1200px] mx-auto p-6"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/3 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/3 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-8 lg:flex lg:flex-row lg:items-stretch lg:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isVisible = visibleSteps.has(index)
            const isLast = index === steps.length - 1
            const delay = index * 150
            const animationStyle = isVisible
              ? {
                  animation: `scale-in 0.8s ease-out ${delay}ms both`,
                }
              : { opacity: 0 }

            return (
              <>
                <div key={step.key} className="relative flex-1" style={animationStyle}>
                  <div
                    className={twMerge(
                      "group relative flex h-full max-h-[360px] flex-col items-center rounded-2xl border border-border/60 bg-card/80 p-4 shadow-xs backdrop-blur-sm transition-all duration-700",
                      isVisible && "opacity-100 scale-100"
                    )}
                  >
                    <div className="absolute -top-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary text-sm font-bold text-primary-foreground shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                      {step.number}
                    </div>

                    <div className="mb-6 mt-4 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:shadow-xs group-hover:shadow-primary/30">
                      <Icon className="size-10 transition-all duration-300 group-hover:scale-110" />
                    </div>

                    <h3 className="mb-3 text-center text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {t(`${step.key}.title`)}
                    </h3>
                    <p className="text-center text-sm leading-relaxed text-muted-foreground">
                      {t(`${step.key}.desc`)}
                    </p>

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
                    
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
                  </div>
                </div>

                {!isLast && (
                  <div key={`arrow-${index}`} className="hidden items-center justify-center lg:flex lg:flex-shrink-0">
                    <ArrowRightIcon className="size-6 text-primary/40 transition-all duration-300 hover:text-primary/60 hover:drop-shadow-[0_0_4px_rgba(0,0,0,0.1)]" />
                  </div>
                )}
              </>
            )
          })}
        </div>
      </div>
    </section>
  )
}

