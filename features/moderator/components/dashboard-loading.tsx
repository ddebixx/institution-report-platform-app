import { LoaderIcon } from "lucide-react"
import { useTranslations } from "next-intl"

type DashboardLoadingProps = {
  message: string
}

export const DashboardLoading = ({ message }: DashboardLoadingProps) => {
  const t = useTranslations()

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t(message)}</p>
        </div>
      </div>
    </div>
  )
}

