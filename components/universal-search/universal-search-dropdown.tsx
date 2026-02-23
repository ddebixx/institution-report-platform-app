"use client";

import { Search, Loader2 } from "lucide-react";
import type {
  UniversalSearchDropdownProps,
  UniversalSearchOption,
} from "@/components/universal-search/universal-search-types";

export const UniversalSearchDropdown = ({
  isLoading,
  options,
  statusMessage,
  loadingLabel,
  minCharacters,
  trimmedValueLength,
  onOptionMouseDown,
}: UniversalSearchDropdownProps) => {
  const showEmptyMessage =
    !isLoading && options.length === 0 && trimmedValueLength >= minCharacters;

  return (
    <div className="absolute z-50 mt-1 w-full min-w-88 max-w-xl overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-xs">
      {isLoading ? (
        <div className="flex items-center gap-2 px-3 py-2 text-sm">
          <Loader2 className="size-4 animate-spin" />
          <span>{loadingLabel}</span>
        </div>
      ) : null}

      {!isLoading &&
        options.map((option: UniversalSearchOption) => (
          <button
            key={option.id}
            type="button"
            onMouseDown={(event) => onOptionMouseDown(event, option)}
            className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm transition hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex size-8 items-center justify-center rounded-md bg-muted">
              <Search className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{option.title}</span>
              {option.subtitle ? (
                <span className="text-xs text-muted-foreground">{option.subtitle}</span>
              ) : null}
              {option.meta ? (
                <span className="text-[11px] text-muted-foreground">{option.meta}</span>
              ) : null}
            </div>
          </button>
        ))}

      {showEmptyMessage ? (
        <div className="px-3 py-2 text-sm text-muted-foreground">{statusMessage}</div>
      ) : null}
    </div>
  );
};
