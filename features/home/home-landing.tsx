"use client"

import { useCallback, useMemo, useState } from "react"
import { ArrowRightIcon, FileTextIcon, ShieldIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RegulationsSection } from "@/features/home/regulations-section"
import { ReportModal } from "@/features/reports/report-modal"
import { useAuthContext } from "@/components/auth/auth-provider"
import { useAuthModal } from "@/components/auth/auth-modal-provider"
import { useTranslations } from "next-intl"

export const HomeLanding = () => {
  const { user } = useAuthContext()
  const { openLogin } = useAuthModal()
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false)
  const t = useTranslations()

  const openReportModal = useCallback(() => {
    setIsReportModalOpen(true)
  }, [])

  const closeReportModal = useCallback(() => {
    setIsReportModalOpen(false)
  }, [])

  const isAuthenticated = useMemo(() => Boolean(user), [user])

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 text-foreground">
      <main className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pb-16 pt-12">
        <section className="grid w-full gap-10 rounded-2xl bg-card/70 p-10 shadow-xl backdrop-blur-md md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldIcon className="size-4" />
              {t("hero.badge")}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="font-semibold"
                onClick={openReportModal}
              >
                <FileTextIcon className="size-5" />
                {t("hero.cta.submit")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold"
                onClick={isAuthenticated ? openReportModal : openLogin}
              >
                <ArrowRightIcon className="size-5" />
                {isAuthenticated ? t("hero.cta.continue") : t("hero.cta.login")}
              </Button>
            </div>
          </div>

          <div className="grid gap-4 rounded-xl border border-border/60 bg-white p-6 shadow-lg">
            <div className="rounded-lg bg-primary/5 p-4">
              <p className="text-sm text-muted-foreground">
                {t("info.purpose.title")}:
                <span className="font-semibold text-foreground"> {t("info.purpose.desc")}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {t("info.flow.title")}:
                <span className="font-semibold text-foreground"> {t("info.flow.desc")}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="rounded-lg border border-border/60 p-3">
                <p className="text-xs font-semibold text-primary">
                  {t("info.auth.title")}
                </p>
                <p>{t("info.auth.desc")}</p>
              </div>
              <div className="rounded-lg border border-border/60 p-3">
                <p className="text-xs font-semibold text-primary">{t("info.evidence.title")}</p>
                <p>{t("info.evidence.desc")}</p>
              </div>
              <div className="rounded-lg border border-border/60 p-3">
                <p className="text-xs font-semibold text-primary">{t("info.details.title")}</p>
                <p>{t("info.details.desc")}</p>
              </div>
              <div className="rounded-lg border border-border/60 p-3">
                <p className="text-xs font-semibold text-primary">{t("info.dashboard.title")}</p>
                <p>{t("info.dashboard.desc")}</p>
              </div>
            </div>
          </div>
        </section>

        <RegulationsSection />
      </main>
      <ReportModal open={isReportModalOpen} onClose={closeReportModal} />
    </div>
  )
}

