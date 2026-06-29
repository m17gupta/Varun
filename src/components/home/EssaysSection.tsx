import Image from "next/image"
import Link from "next/link"
import { essays } from "@/data/home"

export function EssaysSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 sm:py-28 lg:px-12">
      <div className="mb-10 flex items-end justify-between border-b border-border/60 pb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            01 / The essays
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-dark sm:text-5xl">
            Long-form writing
          </h2>
        </div>
        <Link
          href="/articles"
          className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-dark sm:inline-flex"
        >
          View the index
        </Link>
      </div>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {essays.map((essay) => (
          <article key={essay.href}>
            <Link href={essay.href} className="group block">
              <div className="relative aspect-[1.28/1] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={essay.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <span>{essay.category}</span>
                <span>{essay.readTime}</span>
              </div>
              <h3 className="mt-2 font-serif text-xl leading-snug text-dark transition-colors duration-300 group-hover:text-tan">
                {essay.title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
                {essay.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
