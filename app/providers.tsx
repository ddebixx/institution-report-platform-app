"use client"

import { ThemeProvider } from "next-themes"

import { AuthProvider } from "@/components/auth/auth-provider"
import { AuthModalProvider } from "@/components/auth/auth-modal-provider"
import { LocaleProvider } from "@/components/locale/locale-provider"
import { Toaster } from "@/components/ui/sonner"

type ProvidersProps = {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
    <LocaleProvider>
      <AuthProvider>
        <AuthModalProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </AuthModalProvider>
      </AuthProvider>
    </LocaleProvider>
    </ThemeProvider>
  )
}

