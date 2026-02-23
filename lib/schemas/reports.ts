import { z } from "zod";

export const reportFindingSchema = z.object({
  id: z.string(),
  detail: z.string(),
  regulationId: z.string().optional(),
  pageReference: z.string().optional(),
});

export const reportStatusSchema = z.enum(["pending", "assigned", "completed"]);

export const regulationReferenceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

const reportContentSchema = z.object({
  findings: z.array(reportFindingSchema),
  comparisonNotes: z.string(),
});

export const moderatorReportSchema = z.object({
  id: z.coerce.string(),
  reporterName: z.string(),
  reporterEmail: z.string(),
  reportedInstitution: z.string().optional(),
  institutionName: z.string().optional(),
  institutionId: z.string().optional(),
  numerRspo: z.string().optional(),
  reportDescription: z.string().optional(),
  reportReason: z.string().optional(),
  status: reportStatusSchema,
  assignedTo: z.string().optional(),
  assignedAt: z.string().optional(),
  completedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  pdfPath: z.string().optional(),
  reportContent: reportContentSchema.optional(),
});

export const moderatorReportsResponseSchema = z.array(moderatorReportSchema);

export const stepIdSchema = z.union([z.literal(1), z.literal(2)]);

export const reportFormValuesSchema = z.object({
  reporterName: z.string(),
  reporterEmail: z.string(),
  reportedInstitution: z.string().optional(),
  reportDescription: z.string().optional(),
  institutionName: z.string().optional(),
  institutionId: z.string().optional(),
  numerRspo: z.string().optional(),
  reportReason: z.string().optional(),
  pdf: z.instanceof(File).nullable(),
  reportContent: reportContentSchema,
});

export const updateReportReviewPayloadSchema = z.object({
  findings: z.array(reportFindingSchema),
  comparisonNotes: z.string(),
});

export const createReportPayloadSchema = z.object({
  reporterName: z.string().min(1),
  reporterEmail: z.string().email(),
  reportedInstitution: z.string().optional(),
  reportDescription: z.string().optional(),
  reportContent: z.record(z.unknown()).optional(),
  institutionName: z.string().optional(),
  institutionId: z.string().optional(),
  numerRspo: z.string().optional(),
  reportReason: z.string().optional(),
  pdf: z.instanceof(File),
});

export type ReportFinding = z.infer<typeof reportFindingSchema>;
export type ReportStatus = z.infer<typeof reportStatusSchema>;
export type RegulationReference = z.infer<typeof regulationReferenceSchema>;
export type ReportContent = z.infer<typeof reportContentSchema>;
export type ModeratorReport = z.infer<typeof moderatorReportSchema>;
export type StepId = z.infer<typeof stepIdSchema>;
export type ReportFormValues = z.infer<typeof reportFormValuesSchema>;
export type UpdateReportReviewPayload = z.infer<typeof updateReportReviewPayloadSchema>;
export type CreateReportPayload = z.infer<typeof createReportPayloadSchema>;
