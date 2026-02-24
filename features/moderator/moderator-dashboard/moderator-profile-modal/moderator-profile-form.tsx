"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { UploadIcon, XIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

import { Button } from "@/components/ui/button/button";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { MODERATOR_PROFILE_IMAGE_ACCEPT } from "@/consts/moderator-profile";
import type { ModeratorProfileFormValues } from "@/lib/schemas/moderator-profile-form";

export type ModeratorProfileFormBodyProps = {
  control: Control<ModeratorProfileFormValues>;
  errors: FieldErrors<ModeratorProfileFormValues>;
  isSubmitting: boolean;
  imagePreview: string | null;
  uploadInputId: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  t: (key: string) => string;
};

export const ModeratorProfileFormBody = ({
  control,
  errors,
  isSubmitting,
  imagePreview,
  uploadInputId,
  onImageChange,
  onRemoveImage,
  t,
}: ModeratorProfileFormBodyProps) => {
  return (
    <div className="space-y-6">
      <Field>
        <FieldLabel>
          {t("fullName.label")} <span className="text-destructive">*</span>
        </FieldLabel>
        <FieldContent>
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder={t("fullName.placeholder")}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.fullName)}
              />
            )}
          />
          {errors.fullName?.message ? (
            <FieldDescription className="text-destructive">
              {errors.fullName.message}
            </FieldDescription>
          ) : (
            <FieldDescription>{t("fullName.description")}</FieldDescription>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>
          {t("email.label")} <span className="text-destructive">*</span>
        </FieldLabel>
        <FieldContent>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder={t("email.placeholder")}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.email)}
              />
            )}
          />
          {errors.email?.message ? (
            <FieldDescription className="text-destructive">{errors.email.message}</FieldDescription>
          ) : (
            <FieldDescription>{t("email.description")}</FieldDescription>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>{t("image.label")}</FieldLabel>
        <FieldContent>
          {imagePreview ? (
            <div className="relative inline-block">
              <div className="relative size-32 overflow-hidden rounded-lg border border-border">
                <Image
                  width={128}
                  height={128}
                  src={imagePreview}
                  alt={t("image.altText")}
                  className="size-full object-cover"
                  fill
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                className="absolute -right-2 -top-2"
                onClick={onRemoveImage}
                disabled={isSubmitting}
              >
                <XIcon className="size-3" />
              </Button>
            </div>
          ) : (
            <label
              htmlFor={uploadInputId}
              className={twMerge(
                "flex cursor-pointer items-center justify-center gap-3 rounded-md border border-dashed border-input px-4 py-8 text-sm shadow-xs transition",
                "hover:border-ring",
                isSubmitting && "cursor-not-allowed opacity-50"
              )}
            >
              <UploadIcon className="size-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{t("image.uploadPrompt")}</span>
                <span className="text-xs text-muted-foreground">{t("image.uploadHint")}</span>
              </div>
            </label>
          )}
          <input
            id={uploadInputId}
            type="file"
            accept={MODERATOR_PROFILE_IMAGE_ACCEPT}
            onChange={onImageChange}
            className="hidden"
            disabled={isSubmitting}
          />
          <FieldDescription>{t("image.description")}</FieldDescription>
        </FieldContent>
      </Field>
    </div>
  );
};
