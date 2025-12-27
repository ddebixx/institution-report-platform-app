"use client"

import { useTranslations } from "next-intl"
import { BookOpenIcon, CheckCircleIcon, AlertCircleIcon, FileCheckIcon } from "lucide-react"

const GuidelinesPage = () => {
  const t = useTranslations("guidelines")

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6">
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
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <FileCheckIcon className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{t("preparation.document.title")}</h3>
              </div>
              <p className="mb-3 text-muted-foreground">{t("preparation.document.description")}</p>
              <ul className="ml-8 space-y-2 text-sm text-muted-foreground">
                <li className="list-disc">{t("preparation.document.item1")}</li>
                <li className="list-disc">{t("preparation.document.item2")}</li>
                <li className="list-disc">{t("preparation.document.item3")}</li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <CheckCircleIcon className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{t("preparation.content.title")}</h3>
              </div>
              <p className="mb-3 text-muted-foreground">{t("preparation.content.description")}</p>
              <ul className="ml-8 space-y-2 text-sm text-muted-foreground">
                <li className="list-disc">{t("preparation.content.item1")}</li>
                <li className="list-disc">{t("preparation.content.item2")}</li>
                <li className="list-disc">{t("preparation.content.item3")}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("submission.title")}</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 text-lg font-semibold text-foreground">{t("submission.step1.title")}</h3>
              <p className="text-muted-foreground">{t("submission.step1.description")}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 text-lg font-semibold text-foreground">{t("submission.step2.title")}</h3>
              <p className="text-muted-foreground">{t("submission.step2.description")}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 text-lg font-semibold text-foreground">{t("submission.step3.title")}</h3>
              <p className="text-muted-foreground">{t("submission.step3.description")}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("requirements.title")}</h2>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <AlertCircleIcon className="size-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">{t("requirements.important")}</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">•</span>
                <span>{t("requirements.item1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">•</span>
                <span>{t("requirements.item2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">•</span>
                <span>{t("requirements.item3")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">•</span>
                <span>{t("requirements.item4")}</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("compliance.title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("compliance.description")}</p>
        </section>
      </div>
    </div>
  )
}

export default GuidelinesPage

