"use client"

import { useCallback, useEffect, useMemo } from "react"
import { type ChangeEvent } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { LoaderIcon, UploadIcon, XIcon } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

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
          toast.error("Please select an image file")
          return
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Image size must be less than 5MB")
          return
        }
        setValue("image", file, { shouldDirty: true, shouldValidate: false })
      }
    },
    [setValue]
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

        toast.success("Profile created successfully")
        onSuccess()
        onClose()
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to create profile"
        toast.error(errorMessage)
      }
    },
    [accessToken, onSuccess, onClose]
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
      title="Complete Your Profile"
      description="Please provide your full name and email to continue. You can optionally upload a profile image."
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
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Field>
          <FieldLabel>
            Full Name <span className="text-destructive">*</span>
          </FieldLabel>
          <FieldContent>
            <Controller
              control={control}
              name="fullName"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your full name"
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
                This name will be displayed on your moderator profile
              </FieldDescription>
            )}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>
            Email <span className="text-destructive">*</span>
          </FieldLabel>
          <FieldContent>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email address"
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
                This email will be used for moderator communications
              </FieldDescription>
            )}
          </FieldContent>
        </Field>
            
        <Field>
          <FieldLabel>Profile Image (Optional)</FieldLabel>
          <FieldContent>
            {imagePreview ? (
              <div className="relative inline-block">
                <div className="relative size-32 overflow-hidden rounded-lg border border-border">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
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
                    Click to upload an image
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 5MB
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
              Upload a profile picture to personalize your account (optional)
            </FieldDescription>
          </FieldContent>
        </Field>
      </div>
    </Modal>
  )
}

