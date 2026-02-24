"use client";

import { useTranslations } from "next-intl";
import { FileTextIcon, MailIcon } from "lucide-react";
import { Accordion } from "@/components/ui/accordion/accordion";
import { accordionItems } from "@/consts/shared";

export default function TermsPage() {
  const t = useTranslations("terms");

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
          <FileTextIcon className="size-8 text-primary" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">{t("title")}</h1>
        <p className="text-base text-muted-foreground">{t("subtitle")}</p>
        <p className="mt-1 text-xs text-muted-foreground/70">{t("lastUpdated")}</p>
      </div>

      <Accordion items={accordionItems(t)} allowMultiple className="mb-8" />

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
  );
}
