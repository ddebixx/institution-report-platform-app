"use client";

import { useCallback, useMemo } from "react";
import { CalendarIcon, MailIcon, UserIcon, BuildingIcon, HashIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { PdfViewer } from "@/features/reports/components/pdf-viewer";
import { Separator } from "@/components/ui/separator";
import type { ReportPreviewModalProps } from "@/types/reports";
import { getPdfUrl } from "@/lib/storage";
import { REFERENCE_REGULATION_URL } from "@/consts/reports";
import { formatReportDate } from "@/utils/format-date";
import { getReportStatusBadgeClass } from "@/utils/report-status";

export const ReportPreviewModal = ({
  open,
  report,
  onClose,
  onAssign,
  onUnassign,
  isAssigning = false,
  isUnassigning = false,
}: ReportPreviewModalProps) => {
  const t = useTranslations("reportPreviewModal");
  const pdfUrl = useMemo(() => {
    if (!report?.pdfPath) {
      return null;
    }
    return getPdfUrl(report.pdfPath);
  }, [report?.pdfPath]);

  const handleAssign = useCallback(() => {
    if (report && onAssign) {
      onAssign(report.id);
    }
  }, [report, onAssign]);

  const handleUnassign = useCallback(() => {
    if (report && onUnassign) {
      onUnassign(report.id);
    }
  }, [report, onUnassign]);

  if (!report) {
    return null;
  }

  return (
    <Modal
      open={open}
      title={t("title")}
      description={t("description")}
      onClose={onClose}
      panelClassName="max-w-[1200px]"
      footer={
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            {t("close")}
          </Button>
          <div className="flex items-center gap-2">
            {report?.status === "assigned" && onUnassign && (
              <Button variant="outline" onClick={handleUnassign} disabled={isUnassigning}>
                {isUnassigning ? t("unassigning") : t("unassign")}
              </Button>
            )}
            {onAssign && (
              <Button onClick={handleAssign} disabled={isAssigning}>
                {isAssigning ? t("assigning") : t("assignToMe")}
              </Button>
            )}
          </div>
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
                  {report.institutionName || report.reportedInstitution || t("unnamedInstitution")}
                </h3>
              </div>
              {report.numerRspo && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <HashIcon className="size-4" />
                  <span>{t("rspoNumber", { number: report.numerRspo })}</span>
                </div>
              )}
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

        {/* Report Details Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
            <h4 className="text-sm font-semibold text-foreground">{t("reporterInformation")}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <UserIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{report.reporterName}</p>
                  <p className="text-xs text-muted-foreground">{t("reporterName")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MailIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{report.reporterEmail}</p>
                  <p className="text-xs text-muted-foreground">{t("emailAddress")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
            <h4 className="text-sm font-semibold text-foreground">{t("timeline")}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{t("created")}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatReportDate(report.createdAt)}
                  </p>
                </div>
              </div>
              {report.assignedAt && (
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{t("assigned")}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatReportDate(report.assignedAt)}
                    </p>
                  </div>
                </div>
              )}
              {report.completedAt && (
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{t("completed")}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatReportDate(report.completedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {(report.reportContent?.comparisonNotes ||
          (report.reportContent?.findings && report.reportContent.findings.length > 0)) && (
          <div className="space-y-4 rounded-lg border border-border bg-card p-5 shadow-sm">
            <h4 className="text-sm font-semibold text-foreground">{t("submittedReportContent")}</h4>

            {report.reportContent.findings && report.reportContent.findings.length > 0 && (
              <div className="space-y-3">
                <h5 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t("findings", { count: report.reportContent.findings.length })}
                </h5>
                <div className="space-y-2">
                  {report.reportContent.findings.map((finding) => (
                    <div
                      key={finding.id}
                      className="rounded-md border border-border/60 bg-muted/30 p-3"
                    >
                      <p className="text-sm text-foreground">{finding.detail}</p>
                      {(finding.pageReference || finding.regulationId) && (
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {finding.pageReference && (
                            <span className="rounded-full bg-background px-2 py-0.5">
                              {t("page", { page: finding.pageReference })}
                            </span>
                          )}
                          {finding.regulationId && (
                            <span className="rounded-full bg-background px-2 py-0.5">
                              {t("regulation", { regulation: finding.regulationId })}
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
                {report.reportContent.findings && report.reportContent.findings.length > 0 && (
                  <Separator />
                )}
                <div className="space-y-2">
                  <h5 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("comparisonNotes")}
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
            title={t("submittedDocument")}
            src={pdfUrl}
            fileName={report.pdfPath?.split("/").pop()}
            emptyText={t("noPdfAvailable")}
          />
          <PdfViewer
            title={t("referenceRegulation")}
            src={REFERENCE_REGULATION_URL}
            emptyText=""
            actionLink={{
              href: REFERENCE_REGULATION_URL,
              label: t("openInNewTab"),
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
