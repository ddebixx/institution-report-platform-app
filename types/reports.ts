import type { Control, FieldErrors } from "react-hook-form";
import type { InstitutionSearchResult } from "@/fetchers/institutions";
import type { UniversalSearchOption } from "@/components/ui/universal-search";
import type {
  ReportFinding,
  RegulationReference,
  ModeratorReport,
  StepId,
  ReportFormValues,
} from "@/lib/schemas/reports";

export type {
  ReportFinding,
  ReportStatus,
  RegulationReference,
  ReportContent,
  ModeratorReport,
  StepId,
  ReportFormValues,
} from "@/lib/schemas/reports";

export type ReportModalProps = {
  open: boolean;
  onClose: () => void;
};

export type ReportDocumentCompareProps = {
  file: File | null;
  regulations: RegulationReference[];
  findings: ReportFinding[];
  comparisonNotes: string;
  fileError?: string;
  referencePdfUrl: string;
  onFileChange: (file: File | null) => void;
  onFindingsChange: (findings: ReportFinding[]) => void;
  onComparisonNotesChange: (value: string) => void;
};

export type ReportsListProps = {
  reports: ModeratorReport[];
  onAssign?: (reportId: string) => void;
  onUnassign?: (reportId: string) => void;
  onPreview?: (report: ModeratorReport) => void;
  onReview?: (report: ModeratorReport) => void;
  assigningReportId?: string | null;
  unassigningReportId?: string | null;
  showAssignButton?: boolean;
  emptyMessage?: string;
};

export type ReportCardProps = {
  report: ModeratorReport;
  onAssign?: (reportId: string) => void;
  onUnassign?: (reportId: string) => void;
  onPreview?: (report: ModeratorReport) => void;
  onReview?: (report: ModeratorReport) => void;
  isAssigning?: boolean;
  isUnassigning?: boolean;
  showAssignButton?: boolean;
};

export type ReportReviewModalProps = {
  open: boolean;
  report: ModeratorReport | null;
  onClose: () => void;
  onUpdate?: () => void;
};

export type ReportPreviewModalProps = {
  open: boolean;
  report: ModeratorReport | null;
  onClose: () => void;
  onAssign?: (reportId: string) => void;
  onUnassign?: (reportId: string) => void;
  isAssigning?: boolean;
  isUnassigning?: boolean;
};

export type FindingsManagerProps = {
  regulations: RegulationReference[];
  findings: ReportFinding[];
  onFindingsChange: (findings: ReportFinding[]) => void;
};

export type PdfViewerProps = {
  title: string;
  src: string | null;
  fileName?: string;
  emptyText: string;
  actionLink?: {
    href: string;
    label: string;
  };
};

export type PdfUploadFieldProps = {
  file: File | null;
  fileError?: string;
  onFileChange: (file: File | null) => void;
};

export type ComparisonNotesFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export type ReportFormActionsProps = {
  activeStep: StepId;
  isSubmitting: boolean;
  primaryActionLabel: string;
  isPrimaryDisabled: boolean;
  onBack: () => void;
};

export type ReportModalFooterProps = {
  activeStep: StepId;
  totalSteps: number;
};

export type ReportFormProgressStep = {
  id: StepId;
  label: string;
};

export type ReportFormProgressProps = {
  activeStep: StepId;
  steps: ReportFormProgressStep[];
};

export type ReportFormStep1Props = {
  control: Control<ReportFormValues>;
  errors: FieldErrors<ReportFormValues>;
  onInstitutionSearch: (query: string) => Promise<InstitutionSearchResult[]>;
  onInstitutionSelect: (option: UniversalSearchOption) => void;
};
