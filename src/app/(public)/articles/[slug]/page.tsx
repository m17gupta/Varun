import type { Metadata } from "next"
import content from "@/config/pages/articles.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { EditableText } from "@/components/shared/EditableText"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${slug.replace(/-/g, " ")} | Articles | Varun Gupta`,
    description: content.seo.description,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params

  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <article className="space-y-8">
            <AnimatedSection>
              <div className="space-y-4">
                <Badge>Narrative Analysis</Badge>
                <EditableText
                  as="h1"
                  value={content.featuredArticle?.title || "Article Title"}
                  className="text-4xl font-bold tracking-tight"
                />
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <EditableText as="span" value={content.featuredArticle?.author || "Varun Gupta"} />
                  <span>·</span>
                  <EditableText as="span" value={content.featuredArticle?.date || "2025-01-01"} />
                  <span>·</span>
                  <EditableText as="span" value={content.featuredArticle?.readTime || "10 min read"} />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="aspect-[2/1] bg-muted rounded-xl" />
            </AnimatedSection>

            <AnimatedSection>
              <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <EditableText
                    key={i}
                    as="p"
                    value={`This is a sample paragraph for the article. The full content would be fetched from a CMS or database based on the slug "${slug}". Each section explores different aspects of the Mahabharata's narrative and philosophical dimensions.`}
                    className="text-base leading-relaxed text-muted-foreground"
                  />
                ))}
              </div>
            </AnimatedSection>
          </article>

          <aside className="space-y-8">
            <AnimatedSection>
              <Card>
                <CardContent className="pt-6">
                  <EditableText
                    as="h3"
                    value="Article Metadata"
                    className="font-semibold mb-4"
                  />
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Category</dt>
                      <dd>Narrative Analysis</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Reading Time</dt>
                      <dd>{content.featuredArticle?.readTime || "10 min"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Published</dt>
                      <dd>{content.featuredArticle?.date || "2025-01-01"}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card>
                <CardContent className="pt-6">
                  <EditableText
                    as="h3"
                    value="Related Articles"
                    className="font-semibold mb-4"
                  />
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Link
                        key={i}
                        href={`/articles/related-${i + 1}`}
                        className="block space-y-1 group"
                      >
                        <EditableText
                          as="h4"
                          value={`Related Article ${i + 1}`}
                          className="text-sm font-medium group-hover:text-primary transition-colors"
                        />
                        <EditableText
                          as="p"
                          value="Brief description of the related article content."
                          className="text-xs text-muted-foreground line-clamp-2"
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
