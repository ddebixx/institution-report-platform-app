"use client";

import { MailIcon, UserIcon } from "lucide-react";

import type { ModeratorReport } from "@/types/reports";

type ReportPreviewReporterInfoProps = {
  report: Pick<ModeratorReport, "reporterName" | "reporterEmail">;
  title: string;
  reporterNameLabel: string;
  emailLabel: string;
};

export const ReportPreviewReporterInfo = ({
  report,
  title,
  reporterNameLabel,
  emailLabel,
}: ReportPreviewReporterInfoProps) => (
  <div className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
    <h4 className="text-sm font-semibold text-foreground">{title}</h4>
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm">
        <UserIcon className="size-4 shrink-0 text-muted-foreground" />
        <div className="flex-1">
          <p className="font-medium text-foreground">{report.reporterName}</p>
          <p className="text-xs text-muted-foreground">{reporterNameLabel}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <MailIcon className="size-4 shrink-0 text-muted-foreground" />
        <div className="flex-1">
          <p className="font-medium text-foreground">{report.reporterEmail}</p>
          <p className="text-xs text-muted-foreground">{emailLabel}</p>
        </div>
      </div>
    </div>
  </div>
);
