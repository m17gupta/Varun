import type { Metadata } from "next"
import content from "@/config/pages/videos.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Link from "next/link"

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function VideosPage() {
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
          <Tabs defaultValue="all">
            <TabsList>
              {content.categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {content.categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-8 space-y-8">
                {content.featuredVideo && cat.id === "all" && (
                  <Card className="relative overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-16 rounded-full bg-black/60 flex items-center justify-center">
                          <span className="text-white text-2xl">▶</span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="absolute bottom-3 right-3"
                      >
                        {content.featuredVideo.duration}
                      </Badge>
                    </div>
                    <CardContent className="pt-6 space-y-3">
                      <CardTitle>
                        <EditableText as="span" value={content.featuredVideo.title} />
                      </CardTitle>
                      <EditableText
                        as="p"
                        value={content.featuredVideo.description}
                        className="text-muted-foreground"
                      />
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <EditableText as="span" value={content.featuredVideo.date} />
                        <span>·</span>
                        <EditableText
                          as="span"
                          value={`${(content.featuredVideo.views / 1000).toFixed(1)}K views`}
                        />
                      </div>
                      <Link href={content.featuredVideo.url} target="_blank" rel="noopener noreferrer">
                        <Button>Watch Video</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i}>
                      <div className="aspect-video bg-muted relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="size-12 rounded-full bg-black/60 flex items-center justify-center">
                            <span className="text-white text-xl">▶</span>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="absolute bottom-2 right-2"
                        >
                          {Math.floor(Math.random() * 45 + 10)}:00
                        </Badge>
                      </div>
                      <CardContent className="pt-4 space-y-2">
                        <CardTitle>
                          <EditableText
                            as="span"
                            value={`Video Title ${i + 1}`}
                            className="text-sm"
                          />
                        </CardTitle>
                        <EditableText
                          as="p"
                          value="A brief description of the video content and topics covered."
                          className="text-xs text-muted-foreground line-clamp-2"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
