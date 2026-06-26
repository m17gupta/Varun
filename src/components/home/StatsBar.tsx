"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface StatItem {
  value: string
  label: string
  icon: string
}

interface StatsBarProps {
  items: StatItem[]
}

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-4xl md:text-5xl font-bold tabular-nums"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      {value}
    </motion.div>
  )
}

export function StatsBar({ items }: StatsBarProps) {
  return (
    <section className="relative py-16 border-y border-border/60 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-primary/[0.03] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-border/40">
          {items.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center px-6 py-8 text-center gap-2 group"
            >
              {/* Stat value */}
              <AnimatedNumber value={stat.value} />

              {/* Label */}
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
                {stat.label}
              </p>

              {/* Decorative dot */}
              <div className="mt-1 size-1 rounded-full bg-primary/30 group-hover:bg-accent transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
