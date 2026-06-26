import type { Metadata } from "next"
import content from "@/config/pages/membership.json"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: content.seo.ogImage ? { images: [content.seo.ogImage] } : undefined,
}

export default function MembershipPage() {
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
          <div className="grid gap-8 md:grid-cols-3">
            {content.tiers.map((tier) => (
              <Card
                key={tier.id}
                className={cn(
                  "flex flex-col relative",
                  tier.highlighted && "ring-2 ring-primary shadow-lg scale-[1.02]"
                )}
              >
                {tier.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="flex-1 space-y-6 pt-8">
                  <div className="space-y-2 text-center">
                    <CardTitle>
                      <EditableText as="span" value={tier.name} />
                    </CardTitle>
                    <EditableText
                      as="p"
                      value={tier.description}
                      className="text-sm text-muted-foreground"
                    />
                  </div>
                  <div className="text-center">
                    <EditableText
                      as="span"
                      value={tier.price === 0 ? "Free" : `$${tier.price}`}
                      className="text-4xl font-bold"
                    />
                    {tier.price > 0 && (
                      <EditableText
                        as="span"
                        value={`/${tier.period}`}
                        className="text-muted-foreground ml-1"
                      />
                    )}
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">✓</span>
                        <EditableText as="span" value={feature} />
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <div className="max-w-2xl mx-auto space-y-6">
            <SectionHeader
              title="Frequently Asked Questions"
              className="text-center"
            />
            <Accordion>
              {content.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>
                    <EditableText as="span" value={item.question} />
                  </AccordionTrigger>
                  <AccordionContent>
                    <EditableText
                      as="p"
                      value={item.answer}
                      className="text-muted-foreground"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
