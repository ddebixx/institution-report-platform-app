"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { HomeIcon, ArrowLeftIcon, SearchIcon, CompassIcon } from "lucide-react"
import { twMerge } from "tailwind-merge"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()

  const handleGoHome = useCallback(() => {
    router.push("/")
  }, [router])

  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div className="relative flex min-h-[calc(100vh-200px)] items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 px-4 py-16 sm:px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-2 w-2 rounded-full bg-primary/30 animate-float" />
        <div className="absolute top-40 right-20 h-3 w-3 rounded-full bg-primary/20 animate-float-delayed" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-32 left-1/4 h-2 w-2 rounded-full bg-primary/25 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 right-1/3 h-3 w-3 rounded-full bg-primary/20 animate-float-delayed" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-3xl animate-glow" />
              
              <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-12 shadow-md backdrop-blur-sm sm:p-16">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10" />
                
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                
                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-pulse" />
                      <div className="relative rounded-2xl border border-primary/30 bg-primary/10 px-8 py-6 backdrop-blur-sm">
                        <span className="text-7xl font-bold text-primary sm:text-8xl lg:text-9xl">4</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-pulse" style={{ animationDelay: "0.2s" }} />
                      <div className="relative rounded-2xl border border-primary/30 bg-primary/10 px-8 py-6 backdrop-blur-sm">
                        <span className="text-7xl font-bold text-primary sm:text-8xl lg:text-9xl">0</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-pulse" style={{ animationDelay: "0.4s" }} />
                      <div className="relative rounded-2xl border border-primary/30 bg-primary/10 px-8 py-6 backdrop-blur-sm">
                        <span className="text-7xl font-bold text-primary sm:text-8xl lg:text-9xl">4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 space-y-4">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Page Not Found
            </h1>
            <p className="mx-auto max-w-md text-lg text-muted-foreground sm:text-xl">
              Oops! The page you're looking for seems to have wandered off into the digital void.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={handleGoHome}
              className="group relative overflow-hidden font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xs hover:shadow-primary/30"
            >
              <HomeIcon className="size-5 transition-transform duration-300 group-hover:scale-110" />
              Go Home
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleGoBack}
              className="group font-semibold transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-xs"
            >
              <ArrowLeftIcon className="size-5 transition-transform duration-300 group-hover:-translate-x-1" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

