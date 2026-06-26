"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Mail, ArrowRight, CheckCircle } from "lucide-react"

interface NewsletterSignupProps {
  title: string
  description: string
  buttonLabel: string
  href: string
}

export function NewsletterSignup({
  title,
  description,
  buttonLabel,
  href,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.40 0.108 60 / 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.25 0.068 55 / 0.08) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--color-foreground) 0px, transparent 1px, transparent 40px, var(--color-foreground) 40px)",
          }}
        />
      </div>

      {/* Border top/bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <AnimatedSection>
        <div className="relative max-w-3xl mx-auto text-center space-y-10">
          {/* Ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="size-14 rounded-full border border-border/60 bg-card flex items-center justify-center">
              <Mail className="size-5 text-primary" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-4"
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto text-sm md:text-base">
              {description}
            </p>
          </motion.div>

          {/* Form */}
          {!submitted ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 px-4 bg-background border border-border/80 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors rounded-none"
                />
              </div>
              <Link
                href={href}
                onClick={(e) => {
                  if (email) {
                    setSubmitted(true)
                    e.preventDefault()
                  }
                }}
                className={cn(
                  "h-11 px-6 bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 group transition-colors hover:bg-primary/90 rounded-none whitespace-nowrap",
                )}
              >
                {buttonLabel}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-primary"
            >
              <CheckCircle className="size-5" />
              <span className="font-medium">Thank you for subscribing!</span>
            </motion.div>
          )}

          {/* Fine print */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-xs text-muted-foreground/60 leading-relaxed"
          >
            Scholarly updates on research, publications, and lectures. No spam — unsubscribe anytime.
          </motion.p>
        </div>
      </AnimatedSection>
    </section>
  )
}
