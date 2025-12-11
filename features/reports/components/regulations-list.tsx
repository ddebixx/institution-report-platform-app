"use client"

import { useTranslations } from "next-intl"
import type { RegulationReference } from "@/types/reports"

type RegulationsListProps = {
  regulations: RegulationReference[]
}

export const RegulationsList = ({ regulations }: RegulationsListProps) => {
  const t = useTranslations("reportModal.compare")

  return (
    <div className="space-y-3 rounded-md border border-border/60 bg-background p-4">
      <h3 className="text-sm font-semibold text-foreground">{t("regulations.title")}</h3>
      <p className="text-xs text-muted-foreground">{t("regulations.description")}</p>
      <div className="space-y-3">
        {regulations.map((regulation) => (
          <div
            key={regulation.id}
            className="rounded-md border border-border/60 bg-muted/30 p-3"
          >
            <p className="text-sm font-semibold text-foreground">
              {regulation.title}
            </p>
            <p className="text-xs text-muted-foreground">{regulation.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

