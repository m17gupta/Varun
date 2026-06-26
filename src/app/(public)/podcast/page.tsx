import type { Metadata } from "next"
import content from "@/config/pages/podcast.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function PodcastPage() {
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

        <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
          <AnimatedSection>
            <div className="space-y-6">
              <div className="aspect-square bg-muted rounded-xl" />
              <div className="space-y-4">
                <EditableText
                  as="h2"
                  value={content.podcastInfo.title}
                  className="text-2xl font-bold"
                />
                <EditableText
                  as="p"
                  value={content.podcastInfo.description}
                  className="text-sm text-muted-foreground"
                />
                <div className="space-y-1 text-sm text-muted-foreground">
                  <EditableText as="p" value={`Host: ${content.podcastInfo.host}`} />
                  <EditableText
                    as="p"
                    value={`Frequency: ${content.podcastInfo.frequency}`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <EditableText
                  as="h3"
                  value="Listen On"
                  className="font-semibold text-sm"
                />
                <div className="flex flex-wrap gap-2">
                  {content.podcastInfo.platforms.map((platform, i) => (
                    <Link
                      key={i}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        {platform.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection>
              <EditableText
                as="h2"
                value="Episodes"
                className="text-2xl font-bold mb-6"
              />
            </AnimatedSection>

            {content.episodes.map((episode) => (
              <AnimatedSection key={episode.id}>
                <Card>
                  <CardContent className="flex gap-4 pt-6">
                    <div className="size-16 shrink-0 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-lg">🎙</span>
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle>
                            <EditableText as="span" value={episode.title} />
                          </CardTitle>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>
                              S{episode.season} · E{episode.episodeNumber}
                            </span>
                            <span>·</span>
                            <EditableText as="span" value={episode.duration} />
                            <span>·</span>
                            <EditableText as="span" value={episode.publishedDate} />
                          </div>
                        </div>
                        <Badge variant="secondary">{episode.duration}</Badge>
                      </div>
                      <EditableText
                        as="p"
                        value={episode.description}
                        className="text-sm text-muted-foreground line-clamp-2"
                      />
                      <Button size="sm">
                        <span className="mr-1">▶</span>
                        Play Episode
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
