"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowUpRight, FileText } from "lucide-react"

interface FeaturedItem {
  title: string
  type: string
  date: string
  url: string
}

interface FeaturedContentProps {
  sectionTitle: string
  description: string
  items: FeaturedItem[]
}

const typeColors: Record<string, string> = {
  "Research Paper": "bg-primary/10 text-primary",
  "Book Chapter": "bg-accent/10 text-accent-foreground",
  "Journal Article": "bg-secondary text-secondary-foreground",
}

export function FeaturedContent({
  sectionTitle,
  description,
  items,
}: FeaturedContentProps) {
  const [mainFeature, ...sidebar] = items

  return (
    <section className="py-28 px-6 bg-muted/25 relative overflow-hidden">
      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      <AnimatedSection>
        <div className="max-w-6xl mx-auto space-y-14">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-primary/60" />
                <span className="text-xs font-semibold text-primary uppercase tracking-[0.22em]">
                  Publications
                </span>
              </div>
              <h2
                className="max-w-xl"
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
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/research"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group whitespace-nowrap"
              >
                All Publications
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Featured Main */}
            {mainFeature && (
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                <Link href={mainFeature.url} className="group block h-full">
                  <div className="h-full bg-card border border-border/60 p-8 md:p-10 hover:border-primary/40 transition-colors duration-300 relative overflow-hidden rounded-none">
                    {/* Corner accent */}
                    <div className="absolute top-0 left-0 w-[3px] h-16 bg-primary" />

                    <div className="space-y-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm",
                            typeColors[mainFeature.type] ?? "bg-muted text-muted-foreground"
                          )}
                        >
                          {mainFeature.type}
                        </span>
                        <span className="text-xs text-muted-foreground">{mainFeature.date}</span>
                      </div>

                      <h3
                        className="group-hover:text-primary transition-colors duration-200 leading-snug"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        {mainFeature.title}
                      </h3>

                      <div className="pt-4 flex items-center gap-2 text-sm font-medium text-primary">
                        <span>Read Paper</span>
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Sidebar Items */}
            <div className="lg:col-span-2 space-y-4">
              {sidebar.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
                >
                  <Link href={item.url} className="group block">
                    <div className="bg-card border border-border/60 p-6 hover:border-primary/40 transition-colors duration-300 relative rounded-none">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <FileText className="size-3.5 text-muted-foreground/50 shrink-0" />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {item.type}
                          </span>
                          <span className="text-[10px] text-muted-foreground/60 ml-auto">
                            {item.date}
                          </span>
                        </div>

                        <h4
                          className="text-sm leading-snug group-hover:text-primary transition-colors duration-200"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 600 }}
                        >
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Decorative placeholder */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="border border-dashed border-border/40 p-6 flex flex-col items-center justify-center gap-2 text-center rounded-none"
              >
                <p className="text-xs text-muted-foreground/60 italic">
                  More publications available in the Research archive.
                </p>
                <Link
                  href="/research"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Browse all →
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
