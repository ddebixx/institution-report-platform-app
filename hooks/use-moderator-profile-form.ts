"use client";

import { useCallback, useEffect, useMemo } from "react";
import type { ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { MODERATOR_PROFILE_FORM_DEFAULTS } from "@/consts/moderator-profile";
import {
  handleModeratorProfileImageChange,
  submitModeratorProfile,
} from "@/handlers/moderator-profile";
import {
  moderatorProfileFormSchema,
  type ModeratorProfileFormValues,
} from "@/lib/schemas/moderator-profile-form";
import { useFilePreview } from "@/hooks/use-file-preview";
import type { UseModeratorProfileFormParams } from "@/types/moderator-dashboard";

export function useModeratorProfileForm({
  open,
  accessToken,
  onSuccess,
  onClose,
}: UseModeratorProfileFormParams) {
  const t = useTranslations("moderatorProfileModal");

  const form = useForm<ModeratorProfileFormValues>({
    resolver: zodResolver(moderatorProfileFormSchema),
    defaultValues: MODERATOR_PROFILE_FORM_DEFAULTS,
    mode: "onChange",
  });

  const { control, handleSubmit, reset, setValue, watch, formState } = form;
  const imageFile = watch("image");
  const imagePreview = useFilePreview(imageFile ?? null);

  useEffect(() => {
    if (open) {
      reset(MODERATOR_PROFILE_FORM_DEFAULTS);
    }
  }, [open, reset]);

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleModeratorProfileImageChange(event, { setValue, t });
    },
    [setValue, t]
  );

  const handleRemoveImage = useCallback(() => {
    setValue("image", null, { shouldDirty: true });
  }, [setValue]);

  const onSubmit = useCallback(
    async (data: ModeratorProfileFormValues) => {
      await submitModeratorProfile(data, {
        accessToken,
        onSuccess,
        onClose,
        successMessage: t("success.profileCreated"),
        errorMessage: t("errors.createFailed"),
      });
    },
    [accessToken, onClose, onSuccess, t]
  );

  const uploadInputId = useMemo(
    () => `moderator-image-upload-${Math.random().toString(36).slice(2, 9)}`,
    []
  );

  const fullName = watch("fullName");
  const email = watch("email");
  const hasValues = Boolean(fullName && email);
  const isFormValid = formState.isValid;
  const isSubmitting = formState.isSubmitting;

  return {
    form,
    control,
    handleSubmit,
    errors: formState.errors,
    isSubmitting,
    isFormValid,
    hasValues,
    imagePreview,
    uploadInputId,
    handleImageChange,
    handleRemoveImage,
    onSubmit,
    t,
  };
}
