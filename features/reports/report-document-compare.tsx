"use client"

import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { twMerge } from "tailwind-merge"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export type RegulationReference = {
  id: string
  title: string
  description: string
}

export type ReportFinding = {
  id: string
  detail: string
  regulationId?: string
  pageReference?: string
}

type ReportDocumentCompareProps = {
  file: File | null
  regulations: RegulationReference[]
  findings: ReportFinding[]
  comparisonNotes: string
  fileError?: string
  referencePdfUrl: string
  onFileChange: (file: File | null) => void
  onFindingsChange: (findings: ReportFinding[]) => void
  onComparisonNotesChange: (value: string) => void
}

export const ReportDocumentCompare = ({
  file,
  regulations,
  findings,
  comparisonNotes,
  fileError,
  referencePdfUrl,
  onFileChange,
  onFindingsChange,
  onComparisonNotesChange,
}: ReportDocumentCompareProps) => {
  const t = useTranslations("reportModal.compare")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [pendingDetail, setPendingDetail] = useState<string>("")
  const [pendingPageReference, setPendingPageReference] = useState<string>("")
  const [pendingRegulationId, setPendingRegulationId] = useState<string>("")

  const uploadInputId = useMemo(
    () => `pdf-upload-${Math.random().toString(36).slice(2, 9)}`,
    []
  )

  useEffect(() => {
    function syncPreviewUrl() {
      if (!file) {
        setPreviewUrl(null)
        return undefined
      }

      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      return () => {
        URL.revokeObjectURL(objectUrl)
      }
    }

    const cleanup = syncPreviewUrl()

    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [file])

  const regulationLookup = useMemo(
    () =>
      regulations.reduce<Record<string, RegulationReference>>(
        (acc, regulation) => {
          acc[regulation.id] = regulation
          return acc
        },
        {}
      ),
    [regulations]
  )

  const generateFindingId = useCallback(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID()
    }

    return `finding-${Date.now()}`
  }, [])

  const handleFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextFile = event.target.files?.[0] ?? null
      onFileChange(nextFile)
    },
    [onFileChange]
  )

  const handleAddFinding = useCallback(() => {
    const trimmedDetail = pendingDetail.trim()

    if (!trimmedDetail) {
      return
    }

    const nextFinding: ReportFinding = {
      id: generateFindingId(),
      detail: trimmedDetail,
      pageReference: pendingPageReference.trim() || undefined,
      regulationId: pendingRegulationId || undefined,
    }

    onFindingsChange([...findings, nextFinding])
    setPendingDetail("")
    setPendingPageReference("")
    setPendingRegulationId("")
  }, [
    findings,
    generateFindingId,
    onFindingsChange,
    pendingDetail,
    pendingPageReference,
    pendingRegulationId,
  ])

  const handleRemoveFinding = useCallback(
    (findingId: string) => {
      onFindingsChange(findings.filter((finding) => finding.id !== findingId))
    },
    [findings, onFindingsChange]
  )

  const handleComparisonNotesChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onComparisonNotesChange(event.target.value)
    },
    [onComparisonNotesChange]
  )

  const viewerHeightClass = "h-[65vh] min-h-[360px]"

  return (
    <div className="space-y-6">
      <div className="space-y-3">
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
              <Button type="button" size="sm" variant="outline">
                {file ? t("upload.replace") : t("upload.cta")}
              </Button>
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
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2 rounded-md border border-border/60 bg-muted/30 p-3">
          <div className="flex items-center justify-between gap-2 text-sm font-semibold text-foreground">
            <span>{t("upload.uploadedTitle")}</span>
            {file?.name ? (
              <span className="truncate text-xs font-normal text-muted-foreground">{file.name}</span>
            ) : null}
          </div>
          <div className={twMerge("rounded-md border border-border/50 bg-background", viewerHeightClass)}>
            {previewUrl ? (
              <iframe
                title="Uploaded PDF preview"
                src={previewUrl}
                className="h-full w-full rounded-md"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
                {t("upload.empty")}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 rounded-md border border-border/60 bg-muted/30 p-3">
          <div className="flex items-center justify-between gap-2 text-sm font-semibold text-foreground">
            <span>{t("reference.title")}</span>
            <a
              href={referencePdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              {t("reference.open")}
            </a>
          </div>
          <div className={twMerge("rounded-md border border-border/50 bg-background", viewerHeightClass)}>
            <iframe
              title="Reference regulation PDF"
              src={referencePdfUrl}
              className="h-full w-full rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3 rounded-md border border-border/60 bg-background p-4">
          <h3 className="text-sm font-semibold text-foreground">{t("regulations.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("regulations.description")}</p>
          <div className="space-y-3">
            {regulations.map((regulation) => (
              <div
                key={regulation.id}
                className="rounded-md border border-border/60 bg-muted/30 p-3"
              >
                <p className="text-sm font-semibold text-foreground">
                  {regulation.title}
                </p>
                <p className="text-xs text-muted-foreground">{regulation.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-md border border-border/60 bg-background p-4">
          <h3 className="text-sm font-semibold text-foreground">{t("highlights.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("highlights.description")}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              placeholder={t("highlights.pagePlaceholder")}
              value={pendingPageReference}
              onChange={(event) => setPendingPageReference(event.target.value)}
            />
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs transition focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
              value={pendingRegulationId}
              onChange={(event) => setPendingRegulationId(event.target.value)}
            >
              <option value="">{t("highlights.regulationPlaceholder")}</option>
              {regulations.map((regulation) => (
                <option key={regulation.id} value={regulation.id}>
                  {regulation.title}
                </option>
              ))}
            </select>
          </div>

          <Textarea
            value={pendingDetail}
            onChange={(event) => setPendingDetail(event.target.value)}
            placeholder={t("highlights.detailPlaceholder")}
            rows={3}
          />

          <div className="flex justify-end">
            <Button type="button" onClick={handleAddFinding} disabled={!pendingDetail.trim()}>
              {t("highlights.add")}
            </Button>
          </div>

          <div className="space-y-3">
            {findings.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("highlights.empty")}</p>
            ) : (
              findings.map((finding) => (
                <div
                  key={finding.id}
                  className="flex items-start justify-between gap-3 rounded-md border border-border/60 bg-muted/30 p-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm text-foreground">{finding.detail}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {finding.pageReference ? (
                        <span className="rounded-full bg-background px-2 py-0.5">
                          {t("highlights.pageLabel", { page: finding.pageReference })}
                        </span>
                      ) : null}
                      {finding.regulationId && regulationLookup[finding.regulationId] ? (
                        <span className="rounded-full bg-background px-2 py-0.5">
                          {t("highlights.regulationLabel", {
                            regulation: regulationLookup[finding.regulationId].title,
                          })}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFinding(finding.id)}
                  >
                    {t("highlights.remove")}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Field>
        <FieldLabel>{t("comparison.title")}</FieldLabel>
        <FieldContent>
          <Textarea
            value={comparisonNotes}
            onChange={handleComparisonNotesChange}
            placeholder={t("comparison.placeholder")}
            rows={4}
          />
        </FieldContent>
        <FieldDescription>{t("comparison.description")}</FieldDescription>
      </Field>
    </div>
  )
}

