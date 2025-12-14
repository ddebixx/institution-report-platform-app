import { z } from "zod"

import { clientEnv } from "@/lib/env"

const moderatorProfileSchema = z.object({
  uuid: z.string(),
  fullname: z.string(),
  email: z.string(),
  image: z.string().optional().nullable(),
  createdAt: z.string(),
})

export type ModeratorProfile = z.infer<typeof moderatorProfileSchema>

export const fetchModeratorProfile = async (
  accessToken: string
): Promise<ModeratorProfile | null> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")
  const apiUrl = `${baseUrl}/moderators/profile`

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    const errorMessage =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : Array.isArray(errorBody?.message)
          ? errorBody.message.join(", ")
          : `Failed to fetch moderator profile (${response.status} ${response.statusText})`
    throw new Error(errorMessage)
  }

  const responseData = await response.json()
  const parsed = moderatorProfileSchema.safeParse(responseData)

  if (!parsed.success) {
    throw new Error("Unexpected response from the moderator profile API")
  }

  return parsed.data
}

