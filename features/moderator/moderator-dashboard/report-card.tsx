"use client";

import { useCallback } from "react";
import {
  CalendarIcon,
  FileTextIcon,
  MailIcon,
  UserIcon,
  EyeIcon,
  FileCheckIcon,
  X,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { ReportCardProps } from "@/types/reports";
import { formatReportDateShort } from "@/utils/format-date";
import { getReportStatusBadgeClass, getReportStatusLabelKey } from "@/utils/report-status";

export const ReportCard = ({
  report,
  onAssign,
  onUnassign,
  onPreview,
  onReview,
  isAssigning = false,
  isUnassigning = false,
  showAssignButton = false,
}: ReportCardProps) => {
  const t = useTranslations("reportCard");

  const formatDate = useCallback(
    (dateString?: string) =>
      formatReportDateShort(dateString, { emptyLabel: t("dates.notAvailable") }),
    [t]
  );

  const statusLabel = t(getReportStatusLabelKey(report.status));

  return (
    <div className="group relative flex h-[340px] flex-col overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xs hover:shadow-primary/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-primary/3 group-hover:to-primary/3" />

      <div className="relative flex flex-1 flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-3 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
              {report.institutionName || report.reportedInstitution || t("unnamedSchool")}
            </h3>
            {report.numerRspo && (
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {t("rspoLabel", { number: report.numerRspo })}
              </p>
            )}
          </div>
          <span
            className={twMerge(
              "relative z-10 shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm transition-all duration-300",
              getReportStatusBadgeClass(report.status)
            )}
          >
            {statusLabel}
          </span>
        </div>

        {report.reportDescription && (
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {report.reportDescription}
          </p>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <UserIcon className="size-4 shrink-0" />
            <span className="truncate">{report.reporterName}</span>
          </div>
          <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <MailIcon className="size-4 shrink-0" />
            <span className="truncate">{report.reporterEmail}</span>
          </div>
          <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="size-4 shrink-0" />
            <span className="truncate">
              {t("dates.created", { date: formatDate(report.createdAt) })}
            </span>
          </div>
          {report.assignedAt && (
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="size-4 shrink-0" />
              <span className="truncate">
                {t("dates.assigned", { date: formatDate(report.assignedAt) })}
              </span>
            </div>
          )}
          {report.completedAt && (
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="size-4 shrink-0" />
              <span className="truncate">
                {t("dates.completed", { date: formatDate(report.completedAt) })}
              </span>
            </div>
          )}
        </div>

        {report.reportReason && (
          <div className="mt-4 flex min-w-0 items-start gap-2 rounded-lg border border-border/30 bg-muted/30 p-3 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/20 group-hover:bg-muted/40">
            <FileTextIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
            <p className="min-w-0 flex-1 text-sm text-muted-foreground">
              <span className="font-medium">{t("reason")}</span>{" "}
              <span className="line-clamp-2">{report.reportReason}</span>
            </p>
          </div>
        )}
      </div>

      <div className="relative mt-auto flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-border/50 pt-4">
        {onPreview && (
          <Button
            variant="outline"
            onClick={() => onPreview(report)}
            size="sm"
            className="shrink-0 gap-2"
          >
            <EyeIcon className="size-4" />
            {t("actions.preview")}
          </Button>
        )}
        {report.status === "assigned" && onUnassign && (
          <Button
            variant="outline"
            onClick={() => onUnassign(report.id)}
            disabled={isUnassigning}
            size="sm"
            className="shrink-0 gap-2"
          >
            <X className="size-4" />
            {isUnassigning ? t("actions.unassigning") : t("actions.unassign")}
          </Button>
        )}
        {report.status === "assigned" && onReview && (
          <Button onClick={() => onReview(report)} size="sm" className="shrink-0 gap-2">
            <FileCheckIcon className="size-4" />
            {t("actions.review")}
          </Button>
        )}
        {showAssignButton && onAssign && (
          <Button
            onClick={() => onAssign(report.id)}
            disabled={isAssigning}
            size="sm"
            className="shrink-0 min-w-[120px]"
          >
            {isAssigning ? t("actions.assigning") : t("actions.assignToMe")}
          </Button>
        )}
      </div>
    </div>
  );
};
