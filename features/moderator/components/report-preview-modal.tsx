"use client"

import { useCallback, useMemo } from "react"
import {
  CalendarIcon,
  FileTextIcon,
  MailIcon,
  UserIcon,
  BuildingIcon,
  HashIcon,
  XIcon,
} from "lucide-react"
import { twMerge } from "tailwind-merge"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { PdfViewer } from "@/features/reports/components/pdf-viewer"
import { Separator } from "@/components/ui/separator"
import type { ModeratorReport } from "@/types/reports"
import { getPdfUrl } from "@/lib/storage"
import { REFERENCE_REGULATION_URL } from "@/consts/reports"

type ReportPreviewModalProps = {
  open: boolean
  report: ModeratorReport | null
  onClose: () => void
  onAssign?: (reportId: string) => void
  isAssigning?: boolean
}

export const ReportPreviewModal = ({
  open,
  report,
  onClose,
  onAssign,
  isAssigning = false,
}: ReportPreviewModalProps) => {
  const pdfUrl = useMemo(() => {
    if (!report?.pdfPath) {
      return null
    }
    return getPdfUrl(report.pdfPath)
  }, [report?.pdfPath])

  const formatDate = useCallback((dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }, [])

  const getStatusBadgeClass = useCallback((status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "assigned":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }, [])

  const handleAssign = useCallback(() => {
    if (report && onAssign) {
      onAssign(report.id)
    }
  }, [report, onAssign])

  if (!report) {
    return null
  }

  return (
    <Modal
      open={open}
      title="Report Preview"
      description="Review report details before assigning"
      onClose={onClose}
      panelClassName="max-w-7xl"
      footer={
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          {onAssign && (
            <Button onClick={handleAssign} disabled={isAssigning}>
              {isAssigning ? "Assigning..." : "Assign to Me"}
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <BuildingIcon className="size-5 text-muted-foreground" />
                <h3 className="text-2xl font-bold text-foreground">
                  {report.institutionName || report.reportedInstitution || "Unnamed Institution"}
                </h3>
              </div>
              {report.numerRspo && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <HashIcon className="size-4" />
                  <span>RSPO Number: {report.numerRspo}</span>
                </div>
              )}
            </div>
            <span
              className={twMerge(
                "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium capitalize",
                getStatusBadgeClass(report.status)
              )}
            >
              {report.status}
            </span>
          </div>
        </div>

        {/* Report Details Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
            <h4 className="text-sm font-semibold text-foreground">Reporter Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <UserIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{report.reporterName}</p>
                  <p className="text-xs text-muted-foreground">Reporter Name</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MailIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{report.reporterEmail}</p>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
            <h4 className="text-sm font-semibold text-foreground">Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Created</p>
                  <p className="text-xs text-muted-foreground">{formatDate(report.createdAt)}</p>
                </div>
              </div>
              {report.assignedAt && (
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Assigned</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(report.assignedAt)}
                    </p>
                  </div>
                </div>
              )}
              {report.completedAt && (
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Completed</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(report.completedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description and Reason */}
        {(report.reportDescription || report.reportReason) && (
          <div className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
            {report.reportDescription && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {report.reportDescription}
                </p>
              </div>
            )}
            {report.reportReason && (
              <>
                {report.reportDescription && <Separator />}
                <div className="flex items-start gap-3">
                  <FileTextIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-semibold text-foreground">Report Reason</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {report.reportReason}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* PDF Viewers */}
        <div className="grid gap-4 lg:grid-cols-2">
          <PdfViewer
            title="Submitted Document"
            src={pdfUrl}
            fileName={report.pdfPath?.split("/").pop()}
            emptyText="No PDF document available"
          />
          <PdfViewer
            title="Reference Regulation"
            src={REFERENCE_REGULATION_URL}
            emptyText=""
            actionLink={{
              href: REFERENCE_REGULATION_URL,
              label: "Open in new tab",
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

