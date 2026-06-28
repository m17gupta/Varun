import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:px-12 lg:py-24">
      <div className="max-w-2xl self-center">
        <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.26em] text-[#8c8478]">
          Vol. 01 / Essays / Lectures / Research
        </p>
        <h1 className="font-serif text-[clamp(4rem,11vw,9.25rem)] leading-[0.9] text-[#24211d]">
          A serious
          <span className="block">mind</span>
          <span className="block italic text-[#812c2d]">
            for an ancient
          </span>
          <span className="block italic text-[#812c2d]">conversation.</span>
        </h1>
        <p className="mt-9 max-w-md text-sm leading-7 text-[#71695f]">
          The published work of Varun Gupta, Mahabharata researcher,
          author, and speaker. Essays, books, lectures, and conversations on
          dharma, history, philosophy, and the living wisdom of the epic.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 bg-[#191714] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#fffaf2]"
          >
            Begin with the essays
            <ArrowRight className="size-3.5" />
          </Link>
          <Link
            href="/research"
            className="inline-flex items-center border border-[#bdb4a7] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#514a42]"
          >
            Ask the archive
          </Link>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[430px] self-center lg:max-w-[470px]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#131210]">
          <Image
            src="/images/home/portrait.png"
            alt="Portrait of Varun Gupta"
            fill
            priority
            className="object-cover object-top grayscale"
            sizes="(max-width: 1024px) 90vw, 470px"
          />
        </div>
        <div className="absolute -bottom-1 left-0 max-w-[260px] bg-[#f6f2eb] px-5 py-4 shadow-[0_0_0_1px_rgba(25,23,20,0.08)]">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8b8276]">
            Current reading
          </p>
          <p className="mt-1 font-serif text-sm italic text-[#36312b]">
            The Mahabharata, Critical Edition
          </p>
        </div>
      </div>
    </section>
  )
}
