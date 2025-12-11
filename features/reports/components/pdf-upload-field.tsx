"use client"

import { type ChangeEvent, useCallback, useMemo } from "react"
import { twMerge } from "tailwind-merge"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

type PdfUploadFieldProps = {
  file: File | null
  fileError?: string
  onFileChange: (file: File | null) => void
}

export const PdfUploadField = ({
  file,
  fileError,
  onFileChange,
}: PdfUploadFieldProps) => {
  const t = useTranslations("reportModal.compare")
  const uploadInputId = useMemo(
    () => `pdf-upload-${Math.random().toString(36).slice(2, 9)}`,
    []
  )

  const handleFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextFile = event.target.files?.[0] ?? null
      onFileChange(nextFile)
    },
    [onFileChange]
  )

  return (
    <Field>
      <FieldLabel>{t("upload.title")}</FieldLabel>
      <FieldContent>
        <label
          className={twMerge(
            "flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-input px-3 py-3 text-sm shadow-xs transition",
            "hover:border-ring",
            fileError ? "border-destructive/70 text-destructive" : ""
          )}
          htmlFor={uploadInputId}
        >
          <div className="flex flex-col">
            <span className="font-medium text-foreground">
              {file?.name ?? t("upload.placeholder")}
            </span>
            <span className="text-xs text-muted-foreground">{t("upload.helper")}</span>
          </div>
        </label>
        <input
          id={uploadInputId}
          type="file"
          accept="application/pdf"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </FieldContent>
      {fileError ? (
        <FieldDescription className="text-destructive">{fileError}</FieldDescription>
      ) : null}
    </Field>
  )
}

