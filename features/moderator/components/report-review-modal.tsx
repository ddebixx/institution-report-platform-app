"use client"

import { useCallback, useMemo, useState } from "react"
import {
  CalendarIcon,
  MailIcon,
  UserIcon,
  BuildingIcon,
  HashIcon,
  CheckCircleIcon,
} from "lucide-react"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { PdfViewer } from "@/features/reports/components/pdf-viewer"
import { Separator } from "@/components/ui/separator"
import { FindingsManager } from "@/features/reports/components/findings-manager"
import { ComparisonNotesField } from "@/features/reports/components/comparison-notes-field"
import { RegulationsList } from "@/features/reports/components/regulations-list"
import type { ModeratorReport, ReportFinding, RegulationReference } from "@/types/reports"
import { getPdfUrl } from "@/lib/storage"
import { REFERENCE_REGULATION_URL } from "@/consts/reports"
import { createRegulationReferences } from "@/lib/reports"
import { useTranslations } from "next-intl"
import { updateReportReview } from "@/mutations/reports"
import { useAuthContext } from "@/components/auth/auth-provider"

type ReportReviewModalProps = {
  open: boolean
  report: ModeratorReport | null
  onClose: () => void
  onUpdate?: () => void
}

export const ReportReviewModal = ({
  open,
  report,
  onClose,
  onUpdate,
}: ReportReviewModalProps) => {
  const t = useTranslations("reportModal")
  const { accessToken } = useAuthContext()
  const [findings, setFindings] = useState<ReportFinding[]>([])
  const [comparisonNotes, setComparisonNotes] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pdfUrl = useMemo(() => {
    if (!report?.pdfPath) {
      return null
    }
    return getPdfUrl(report.pdfPath)
  }, [report?.pdfPath])

  const regulationReferences = useMemo(
    () => createRegulationReferences(t),
    [t]
  )

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

  const handleSave = useCallback(async () => {
    if (!report || !accessToken) {
      return
    }

    setIsSubmitting(true)
    try {
      await updateReportReview(
        report.id,
        {
          findings,
          comparisonNotes,
        },
        accessToken
      )
      toast.success("Report review saved successfully")
      if (onUpdate) {
        onUpdate()
      }
      onClose()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save report review"
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }, [report, accessToken, findings, comparisonNotes, onUpdate, onClose])

  const handleClose = useCallback(() => {
    setFindings([])
    setComparisonNotes("")
    onClose()
  }, [onClose])

  if (!report) {
    return null
  }

  return (
    <Modal
      open={open}
      title="Review Report"
      description="Add findings and comparison notes for this report"
      onClose={handleClose}
      panelClassName="max-w-7xl"
      footer={
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Review"}
          </Button>
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
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium capitalize text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {report.status}
              </span>
            </div>
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
            </div>
          </div>
        </div>

        {/* User Submitted Content */}
        {(report.reportContent?.comparisonNotes || report.reportContent?.findings && report.reportContent.findings.length > 0) && (
          <div className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
            <h4 className="text-sm font-semibold text-foreground">Submitted Report Content</h4>
            
            {report.reportContent.findings && report.reportContent.findings.length > 0 && (
              <div className="space-y-3">
                <h5 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Findings ({report.reportContent.findings.length})
                </h5>
                <div className="space-y-2">
                  {report.reportContent.findings.map((finding, index) => (
                    <div
                      key={finding.id}
                      className="rounded-md border border-border/60 bg-muted/30 p-3"
                    >
                      <p className="text-sm text-foreground">{finding.detail}</p>
                      {(finding.pageReference || finding.regulationId) && (
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {finding.pageReference && (
                            <span className="rounded-full bg-background px-2 py-0.5">
                              Page: {finding.pageReference}
                            </span>
                          )}
                          {finding.regulationId && (
                            <span className="rounded-full bg-background px-2 py-0.5">
                              Regulation: {finding.regulationId}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {report.reportContent.comparisonNotes && (
              <>
                {report.reportContent.findings && report.reportContent.findings.length > 0 && <Separator />}
                <div className="space-y-2">
                  <h5 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Comparison Notes
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {report.reportContent.comparisonNotes}
                  </p>
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

        {/* Review Section */}
        <div className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="size-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Review & Findings</h3>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <RegulationsList regulations={regulationReferences} />
            <FindingsManager
              regulations={regulationReferences}
              findings={findings}
              onFindingsChange={setFindings}
            />
          </div>

          <ComparisonNotesField value={comparisonNotes} onChange={setComparisonNotes} />
        </div>
      </div>
    </Modal>
  )
}

