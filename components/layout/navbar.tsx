"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  LogInIcon,
  LogOutIcon,
  ShieldCheckIcon,
  MenuIcon,
  XIcon,
} from "lucide-react"

import { LocaleSwitcher } from "@/components/locale/locale-switcher"
import { useAuthModal } from "@/components/auth/auth-modal-provider"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/components/auth/auth-provider"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Link from "next/link"
import {
  handleDashboardNavigate as handleDashboardNavigateHandler,
  handleLogout as handleLogoutHandler,
  handleLogin as handleLoginHandler,
  handleRegister as handleRegisterHandler,
} from "@/handlers/navbar"

export const Navbar = () => {
  const router = useRouter()
  const { user, signOut, isAuthenticating } = useAuthContext()
  const { openLogin, openRegister } = useAuthModal()
  const t = useTranslations()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const userLabel = useMemo(
    () => user?.email ?? t("navbar.subtitle"),
    [t, user?.email]
  )

  const handleDashboardNavigate = useCallback(() => {
    handleDashboardNavigateHandler({ router, setIsMobileMenuOpen })
  }, [router])

  const handleLogout = useCallback(async () => {
    await handleLogoutHandler({ signOut, setIsMobileMenuOpen })
  }, [signOut])

  const handleLogin = useCallback(() => {
    handleLoginHandler({ openLogin, setIsMobileMenuOpen })
  }, [openLogin])

  const handleRegister = useCallback(() => {
    handleRegisterHandler({ openRegister, setIsMobileMenuOpen })
  }, [openRegister])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo section - hides subtitle on mobile */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm sm:size-10">
                <ShieldCheckIcon className="size-4 sm:size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary">IRP</span>
                <span className="hidden text-xs text-muted-foreground sm:block">
                  {t("navbar.title")}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          {user ? (
            <>
              <div className="hidden items-center gap-2 sm:flex sm:gap-3">
                <div className="flex items-center gap-2 rounded-full bg-secondary px-2 py-1 text-sm sm:px-3">
                  <span className="size-2 rounded-full bg-green-500" />
                  <span className="hidden text-muted-foreground md:inline">
                    {userLabel}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDashboardNavigate}
                  className={cn("font-semibold")}
                >
                  <span className="hidden sm:inline">{t("navbar.dashboard")}</span>
                  <span className="sm:hidden">{t("navbar.dashboard")}</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  disabled={isAuthenticating}
                  className="font-semibold"
                >
                  <LogOutIcon className="size-4" />
                  <span className="hidden md:inline">{t("navbar.logout")}</span>
                </Button>
                <LocaleSwitcher />
              </div>

              {/* Mobile menu for authenticated users */}
              <div className="flex items-center gap-2 sm:hidden">
                <LocaleSwitcher />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleMobileMenu}
                  className="size-9 p-0"
                  aria-label="Toggle menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <XIcon className="size-5" />
                  ) : (
                    <MenuIcon className="size-5" />
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogin}
                  className="font-semibold"
                >
                  <LogInIcon className="size-4" />
                  <span className="hidden md:inline">{t("navbar.login")}</span>
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleRegister}
                  className="font-semibold"
                >
                  {t("navbar.register")}
                </Button>
                <LocaleSwitcher />
              </div>

              {/* Mobile menu for unauthenticated users */}
              <div className="flex items-center gap-2 sm:hidden">
                <LocaleSwitcher />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleMobileMenu}
                  className="size-9 p-0"
                  aria-label="Toggle menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <XIcon className="size-5" />
                  ) : (
                    <MenuIcon className="size-5" />
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Mobile menu overlay and content */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div
            className={cn(
              "fixed right-0 top-0 z-50 h-full w-[280px] bg-background shadow-xs sm:hidden",
              "animate-in slide-in-from-right duration-200"
            )}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-green-500" />
                  <span className="truncate text-sm font-medium text-foreground">
                    {user ? userLabel : t("navbar.subtitle")}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={closeMobileMenu}
                  className="size-8 p-0"
                  aria-label="Close menu"
                >
                  <XIcon className="size-5" />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4">
                {user ? (
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={handleDashboardNavigate}
                    >
                      {t("navbar.dashboard")}
                    </Button>
                    <div className="my-2 border-t border-border" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                      disabled={isAuthenticating}
                    >
                      <LogOutIcon className="size-4" />
                      {t("navbar.logout")}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={handleLogin}
                    >
                      <LogInIcon className="size-4" />
                      {t("navbar.login")}
                    </Button>
                    <Button
                      variant="default"
                      className="w-full justify-start font-semibold"
                      onClick={handleRegister}
                    >
                      {t("navbar.register")}
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  )
}

