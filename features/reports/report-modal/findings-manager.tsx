"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Textarea } from "@/components/ui/textarea/textarea";
import { FindingRow } from "@/features/reports/report-modal/finding-row";
import type { PendingFinding } from "@/features/reports/report-modal/findings-manager-types";
import { createFinding, createRegulationLookup } from "@/lib/reports";
import type { FindingsManagerProps } from "@/types/reports";
import { PENDING_FINDING_INIT } from "@/consts/reports";

export const FindingsManager = ({
  regulations,
  findings,
  onFindingsChange,
}: FindingsManagerProps) => {
  const t = useTranslations("reportModal.compare");
  const [pending, setPending] = useState<PendingFinding>(PENDING_FINDING_INIT);

  const regulationLookup = useMemo(() => createRegulationLookup(regulations), [regulations]);

  const resetPending = useCallback(() => {
    setPending(PENDING_FINDING_INIT);
  }, []);

  const handleAddFinding = useCallback(() => {
    const trimmed = pending.detail.trim();
    if (!trimmed) return;

    onFindingsChange([
      ...findings,
      createFinding(pending.detail, pending.pageReference, pending.regulationId),
    ]);
    resetPending();
  }, [findings, onFindingsChange, pending, resetPending]);

  const handleRemoveFinding = useCallback(
    (findingId: string) => {
      onFindingsChange(findings.filter((f) => f.id !== findingId));
    },
    [findings, onFindingsChange]
  );

  const canAdd = Boolean(pending.detail.trim());

  return (
    <div className="space-y-4 rounded-md border border-border/60 bg-background p-4">
      <h3 className="text-sm font-semibold text-foreground">{t("highlights.title")}</h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          placeholder={t("highlights.pagePlaceholder")}
          value={pending.pageReference}
          onChange={(e) => setPending((prev) => ({ ...prev, pageReference: e.target.value }))}
        />
        <Select
          value={pending.regulationId || undefined}
          onValueChange={(value) => setPending((prev) => ({ ...prev, regulationId: value }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("highlights.regulationPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {regulations.map((regulation) => (
              <SelectItem key={regulation.id} value={regulation.id}>
                {regulation.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Textarea
        value={pending.detail}
        onChange={(e) => setPending((prev) => ({ ...prev, detail: e.target.value }))}
        placeholder={t("highlights.detailPlaceholder")}
        rows={3}
      />

      <div className="flex justify-end">
        <Button type="button" onClick={handleAddFinding} disabled={!canAdd}>
          {t("highlights.add")}
        </Button>
      </div>

      <div className="space-y-3">
        {findings.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("highlights.empty")}</p>
        ) : (
          findings.map((finding) => (
            <FindingRow
              key={finding.id}
              finding={finding}
              regulationLookup={regulationLookup}
              onRemove={handleRemoveFinding}
              pageLabel={(p) => t("highlights.pageLabel", p)}
              regulationLabel={(p) => t("highlights.regulationLabel", p)}
              removeLabel={t("highlights.remove")}
            />
          ))
        )}
      </div>
    </div>
  );
};
