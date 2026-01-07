"use client"

import { useCallback, useEffect, useMemo } from "react"
import { type ChangeEvent } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { LoaderIcon, UploadIcon, XIcon } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { useFilePreview } from "@/hooks/use-file-preview"
import { createOrUpdateModeratorProfile } from "@/mutations/moderators"
import {
  moderatorProfileFormSchema,
  type ModeratorProfileFormValues,
} from "@/lib/schemas/moderator-profile-form"

type ModeratorProfileModalProps = {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  accessToken: string
}

export const ModeratorProfileModal = ({
  open,
  onClose,
  onSuccess,
  accessToken,
}: ModeratorProfileModalProps) => {
  const t = useTranslations("moderatorProfileModal")
  
  const form = useForm<ModeratorProfileFormValues>({
    resolver: zodResolver(moderatorProfileFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      image: null,
    },
    mode: "onChange",
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form

  const imageFile = watch("image")
  const imagePreview = useFilePreview(imageFile ?? null)

  useEffect(() => {
    function resetFormOnOpen() {
      if (open) {
        console.log("[ModeratorProfileModal] Modal opened, resetting form")
        reset({
          fullName: "",
          email: "",
          image: null,
        })
      }
    }

    resetFormOnOpen()
  }, [open, reset])

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null
      if (file) {
        if (!file.type.startsWith("image/")) {
          toast.error(t("errors.invalidImageType"))
          return
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(t("errors.imageTooLarge"))
          return
        }
        setValue("image", file, { shouldDirty: true, shouldValidate: false })
      }
    },
    [setValue, t]
  )

  const handleRemoveImage = useCallback(() => {
    setValue("image", null, { shouldDirty: true })
  }, [setValue])

  const uploadInputId = useMemo(
    () => `moderator-image-upload-${Math.random().toString(36).slice(2, 9)}`,
    []
  )

  const onSubmit = useCallback(
    async (data: ModeratorProfileFormValues) => {
      try {
        await createOrUpdateModeratorProfile(
          {
            fullName: data.fullName.trim(),
            email: data.email.trim(),
            image: data.image ?? undefined,
          },
          accessToken
        )

        toast.success(t("success.profileCreated"))
        onSuccess()
        onClose()
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : t("errors.createFailed")
        toast.error(errorMessage)
      }
    },
    [accessToken, onSuccess, onClose, t]
  )

  const handleClose = useCallback(() => {
    if (isSubmitting) {
      return
    }
    onClose()
  }, [isSubmitting, onClose])

  const isFormValid = form.formState.isValid
  const hasValues = watch("fullName") && watch("email")

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
              <FieldDescription>
                {t("fullName.description")}
              </FieldDescription>
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
              <FieldDescription className="text-destructive">
                {errors.email.message}
              </FieldDescription>
            ) : (
              <FieldDescription>
                {t("email.description")}
              </FieldDescription>
            )}
          </FieldContent>
        </Field>
            
        <Field>
          <FieldLabel>{t("image.label")}</FieldLabel>
          <FieldContent>
            {imagePreview ? (
              <div className="relative inline-block">
                <div className="relative size-32 overflow-hidden rounded-lg border border-border">
                  <img
                    src={imagePreview}
                    alt={t("image.altText")}
                    className="size-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-sm"
                  className="absolute -right-2 -top-2"
                  onClick={handleRemoveImage}
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
                  <span className="font-medium text-foreground">
                    {t("image.uploadPrompt")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t("image.uploadHint")}
                  </span>
                </div>
              </label>
            )}
            <input
              id={uploadInputId}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isSubmitting}
            />
            <FieldDescription>
              {t("image.description")}
            </FieldDescription>
          </FieldContent>
        </Field>
      </div>
    </Modal>
  )
}

