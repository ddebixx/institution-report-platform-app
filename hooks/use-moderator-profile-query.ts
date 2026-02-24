"use client";

import { useQuery } from "@tanstack/react-query";

import { moderatorKeys } from "@/lib/query-keys";
import { fetchModeratorProfile } from "@/fetchers/moderators";
import type { ModeratorProfile } from "@/lib/schemas/moderator-profile";

type UseModeratorProfileQueryParams = {
  accessToken: string | null;
};

type UseModeratorProfileQueryResult = {
  profile: ModeratorProfile | null | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

export const useModeratorProfileQuery = ({
  accessToken,
}: UseModeratorProfileQueryParams): UseModeratorProfileQueryResult => {
  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: moderatorKeys.profile(accessToken ?? ""),
    queryFn: () => fetchModeratorProfile(accessToken!),
    enabled: Boolean(accessToken),
  });

  return {
    profile: profile ?? null,
    isLoading,
    isError,
    error: error instanceof Error ? error : null,
    refetch,
  };
};
