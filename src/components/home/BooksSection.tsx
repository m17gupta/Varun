import Image from "next/image"
import Link from "next/link"
import { books } from "@/data/home"

export function BooksSection() {
  return (
    <section className="bg-dark-gray px-6 py-20 text-card sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-end justify-between border-b border-border/10 pb-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/40">
              02 / The books
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-card sm:text-5xl">
              Published works
            </h2>
          </div>
          <Link
            href="/books"
            className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 transition-colors duration-300 hover:text-card sm:inline-flex"
          >
            The shelf
          </Link>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((work) => (
            <article key={work.title}>
              <Link href={work.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-dark border border-white/5">
                  <Image
                    src={work.image}
                    alt=""
                    fill
                    className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {work.label}
                </p>
                <h3 className="mt-2 font-serif text-xl leading-snug text-card transition-colors duration-300 group-hover:text-tan">
                  {work.title}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-white/50">
                  {work.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
