"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface BookItem {
  title: string
  coverImage: string
  description: string
  href: string
}

interface PublishedWorksProps {
  sectionTitle: string
  items: BookItem[]
}

// Augment with extra placeholder books to fill the row
const EXTRA_BOOKS = [
  {
    title: "Bhishma: Vow, Virtue & Vulnerability",
    coverImage: "",
    description: "Tracing the arc of the most tragic figure of the Mahabharata — his oath, his restraint, and his final reckoning.",
    href: "/books/bhishma",
  },
  {
    title: "Time and Narrative in the Mahabharata",
    coverImage: "",
    description: "A structural analysis of how the Mahabharata uses time, embedding and meta-narration to construct meaning.",
    href: "/books/time-and-narrative",
  },
]

const SPINE_COLORS = [
  "#5C1A1A",
  "#2C3E50",
  "#1A3A2A",
  "#3B2A1A",
]

export function PublishedWorksSection({ sectionTitle, items }: PublishedWorksProps) {
  const allBooks = [...items, ...EXTRA_BOOKS]

  return (
    <section className="py-20 border-b border-white/10" style={{ background: "#111009" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold block mb-2">
              Works
            </span>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700,
              }}
            >
              {sectionTitle}
            </h2>
          </div>
          <Link
            href="/books"
            className="text-xs font-medium text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5 group hidden sm:flex"
          >
            View all
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Books — horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {allBooks.map((book, i) => (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <Link href={book.href} className="group block space-y-4">
                {/* Book Cover */}
                <div className="relative">
                  {/* Spine */}
                  <div
                    className="absolute -left-2 top-1 bottom-1 w-2.5 rounded-l-sm"
                    style={{ background: SPINE_COLORS[i % SPINE_COLORS.length] }}
                  />
                  {/* Cover */}
                  <div
                    className="relative aspect-[3/4] overflow-hidden rounded-r-sm shadow-2xl"
                    style={{ background: SPINE_COLORS[i % SPINE_COLORS.length] }}
                  >
                    {book.coverImage ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover opacity-80 mix-blend-luminosity group-hover:opacity-100 transition-opacity duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div
                          className="text-3xl text-center opacity-20 select-none mb-3"
                          style={{ fontFamily: "serif" }}
                        >
                          ॐ
                        </div>
                        <p
                          className="text-white/30 text-[10px] text-center uppercase tracking-widest leading-tight font-bold"
                        >
                          Varun Gupta
                        </p>
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1.5 pl-1">
                  <h3
                    className="text-white/90 group-hover:text-white transition-colors duration-200 leading-snug"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      lineHeight: 1.35,
                    }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                    {book.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
