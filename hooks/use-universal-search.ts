"use client";

import { type MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  UniversalSearchOption,
  UniversalSearchStatusText,
} from "@/components/universal-search/universal-search-types";
import { runUniversalSearchEffect } from "@/hooks/use-universal-search/helpers";

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
    void runUniversalSearchEffect({
      value,
      minCharacters,
      statusText,
      fetchResults,
      requestCounterRef,
      justSelectedRef,
      setOptions,
      setIsOpen,
      setIsLoading,
      setStatusMessage,
    });
  }, [value, minCharacters, statusText, fetchResults]);

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
