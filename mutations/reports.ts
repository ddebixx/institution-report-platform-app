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
  accessToken?: string
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

  const headers: HeadersInit = {}
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")
  const apiUrl = `${baseUrl}/reports`
  
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("[createReport] Attempting to connect to:", apiUrl)
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: formData,
    })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      const errorMessage =
        typeof errorBody?.message === "string"
          ? errorBody.message
          : Array.isArray(errorBody?.message)
            ? errorBody.message.join(", ")
            : `Failed to submit the report (${response.status} ${response.statusText})`
      throw new Error(errorMessage)
    }

    const responseData = await response.json()
    const parsed = createReportResponseSchema.safeParse(responseData)

    if (!parsed.success) {
      throw new Error("Unexpected response from the reports API")
    }

    return parsed.data
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      const errorMessage = `Unable to connect to the API at ${apiUrl}.`
      
      if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
        console.error("[createReport] Connection failed:", {
          apiUrl,
          baseUrl,
          error: error instanceof Error ? error.message : String(error),
          envVar: process.env.NEXT_PUBLIC_API_BASE_URL,
        })
      }
      
      throw new Error(errorMessage)
    }
    
    throw error
  }
}

export const assignReportToSelf = async (
  reportId: string,
  accessToken: string
): Promise<void> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")
  const apiUrl = `${baseUrl}/reports/${reportId}/assign`

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    const errorMessage =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : Array.isArray(errorBody?.message)
          ? errorBody.message.join(", ")
          : `Failed to assign report (${response.status} ${response.statusText})`
    throw new Error(errorMessage)
  }
}

export const unassignReportFromSelf = async (
  reportId: string,
  accessToken: string
): Promise<void> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")
  const apiUrl = `${baseUrl}/reports/${reportId}/assign`

  const response = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    const errorMessage =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : Array.isArray(errorBody?.message)
          ? errorBody.message.join(", ")
          : `Failed to unassign report (${response.status} ${response.statusText})`
    throw new Error(errorMessage)
  }
}

export type UpdateReportReviewPayload = {
  findings: Array<{
    id: string
    detail: string
    regulationId?: string
    pageReference?: string
  }>
  comparisonNotes: string
}

export const updateReportReview = async (
  reportId: string,
  payload: UpdateReportReviewPayload,
  accessToken: string
): Promise<void> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")
  const apiUrl = `${baseUrl}/reports/${reportId}/review`

  const response = await fetch(apiUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reportContent: {
        findings: payload.findings,
        comparisonNotes: payload.comparisonNotes,
      },
    }),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    const errorMessage =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : Array.isArray(errorBody?.message)
          ? errorBody.message.join(", ")
          : `Failed to update report review (${response.status} ${response.statusText})`
    throw new Error(errorMessage)
  }
}

