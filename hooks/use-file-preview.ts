import { useEffect, useState } from "react"

export function useFilePreview(file: File | null): string | null {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    function syncPreviewUrl() {
      if (!file) {
        setPreviewUrl(null)
        return undefined
      }

      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      return () => {
        URL.revokeObjectURL(objectUrl)
      }
    }

    const cleanup = syncPreviewUrl()

    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [file])

  return previewUrl
}

