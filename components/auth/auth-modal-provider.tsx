"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

import { useAuthContext } from "@/components/auth/auth-provider"
import { AuthModal } from "@/features/auth/auth-modal"

type AuthModalContextValue = {
  openLogin: () => void
  openRegister: () => void
  closeModal: () => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

type AuthModalProviderProps = {
  children: React.ReactNode
}

export const AuthModalProvider = ({ children }: AuthModalProviderProps) => {
  const { authMode, setAuthMode } = useAuthContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openLogin = useCallback(() => {
    setAuthMode("login")
    setIsOpen(true)
  }, [setAuthMode])

  const openRegister = useCallback(() => {
    setAuthMode("register")
    setIsOpen(true)
  }, [setAuthMode])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      openLogin,
      openRegister,
      closeModal,
    }),
    [openLogin, openRegister, closeModal]
  )

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal
        open={isOpen}
        mode={authMode}
        onClose={closeModal}
        onModeChange={setAuthMode}
      />
    </AuthModalContext.Provider>
  )
}

export const useAuthModal = (): AuthModalContextValue => {
  const context = useContext(AuthModalContext)

  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider")
  }

  return context
}

