import { z } from "zod";

const institutionSearchItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  numerRspo: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const institutionSearchResponseSchema = z.union([
  z.object({ items: z.array(institutionSearchItemSchema) }),
  z.array(institutionSearchItemSchema),
]);

export type InstitutionSearchResult = z.infer<typeof institutionSearchItemSchema>;

export const searchInstitutions = async (
  query: string,
  _accessToken?: string
): Promise<InstitutionSearchResult[]> => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 5) {
    return [];
  }

  const response = await fetch(`/api/institutions/search?q=${encodeURIComponent(trimmedQuery)}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage =
      typeof errorBody?.message === "string" ? errorBody.message : "Failed to search institutions";

    throw new Error(errorMessage);
  }

  const parsed = institutionSearchResponseSchema.safeParse(await response.json());

  if (!parsed.success) {
    throw new Error("Unexpected response from institution search endpoint");
  }

  if (Array.isArray(parsed.data)) {
    return parsed.data;
  }

  return parsed.data.items;
};
