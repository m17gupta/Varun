"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { animate, createTimeline } from "animejs"

export function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null)
  const mandalaRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const blockquoteRef = useRef<HTMLQuoteElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const citationRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting) return
        observer.disconnect()

        animate(mandalaRef.current!, { rotate: -360, duration: 180000, easing: "linear", loop: true })

        const tl = createTimeline()
        tl.add(labelRef.current!, { opacity: [0, 1], translateY: [24, 0], duration: 650, easing: [0.25, 0.1, 0.25, 1] })
          .add(blockquoteRef.current!, { opacity: [0, 1], scale: [0.94, 1], duration: 700, easing: [0.25, 0.1, 0.25, 1] }, "-=100")
          .add(dividerRef.current!, { opacity: [0, 1], scaleX: [0, 1], duration: 500, easing: [0.25, 0.1, 0.25, 1] }, "-=200")
          .add(citationRef.current!, { opacity: [0, 1], translateY: [16, 0], duration: 550, easing: [0.25, 0.1, 0.25, 1] }, "-=150")
      },
      { threshold: 0, rootMargin: "-80px" },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border/60 bg-muted px-6 py-16 text-center sm:py-20">
      {/* Background Rotating Mandala */}
      <div
        ref={mandalaRef}
        className="absolute left-1/2 top-1/2 -z-10 size-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none mix-blend-multiply"
        style={{ opacity: 0 }}
      >
        <Image
          src="/images/home/mandala.jpg"
          alt="Mandala Background"
          fill
          className="object-contain"
        />
      </div>

      <div className="mx-auto max-w-[1400px]">
        <p
          ref={labelRef}
          className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground"
          style={{ opacity: 0 }}
        >
          From the archive
        </p>
        <blockquote
          ref={blockquoteRef}
          className="mx-auto mt-5 max-w-3xl font-serif text-3xl italic leading-snug text-dark sm:text-4xl lg:text-5xl"
          style={{ opacity: 0 }}
        >
          &ldquo;Where there is dharma, there is victory.&rdquo;
        </blockquote>
        <div
          ref={dividerRef}
          className="mx-auto mt-6 h-px w-12 bg-border/60"
          style={{ opacity: 0, transformOrigin: "center" }}
        />
        <p
          ref={citationRef}
          className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
          style={{ opacity: 0 }}
        >
          Mahabharata, recurring maxim
        </p>
      </div>
    </section>
  )
}
