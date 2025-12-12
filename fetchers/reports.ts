import { z } from "zod"

import { clientEnv } from "@/lib/env"
import type { ModeratorReport } from "@/types/reports"

const createReportResponseSchema = z.object({
  reportId: z.string(),
  pdfPath: z.string().optional(),
  institutionId: z.string().optional(),
})

export type CreateReportResponse = z.infer<typeof createReportResponseSchema>

const moderatorReportSchema = z.object({
  id: z.coerce.string(),
  reporterName: z.string(),
  reporterEmail: z.string(),
  reportedInstitution: z.string().optional(),
  institutionName: z.string().optional(),
  institutionId: z.string().optional(),
  numerRspo: z.string().optional(),
  reportDescription: z.string().optional(),
  reportReason: z.string().optional(),
  status: z.enum(["pending", "assigned", "completed"]),
  assignedTo: z.string().optional(),
  assignedAt: z.string().optional(),
  completedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  pdfPath: z.string().optional(),
})

const moderatorReportsResponseSchema = z.array(moderatorReportSchema)

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

export const fetchAllReports = async (
  accessToken: string
): Promise<ModeratorReport[]> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")
  const apiUrl = `${baseUrl}/reports`

  const response = await fetch(apiUrl, {
    method: "GET",
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
          : `Failed to fetch all reports (${response.status} ${response.statusText})`
    throw new Error(errorMessage)
  }

  const responseData = await response.json()
  const parsed = moderatorReportsResponseSchema.safeParse(responseData)

  if (!parsed.success) {
    throw new Error("Unexpected response from the reports API")
  }

  return parsed.data
}

export const fetchAvailableReports = async (
  accessToken: string
): Promise<ModeratorReport[]> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")
  const apiUrl = `${baseUrl}/reports/available`

  const response = await fetch(apiUrl, {
    method: "GET",
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
          : `Failed to fetch available reports (${response.status} ${response.statusText})`
    throw new Error(errorMessage)
  }

  const responseData = await response.json()
  const parsed = moderatorReportsResponseSchema.safeParse(responseData)

  if (!parsed.success) {
    throw new Error("Unexpected response from the reports API")
  }

  return parsed.data
}

export const fetchAssignedReports = async (
  accessToken: string
): Promise<ModeratorReport[]> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")
  const apiUrl = `${baseUrl}/reports/assigned`

  const response = await fetch(apiUrl, {
    method: "GET",
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
          : `Failed to fetch assigned reports (${response.status} ${response.statusText})`
    throw new Error(errorMessage)
  }

  const responseData = await response.json()
  const parsed = moderatorReportsResponseSchema.safeParse(responseData)

  if (!parsed.success) {
    throw new Error("Unexpected response from the reports API")
  }

  return parsed.data
}

export const fetchCompletedReports = async (
  accessToken: string
): Promise<ModeratorReport[]> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")
  const apiUrl = `${baseUrl}/reports/completed`

  const response = await fetch(apiUrl, {
    method: "GET",
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
          : `Failed to fetch completed reports (${response.status} ${response.statusText})`
    throw new Error(errorMessage)
  }

  const responseData = await response.json()
  const parsed = moderatorReportsResponseSchema.safeParse(responseData)

  if (!parsed.success) {
    throw new Error("Unexpected response from the reports API")
  }

  return parsed.data
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

