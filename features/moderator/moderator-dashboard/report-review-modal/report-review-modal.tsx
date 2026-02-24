"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button/button";
import { Modal } from "@/components/ui/modal/modal";
import { createRegulationReferences } from "@/lib/reports";
import { getPdfUrl } from "@/lib/storage";
import { useAuthContext } from "@/providers/auth-provider";
import { useReportReviewForm } from "@/hooks/use-report-review";
import type { ReportReviewModalProps } from "@/types/reports";
import { ReportPreviewHeader } from "../report-preview-modal/report-preview-header";
import { ReportPreviewPdfSection } from "../report-preview-modal/report-preview-pdf-section";
import { ReportPreviewReporterInfo } from "../report-preview-modal/report-preview-reporter-info";
import { ReportPreviewSubmittedContent } from "../report-preview-modal/report-preview-submitted-content";
import { ReportPreviewTimeline } from "../report-preview-modal/report-preview-timeline";
import { ReportReviewFormSection } from "./report-review-form-section";

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

  const hasSubmittedContent =
    (report.reportContent?.findings?.length ?? 0) > 0 ||
    Boolean(report.reportContent?.comparisonNotes?.trim());

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

        <ReportReviewFormSection
          title={t("reviewAndFindings")}
          regulations={regulationReferences}
          findings={findings}
          onFindingsChange={setFindings}
          comparisonNotes={comparisonNotes}
          onComparisonNotesChange={setComparisonNotes}
        />
      </div>
    </Modal>
  );
};
