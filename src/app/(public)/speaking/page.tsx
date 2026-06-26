import type { Metadata } from "next"
import content from "@/config/pages/speaking.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function SpeakingPage() {
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
          <div className="space-y-6">
            <EditableText
              as="h2"
              value="Speaking Topics"
              className="text-2xl font-bold"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.topics.map((topic, i) => (
                <Card key={i}>
                  <CardContent className="pt-6 space-y-3">
                    <EditableText
                      as="h3"
                      value={topic.title}
                      className="font-semibold"
                    />
                    <EditableText
                      as="p"
                      value={topic.description}
                      className="text-sm text-muted-foreground"
                    />
                    <Badge variant="secondary">{topic.duration}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <div className="space-y-6">
            <EditableText
              as="h2"
              value="Past Events"
              className="text-2xl font-bold"
            />
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8">
                {content.pastEvents.map((event, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-2.5 top-1.5 size-3 rounded-full bg-primary ring-4 ring-background" />
                    <Card>
                      <CardContent className="pt-6 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <EditableText
                              as="h3"
                              value={event.title}
                              className="font-semibold"
                            />
                            <EditableText
                              as="p"
                              value={event.event}
                              className="text-sm text-muted-foreground"
                            />
                          </div>
                          <Badge variant="secondary" className="shrink-0">
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <EditableText as="span" value={event.location} />
                          <span>·</span>
                          <EditableText as="span" value={event.date} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
