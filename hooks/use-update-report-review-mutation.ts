"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateReportReview } from "@/mutations/reports/update-report-review";
import { reportKeys } from "@/lib/query-keys";
import type { UpdateReportReviewPayload } from "@/lib/schemas/reports";
import { queryClient } from "@/lib/queryClient";

type UseUpdateReportReviewMutationParams = {
  accessToken: string | null;
  reportId: string | null;
  onSuccess?: () => void;
  successMessage?: string;
  errorMessage?: string;
};

export const useUpdateReportReviewMutation = ({
  accessToken,
  reportId,
  onSuccess: onSuccessCallback,
  successMessage = "Review saved successfully",
  errorMessage = "Failed to save review",
}: UseUpdateReportReviewMutationParams) => {
  return useMutation({
    mutationFn: (payload: UpdateReportReviewPayload) =>
      updateReportReview(reportId!, payload, accessToken!),
    onSuccess: () => {
      toast.success(successMessage);
      void queryClient.invalidateQueries({ queryKey: reportKeys.all });
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : errorMessage);
    },
  });
};
