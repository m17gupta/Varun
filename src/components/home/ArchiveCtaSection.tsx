import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ArchiveCtaSection() {
  return (
    <section className="bg-dark-gray px-6 py-24 text-center sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/40">
          05 / The archive
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-card sm:text-6xl">
          Ask the archive a question.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/50">
          Twelve years of research, essays, lectures, and references, searchable
          in plain language for readers who want a clearer path into the epic.
        </p>
        <Link
          href="/search"
          className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-card px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-dark transition-all duration-300 hover:scale-105"
        >
          Enter the archive
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  )
}
