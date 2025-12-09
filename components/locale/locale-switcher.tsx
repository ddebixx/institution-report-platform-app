"use client"

import { useCallback } from "react"
import { Globe2Icon } from "lucide-react"

import { useLocaleContext } from "@/components/locale/locale-provider"
import { supportedLocales, type SupportedLocale } from "@/locales/messages"

export const LocaleSwitcher = () => {
  const { locale, setLocale } = useLocaleContext()

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextLocale = event.target.value as SupportedLocale
      setLocale(nextLocale)
    },
    [setLocale]
  )

  return (
    <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1.5 text-sm shadow-xs">
      <Globe2Icon className="size-4 text-muted-foreground" />
      <select
        className="bg-transparent text-foreground outline-none"
        value={locale}
        onChange={handleChange}
        aria-label="Language"
      >
        {supportedLocales.map((code) => (
          <option key={code} value={code}>
            {code.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}

