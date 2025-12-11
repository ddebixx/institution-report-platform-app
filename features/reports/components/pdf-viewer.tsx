"use client"

import { twMerge } from "tailwind-merge"
import { VIEWER_HEIGHT_CLASS } from "@/consts/reports"

type PdfViewerProps = {
  title: string
  src: string | null
  fileName?: string
  emptyText: string
  actionLink?: {
    href: string
    label: string
  }
}

export const PdfViewer = ({
  title,
  src,
  fileName,
  emptyText,
  actionLink,
}: PdfViewerProps) => {
  return (
    <div className="space-y-2 rounded-md border border-border/60 bg-muted/30 p-3">
      <div className="flex items-center justify-between gap-2 text-sm font-semibold text-foreground">
        <span>{title}</span>
        <div className="flex items-center gap-2">
          {fileName ? (
            <span className="truncate text-xs font-normal text-muted-foreground">
              {fileName}
            </span>
          ) : null}
          {actionLink ? (
            <a
              href={actionLink.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              {actionLink.label}
            </a>
          ) : null}
        </div>
      </div>
      <div className={twMerge("rounded-md border border-border/50 bg-background", VIEWER_HEIGHT_CLASS)}>
        {src ? (
          <iframe
            title={title}
            src={src}
            className="h-full w-full rounded-md"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
            {emptyText}
          </div>
        )}
      </div>
    </div>
  )
}

