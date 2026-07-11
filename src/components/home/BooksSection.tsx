"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { books } from "@/data/home"

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

export function BooksSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="bg-dark-gray px-6 py-20 text-card sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10 flex items-end justify-between border-b border-border/10 pb-8"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/40">
              02 / The books
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-card sm:text-5xl">
              Published works
            </h2>
          </div>
          <Link
            href="/books"
            className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 transition-colors duration-300 hover:text-card sm:inline-flex"
          >
            The shelf
          </Link>
        </motion.div>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {books.map((work) => (
            <motion.article key={work.title} variants={cardItem}>
              <Link href={work.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-dark border border-white/5">
                  <Image
                    src={work.image}
                    alt=""
                    fill
                    className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {work.label}
                </p>
                <h3 className="mt-2 font-serif text-xl leading-snug text-card transition-colors duration-300 group-hover:text-tan">
                  {work.title}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-white/50">
                  {work.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
