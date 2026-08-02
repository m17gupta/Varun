"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { podcasts } from "@/data/home"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchVideosThunk } from "@/lib/store/videos/videosThunks"
import type { VideoModel } from "@/lib/store/videos/videosTypes"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const itemSlide = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const listContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

export function VideosPodcastSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const dispatch = useAppDispatch()
  const { videos, isFetchedVideos } = useAppSelector((s) => s.videos)

  useEffect(() => {
    if (!isFetchedVideos) dispatch(fetchVideosThunk())
  }, [dispatch, isFetchedVideos])

  const featured = videos.filter((v) => v.published && v.featured)
  const published = videos.filter((v) => v.published && !v.featured)
  const homeVideos = [...featured, ...published].slice(0, 3)

  const fallback: VideoModel[] = [
    {
      title: "The Mahabharata War: Myth or Reality?",
      category: "lectures",
      duration: 45 * 60,
      videoUrl: "",
      slug: "fallback-1",
      description: "",
      published: true,
    },
    {
      title: "Understanding Dharma: Lessons from the Epic",
      category: "practice",
      duration: 38 * 60,
      videoUrl: "",
      slug: "fallback-2",
      description: "",
      published: true,
    },
    {
      title: "The Women of the Mahabharata",
      category: "talk",
      duration: 52 * 60,
      videoUrl: "",
      slug: "fallback-3",
      description: "",
      published: true,
    },
  ]

  const displayVideos = homeVideos.length > 0 ? homeVideos : fallback

  function formatDuration(seconds?: number) {
    if (!seconds || seconds <= 0) return ""
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${String(secs).padStart(2, "0")}`
  }

  function categoryLabel(video: VideoModel) {
    const words = (video.category ?? "Lecture").split("-")
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  }

  return (
    <section ref={ref} className="border-b border-border/60">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
        {/* Video side */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="px-6 py-16 sm:py-24 lg:border-r lg:border-border/60 lg:px-12"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            03 / The lectures
          </p>
          <h2 className="mt-2 font-serif text-4xl text-dark sm:text-5xl">
            Video
          </h2>
          <motion.div
            variants={listContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-8 space-y-5"
          >
            {displayVideos.map((video) => (
              <motion.div key={video._id ?? video.title} variants={itemSlide}>
                <Link
                  href={video.videoUrl || "/videos"}
                  target={video.videoUrl ? "_blank" : undefined}
                  rel={video.videoUrl ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-[88px_1fr] items-center gap-5"
                >
                  <div className="relative aspect-[1.25/1] overflow-hidden rounded-xl bg-muted">
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt=""
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="88px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl text-muted-foreground">▶</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {categoryLabel(video)}
                      {video.duration ? ` / ${formatDuration(video.duration)}` : ""}
                    </p>
                    <p className="mt-1.5 font-serif text-lg leading-snug text-dark transition-colors duration-300 group-hover:text-tan">
                      {video.title}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <Link
            href="/videos"
            className="mt-8 inline-flex text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-dark"
          >
            All lectures
          </Link>
        </motion.div>

        {/* Podcast side */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-muted px-6 py-16 sm:py-24 lg:px-12"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            04 / The conversations
          </p>
          <h2 className="mt-2 font-serif text-4xl text-dark sm:text-5xl">
            The Podcast
          </h2>
          <motion.div
            variants={listContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-8 space-y-5"
          >
            {podcasts.map((title, index) => (
              <motion.div key={title} variants={itemSlide}>
                <Link
                  href="/podcast"
                  className="group grid grid-cols-[52px_1fr] items-center gap-5"
                >
                  <span className="flex aspect-square items-center justify-center rounded-full bg-dark text-sm text-cream transition-all duration-300 group-hover:scale-105">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Episode {index + 1}
                    </span>
                    <span className="mt-1.5 block font-serif text-lg leading-snug text-dark transition-colors duration-300 group-hover:text-tan">
                      {title}
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <Link
            href="/podcast"
            className="mt-8 inline-flex text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-dark"
          >
            All episodes
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
