"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight, Mic } from "lucide-react"

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const itemUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const cardReveal = {
  hidden: { opacity: 0, scale: 0.96, x: 30 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.25 } },
}

export function PodcastInviteSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reduce = useReducedMotion()

  return (
    <section
      ref={ref}
      id="podcast-invite"
      aria-labelledby="podcast-invite-heading"
      className="bg-dark-gray px-6 py-16 text-card sm:py-24 lg:px-12"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Invitation copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-2xl"
        >
          <motion.p
            variants={itemUp}
            className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40"
          >
            An invitation · The Podcast
          </motion.p>
          <motion.h2
            id="podcast-invite-heading"
            variants={itemUp}
            className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-card"
          >
            Let&rsquo;s record a
            <span className="block italic text-card/55">conversation</span>
            <span className="block italic text-card/55">about the epic.</span>
          </motion.h2>
          <motion.p
            variants={itemUp}
            className="mt-8 max-w-md text-base leading-7 text-white/55"
          >
            Questions about dharma, history, and the living wisdom of the
            Mahabharata deserve more than a paragraph. Invite me onto your show,
            or propose a conversation for the podcast.
          </motion.p>
          <motion.div variants={itemUp} className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/podcast"
              className="inline-flex items-center gap-2.5 rounded-full bg-card px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-dark transition-all duration-300 hover:scale-105"
            >
              Browse episodes
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-border/40 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-card transition-all duration-300 hover:bg-card hover:text-dark"
            >
              Invite me on your show
            </Link>
          </motion.div>
        </motion.div>

        {/* Cover card with rotating badge */}
        <motion.div
          variants={cardReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mx-auto w-full max-w-[420px]"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-badge-bg ring-1 ring-border/10">
            {/* Top label */}
            <div className="absolute left-7 top-7 flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-tan/60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-tan" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-tan">
                Open for guests
              </span>
            </div>

            {/* Center title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-card/40">
                The Podcast
              </p>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-card sm:text-4xl">
                The Conversations
              </h3>
              <span className="mt-2 font-serif text-lg italic text-card/55">
                Mahabharata, decoded
              </span>
              <span className="mt-6 h-px w-12 bg-border/30" />
            </div>
          </div>

          {/* Rotating circular text badge — signature element */}
          <div className="absolute -bottom-7 -right-5 size-36 sm:size-44">
            <motion.svg
              viewBox="0 0 200 200"
              className="size-full"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
              aria-hidden="true"
            >
              <defs>
                <path
                  id="podcast-invite-circle"
                  d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
                />
              </defs>
              <text
                className="fill-tan text-[11px] font-semibold uppercase"
                style={{ letterSpacing: "0.22em" }}
              >
                <textPath href="#podcast-invite-circle" startOffset="0">
                  Invite a conversation · Join the podcast ·
                </textPath>
              </text>
            </motion.svg>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-dark text-tan ring-1 ring-border/20 sm:size-16">
                <Mic className="size-5 sm:size-6" />
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
