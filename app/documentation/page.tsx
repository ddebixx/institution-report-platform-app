"use client"

import { useTranslations } from "next-intl"
import { FileTextIcon, ShieldIcon, SearchIcon, UploadIcon, CheckCircleIcon } from "lucide-react"
import { InteractiveStepper } from "@/components/ui/interactive-stepper"
import { Accordion } from "@/components/ui/accordion"
import { Tabs } from "@/components/ui/tabs"

const DocumentationPage = () => {
  const t = useTranslations("documentation")

  const gettingStartedSteps = [
    {
      number: 1,
      title: t("gettingStarted.step1.title"),
      description: t("gettingStarted.step1.description"),
    },
    {
      number: 2,
      title: t("gettingStarted.step2.title"),
      description: t("gettingStarted.step2.description"),
    },
    {
      number: 3,
      title: t("gettingStarted.step3.title"),
      description: t("gettingStarted.step3.description"),
    },
  ]

  const faqItems = [
    {
      id: "faq-1",
      title: t("faq.q1.question"),
      content: t("faq.q1.answer"),
    },
    {
      id: "faq-2",
      title: t("faq.q2.question"),
      content: t("faq.q2.answer"),
    },
    {
      id: "faq-3",
      title: t("faq.q3.question"),
      content: t("faq.q3.answer"),
    },
  ]

  const featureTabs = [
    {
      id: "secure",
      label: t("features.secure.title"),
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <ShieldIcon className="size-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{t("features.secure.title")}</h3>
          </div>
          <p className="text-muted-foreground">{t("features.secure.description")}</p>
        </div>
      ),
    },
    {
      id: "upload",
      label: t("features.upload.title"),
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <UploadIcon className="size-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{t("features.upload.title")}</h3>
          </div>
          <p className="text-muted-foreground">{t("features.upload.description")}</p>
        </div>
      ),
    },
    {
      id: "search",
      label: t("features.search.title"),
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <SearchIcon className="size-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{t("features.search.title")}</h3>
          </div>
          <p className="text-muted-foreground">{t("features.search.description")}</p>
        </div>
      ),
    },
    {
      id: "tracking",
      label: t("features.tracking.title"),
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="size-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{t("features.tracking.title")}</h3>
          </div>
          <p className="text-muted-foreground">{t("features.tracking.description")}</p>
        </div>
      ),
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-12 sm:px-6">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileTextIcon className="size-6" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">{t("title")}</h1>
        </div>
        <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("overview.title")}</h2>
          <div className="relative overflow-hidden rounded-lg border border-border bg-linear-to-br from-primary/5 to-transparent p-6 shadow-sm">
            <p className="relative z-10 leading-relaxed text-muted-foreground">{t("overview.description")}</p>
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("gettingStarted.title")}</h2>
          <InteractiveStepper steps={gettingStartedSteps} />
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("features.title")}</h2>
          <Tabs tabs={featureTabs} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("bestPractices.title")}</h2>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <ul className="space-y-4 text-muted-foreground">
              <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                  ✓
                </span>
                <span className="leading-relaxed">{t("bestPractices.item1")}</span>
              </li>
              <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                  ✓
                </span>
                <span className="leading-relaxed">{t("bestPractices.item2")}</span>
              </li>
              <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                  ✓
                </span>
                <span className="leading-relaxed">{t("bestPractices.item3")}</span>
              </li>
              <li className="group flex items-start gap-3 transition-all duration-200 hover:translate-x-2">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                  ✓
                </span>
                <span className="leading-relaxed">{t("bestPractices.item4")}</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("faq.title")}</h2>
          <Accordion items={faqItems} />
        </section>
      </div>
    </div>
  )
}

export default DocumentationPage

