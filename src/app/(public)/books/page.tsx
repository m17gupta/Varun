"use client"

import { useRef } from "react"
import type { Metadata } from "next"
import content from "@/config/pages/books.json"
import { motion, useInView } from "framer-motion"
import { PageTransition } from "@/components/shared/PageTransition"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const cardItem = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
}

export default function BooksPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" })

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

        <div ref={gridRef} className="mt-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {content.books.map((book, i) => (
              <motion.div key={book.id} variants={cardItem}>
                <Card className="flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="aspect-[3/4] bg-muted flex items-center justify-center rounded-t-xl overflow-hidden">
                    <EditableText
                      as="span"
                      value="Book Cover"
                      className="text-muted-foreground text-sm"
                    />
                  </div>
                  <CardContent className="flex-1 space-y-3 pt-6">
                    <CardTitle>
                      <EditableText as="span" value={book.title} />
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{book.year}</Badge>
                      <Badge variant="outline">{book.pages} pages</Badge>
                    </div>
                    <EditableText
                      as="p"
                      value={book.description}
                      className="text-sm text-muted-foreground line-clamp-3"
                    />
                    <EditableText
                      as="p"
                      value={`${book.publisher} · ISBN: ${book.isbn}`}
                      className="text-xs text-muted-foreground"
                    />
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Link href={book.purchaseUrl}>
                      <Button size="sm">Purchase</Button>
                    </Link>
                    {book.amazonUrl && (
                      <Link href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          Amazon
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
