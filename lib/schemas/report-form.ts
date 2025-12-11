import { z } from "zod"
import type { useTranslations } from "next-intl"

export function createReportFormSchema(
  t: ReturnType<typeof useTranslations<"reportModal">>
) {
  return z.object({
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
  })
}

