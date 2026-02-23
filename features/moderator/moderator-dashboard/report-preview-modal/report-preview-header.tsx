"use client";

import { BuildingIcon, HashIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { getReportStatusBadgeClass } from "@/utils/report-status";
import type { ModeratorReport } from "@/types/reports";

type ReportPreviewHeaderProps = {
  report: ModeratorReport;
  unnamedLabel: string;
  rspoLabel: (params: { number: string }) => string;
};

export const ReportPreviewHeader = ({
  report,
  unnamedLabel,
  rspoLabel,
}: ReportPreviewHeaderProps) => {
  const institutionName = report.institutionName || report.reportedInstitution || unnamedLabel;

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <BuildingIcon className="size-5 text-muted-foreground" />
            <h3 className="text-2xl font-bold text-foreground">{institutionName}</h3>
          </div>
          {report.numerRspo ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HashIcon className="size-4" />
              <span>{rspoLabel({ number: report.numerRspo })}</span>
            </div>
          ) : null}
        </div>
        <span
          className={twMerge(
            "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium capitalize",
            getReportStatusBadgeClass(report.status)
          )}
        >
          {report.status}
        </span>
      </div>
    </div>
  );
};
