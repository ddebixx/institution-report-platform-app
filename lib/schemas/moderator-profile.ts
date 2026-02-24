import { z } from "zod";

export const moderatorProfileSchema = z.object({
  uuid: z.string(),
  fullname: z.string(),
  email: z.string(),
  image: z.string().optional().nullable(),
  createdAt: z.string(),
});

export type ModeratorProfile = z.infer<typeof moderatorProfileSchema>;
