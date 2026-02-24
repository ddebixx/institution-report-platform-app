"use client";

import { LoaderIcon } from "lucide-react";

import { Button } from "@/components/ui/button/button";
import { Modal } from "@/components/ui/modal/modal";
import { ModeratorProfileFormBody } from "./moderator-profile-form";
import { useModeratorProfileForm } from "@/hooks/use-moderator-profile-form";
import type { ModeratorProfileModalProps } from "@/types/moderator-dashboard";

export const ModeratorProfileModal = ({
  open,
  onClose,
  onSuccess,
  accessToken,
}: ModeratorProfileModalProps) => {
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    isFormValid,
    hasValues,
    imagePreview,
    uploadInputId,
    handleImageChange,
    handleRemoveImage,
    onSubmit,
    t,
  } = useModeratorProfileForm({ open, accessToken, onSuccess, onClose });

  return (
    <Modal
      open={open}
      title={t("title")}
      description={t("description")}
      onClose={undefined}
      panelClassName="max-w-2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isFormValid || !hasValues}
          >
            {isSubmitting ? (
              <>
                <LoaderIcon className="size-4 animate-spin" />
                {t("actions.saving")}
              </>
            ) : (
              t("actions.save")
            )}
          </Button>
        </div>
      }
    >
      <ModeratorProfileFormBody
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        imagePreview={imagePreview}
        uploadInputId={uploadInputId}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
        t={t}
      />
    </Modal>
  );
};
