"use client"

import { useCallback } from "react"
import { AlertCircleIcon } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import type { ModeratorReport } from "@/types/reports"
import { ReportCard } from "./report-card"

type ReportsListProps = {
  reports: ModeratorReport[]
  onAssign?: (reportId: string) => void
  onPreview?: (report: ModeratorReport) => void
  onReview?: (report: ModeratorReport) => void
  assigningReportId?: string | null
  showAssignButton?: boolean
  emptyMessage?: string
}

export const ReportsList = ({
  reports,
  onAssign,
  onPreview,
  onReview,
  assigningReportId,
  showAssignButton = false,
  emptyMessage = "No reports available",
}: ReportsListProps) => {
  const handleAssign = useCallback(
    (reportId: string) => {
      if (onAssign) {
        onAssign(reportId)
      }
    },
    [onAssign]
  )

  if (reports.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircleIcon />
          </EmptyMedia>
          <EmptyTitle>No reports found</EmptyTitle>
          <EmptyDescription>{emptyMessage}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onAssign={handleAssign}
          onPreview={onPreview}
          onReview={onReview}
          isAssigning={assigningReportId === report.id}
          showAssignButton={showAssignButton}
        />
      ))}
    </div>
  )
}

