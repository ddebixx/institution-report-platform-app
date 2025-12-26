"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { NextIntlClientProvider } from "next-intl"

import {
  defaultLocale,
  messagesByLocale,
  type SupportedLocale,
} from "@/locales/messages"
import { getInitialLocale } from "@/lib/locale-detection"

type LocaleContextValue = {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

type LocaleProviderProps = {
  children: React.ReactNode
}

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(defaultLocale)

  useEffect(() => {
    function initializeLocaleWithAutoDetection() {
      const initialLocale = getInitialLocale()
      setLocaleState(initialLocale)
    }

    initializeLocaleWithAutoDetection()
  }, [])

  const setLocale = useCallback((nextLocale: SupportedLocale) => {
    setLocaleState(nextLocale)
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", nextLocale)
    }
  }, [])

  const messages = useMemo(() => messagesByLocale[locale], [locale])

  const contextValue = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale]
  )

  return (
    <LocaleContext.Provider value={contextValue}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}

export const useLocaleContext = (): LocaleContextValue => {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error("useLocaleContext must be used within LocaleProvider")
  }

  return context
}

