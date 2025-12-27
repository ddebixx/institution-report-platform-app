"use client"

import { useTranslations } from "next-intl"
import { FileTextIcon, ShieldIcon, SearchIcon, UploadIcon, CheckCircleIcon } from "lucide-react"

const DocumentationPage = () => {
  const t = useTranslations("documentation")

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6">
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
          <p className="leading-relaxed text-muted-foreground">{t("overview.description")}</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("gettingStarted.title")}</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t("gettingStarted.step1.title")}</h3>
              </div>
              <p className="ml-11 text-muted-foreground">{t("gettingStarted.step1.description")}</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t("gettingStarted.step2.title")}</h3>
              </div>
              <p className="ml-11 text-muted-foreground">{t("gettingStarted.step2.description")}</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t("gettingStarted.step3.title")}</h3>
              </div>
              <p className="ml-11 text-muted-foreground">{t("gettingStarted.step3.description")}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("features.title")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <ShieldIcon className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{t("features.secure.title")}</h3>
              </div>
              <p className="text-muted-foreground">{t("features.secure.description")}</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <UploadIcon className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{t("features.upload.title")}</h3>
              </div>
              <p className="text-muted-foreground">{t("features.upload.description")}</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <SearchIcon className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{t("features.search.title")}</h3>
              </div>
              <p className="text-muted-foreground">{t("features.search.description")}</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <CheckCircleIcon className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{t("features.tracking.title")}</h3>
              </div>
              <p className="text-muted-foreground">{t("features.tracking.description")}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("bestPractices.title")}</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("bestPractices.item1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("bestPractices.item2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("bestPractices.item3")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("bestPractices.item4")}</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("faq.title")}</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">{t("faq.q1.question")}</h3>
              <p className="text-muted-foreground">{t("faq.q1.answer")}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">{t("faq.q2.question")}</h3>
              <p className="text-muted-foreground">{t("faq.q2.answer")}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground">{t("faq.q3.question")}</h3>
              <p className="text-muted-foreground">{t("faq.q3.answer")}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DocumentationPage

