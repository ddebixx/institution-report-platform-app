export const MODERATOR_PROFILE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export const MODERATOR_PROFILE_IMAGE_ACCEPT = "image/*";

export const MODERATOR_PROFILE_FORM_DEFAULTS = {
  fullName: "",
  email: "",
  image: null as File | null,
} as const;
