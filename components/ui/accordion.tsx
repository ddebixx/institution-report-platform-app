"use client"

import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { ChevronDownIcon } from "lucide-react"

type AccordionItemType = {
  id: string
  title: string
  content: string
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
    <div className={twMerge("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:shadow-md"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between gap-3 p-6 text-left transition-colors hover:bg-accent/50"
              aria-expanded={isOpen}
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <ChevronDownIcon
                className={twMerge(
                  "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            
            <div
              className={twMerge(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-muted-foreground">{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

