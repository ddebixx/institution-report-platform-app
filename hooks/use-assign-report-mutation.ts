"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { assignReportToSelf } from "@/mutations/reports/assign-report-to-self";
import { reportKeys } from "@/lib/query-keys";
import { queryClient } from "@/lib/queryClient";

type UseAssignReportMutationParams = {
  accessToken: string | null;
  onSuccess?: () => void;
};

export const useAssignReportMutation = ({
  accessToken,
  onSuccess: onSuccessCallback,
}: UseAssignReportMutationParams) => {
  return useMutation({
    mutationFn: (reportId: string) => assignReportToSelf(reportId, accessToken!),
    onSuccess: (_data, _reportId) => {
      toast.success("Report assigned successfully");
      if (accessToken) {
        void queryClient.invalidateQueries({ queryKey: reportKeys.all });
      }
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to assign report");
    },
  });
};
