import { MODERATOR_PROFILE_IMAGE_MAX_BYTES } from "@/consts/moderator-profile";

export function validateProfileImageFile(
  file: File,
  maxBytes: number = MODERATOR_PROFILE_IMAGE_MAX_BYTES
): "invalidImageType" | "imageTooLarge" | null {
  if (!file.type.startsWith("image/")) {
    return "invalidImageType";
  }
  if (file.size > maxBytes) {
    return "imageTooLarge";
  }
  return null;
}
