"use client"

import { ShieldIcon, MailIcon, FileTextIcon, ArrowRightIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const Footer = () => {
  const t = useTranslations("footer")

  return (
    <footer className="relative border-t border-border/60 bg-background/90 backdrop-blur-sm">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/2 via-transparent to-primary/2 opacity-30" />
      
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/3 blur-3xl opacity-50" />
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/3 blur-3xl opacity-50" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 hover:scale-110 hover:bg-primary/20 hover:shadow-xs hover:shadow-primary/20">
                <ShieldIcon className="size-6" />
              </div>
              <span className="text-xl font-bold text-foreground">{t("title")}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {t("quickLinks.title")}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#features"
                  className="group flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  <ArrowRightIcon className="size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span>{t("quickLinks.features")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="group flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  <ArrowRightIcon className="size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span>{t("quickLinks.howItWorks")}</span>
                  </Link>
              </li>
              <li>
                <Link
                  href="#benefits"
                  className="group flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  <ArrowRightIcon className="size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span>{t("quickLinks.benefits")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#regulations"
                  className="group flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  <ArrowRightIcon className="size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span>{t("quickLinks.regulations")}</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {t("resources.title")}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/documentation"
                  className="group flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  <FileTextIcon className="size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span>{t("resources.documentation")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guidelines"
                  className="group flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  <FileTextIcon className="size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span>{t("resources.guidelines")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="group flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  <FileTextIcon className="size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span>{t("resources.support")}</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {t("contact.title")}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href={`mailto:${t("contact.email")}`}
                  className="group flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  <MailIcon className="size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span>{t("contact.email")}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border/60 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p className="transition-colors duration-300 hover:text-foreground">
              © {new Date().getFullYear()} {t("title")}. {t("legal.copyright")}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="transition-all duration-300 hover:translate-x-0.5 hover:text-primary"
              >
                {t("legal.privacy")}
              </Link>
              <Link
                  href="/terms"
                className="transition-all duration-300 hover:translate-x-0.5 hover:text-primary"
              >
                {t("legal.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

