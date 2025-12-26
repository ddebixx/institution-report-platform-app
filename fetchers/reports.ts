import { z } from "zod"

import { clientEnv } from "@/lib/env"
import type { ModeratorReport } from "@/types/reports"

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

