"use client"

import { useCallback, useMemo, useState } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ReportFinding, RegulationReference } from "@/types/reports"
import { generateFindingId, createRegulationLookup } from "@/lib/reports"

type FindingsManagerProps = {
  regulations: RegulationReference[]
  findings: ReportFinding[]
  onFindingsChange: (findings: ReportFinding[]) => void
}

export const FindingsManager = ({
  regulations,
  findings,
  onFindingsChange,
}: FindingsManagerProps) => {
  const t = useTranslations("reportModal.compare")
  const [pendingDetail, setPendingDetail] = useState<string>("")
  const [pendingPageReference, setPendingPageReference] = useState<string>("")
  const [pendingRegulationId, setPendingRegulationId] = useState<string>("")

  const regulationLookup = useMemo(
    () => createRegulationLookup(regulations),
    [regulations]
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

  return (
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
  )
}

