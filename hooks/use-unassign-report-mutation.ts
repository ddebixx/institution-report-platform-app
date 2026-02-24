"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { unassignReportFromSelf } from "@/mutations/reports/unassign-report-from-self";
import { reportKeys } from "@/lib/query-keys";
import { queryClient } from "@/lib/queryClient";

type UseUnassignReportMutationParams = {
  accessToken: string | null;
  onSuccess?: () => void;
};

export const useUnassignReportMutation = ({
  accessToken,
  onSuccess: onSuccessCallback,
}: UseUnassignReportMutationParams) => {
  return useMutation({
    mutationFn: (reportId: string) => unassignReportFromSelf(reportId, accessToken!),
    onSuccess: () => {
      toast.success("Report unassigned successfully");
      if (accessToken) {
        void queryClient.invalidateQueries({ queryKey: reportKeys.all });
      }
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to unassign report");
    },
  });
};
