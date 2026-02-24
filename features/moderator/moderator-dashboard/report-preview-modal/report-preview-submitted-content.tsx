"use client";

import { Separator } from "@/components/ui/separator/separator";
import type { ReportContent } from "@/types/reports";

type ReportPreviewSubmittedContentProps = {
  content: ReportContent;
  title: string;
  findingsTitle: (params: { count: number }) => string;
  comparisonNotesTitle: string;
  pageLabel: (params: { page: string }) => string;
  regulationLabel: (params: { regulation: string }) => string;
};

export const ReportPreviewSubmittedContent = ({
  content,
  title,
  findingsTitle,
  comparisonNotesTitle,
  pageLabel,
  regulationLabel,
}: ReportPreviewSubmittedContentProps) => {
  const hasFindings = content.findings && content.findings.length > 0;
  const hasComparisonNotes = Boolean(content.comparisonNotes?.trim());

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>

      {hasFindings ? (
        <div className="space-y-3">
          <h5 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {findingsTitle({ count: content.findings.length })}
          </h5>
          <div className="space-y-2">
            {content.findings.map((finding) => (
              <div key={finding.id} className="rounded-md border border-border/60 bg-muted/30 p-3">
                <p className="text-sm text-foreground">{finding.detail}</p>
                {finding.pageReference || finding.regulationId ? (
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {finding.pageReference ? (
                      <span className="rounded-full bg-background px-2 py-0.5">
                        {pageLabel({ page: finding.pageReference })}
                      </span>
                    ) : null}
                    {finding.regulationId ? (
                      <span className="rounded-full bg-background px-2 py-0.5">
                        {regulationLabel({ regulation: finding.regulationId })}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {hasComparisonNotes ? (
        <>
          {hasFindings ? <Separator /> : null}
          <div className="space-y-2">
            <h5 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {comparisonNotesTitle}
            </h5>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {content.comparisonNotes}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};
