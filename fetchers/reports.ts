import { z } from "zod"

import { clientEnv } from "@/lib/env"

const createReportResponseSchema = z.object({
  reportId: z.string(),
  pdfPath: z.string().optional(),
  institutionId: z.string().optional(),
})

export type CreateReportResponse = z.infer<typeof createReportResponseSchema>

export type CreateReportPayload = {
  reporterName: string
  reporterEmail: string
  reportedInstitution?: string
  reportDescription?: string
  reportContent?: Record<string, unknown>
  institutionName?: string
  institutionId?: string
  numerRspo?: string
  reportReason?: string
  pdf: File
}

export const createReport = async (
  payload: CreateReportPayload,
  accessToken: string
): Promise<CreateReportResponse> => {
  const formData = new FormData()
  formData.append("reporterName", payload.reporterName)
  formData.append("reporterEmail", payload.reporterEmail)

  if (payload.reportedInstitution) {
    formData.append("reportedInstitution", payload.reportedInstitution)
  }

  if (payload.reportDescription) {
    formData.append("reportDescription", payload.reportDescription)
  }

  if (payload.reportContent) {
    formData.append("reportContent", JSON.stringify(payload.reportContent))
  }

  if (payload.institutionName) {
    formData.append("institutionName", payload.institutionName)
  }

  if (payload.institutionId) {
    formData.append("institutionId", payload.institutionId)
  }

  if (payload.numerRspo) {
    formData.append("numerRspo", payload.numerRspo)
  }

  if (payload.reportReason) {
    formData.append("reportReason", payload.reportReason)
  }

  formData.append("pdf", payload.pdf)

  const response = await fetch(`${clientEnv.NEXT_PUBLIC_API_BASE_URL}/reports`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    const errorMessage =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : Array.isArray(errorBody?.message)
          ? errorBody.message.join(", ")
          : "Failed to submit the report"
    throw new Error(errorMessage)
  }

  const parsed = createReportResponseSchema.safeParse(await response.json())

  if (!parsed.success) {
    throw new Error("Unexpected response from the reports API")
  }

  return parsed.data
}

