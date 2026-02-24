"use client";

import { useCallback } from "react";
import { institutionKeys } from "@/lib/query-keys";
import { searchInstitutions } from "@/fetchers/institutions";
import type { InstitutionSearchResult } from "@/lib/schemas/institutions";
import { queryClient } from "@/lib/queryClient";

const MIN_QUERY_LENGTH = 5;

export const useInstitutionSearchFetch = (): ((
  query: string,
  accessToken?: string
) => Promise<InstitutionSearchResult[]>) => {

  return useCallback(
    async (query: string, accessToken?: string): Promise<InstitutionSearchResult[]> => {
      const trimmed = query.trim();
      if (trimmed.length < MIN_QUERY_LENGTH) {
        return [];
      }

      return queryClient.fetchQuery({
        queryKey: institutionKeys.search(trimmed),
        queryFn: () => searchInstitutions(trimmed, accessToken),
        staleTime: 60 * 1000,
      });
    },
    [queryClient]
  );
};
