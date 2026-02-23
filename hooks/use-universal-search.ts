"use client";

import { type MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  UniversalSearchOption,
  UniversalSearchStatusText,
} from "@/components/universal-search/universal-search-types";

type UseUniversalSearchParams = {
  value: string;
  minCharacters: number;
  fetchResults: (query: string) => Promise<UniversalSearchOption[]>;
  statusText: UniversalSearchStatusText;
  onSelect: (option: UniversalSearchOption) => void;
};

export const useUniversalSearch = ({
  value,
  minCharacters,
  fetchResults,
  statusText,
  onSelect,
}: UseUniversalSearchParams) => {
  const [options, setOptions] = useState<UniversalSearchOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>(statusText.minChars);
  const requestCounterRef = useRef(0);
  const justSelectedRef = useRef(false);

  const trimmedValue = useMemo(() => value.trim(), [value]);
  const hasEnoughCharacters = useMemo(
    () => trimmedValue.length >= minCharacters,
    [minCharacters, trimmedValue.length]
  );

  useEffect(() => {
    function resetForShortQuery() {
      setIsOpen(false);
      setOptions([]);
      setIsLoading(false);
      setStatusMessage(statusText.minChars);
    }

    async function searchWhenEligible() {
      if (justSelectedRef.current) {
        justSelectedRef.current = false;
        return;
      }

      if (trimmedValue.length < minCharacters) return resetForShortQuery();

      setIsLoading(true);
      setStatusMessage(statusText.loading);

      const nextRequestId = requestCounterRef.current + 1;

      requestCounterRef.current = nextRequestId;

      try {
        const result = await fetchResults(trimmedValue);

        if (requestCounterRef.current !== nextRequestId) return;

        setOptions(result);
        setStatusMessage(result.length ? statusText.idle : statusText.empty);
        setIsOpen(true);
      } catch (error) {
        if (requestCounterRef.current !== nextRequestId) return;

        const errorMessage = error instanceof Error ? error.message : statusText.error;
        setOptions([]);
        setStatusMessage(errorMessage);
        setIsOpen(true);
      } finally {
        if (requestCounterRef.current === nextRequestId) setIsLoading(false);
      }
    }

    searchWhenEligible();
  }, [
    fetchResults,
    minCharacters,
    statusText.empty,
    statusText.error,
    statusText.idle,
    statusText.loading,
    statusText.minChars,
    trimmedValue,
  ]);

  const handleOptionMouseDown = useCallback(
    (event: MouseEvent<HTMLButtonElement>, option: UniversalSearchOption) => {
      event.preventDefault();
      justSelectedRef.current = true;
      onSelect(option);
      setIsOpen(false);
      setOptions([]);
    },
    [onSelect]
  );

  const hasRenderableRows = useMemo(
    () => isLoading || options.length > 0 || (Boolean(statusMessage) && hasEnoughCharacters),
    [hasEnoughCharacters, isLoading, options.length, statusMessage]
  );

  const shouldShowDropdown = useMemo(
    () => isOpen && hasRenderableRows,
    [hasRenderableRows, isOpen]
  );

  return {
    options,
    isOpen,
    setIsOpen,
    isLoading,
    statusMessage,
    trimmedValue,
    hasEnoughCharacters,
    hasRenderableRows,
    handleOptionMouseDown,
    shouldShowDropdown,
    statusText,
  };
};
