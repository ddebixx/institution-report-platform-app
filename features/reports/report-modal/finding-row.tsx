"use client";

import { Button } from "@/components/ui/button/button";
import type { FindingRowProps } from "@/features/reports/report-modal/findings-manager-types";

export const FindingRow = ({
  finding,
  regulationLookup,
  onRemove,
  pageLabel,
  regulationLabel,
  removeLabel,
}: FindingRowProps) => {
  const regulation = finding.regulationId ? regulationLookup[finding.regulationId] : null;

  return (
    <div className="flex items-start justify-between gap-3 rounded-md border border-border/60 bg-muted/30 p-3">
      <div className="space-y-1">
        <p className="text-sm text-foreground">{finding.detail}</p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {finding.pageReference ? (
            <span className="rounded-full bg-background px-2 py-0.5">
              {pageLabel({ page: finding.pageReference })}
            </span>
          ) : null}
          {regulation ? (
            <span className="rounded-full bg-background px-2 py-0.5">
              {regulationLabel({ regulation: regulation.title })}
            </span>
          ) : null}
        </div>
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={() => onRemove(finding.id)}>
        {removeLabel}
      </Button>
    </div>
  );
};
