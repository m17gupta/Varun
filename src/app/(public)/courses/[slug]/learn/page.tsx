import type { Metadata } from "next"
import content from "@/config/pages/courses.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress, ProgressLabel } from "@/components/ui/progress"
import { MemberGate } from "@/components/shared/MemberGate"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Learn: ${slug.replace(/-/g, " ")} | Varun Gupta`,
    description: content.seo.description,
  }
}

export default async function CourseLearnPage({ params }: Props) {
  const { slug } = await params
  const course = content.featuredCourse

  return (
    <MemberGate tier="paid">
      <PageTransition>
        <div className="container py-16 md:py-24">
          <AnimatedSection>
            <div className="space-y-4 mb-8">
              <EditableText
                as="h1"
                value={course?.title || slug}
                className="text-3xl font-bold tracking-tight"
              />
              <EditableText
                as="p"
                value="Course Learning Dashboard"
                className="text-muted-foreground"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <ProgressLabel>Course Progress</ProgressLabel>
                  <span className="ml-auto text-sm text-muted-foreground tabular-nums">35%</span>
                </div>
                <Progress value={35} />
              </CardContent>
            </Card>
          </AnimatedSection>

          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div className="space-y-8">
              <AnimatedSection>
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                  <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-3xl">▶</span>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="space-y-6">
                  <EditableText
                    as="h2"
                    value="Module 1: Introduction to the Mahabharata"
                    className="text-2xl font-semibold"
                  />
                  <EditableText
                    as="p"
                    value="Welcome to the course! This module covers the historical background, authorship, and structure of the Mahabharata."
                    className="text-muted-foreground"
                  />
                </div>
              </AnimatedSection>
            </div>

            <aside className="space-y-4">
              <AnimatedSection>
                <Card>
                  <CardContent className="pt-6">
                    <EditableText
                      as="h3"
                      value="Course Modules"
                      className="font-semibold mb-4"
                    />
                    <div className="space-y-3">
                      {course?.modules.map((module, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        >
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {i + 1}
                          </div>
                          <div className="space-y-1">
                            <EditableText
                              as="span"
                              value={module.title}
                              className="text-sm font-medium"
                            />
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{module.topics.length} lessons</span>
                              {i === 0 && <Badge variant="secondary">In Progress</Badge>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection>
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <EditableText
                      as="h3"
                      value="Resources"
                      className="font-semibold"
                    />
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      📄 Download Slides
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      📝 Discussion Forum
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      📚 Additional Reading
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </PageTransition>
    </MemberGate>
  )
}
