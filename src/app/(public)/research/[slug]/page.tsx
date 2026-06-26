import type { Metadata } from "next"
import content from "@/config/pages/research.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { EditableText } from "@/components/shared/EditableText"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${slug.replace(/-/g, " ")} | Research | Varun Gupta`,
    description: content.seo.description,
  }
}

export default async function ResearchPaperPage({ params }: Props) {
  const { slug } = await params

  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <article className="space-y-8">
            <AnimatedSection>
              <div className="space-y-4">
                <Badge>Textual Criticism</Badge>
                <EditableText
                  as="h1"
                  value={`Research Paper: ${slug.replace(/-/g, " ")}`}
                  className="text-4xl font-bold tracking-tight"
                />
                <EditableText
                  as="p"
                  value="Varun Gupta"
                  className="text-lg text-muted-foreground"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <Card>
                <CardContent className="pt-6">
                  <EditableText
                    as="h2"
                    value="Abstract"
                    className="text-xl font-semibold mb-4"
                  />
                  <EditableText
                    as="p"
                    value="This paper examines the critical edition of the Mahabharata, exploring variant manuscripts and their implications for understanding the epic's transmission history. Through a comparative analysis of regional recensions, the study identifies key patterns in textual variation that shed light on the Mahabharata's evolution across centuries and cultural contexts."
                    className="text-base leading-relaxed text-muted-foreground"
                  />
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <div className="flex flex-wrap gap-3">
                <Button size="lg">
                  <span className="mr-2">📥</span>
                  Download PDF
                </Button>
                <Button variant="outline" size="lg">
                  Cite this Paper
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <EditableText
                    key={i}
                    as="p"
                    value={`Section ${i + 1} of the paper content. This would contain the full text of the research paper, including introduction, methodology, analysis, and conclusions related to the Mahabharata scholarship.`}
                    className="text-base leading-relaxed text-muted-foreground"
                  />
                ))}
              </div>
            </AnimatedSection>
          </article>

          <aside className="space-y-8">
            <AnimatedSection>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <EditableText
                    as="h3"
                    value="Paper Information"
                    className="font-semibold"
                  />
                  <Separator />
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">DOI</dt>
                      <dd className="font-mono text-xs">10.xxxx/xxxxx.2025.001</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Journal</dt>
                      <dd>Journal of Indian Philosophy</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Published</dt>
                      <dd>2025</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Downloads</dt>
                      <dd>1,234</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Citations</dt>
                      <dd>56</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <EditableText
                    as="h3"
                    value="Related Papers"
                    className="font-semibold"
                  />
                  <Separator />
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Link
                        key={i}
                        href={`/research/related-${i + 1}`}
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        <EditableText
                          as="span"
                          value={`Related Research Paper ${i + 1}`}
                        />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}
