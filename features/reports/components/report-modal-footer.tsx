"use client"

import { useTranslations } from "next-intl"
import type { StepId } from "@/types/reports"

type ReportModalFooterProps = {
  activeStep: StepId
  totalSteps: number
}

export const ReportModalFooter = ({
  activeStep,
  totalSteps,
}: ReportModalFooterProps) => {
  const t = useTranslations("reportModal")

  return (
    <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-end">
      <span>
        {t("progress.footer", { current: activeStep, total: totalSteps })}
      </span>
    </div>
  )
}

