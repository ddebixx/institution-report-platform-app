import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { ModeratorReport, ReportFinding } from "@/types/reports";
import { updateReportReview } from "@/mutations/reports";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = useCallback(async () => {
    if (!report || !accessToken) {
      return;
    }

    setIsSubmitting(true);
    try {
      await updateReportReview(report.id, { findings, comparisonNotes }, accessToken);
      toast.success(successMessage);
      onUpdate?.();
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : errorMessage;
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    report,
    accessToken,
    findings,
    comparisonNotes,
    onUpdate,
    onClose,
    successMessage,
    errorMessage,
  ]);

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
    isSubmitting,
    handleSave,
    handleClose,
  };
}
