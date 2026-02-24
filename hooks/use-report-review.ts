import { useCallback, useState } from "react";
import type { ModeratorReport, ReportFinding } from "@/types/reports";
import { useUpdateReportReviewMutation } from "@/hooks/use-update-report-review-mutation";

type UseReportReviewFormProps = {
  report: ModeratorReport | null;
  accessToken: string | null;
  onUpdate?: () => void;
  onClose: () => void;
  successMessage: string;
  errorMessage: string;
};

export function useReportReviewForm({
  report,
  accessToken,
  onUpdate,
  onClose,
  successMessage,
  errorMessage,
}: UseReportReviewFormProps) {
  const [findings, setFindings] = useState<ReportFinding[]>([]);
  const [comparisonNotes, setComparisonNotes] = useState<string>("");

  const updateReviewMutation = useUpdateReportReviewMutation({
    accessToken,
    reportId: report?.id ?? null,
    onSuccess: onUpdate,
    successMessage,
    errorMessage,
  });

  const handleSave = useCallback(async () => {
    if (!report || !accessToken) return;
    await updateReviewMutation.mutateAsync({ findings, comparisonNotes });
  }, [report, accessToken, findings, comparisonNotes, updateReviewMutation]);

  const handleClose = useCallback(() => {
    setFindings([]);
    setComparisonNotes("");
    onClose();
  }, [onClose]);

  return {
    findings,
    setFindings,
    comparisonNotes,
    setComparisonNotes,
    isSubmitting: updateReviewMutation.isPending,
    handleSave,
    handleClose,
  };
}
