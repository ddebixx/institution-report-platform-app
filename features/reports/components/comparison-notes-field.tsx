"use client"

import { type ChangeEvent, useCallback } from "react"
import { useTranslations } from "next-intl"

import {
  Field,
  FieldContent,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

type ComparisonNotesFieldProps = {
  value: string
  onChange: (value: string) => void
}

export const ComparisonNotesField = ({
  value,
  onChange,
}: ComparisonNotesFieldProps) => {
  const t = useTranslations("reportModal.compare")

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value)
    },
    [onChange]
  )

  return (
    <Field>
      <FieldLabel>{t("comparison.title")}</FieldLabel>
      <FieldContent>
        <Textarea
          value={value}
          onChange={handleChange}
          placeholder={t("comparison.placeholder")}
          rows={4}
        />
      </FieldContent>
    </Field>
  )
}

