"use client"

import { useRef } from "react"
import type { Metadata } from "next"
import content from "@/config/pages/contact.json"
import { motion, useInView } from "framer-motion"
import { PageTransition } from "@/components/shared/PageTransition"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { EditableText } from "@/components/shared/EditableText"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const formField = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const sidebarItem = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const socialLink = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
}

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })
  const formRef = useRef<HTMLDivElement>(null)
  const formInView = useInView(formRef, { once: true, margin: "-80px" })
  const sidebarRef = useRef<HTMLDivElement>(null)
  const sidebarInView = useInView(sidebarRef, { once: true, margin: "-80px" })

  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <div ref={headerRef}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <SectionHeader
              label={content.pageHeader.subtitle}
              title={content.pageHeader.title}
              description={content.pageHeader.description}
            />
          </motion.div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
          <div ref={formRef}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
            >
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate={formInView ? "visible" : "hidden"}
                      className="space-y-6"
                    >
                      <motion.div variants={formField} className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>
                      </motion.div>
                      <motion.div variants={formField} className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" placeholder="+91 00000 00000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="youtube">YouTube Channel</Label>
                          <Input id="youtube" type="url" placeholder="https://youtube.com/@yourchannel" />
                        </div>
                      </motion.div>
                      <motion.div variants={formField} className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input id="instagram" type="url" placeholder="https://instagram.com/yourhandle" />
                      </motion.div>
                      <motion.div variants={formField} className="space-y-2">
                        <Label htmlFor="podcastTheme">Podcast Theme</Label>
                        <Textarea
                          id="podcastTheme"
                          placeholder="What would you like to discuss on the podcast?"
                          className="min-h-[140px]"
                          required
                        />
                      </motion.div>
                      <motion.div variants={formField}>
                        <Button type="submit" size="lg">
                          Send Message
                        </Button>
                      </motion.div>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <aside ref={sidebarRef} className="space-y-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={sidebarInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <motion.div variants={sidebarItem}>
                <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
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
              </motion.div>

              <motion.div variants={sidebarItem}>
                <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="pt-6 space-y-4">
                    <EditableText
                      as="h3"
                      value="Social Links"
                      className="font-semibold"
                    />
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate={sidebarInView ? "visible" : "hidden"}
                      className="space-y-2"
                    >
                      {content.socialLinks.map((link, i) => (
                        <motion.div key={i} variants={socialLink}>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <span className="w-24 text-xs font-medium">{link.platform}</span>
                            <EditableText as="span" value={link.handle} />
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={sidebarItem}>
                <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
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
              </motion.div>
            </motion.div>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}
