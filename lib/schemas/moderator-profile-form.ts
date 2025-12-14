import { z } from "zod"

export const moderatorProfileFormSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address"),
  image: z.instanceof(File).or(z.null()).optional(),
})

export type ModeratorProfileFormValues = z.infer<typeof moderatorProfileFormSchema>

