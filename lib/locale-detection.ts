import { isSupportedLocale, type SupportedLocale, defaultLocale } from "@/locales/messages"

export const detectBrowserLocale = (): SupportedLocale => {
  if (typeof window === "undefined") {
    return defaultLocale
  }

  const browserLanguage = navigator.language || (navigator as any).userLanguage

  if (!browserLanguage) {
    return defaultLocale
  }

  const primaryLanguageCode = browserLanguage.split("-")[0].toLowerCase()

  if (isSupportedLocale(primaryLanguageCode)) {
    return primaryLanguageCode
  }

  if (isSupportedLocale(browserLanguage.toLowerCase())) {
    return browserLanguage.toLowerCase() as SupportedLocale
  }

  return defaultLocale
}

export const getInitialLocale = (): SupportedLocale => {
  if (typeof window === "undefined") {
    return defaultLocale
  }

  const storedLocale = localStorage.getItem("locale")
  
  if (storedLocale && isSupportedLocale(storedLocale)) {
    return storedLocale
  }

  const detectedLocale = detectBrowserLocale()
  
  localStorage.setItem("locale", detectedLocale)
  
  return detectedLocale
}

