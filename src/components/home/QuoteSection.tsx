"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.1 } },
}

export function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="border-y border-border/60 bg-muted px-6 py-16 text-center sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground"
        >
          From the archive
        </motion.p>
        <motion.blockquote
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mt-5 max-w-3xl font-serif text-3xl italic leading-snug text-dark sm:text-4xl lg:text-5xl"
        >
          &ldquo;Where there is dharma, there is victory.&rdquo;
        </motion.blockquote>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mt-6 h-px w-12 bg-border/60"
        />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
        >
          Mahabharata, recurring maxim
        </motion.p>
      </div>
    </section>
  )
}
