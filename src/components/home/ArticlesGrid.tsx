"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface ArticleItem {
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  image: string
  url: string
}

interface ArticlesGridProps {
  sectionLabel: string
  sectionTitle: string
  items: ArticleItem[]
  viewAllHref: string
}

const ARTICLE_DATA: ArticleItem[] = [
  {
    title: "The Dice Game and the Nature of Dharma",
    category: "Narrative Analysis",
    excerpt: "An examination of the pivotal dice game episode and what it reveals about the fluid nature of dharma in the epic's moral universe.",
    date: "2025",
    readTime: "12 min",
    image: "/images/home/article-1.png",
    url: "/articles/dice-game-dharma",
  },
  {
    title: "Dharma's Many Faces: A Philosophical Inquiry",
    category: "Philosophy & Ethics",
    excerpt: "Analyzing the philosophical underpinnings of dharma as presented through the Mahabharata's narrative and dialogues.",
    date: "2025",
    readTime: "9 min",
    image: "/images/home/article-2.png",
    url: "/articles/dharma-philosophical-inquiry",
  },
  {
    title: "Kurukshetra: War, Memory and Consequence",
    category: "Historical Context",
    excerpt: "Investigating the historical and archaeological correlates of the Mahabharata war and the scholarly debates surrounding its historicity.",
    date: "2024",
    readTime: "14 min",
    image: "/images/home/article-3.png",
    url: "/articles/kurukshetra-war-memory",
  },
  {
    title: "Women in the Mahabharata: Beyond the Silences",
    category: "Character Studies",
    excerpt: "A re-examination of Draupadi, Kunti, and Gandhari — their agency, suffering, and defiance that shaped the epic's course.",
    date: "2024",
    readTime: "11 min",
    image: "/images/home/article-4.png",
    url: "/articles/women-mahabharata",
  },
  {
    title: "Geographical Correlates of the Epic",
    category: "Historical Context",
    excerpt: "A multi-disciplinary approach tracing the rivers, cities, and landscapes of the Mahabharata to their real-world counterparts.",
    date: "2024",
    readTime: "16 min",
    image: "/images/home/article-5.png",
    url: "/articles/geographical-correlates",
  },
  {
    title: "Krishna: Divine Strategist or Human Philosopher?",
    category: "Character Studies",
    excerpt: "A deep dive into the most enigmatic character of the Mahabharata — his roles as diplomat, philosopher, and divine incarnation.",
    date: "2024",
    readTime: "10 min",
    image: "/images/home/article-6.png",
    url: "/articles/krishna-divine-strategist",
  },
]

export function ArticlesGrid({
  sectionLabel,
  sectionTitle,
  viewAllHref,
}: Omit<ArticlesGridProps, "items">) {
  const items = ARTICLE_DATA

  return (
    <section className="py-20 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header row */}
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold block mb-2">
              {sectionLabel}
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              {sectionTitle}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group hidden sm:flex"
          >
            View all
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3×2 Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((article, i) => (
            <motion.article
              key={article.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={article.url} className="group block space-y-4">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Meta */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "var(--crimson)" }}
                    >
                      {article.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{article.date} · {article.readTime}</span>
                  </div>

                  <h3
                    className="leading-snug group-hover:text-accent transition-colors duration-200"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      color: "inherit",
                    }}
                  >
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 flex sm:hidden">
          <Link
            href={viewAllHref}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
          >
            View all articles
            <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
