import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ArchiveCtaSection() {
  return (
    <section className="px-5 py-20 text-center sm:px-8 sm:py-24">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8c8478]">
        05 / The archive
      </p>
      <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#2a2722] sm:text-6xl">
        Ask the archive a question.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#756d62]">
        Twelve years of research, essays, lectures, and references, searchable
        in plain language for readers who want a clearer path into the epic.
      </p>
      <Link
        href="/search"
        className="mt-8 inline-flex items-center gap-2 bg-[#812c2d] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#fffaf2]"
      >
        Enter the archive
        <ArrowRight className="size-3.5" />
      </Link>
    </section>
  )
}
