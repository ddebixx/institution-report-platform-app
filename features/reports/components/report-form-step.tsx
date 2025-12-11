"use client"

import { useCallback, useMemo } from "react"
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
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
import { Textarea } from "@/components/ui/textarea"
import type { ReportFormValues } from "@/types/reports"
import type { InstitutionSearchResult } from "@/fetchers/institutions"
import { mapInstitutionToOption } from "@/lib/reports"
import { MIN_INSTITUTION_SEARCH_CHARACTERS } from "@/consts/reports"

type ReportFormStep1Props = {
  control: Control<ReportFormValues>
  register: UseFormRegister<ReportFormValues>
  errors: FieldErrors<ReportFormValues>
  onInstitutionSearch: (query: string) => Promise<InstitutionSearchResult[]>
  onInstitutionSelect: (option: UniversalSearchOption) => void
}

export const ReportFormStep1 = ({
  control,
  register,
  errors,
  onInstitutionSearch,
  onInstitutionSelect,
}: ReportFormStep1Props) => {
  const t = useTranslations("reportModal")

  const institutionSearchStatusText = useMemo(
    () => ({
      minChars: t("fields.institutionSearch.status.minChars", {
        count: MIN_INSTITUTION_SEARCH_CHARACTERS,
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
          <FieldLabel>{t("fields.institutionName.label")}</FieldLabel>
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
                  minCharacters={MIN_INSTITUTION_SEARCH_CHARACTERS}
                  fetchResults={handleInstitutionSearch}
                  onSelect={onInstitutionSelect}
                  statusText={institutionSearchStatusText}
                />
              )}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>{t("fields.numerRspo.label")}</FieldLabel>
          <FieldContent>
            <Input
              {...register("numerRspo")}
              placeholder={t("fields.numerRspo.placeholder")}
            />
          </FieldContent>
        </Field>
      </FieldGroup>

      <Field>
        <FieldLabel>{t("fields.reportDescription.label")}</FieldLabel>
        <FieldContent>
          <Textarea
            {...register("reportDescription")}
            placeholder={t("fields.reportDescription.placeholder")}
            rows={4}
          />
        </FieldContent>
      </Field>
    </div>
  )
}

