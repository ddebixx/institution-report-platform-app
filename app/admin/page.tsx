"use client"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheckIcon } from "lucide-react"

import { useAuthContext } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"

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

  const handleBackHome = useCallback(() => {
    router.push("/")
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6">
      <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-card p-8 text-center shadow-xl">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheckIcon className="size-7" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">
          Admin dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          {user
            ? `You are authenticated as ${user.email ?? "an admin user"}.`
            : "Redirecting to the homepage..."}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            className="font-semibold"
            onClick={handleBackHome}
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminPage

