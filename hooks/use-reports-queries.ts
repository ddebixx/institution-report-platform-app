"use client";

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { reportKeys } from "@/lib/query-keys";
import {
  fetchAvailableReports,
  fetchAssignedReports,
  fetchCompletedReports,
} from "@/fetchers/reports";
import type { ModeratorReport } from "@/lib/schemas/reports";
import { queryClient } from "@/lib/queryClient";

type UseReportsQueriesParams = {
  accessToken: string | null;
};

type UseReportsQueriesResult = {
  availableReports: ModeratorReport[];
  assignedReports: ModeratorReport[];
  completedReports: ModeratorReport[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetchAll: () => Promise<void>;
};

export const useReportsQueries = ({
  accessToken,
}: UseReportsQueriesParams): UseReportsQueriesResult => {
  const enabled = Boolean(accessToken);

  const available = useQuery({
    queryKey: reportKeys.available(accessToken ?? ""),
    queryFn: () => fetchAvailableReports(accessToken!),
    enabled,
  });

  const assigned = useQuery({
    queryKey: reportKeys.assigned(accessToken ?? ""),
    queryFn: () => fetchAssignedReports(accessToken!),
    enabled,
  });

  const completed = useQuery({
    queryKey: reportKeys.completed(accessToken ?? ""),
    queryFn: () => fetchCompletedReports(accessToken!),
    enabled,
  });

  const isLoading = available.isLoading || assigned.isLoading || completed.isLoading;
  const isError = available.isError || assigned.isError || completed.isError;
  const error =
    (available.error instanceof Error ? available.error : null) ??
    (assigned.error instanceof Error ? assigned.error : null) ??
    (completed.error instanceof Error ? completed.error : null);

  const refetchAll = useCallback(async (): Promise<void> => {
    if (!accessToken) return;
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: reportKeys.available(accessToken) }),
      queryClient.invalidateQueries({ queryKey: reportKeys.assigned(accessToken) }),
      queryClient.invalidateQueries({ queryKey: reportKeys.completed(accessToken) }),
    ]);
  }, [accessToken, queryClient]);

  return {
    availableReports: available.data ?? [],
    assignedReports: assigned.data ?? [],
    completedReports: completed.data ?? [],
    isLoading,
    isError,
    error,
    refetchAll,
  };
};
