"use client"

import { useState } from "react"
import { twMerge } from "tailwind-merge"

type Tab = {
  id: string
  label: string
  content: React.ReactNode
}

type TabsProps = {
  tabs: Tab[]
  className?: string
  defaultTab?: string
}

export const Tabs = ({ tabs, className, defaultTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "")

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div className={twMerge("space-y-4", className)}>
      <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/30 p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={twMerge(
                "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        className={twMerge(
          "rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300",
          "animate-in fade-in-0 slide-in-from-bottom-4"
        )}
      >
        {activeTabContent}
      </div>
    </div>
  )
}

