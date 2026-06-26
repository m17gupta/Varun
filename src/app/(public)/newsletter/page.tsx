import type { Metadata } from "next"
import content from "@/config/pages/newsletter.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function NewsletterPage() {
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

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-12">
            <AnimatedSection>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 space-y-6">
                  <EditableText
                    as="h2"
                    value={content.signupCta.title}
                    className="text-2xl font-bold"
                  />
                  <EditableText
                    as="p"
                    value={content.signupCta.description}
                    className="text-muted-foreground"
                  />
                  <form className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder={content.signupCta.placeholder}
                        type="email"
                        required
                      />
                    </div>
                    <Button type="submit">{content.signupCta.buttonLabel}</Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-6">
                <EditableText
                  as="h2"
                  value="Benefits"
                  className="text-2xl font-bold"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {content.benefits.map((benefit, i) => (
                    <Card key={i} size="sm">
                      <CardContent className="pt-6 space-y-2">
                        <EditableText
                          as="h3"
                          value={benefit.title}
                          className="font-semibold"
                        />
                        <EditableText
                          as="p"
                          value={benefit.description}
                          className="text-sm text-muted-foreground"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="space-y-6">
              <EditableText
                as="h2"
                value="Recent Issues"
                className="text-2xl font-bold"
              />
              <div className="space-y-4">
                {content.recentIssues.map((issue, i) => (
                  <Link key={i} href={issue.url}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="pt-6 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle>
                            <EditableText as="span" value={issue.title} />
                          </CardTitle>
                          <Badge variant="secondary" className="shrink-0">
                            {issue.publishedDate}
                          </Badge>
                        </div>
                        <EditableText
                          as="p"
                          value={issue.excerpt}
                          className="text-sm text-muted-foreground line-clamp-2"
                        />
                        <EditableText
                          as="span"
                          value="Read more →"
                          className="text-sm text-primary font-medium"
                        />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  )
}
