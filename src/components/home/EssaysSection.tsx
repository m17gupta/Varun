"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { essays } from "@/data/home"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const cardItem = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const cardContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export function EssaysSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-6 py-16 sm:py-24 lg:px-12">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-10 flex items-end justify-between border-b border-border/60 pb-6"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            01 / The essays
          </p>
          <h2 className="mt-2 font-serif text-4xl leading-tight text-dark sm:text-5xl">
            Long-form writing
          </h2>
        </div>
        <Link
          href="/articles"
          className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-dark sm:inline-flex"
        >
          View the index
        </Link>
      </motion.div>

      <motion.div
        variants={cardContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {essays.map((essay) => (
          <motion.article key={essay.href} variants={cardItem}>
            <Link href={essay.href} className="group block">
              <div className="relative aspect-[1.28/1] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={essay.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <span>{essay.category}</span>
                <span>{essay.readTime}</span>
              </div>
              <h3 className="mt-2 font-serif text-xl leading-snug text-dark transition-colors duration-300 group-hover:text-tan">
                {essay.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {essay.excerpt}
              </p>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
