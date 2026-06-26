import type { Metadata } from "next"
import content from "@/config/pages/books.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function BooksPage() {
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

        <AnimatedSection className="mt-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.books.map((book, i) => (
              <Card key={book.id} className="flex flex-col">
                <div className="aspect-[3/4] bg-muted flex items-center justify-center rounded-t-xl">
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
            ))}
          </div>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
