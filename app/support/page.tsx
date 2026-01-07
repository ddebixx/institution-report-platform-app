"use client"

import { useTranslations } from "next-intl"
import {
  HelpCircleIcon,
  MailIcon,
  ClockIcon,
  FileTextIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "lucide-react"
import Link from "next/link"
import { Accordion } from "@/components/ui/accordion"

const SupportPage = () => {
  const t = useTranslations("support")

  const commonIssuesItems = [
    {
      id: "issue-1",
      title: t("commonIssues.issue1.question"),
      content: t("commonIssues.issue1.answer"),
    },
    {
      id: "issue-2",
      title: t("commonIssues.issue2.question"),
      content: t("commonIssues.issue2.answer"),
    },
    {
      id: "issue-3",
      title: t("commonIssues.issue3.question"),
      content: t("commonIssues.issue3.answer"),
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-12 sm:px-6">
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
            <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                    <MailIcon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{t("contact.email.title")}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t("contact.email.description")}</p>
                <a
                  href={`mailto:${t("contact.email.address")}`}
                  className="inline-flex items-center gap-2 text-primary transition-all duration-200 hover:underline hover:gap-3"
                >
                  <span className="font-medium">{t("contact.email.address")}</span>
                  <ArrowRightIcon className="size-4 transition-transform duration-200" />
                </a>
              </div>
              
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                    <ClockIcon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{t("contact.hours.title")}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t("contact.hours.description")}</p>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("commonIssues.title")}</h2>
          <Accordion items={commonIssuesItems} />
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{t("resources.title")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/documentation"
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative z-10 space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <FileTextIcon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t("resources.documentation.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("resources.documentation.description")}</p>
                <div className="flex items-center gap-2 text-primary transition-all duration-200 group-hover:gap-3">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRightIcon className="size-4" />
                </div>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150" />
            </Link>

            <Link
              href="/guidelines"
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative z-10 space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <BookOpenIcon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t("resources.guidelines.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("resources.guidelines.description")}</p>
                <div className="flex items-center gap-2 text-primary transition-all duration-200 group-hover:gap-3">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRightIcon className="size-4" />
                </div>
              </div>
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150" />
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{t("additionalHelp.title")}</h2>
          <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-linear-to-br from-primary/5 to-transparent p-6 shadow-sm">
            <p className="relative z-10 leading-relaxed text-muted-foreground">
              {t("additionalHelp.description")}
            </p>
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </section>
      </div>
    </div>
  )
}

export default SupportPage

