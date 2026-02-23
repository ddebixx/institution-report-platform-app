"use client";

import { type ChangeEvent, useCallback, useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { UniversalSearchDropdown } from "@/components/universal-search/universal-search-dropdown";
import { useUniversalSearch } from "@/hooks/use-universal-search";

export type { UniversalSearchOption } from "@/components/universal-search/universal-search-types";
import type { UniversalSearchInputProps } from "@/components/universal-search/universal-search-types";

export const UniversalSearchInput = ({
  value,
  onValueChange,
  onSelect,
  fetchResults,
  placeholder,
  minCharacters = 5,
  inputId,
  onBlur,
  className,
  statusText,
}: UniversalSearchInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const search = useUniversalSearch({
    value,
    minCharacters,
    fetchResults,
    statusText,
    onSelect,
  });

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onValueChange(event.target.value);
    },
    [onValueChange]
  );

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      search.setIsOpen(false);
      onBlur?.();
    }, 50);
  }, [onBlur, search.setIsOpen]);

  const handleFocus = useCallback(() => {
    if (search.hasRenderableRows) search.setIsOpen(true);
  }, [search.hasRenderableRows, search.setIsOpen]);

  useEffect(() => {
    if (search.shouldShowDropdown) inputRef.current?.focus({ preventScroll: true });
  }, [search.shouldShowDropdown]);

  return (
    <div className="relative">
      <Input
        id={inputId}
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={className}
        aria-expanded={search.shouldShowDropdown}
      />

      {search.shouldShowDropdown ? (
        <UniversalSearchDropdown
          isLoading={search.isLoading}
          options={search.options}
          statusMessage={search.statusMessage}
          loadingLabel={search.statusText.loading}
          minCharacters={minCharacters}
          trimmedValueLength={search.trimmedValue.length}
          onOptionMouseDown={search.handleOptionMouseDown}
        />
      ) : null}
    </div>
  );
};
