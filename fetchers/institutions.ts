import { z } from "zod"

import { clientEnv } from "@/lib/env"

const institutionSearchItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  numerRspo: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
})

const institutionSearchResponseSchema = z.union([
  z.object({ items: z.array(institutionSearchItemSchema) }),
  z.array(institutionSearchItemSchema),
])

export type InstitutionSearchResult = z.infer<typeof institutionSearchItemSchema>

export class InstitutionSearchError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export const searchInstitutions = async (
  query: string,
  accessToken?: string
): Promise<InstitutionSearchResult[]> => {
  const trimmedQuery = query.trim()

  if (trimmedQuery.length < 5) {
    return []
  }

  const response = await fetch(
    `${clientEnv.NEXT_PUBLIC_API_BASE_URL}/institutions/search?q=${encodeURIComponent(trimmedQuery)}`,
    {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    }
  )

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    const errorMessage =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : "Failed to search institutions"

    throw new InstitutionSearchError(errorMessage, response.status)
  }

  const parsed = institutionSearchResponseSchema.safeParse(await response.json())

  if (!parsed.success) {
    throw new InstitutionSearchError(
      "Unexpected response from institution search endpoint",
      response.status
    )
  }

  if (Array.isArray(parsed.data)) {
    return parsed.data
  }

  return parsed.data.items
}

