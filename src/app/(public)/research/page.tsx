import type { Metadata } from "next"
import content from "@/config/pages/research.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function ResearchPage() {
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

        {content.stats && (
          <AnimatedSection className="mt-8">
            <div className="flex flex-wrap gap-8">
              <div>
                <EditableText
                  as="span"
                  value={String(content.stats.totalPapers)}
                  className="text-3xl font-bold"
                />
                <EditableText
                  as="span"
                  value=" Papers"
                  className="text-muted-foreground ml-1"
                />
              </div>
              <div>
                <EditableText
                  as="span"
                  value={String(content.stats.totalDownloads).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                  className="text-3xl font-bold"
                />
                <EditableText
                  as="span"
                  value=" Downloads"
                  className="text-muted-foreground ml-1"
                />
              </div>
              <div>
                <EditableText
                  as="span"
                  value={String(content.stats.totalCitations).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                  className="text-3xl font-bold"
                />
                <EditableText
                  as="span"
                  value=" Citations"
                  className="text-muted-foreground ml-1"
                />
              </div>
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Input placeholder="Search research papers..." />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-6">
          <div className="flex flex-wrap gap-2">
            {content.categories.map((cat) => (
              <Link key={cat.id} href={`/research?category=${cat.id}`}>
                <Button variant={cat.id === "all" ? "default" : "outline"} size="sm">
                  {cat.label}
                </Button>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-12">
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="secondary">
                      {content.categories[(i % (content.categories.length - 1)) + 1]?.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      2025
                    </span>
                  </div>
                  <CardTitle>
                    <EditableText
                      as="span"
                      value={`Research Paper Title ${i + 1}`}
                    />
                  </CardTitle>
                  <EditableText
                    as="p"
                    value="This is an abstract preview that gives readers a brief overview of the paper's content, methodology, and key findings..."
                    className="text-sm text-muted-foreground line-clamp-3"
                  />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>📥 1,234 downloads</span>
                    <span>📄 56 citations</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/research/paper-${i + 1}`}>
                      <Button size="sm">View Paper</Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
