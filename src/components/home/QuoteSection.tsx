export function QuoteSection() {
  return (
    <section className="border-y border-border/60 bg-muted px-6 py-20 text-center sm:py-24">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          From the archive
        </p>
        <blockquote className="mx-auto mt-6 max-w-3xl font-serif text-3xl italic leading-snug text-dark sm:text-4xl lg:text-5xl">
          &ldquo;Where there is dharma, there is victory.&rdquo;
        </blockquote>
        <div className="mx-auto mt-7 h-px w-12 bg-border/60" />
        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Mahabharata, recurring maxim
        </p>
      </div>
    </section>
  )
}
