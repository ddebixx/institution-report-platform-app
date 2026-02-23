import type { ChangeEvent } from "react";
import { toast } from "sonner";

import { createOrUpdateModeratorProfile } from "@/mutations/moderators";
import { validateProfileImageFile } from "@/utils/moderator-profile";
import type { ModeratorProfileFormValues } from "@/lib/schemas/moderator-profile-form";

type HandleImageChangeParams = {
  setValue: (
    name: "image",
    value: File | null,
    options?: { shouldDirty?: boolean; shouldValidate?: boolean }
  ) => void;
  t: (key: string) => string;
};

export function handleModeratorProfileImageChange(
  event: ChangeEvent<HTMLInputElement>,
  { setValue, t }: HandleImageChangeParams
): void {
  const file = event.target.files?.[0] ?? null;
  if (!file) return;

  const errorKey = validateProfileImageFile(file);
  if (errorKey) {
    toast.error(t(`errors.${errorKey}`));
    return;
  }

  setValue("image", file, { shouldDirty: true, shouldValidate: false });
}

type SubmitModeratorProfileParams = {
  accessToken: string;
  onSuccess: () => void;
  onClose: () => void;
  successMessage: string;
  errorMessage: string;
};

export async function submitModeratorProfile(
  data: ModeratorProfileFormValues,
  { accessToken, onSuccess, onClose, successMessage, errorMessage }: SubmitModeratorProfileParams
): Promise<void> {
  try {
    await createOrUpdateModeratorProfile(
      {
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        image: data.image ?? undefined,
      },
      accessToken
    );
    toast.success(successMessage);
    onSuccess();
    onClose();
  } catch (error) {
    const message = error instanceof Error ? error.message : errorMessage;
    toast.error(message);
  }
}
