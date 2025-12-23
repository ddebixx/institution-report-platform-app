"use client"

import { useTranslations } from "next-intl"

import type {
  ReportDocumentCompareProps,
  RegulationReference,
  ReportFinding,
} from "@/types/reports"
import { useFilePreview } from "@/hooks/use-file-preview"
import { PdfUploadField } from "./components/pdf-upload-field"
import { PdfViewer } from "./components/pdf-viewer"
import { FindingsManager } from "./components/findings-manager"
import { ComparisonNotesField } from "./components/comparison-notes-field"

export type { RegulationReference, ReportFinding }

export const ReportDocumentCompare = ({
  file,
  regulations,
  findings,
  comparisonNotes,
  fileError,
  referencePdfUrl,
  onFileChange,
  onFindingsChange,
  onComparisonNotesChange,
}: ReportDocumentCompareProps) => {
  const t = useTranslations("reportModal.compare")
  const previewUrl = useFilePreview(file)

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <PdfUploadField file={file} fileError={fileError} onFileChange={onFileChange} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PdfViewer
          title={t("upload.uploadedTitle")}
          src={previewUrl}
          fileName={file?.name}
          emptyText={t("upload.empty")}
        />
        <PdfViewer
          title={t("reference.title")}
          src={referencePdfUrl}
          emptyText=""
          actionLink={{
            href: referencePdfUrl,
            label: t("reference.open"),
          }}
        />
      </div>

      <FindingsManager
        regulations={regulations}
        findings={findings}
        onFindingsChange={onFindingsChange}
      />

      <ComparisonNotesField value={comparisonNotes} onChange={onComparisonNotesChange} />
    </div>
  )
}

