"use client"

import { cn } from "@/lib/utils"
import { EditableText } from "@/components/shared/EditableText"
import { motion } from "framer-motion"

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  className?: string
  animated?: boolean
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  animated = false,
}: SectionHeaderProps) {
  const content = (
    <div className={cn("space-y-2", className)}>
      {label && (
        <EditableText
          as="span"
          value={label}
          className="text-sm font-medium text-primary uppercase tracking-wider"
        />
      )}
      <EditableText
        as="h2"
        value={title}
        className="text-3xl font-bold tracking-tight"
      />
      {description && (
        <EditableText
          as="p"
          value={description}
          className="text-muted-foreground max-w-2xl"
        />
      )}
    </div>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
