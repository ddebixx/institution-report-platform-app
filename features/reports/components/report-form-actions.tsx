"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import type { StepId } from "@/types/reports"

type ReportFormActionsProps = {
  activeStep: StepId
  isSubmitting: boolean
  primaryActionLabel: string
  isPrimaryDisabled: boolean
  onBack: () => void
}

export const ReportFormActions = ({
  activeStep,
  isSubmitting,
  primaryActionLabel,
  isPrimaryDisabled,
  onBack,
}: ReportFormActionsProps) => {
  const t = useTranslations("reportModal")

  return (
    <div className="flex flex-col gap-3">
      {activeStep === 2 ? (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={isSubmitting}
          onClick={onBack}
        >
          {t("actions.back")}
        </Button>
      ) : null}
      <Button
        type="submit"
        className="w-full font-semibold"
        disabled={isPrimaryDisabled}
      >
        {primaryActionLabel}
      </Button>
    </div>
  )
}

