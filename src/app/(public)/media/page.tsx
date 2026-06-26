import type { Metadata } from "next"
import content from "@/config/pages/media.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function MediaPage() {
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
          <div className="grid gap-4">
            {content.appearances.map((item, i) => (
              <Link key={i} href={item.url} target="_blank" rel="noopener noreferrer">
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="flex items-start justify-between gap-4 pt-6">
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <EditableText as="span" value={item.publication} />
                        <span>·</span>
                        <Badge variant="secondary">{item.type}</Badge>
                      </div>
                      <EditableText
                        as="h3"
                        value={item.title}
                        className="font-semibold leading-snug"
                      />
                      <EditableText
                        as="span"
                        value={item.date}
                        className="text-sm text-muted-foreground"
                      />
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      Read →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
