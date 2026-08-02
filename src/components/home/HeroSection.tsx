"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { animate } from "animejs"

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

const imageReveal = {
  hidden: { opacity: 0, scale: 0.96, x: 30 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.25 } },
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const bgMandalaRef = useRef<HTMLDivElement>(null)
  const topMandalaRef = useRef<HTMLDivElement>(null)
  const bottomMandalaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isInView) return

    const anims = [
      animate(bgMandalaRef.current!, { rotate: 360, duration: 150000, easing: "linear", loop: true }),
      animate(topMandalaRef.current!, { rotate: -360, duration: 180000, easing: "linear", loop: true }),
      animate(bottomMandalaRef.current!, { rotate: 360, duration: 120000, easing: "linear", loop: true }),
    ]

    return () => anims.forEach((a) => a.pause())
  }, [isInView])

  useEffect(() => {
    if (!isInView || !badgeRef.current) return

    animate(badgeRef.current!, { translateY: [16, 0], opacity: [0, 1], duration: 600, easing: "spring", delay: 650 })

    badgeRef.current.style.opacity = "0"
  }, [isInView])

  return (
    <section ref={ref} className="relative overflow-hidden mx-auto max-w-[1400px] px-6 lg:px-12 pt-28 pb-20 sm:pb-24 lg:py-32">
      {/* Background Mandala Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute left-[30%] top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none mix-blend-multiply"
      >
        <div ref={bgMandalaRef} className="relative size-full">
          <Image
            src="/images/home/mandala.jpg"
            alt="Mandala Background"
            fill
            className="object-contain opacity-75"
            sizes="600px"
          />
        </div>
      </motion.div>

      {/* Decorative dot grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute -left-4 top-24 hidden opacity-[0.04] lg:block"
        aria-hidden="true"
      >
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="size-2 rounded-full bg-dark" />
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        {/* Text side */}
        <div className="relative max-w-2xl">
          <motion.p variants={itemUp} className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Vol. 01 / Essays / Lectures / Research
          </motion.p>
          <motion.h1 variants={itemUp} className="font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.95] text-dark">
            A serious
            <span className="block">mind</span>
            <span className="block italic text-dark/70">
              for an ancient
            </span>
            <span className="block italic text-dark/70">conversation.</span>
          </motion.h1>
          <motion.p variants={itemUp} className="mt-8 max-w-md text-base leading-7 text-muted-foreground">
            The published work of Varun Gupta, Mahabharata researcher,
            author, and speaker. Essays, books, lectures, and conversations on
            dharma, history, philosophy, and the living wisdom of the epic.
          </motion.p>
          <motion.div variants={itemUp} className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2.5 rounded-full bg-dark px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:scale-105"
            >
              Begin with the essays
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2.5 rounded-full border border-border px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 hover:bg-white hover:text-dark"
            >
              Ask the archive
            </Link>
          </motion.div>

          {/* Decorative thin line */}
          <motion.div
            variants={itemUp}
            className="mt-12 hidden h-px w-24 bg-border/60 lg:block"
          />
        </div>

        {/* Image side */}
        <motion.div
          variants={imageReveal}
          className="relative mx-auto w-full max-w-[460px] self-center lg:max-w-[500px]"
        >
          {/* Decorative rotating mandala behind/beside portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={isInView ? { opacity: 0.25, scale: 1, rotate: 45 } : { opacity: 0, scale: 0.8, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
            className="absolute -right-12 -top-12 size-48 overflow-hidden rounded-full mix-blend-multiply lg:size-64"
            aria-hidden="true"
          >
            <div ref={topMandalaRef} className="relative size-full">
              <Image
                src="/images/home/mandala.jpg"
                alt="Decorative Mandala"
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 1024px) 192px, 256px"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={isInView ? { opacity: 0.15, scale: 1, rotate: -30 } : { opacity: 0, scale: 0.8, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
            className="absolute -left-8 bottom-12 size-24 overflow-hidden rounded-full mix-blend-multiply lg:size-32"
            aria-hidden="true"
          >
            <div ref={bottomMandalaRef} className="relative size-full">
              <Image
                src="/images/home/mandala.jpg"
                alt="Decorative Mandala Small"
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 1024px) 96px, 128px"
              />
            </div>
          </motion.div>

          {/* Portrait */}
          <div className="relative aspect-[4/5] overflow-hidden bg-dark-gray">
            <Image
              src="/images/home/portrait.png"
              alt="Portrait of Varun Gupta"
              fill
              priority
              className="object-cover object-top grayscale"
              style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)" }}
              sizes="(max-width: 1024px) 90vw, 500px"
            />
          </div>

          {/* Floating badge */}
          <div
            ref={badgeRef}
            className="absolute -bottom-3 left-0 max-w-[270px] rounded-2xl bg-card px-6 py-5 shadow-lg ring-1 ring-border/30"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Current reading
            </p>
            <p className="mt-1.5 font-serif text-sm italic leading-snug text-dark">
              The Mahabharata, Critical Edition
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
