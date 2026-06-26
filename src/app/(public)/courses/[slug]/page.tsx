import type { Metadata } from "next"
import content from "@/config/pages/courses.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { MemberGate } from "@/components/shared/MemberGate"
import Link from "next/link"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${slug.replace(/-/g, " ")} | Courses | Varun Gupta`,
    description: content.seo.description,
  }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const course = content.featuredCourse

  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
          <div className="space-y-12">
            <AnimatedSection>
              <div className="space-y-4">
                <Badge variant="secondary">{course?.format}</Badge>
                <EditableText
                  as="h1"
                  value={course?.title || slug}
                  className="text-4xl font-bold tracking-tight"
                />
                <EditableText
                  as="p"
                  value={course?.subtitle || ""}
                  className="text-xl text-muted-foreground"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="aspect-video bg-muted rounded-xl" />
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-4">
                <EditableText
                  as="h2"
                  value="About This Course"
                  className="text-2xl font-semibold"
                />
                <EditableText
                  as="p"
                  value={course?.description || ""}
                  className="text-base text-muted-foreground leading-relaxed"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-4">
                <EditableText
                  as="h2"
                  value="Learning Outcomes"
                  className="text-2xl font-semibold"
                />
                <ul className="space-y-2">
                  {course?.learningOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1 text-primary">✓</span>
                      <EditableText as="span" value={outcome} />
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-4">
                <EditableText
                  as="h2"
                  value="Course Modules"
                  className="text-2xl font-semibold"
                />
                <Accordion>
                  {course?.modules.map((module, i) => (
                    <AccordionItem key={i} value={`module-${i}`}>
                      <AccordionTrigger>
                        <EditableText
                          as="span"
                          value={`Module ${i + 1}: ${module.title}`}
                          className="font-medium"
                        />
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1">
                          {module.topics.map((topic, j) => (
                            <li key={j} className="text-muted-foreground text-sm">
                              • {topic}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <MemberGate tier="paid">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <EditableText
                      as="h2"
                      value="Members-Only Content"
                      className="text-xl font-semibold"
                    />
                    <EditableText
                      as="p"
                      value="This section contains premium course materials including video lectures, downloadable resources, and discussion forum access."
                      className="text-muted-foreground"
                    />
                    <Link href={`/courses/${slug}/learn`}>
                      <Button>Start Learning</Button>
                    </Link>
                  </CardContent>
                </Card>
              </MemberGate>
            </AnimatedSection>
          </div>

          <aside className="space-y-8">
            <AnimatedSection>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <EditableText
                    as="span"
                    value={course?.price || "Free"}
                    className="text-3xl font-bold"
                  />
                  <EditableText
                    as="p"
                    value={course?.duration || ""}
                    className="text-sm text-muted-foreground"
                  />
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instructor</span>
                      <span>{course?.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format</span>
                      <span>{course?.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Modules</span>
                      <span>{course?.modules.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date</span>
                      <span>{course?.startDate}</span>
                    </div>
                  </div>
                  <Link href={`/courses/${slug}/learn`}>
                    <Button className="w-full">
                      {course?.price === "Free" ? "Enroll Free" : "Enroll Now — $49"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedSection>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}
