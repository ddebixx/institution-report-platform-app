"use client"

import { useTranslations } from "next-intl"
import { HelpCircleIcon, MailIcon, MessageCircleIcon, ClockIcon } from "lucide-react"
import Link from "next/link"

const SupportPage = () => {
  const t = useTranslations("support")

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HelpCircleIcon className="size-6" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">{t("title")}</h1>
        </div>
        <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("contact.title")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <MailIcon className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{t("contact.email.title")}</h3>
              </div>
              <p className="mb-3 text-muted-foreground">{t("contact.email.description")}</p>
              <a
                href={`mailto:${t("contact.email.address")}`}
                className="text-primary transition-colors hover:underline"
              >
                {t("contact.email.address")}
              </a>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <ClockIcon className="size-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{t("contact.hours.title")}</h3>
              </div>
              <p className="text-muted-foreground">{t("contact.hours.description")}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("commonIssues.title")}</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">{t("commonIssues.issue1.question")}</h3>
              <p className="text-muted-foreground">{t("commonIssues.issue1.answer")}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">{t("commonIssues.issue2.question")}</h3>
              <p className="text-muted-foreground">{t("commonIssues.issue2.answer")}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">{t("commonIssues.issue3.question")}</h3>
              <p className="text-muted-foreground">{t("commonIssues.issue3.answer")}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("resources.title")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/documentation"
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <MessageCircleIcon className="size-5 text-primary transition-transform group-hover:scale-110" />
                <h3 className="text-lg font-semibold text-foreground">{t("resources.documentation.title")}</h3>
              </div>
              <p className="text-muted-foreground">{t("resources.documentation.description")}</p>
            </Link>

            <Link
              href="/guidelines"
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <MessageCircleIcon className="size-5 text-primary transition-transform group-hover:scale-110" />
                <h3 className="text-lg font-semibold text-foreground">{t("resources.guidelines.title")}</h3>
              </div>
              <p className="text-muted-foreground">{t("resources.guidelines.description")}</p>
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("additionalHelp.title")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("additionalHelp.description")}</p>
        </section>
      </div>
    </div>
  )
}

export default SupportPage

