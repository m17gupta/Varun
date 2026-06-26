"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { EditableText } from "@/components/shared/EditableText"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { PageTransition } from "@/components/shared/PageTransition"
import Link from "next/link"

const filters = [
  { id: "all", label: "All" },
  { id: "articles", label: "Articles" },
  { id: "research", label: "Research Papers" },
  { id: "books", label: "Books" },
  { id: "videos", label: "Videos" },
  { id: "courses", label: "Courses" },
]

const mockResults = [
  { type: "articles", title: "The Dice Game and the Nature of Dharma", url: "/articles/dice-game-dharma" },
  { type: "research", title: "The Concept of Dharma in the Mahabharata", url: "/research/dharma-mahabharata" },
  { type: "books", title: "The Mahabharata: A Modern Reader's Companion", url: "/books/mahabharata-companion" },
  { type: "videos", title: "The Mahabharata War: Myth or Reality?", url: "/videos" },
  { type: "courses", title: "Understanding the Mahabharata", url: "/courses/understanding-mahabharata" },
]

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredResults = mockResults.filter(
    (r) => (activeFilter === "all" || r.type === activeFilter) &&
      (!query || r.title.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <AnimatedSection>
          <div className="space-y-4 mb-8">
            <EditableText
              as="h1"
              value="Search"
              className="text-4xl font-bold tracking-tight"
            />
            <EditableText
              as="p"
              value="Search across articles, research papers, books, videos, and courses."
              className="text-muted-foreground"
            />
          </div>

          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search the knowledge platform..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button>Search</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          {filteredResults.length === 0 ? (
            <div className="text-center py-16">
              <EditableText
                as="p"
                value="No results found. Try adjusting your search or filters."
                className="text-muted-foreground"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <EditableText
                as="p"
                value={`Showing ${filteredResults.length} result${filteredResults.length !== 1 ? "s" : ""}`}
                className="text-sm text-muted-foreground"
              />
              <div className="grid gap-4">
                {filteredResults.map((result, i) => (
                  <Link key={i} href={result.url}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="flex items-start gap-3 pt-6">
                        <Badge variant="secondary" className="shrink-0 capitalize">
                          {result.type}
                        </Badge>
                        <EditableText
                          as="span"
                          value={result.title}
                          className="font-medium"
                        />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
