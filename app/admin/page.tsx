"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuthContext } from "@/components/auth/auth-provider"
import { ModeratorDashboard } from "@/features/moderator/moderator-dashboard"

const AdminPage = () => {
  const router = useRouter()
  const { user, isInitializing } = useAuthContext()

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
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Moderator Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Manage and review reports assigned to you
        </p>
      </div>
      <ModeratorDashboard />
    </div>
  )
}

export default AdminPage

