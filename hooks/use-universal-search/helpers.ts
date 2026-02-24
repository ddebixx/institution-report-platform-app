import type {
  UniversalSearchOption,
  UniversalSearchStatusText,
} from "@/components/universal-search/universal-search-types";

type SearchEffectParams = {
  value: string;
  minCharacters: number;
  statusText: UniversalSearchStatusText;
  fetchResults: (query: string) => Promise<UniversalSearchOption[]>;
  requestCounterRef: React.MutableRefObject<number>;
  justSelectedRef: React.MutableRefObject<boolean>;
  setOptions: (options: UniversalSearchOption[]) => void;
  setIsOpen: (open: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setStatusMessage: (message: string) => void;
};

export const runUniversalSearchEffect = async ({
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
}: SearchEffectParams): Promise<void> => {
  const trimmedValue = value.trim();

  const resetForShortQuery = () => {
    setIsOpen(false);
    setOptions([]);
    setIsLoading(false);
    setStatusMessage(statusText.minChars);
  };

  if (justSelectedRef.current) {
    justSelectedRef.current = false;
    return;
  }

  if (trimmedValue.length < minCharacters) {
    resetForShortQuery();
    return;
  }

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
    if (requestCounterRef.current === nextRequestId) {
      setIsLoading(false);
    }
  }
};
