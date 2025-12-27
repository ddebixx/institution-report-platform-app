"use client"

import { useTranslations } from "next-intl"
import { ShieldIcon } from "lucide-react"

const PrivacyPage = () => {
  const t = useTranslations("privacy")

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldIcon className="size-6" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">{t("title")}</h1>
        </div>
        <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t("lastUpdated")}</p>
      </div>

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("introduction.title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("introduction.content")}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("dataCollection.title")}</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">{t("dataCollection.description")}</p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("dataCollection.item1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("dataCollection.item2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("dataCollection.item3")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("dataCollection.item4")}</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("dataUsage.title")}</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">{t("dataUsage.description")}</p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("dataUsage.item1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("dataUsage.item2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("dataUsage.item3")}</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("dataSecurity.title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("dataSecurity.description")}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("dataRetention.title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("dataRetention.description")}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("yourRights.title")}</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">{t("yourRights.description")}</p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("yourRights.item1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("yourRights.item2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("yourRights.item3")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span>{t("yourRights.item4")}</span>
            </li>
          </ul>
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

export default PrivacyPage

