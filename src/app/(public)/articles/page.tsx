"use client"

import { useRef } from "react"
import type { Metadata } from "next"
import content from "@/config/pages/articles.json"
import { motion, useInView } from "framer-motion"
import { PageTransition } from "@/components/shared/PageTransition"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const cardItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const filterItem = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
}

const featuredReveal = {
  hidden: { opacity: 0, scale: 0.97, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export default function ArticlesPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })
  const filtersRef = useRef<HTMLDivElement>(null)
  const filtersInView = useInView(filtersRef, { once: true, margin: "-80px" })
  const featuredRef = useRef<HTMLDivElement>(null)
  const featuredInView = useInView(featuredRef, { once: true, margin: "-80px" })
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" })
  const paginationRef = useRef<HTMLDivElement>(null)
  const paginationInView = useInView(paginationRef, { once: true, margin: "-80px" })

  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <div ref={headerRef}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <SectionHeader
              label={content.pageHeader.subtitle}
              title={content.pageHeader.title}
              description={content.pageHeader.description}
            />
          </motion.div>
        </div>

        <div ref={filtersRef} className="mt-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={filtersInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-2"
          >
            {content.categories.map((cat) => (
              <motion.div key={cat.id} variants={filterItem}>
                <Link href={`/articles?category=${cat.id}`}>
                  <Button variant={cat.id === "all" ? "default" : "outline"} size="sm">
                    {cat.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {content.featuredArticle && (
          <div ref={featuredRef} className="mt-12">
            <motion.div
              variants={featuredReveal}
              initial="hidden"
              animate={featuredInView ? "visible" : "hidden"}
            >
              <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="aspect-[21/9] bg-muted" />
                <CardContent className="space-y-4 pt-6">
                  <Badge>
                    {content.categories.find((c) => c.id === content.featuredArticle.category)?.label}
                  </Badge>
                  <CardTitle>
                    <EditableText as="span" value={content.featuredArticle.title} />
                  </CardTitle>
                  <EditableText
                    as="p"
                    value={content.featuredArticle.excerpt}
                    className="text-muted-foreground"
                  />
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <EditableText as="span" value={content.featuredArticle.author} />
                    <span>·</span>
                    <EditableText as="span" value={content.featuredArticle.date} />
                    <span>·</span>
                    <EditableText as="span" value={content.featuredArticle.readTime} />
                  </div>
                  <Link href={content.featuredArticle.url}>
                    <Button>Read Article</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        <div ref={gridRef} className="mt-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div key={i} variants={cardItem}>
                <Card className="flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="aspect-[16/9] bg-muted rounded-t-xl" />
                  <CardContent className="flex-1 space-y-3 pt-6">
                    <Badge variant="secondary">Category</Badge>
                    <CardTitle>
                      <EditableText as="span" value={`Article Title ${i + 1}`} />
                    </CardTitle>
                    <EditableText
                      as="p"
                      value="A brief excerpt of the article content that gives readers a preview of what to expect..."
                      className="text-sm text-muted-foreground line-clamp-3"
                    />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Varun Gupta</span>
                      <span>·</span>
                      <span>2025-01-01</span>
                      <span>·</span>
                      <span>8 min read</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div ref={paginationRef} className="mt-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={paginationInView ? "visible" : "hidden"}
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
