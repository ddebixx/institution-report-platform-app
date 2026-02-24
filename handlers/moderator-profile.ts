import type { ChangeEvent } from "react";
import { toast } from "sonner";

import { validateProfileImageFile } from "@/utils/moderator-profile";

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
