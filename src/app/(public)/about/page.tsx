import type { Metadata } from "next"
import content from "@/config/pages/about.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <AnimatedSection>
          <section className="grid gap-12 md:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <SectionHeader
                title={content.hero.title}
                description={content.hero.description}
              />
              <EditableText
                as="p"
                value={content.hero.subtitle}
                className="text-lg text-muted-foreground"
              />
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <section className="max-w-3xl space-y-6">
            {content.bio.map((paragraph, i) => (
              <EditableText
                key={i}
                as="p"
                value={paragraph.paragraph}
                className="text-base leading-relaxed text-muted-foreground"
              />
            ))}
          </section>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <section>
            <SectionHeader
              label="Credentials"
              title="Academic Background"
              className="mb-8"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {content.academicBackground.map((item, i) => (
                <Card key={i}>
                  <CardContent className="space-y-3 pt-6">
                    <Badge variant="secondary">{item.year}</Badge>
                    <EditableText
                      as="h3"
                      value={item.degree}
                      className="font-semibold"
                    />
                    <EditableText
                      as="p"
                      value={item.institution}
                      className="text-sm text-muted-foreground"
                    />
                    <EditableText
                      as="p"
                      value={item.description}
                      className="text-sm text-muted-foreground"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <section>
            <SectionHeader
              label="Focus Areas"
              title="Research Interests"
              className="mb-8"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.researchInterests.map((item, i) => (
                <Card key={i} size="sm">
                  <CardContent className="pt-6">
                    <EditableText
                      as="h3"
                      value={item.title}
                      className="font-semibold mb-2"
                    />
                    <EditableText
                      as="p"
                      value={item.description}
                      className="text-sm text-muted-foreground"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <section>
            <SectionHeader
              label="Publications"
              title="Selected Works"
              className="mb-8"
            />
            <div className="grid gap-4">
              {content.selectedWorks.map((work, i) => (
                <Card key={i}>
                  <CardContent className="flex items-start justify-between gap-4 pt-6">
                    <div className="space-y-1">
                      <EditableText
                        as="h3"
                        value={work.title}
                        className="font-semibold"
                      />
                      <EditableText
                        as="p"
                        value={`${work.type} · ${work.year}${"publisher" in work ? ` · ${work.publisher}` : ""}${"journal" in work ? ` · ${work.journal}` : ""}`}
                        className="text-sm text-muted-foreground"
                      />
                      <EditableText
                        as="p"
                        value={work.description}
                        className="text-sm text-muted-foreground"
                      />
                    </div>
                    <Link href={work.url}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <section>
            <SectionHeader
              label="Connect"
              title="Find Me Online"
              className="mb-8"
            />
            <div className="flex flex-wrap gap-3">
              {content.socialLinks.map((link, i) => (
                <Link key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">{link.platform}</Button>
                </Link>
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
