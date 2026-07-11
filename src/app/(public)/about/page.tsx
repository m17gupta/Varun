"use client"

import { useRef } from "react"
import type { Metadata } from "next"
import content from "@/config/pages/about.json"
import { motion, useInView } from "framer-motion"
import { PageTransition } from "@/components/shared/PageTransition"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const cardItem = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const bioItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" })
  const bioRef = useRef<HTMLDivElement>(null)
  const bioInView = useInView(bioRef, { once: true, margin: "-80px" })
  const academicRef = useRef<HTMLDivElement>(null)
  const academicInView = useInView(academicRef, { once: true, margin: "-80px" })
  const researchRef = useRef<HTMLDivElement>(null)
  const researchInView = useInView(researchRef, { once: true, margin: "-80px" })
  const worksRef = useRef<HTMLDivElement>(null)
  const worksInView = useInView(worksRef, { once: true, margin: "-80px" })
  const socialRef = useRef<HTMLDivElement>(null)
  const socialInView = useInView(socialRef, { once: true, margin: "-80px" })

  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <div ref={heroRef}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="grid gap-12 md:grid-cols-[1fr_300px]"
          >
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
          </motion.div>
        </div>

        <div ref={bioRef} className="mt-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={bioInView ? "visible" : "hidden"}
            className="max-w-3xl space-y-6"
          >
            {content.bio.map((paragraph, i) => (
              <motion.div key={i} variants={bioItem}>
                <EditableText
                  as="p"
                  value={paragraph.paragraph}
                  className="text-base leading-relaxed text-muted-foreground"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div ref={academicRef} className="mt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={academicInView ? "visible" : "hidden"}
          >
            <SectionHeader
              label="Credentials"
              title="Academic Background"
              className="mb-8"
            />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={academicInView ? "visible" : "hidden"}
            className="grid gap-6 md:grid-cols-3"
          >
            {content.academicBackground.map((item, i) => (
              <motion.div key={i} variants={cardItem}>
                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div ref={researchRef} className="mt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={researchInView ? "visible" : "hidden"}
          >
            <SectionHeader
              label="Focus Areas"
              title="Research Interests"
              className="mb-8"
            />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={researchInView ? "visible" : "hidden"}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {content.researchInterests.map((item, i) => (
              <motion.div key={i} variants={cardItem}>
                <Card size="sm" className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div ref={worksRef} className="mt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={worksInView ? "visible" : "hidden"}
          >
            <SectionHeader
              label="Publications"
              title="Selected Works"
              className="mb-8"
            />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={worksInView ? "visible" : "hidden"}
            className="grid gap-4"
          >
            {content.selectedWorks.map((work, i) => (
              <motion.div key={i} variants={cardItem}>
                <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
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
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div ref={socialRef} className="mt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={socialInView ? "visible" : "hidden"}
          >
            <SectionHeader
              label="Connect"
              title="Find Me Online"
              className="mb-8"
            />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={socialInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-3"
          >
            {content.socialLinks.map((link, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="transition-all duration-300 hover:-translate-y-0.5">{link.platform}</Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
