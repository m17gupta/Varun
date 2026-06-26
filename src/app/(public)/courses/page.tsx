import type { Metadata } from "next"
import content from "@/config/pages/courses.json"
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

export default function CoursesPage() {
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
            {content.featuredCourse && (
              <Card className="md:col-span-2 lg:col-span-3 flex flex-col md:flex-row overflow-hidden">
                <div className="aspect-video md:aspect-auto md:w-80 bg-muted shrink-0" />
                <div className="flex flex-col flex-1">
                  <CardContent className="flex-1 space-y-4 pt-6">
                    <Badge variant="secondary">{content.featuredCourse.format}</Badge>
                    <CardTitle>
                      <EditableText as="span" value={content.featuredCourse.title} />
                    </CardTitle>
                    <EditableText
                      as="p"
                      value={content.featuredCourse.subtitle}
                      className="text-muted-foreground"
                    />
                    <EditableText
                      as="p"
                      value={content.featuredCourse.description}
                      className="text-sm text-muted-foreground line-clamp-3"
                    />
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>📚 {content.featuredCourse.modules.length} modules</span>
                      <span>⏱ {content.featuredCourse.duration}</span>
                      <span>👨‍🏫 {content.featuredCourse.instructor}</span>
                    </div>
                    <EditableText
                      as="span"
                      value={content.featuredCourse.price}
                      className="text-2xl font-bold"
                    />
                  </CardContent>
                  <CardFooter>
                    <Link href={content.featuredCourse.url}>
                      <Button>View Course</Button>
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            )}

            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="flex flex-col">
                <div className="aspect-video bg-muted rounded-t-xl" />
                <CardContent className="flex-1 space-y-4 pt-6">
                  <Badge variant="secondary">
                    {i === 0 ? "Self-paced" : i === 1 ? "Live" : "Hybrid"}
                  </Badge>
                  <CardTitle>
                    <EditableText as="span" value={`Course Title ${i + 1}`} />
                  </CardTitle>
                  <EditableText
                    as="p"
                    value="A comprehensive course description that outlines the key learning objectives and outcomes."
                    className="text-sm text-muted-foreground line-clamp-2"
                  />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>📚 {4 + i * 2} modules</span>
                    <span>👥 {50 + i * 25} enrolled</span>
                  </div>
                  <EditableText
                    as="span"
                    value={i === 0 ? "Free" : i === 1 ? "$49" : "$99"}
                    className="text-xl font-bold"
                  />
                </CardContent>
                <CardFooter>
                  <Link href={`/courses/course-${i + 1}`}>
                    <Button variant={i === 0 ? "default" : "outline"}>
                      {i === 0 ? "Enroll Free" : "Learn More"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
