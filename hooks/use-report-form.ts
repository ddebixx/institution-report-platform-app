import { useCallback, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

import type { ReportFormValues, StepId } from "@/types/reports"
import type { UniversalSearchOption } from "@/components/ui/universal-search"
import { DEFAULT_REPORT_FORM_VALUES } from "@/consts/reports"
import { createReportFormSchema } from "@/lib/schemas/report-form"
import { buildReportPayload } from "@/lib/reports"
import { createReport } from "@/mutations/reports"

type UseReportFormOptions = {
  accessToken: string | null
  onSuccess: () => void
}

type UseReportFormReturn = {
  form: UseFormReturn<ReportFormValues>
  activeStep: StepId
  setActiveStep: (step: StepId) => void
  handleInstitutionSelect: (option: UniversalSearchOption) => void
  handleFileChange: (file: File | null) => void
  handleFindingsChange: (findings: ReportFormValues["reportContent"]["findings"]) => void
  handleComparisonNotesChange: (value: string) => void
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  handleClose: () => void
  primaryActionLabel: string
  isPrimaryDisabled: boolean
  modalPanelClassName: string
}

export function useReportForm({
  accessToken,
  onSuccess,
}: UseReportFormOptions): UseReportFormReturn {
  const t = useTranslations("reportModal")
  const [activeStep, setActiveStep] = useState<StepId>(1)

  const reportFormSchema = useMemo(
    () => createReportFormSchema(t),
    [t]
  )

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: DEFAULT_REPORT_FORM_VALUES,
    mode: "onChange",
  })

  const {
    setValue,
    setError,
    watch,
    trigger,
    handleSubmit,
    reset,
  } = form

  const pdfFile = watch("pdf")
  const isSubmitting = form.formState.isSubmitting

  const handleInstitutionSelect = useCallback(
    (option: UniversalSearchOption) => {
      setValue("institutionName", option.title, {
        shouldDirty: true,
        shouldValidate: true,
      })
      setValue("reportedInstitution", option.title, { shouldDirty: true })
      setValue("institutionId", option.id, { shouldDirty: true })

      if (option.meta) {
        setValue("numerRspo", option.meta, { shouldDirty: true })
      }
    },
    [setValue]
  )

  const handleFileChange = useCallback(
    (file: File | null) => {
      setValue("pdf", file, { shouldDirty: true, shouldValidate: activeStep === 2 })
    },
    [activeStep, setValue]
  )

  const handleFindingsChange = useCallback(
    (findings: ReportFormValues["reportContent"]["findings"]) => {
      setValue("reportContent.findings", findings, { shouldDirty: true })
    },
    [setValue]
  )

  const handleComparisonNotesChange = useCallback(
    (value: string) => {
      setValue("reportContent.comparisonNotes", value, { shouldDirty: true })
    },
    [setValue]
  )

  const submitReport = useCallback(
    async (values: ReportFormValues) => {
      if (!values.pdf) {
        setError("pdf", { type: "manual", message: t("errors.pdfRequired") })
        
        setActiveStep(2)

        toast.error(t("errors.pdfRequired"))

        return
      }

      const payload = buildReportPayload(values)

      try {
        const result = await createReport(payload, accessToken ?? undefined)

        toast.success(t("success.title"), {
          description: t("success.description", { id: result.reportId }),
        })

        onSuccess()
      } catch (error) {
        const message =
          error instanceof Error ? error.message : t("errors.submit")

        toast.error(message)
      }
    },
    [accessToken, onSuccess, setError, t]
  )

  const handleFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (activeStep === 1) {
        const formValues = form.getValues()

        const formElement = event.currentTarget
        const allInputs = formElement.querySelectorAll<HTMLInputElement>('input')
        const nameInput = Array.from(allInputs).find(input =>
          input.name === "reporterName" ||
          input.getAttribute("name") === "reporterName" ||
          input.placeholder?.toLowerCase().includes("name")
        )
        const emailInput = Array.from(allInputs).find(input =>
          input.name === "reporterEmail" ||
          input.getAttribute("name") === "reporterEmail" ||
          input.type === "email"
        )

        if (nameInput?.value && !formValues.reporterName) {
          setValue("reporterName", nameInput.value, { shouldValidate: true })
        }
        if (emailInput?.value && !formValues.reporterEmail) {
          setValue("reporterEmail", emailInput.value, { shouldValidate: true })
        }

        const isStepValid = await trigger(["reporterName", "reporterEmail"])

        if (!isStepValid) {
          return
        }

        setActiveStep(2)

        return
      }

      await handleSubmit(submitReport)(event)
    },
    [activeStep, form, handleSubmit, submitReport, trigger, t]
  )

  const handleClose = useCallback(() => {
    reset(DEFAULT_REPORT_FORM_VALUES)
    setActiveStep(1)
  }, [reset])

  const primaryActionLabel = useMemo(() => {
    if (activeStep === 1) {
      return t("actions.continue")
    }

    return t("actions.submit")
  }, [activeStep, t])

  const isPrimaryDisabled = useMemo(
    () => isSubmitting || (activeStep === 2 && !pdfFile),
    [activeStep, isSubmitting, pdfFile]
  )

  const modalPanelClassName = useMemo(
    () => (activeStep === 2 ? "max-w-6xl" : "max-w-xl"),
    [activeStep]
  )

  return {
    form,
    activeStep,
    setActiveStep,
    handleInstitutionSelect,
    handleFileChange,
    handleFindingsChange,
    handleComparisonNotesChange,
    handleFormSubmit,
    handleClose,
    primaryActionLabel,
    isPrimaryDisabled,
    modalPanelClassName,
  }
}

