"use client"

import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { ChevronDownIcon, LucideIcon } from "lucide-react"

type AccordionItemType = {
  id: string
  title: string
  content: string
  icon?: LucideIcon
}

type AccordionProps = {
  items: AccordionItemType[]
  className?: string
  allowMultiple?: boolean
}

export const Accordion = ({ items, className, allowMultiple = false }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([])

  function toggleItem(id: string) {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={twMerge("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        const Icon = item.icon

        return (
          <div
            key={item.id}
            className={twMerge(
              "overflow-hidden rounded-lg border border-border bg-card transition-all duration-200",
              isOpen && "shadow-sm"
            )}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-accent/30"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <Icon className="size-4 text-primary" />
                  </div>
                )}
                <h3 className="text-sm font-semibold text-foreground sm:text-base">{item.title}</h3>
              </div>
              <ChevronDownIcon
                className={twMerge(
                  "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            
            <div
              className={twMerge(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 pl-[52px] text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

