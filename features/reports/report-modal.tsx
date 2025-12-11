"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  type FormEvent,
  useCallback,
  useMemo,
  useState,
} from "react"
import { Controller, useForm } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"
import { z } from "zod"
import { useTranslations } from "next-intl"

import { useAuthContext } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import {
  UniversalSearchInput,
  type UniversalSearchOption,
} from "@/components/ui/universal-search"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import {
  searchInstitutions,
  type InstitutionSearchResult,
} from "@/fetchers/institutions"
import {
  createReport,
  type CreateReportPayload,
} from "@/fetchers/reports"
import {
  ReportDocumentCompare,
  type RegulationReference,
  type ReportFinding,
} from "@/features/reports/report-document-compare"

type ReportModalProps = {
  open: boolean
  onClose: () => void
}

type StepId = 1 | 2

const referenceRegulationUrl =
  "https://isap.sejm.gov.pl/isap.nsf/download.xsp/WDU20170000059/U/D20170059Lj.pdf"

const minInstitutionSearchCharacters = 5

type ReportFormValues = {
  reporterName: string
  reporterEmail: string
  reportedInstitution?: string
  reportDescription?: string
  institutionName?: string
  institutionId?: string
  numerRspo?: string
  reportReason?: string
  pdf: File | null
  reportContent: {
    findings: Array<{
      id: string
      detail: string
      regulationId?: string
      pageReference?: string
    }>
    comparisonNotes: string
  }
}

const defaultValues: ReportFormValues = {
  reporterName: "",
  reporterEmail: "",
  reportedInstitution: "",
  reportDescription: "",
  reportContent: {
    findings: [],
    comparisonNotes: "",
  },
  institutionName: "",
  institutionId: "",
  numerRspo: "",
  reportReason: "",
  pdf: null,
}

export const ReportModal = ({ open, onClose }: ReportModalProps) => {
  const t = useTranslations("reportModal")
  const { accessToken, user } = useAuthContext()
  const [activeStep, setActiveStep] = useState<StepId>(1)

  const stepDefinitions: Array<{ id: StepId; label: string }> = useMemo(
    () => [
      { id: 1, label: t("steps.details") },
      { id: 2, label: t("steps.review") },
    ],
    [t]
  )

  const regulationReferences: RegulationReference[] = useMemo(
    () => [
      {
        id: "primary",
        title: t("regulations.primary.title"),
        description: t("regulations.primary.description"),
      },
      {
        id: "secondary",
        title: t("regulations.secondary.title"),
        description: t("regulations.secondary.description"),
      },
      {
        id: "tertiary",
        title: t("regulations.tertiary.title"),
        description: t("regulations.tertiary.description"),
      },
    ],
    [t]
  )

  const reportFormSchema = useMemo(
    () =>
      z.object({
        reporterName: z.string().trim().min(2, t("validation.reporterName")),
        reporterEmail: z.string().trim().email(t("validation.reporterEmail")),
        reportedInstitution: z.string().trim().optional(),
        reportDescription: z.string().trim().optional(),
        institutionName: z.string().trim().optional(),
        institutionId: z.string().trim().optional(),
        numerRspo: z.string().trim().optional(),
        reportReason: z.string().trim().optional(),
        pdf: z.instanceof(File).or(z.null()),
        reportContent: z.object({
          findings: z.array(
            z.object({
              id: z.string(),
              detail: z.string().trim().min(2, t("validation.findingDetail")),
              regulationId: z.string().optional(),
              pageReference: z.string().trim().optional(),
            })
          ),
          comparisonNotes: z.string().trim(),
        }),
      }),
    [t]
  )

  const {
    control,
    register,
    handleSubmit,
    trigger,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues,
  })

  const institutionSearchStatusText = useMemo(
    () => ({
      minChars: t("fields.institutionSearch.status.minChars", {
        count: minInstitutionSearchCharacters,
      }),
      loading: t("fields.institutionSearch.status.loading"),
      empty: t("fields.institutionSearch.status.empty"),
      error: t("fields.institutionSearch.status.error"),
      idle: t("fields.institutionSearch.status.idle"),
    }),
    [t]
  )

  const mapInstitutionToOption = useCallback(
    (institution: InstitutionSearchResult): UniversalSearchOption => ({
      id: institution.id,
      title: institution.name,
      subtitle: [institution.city, institution.country]
        .filter(Boolean)
        .join(", ") || undefined,
      meta: institution.numerRspo,
    }),
    []
  )

  const handleInstitutionSearch = useCallback(
    async (query: string) => {
      const results = await searchInstitutions(query, accessToken ?? undefined)
      return results.map(mapInstitutionToOption)
    },
    [accessToken, mapInstitutionToOption]
  )

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

  const pdfFile = watch("pdf")
  const reportContent = watch("reportContent")

  const isAuthenticated = useMemo(() => Boolean(accessToken), [accessToken])

  const handleClose = useCallback(() => {
    reset(defaultValues)
    setActiveStep(1)
    onClose()
  }, [onClose, reset])

  const handleFileChange = useCallback(
    (file: File | null) => {
      setValue("pdf", file, { shouldDirty: true, shouldValidate: activeStep === 2 })
    },
    [activeStep, setValue]
  )

  const handleFindingsChange = useCallback(
    (findings: ReportFinding[]) => {
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
      if (!accessToken) {
        toast.error(t("errors.login"))
        return
      }

      if (!values.pdf) {
        setError("pdf", { type: "manual", message: t("errors.pdfRequired") })
        setActiveStep(2)
        toast.error(t("errors.pdfRequired"))
        return
      }

      const hasReportContent =
        values.reportContent.findings.length > 0 ||
        Boolean(values.reportContent.comparisonNotes.trim())

      const reportContentPayload: Record<string, unknown> | undefined = hasReportContent
        ? {
          findings: values.reportContent.findings,
          comparisonNotes: values.reportContent.comparisonNotes,
        }
        : undefined

      const payload: CreateReportPayload = {
        reporterName: values.reporterName,
        reporterEmail: values.reporterEmail,
        reportedInstitution: values.reportedInstitution || undefined,
        reportDescription: values.reportDescription || undefined,
        reportContent: reportContentPayload,
        institutionName: values.institutionName || undefined,
        institutionId: values.institutionId || undefined,
        numerRspo: values.numerRspo || undefined,
        reportReason: values.reportReason || undefined,
        pdf: values.pdf,
      }

      try {
        const result = await createReport(payload, accessToken)

        toast.success(t("success.title"), {
          description: t("success.description", { id: result.reportId }),
        })
        handleClose()
      } catch (error) {
        const message =
          error instanceof Error ? error.message : t("errors.submit")
        toast.error(message)
      }
    },
    [accessToken, handleClose, setError, t]
  )

  const handleFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (activeStep === 1) {
        const isStepValid = await trigger(["reporterName", "reporterEmail"])
        if (isStepValid) {
          setActiveStep(2)
        }
        return
      }

      await handleSubmit(submitReport)(event)
    },
    [activeStep, handleSubmit, submitReport, trigger]
  )

  const primaryActionLabel =
    activeStep === 1
      ? t("actions.continue")
      : isAuthenticated
        ? t("actions.submit")
        : t("actions.loginRequired")

  const isPrimaryDisabled =
    isSubmitting || (activeStep === 2 && (!pdfFile))

  const modalPanelClassName = activeStep === 2 ? "max-w-6xl" : "max-w-xl"

  return (
    <Modal
      open={open}
      title={t("title")}
      description={
        activeStep === 1
          ? t("description.step1")
          : t("description.step2")
      }
      onClose={handleClose}
      panelClassName={modalPanelClassName}
      footer={
        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            {user?.email
              ? t("footer.authenticated", { email: user.email })
              : t("footer.loginRequired")}
          </span>
          <span>
            {t("progress.footer", { current: activeStep, total: stepDefinitions.length })}
          </span>
        </div>
      }
    >
      <form className="space-y-5" onSubmit={handleFormSubmit} noValidate>
        <div className="flex flex-col gap-2 rounded-md bg-muted/40 p-2 sm:flex-row">
          {stepDefinitions.map((step) => (
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
                total: stepDefinitions.length,
                label: step.label,
              })}
            </div>
          ))}
        </div>

        {activeStep === 1 ? (
          <div className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel>{t("fields.reporterName.label")}</FieldLabel>
                <FieldContent>
                  <Input
                    {...register("reporterName")}
                    placeholder={t("fields.reporterName.placeholder")}
                    aria-invalid={Boolean(errors.reporterName)}
                  />
                </FieldContent>
                {errors.reporterName?.message ? (
                  <FieldDescription className="text-destructive">
                    {errors.reporterName.message}
                  </FieldDescription>
                ) : null}
              </Field>

              <Field>
                <FieldLabel>{t("fields.reporterEmail.label")}</FieldLabel>
                <FieldContent>
                  <Input
                    type="email"
                    {...register("reporterEmail")}
                    placeholder={t("fields.reporterEmail.placeholder")}
                    aria-invalid={Boolean(errors.reporterEmail)}
                  />
                </FieldContent>
                {errors.reporterEmail?.message ? (
                  <FieldDescription className="text-destructive">
                    {errors.reporterEmail.message}
                  </FieldDescription>
                ) : null}
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel>{t("fields.institutionName.label")}</FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="institutionName"
                    render={({ field }) => (
                      <UniversalSearchInput
                        inputId="institution-name-search"
                        value={field.value || ""}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder={t("fields.institutionSearch.placeholder")}
                        minCharacters={minInstitutionSearchCharacters}
                        fetchResults={handleInstitutionSearch}
                        onSelect={handleInstitutionSelect}
                        statusText={institutionSearchStatusText}
                      />
                    )}
                  />
                </FieldContent>
                <FieldDescription>
                  {t("fields.institutionSearch.helper")}
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>{t("fields.numerRspo.label")}</FieldLabel>
                <FieldContent>
                  <Input
                    {...register("numerRspo")}
                    placeholder={t("fields.numerRspo.placeholder")}
                  />
                </FieldContent>
              </Field>
            </FieldGroup>

            <Field>
              <FieldLabel>{t("fields.reportDescription.label")}</FieldLabel>
              <FieldContent>
                <Textarea
                  {...register("reportDescription")}
                  placeholder={t("fields.reportDescription.placeholder")}
                  rows={4}
                />
              </FieldContent>
            </Field>
          </div>
        ) : (
          <ReportDocumentCompare
            file={pdfFile}
            fileError={errors.pdf?.message}
            regulations={regulationReferences}
            findings={reportContent.findings}
            comparisonNotes={reportContent.comparisonNotes}
            referencePdfUrl={referenceRegulationUrl}
            onFileChange={handleFileChange}
            onFindingsChange={handleFindingsChange}
            onComparisonNotesChange={handleComparisonNotesChange}
          />
        )}

        <div className="flex flex-col gap-3">
          {activeStep === 2 ? (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isSubmitting}
              onClick={() => setActiveStep(1)}
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
      </form>
    </Modal>
  )
}