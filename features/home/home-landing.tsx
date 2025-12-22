"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowRightIcon, FileTextIcon, ShieldIcon } from "lucide-react"
import { twMerge } from "tailwind-merge"

import { Button } from "@/components/ui/button"
import { RegulationsSection } from "@/features/home/regulations-section"
import { FeaturesSection } from "@/features/home/features-section"
import { HowItWorksSection } from "@/features/home/how-it-works-section"
import { BenefitsSection } from "@/features/home/benefits-section"
import { StatsSection } from "@/features/home/stats-section"
import { ReportModal } from "@/features/reports/report-modal"
import { useAuthContext } from "@/components/auth/auth-provider"
import { useAuthModal } from "@/components/auth/auth-modal-provider"
import { useTranslations } from "next-intl"

export const HomeLanding = () => {
  const { user } = useAuthContext()
  const { openLogin } = useAuthModal()
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const t = useTranslations()

  const openReportModal = useCallback(() => {
    setIsReportModalOpen(true)
  }, [])

  const closeReportModal = useCallback(() => {
    setIsReportModalOpen(false)
  }, [])

  const isAuthenticated = useMemo(() => Boolean(user), [user])

  useEffect(() => {
    function initializeHeroAnimation() {
      if (!heroRef.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHeroVisible(true)
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(heroRef.current)

      return () => {
        observer.disconnect()
      }
    }

    initializeHeroAnimation()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-foreground">
      <main className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 pb-24 pt-16 sm:px-6">
        <section
          ref={heroRef}
          className={twMerge(
            "relative w-full p-6 transition-all duration-1000 sm:p-12",
            heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="space-y-8">
              <div 
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary backdrop-blur-sm transition-all duration-500 hover:bg-primary/20 hover:scale-105 hover:shadow-xs hover:shadow-primary/20"
                style={{
                  animation: heroVisible ? "scale-in 0.6s ease-out 0ms both" : undefined
                }}
              >
                <ShieldIcon className="size-4 transition-all duration-300" />
                {t("hero.badge")}
              </div>
              <h1 
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                style={{
                  animation: heroVisible ? "slide-in-left 0.8s ease-out 200ms both" : undefined
                }}
              >
                {t("hero.title")}
              </h1>
              <p 
                className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground"
                style={{
                  animation: heroVisible ? "slide-in-right 0.8s ease-out 400ms both" : undefined
                }}
              >
                {t("hero.subtitle")}
              </p>
              <div 
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                style={{
                  animation: heroVisible ? "scale-in 0.6s ease-out 600ms both" : undefined
                }}
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xs hover:shadow-primary/30"
                  onClick={openReportModal}
                >
                  <FileTextIcon className="size-5 transition-all duration-300" />
                  {t("hero.cta.submit")}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group font-semibold transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-xs"
                  onClick={isAuthenticated ? openReportModal : openLogin}
                >
                  <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                  {isAuthenticated ? t("hero.cta.continue") : t("hero.cta.login")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features">
          <FeaturesSection />
        </section>

        <section id="how-it-works">
          <HowItWorksSection />
        </section>

        <section id="benefits">
          <BenefitsSection />
        </section>

        <StatsSection />

        <section id="regulations">
          <RegulationsSection />
        </section>
      </main>
      <ReportModal open={isReportModalOpen} onClose={closeReportModal} />
    </div>
  )
}

