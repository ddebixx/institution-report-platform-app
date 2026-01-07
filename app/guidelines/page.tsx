"use client"

import { useTranslations } from "next-intl"
import { BookOpenIcon, CheckCircleIcon, AlertCircleIcon, FileCheckIcon } from "lucide-react"
import { InteractiveStepper } from "@/components/ui/interactive-stepper"
import { Tabs } from "@/components/ui/tabs"

const GuidelinesPage = () => {
  const t = useTranslations("guidelines")

  const submissionSteps = [
    {
      number: 1,
      title: t("submission.step1.title"),
      description: t("submission.step1.description"),
    },
    {
      number: 2,
      title: t("submission.step2.title"),
      description: t("submission.step2.description"),
    },
    {
      number: 3,
      title: t("submission.step3.title"),
      description: t("submission.step3.description"),
    },
  ]

  const preparationTabs = [
    {
      id: "document",
      label: t("preparation.document.title"),
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FileCheckIcon className="size-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{t("preparation.document.title")}</h3>
          </div>
          <p className="text-muted-foreground">{t("preparation.document.description")}</p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                1
              </span>
              <span className="leading-relaxed">{t("preparation.document.item1")}</span>
            </li>
            <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                2
              </span>
              <span className="leading-relaxed">{t("preparation.document.item2")}</span>
            </li>
            <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                3
              </span>
              <span className="leading-relaxed">{t("preparation.document.item3")}</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "content",
      label: t("preparation.content.title"),
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="size-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{t("preparation.content.title")}</h3>
          </div>
          <p className="text-muted-foreground">{t("preparation.content.description")}</p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                1
              </span>
              <span className="leading-relaxed">{t("preparation.content.item1")}</span>
            </li>
            <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                2
              </span>
              <span className="leading-relaxed">{t("preparation.content.item2")}</span>
            </li>
            <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                3
              </span>
              <span className="leading-relaxed">{t("preparation.content.item3")}</span>
            </li>
          </ul>
        </div>
      ),
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-12 sm:px-6">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpenIcon className="size-6" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">{t("title")}</h1>
        </div>
        <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("preparation.title")}</h2>
          <Tabs tabs={preparationTabs} />
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("submission.title")}</h2>
          <InteractiveStepper steps={submissionSteps} />
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("requirements.title")}</h2>
          <div className="relative overflow-hidden rounded-lg border border-destructive/20 bg-destructive/5 p-6 shadow-sm">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/20 text-destructive">
                  <AlertCircleIcon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t("requirements.important")}</h3>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/20 text-destructive transition-all duration-200 group-hover:bg-destructive group-hover:text-white">
                    !
                  </span>
                  <span className="leading-relaxed">{t("requirements.item1")}</span>
                </li>
                <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/20 text-destructive transition-all duration-200 group-hover:bg-destructive group-hover:text-white">
                    !
                  </span>
                  <span className="leading-relaxed">{t("requirements.item2")}</span>
                </li>
                <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/20 text-destructive transition-all duration-200 group-hover:bg-destructive group-hover:text-white">
                    !
                  </span>
                  <span className="leading-relaxed">{t("requirements.item3")}</span>
                </li>
                <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/20 text-destructive transition-all duration-200 group-hover:bg-destructive group-hover:text-white">
                    !
                  </span>
                  <span className="leading-relaxed">{t("requirements.item4")}</span>
                </li>
              </ul>
            </div>
            
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-destructive/10 blur-3xl" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("compliance.title")}</h2>
          <div className="relative overflow-hidden rounded-lg border border-border bg-linear-to-br from-primary/5 to-transparent p-6 shadow-sm">
            <p className="relative z-10 leading-relaxed text-muted-foreground">{t("compliance.description")}</p>
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </section>
      </div>
    </div>
  )
}

export default GuidelinesPage

