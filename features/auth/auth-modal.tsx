"use client"

import { FormEvent, useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useAuthContext } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"

type AuthModalMode = "login" | "register"

type AuthModalProps = {
  open: boolean
  mode: AuthModalMode
  onClose: () => void
  onModeChange: (mode: AuthModalMode) => void
}

export const AuthModal = ({
  open,
  mode,
  onClose,
  onModeChange,
}: AuthModalProps) => {
  const router = useRouter()
  const { signIn, signUp, isAuthenticating, setAuthMode } = useAuthContext()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const ctaLabel = useMemo(
    () => (mode === "login" ? "Login" : "Create account"),
    [mode]
  )

  const toggleMode = useCallback(() => {
    const nextMode: AuthModalMode = mode === "login" ? "register" : "login"
    onModeChange(nextMode)
    setAuthMode(nextMode)
  }, [mode, onModeChange, setAuthMode])

  const handleClose = useCallback(() => {
    setEmail("")
    setPassword("")
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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
    },
    [email, password, mode, signIn, signUp, handleClose, router]
  )

  return (
    <Modal
      panelClassName="max-w-[480px]"
      open={open}
      title={mode === "login" ? "Welcome back" : "Create your account"}
      description="Authenticate to access the admin dashboard and submit reports."
      onClose={handleClose}
      footer={
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {mode === "login"
              ? "Need an account?"
              : "Already have an account?"}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleMode}
            className="font-semibold"
          >
            {mode === "login" ? "Register" : "Login"}
          </Button>
        </div>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldContent>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <FieldContent>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              placeholder="Secure password"
            />
          </FieldContent>
        </Field>

        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={isAuthenticating}
        >
          {ctaLabel}
        </Button>
      </form>
    </Modal>
  )
}

