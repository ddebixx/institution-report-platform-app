"use client"

import { useCallback, useMemo } from "react"
import {
  Controller,
  type Control,
  type FieldErrors,
} from "react-hook-form"
import { useTranslations } from "next-intl"

import {
  UniversalSearchInput,
  type UniversalSearchOption,
} from "@/components/ui/universal-search"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { ReportFormValues } from "@/types/reports"
import type { InstitutionSearchResult } from "@/fetchers/institutions"
import { mapInstitutionToOption } from "@/lib/reports"
import { MIN_SCHOOL_SEARCH_CHARACTERS } from "@/consts/reports"

type ReportFormStep1Props = {
  control: Control<ReportFormValues>
  errors: FieldErrors<ReportFormValues>
  onInstitutionSearch: (query: string) => Promise<InstitutionSearchResult[]>
  onInstitutionSelect: (option: UniversalSearchOption) => void
}

export const ReportFormStep1 = ({
  control,
  errors,
  onInstitutionSearch,
  onInstitutionSelect,
}: ReportFormStep1Props) => {
  const t = useTranslations("reportModal")

  const institutionSearchStatusText = useMemo(
    () => ({
      minChars: t("fields.institutionSearch.status.minChars", {
        count: MIN_SCHOOL_SEARCH_CHARACTERS,
      }),
      loading: t("fields.institutionSearch.status.loading"),
      empty: t("fields.institutionSearch.status.empty"),
      error: t("fields.institutionSearch.status.error"),
      idle: t("fields.institutionSearch.status.idle"),
    }),
    [t]
  )

  const handleInstitutionSearch = useCallback(
    async (query: string) => {
      const results = await onInstitutionSearch(query)
      return results.map(mapInstitutionToOption)
    },
    [onInstitutionSearch]
  )

  return (
    <div className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel>{t("fields.reporterName.label")}</FieldLabel>
          <FieldContent>
            <Controller
              control={control}
              name="reporterName"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t("fields.reporterName.placeholder")}
                  aria-invalid={Boolean(errors.reporterName)}
                />
              )}
            />
          </FieldContent>
          {errors.reporterName?.message ? (
            <FieldDescription className="text-destructive">
              {errors.reporterName.message}
            </FieldDescription>
          ) : null}
        </Field>

        <Field>
          <FieldLabel>{t("fields.reporterEmail.label")}</FieldLabel>
          <FieldContent>
            <Controller
              control={control}
              name="reporterEmail"
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder={t("fields.reporterEmail.placeholder")}
                  aria-invalid={Boolean(errors.reporterEmail)}
                />
              )}
            />
          </FieldContent>
          {errors.reporterEmail?.message ? (
            <FieldDescription className="text-destructive">
              {errors.reporterEmail.message}
            </FieldDescription>
          ) : null}
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel>
            {t("fields.institutionName.label")}
            <span className="text-destructive ml-1">*</span>
          </FieldLabel>
          <FieldContent>
            <Controller
              control={control}
              name="institutionName"
              render={({ field }) => (
                <UniversalSearchInput
                  inputId="institution-name-search"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder={t("fields.institutionSearch.placeholder")}
                  minCharacters={MIN_SCHOOL_SEARCH_CHARACTERS}
                  fetchResults={handleInstitutionSearch}
                  onSelect={onInstitutionSelect}
                  statusText={institutionSearchStatusText}
                />
              )}
            />
          </FieldContent>
          {errors.institutionName?.message ? (
            <FieldDescription className="text-destructive">
              {errors.institutionName.message}
            </FieldDescription>
          ) : null}
        </Field>

        <Field>
          <FieldLabel>{t("fields.numerRspo.label")}</FieldLabel>
          <FieldContent>
            <Controller
              control={control}
              name="numerRspo"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={t("fields.numerRspo.placeholder")}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              )}
            />
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  )
}

