"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

import { useAuthContext } from "@/components/auth/auth-provider"
import { ModeratorDashboard } from "@/features/moderator/moderator-dashboard"

const AdminPage = () => {
  const router = useRouter()
  const { user, isInitializing } = useAuthContext()
  const t = useTranslations("admin")

  useEffect(() => {
    function handleUnauthenticatedRedirect() {
      if (!isInitializing && !user) {
        router.replace("/")
      }
    }

    handleUnauthenticatedRedirect()
  }, [isInitializing, router, user])

  if (isInitializing || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">{t("loading")}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>
      <ModeratorDashboard />
    </div>
  )
}

export default AdminPage

