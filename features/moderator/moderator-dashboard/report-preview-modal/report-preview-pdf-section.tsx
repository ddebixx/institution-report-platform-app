"use client";

import { PdfViewer } from "@/features/reports/report-modal/pdf-viewer";
import { REFERENCE_REGULATION_URL } from "@/consts/reports";

type ReportPreviewPdfSectionProps = {
  pdfUrl: string | null;
  pdfFileName: string | undefined;
  submittedDocumentTitle: string;
  referenceRegulationTitle: string;
  noPdfText: string;
  openInNewTabLabel: string;
};

export const ReportPreviewPdfSection = ({
  pdfUrl,
  pdfFileName,
  submittedDocumentTitle,
  referenceRegulationTitle,
  noPdfText,
  openInNewTabLabel,
}: ReportPreviewPdfSectionProps) => (
  <div className="grid gap-4 lg:grid-cols-2">
    <PdfViewer
      title={submittedDocumentTitle}
      src={pdfUrl}
      fileName={pdfFileName}
      emptyText={noPdfText}
    />
    <PdfViewer
      title={referenceRegulationTitle}
      src={REFERENCE_REGULATION_URL}
      emptyText=""
      actionLink={{
        href: REFERENCE_REGULATION_URL,
        label: openInNewTabLabel,
      }}
    />
  </div>
);
