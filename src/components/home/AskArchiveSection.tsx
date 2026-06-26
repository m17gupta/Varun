"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface AskArchiveSectionProps {
  question: string
  description: string
  buttonLabel: string
  href: string
}

export function AskArchiveSection({ question, description, buttonLabel, href }: AskArchiveSectionProps) {
  return (
    <section className="py-24 border-b border-border/50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="space-y-6"
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {question}
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {description}
          </p>

          <Link
            href={href}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-primary-foreground group transition-all duration-200"
            style={{ background: "var(--crimson)" }}
          >
            {buttonLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
