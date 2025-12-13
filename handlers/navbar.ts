import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

type HandleDashboardNavigateParams = {
  router: AppRouterInstance
  setIsMobileMenuOpen: (open: boolean) => void
}

export const handleDashboardNavigate = ({
  router,
  setIsMobileMenuOpen,
}: HandleDashboardNavigateParams): void => {
  router.push("/admin")
  setIsMobileMenuOpen(false)
}

type HandleLogoutParams = {
  signOut: () => Promise<void>
  setIsMobileMenuOpen: (open: boolean) => void
}

export const handleLogout = async ({
  signOut,
  setIsMobileMenuOpen,
}: HandleLogoutParams): Promise<void> => {
  await signOut()
  setIsMobileMenuOpen(false)
}

type HandleLoginParams = {
  openLogin: () => void
  setIsMobileMenuOpen: (open: boolean) => void
}

export const handleLogin = ({
  openLogin,
  setIsMobileMenuOpen,
}: HandleLoginParams): void => {
  openLogin()
  setIsMobileMenuOpen(false)
}

type HandleRegisterParams = {
  openRegister: () => void
  setIsMobileMenuOpen: (open: boolean) => void
}

export const handleRegister = ({
  openRegister,
  setIsMobileMenuOpen,
}: HandleRegisterParams): void => {
  openRegister()
  setIsMobileMenuOpen(false)
}

