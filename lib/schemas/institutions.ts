import { z } from "zod";

export const institutionSearchItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  numerRspo: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export const institutionSearchResponseSchema = z.union([
  z.object({ items: z.array(institutionSearchItemSchema) }),
  z.array(institutionSearchItemSchema),
]);

export type InstitutionSearchResult = z.infer<typeof institutionSearchItemSchema>;
