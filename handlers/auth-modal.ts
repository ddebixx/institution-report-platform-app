import { FormEvent } from "react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { toast } from "sonner"

type HandleSubmitParams = {
  event: FormEvent<HTMLFormElement>
  email: string
  password: string
  mode: "login" | "register"
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  handleClose: () => void
  router: AppRouterInstance
}

export const handleAuthSubmit = async ({
  event,
  email,
  password,
  mode,
  signIn,
  signUp,
  handleClose,
  router,
}: HandleSubmitParams): Promise<void> => {
  event.preventDefault()

  try {
    if (mode === "login") {
      await signIn(email, password)
      toast.success("Logged in successfully")
    } else {
      await signUp(email, password)
      toast.success("Registered and signed in")
    }

    handleClose()
    router.push("/admin")
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Authentication failed"
    toast.error(message)
  }
}

