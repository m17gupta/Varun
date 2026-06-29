import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 lg:px-12 pt-32 pb-20 sm:pb-28 lg:py-36">
      {/* Decorative dot grid */}
      <div
        className="absolute -left-4 top-24 hidden opacity-[0.04] lg:block"
        aria-hidden="true"
      >
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="size-2 rounded-full bg-dark" />
          ))}
        </div>
      </div>

      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Text side */}
        <div className="relative max-w-2xl">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Vol. 01 / Essays / Lectures / Research
          </p>
          <h1 className="font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.92] text-dark">
            A serious
            <span className="block">mind</span>
            <span className="block italic text-dark/70">
              for an ancient
            </span>
            <span className="block italic text-dark/70">conversation.</span>
          </h1>
          <p className="mt-9 max-w-md text-base leading-7 text-muted-foreground">
            The published work of Varun Gupta, Mahabharata researcher,
            author, and speaker. Essays, books, lectures, and conversations on
            dharma, history, philosophy, and the living wisdom of the epic.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2.5 rounded-full bg-dark px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:scale-105"
            >
              Begin with the essays
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2.5 rounded-full border border-border px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 hover:bg-white hover:text-dark"
            >
              Ask the archive
            </Link>
          </div>

          {/* Decorative thin line */}
          <div className="mt-14 hidden h-px w-24 bg-border/60 lg:block" />
        </div>

        {/* Image side */}
        <div className="relative mx-auto w-full max-w-[460px] self-center lg:max-w-[500px]">
          {/* Decorative circle behind image */}
          <div
            className="absolute -right-8 -top-8 size-48 rounded-full border border-border/30 opacity-50 lg:size-64"
            aria-hidden="true"
          />
          <div
            className="absolute -left-4 bottom-12 size-24 rounded-full border border-border/20 opacity-30 lg:size-32"
            aria-hidden="true"
          />

          {/* Portrait with rounded-b-full */}
          <div className="relative aspect-[4/5] overflow-hidden bg-dark-gray">
            <Image
              src="/images/home/portrait.png"
              alt="Portrait of Varun Gupta"
              fill
              priority
              className="object-cover object-top grayscale"
              style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)" }}
              sizes="(max-width: 1024px) 90vw, 500px"
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-3 left-0 max-w-[270px] rounded-2xl bg-card px-6 py-5 shadow-lg ring-1 ring-border/30">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Current reading
            </p>
            <p className="mt-1.5 font-serif text-sm italic leading-snug text-dark">
              The Mahabharata, Critical Edition
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
