"use client"

import { useCallback, useMemo } from "react"
import { useTranslations } from "next-intl"

import { useAuthContext } from "@/components/auth/auth-provider"
import { Modal } from "@/components/ui/modal"
import type { ReportModalProps } from "@/types/reports"
import { handleInstitutionSearch as handleInstitutionSearchHandler } from "@/handlers/report-modal"
import { REFERENCE_REGULATION_URL } from "@/consts/reports"
import {
  createRegulationReferences,
  createStepDefinitions,
} from "@/lib/reports"
import { useReportForm } from "@/hooks/use-report-form"
import { ReportDocumentCompare } from "@/features/reports/report-document-compare"
import { ReportFormStep1 } from "./components/report-form-step"
import { ReportFormProgress } from "./components/report-form-progress"
import { ReportModalFooter } from "./components/report-modal-footer"
import { ReportFormActions } from "./components/report-form-actions"

export const ReportModal = ({ open, onClose }: ReportModalProps) => {
  const t = useTranslations("reportModal")
  const { accessToken } = useAuthContext()

  const stepDefinitions = useMemo(
    () => createStepDefinitions(t),
    [t]
  )

  const regulationReferences = useMemo(
    () => createRegulationReferences(t),
    [t]
  )

  const handleInstitutionSearch = useCallback(
    async (query: string) => {
      return await handleInstitutionSearchHandler({ query, accessToken })
    },
    [accessToken]
  )

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const {
    form,
    activeStep,
    setActiveStep,
    handleInstitutionSelect,
    handleFileChange,
    handleFindingsChange,
    handleComparisonNotesChange,
    handleFormSubmit,
    handleClose: handleFormClose,
    primaryActionLabel,
    isPrimaryDisabled,
    modalPanelClassName,
  } = useReportForm({
    accessToken,
    onSuccess: () => {
      handleFormClose()
      handleClose()
    },
  })

  const { control, watch, formState } = form
  const { errors, isSubmitting } = formState
  const pdfFile = watch("pdf")
  const reportContent = watch("reportContent")

  return (
    <Modal
      open={open}
      title={t("title")}
      description={
        activeStep === 1
          ? t("description.step1")
          : t("description.step2")
      }
      onClose={() => {
        handleFormClose()
        handleClose()
      }}
      panelClassName={modalPanelClassName}
      footer={
        <ReportModalFooter
          activeStep={activeStep}
          totalSteps={stepDefinitions.length}
        />
      }
    >
      <form className="space-y-5" onSubmit={handleFormSubmit} noValidate>
        <ReportFormProgress activeStep={activeStep} steps={stepDefinitions} />

        {activeStep === 1 ? (
          <ReportFormStep1
            control={control}
            errors={errors}
            onInstitutionSearch={handleInstitutionSearch}
            onInstitutionSelect={handleInstitutionSelect}
          />
        ) : (
          <ReportDocumentCompare
            file={pdfFile}
            fileError={errors.pdf?.message}
            regulations={regulationReferences}
            findings={reportContent.findings}
            comparisonNotes={reportContent.comparisonNotes}
            referencePdfUrl={REFERENCE_REGULATION_URL}
            onFileChange={handleFileChange}
            onFindingsChange={handleFindingsChange}
            onComparisonNotesChange={handleComparisonNotesChange}
          />
        )}

        <ReportFormActions
          activeStep={activeStep}
          isSubmitting={isSubmitting}
          primaryActionLabel={primaryActionLabel}
          isPrimaryDisabled={isPrimaryDisabled}
          onBack={() => setActiveStep(1)}
        />
      </form>
    </Modal>
  )
}