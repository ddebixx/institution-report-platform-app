import type { RegulationReference } from "@/types/reports"
import type { InstitutionSearchResult } from "@/fetchers/institutions"
import type { UniversalSearchOption } from "@/components/ui/universal-search"
import type { CreateReportPayload } from "@/mutations/reports"
import type { ReportFormValues } from "@/types/reports"
import type { useTranslations } from "next-intl"

export function generateFindingId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `finding-${Date.now()}`
}

export function createRegulationLookup(
  regulations: RegulationReference[]
): Record<string, RegulationReference> {
  return regulations.reduce<Record<string, RegulationReference>>(
    (acc, regulation) => {
      acc[regulation.id] = regulation
      return acc
    },
    {}
  )
}

export function mapInstitutionToOption(
  institution: InstitutionSearchResult
): UniversalSearchOption {
  const rspoNumber = institution.numerRspo || institution.id
  
  return {
    id: rspoNumber,
    title: institution.name,
    subtitle: [institution.city, institution.country]
      .filter(Boolean)
      .join(", ") || undefined,
    meta: rspoNumber,
  }
}

export function buildReportPayload(values: ReportFormValues): CreateReportPayload {
  if (!values.pdf) {
    throw new Error("PDF file is required to build report payload")
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

  return {
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
}

export function createRegulationReferences(
  t: ReturnType<typeof useTranslations<"reportModal">>
): RegulationReference[] {
  return [
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
  ]
}

export function createStepDefinitions(
  t: ReturnType<typeof useTranslations<"reportModal">>
): Array<{ id: 1 | 2; label: string }> {
  return [
    { id: 1, label: t("steps.details") },
    { id: 2, label: t("steps.review") },
  ]
}
