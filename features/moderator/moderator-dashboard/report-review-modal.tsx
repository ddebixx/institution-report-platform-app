"use client";

import { useMemo } from "react";
import {
  CalendarIcon,
  MailIcon,
  UserIcon,
  BuildingIcon,
  HashIcon,
  CheckCircleIcon,
} from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { PdfViewer } from "@/features/reports/report-modal/pdf-viewer";
import { Separator } from "@/components/ui/separator";
import { FindingsManager } from "@/features/reports/report-modal/findings-manager";
import { ComparisonNotesField } from "@/features/reports/report-modal/comparison-notes-field";
import type { ReportReviewModalProps } from "@/types/reports";
import { getPdfUrl } from "@/lib/storage";
import { REFERENCE_REGULATION_URL } from "@/consts/reports";
import { createRegulationReferences } from "@/lib/reports";
import { useTranslations } from "next-intl";
import { useAuthContext } from "@/components/auth/auth-provider";
import { useReportReviewForm } from "@/hooks/use-report-review";
import { formatReportDate } from "@/utils/format-date";

export const ReportReviewModal = ({ open, report, onClose, onUpdate }: ReportReviewModalProps) => {
  const t = useTranslations("reportReviewModal");
  const tReportModal = useTranslations("reportModal");
  const { accessToken } = useAuthContext();

  const {
    findings,
    setFindings,
    comparisonNotes,
    setComparisonNotes,
    isSubmitting,
    handleSave,
    handleClose,
  } = useReportReviewForm({
    report,
    accessToken,
    onUpdate,
    onClose,
    successMessage: t("successMessage"),
    errorMessage: t("errorMessage"),
  });

  const pdfUrl = useMemo(() => getPdfUrl(report?.pdfPath), [report?.pdfPath]);

  const regulationReferences = useMemo(
    () => createRegulationReferences(tReportModal),
    [tReportModal]
  );

  if (!report) return null;

  return (
    <Modal
      open={open}
      title={t("title")}
      description={t("description")}
      onClose={handleClose}
      panelClassName="max-w-[1200px]"
      footer={
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleClose} disabled={isSubmitting}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? t("saving") : t("saveReview")}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
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
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium capitalize text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {report.status}
              </span>
            </div>
          </div>
        </div>

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

        <div className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="size-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{t("reviewAndFindings")}</h3>
          </div>

          <FindingsManager
            regulations={regulationReferences}
            findings={findings}
            onFindingsChange={setFindings}
          />

          <ComparisonNotesField value={comparisonNotes} onChange={setComparisonNotes} />
        </div>
      </div>
    </Modal>
  );
};
