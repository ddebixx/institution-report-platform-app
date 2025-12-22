"use client"

import type { MouseEvent } from "react"
import { useCallback, useEffect } from "react"

import { cn } from "@/lib/utils"

type ModalProps = {
  open: boolean
  title: string
  description?: string
  onClose?: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  panelClassName?: string
}

export const Modal = ({
  open,
  title,
  description,
  onClose,
  children,
  footer,
  panelClassName,
}: ModalProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose()
      }
    },
    [onClose]
  )

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget && onClose) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!open || !onClose) {
      return
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown, open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose ? handleBackdropClick : undefined}
    >
      <div
        className={cn(
          "relative w-full max-w-5xl animate-in fade-in zoom-in-95 duration-200",
          "rounded-xl border border-border bg-card p-6 shadow-md",
          "max-h-[90vh] overflow-y-auto",
          panelClassName
        )}
      >
        <div className="flex h-full flex-col gap-0">
          <div className="space-y-2 pb-4">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <div className="flex-1 min-h-0 space-y-4 overflow-y-auto pr-1">
            {children}
          </div>
          {footer ? <div className="pt-6">{footer}</div> : null}
        </div>
      </div>
    </div>
  )
}

