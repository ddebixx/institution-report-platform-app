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

import { Button } from "@/components/ui/button/button";
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
    <div className="group relative flex min-h-0 flex-col overflow-hidden rounded-xl border border-border/50 bg-card/80 p-4 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xs hover:shadow-primary/10 sm:p-6 sm:min-h-[320px]">
      <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-transparent to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-primary/3 group-hover:to-primary/3" />

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-3 text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-lg">
              {report.institutionName || report.reportedInstitution || t("unnamedSchool")}
            </h3>
            {report.numerRspo && (
              <p className="mt-0.5 truncate text-xs text-muted-foreground sm:mt-1 sm:text-sm">
                {t("rspoLabel", { number: report.numerRspo })}
              </p>
            )}
          </div>
          <span
            className={twMerge(
              "relative z-10 shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm transition-all duration-300 sm:px-3 sm:py-1",
              getReportStatusBadgeClass(report.status)
            )}
          >
            {statusLabel}
          </span>
        </div>

        {report.reportDescription && (
          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground sm:mt-3 sm:text-sm">
            {report.reportDescription}
          </p>
        )}

        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 sm:mt-4">
          <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground sm:gap-2 sm:text-sm">
            <UserIcon className="size-3.5 shrink-0 sm:size-4" />
            <span className="truncate text-xs sm:text-sm">{report.reporterName}</span>
          </div>
          <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground sm:gap-2 sm:text-sm">
            <MailIcon className="size-3.5 shrink-0 sm:size-4" />
            <span className="truncate text-xs sm:text-sm">{report.reporterEmail}</span>
          </div>
          <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground sm:gap-2 sm:text-sm">
            <CalendarIcon className="size-3.5 shrink-0 sm:size-4" />
            <span className="truncate text-xs sm:text-sm">
              {t("dates.created", { date: formatDate(report.createdAt) })}
            </span>
          </div>
          {report.assignedAt && (
            <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground sm:gap-2 sm:text-sm">
              <CalendarIcon className="size-3.5 shrink-0 sm:size-4" />
              <span className="truncate text-xs sm:text-sm">
                {t("dates.assigned", { date: formatDate(report.assignedAt) })}
              </span>
            </div>
          )}
          {report.completedAt && (
            <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground sm:gap-2 sm:text-sm">
              <CalendarIcon className="size-3.5 shrink-0 sm:size-4" />
              <span className="truncate text-xs sm:text-sm">
                {t("dates.completed", { date: formatDate(report.completedAt) })}
              </span>
            </div>
          )}
        </div>

        {report.reportReason && (
          <div className="mt-3 flex min-w-0 items-start gap-2 rounded-lg border border-border/30 bg-muted/30 p-2 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/20 group-hover:bg-muted/40 sm:p-3">
            <FileTextIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary sm:size-4" />
            <p className="min-w-0 flex-1 text-xs text-muted-foreground sm:text-sm">
              <span className="font-medium">{t("reason")}</span>{" "}
              <span className="line-clamp-2">{report.reportReason}</span>
            </p>
          </div>
        )}
      </div>

      <div className="relative mt-auto flex shrink-0 flex-wrap items-center justify-end gap-1.5 border-t border-border/50 pt-3 sm:gap-2 sm:pt-4">
        {onPreview && (
          <Button
            variant="outline"
            onClick={() => onPreview(report)}
            size="sm"
            className="shrink-0 gap-1.5 sm:gap-2"
            aria-label={t("actions.preview")}
          >
            <EyeIcon className="size-3.5 sm:size-4" />
            <span className="hidden sm:inline">{t("actions.preview")}</span>
          </Button>
        )}
        {report.status === "assigned" && onUnassign && (
          <Button
            variant="outline"
            onClick={() => onUnassign(report.id)}
            disabled={isUnassigning}
            size="sm"
            className="shrink-0 gap-1.5 sm:gap-2"
            aria-label={isUnassigning ? t("actions.unassigning") : t("actions.unassign")}
          >
            <X className="size-3.5 sm:size-4" />
            <span className="hidden sm:inline">
              {isUnassigning ? t("actions.unassigning") : t("actions.unassign")}
            </span>
          </Button>
        )}
        {report.status === "assigned" && onReview && (
          <Button
            onClick={() => onReview(report)}
            size="sm"
            className="shrink-0 gap-1.5 sm:gap-2"
            aria-label={t("actions.review")}
          >
            <FileCheckIcon className="size-3.5 sm:size-4" />
            <span className="hidden sm:inline">{t("actions.review")}</span>
          </Button>
        )}
        {showAssignButton && onAssign && (
          <Button
            onClick={() => onAssign(report.id)}
            disabled={isAssigning}
            size="sm"
            className="shrink-0 min-w-0 sm:min-w-[120px]"
          >
            {isAssigning ? t("actions.assigning") : t("actions.assignToMe")}
          </Button>
        )}
      </div>
    </div>
  );
};
