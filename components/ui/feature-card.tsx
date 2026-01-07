"use client"

import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { LucideIcon } from "lucide-react"

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={twMerge(
        "group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
        className
      )}
    >
      <div
        className={twMerge(
          "absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}
      />

      <div className="relative space-y-3">
        <div
          className={twMerge(
            "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300",
            isHovered && "scale-110 bg-primary/20"
          )}
        >
          <Icon className="size-6" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      <div
        className={twMerge(
          "absolute -right-8 -top-8 h-16 w-16 rounded-full bg-primary/5 transition-all duration-500",
          isHovered && "scale-150"
        )}
      />
    </div>
  )
}

