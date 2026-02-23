"use client";

import { useCallback } from "react";
import { AlertCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  MODERATOR_EMPTY_LIST_DEFAULT_KEY,
  MODERATOR_EMPTY_LIST_TITLE_KEY,
} from "@/consts/moderator-dashboard";
import type { ReportsListProps } from "@/types/reports";
import { ReportCard } from "./report-card";

export const ReportsList = ({
  reports,
  onAssign,
  onUnassign,
  onPreview,
  onReview,
  assigningReportId,
  unassigningReportId,
  showAssignButton = false,
  emptyMessageKey,
  emptyMessage,
}: ReportsListProps) => {
  const t = useTranslations();
  const emptyText = emptyMessageKey
    ? t(emptyMessageKey)
    : (emptyMessage ?? t(MODERATOR_EMPTY_LIST_DEFAULT_KEY));

  const handleAssign = useCallback(
    (reportId: string) => {
      if (onAssign) {
        onAssign(reportId);
      }
    },
    [onAssign]
  );

  const handleUnassign = useCallback(
    (reportId: string) => {
      if (onUnassign) {
        onUnassign(reportId);
      }
    },
    [onUnassign]
  );

  if (reports.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircleIcon />
          </EmptyMedia>
          <EmptyTitle>{t(MODERATOR_EMPTY_LIST_TITLE_KEY)}</EmptyTitle>
          <EmptyDescription>{emptyText}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onAssign={handleAssign}
          onUnassign={handleUnassign}
          onPreview={onPreview}
          onReview={onReview}
          isAssigning={assigningReportId === report.id}
          isUnassigning={unassigningReportId === report.id}
          showAssignButton={showAssignButton}
        />
      ))}
    </div>
  );
};
