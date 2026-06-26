import type { Metadata } from "next"
import content from "@/config/pages/contact.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function ContactPage() {
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

        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
          <AnimatedSection>
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is this regarding?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      className="min-h-[160px]"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>

          <aside className="space-y-8">
            <AnimatedSection>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <EditableText
                    as="h3"
                    value={content.email.label}
                    className="font-semibold"
                  />
                  <EditableText
                    as="p"
                    value={content.email.description}
                    className="text-sm text-muted-foreground"
                  />
                  <Link href={`mailto:${content.email.address}`}>
                    <Button variant="outline" className="w-full">
                      {content.email.address}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <EditableText
                    as="h3"
                    value="Social Links"
                    className="font-semibold"
                  />
                  <div className="space-y-2">
                    {content.socialLinks.map((link, i) => (
                      <Link
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span className="w-24 text-xs font-medium">{link.platform}</span>
                        <EditableText as="span" value={link.handle} />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card>
                <CardContent className="pt-6 space-y-2">
                  <EditableText
                    as="h3"
                    value={content.responseTime.label}
                    className="font-semibold"
                  />
                  <EditableText
                    as="p"
                    value={content.responseTime.value}
                    className="text-2xl font-bold text-primary"
                  />
                  <EditableText
                    as="p"
                    value={content.responseTime.description}
                    className="text-sm text-muted-foreground"
                  />
                </CardContent>
              </Card>
            </AnimatedSection>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}
