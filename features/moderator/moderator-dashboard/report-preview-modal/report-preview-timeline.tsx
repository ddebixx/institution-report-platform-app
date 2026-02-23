"use client";

import { CalendarIcon } from "lucide-react";

import { formatReportDate } from "@/utils/format-date";
import type { ModeratorReport } from "@/types/reports";

type ReportPreviewTimelineProps = {
  report: Pick<ModeratorReport, "createdAt" | "assignedAt" | "completedAt">;
  title: string;
  createdLabel: string;
  assignedLabel: string;
  completedLabel: string;
};

export const ReportPreviewTimeline = ({
  report,
  title,
  createdLabel,
  assignedLabel,
  completedLabel,
}: ReportPreviewTimelineProps) => (
  <div className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
    <h4 className="text-sm font-semibold text-foreground">{title}</h4>
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm">
        <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
        <div className="flex-1">
          <p className="font-medium text-foreground">{createdLabel}</p>
          <p className="text-xs text-muted-foreground">{formatReportDate(report.createdAt)}</p>
        </div>
      </div>
      {report.assignedAt ? (
        <div className="flex items-center gap-3 text-sm">
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium text-foreground">{assignedLabel}</p>
            <p className="text-xs text-muted-foreground">{formatReportDate(report.assignedAt)}</p>
          </div>
        </div>
      ) : null}
      {report.completedAt ? (
        <div className="flex items-center gap-3 text-sm">
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium text-foreground">{completedLabel}</p>
            <p className="text-xs text-muted-foreground">{formatReportDate(report.completedAt)}</p>
          </div>
        </div>
      ) : null}
    </div>
  </div>
);
