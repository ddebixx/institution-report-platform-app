"use client"

import { FileIcon, ShieldIcon, SparklesIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export const RegulationsSection = () => {
  const t = useTranslations()

  return (
    <section className="w-full rounded-2xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("regulations.title")}
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            {t("regulations.title")}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            {t("regulations.description")}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-border/60 bg-background p-4 shadow-xs">
          <div className="flex items-center gap-2 text-primary">
            <FileIcon className="size-4" />
            <span className="text-sm font-semibold">{t("regulations.primary.name")}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("regulations.primary.desc")}
          </p>
        </article>

        <article className="rounded-xl border border-border/60 bg-background p-4 shadow-xs">
          <div className="flex items-center gap-2 text-primary">
            <ShieldIcon className="size-4" />
            <span className="text-sm font-semibold">{t("regulations.secondary.name")}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("regulations.secondary.desc")}
          </p>
        </article>

        <article className="rounded-xl border border-border/60 bg-background p-4 shadow-xs">
          <div className="flex items-center gap-2 text-primary">
            <SparklesIcon className="size-4" />
            <span className="text-sm font-semibold">{t("regulations.tertiary.name")}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("regulations.tertiary.desc")}
          </p>
        </article>
      </div>
    </section>
  )
}

