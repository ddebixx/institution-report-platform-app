import { clientEnv } from "@/lib/env";
import { moderatorProfileSchema, type ModeratorProfile } from "@/lib/schemas/moderator-profile";

export type CreateOrUpdateModeratorProfilePayload = {
  fullName: string;
  email: string;
  image?: File;
};

export const createOrUpdateModeratorProfile = async (
  payload: CreateOrUpdateModeratorProfilePayload,
  accessToken: string
): Promise<ModeratorProfile> => {
  const formData = new FormData();
  formData.append("fullName", payload.fullName);
  formData.append("email", payload.email);
  if (payload.image) {
    formData.append("image", payload.image);
  }

  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  const apiUrl = `${baseUrl}/moderators/profile`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : Array.isArray(errorBody?.message)
          ? errorBody.message.join(", ")
          : `Failed to create/update moderator profile (${response.status} ${response.statusText})`;
    throw new Error(errorMessage);
  }

  const responseData = await response.json();
  const parsed = moderatorProfileSchema.safeParse(responseData);
  if (!parsed.success) {
    throw new Error("Unexpected response from the moderator profile API");
  }
  return parsed.data;
};
