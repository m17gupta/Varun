"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Play, Headphones, Clock, ArrowUpRight } from "lucide-react"

interface VideoItem {
  title: string
  thumbnail: string
  duration: string
  url: string
}

interface PodcastEpisode {
  id: string
  title: string
  description: string
  episodeNumber: number
  duration: string
  publishedDate: string
  audioUrl: string
}

interface VideosPodcastSectionProps {
  videos: VideoItem[]
  videosTitle: string
  videosHref: string
  episodes: PodcastEpisode[]
  podcastTitle: string
  podcastHref: string
}

export function VideosPodcastSection({
  videos,
  videosTitle,
  videosHref,
  episodes,
  podcastTitle,
  podcastHref,
}: VideosPodcastSectionProps) {
  const displayVideos = videos.slice(0, 3)
  const displayEpisodes = episodes.slice(0, 3)

  return (
    <section className="py-20 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Videos Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-baseline justify-between mb-7">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold block mb-2">
                  Video Library
                </span>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  {videosTitle}
                </h2>
              </div>
              <Link
                href={videosHref}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
              >
                All videos <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {displayVideos.map((video, i) => (
                <motion.a
                  key={video.url}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group flex items-start gap-4 py-4 border-b border-border/40 last:border-0"
                >
                  {/* Thumbnail */}
                  <div className="shrink-0 relative w-28 aspect-video bg-muted overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at 30% 40%, oklch(${0.15 + i * 0.05} 0.03 ${50 + i * 20}), oklch(0.08 0.01 50))`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-7 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Play className="size-3.5 text-foreground fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 font-mono">
                      {video.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4
                      className="group-hover:text-accent transition-colors duration-200 leading-snug"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.0rem",
                        fontWeight: 600,
                        lineHeight: 1.35,
                      }}
                    >
                      {video.title}
                    </h4>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-px self-stretch w-px bg-border/40" />

          {/* Podcast Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-baseline justify-between mb-7">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold block mb-2">
                  Podcast
                </span>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  {podcastTitle}
                </h2>
              </div>
              <Link
                href={podcastHref}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
              >
                All episodes <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {displayEpisodes.map((ep, i) => (
                <motion.div
                  key={ep.id}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group flex items-start gap-4 py-4 border-b border-border/40 last:border-0 cursor-pointer"
                >
                  {/* Episode number badge */}
                  <div className="shrink-0 size-12 rounded-sm flex items-center justify-center bg-card border border-border/50 group-hover:border-foreground/30 transition-colors">
                    <Headphones className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>Ep. {ep.episodeNumber}</span>
                      <span>·</span>
                      <Clock className="size-3" />
                      <span>{ep.duration}</span>
                    </div>
                    <h4
                      className="group-hover:text-accent transition-colors duration-200 leading-snug"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.0rem",
                        fontWeight: 600,
                        lineHeight: 1.35,
                      }}
                    >
                      {ep.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">
                      {ep.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
