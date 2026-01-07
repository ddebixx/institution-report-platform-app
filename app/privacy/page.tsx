"use client"

import { useTranslations } from "next-intl"
import { ShieldIcon, DatabaseIcon, LockIcon, ClockIcon, UserCheckIcon, MailIcon } from "lucide-react"
import { Accordion } from "@/components/ui/accordion"

const PrivacyPage = () => {
  const t = useTranslations("privacy")

  const accordionItems = [
    {
      id: "introduction",
      title: t("introduction.title"),
      content: t("introduction.content"),
      icon: ShieldIcon,
    },
    {
      id: "dataCollection",
      title: t("dataCollection.title"),
      content: `${t("dataCollection.description")}\n\n• ${t("dataCollection.item1")}\n• ${t("dataCollection.item2")}\n• ${t("dataCollection.item3")}\n• ${t("dataCollection.item4")}`,
      icon: DatabaseIcon,
    },
    {
      id: "dataUsage",
      title: t("dataUsage.title"),
      content: `${t("dataUsage.description")}\n\n• ${t("dataUsage.item1")}\n• ${t("dataUsage.item2")}\n• ${t("dataUsage.item3")}`,
      icon: DatabaseIcon,
    },
    {
      id: "dataSecurity",
      title: t("dataSecurity.title"),
      content: t("dataSecurity.description"),
      icon: LockIcon,
    },
    {
      id: "dataRetention",
      title: t("dataRetention.title"),
      content: t("dataRetention.description"),
      icon: ClockIcon,
    },
    {
      id: "yourRights",
      title: t("yourRights.title"),
      content: `${t("yourRights.description")}\n\n• ${t("yourRights.item1")}\n• ${t("yourRights.item2")}\n• ${t("yourRights.item3")}\n• ${t("yourRights.item4")}`,
      icon: UserCheckIcon,
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
          <ShieldIcon className="size-8 text-primary" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">{t("title")}</h1>
        <p className="text-base text-muted-foreground">{t("subtitle")}</p>
        <p className="mt-1 text-xs text-muted-foreground/70">{t("lastUpdated")}</p>
      </div>

      <Accordion items={accordionItems} allowMultiple className="mb-8" />

      <div className="mt-8 rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <MailIcon className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="mb-1 text-lg font-semibold text-foreground">{t("contact.title")}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("contact.description")}{" "}
              <a
                href={`mailto:${t("contact.email")}`}
                className="font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
              >
                {t("contact.email")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage