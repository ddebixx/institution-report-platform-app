import { z } from "zod";
import type { useTranslations } from "next-intl";
import { reportFindingSchema } from "@/lib/schemas/reports";

// AI: Form schema composes report schemas with i18n validation messages
export function createReportFormSchema(t: ReturnType<typeof useTranslations<"reportModal">>) {
  const findingWithValidation = reportFindingSchema.extend({
    detail: z.string().trim().min(2, t("validation.findingDetail")),
  });

  return z.object({
    reporterName: z.string().trim().min(2, t("validation.reporterName")),
    reporterEmail: z.string().trim().email(t("validation.reporterEmail")),
    reportedInstitution: z.string().trim().optional(),
    reportDescription: z.string().trim().optional(),
    institutionName: z.string().trim().min(1, t("validation.institutionName")),
    institutionId: z.string().trim().optional(),
    numerRspo: z.string().trim().optional(),
    reportReason: z.string().trim().optional(),
    pdf: z.instanceof(File).or(z.null()),
    reportContent: z.object({
      findings: z.array(findingWithValidation),
      comparisonNotes: z.string().trim(),
    }),
  });
}
