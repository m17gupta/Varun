"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { BookText, Compass, Clock, Globe } from "lucide-react"

interface ResearchItem {
  title: string
  description: string
  icon: string
}

interface ResearchFocusGridProps {
  sectionLabel: string
  sectionTitle: string
  items: ResearchItem[]
}

const iconMap: Record<string, React.ElementType> = {
  book: BookText,
  compass: Compass,
  clock: Clock,
  globe: Globe,
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export function ResearchFocusGrid({
  sectionLabel,
  sectionTitle,
  items,
}: ResearchFocusGridProps) {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div
        className="absolute -right-32 top-16 size-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
      />

      <AnimatedSection>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.22em]">
                {sectionLabel}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              {sectionTitle}
            </motion.h2>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item, i) => {
              const Icon = iconMap[item.icon] ?? BookText
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="group relative bg-card border border-border/60 rounded-none p-8 hover:border-primary/40 transition-colors duration-300 overflow-hidden"
                >
                  {/* Large index number (watermark) */}
                  <span
                    className="absolute -bottom-4 -right-2 text-[7rem] font-bold text-muted-foreground/5 select-none pointer-events-none leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <div className="size-10 rounded-full border border-border/60 flex items-center justify-center bg-background/50 group-hover:bg-primary/5 transition-colors duration-300">
                      <Icon className="size-4 text-primary" strokeWidth={1.5} />
                    </div>

                    <h3
                      className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors duration-200"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600 }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-border/40" />
            <Link
              href="/research"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
            >
              View all research areas
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  )
}
