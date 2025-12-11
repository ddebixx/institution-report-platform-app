"use client"

import { useTranslations } from "next-intl"
import { twMerge } from "tailwind-merge"
import type { StepId } from "@/types/reports"

type ReportFormProgressProps = {
  activeStep: StepId
  steps: Array<{ id: StepId; label: string }>
}

export const ReportFormProgress = ({
  activeStep,
  steps,
}: ReportFormProgressProps) => {
  const t = useTranslations("reportModal")

  return (
    <div className="flex flex-col gap-2 rounded-md bg-muted/40 p-2 sm:flex-row">
      {steps.map((step) => (
        <div
          key={step.id}
          className={twMerge(
            "flex-1 rounded-md border border-transparent px-3 py-2 text-center text-xs font-semibold transition",
            activeStep === step.id
              ? "border-border bg-background text-foreground"
              : "text-muted-foreground"
          )}
        >
          {t("progress.stepLabel", {
            current: step.id,
            total: steps.length,
            label: step.label,
          })}
        </div>
      ))}
    </div>
  )
}

