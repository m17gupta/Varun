"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface HeroConfig {
  eyebrow: string
  name: string
  headline: string
  tagline: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

interface HeroProps {
  config: HeroConfig
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const imageVariant = {
  hidden: { opacity: 0, scale: 0.96, x: 30 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.2 } },
}

export function Hero({ config }: HeroProps) {
  return (
    <section className="relative border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] min-h-[88vh] items-center gap-12 lg:gap-20">
          {/* Left: Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="py-20 lg:py-24 space-y-7 max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div variants={item}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {config.eyebrow}
              </span>
            </motion.div>

            {/* Headline — editorial style, italic crimson for last line */}
            <motion.div variants={item}>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3.2rem, 7vw, 5.8rem)",
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                }}
              >
                <span className="block text-foreground">A scholar's</span>
                <span className="block text-foreground">mind for</span>
                <span
                  className="block italic"
                  style={{ color: "var(--crimson)" }}
                >
                  timeless wisdom.
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div variants={item}>
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                {config.tagline}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-col sm:flex-row items-start gap-3 pt-2">
              <Link
                href={config.ctaPrimary.href}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-foreground group transition-all duration-200"
                style={{ background: "var(--crimson)" }}
              >
                {config.ctaPrimary.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={config.ctaSecondary.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "rounded-none border-foreground/30 text-foreground/70 hover:text-foreground hover:border-foreground/60"
                )}
              >
                {config.ctaSecondary.label}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Portrait Photo */}
          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            className="hidden lg:block relative self-stretch"
          >
            <div className="relative h-full min-h-[500px]">
              <Image
                src="/images/home/portrait.png"
                alt="Varun Gupta — Mahabharata Scholar"
                fill
                priority
                className="object-cover object-top grayscale"
                sizes="(max-width: 1280px) 420px, 480px"
              />
              {/* Subtle gradient fade to background at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
