import { useCallback, useState } from "react";
import type { ReportFinding, UseReportReviewFormProps } from "@/types/reports";
import { useUpdateReportReviewMutation } from "@/hooks/use-update-report-review-mutation";

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
