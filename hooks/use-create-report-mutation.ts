"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { createReport } from "@/mutations/reports/create-report";
import type { CreateReportPayload } from "@/lib/schemas/reports";

type UseCreateReportMutationParams = {
  accessToken: string | null;
  onSuccess?: () => void;
};

export const useCreateReportMutation = ({
  accessToken,
  onSuccess: onSuccessCallback,
}: UseCreateReportMutationParams) => {
  const t = useTranslations("reportModal");

  return useMutation({
    mutationFn: (payload: CreateReportPayload) => createReport(payload, accessToken ?? undefined),
    onSuccess: (data, _variables, _context) => {
      toast.success(t("success.title"), {
        description: t("success.description", { id: data.reportId }),
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : t("errors.submit");
      toast.error(message);
    },
  });
};
