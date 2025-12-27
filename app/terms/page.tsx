"use client"

import { useTranslations } from "next-intl"
import { FileTextIcon } from "lucide-react"

const TermsPage = () => {
  const t = useTranslations("terms")

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
        <p className="mt-2 text-sm text-muted-foreground">{t("lastUpdated")}</p>
      </div>

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("acceptance.title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("acceptance.content")}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("useOfService.title")}</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">{t("useOfService.description")}</p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("useOfService.item1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("useOfService.item2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("useOfService.item3")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("useOfService.item4")}</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("userAccounts.title")}</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">{t("userAccounts.description")}</p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("userAccounts.item1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("userAccounts.item2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("userAccounts.item3")}</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("reportSubmission.title")}</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">{t("reportSubmission.description")}</p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("reportSubmission.item1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("reportSubmission.item2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("reportSubmission.item3")}</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("intellectualProperty.title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("intellectualProperty.content")}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("limitationOfLiability.title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("limitationOfLiability.content")}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("modifications.title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("modifications.content")}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("contact.title")}</h2>
          <p className="leading-relaxed text-muted-foreground">
            {t("contact.description")}{" "}
            <a href={`mailto:${t("contact.email")}`} className="text-primary hover:underline">
              {t("contact.email")}
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsPage

