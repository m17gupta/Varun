"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import Link from "next/link"
import { Mic, BookOpen, Radio, ArrowUpRight } from "lucide-react"

interface SpeakingItem {
  title: string
  event: string
  date: string
  type: string
}

interface SpeakingMediaProps {
  sectionTitle: string
  description: string
  items: SpeakingItem[]
}

const typeIcons: Record<string, React.ElementType> = {
  Conference: Mic,
  Podcast: Radio,
  Lecture: BookOpen,
}

const typeColors: Record<string, string> = {
  Conference: "text-primary bg-primary/8 border-primary/20",
  Podcast: "text-accent bg-accent/8 border-accent/20",
  Lecture: "text-muted-foreground bg-muted border-border/40",
}

export function SpeakingMedia({ sectionTitle, description, items }: SpeakingMediaProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />

      <AnimatedSection>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-primary/60" />
                <span className="text-xs font-semibold text-primary uppercase tracking-[0.22em]">
                  Speaking & Media
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}
              >
                {sectionTitle}
              </h2>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed max-w-md">
                {description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/speaking"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group whitespace-nowrap"
              >
                All Engagements
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {items.map((item, i) => {
              const Icon = typeIcons[item.type] ?? Mic
              const colorClass = typeColors[item.type] ?? typeColors.Lecture
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex items-start gap-5 p-6 border border-border/60 bg-card hover:border-primary/40 transition-colors duration-300 rounded-none relative overflow-hidden"
                >
                  {/* Left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/0 group-hover:bg-primary/60 transition-colors duration-300" />

                  {/* Icon badge */}
                  <div className={`shrink-0 size-10 rounded-full border flex items-center justify-center ${colorClass}`}>
                    <Icon className="size-4" strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-sm border ${colorClass}`}
                      >
                        {item.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <h3
                      className="font-semibold leading-snug group-hover:text-primary transition-colors duration-200 mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{item.event}</p>
                  </div>

                  <ArrowUpRight className="size-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-200 shrink-0 mt-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
