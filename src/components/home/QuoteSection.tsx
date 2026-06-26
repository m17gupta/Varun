"use client"

import { motion } from "framer-motion"

interface QuoteSectionProps {
  quote: string
  attribution: string
}

export function QuoteSection({ quote, attribution }: QuoteSectionProps) {
  return (
    <section className="py-16 border-y border-border/50 bg-card/40">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xl md:text-2xl leading-relaxed italic text-foreground/80"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            &ldquo;{quote}&rdquo;
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            — {attribution}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
