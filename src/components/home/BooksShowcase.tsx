"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface BookItem {
  title: string
  coverImage: string
  description: string
  href: string
}

interface BooksShowcaseProps {
  sectionTitle: string
  items: BookItem[]
}

const BOOK_COLORS = [
  {
    bg: "from-primary/20 via-primary/8 to-card",
    spine: "bg-primary",
    accent: "text-primary",
  },
  {
    bg: "from-accent/20 via-accent/8 to-card",
    spine: "bg-accent",
    accent: "text-accent",
  },
]

export function BooksShowcase({ sectionTitle, items }: BooksShowcaseProps) {
  if (items.length === 0) return null

  return (
    <section className="py-28 px-6 bg-muted/25 relative overflow-hidden">
      {/* Right decorative element */}
      <div
        className="absolute -right-32 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"
      />

      <AnimatedSection>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.22em]">
                Books
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
          </motion.div>

          {/* Books Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {items.map((book, i) => {
              const colors = BOOK_COLORS[i % BOOK_COLORS.length]
              return (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.18 }}
                >
                  <Link href={book.href} className="group flex gap-6 items-start">
                    {/* Book Cover */}
                    <div className="shrink-0 relative">
                      {/* Book depth (spine) */}
                      <div
                        className={cn(
                          "absolute -left-2 top-1 bottom-1 w-3 rounded-l-sm shadow-md",
                          colors.spine,
                          "opacity-80"
                        )}
                        style={{ transform: "skewY(-1deg)" }}
                      />
                      {/* Cover */}
                      <div
                        className={cn(
                          "relative w-32 h-48 rounded-r-md bg-gradient-to-br border border-border/40 shadow-lg flex flex-col items-center justify-center overflow-hidden group-hover:shadow-xl transition-shadow duration-300",
                          colors.bg
                        )}
                      >
                        {/* Decorative pattern */}
                        <div
                          className="absolute inset-0 opacity-[0.06]"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(45deg, currentColor 0px, transparent 1px, transparent 8px, currentColor 8px)",
                          }}
                        />

                        {/* Om symbol */}
                        <div className="relative z-10 text-center">
                          <div
                            className="text-3xl mb-2 opacity-40"
                            style={{ fontFamily: "serif" }}
                          >
                            ॐ
                          </div>
                          <div className={cn("text-[9px] font-bold uppercase tracking-widest opacity-40", colors.accent)}>
                            Varun Gupta
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="space-y-3 pt-2 flex-1">
                      <h3
                        className="leading-snug group-hover:text-primary transition-colors duration-200"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        {book.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {book.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm font-medium text-primary pt-1 group-hover:gap-3 transition-all duration-200">
                        <span>Learn More</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* All books link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-14 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-border/40" />
            <Link
              href="/books"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
            >
              View all books
              <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  )
}
