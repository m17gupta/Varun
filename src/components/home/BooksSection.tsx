import Image from "next/image"
import Link from "next/link"
import { books } from "@/data/home"

export function BooksSection() {
  return (
    <section className="bg-[#12110e] px-5 py-16 text-[#eee8dd] sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7f786e]">
              02 / The books
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              Published works
            </h2>
          </div>
          <Link
            href="/books"
            className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#9e968a] sm:inline-flex"
          >
            The shelf
          </Link>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((work) => (
            <article key={work.title}>
              <Link href={work.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#242018]">
                  <Image
                    src={work.image}
                    alt=""
                    fill
                    className="object-cover opacity-85 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#827a70]">
                  {work.label}
                </p>
                <h3 className="mt-2 font-serif text-xl leading-snug text-[#f6f0e7]">
                  {work.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#958d82]">
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
