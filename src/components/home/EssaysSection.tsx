import Image from "next/image"
import Link from "next/link"
import { essays } from "@/data/home"

export function EssaysSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mb-8 flex items-end justify-between border-b border-[#ded6ca] pb-7">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8c8478]">
            01 / The essays
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-[#2a2722] sm:text-5xl">
            Long-form writing
          </h2>
        </div>
        <Link
          href="/articles"
          className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f766b] sm:inline-flex"
        >
          View the index
        </Link>
      </div>

      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {essays.map((essay) => (
          <article key={essay.href}>
            <Link href={essay.href} className="group block">
              <div className="relative aspect-[1.28/1] overflow-hidden bg-[#e4ded3]">
                <Image
                  src={essay.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8c8478]">
                <span>{essay.category}</span>
                <span>{essay.readTime}</span>
              </div>
              <h3 className="mt-2 font-serif text-xl leading-snug text-[#3a352e] transition group-hover:text-[#812c2d]">
                {essay.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#756d62]">
                {essay.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
