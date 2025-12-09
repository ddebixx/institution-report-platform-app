"use client"

import { createContext, useContext, useMemo } from "react"

import { useAuthController } from "@/hooks/use-auth"

type AuthContextValue = ReturnType<typeof useAuthController>

const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthController()
  const value = useMemo(() => auth, [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider")
  }

  return context
}

