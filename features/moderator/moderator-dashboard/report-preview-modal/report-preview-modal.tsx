"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button/button";
import { Modal } from "@/components/ui/modal/modal";
import { getPdfUrl } from "@/lib/storage";
import type { ReportPreviewModalProps } from "@/types/reports";
import { ReportPreviewHeader } from "./report-preview-header";
import { ReportPreviewPdfSection } from "./report-preview-pdf-section";
import { ReportPreviewReporterInfo } from "./report-preview-reporter-info";
import { ReportPreviewSubmittedContent } from "./report-preview-submitted-content";
import { ReportPreviewTimeline } from "./report-preview-timeline";

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
  const pdfUrl = useMemo(
    () => (report?.pdfPath ? getPdfUrl(report.pdfPath) : null),
    [report?.pdfPath]
  );

  if (!report) return null;

  const hasSubmittedContent =
    (report.reportContent?.findings?.length ?? 0) > 0 ||
    Boolean(report.reportContent?.comparisonNotes?.trim());

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
            {report.status === "assigned" && onUnassign && (
              <Button
                variant="outline"
                onClick={() => onUnassign(report.id)}
                disabled={isUnassigning}
              >
                {isUnassigning ? t("unassigning") : t("unassign")}
              </Button>
            )}
            {onAssign && (
              <Button onClick={() => onAssign(report.id)} disabled={isAssigning}>
                {isAssigning ? t("assigning") : t("assignToMe")}
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <ReportPreviewHeader
          report={report}
          unnamedLabel={t("unnamedInstitution")}
          rspoLabel={(p: { number: string }) => t("rspoNumber", p)}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <ReportPreviewReporterInfo
            report={report}
            title={t("reporterInformation")}
            reporterNameLabel={t("reporterName")}
            emailLabel={t("emailAddress")}
          />
          <ReportPreviewTimeline
            report={report}
            title={t("timeline")}
            createdLabel={t("created")}
            assignedLabel={t("assigned")}
            completedLabel={t("completed")}
          />
        </div>

        {hasSubmittedContent && report.reportContent ? (
          <ReportPreviewSubmittedContent
            content={report.reportContent}
            title={t("submittedReportContent")}
            findingsTitle={(p: { count: number }) => t("findings", p)}
            comparisonNotesTitle={t("comparisonNotes")}
            pageLabel={(p: { page: string }) => t("page", p)}
            regulationLabel={(p: { regulation: string }) => t("regulation", p)}
          />
        ) : null}

        <ReportPreviewPdfSection
          pdfUrl={pdfUrl}
          pdfFileName={report.pdfPath?.split("/").pop()}
          submittedDocumentTitle={t("submittedDocument")}
          referenceRegulationTitle={t("referenceRegulation")}
          noPdfText={t("noPdfAvailable")}
          openInNewTabLabel={t("openInNewTab")}
        />
      </div>
    </Modal>
  );
};
