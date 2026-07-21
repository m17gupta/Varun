"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

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
    <section ref={ref} className="relative overflow-hidden border-y border-border/60 bg-muted px-6 py-16 text-center sm:py-20">
      {/* Background Rotating Mandala */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 0.04, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 1.5 }}
        className="absolute left-1/2 top-1/2 -z-10 size-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none mix-blend-multiply"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 180, ease: "linear", repeat: Infinity }}
          className="relative size-full"
        >
          <Image
            src="/images/home/mandala.jpg"
            alt="Mandala Background"
            fill
            className="object-contain"
          />
        </motion.div>
      </motion.div>
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
