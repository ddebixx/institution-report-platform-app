"use client"

import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Loader2, Search } from "lucide-react"
import { twMerge } from "tailwind-merge"

import { Input } from "@/components/ui/input"

export type UniversalSearchOption = {
  id: string
  title: string
  subtitle?: string
  meta?: string
}

type StatusText = {
  idle: string
  loading: string
  empty: string
  minChars: string
  error: string
}

type UniversalSearchInputProps = {
  value: string
  onValueChange: (value: string) => void
  onSelect: (option: UniversalSearchOption) => void
  fetchResults: (query: string) => Promise<UniversalSearchOption[]>
  placeholder?: string
  minCharacters?: number
  inputId?: string
  onBlur?: () => void
  className?: string
  statusText: StatusText
}

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
  const [options, setOptions] = useState<UniversalSearchOption[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string>(statusText.minChars)
  const requestCounterRef = useRef(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const trimmedValue = useMemo(() => value.trim(), [value])
  const hasEnoughCharacters = useMemo(
    () => trimmedValue.length >= minCharacters,
    [minCharacters, trimmedValue.length]
  )

  useEffect(() => {
    function resetForShortQuery() {
      setIsOpen(false)
      setOptions([])
      setIsLoading(false)
      setStatusMessage(statusText.minChars)
    }

    async function searchWhenEligible() {
      if (trimmedValue.length < minCharacters) {
        resetForShortQuery()
        return
      }

      setIsLoading(true)
      setStatusMessage(statusText.loading)
      const nextRequestId = requestCounterRef.current + 1
      requestCounterRef.current = nextRequestId

      try {
        const result = await fetchResults(trimmedValue)

        if (requestCounterRef.current !== nextRequestId) {
          return
        }

        setOptions(result)
        setStatusMessage(result.length ? statusText.idle : statusText.empty)
        setIsOpen(true)
      } catch (error) {
        if (requestCounterRef.current !== nextRequestId) {
          return
        }

        const errorMessage =
          error instanceof Error ? error.message : statusText.error
        setOptions([])
        setStatusMessage(errorMessage)
        setIsOpen(true)
      } finally {
        if (requestCounterRef.current === nextRequestId) {
          setIsLoading(false)
        }
      }
    }

    searchWhenEligible()
  }, [
    fetchResults,
    minCharacters,
    statusText.empty,
    statusText.error,
    statusText.idle,
    statusText.loading,
    statusText.minChars,
    trimmedValue,
  ])

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value)
  }, [onValueChange])

  const handleOptionMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, option: UniversalSearchOption) => {
      event.preventDefault()
      onSelect(option)
      setIsOpen(false)
    },
    [onSelect]
  )

  const shouldShowDropdown = useMemo(
    () => {
      const hasRenderableRows =
        isLoading ||
        options.length > 0 ||
        (Boolean(statusMessage) && hasEnoughCharacters)
      return isOpen && hasRenderableRows
    },
    [hasEnoughCharacters, isLoading, isOpen, options.length, statusMessage]
  )

  useEffect(() => {
    if (shouldShowDropdown) {
      inputRef.current?.focus({ preventScroll: true })
    }
  }, [shouldShowDropdown])

  return (
    <div className="relative">
      <div className="w-full">
        <Input
          id={inputId}
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onBlur={(event) => {
            setTimeout(() => setIsOpen(false), 50)
            if (onBlur) {
              onBlur()
            }
            event.persist?.()
          }}
          onFocus={() => {
            const hasRenderableRows =
              isLoading ||
              options.length > 0 ||
              (Boolean(statusMessage) && hasEnoughCharacters)

            if (hasRenderableRows) {
              setIsOpen(true)
            }
          }}
          placeholder={placeholder}
          className={className}
          aria-expanded={shouldShowDropdown}
        />
      </div>

      {shouldShowDropdown ? (
        <div className="absolute z-50 mt-1 w-full min-w-88 max-w-xl overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-xs">
          {isLoading ? (
            <div className="flex items-center gap-2 px-3 py-2 text-sm">
              <Loader2 className="size-4 animate-spin" />
              <span>{statusText.loading}</span>
            </div>
          ) : null}

          {!isLoading && options.map((option) => (
            <button
              key={option.id}
              type="button"
              onMouseDown={(event) => handleOptionMouseDown(event, option)}
              className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm transition hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                <Search className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{option.title}</span>
                {option.subtitle ? (
                  <span className="text-xs text-muted-foreground">
                    {option.subtitle}
                  </span>
                ) : null}
                {option.meta ? (
                  <span className="text-[11px] text-muted-foreground">
                    {option.meta}
                  </span>
                ) : null}
              </div>
            </button>
          ))}

          {!isLoading && options.length === 0 && trimmedValue.length >= minCharacters ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              {statusMessage}
            </div>
          ) : null}
        </div>
      ) : null}

      {statusMessage ? (
        <p className={twMerge("mt-1 text-[11px] text-muted-foreground")}>
          {statusMessage}
        </p>
      ) : null}
    </div>
  )
}

