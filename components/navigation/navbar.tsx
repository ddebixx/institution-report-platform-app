"use client"

import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { LogInIcon, LogOutIcon, ShieldCheckIcon } from "lucide-react"

import { LocaleSwitcher } from "@/components/locale/locale-switcher"
import { useAuthModal } from "@/components/auth/auth-modal-provider"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/components/auth/auth-provider"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export const Navbar = () => {
  const router = useRouter()
  const { user, signOut, isAuthenticating } = useAuthContext()
  const { openLogin, openRegister } = useAuthModal()
  const t = useTranslations()

  const userLabel = useMemo(
    () => user?.email ?? t("navbar.subtitle"),
    [t, user?.email]
  )

  const handleDashboardNavigate = useCallback(() => {
    router.push("/admin")
  }, [router])

  const handleLogout = useCallback(async () => {
    await signOut()
  }, [signOut])

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <ShieldCheckIcon className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-primary">IRP</span>
            <span className="text-xs text-muted-foreground">
              Institution Report Platform
            </span>
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
              <span className="size-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">{userLabel}</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDashboardNavigate}
              className={cn("font-semibold")}
            >
              {t("navbar.dashboard")}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              disabled={isAuthenticating}
              className="font-semibold"
            >
              <LogOutIcon className="size-4" />
              {t("navbar.logout")}
            </Button>
            <LocaleSwitcher />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={openLogin} className="font-semibold">
              <LogInIcon className="size-4" />
              {t("navbar.login")}
            </Button>
            <Button
              size="sm"
              variant="default"
              onClick={openRegister}
              className="font-semibold"
            >
              {t("navbar.register")}
            </Button>
            <LocaleSwitcher />
          </div>
        )}
      </div>
    </header>
  )
}

