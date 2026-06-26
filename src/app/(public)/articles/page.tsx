import type { Metadata } from "next"
import content from "@/config/pages/articles.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
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

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function ArticlesPage() {
  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <AnimatedSection>
          <SectionHeader
            label={content.pageHeader.subtitle}
            title={content.pageHeader.title}
            description={content.pageHeader.description}
          />
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <div className="flex flex-wrap gap-2">
            {content.categories.map((cat) => (
              <Link key={cat.id} href={`/articles?category=${cat.id}`}>
                <Button variant={cat.id === "all" ? "default" : "outline"} size="sm">
                  {cat.label}
                </Button>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        {content.featuredArticle && (
          <AnimatedSection className="mt-12">
            <Card className="relative overflow-hidden">
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
          </AnimatedSection>
        )}

        <AnimatedSection className="mt-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="flex flex-col">
                <div className="aspect-[16/9] bg-muted rounded-t-xl" />
                <CardContent className="flex-1 space-y-3 pt-6">
                  <Badge variant="secondary">Category</Badge>
                  <CardTitle>
                    <EditableText
                      as="span"
                      value={`Article Title ${i + 1}`}
                    />
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
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-12">
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
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
