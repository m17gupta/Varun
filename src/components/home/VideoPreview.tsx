"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Play, Clock, ExternalLink } from "lucide-react"

interface VideoItem {
  title: string
  thumbnail: string
  duration: string
  url: string
}

interface VideoPreviewProps {
  sectionTitle: string
  description: string
  items: VideoItem[]
}

const categories = ["All", "Lectures", "Talks", "Discussions"]

function PlayButton({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <div
      className={cn(
        "rounded-full bg-background/90 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary",
        size === "lg" ? "size-16" : "size-10"
      )}
    >
      <Play
        className={cn(
          "fill-current ml-0.5 transition-colors duration-300 group-hover:text-primary-foreground",
          size === "lg" ? "size-6 text-foreground" : "size-4 text-foreground"
        )}
      />
    </div>
  )
}

export function VideoPreview({ sectionTitle, description, items }: VideoPreviewProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All" ? items : items

  const featured = filtered[0]
  const rest = filtered.slice(1, 4)

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Decorative bg */}
      <div
        className="absolute -left-48 -bottom-24 size-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-primary), transparent 70%)" }}
      />

      <AnimatedSection>
        <div className="max-w-6xl mx-auto space-y-12">
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
                  Video Library
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

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-none border",
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Video grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Featured large video */}
              {featured && (
                <a
                  href={featured.url}
                  className="group relative block aspect-video bg-muted border border-border/60 overflow-hidden rounded-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                  {/* Placeholder bg */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 30% 40%, oklch(0.25 0.068 55 / 0.5), oklch(0.12 0.02 55))",
                    }}
                  />

                  {/* Center play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <PlayButton size="lg" />
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <p className="text-white text-base md:text-lg font-semibold leading-snug mb-2 drop-shadow-lg max-w-2xl"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {featured.title}
                    </p>
                    <div className="flex items-center gap-3 text-white/70 text-xs">
                      <Clock className="size-3.5" />
                      <span>{featured.duration}</span>
                      <ExternalLink className="size-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </a>
              )}

              {/* Secondary video grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.map((video, i) => (
                    <motion.a
                      key={video.title}
                      href={video.url}
                      className="group relative block aspect-video bg-muted border border-border/60 overflow-hidden rounded-none"
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at 30% 40%, oklch(${0.25 + i * 0.05} 0.068 ${55 + i * 20} / 0.5), oklch(0.12 0.02 55))`,
                        }}
                      />

                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <PlayButton size="sm" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <p className="text-white text-sm font-medium leading-snug line-clamp-2 mb-1"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {video.title}
                        </p>
                        <div className="flex items-center gap-2 text-white/60 text-[11px]">
                          <Clock className="size-3" />
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-border/40" />
            <Link
              href="/videos"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
            >
              Browse all videos
              <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  )
}
